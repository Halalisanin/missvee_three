# Miss Vee Perfume — Product Design Requirements (PDR)
## Concept Three: "Artisanal Storytelling & Emotional Scent"

---

## 1. Design Direction

**Inspiration:** Meo Fusciuni (independent Italian niche fragrance house known for poetic, literary, minimalist branding).

**Vibe:** Nordic minimalism meets intimate storytelling. Dark, quiet, emotional. Every page should feel like walking through a small gallery where each fragrance is an artwork with its own story.

**One-line pitch:** *"Every scent is a memory. Every bottle is a story."*

---

## 2. Target Audience

SA women and men aged 25–45 who:
- Value craftsmanship over mass production
- Read literary fiction and poetry
- Buy from small, independent brands
- See fragrance as personal expression, not status
- Appreciate minimal, non-commercial aesthetics
- Would pay R400–R700 for a meaningful 50ml EDP
- Live across SA (online shoppers)

---

## 3. Colour Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Pure White | `#FFFFFF` | Page backgrounds |
| Warm Off-White | `#F7F5F2` | Subtle section backgrounds |
| Almost Black | `#1A1A1A` | Primary text, headings |
| Deep Ink | `#2C2C2C` | Secondary text |
| Warm Taupe | `#A89787` | Accent, subtle borders |
| Muted Sage | `#8A9A86` | Secondary accent, CTAs |

---

## 4. Typography

- **Headings + Story Text:** Cormorant Garamond (Google Fonts) — serif, literary, emotional
- **Body + UI:** Inter (Google Fonts) — clean, modern, readable

---

## 5. Brand Voice

**Tone:** Poetic, intimate, literary. Writes in first person (Miss Vee). Speaks like a journal entry, not a marketing brochure.

**Rules:**
- Every fragrance has a "Story Behind the Scent" — a personal memory that inspired it
- No industry jargon (no "sillage," "projection," "top notes" in general copy)
- Uses sensory, emotional language
- Short paragraphs. Lots of space. Let the reader breathe.

---

## 6. Product Line

| ID | Name | Type | Price | Story Theme |
|----|------|------|-------|-------------|
| mv3-001 | Silence and Smoke | EDP 50ml/100ml | R425/R625 | Grandmother's incense, morning after loss |
| mv3-002 | The Forgotten Garden | EDP 50ml/100ml | R425/R625 | Abandoned house, wild roses growing through |
| mv3-003 | Letters to Nobody | EDP 50ml/100ml | R425/R625 | Unsent letters, a drawer of words never mailed |
| mv3-004 | Ember and Ash | Diffuser 200ml | R325 | The hour after a fire, embers glowing |
| mv3-005 | Rain on Tin Roof | Diffuser 200ml | R325 | First summer storm in Ekurhuleni |

---

## 7. Page Structure

### Homepage
- Hero: "Scent, Remembered" — large minimal heading, short tagline
- Philosophy/manifesto section — "A fragrance is not a thing you wear..."
- Category tiles: Personal Fragrance / Home Fragrance
- Featured products grid (3 perfumes)
- "About Miss Vee" story section
- Testimonial cards
- Newsletter signup
- Footer

### Shop
- Filter bar: All / Perfumes / Diffusers
- Product grid (5 products)
- Newsletter
- Footer

### Perfumes / Diffusers (Category Pages)
- Breadcrumbs
- Product grid (3 perfumes / 2 diffusers)
- Philosophy quote as divider
- Newsletter
- Footer

### Product Detail
- Breadcrumbs
- Image gallery with thumbnails
- Product name, price, "Story Behind the Scent" block
- Scent pyramid (top / heart / base tags)
- Size selector (50ml / 100ml for EDPs)
- Add to cart with quantity selector
- Trust badges
- Product tabs: Description / Notes & Wear / Shipping & Returns
- Cross-sell "Complete the Ritual"
- Newsletter
- Footer

### About
- "The Story" heading
- Miss Vee's journey (long-form narrative)
- Philosophy quote block
- Newsletter
- Footer

### Scent Guide
- "The Scent Journal" heading
- Educational content: choosing fragrance, fragrance families, wearing perfume, using diffusers, note on memory
- Newsletter
- Footer

### Contact
- Contact form with subject dropdown
- FAQ accordion (5 items)
- Newsletter
- Footer

### Cart
- Empty state with CTA to shop
- Cart items: name, size, quantity controls, line total, remove
- Order summary: subtotal, shipping (free over R500), total
- Checkout button
- Clear cart button
- Newsletter
- Footer

---

## 8. Technical Requirements

- **Static HTML/CSS/JS** — no build tools, no frameworks
- **Cart:** localStorage-based (same pattern as misvee_one)
- **Navigation:** Mobile hamburger toggle (CSS + JS)
- **Product data:** Passed via `data-*` attributes on add-to-cart buttons
- **Cart icon:** Inline SVG (not emoji)
- **Placeholder images:** Unsplash URLs
- **Typography:** Google Fonts (Cormorant Garamond + Inter)
- **GitHub Pages:** Deploy via GitHub Actions workflow
