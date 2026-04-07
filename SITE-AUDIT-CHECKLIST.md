# Website Improvement Checklist

This checklist is based on the audit Claude produced for this site, grouped into practical implementation categories.

## 1. Technical SEO

- [ ] Create a real og-image for all key share surfaces and keep the dimensions consistent.
- [x] Expand Open Graph and Twitter card metadata across primary pages.
- [ ] Replace remaining HTML redirect pages in `locations/` with proper server-level redirects where possible.
- [x] Complete the homepage FAQ schema so every visible FAQ item is reflected in JSON-LD.
- [ ] Add stronger internal links between service pages.
- [ ] Add stronger internal links between service-area pages and nearby towns.
- [ ] Add ZIP codes where relevant on local landing pages.
- [ ] Block sensitive files in `robots.txt`, including `receipt.html` and `invoice-blank.pdf`.
- [ ] Convert large images to lighter formats where it improves load time.
- [ ] Minify CSS and JavaScript for production deployment.
- [x] Add page-specific FAQ schema to service pages.
- [ ] Add page-specific FAQ schema to service-area pages.

## 2. E-E-A-T

- [ ] Add real team bios with names, roles, years of experience, and certifications.
- [ ] State how long the company has been in business.
- [ ] Add real customer testimonials with names, locations, and dates.
- [ ] Add `AggregateRating` schema once review data is available.
- [ ] Cite sources for factual claims such as fire statistics and UV effectiveness.
- [ ] Add relevant professional memberships if the business actually holds them.
- [ ] Add certification badges only for real, verifiable credentials.
- [ ] Publish case studies with before/after context and measurable outcomes.
- [ ] Add trust metrics such as homes served, years in business, and review counts.
- [ ] Add before/after image galleries for major services.
- [ ] Add organization or local business schema to the About page.
- [ ] Clarify the physical business location policy and what address should be public.
- [ ] Expand the "licensed and insured" claim with specific details that can be safely disclosed.

## 3. Accessibility

- [ ] Add a `prefers-reduced-motion` stylesheet path for users who disable motion.
- [ ] Fix heading hierarchy issues in the footer and any repeated sections.
- [ ] Add stronger ARIA support to required fields and dynamic form feedback.
- [ ] Add ARIA state handling to dropdown navigation.
- [ ] Re-check color contrast for muted text, icons, and review stars.
- [ ] Add accessible error descriptions and live regions for form states.
- [ ] Improve keyboard focus visibility for dropdown items.
- [ ] Add `scroll-padding-top` so sticky navigation does not hide focused targets.
- [ ] Add print styles for key marketing and contact pages.

## 4. UX and Conversion

- [x] Fix the broken lead forms.
- [x] Add client-side validation and visible form feedback.
- [x] Add basic spam protection with a honeypot field.
- [x] Standardize CTA wording across hero, footer, and form sections.
- [x] Add a map or coverage visual to the contact experience.
- [x] Add visible success or failure messaging after form submission.
- [x] Add dismiss behavior for the sticky mobile phone CTA if it blocks content.
- [x] Add pricing guidance or at least starting-price ranges on service pages.
- [ ] Make breadcrumbs more visibly useful where schema already exists.
- [ ] Improve scroll performance in `js/main.js` if the page grows heavier.

## 5. Authoritative Presence

- [ ] Fully optimize the Google Business Profile.
- [ ] Build a repeatable review collection workflow.
- [ ] Add real team photography, not only tools, vans, and stock-like job images.
- [ ] Keep Facebook and Instagram active and aligned with site messaging.
- [ ] Expand into directories like Yelp, Angi, BBB, and HomeAdvisor if they fit the business.
- [ ] Add supplier or equipment trust badges only where they are accurate and allowed.
- [ ] Add local business schema on the Contact page.
- [ ] Clarify compliance documentation claims on the commercial service page.
- [ ] Keep NAP data identical across the site and external listings.

## 6. UI and Presentation

- [ ] Add more service imagery per service page.
- [ ] Build a before/after gallery section or dedicated page.
- [ ] Add visible loading states to any future async flows beyond the lead form.
- [ ] Clean up the service-areas hub so every listed area is either linked or intentionally grouped.
- [ ] Add a visual service-area map for Nassau County.
- [ ] Add a trust bar with licensing, insurance, family-owned positioning, and real credentials.
- [ ] Add social proof counters once the source data is ready.
- [ ] Surface the existing video assets in a structured way.
- [ ] Consider richer comparison sections for high-intent service pages.
- [ ] Consider an online scheduling flow if operations can support it.
- [ ] Consider live chat or a WhatsApp-style fast contact option if response handling is in place.
- [ ] Consider a simple pricing estimator if lead quality matters more than pure volume.

## Recommended Order

1. Finish the remaining conversion blockers and metadata consistency work.
2. Strengthen E-E-A-T with real business proof, reviews, and team credibility.
3. Close accessibility gaps that affect keyboard, motion, and form usability.
4. Improve local authority signals across GBP, citations, and trust assets.
5. Upgrade service-page UX, visuals, and content depth.