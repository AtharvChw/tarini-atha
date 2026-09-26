# PROJECT BUILD PROMPT — TĀRINI

Reference: https://www.athyeka.com/
New brand: **TĀRINI**
Positioning: high-luxury Kanjivaram and heritage silk house
Cloudflare target: `tarini-atha.pages.dev`

## 5-line Reference DNA
1. The reference is deliberately focused around a few named silk collections instead of a huge department-store taxonomy.
2. Its minimal navigation keeps attention on collections, Weaver's Heritage, contact, account, search/cart and a light/dark mode interaction.
3. Collection pages combine a short editorial introduction with item count, filter/sort and large product imagery.
4. Product pages extend beyond specifications into real-zari, handwoven, cultural-luxury and preservation storytelling.
5. Preserve quiet confidence and heritage depth, but replace the reference brand, copy, imagery, typography and exact styling.

## Design thesis
**A quiet digital silk archive where luminous Kanjivaram textiles are treated as collectible works of weaving rather than ordinary ecommerce inventory.**

Creative system: **THE SILK ARCHIVE**.

## Original visual system
Palette: paper `#F7F1E8`, ivory `#FCF9F3`, ink `#1D1A17`, muted `#716A61`, peacock `#194D49`, oxblood `#6B2E33`, zari accent `#A88955` used sparingly. Display: Cormorant Garamond. Body/UI: Manrope. Metadata: IBM Plex Mono sparingly.

## Homepage
1. Quiet shipping/private-consultation announcement only when factual.
2. Minimal transparent header.
3. Hero: macro silk + full-drape editorial split, generous negative space.
4. Three signature collection chapters.
5. Featured Masterpiece — one high-value saree.
6. Zari Study — macro border/pallu/weave story.
7. Curated arrivals.
8. Weaver's Archive / craftsmanship.
9. Occasion editorial.
10. Private consultation/contact.
11. Newsletter + restrained footer.

## Navigation
TĀRINI | Collections | Kanjivaram | Organza | The Weave | Journal | Search | Account | Bag. Mega menu stays intentionally small: Signature Collections, By Weave, By Occasion, New. Add an original optional DAY/DUSK display mode inspired by the reference's theme behavior; remember preference and never distort product-image color.

## PLP
2–3 column luxury grid, 4:5 imagery, editorial collection intro. Filters: weave, fabric, color, occasion, availability, price. Product names/prices quiet; hover may crossfade to pallu/detail image. Avoid discount-heavy merchandising.

## PDP
Large gallery: full drape, pallu, border, blouse, zari macro, worn detail. Sticky desktop purchase column. Title, price, made-to-order/availability, silk/zari specs, dimensions, blouse info, care/preservation, craft notes, delivery help, appointment/enquiry for high-value pieces, related work. Create an original **Weave Notes** editorial sequence instead of copying benefit blocks.

## Signature interaction
**SILK LIGHT TABLE:** user subtly moves light across pre-rendered macro weave images to understand zari shimmer/texture. Prefer crossfaded image sequence; do not fake realtime 3D if accurate assets do not exist.

## Auth / analytics
No Clerk by default; guest checkout + local wishlist. PostHog: collection_viewed, product_viewed, weave_filter_used, macro_detail_opened, consultation_clicked, add_to_bag, checkout_started.

## Image direction
Museum-like silk photography, warm ivory backdrops, realistic Indian skin, elegant draping, precise pallu/border closeups, natural zari highlights, restrained jewellery, no palace/wedding-stage clutter. Hero brief: one Kanjivaram model positioned right, left 35% calm text space, warm architectural interior, 50–85mm editorial lens, no text/logo.

# GLOBAL IMPLEMENTATION RULES

Use the reference only for structure, UX, navigation, ecommerce flow, interaction logic and information architecture. Do not copy its brand, logo, proprietary copy, product photography, trademarks, exact typography or exact visual styling. The result must be: **reference-quality UX + original identity + improved implementation**.

## Global frontend rules
- Build the complete responsive storefront, not only a homepage.
- Prefer React + TypeScript + Tailwind. Use Next.js only after verifying the chosen Cloudflare Pages-compatible deployment mode; otherwise React + Vite is acceptable for a clean Pages deployment.
- Use Supabase for products, variants, collections, stores, enquiries, optional orders/wishlist/reviews, with RLS and typed data access.
- Use Clerk only when explicitly justified in this project.
- Use PostHog only for meaningful commerce events.
- Use Context7/current official docs for framework, Cloudflare, Supabase, Clerk, PostHog, animation and payment-provider APIs.
- Use shadcn/ui/React Aria only as accessible primitives; restyle completely.
- Never let a component library define the visual identity.

## Design system
Create tokens for background, surfaces, text, muted text, borders, accents, spacing, radii, shadows and motion. Use a 12-column desktop editorial grid, 1600–1720px max content width, desktop gutters 48–72px, tablet 28–40px, mobile 20–24px. Base spacing: 4/8/12/16/24/32/48/64/96/128. Keep product imagery dominant.

Avoid excessive gold, generic Indian-wedding motifs, glassmorphism, random gradients, floating cards, unnecessary Bento sections, 20–32px rounding everywhere, purple/blue futuristic styling and decorative motion without purpose.

## Product cards
Large image, optional alternate hover image, product name, category/fabric, price, compare-at price only when real, availability/dispatch label when useful, wishlist, real color variants only. Do not add permanent Quick Add when product configuration is complex. Mobile must not depend on hover.

## Search
Support product names, categories, fabrics, collections, colors, occasions and keywords. Include keyboard-first search overlay, recent searches, popular categories, live product suggestions and a designed no-results state.

## Wishlist / cart
Wishlist: instant feedback, local persistence for guests, optional account sync. Cart: accessible desktop drawer/mobile sheet with image, variant, quantity, price, edit/remove, subtotal, shipping note, checkout CTA, loading/error/empty states.

## Checkout
Use a payment-provider adapter. If live credentials are absent, never fake a successful payment; implement test/provider-ready checkout and document env vars. Secret payment operations must be server/edge-side.

## Supabase model
At minimum support: products, product_variants, product_media, categories, collections, occasions, fabrics, stores, newsletter_subscriptions, contact_submissions/appointments. Add orders/order_items/wishlist/reviews only when implemented. Use foreign keys, indexes, validation and RLS. Never expose service-role keys in the browser.

## Motion
Use restrained image reveals, crop shifts, mask reveals, menu/cart transitions and short crossfades. Default ease `cubic-bezier(0.16,1,0.3,1)`; micro 150–220ms, UI 250–350ms, imagery 450–700ms. Avoid bounce, giant spring overshoot, autoplay decorative motion and over-cinematic basic ecommerce. Respect `prefers-reduced-motion`.

## Mobile
Design separately. Compact sticky header, strong search, full-screen menu, thumb-friendly filter/sort, 44px touch targets, strong product crop, sticky Add to Bag where useful, no hover-only information, no horizontal overflow. Test 360/375/390/430/768/1024/1280/1440/1920.

## Accessibility
Semantic HTML, keyboard navigation, visible focus, accessible mega menu/drawers/dialogs/forms, logical headings, alt text, contrast, reduced motion and non-color status cues.

## Performance
AVIF/WebP, responsive image sizes, explicit dimensions, hero-only preload, lazy load the rest, optimized fonts, code splitting, minimal client JS, lazy heavy lightboxes/drawers. Target strong LCP/CLS/INP. Never preload the entire catalogue.

## SEO
Per-route metadata, canonical, Open Graph, sitemap, robots, breadcrumbs, Product/Offer/Organization/BreadcrumbList/Article structured data where accurate. Never fabricate ratings, reviews, heritage dates, awards, provenance or stock.

## Cloudflare Pages
Target `BRAND-atha.pages.dev` using a DNS-safe hyphen form of the user's `brandname_ATHA` convention. Verify current Pages support before implementation. Production build must pass; refresh routing, env vars, assets and preview noindex must work. Do not silently switch final deployment away from Cloudflare Pages.

## Implementation sequence
1. Reinspect live reference at desktop/mobile if browser access exists.
2. Write `/docs/reference-dna.md` and `/docs/implementation-plan.md`.
3. Foundation: framework, TypeScript, Tailwind, fonts, tokens, routes, lint.
4. Supabase schema/RLS/typed access/original seed catalogue.
5. Global UX: announcement, header, mega menu, mobile menu, search, wishlist, cart.
6. Homepage sections.
7. PLP/filter/sort/product cards.
8. PDP/variants/cart/checkout adapter.
9. Brand/story/craft/stores/contact/journal/policies as relevant.
10. PostHog + SEO.
11. Loading/error/empty/out-of-stock/notify states.
12. Responsive/accessibility/performance polish.
13. TypeScript, lint, build, console, route, search, filter, cart, checkout and mobile QA.

## Final quality gate
Ask: could this exact storefront belong to the reference brand if only the logo changed? If yes, make the new identity more original. Preserve useful reference logic, not its creative assets. Product photography must dominate. Filters/search/PDP/cart must be excellent on mobile. Remove anything that looks like generic AI frontend output.

**Final instruction:** IMPLEMENT THE COMPLETE PRODUCTION-ORIENTED WEBSITE. Do not stop at planning, a moodboard, wireframes or a homepage. Use original fictional seed content where business data is missing. Never scrape proprietary reference imagery/copy. Run full engineering, UI/UX, visual, mobile, accessibility and performance review before completion.
