// checks.mjs
// Shared checks for both URL (Playwright) and static file detection modes.
// 30 checks for Stop Slop Ultimate.
// Each check is { id, weight, description, run(ctx) }.
// ctx differs by mode:
//   - URL mode: ctx = { page }
//   - file mode: ctx = { files: [{ path, html, css }] }
// Each check handles both modes. Returns boolean (true = slop detected).

export const CHECKS = [
  // === Typography (6 checks) ===
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

  // === Color (6 checks) ===
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
      const purpleHexes = ['#7c3aed', '#8b5cf6', '#a78bfa', '#6d28d9', '#9333ea', '#a855f7', '#c084fc'];
      return purpleHexes.some(hex => css.toLowerCase().includes(hex));
    },
  },
  {
    id: 'blue_purple_gradient',
    weight: 2,
    description: 'Blue-to-purple gradient',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const els = document.querySelectorAll('*');
          for (const el of els) {
            const bg = window.getComputedStyle(el).backgroundImage;
            if (bg && bg.includes('gradient')) {
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
  {
    id: 'aurora_mesh_background',
    weight: 2,
    description: 'Aurora or mesh gradient background (blurred color blobs)',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const els = document.querySelectorAll('*');
          let blurCount = 0;
          for (const el of els) {
            const cs = window.getComputedStyle(el);
            const filter = cs.filter;
            if (filter && filter.includes('blur') && parseFloat(filter.match(/blur\((\d+)/)?.[1] || '0') > 50) {
              blurCount++;
            }
          }
          return blurCount >= 2;
        });
      }
      const css = ctx.files?.map(f => f.css).join('\n') || '';
      const matches = css.match(/filter\s*:\s*blur\((\d+)px\)/gi) || [];
      return matches.filter(m => parseInt(m.match(/\d+/)[0]) > 50).length >= 2;
    },
  },

  // === Layout (8 checks) ===
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
  {
    id: 'centered_hero_trio',
    weight: 2,
    description: 'Centered hero with badge + H1 + subhead + 2 CTAs',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const hero = document.querySelector('header, section');
          if (!hero) return false;
          const cs = window.getComputedStyle(hero);
          if (cs.textAlign !== 'center') return false;
          const h1 = hero.querySelector('h1');
          const buttons = hero.querySelectorAll('button, a[role="button"], a.btn, a.button');
          const prev = h1?.previousElementSibling;
          const hasBadge = prev && parseFloat(window.getComputedStyle(prev).fontSize) < 14;
          const subhead = h1?.nextElementSibling;
          return hasBadge && h1 && subhead && buttons.length >= 2;
        });
      }
      return false;
    },
  },
  {
    id: 'trusted_by_logo_strip',
    weight: 2,
    description: '"Trusted by" grayscale logo strip below hero',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const imgs = document.querySelectorAll('img');
          for (const img of imgs) {
            const cs = window.getComputedStyle(img);
            const filter = cs.filter || '';
            const opacity = parseFloat(cs.opacity);
            const isGrayscale = filter.includes('grayscale');
            const isFaded = opacity < 0.7 && opacity > 0;
            if (isGrayscale || isFaded) {
              // Check if this is part of a row of similar images
              const parent = img.parentElement;
              const siblings = parent ? [...parent.children].filter(c => c.tagName === 'IMG') : [];
              if (siblings.length >= 3) return true;
            }
          }
          return false;
        });
      }
      const css = ctx.files?.map(f => f.css).join('\n') || '';
      return /filter\s*:\s*grayscale/i.test(css) || /opacity\s*:\s*0\.[1-5]/i.test(css);
    },
  },
  {
    id: 'modal_abuse',
    weight: 1,
    description: 'Modal containing complex content (scrollable or multi-column)',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const modals = document.querySelectorAll('[role="dialog"], .modal, [data-modal]');
          for (const modal of modals) {
            const cs = window.getComputedStyle(modal);
            const isScrollable = parseFloat(cs.maxHeight) > 0 && modal.scrollHeight > modal.clientHeight;
            const interactive = modal.querySelectorAll('button, input, select, a').length;
            return isScrollable || interactive > 5;
          }
          return false;
        });
      }
      return false;
    },
  },

  // === Sequence (5 checks) ===
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
  {
    id: 'pricing_most_popular_badge',
    weight: 2,
    description: '3-tier pricing with "Most Popular" badge',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const text = document.body.textContent.toLowerCase();
          const hasMostPopular = text.includes('most popular') || text.includes('recommended');
          const pricingSection = [...document.querySelectorAll('section')].find(s =>
            /pricing|plan/i.test(s.textContent) && s.querySelectorAll('button, a.btn').length >= 3);
          return hasMostPopular && !!pricingSection;
        });
      }
      const html = ctx.files?.map(f => f.html).join('\n') || '';
      const htmlLower = html.toLowerCase();
      return htmlLower.includes('most popular') && /pricing|plan/i.test(htmlLower);
    },
  },
  {
    id: 'faq_accordion_before_footer',
    weight: 1,
    description: 'FAQ accordion immediately before footer',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const footer = document.querySelector('footer');
          if (!footer) return false;
          const prev = footer.previousElementSibling;
          if (!prev) return false;
          return prev.querySelectorAll('details, [role="button"][aria-expanded]').length >= 3;
        });
      }
      const html = ctx.files?.map(f => f.html).join('\n') || '';
      const footerMatch = html.match(/<footer[\s\S]*?<\/footer>/i);
      if (!footerMatch) return false;
      const beforeFooter = html.slice(0, html.indexOf(footerMatch[0]));
      return /<details|role="button"\s+aria-expanded/i.test(beforeFooter.slice(-2000));
    },
  },
  {
    id: 'amputated_mobile_features',
    weight: 2,
    description: 'Critical features hidden on mobile via display:none',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          // This check requires running at mobile viewport
          return false; // Detected via responsive design testing
        });
      }
      const css = ctx.files?.map(f => f.css).join('\n') || '';
      const mediaMatches = css.match(/@media[^{]*max-width[^{]*\{[^}]*display\s*:\s*none[^}]*\}/gi) || [];
      return mediaMatches.length >= 2;
    },
  },

  // === Motion (6 checks) ===
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
  {
    id: 'scroll_jacking',
    weight: 2,
    description: 'Scroll-snap mandatory or JS scroll hijacking',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const cs = window.getComputedStyle(document.documentElement);
          return cs.scrollSnapType === 'mandatory' || cs.scrollSnapType.includes('mandatory');
        });
      }
      const css = ctx.files?.map(f => f.css).join('\n') || '';
      return /scroll-snap-type\s*:\s*[xy]\s+mandatory/i.test(css);
    },
  },
  {
    id: 'custom_cursor',
    weight: 2,
    description: 'Custom cursor replacing the system cursor',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const els = document.querySelectorAll('*');
          for (const el of els) {
            if (window.getComputedStyle(el).cursor === 'none') return true;
          }
          return false;
        });
      }
      const css = ctx.files?.map(f => f.css).join('\n') || '';
      return /cursor\s*:\s*none/i.test(css) && /cursor/i.test(css);
    },
  },
  {
    id: 'sparkle_emoji_badge',
    weight: 2,
    description: 'AI sparkle emoji (✨) used as badge or indicator',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          return document.body.textContent.includes('✨');
        });
      }
      const html = ctx.files?.map(f => f.html).join('\n') || '';
      return html.includes('✨');
    },
  },
  {
    id: 'rocket_emoji_hero',
    weight: 1,
    description: 'Rocket emoji (🚀) in hero or CTA',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const hero = document.querySelector('header, section');
          return hero ? hero.textContent.includes('🚀') : false;
        });
      }
      const html = ctx.files?.map(f => f.html).join('\n') || '';
      const heroMatch = html.match(/<(header|section)[^>]*>[\s\S]*?<\/\1>/i);
      return heroMatch ? heroMatch[0].includes('🚀') : false;
    },
  },

  // === Content (4 checks) ===
  {
    id: 'trusted_by_unverifiable',
    weight: 1,
    description: '"Trusted by 10,000+ companies" with no linkable logos',
    run(ctx) {
      const re = /trusted by\s+\d/i;
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const text = document.body.textContent;
          return /trusted by\s+\d/i.test(text);
        });
      }
      const html = ctx.files?.map(f => f.html).join('\n') || '';
      return re.test(html);
    },
  },
  {
    id: 'fake_star_testimonials',
    weight: 2,
    description: 'Star ratings with no link to review platform',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const stars = document.querySelectorAll('[class*="star"], [data-stars], .rating');
          for (const star of stars) {
            const text = star.textContent.toLowerCase();
            if (text.includes('★') || text.includes('⭐') || /\d\.\d/.test(text)) {
              const hasLink = star.closest('a');
              if (!hasLink) return true;
            }
          }
          return false;
        });
      }
      const html = ctx.files?.map(f => f.html).join('\n') || '';
      return /class="[^"]*star|★|⭐/i.test(html) && !/g2\.com|capterra\.com|trustpilot\.com|appstore/i.test(html);
    },
  },
  {
    id: 'vague_headline',
    weight: 2,
    description: 'Vague aspirational headline (could fit any product)',
    run(ctx) {
      const vaguePatterns = [
        /build the future/i,
        /transform your/i,
        /empower your/i,
        /innovate at scale/i,
        /next-gen platform/i,
        /seamless integration/i,
        /ai-powered solutions/i,
        /the future of/i,
        /revolutionary/i,
      ];
      if (ctx.page) {
        return ctx.page.evaluate((patterns) => {
          const h1 = document.querySelector('h1');
          if (!h1) return false;
          const text = h1.textContent;
          return patterns.some(p => new RegExp(p, 'i').test(text));
        }, vaguePatterns.map(p => p.source));
      }
      const html = ctx.files?.map(f => f.html).join('\n') || '';
      const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
      if (!h1Match) return false;
      return vaguePatterns.some(p => p.test(h1Match[1]));
    },
  },
  {
    id: 'redundant_ux_writing',
    weight: 1,
    description: 'Label + sublabel + helper text all saying the same thing',
    run(ctx) {
      if (ctx.page) {
        return ctx.page.evaluate(() => {
          const containers = document.querySelectorAll('label, .field, .form-group, .input-group');
          for (const c of containers) {
            const texts = [...c.querySelectorAll('span, p, small, div')]
              .map(el => el.textContent.trim().toLowerCase())
              .filter(t => t.length > 5);
            if (texts.length >= 3) {
              // Check for high overlap
              const first = new Set(texts[0].split(/\s+/));
              const overlaps = texts.slice(1).map(t => {
                const words = new Set(t.split(/\s+/));
                const intersection = [...first].filter(w => words.has(w));
                return intersection.length / Math.min(first.size, words.size);
              });
              if (overlaps.every(o => o > 0.7)) return true;
            }
          }
          return false;
        });
      }
      return false;
    },
  },
];

export const TOTAL_CHECKS = CHECKS.length;
