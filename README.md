# Miss Vee Perfume — Design Prototype (Concept Three)

A static HTML/CSS/JS design prototype for **Miss Vee Perfume Concept Three: "Artisanal Storytelling & Emotional Scent"** — a premium fragrance e-commerce website for a lady-owned South African perfume business, inspired by the narrative depth and Nordic minimalism of **Meo Fusciuni**.

## Brand Identity

| Token | Value |
|-------|-------|
| Concept | Artisanal Storytelling & Emotional Scent |
| Target Audience | Women and men 25–45 who value narrative, artistry, and intentional fragrance |
| Design Inspiration | Meo Fusciuni — Nordic minimalism, intimate storytelling, poetic tone |

### Colours

| Token | Hex | Usage |
|-------|-----|-------|
| Pure White | `#FFFFFF` | Page backgrounds |
| Warm Off-White | `#F7F5F2` | Subtle section backgrounds |
| Almost Black | `#1A1A1A` | Primary text, headings |
| Deep Ink | `#2C2C2C` | Secondary text |
| Warm Taupe | `#A89787` | Accent, subtle borders |
| Muted Sage | `#8A9A86` | Secondary accent, CTAs |

### Typography

- **Headings:** Cormorant Garamond (serif) — literary, emotional, story-driven
- **Body:** Inter (sans-serif) — clean readability

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Homepage: "Scent, Remembered" hero, philosophy, category tiles, featured products, brand story, testimonials, newsletter |
| `shop.html` | All products listing with filter controls (All / Perfumes / Diffusers) |
| `perfumes.html` | Perfumes category (3 products: Silence and Smoke, The Forgotten Garden, Letters to Nobody) |
| `diffusers.html` | Home Diffusers category (2 products: Ember and Ash, Rain on Tin Roof) |
| `product.html` | Product detail — "The Story Behind the Scent" block, scent pyramid, size selector, product tabs, cross-sell |
| `about.html` | Miss Vee's journey, philosophy, personal story |
| `scent-guide.html` | "The Scent Journal" — educational content on fragrance families, wearing perfume, using diffusers |
| `contact.html` | Contact form, FAQ accordion (5 items) |
| `cart.html` | Shopping cart with localStorage, quantity controls, order summary, checkout |

## How to View

Open `index.html` in any modern browser. No build tools or server required.

## Status

**Design Prototype** — This is a visual mockup for client approval. Not a live store.

## Next Steps

1. Client reviews and approves Concept Three direction
2. Replace Unsplash placeholder images with real product photography
3. Replace dummy email/newsletter with actual service (Mailchimp, etc.)
4. Migrate to Shopify (or preferred e-commerce platform) for production

## Project Structure

```
missvee_three/
├── index.html
├── shop.html
├── perfumes.html
├── diffusers.html
├── product.html
├── about.html
├── scent-guide.html
├── contact.html
├── cart.html
├── README.md
├── .github/
│   └── workflows/
│       └── static.yml
├── planning/
│   └── PDR.md
├── content/
│   ├── product-copy.md
│   └── about-copy.md
└── assets/
    ├── css/
    │   └── style.css
    └── js/
        └── main.js
```
