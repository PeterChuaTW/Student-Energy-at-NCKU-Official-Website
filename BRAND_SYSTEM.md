# STUDENT ENERGY AT NCKU - OFFICIAL BRAND SYSTEM

Based on Student Energy Global Style Guide 2024.

## Colors

Define these CSS variables in `:root` of `src/index.css`:

```css
/* SE Global official primary colors */
--color-blue: #317DB2; /* Steel blue: headings, buttons, banners, borders */
--color-green: #ABC737; /* Yellow green: secondary accent, graphic elements */

/* SE Global official secondary colors */
--color-snow: #FDFEFC; /* Near-white for text on dark backgrounds */
--color-sdg7: #F9B817; /* Contrasting accent in gradients */
--color-alert: #F04B58; /* Decorative elements only, use sparingly */

/* Chapter-defined dark backgrounds */
--color-bg-deep: #0d1b2a; /* Deepest background */
--color-bg-section: #16213e; /* Section backgrounds */
--color-bg-card: #1a2744; /* Card backgrounds */
```

### Color Rules (Strict)

- Use `#317DB2` for all primary interactive elements: buttons, active nav, borders, image overlays (`30-70%` opacity on photos).
- Use `#ABC737` as accent for tags, badges, highlights, and hover states.
- Text on dark backgrounds must always use `#FDFEFC`, never `#FFFFFF`.
- Forbidden: blue-green gradient.
- Use `#F9B817` only as a contrasting accent when the design already has substantial blue/green.
- Use `#F04B58` only for small decorative graphics, never large surface areas.

## Typography

Font files are stored in `public/fonts/` and should be loaded with `@font-face` in `src/index.css`.

### Bebas Neue Pro

- `public/fonts/Bebas Neue Pro Light.otf` -> `font-weight: 300`
- `public/fonts/Bebas Neue Pro Regular.otf` -> `font-weight: 400`
- `public/fonts/Bebas Neue Pro Bold.otf` -> `font-weight: 700`
- `font-family: 'Bebas Neue Pro'`

### Source Sans Pro

- `public/fonts/SourceSansPro-Light.otf` -> `font-weight: 300`, normal
- `public/fonts/SourceSansPro-Regular.otf` -> `font-weight: 400`, normal
- `public/fonts/SourceSansPro-SemiBold.otf` -> `font-weight: 600`, normal
- `public/fonts/SourceSansPro-Bold.otf` -> `font-weight: 700`, normal
- `public/fonts/SourceSansPro-LightIt.otf` -> `font-weight: 300`, italic
- `public/fonts/SourceSansPro-BoldIt.otf` -> `font-weight: 700`, italic
- `font-family: 'Source Sans Pro'`

### Usage Rules

- Hero title (display): `Bebas Neue Pro 400`, `text-7xl md:text-9xl`, `tracking-wide`
- H1 page title: `Bebas Neue Pro 400`, `text-5xl md:text-7xl`, `tracking-wide`
- H2 section title: `Bebas Neue Pro 400`, `text-4xl md:text-5xl`, `tracking-wide`
- H3 subheading: `Source Sans Pro 600`, `text-xl md:text-2xl`
- Decorative large text: `Bebas Neue Pro 300`, `text-8xl+`, `tracking-widest`, low opacity
- Body text: `Source Sans Pro 300`, `text-base`, `leading-relaxed` (`1.7`)
- UI text / nav: `Source Sans Pro 400`, `text-sm`
- Buttons: `Source Sans Pro 700`, `text-sm uppercase tracking-wider`
- Badges / tags / labels: `Source Sans Pro 600`, `text-xs uppercase tracking-widest`
- Stats numbers: `Bebas Neue Pro 400`, `text-5xl md:text-6xl`, `text-[#317DB2]`
- Quote / testimonial: `Source Sans Pro 300 italic`
- Emphasized text: `Source Sans Pro 700` (bold)

### Tailwind Font Family Config

Add this to `tailwind.config.js`:

```js
fontFamily: {
  bebas: ['"Bebas Neue Pro"', 'sans-serif'],
  source: ['"Source Sans Pro"', 'sans-serif'],
}
```

### Typography Rules

- `Bebas Neue Pro` is only for titles, headings, large numbers, and logo.
- Never use `Bebas Neue Pro` below `24px`.
- Use `tracking-wide` to `tracking-widest` for `Bebas Neue Pro`.
- Use `leading-none` (`0.9-1.0`) for large `Bebas Neue Pro` titles.
- `Source Sans Pro` is for all body, UI, nav, buttons, labels, and card content.
- Use `leading-relaxed` (`1.6-1.8`) for body text.
- Use sentence case for regular text (not Title Case), except proper nouns.
- Never mix `Bebas Neue Pro` and `Source Sans Pro` in the same text element.
- Text on dark backgrounds must always use `--color-snow` (`#FDFEFC`).

## Design Principles

From SE Global official guide:

1. Clean, bright colors; avoid muddy or overly muted tones.
2. Use geometric shapes and graphic elements.
3. People-centered design: prioritize real photos with faces over illustrations.
4. Use active, clear language for a global audience.
5. Keep spacing consistent; minimum `16px` padding from edges.
6. Blue (`#317DB2`) may be used as a transparent photo overlay (`30-70%`).

Chapter-specific aesthetic direction:

- Retro-futuristic x organic energy.
- Dark deep-space backgrounds (`#0d1b2a`) with bright brand color accents.
- Asymmetric layouts; intentionally break rigid grid symmetry.
- One orchestrated staggered page-load animation per page.

## Forbidden

- Blue-green gradient.
- `Inter`, `Roboto`, `Arial`, or system fonts as primary typography.
- Pure white text (`#FFFFFF`); use `#FDFEFC` (`--color-snow`) instead.
- Purple in any form.
- Generic clip-art style vectors.
- Title Case for regular text.
- `Bebas Neue Pro` below `24px`.
- Centered-only layouts.
