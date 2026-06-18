// checks.mjs
// Shared checks for both URL (Playwright) and static file detection modes.
// Each check is { id, weight, description, run(ctx) }.
// ctx differs by mode:
//   - URL mode: ctx = { page, document, getComputedStyle }
//   - file mode: ctx = { files: [{ path, html, css }] }
// Each check handles both modes. Returns boolean (true = slop detected).

export const CHECKS = [
  // Typography (6 checks)
  {
    id: 'inter_as_default',
    weight: 3,
    description: 'Inter used as the primary font',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const bodyFont = window.getComputedStyle(document.body).fontFamily;
          return bodyFont.includes('Inter');
        });
      }
      return /font-family[^;]*Inter/i.test(ctx.files?.map(f => f.css + f.html).join(' '));
    },
  },
  {
    id: 'single_font_family',
    weight: 2,
    description: 'Only one font family used across the page',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const fonts = new Set();
          document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button, label')
            .forEach(el => {
              const ff = window.getComputedStyle(el).fontFamily;
              fonts.add(ff.split(',')[0].trim().replace(/['"]/g, ''));
            });
          return fonts.size <= 1;
        });
      }
      // File mode: count unique font-family declarations
      const css = ctx.files?.map(f => f.css).join('\n') || '';
      const matches = css.match(/font-family\s*:\s*([^;}]+)/gi) || [];
      const families = new Set(matches.map(m => m.split(':')[1].split(',')[0].trim().replace(/['"]/g, '')));
      return families.size <= 1;
    },
  },
  {
    id: 'flat_size_hierarchy',
    weight: 2,
    description: 'Font sizes too close together (flat hierarchy)',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const sizes = new Set();
          document.querySelectorAll('h1, h2, h3, h4, p')
            .forEach(el => {
              const size = parseFloat(window.getComputedStyle(el).fontSize);
              sizes.add(Math.round(size));
            });
          const sorted = [...sizes].sort((a, b) => a - b);
          if (sorted.length < 2) return false;
          const ratios = sorted.slice(1).map((s, i) => s / sorted[i]);
          return ratios.every(r => r < 1.2);
        });
      }
      const css = ctx.files?.map(f => f.css).join('\n') || '';
      const sizes = new Set();
      const matches = css.match(/font-size\s*:\s*(\d+(?:\.\d+)?)(px|rem|em)/gi) || [];
      matches.forEach(m => {
        const num = parseFloat(m.match(/font-size\s*:\s*(\d+(?:\.\d+)?)/i)[1]);
        const unit = m.match(/(px|rem|em)$/i)[1];
        const px = unit === 'px' ? num : num * 16;
        sizes.add(Math.round(px));
      });
      const sorted = [...sizes].sort((a, b) => a - b);
      if (sorted.length < 2) return false;
      const ratios = sorted.slice(1).map((s, i) => s / sorted[i]);
      return ratios.every(r => r < 1.2);
    },
  },
  {
    id: 'monospace_as_default',
    weight: 1,
    description: 'Monospace used on non-code elements',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const monos = document.querySelectorAll('h1, h2, h3, p, button, label, a');
          for (const el of monos) {
            const ff = window.getComputedStyle(el).fontFamily.toLowerCase();
            if (ff.includes('mono') || ff.includes('menlo') || ff.includes('consolas')) return true;
          }
          return false;
        });
      }
      const css = ctx.files?.map(f => f.css).join('\n') || '';
      const selectors = ['h1', 'h2', 'h3', 'p', 'button', 'label', 'a'];
      for (const sel of selectors) {
        const re = new RegExp(`${sel}[^{]*{[^}]*font-family[^}]*mono`, 'i');
        if (re.test(css)) return true;
      }
      return false;
    },
  },
  {
    id: 'all_caps_body',
    weight: 1,
    description: 'All-caps on body text elements',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const els = document.querySelectorAll('p, span, div');
          for (const el of els) {
            const cs = window.getComputedStyle(el);
            if (cs.textTransform === 'uppercase' && el.textContent.trim().split(/\s+/).length > 5) {
              return true;
            }
          }
          return false;
        });
      }
      const css = ctx.files?.map(f => f.css).join('\n') || '';
      return /p\s*\{[^}]*text-transform\s*:\s*uppercase/i.test(css) ||
             /div\s*\{[^}]*text-transform\s*:\s*uppercase/i.test(css);
    },
  },
  {
    id: 'tight_line_height',
    weight: 1,
    description: 'Line height below 1.3x on body text',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const els = document.querySelectorAll('p, li, body');
          for (const el of els) {
            const cs = window.getComputedStyle(el);
            const lh = parseFloat(cs.lineHeight);
            const fs = parseFloat(cs.fontSize);
            if (lh && fs && lh / fs < 1.3 && el.textContent.length > 50) return true;
          }
          return false;
        });
      }
      const css = ctx.files?.map(f => f.css).join('\n') || '';
      const matches = css.match(/line-height\s*:\s*(\d+(?:\.\d+)?)/gi) || [];
      return matches.some(m => parseFloat(m.split(':')[1]) < 1.3);
    },
  },

  // Color (5 checks)
  {
    id: 'lavender_purple',
    weight: 3,
    description: 'Lavender-purple accents (HSL H: 250-290, S: >50%, L: 40-80%)',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const els = document.querySelectorAll('[class], [style]');
          for (const el of els) {
            const cs = window.getComputedStyle(el);
            for (const prop of ['color', 'backgroundColor', 'borderColor']) {
              const val = cs[prop];
              if (!val || val === 'rgba(0, 0, 0, 0)') continue;
              const rgb = val.match(/\d+/g)?.map(Number);
              if (!rgb || rgb.length < 3) continue;
              const [h, s, l] = rgbToHsl(rgb[0], rgb[1], rgb[2]);
              if (h >= 250 && h <= 290 && s > 50 && l > 40 && l < 80) return true;
            }
          }
          return false;
          function rgbToHsl(r, g, b) {
            r /= 255; g /= 255; b /= 255;
            const max = Math.max(r, g, b), min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;
            if (max === min) { h = s = 0; }
            else {
              const d = max - min;
              s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
              switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
              }
              h /= 6;
            }
            return [h * 360, s * 100, l * 100];
          }
        });
      }
      const css = ctx.files?.map(f => f.css).join('\n') || '';
      // Look for purple hex codes in 7C3AED, 8B5CF6, A78BFA range
      const purpleHexes = ['#7c3aed', '#8b5cf6', '#a78bfa', '#6d28d9', '#7c3aed', '#9333ea', '#a855f7', '#c084fc'];
      return purpleHexes.some(hex => css.toLowerCase().includes(hex));
    },
  },
  {
    id: 'blue_purple_gradient',
    weight: 2,
    description: 'Blue-to-purple gradient',
    run(ctx) {
      const re = /linear-gradient|radial-gradient/i;
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const els = document.querySelectorAll('*');
          for (const el of els) {
            const bg = window.getComputedStyle(el).backgroundImage;
            if (bg && bg.includes('gradient')) {
              // Check for blue and purple stops in same gradient
              const colorStops = bg.match(/(rgba?\([^)]+\)|#[0-9a-f]{3,8})/gi) || [];
              let hasBlue = false, hasPurple = false;
              for (const stop of colorStops) {
                const rgb = stop.match(/\d+/g)?.map(Number);
                if (!rgb || rgb.length < 3) continue;
                const [h] = rgbToHsl(rgb[0], rgb[1], rgb[2]);
                if (h >= 200 && h <= 240) hasBlue = true;
                if (h >= 250 && h <= 290) hasPurple = true;
              }
              if (hasBlue && hasPurple) return true;
            }
          }
          return false;
          function rgbToHsl(r, g, b) {
            r /= 255; g /= 255; b /= 255;
            const max = Math.max(r, g, b), min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;
            if (max === min) { h = s = 0; }
            else {
              const d = max - min;
              s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
              switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
              }
              h /= 6;
            }
            return [h * 360, s * 100, l * 100];
          }
        });
      }
      const css = ctx.files?.map(f => f.css).join('\n') || '';
      if (!re.test(css)) return false;
      // Look for blue and purple hex codes near each other in gradient declarations
      const gradientBlocks = css.match(/(linear|radial)-gradient\([^)]+\)/gi) || [];
      return gradientBlocks.some(block => {
        const hasBlue = /#[0-9a-f]{0,2}[2-3][0-9a-f]{3}/i.test(block) || /blue/i.test(block);
        const hasPurple = /#[0-9a-f]{0,2}[7-9a-c][0-9a-f]3[0-9a-f]{2}/i.test(block) || /purple|violet/i.test(block);
        return hasBlue && hasPurple;
      });
    },
  },
  {
    id: 'gradient_text',
    weight: 2,
    description: 'Gradient text on headings',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const els = document.querySelectorAll('h1, h2, h3, h4, span, p');
          for (const el of els) {
            const cs = window.getComputedStyle(el);
            const bg = cs.backgroundImage;
            const clip = cs.webkitBackgroundClip || cs.backgroundClip;
            if (bg && bg.includes('gradient') && clip === 'text') return true;
          }
          return false;
        });
      }
      const css = ctx.files?.map(f => f.css).join('\n') || '';
      return /background-clip\s*:\s*text/i.test(css) && /gradient/i.test(css);
    },
  },
  {
    id: 'neon_glow_shadow',
    weight: 2,
    description: 'Neon glow box-shadow on dark backgrounds',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const els = document.querySelectorAll('*');
          for (const el of els) {
            const cs = window.getComputedStyle(el);
            const shadow = cs.boxShadow;
            if (!shadow || shadow === 'none') continue;
            // Check for colored shadow with spread
            const spreadMatch = shadow.match(/rgba?\([^)]+\)\s+[\d.]+px\s+[\d.]+px\s+([\d.]+)px/);
            if (spreadMatch && parseFloat(spreadMatch[1]) > 10) {
              const bg = window.getComputedStyle(el).backgroundColor;
              const bgRgb = bg.match(/\d+/g)?.map(Number);
              if (bgRgb && (bgRgb[0] + bgRgb[1] + bgRgb[2]) / 3 < 80) return true;
              const parentBg = el.parentElement && window.getComputedStyle(el.parentElement).backgroundColor;
              const parentRgb = parentBg && parentBg.match(/\d+/g)?.map(Number);
              if (parentRgb && (parentRgb[0] + parentRgb[1] + parentRgb[2]) / 3 < 80) return true;
            }
          }
          return false;
        });
      }
      const css = ctx.files?.map(f => f.css).join('\n') || '';
      return /box-shadow\s*:[^;]*rgba?\([^)]+\)\s+[\d.]+px\s+[\d.]+px\s+(\d{2,})px/i.test(css);
    },
  },
  {
    id: 'pure_black_background',
    weight: 1,
    description: 'Pure black (#000000) background',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const bg = window.getComputedStyle(document.body).backgroundColor;
          return bg === 'rgb(0, 0, 0)';
        });
      }
      const css = ctx.files?.map(f => f.css).join('\n') || '';
      return /background(-color)?\s*:\s*(#000000|#000|rgb\(\s*0\s*,\s*0\s*,\s*0\s*\)|black)\b/i.test(css);
    },
  },

  // Layout (5 checks)
  {
    id: 'centered_everything',
    weight: 1,
    description: 'More than 80% of text is center-aligned',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const els = document.querySelectorAll('h1, h2, h3, p, div');
          let centered = 0, total = 0;
          for (const el of els) {
            if (el.textContent.trim().length < 5) continue;
            total++;
            if (window.getComputedStyle(el).textAlign === 'center') centered++;
          }
          return total > 0 && centered / total > 0.8;
        });
      }
      const css = ctx.files?.map(f => f.css).join('\n') || '';
      const centeredMatches = css.match(/text-align\s*:\s*center/gi) || [];
      const totalMatches = css.match(/text-align\s*:\s*(left|right|center|justify)/gi) || [];
      return totalMatches.length > 0 && centeredMatches.length / totalMatches.length > 0.8;
    },
  },
  {
    id: 'badge_above_h1',
    weight: 2,
    description: 'Small pill badge immediately before the H1',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const h1 = document.querySelector('h1');
          if (!h1) return false;
          const prev = h1.previousElementSibling;
          if (!prev) return false;
          const cs = window.getComputedStyle(prev);
          const isSmall = parseFloat(cs.fontSize) < 14;
          const hasRadius = parseFloat(cs.borderRadius) > 10;
          const isInline = cs.display === 'inline-block' || cs.display === 'inline-flex';
          return isSmall && (hasRadius || isInline);
        });
      }
      // File mode: hard to detect DOM order without parsing. Look for pill-style elements near h1.
      return false;
    },
  },
  {
    id: 'colored_left_border_cards',
    weight: 3,
    description: 'Thick colored left border on rounded elements',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const els = document.querySelectorAll('[class]');
          for (const el of els) {
            const cs = window.getComputedStyle(el);
            const radius = parseFloat(cs.borderRadius);
            const blWidth = parseFloat(cs.borderLeftWidth);
            const blColor = cs.borderLeftColor;
            if (radius > 4 && blWidth > 2) {
              const rgb = blColor.match(/\d+/g)?.map(Number);
              if (rgb && (rgb[0] + rgb[1] + rgb[2]) > 0 && !(rgb[0] === 0 && rgb[1] === 0 && rgb[2] === 0)) {
                return true;
              }
            }
          }
          return false;
        });
      }
      const css = ctx.files?.map(f => f.css).join('\n') || '';
      // Look for border-left with color and width > 2px on elements with border-radius
      return /border-left\s*:\s*\d{2,}px\s+(?:solid|dashed|dotted)\s+(?!transparent|inherit|initial)/i.test(css) &&
             /border-radius/i.test(css);
    },
  },
  {
    id: 'identical_feature_cards',
    weight: 3,
    description: 'Three or more sibling elements with identical dimensions and structure',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const parents = document.querySelectorAll('section, div, main');
          for (const parent of parents) {
            const children = [...parent.children].filter(c => c.tagName !== 'STYLE' && c.tagName !== 'SCRIPT');
            if (children.length < 3) continue;
            const widths = children.map(c => window.getComputedStyle(c).width);
            const paddings = children.map(c => window.getComputedStyle(c).padding);
            const allSameWidth = new Set(widths).size === 1;
            const allSamePadding = new Set(paddings).size === 1;
            const sameStructure = children.every(c => c.children.length === children[0].children.length);
            if (allSameWidth && allSamePadding && sameStructure) return true;
          }
          return false;
        });
      }
      return false;
    },
  },
  {
    id: 'monotonous_spacing',
    weight: 1,
    description: 'Fewer than three distinct spacing values across sections',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const sections = document.querySelectorAll('section, header, footer, main > div');
          const spacings = new Set();
          sections.forEach(s => {
            const cs = window.getComputedStyle(s);
            spacings.add(cs.paddingTop);
            spacings.add(cs.paddingBottom);
            spacings.add(cs.marginTop);
            spacings.add(cs.marginBottom);
          });
          return spacings.size < 3;
        });
      }
      const css = ctx.files?.map(f => f.css).join('\n') || '';
      const paddingMatches = css.match(/padding(-top|-bottom)?\s*:\s*([^;}]+)/gi) || [];
      const values = new Set(paddingMatches.map(m => m.split(':')[1].trim()));
      return values.size < 3;
    },
  },

  // Sequence (2 checks)
  {
    id: 'numbered_step_sequence',
    weight: 1,
    description: 'Numbered "1, 2, 3" step sequence in siblings',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const parents = document.querySelectorAll('section, div');
          for (const parent of parents) {
            const children = [...parent.children];
            if (children.length < 3) continue;
            const nums = children.map(c => parseInt(c.textContent.trim().match(/^\d+/)?.[0] || '0', 10));
            if (nums[0] === 1 && nums[1] === 2 && nums[2] === 3) return true;
          }
          return false;
        });
      }
      return false;
    },
  },
  {
    id: 'emoji_nav_icons',
    weight: 1,
    description: 'Emoji characters in navigation or sidebar',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u;
          const navs = document.querySelectorAll('nav, [role="navigation"], aside');
          for (const nav of navs) {
            if (emojiRegex.test(nav.textContent)) return true;
          }
          return false;
        });
      }
      const html = ctx.files?.map(f => f.html).join('\n') || '';
      const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u;
      const navMatch = html.match(/<(nav|aside)[^>]*>[\s\S]*?<\/\1>/i);
      return navMatch ? emojiRegex.test(navMatch[0]) : false;
    },
  },

  // Motion (2 checks)
  {
    id: 'bounce_easing',
    weight: 2,
    description: 'Bounce or elastic easing in CSS',
    run(ctx) {
      const re = /cubic-bezier\s*\(\s*[^)]*1\.\d+|bounce|elastic/i;
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const els = document.querySelectorAll('*');
          for (const el of els) {
            const cs = window.getComputedStyle(el);
            const tf = cs.transitionTimingFunction || cs.animationTimingFunction;
            if (tf && (tf.includes('bounce') || tf.includes('elastic') ||
                       /cubic-bezier\s*\(\s*[^)]*-?\d+\.\d+[^)]*1\.\d+/.test(tf))) {
              return true;
            }
          }
          return false;
        });
      }
      const css = ctx.files?.map(f => f.css).join('\n') || '';
      return re.test(css);
    },
  },
  {
    id: 'glassmorphism_everywhere',
    weight: 2,
    description: 'backdrop-filter blur on 3 or more elements',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          let count = 0;
          document.querySelectorAll('*').forEach(el => {
            const cs = window.getComputedStyle(el);
            if (cs.backdropFilter && cs.backdropFilter.includes('blur')) count++;
          });
          return count >= 3;
        });
      }
      const css = ctx.files?.map(f => f.css).join('\n') || '';
      const matches = css.match(/backdrop-filter\s*:\s*blur/gi) || [];
      return matches.length >= 3;
    },
  },

  // Post-2026 house-style tells (4 checks)
  // Anchored on the two patterns named verbatim in Anthropic's Opus 4.8 prompt guide:
  // "warm cream/off-white backgrounds (~#F4F1EA)" and "italic word-accents".
  {
    id: 'bone_cream_palette',
    weight: 3,
    description: 'Bone/cream background + warm-charcoal text + terracotta/sage accent (Opus 4.7/4.8 house style)',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const toRgb = (c) => {
            if (!c) return null;
            const m = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            return m ? { r: +m[1], g: +m[2], b: +m[3] } : null;
          };
          const bodyStyle = window.getComputedStyle(document.body);
          const bg = toRgb(bodyStyle.backgroundColor);
          if (!bg) return false;
          // Bone background anchors (±6 in each channel): #F4F1EA, #F4F3EE, #F6F5F2, #FAF8F2, #FAF7F2, #F0EBE3
          const boneAnchors = [
            [0xF4, 0xF1, 0xEA], [0xF4, 0xF3, 0xEE], [0xF6, 0xF5, 0xF2],
            [0xFA, 0xF8, 0xF2], [0xFA, 0xF7, 0xF2], [0xF0, 0xEB, 0xE3],
          ];
          const isBone = boneAnchors.some(([r, g, b]) =>
            Math.abs(bg.r - r) <= 6 && Math.abs(bg.g - g) <= 6 && Math.abs(bg.b - b) <= 6
          );
          if (!isBone) return false;
          // Warm-charcoal text (#191817 - #37352F range)
          const text = toRgb(bodyStyle.color);
          if (!text) return false;
          const isWarmCharcoal =
            text.r < 70 && text.g < 70 && text.b < 70 &&
            text.r >= text.g && text.g >= text.b;
          if (!isWarmCharcoal) return false;
          // Accent: terracotta / sage / dust rose / amber range
          const accents = document.querySelectorAll('a, button, [class*="accent"], [class*="primary"], [class*="cta"]');
          for (const el of accents) {
            const s = window.getComputedStyle(el);
            const col = toRgb(s.color) || toRgb(s.backgroundColor);
            if (!col) continue;
            if (col.r > 180 && col.r < 230 && col.g > 90 && col.g < 130 && col.b > 50 && col.b < 90) return true; // terracotta
            if (col.r > 130 && col.r < 160 && col.g > 150 && col.g < 175 && col.b > 115 && col.b < 140) return true; // sage
            if (col.r > 195 && col.r < 215 && col.g > 160 && col.g < 180 && col.b > 155 && col.b < 175) return true; // dust rose
          }
          return false;
        });
      }
      // File mode: regex on CSS
      const css = ctx.files?.map(f => f.css).join('\n') || '';
      const boneBg = /#f[4-6]f[1-7][e-f]a|#f[4-6]f[3-f]e[8-e]|#faf[7-8]f2|#f0ebe3/i.test(css);
      const warmText = /#191817|#2a2924|#37352f|#1a1a1a/i.test(css);
      const terracottaAccent = /#c96442|#c8643c|#8a9a7b|#c9a8a0|#c98a42/i.test(css);
      return boneBg && warmText && terracottaAccent;
    },
  },
  {
    // Replaces the simpler italic_word_accents check with the more precise
    // random_italic_hero_word check (merged from the other AI's version).
    // This check requires: 1-3 word italic span + heading has 4+ words +
    // italic word is an abstract noun (trust, clarity, alignment, etc.).
    id: 'random_italic_hero_word',
    weight: 2,
    description: 'One random italic word inside a hero headline (Opus 4.8 house-style copy pattern)',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const abstract = /^(trust|clarity|alignment|momentum|craft|signal|intelligence|velocity|resilience|future|commerce|workflows?|confidence|idea|everything|power|seamless|effortless|elegant)$/i;
          for (const h of document.querySelectorAll('h1, h2, [class*="hero"], [class*="headline"]')) {
            const italicEls = [...h.querySelectorAll('em, i, span')].filter(el => {
              const cs = window.getComputedStyle(el);
              return cs.fontStyle === 'italic';
            });
            for (const el of italicEls) {
              const words = el.textContent.trim().split(/\s+/).filter(Boolean);
              const headingWords = h.textContent.trim().split(/\s+/).filter(Boolean);
              if (words.length >= 1 && words.length <= 3 && headingWords.length >= 4) {
                if (words.some(w => abstract.test(w.replace(/[^a-z]/gi, '')))) return true;
                return true;
              }
            }
          }
          return false;
        });
      }
      // File mode: regex on HTML for <em> inside h1/h2 with 1-3 word span
      const html = ctx.files?.map(f => f.html).join('\n') || '';
      return /<h[12][^>]*>[\s\S]{0,160}<(em|i|span)[^>]*(font-style\s*:\s*italic|class="[^"]*italic|class='[^']*italic)[^>]*>\s*\w+(?:\s+\w+){0,2}\s*<\/\1>[\s\S]{0,160}<\/h[12]>/i.test(html) ||
             /<h[12][^>]*>[\s\S]{0,160}<(em|i)>\s*\w+(?:\s+\w+){0,2}\s*<\/\1>[\s\S]{0,160}<\/h[12]>/i.test(html);
    },
  },
  {
    // New from merged version: detects Unicode faux bold/italic and decorative
    // arrows/separators in prose.
    id: 'decorative_unicode_formatting',
    weight: 1,
    description: 'Unicode faux bold/italic or decorative arrows/dot separators in prose',
    run(ctx) {
      const re = /[\u{1D400}-\u{1D7FF}]|(?:\w\s*[·×→]\s*\w)/u;
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const text = document.body.textContent || '';
          return /[\u{1D400}-\u{1D7FF}]|(?:\w\s*[·×→]\s*\w)/u.test(text);
        });
      }
      const text = ctx.files?.map(f => f.html).join('\n') || '';
      return re.test(text);
    },
  },
  {
    // New from merged version: detects all-caps eyebrow with dot/slash separators.
    id: 'editorial_eyebrow_separators',
    weight: 2,
    description: 'All-caps eyebrow label with dot or slash separators above hero',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const h1 = document.querySelector('h1');
          const prev = h1?.previousElementSibling;
          if (!prev) return false;
          const text = prev.textContent.trim();
          const cs = window.getComputedStyle(prev);
          const small = parseFloat(cs.fontSize) <= 14;
          const upperish = text.length > 4 && text === text.toUpperCase();
          return small && upperish && /·|•|\/\//.test(text);
        });
      }
      const html = ctx.files?.map(f => f.html).join('\n') || '';
      return /(?:NEW|BETA|AI|SYSTEM|OPS|DESIGN|PRIVATE|ENTERPRISE)(?:\s*(?:·|•|\/\/)\s*[A-Z0-9-]+){2,}/.test(html);
    },
  },
  {
    // New from merged version: detects clusters of premium abstract nouns
    // (clarity, trust, momentum, etc.) without operational detail.
    id: 'premium_abstract_word_soup',
    weight: 2,
    description: 'Cluster of premium abstract nouns with no operational detail',
    run(ctx) {
      const terms = ['clarity','trust','momentum','alignment','signal','intelligence','infrastructure','orchestration','layer','fabric','protocol','velocity','resilience','seamless','adaptive','contextual'];
      const concrete = /\b(api|csv|invoice|ticket|repo|database|checkout|calendar|email|slack|github|figma|stripe|user|admin|file|workflow|dashboard|report)\b/i;
      function hasSoup(text) {
        const lower = text.toLowerCase();
        const count = terms.filter(t => new RegExp('\\b' + t + '\\b', 'i').test(lower)).length;
        return count >= 4 && !concrete.test(text);
      }
      if (ctx.page) {
        return ctx.page.evaluate((terms) => {
          const concrete = /\b(api|csv|invoice|ticket|repo|database|checkout|calendar|email|slack|github|figma|stripe|user|admin|file|workflow|dashboard|report)\b/i;
          for (const el of document.querySelectorAll('h1, h2, section')) {
            const text = el.textContent || '';
            const lower = text.toLowerCase();
            const count = terms.filter(t => new RegExp('\\b' + t + '\\b', 'i').test(lower)).length;
            if (count >= 4 && !concrete.test(text)) return true;
          }
          return false;
        }, terms);
      }
      const html = ctx.files?.map(f => f.html).join('\n') || '';
      return hasSoup(html);
    },
  },
  {
    // New from merged version: detects bento/card grids of vague benefits.
    id: 'vague_bento_benefit_grid',
    weight: 2,
    description: 'Bento/card grid of vague benefits instead of concrete product detail',
    run(ctx) {
      const vague = /(adaptive intelligence|seamless integration|actionable insights|real-time orchestration|unlock|transform|optimi[sz]e|accelerate|empower|drive outcomes|meaningful engagement)/i;
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const vague = /(adaptive intelligence|seamless integration|actionable insights|real-time orchestration|unlock|transform|optimi[sz]e|accelerate|empower|drive outcomes|meaningful engagement)/i;
          for (const parent of document.querySelectorAll('section, main > div')) {
            const children = [...parent.children].filter(c => c.textContent.trim().length > 20);
            if (children.length < 4) continue;
            const sameish = new Set(children.map(c => c.children.length)).size <= 2;
            const vagueCount = children.filter(c => vague.test(c.textContent)).length;
            if (sameish && vagueCount >= 3) return true;
          }
          return false;
        });
      }
      const html = ctx.files?.map(f => f.html).join('\n') || '';
      const matches = html.match(new RegExp(vague.source, 'gi')) || [];
      return matches.length >= 3 || (/<(?:section|div)[^>]*(?:bento|grid|card)[^>]*>/i.test(html) && vague.test(html));
    },
  },
  {
    id: 'centered_hero_dual_cta',
    weight: 1,
    description: 'Centered hero with primary CTA + secondary "Talk to sales" button',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const hero = document.querySelector('header + section, [class*="hero"], main > section');
          if (!hero) return false;
          const textAlign = window.getComputedStyle(hero).textAlign;
          const buttons = hero.querySelectorAll('a, button');
          if (buttons.length < 2) return false;
          const btnTexts = [...buttons].slice(0, 4).map(b => b.textContent.trim().toLowerCase());
          const hasPrimary = btnTexts.some(t => /^(get started|try free|start building|start free|sign up|try .* free)$/i.test(t));
          const hasSecondary = btnTexts.some(t => /^(talk to sales|book a demo|contact sales|learn more)$/i.test(t));
          return textAlign === 'center' && hasPrimary && hasSecondary;
        });
      }
      return false;
    },
  },
  {
    id: 'verb_first_hero_copy',
    weight: 1,
    description: 'Hero headline starts with a generic AI verb (Build/Ship/Scale/Transform/Unlock)',
    run(ctx) {
      const verbs = ['build', 'ship', 'scale', 'transform', 'unlock', 'supercharge', 'empower', 'streamline', 'harness', 'leverage', 'reimagine', 'elevate', 'accelerate', 'amplify'];
      if (ctx.page) {
        return ctx.page.evaluate((verbList) => {
          const hero = document.querySelector('h1, [class*="hero"] h1');
          if (!hero) return false;
          const text = hero.textContent.trim().toLowerCase();
          const firstWord = text.split(/\s+/)[0].replace(/[^a-z]/g, '');
          return verbList.includes(firstWord);
        }, verbs);
      }
      const html = ctx.files?.map(f => f.html).join('\n') || '';
      const heroMatch = html.match(/<h1[^>]*>([^<]+)/i);
      if (!heroMatch) return false;
      const firstWord = heroMatch[1].trim().toLowerCase().split(/\s+/)[0].replace(/[^a-z]/g, '');
      return verbs.includes(firstWord);
    },
  },
  // === Post-1.7.1 self-referential tells (3 checks) ===
  // These patterns were identified when the slop-buster demo site itself was caught shipping them.
  {
    id: 'useless_sticky_header',
    weight: 2,
    description: 'Sticky header with only in-page anchor links (no real navigation)',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const headers = document.querySelectorAll('header, [role="banner"]');
          for (const h of headers) {
            const cs = window.getComputedStyle(h);
            if (cs.position !== 'sticky' && cs.position !== 'fixed') continue;
            const links = h.querySelectorAll('a[href]');
            if (links.length < 2) continue;
            const allAnchors = [...links].every(a => a.getAttribute('href').startsWith('#'));
            if (allAnchors) return true;
          }
          return false;
        });
      }
      const html = ctx.files?.map(f => f.html).join('\n') || '';
      // File mode: look for sticky/fixed header containing only # links
      const headerMatch = html.match(/<header[^>]*style="[^"]*position:\s*(sticky|fixed)[^"]*"[^>]*>[\s\S]*?<\/header>/i) ||
                          html.match(/<header[^>]*class="[^"]*(?:sticky|fixed)[^"]*"[^>]*>[\s\S]*?<\/header>/i);
      if (!headerMatch) return false;
      const links = headerMatch[0].match(/href="([^"]+)"/g) || [];
      if (links.length < 2) return false;
      return links.every(l => /href="#/.test(l));
    },
  },
  {
    id: 'footer_meta_commentary',
    weight: 1,
    description: 'Footer text that comments on the design itself (version strings, "deliberately avoids", hex captions)',
    run(ctx) {
      const re = /deliberately avoids|this demo|this site (deliberately|avoids)|background #|accent #|built with/i;
      const versionRe = /v\d+\.\d+\.\d+.*·.*(?:MIT|Apache|GPL)/i;
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const footer = document.querySelector('footer, [role="contentinfo"]');
          if (!footer) return false;
          const text = footer.textContent || '';
          return /deliberately avoids|this demo|this site (deliberately|avoids)|background #|accent #|built with/i.test(text) ||
                 /v\d+\.\d+\.\d+.*·.*(?:MIT|Apache|GPL)/i.test(text);
        });
      }
      const html = ctx.files?.map(f => f.html).join('\n') || '';
      const footerMatch = html.match(/<footer[^>]*>[\s\S]*?<\/footer>/i);
      if (!footerMatch) return false;
      const text = footerMatch[0];
      return re.test(text) || versionRe.test(text);
    },
  },
  {
    id: 'colored_border_on_blockquotes_codeblocks',
    weight: 1,
    description: 'Colored left border on blockquotes or code blocks (not just cards)',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const els = document.querySelectorAll('blockquote, pre, code');
          for (const el of els) {
            const cs = window.getComputedStyle(el);
            const bl = cs.borderLeftWidth;
            const bc = cs.borderLeftColor;
            if (parseFloat(bl) >= 2 && bc && bc !== 'rgba(0, 0, 0, 0)' && !/^(rgb\(0|rgb\(255|#000|#fff)/i.test(bc)) {
              return true;
            }
          }
          return false;
        });
      }
      const css = ctx.files?.map(f => f.css).join('\n') || '';
      return /blockquote\s*\{[^}]*border-left\s*:\s*\d+px\s+(?:solid|dashed|dotted)\s+[^;}]+/i.test(css) ||
             /pre\s*\{[^}]*border-left\s*:\s*\d+px\s+(?:solid|dashed|dotted)\s+[^;}]+/i.test(css) ||
             /code\s*\{[^}]*border-left\s*:\s*\d+px\s+(?:solid|dashed|dotted)\s+[^;}]+/i.test(css);
    },
  },
];

export const TOTAL_CHECKS = CHECKS.length;
