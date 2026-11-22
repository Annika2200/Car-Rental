---
name: Hurghada Drive
description: Local car rental and private transfers in Hurghada, set as green Egyptian road signs over dark asphalt.
colors:
  asphalt: "#111315"
  asphalt-raised: "#15181b"
  road-bed: "#0e1012"
  shoulder: "#0c0d0f"
  surface: "#1a1e21"
  surface-2: "#22272b"
  surface-3: "#2c3236"
  sign-green: "#1b6440"
  sign-green-hover: "#217a4e"
  sign-ink: "#ffffff"
  sign-soft: "#cfe3d6"
  plate-hover: "#e8f2ec"
  verge-green: "#3f9a5f"
  steel-beam: "#2b3034"
  steel-post: "#6d757b"
  steel-edge: "#4f565c"
  text: "#eef2ef"
  text-label: "#dfe5e1"
  muted: "#9ca59f"
  placeholder: "#8d9690"
  lane: "rgba(240, 244, 241, .7)"
  line: "rgba(255, 255, 255, .08)"
  line-strong: "rgba(255, 255, 255, .16)"
  danger: "#ff8f86"
typography:
  display:
    fontFamily: "Overpass, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif"
    fontSize: "clamp(2.3rem, 5vw, 3.9rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "clamp(1.8rem, 3.4vw, 2.7rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 800
    lineHeight: 1.08
  place-name:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 800
    lineHeight: 1.15
  price:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 900
    fontFeature: "tnum"
  body:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  body-arabic:
    fontFamily: "Noto Kufi Arabic, Overpass, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.85
  label:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 700
  plate-label:
    fontFamily: "Overpass, system-ui, sans-serif"
    fontSize: "0.74rem"
    fontWeight: 800
    letterSpacing: "0.1em"
rounded:
  sign: "14px"
  control: "10px"
  tier-board: "9px"
  plate: "8px"
  tag: "6px"
  pill: "999px"
spacing:
  gutter: "20px"
  gutter-mobile: "16px"
  section: "104px"
  section-mobile: "72px"
  sign-pad: "34px 36px"
  sign-pad-mobile: "26px 22px"
  grid-gap: "26px"
  row: "16px"
components:
  button-plate:
    backgroundColor: "{colors.sign-ink}"
    textColor: "{colors.sign-green}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
    height: "48px"
  button-plate-hover:
    backgroundColor: "{colors.plate-hover}"
  button-sign:
    backgroundColor: "{colors.sign-green}"
    textColor: "{colors.sign-ink}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
    height: "48px"
  button-sign-hover:
    backgroundColor: "{colors.sign-green-hover}"
  button-ghost:
    textColor: "{colors.sign-ink}"
    rounded: "{rounded.control}"
    padding: "12px 22px"
    height: "48px"
  sign-panel:
    backgroundColor: "{colors.sign-green}"
    textColor: "{colors.sign-ink}"
    rounded: "{rounded.sign}"
    padding: "{spacing.sign-pad}"
  price-plate:
    backgroundColor: "{colors.sign-ink}"
    textColor: "{colors.sign-green}"
    rounded: "{rounded.plate}"
    padding: "12px 16px"
  card-asphalt:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.sign}"
  input-field:
    backgroundColor: "{colors.asphalt-raised}"
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
    padding: "10px 14px"
    height: "48px"
  category-plate:
    backgroundColor: "{colors.sign-green}"
    textColor: "{colors.sign-ink}"
    typography: "{typography.plate-label}"
    rounded: "5px"
    padding: "4px 9px 3px"
---

# Design System: Hurghada Drive

## Overview

**Creative North Star: "The Red Sea Highway"**

The site is a stretch of Egyptian desert highway at dusk. The ground is near-black asphalt crossed by faint white dashed lane lines; everything a visitor must read or act on hangs above it as a green road sign with a white inset rim and rounded corners. The headline, the price calculator, the request summary, the handover directory, the transfer route and the contact block are all signs. Supporting material that is not a sign (car cards, the booking form, the FAQ) sits on the asphalt as quiet raised surfaces, so the signs keep their authority.

Type is white, heavy and plain, in Overpass (Highway Gothic lineage) for Latin and Cyrillic and Noto Kufi Arabic for Arabic. Iconography is the road's own: stroked arrows, distances in kilometres, place names set bilingually Latin over Arabic. The first viewport is a steel gantry, one beam and two posts, with signs hanging from it on short hangers and lane dashes running underneath. Motion is brief and physical: signs settle into place once on load, buttons press down.

The owner's commitments bind the system: the logo (wood background, green car) is used unchanged and never cropped or redrawn; the look is dark, modern and professional; the accent is a toned-down green, never yellow; every layout works in five languages, including right-to-left Arabic.

**Key Characteristics:**
- Asphalt ground, green signs, white type; no yellow anywhere.
- The sign rim: a 4px green inset band then a 2px white line inside the corner radius.
- White plates with green text carry prices, totals and the primary action on a sign.
- Steel grey belongs to the gantry only.
- Dashed lane lines divide sections; arrows and kilometres act as icons.
- Bilingual place names; every directional glyph mirrors in RTL.

## Colors

A dusk-highway palette: three or four steps of near-black asphalt, one muted sign green, white, and steel grey reserved for the gantry.

### Primary
- **Wayfinder Green** (sign-green): the face of every sign, tile, category plate, step tab and FAQ toggle. It is a muted highway green, deliberately darker than a signal green, per the owner's request for a toned-down accent. Selection highlight also uses it.
- **Wayfinder Green, Lit** (sign-green-hover): hover state of a green sign button on asphalt.

### Secondary
- **Sign White** (sign-ink): text on signs, the inset rim line, and the white plate (primary buttons on signs, price and total readouts, delivery fee tags, the floating WhatsApp button).
- **Faded Sign White** (sign-soft): secondary copy on a sign (lead paragraphs, Arabic place names, definitions in the summary).
- **Plate Hover** (plate-hover): hover state of a white plate button.

### Tertiary
- **Verge Green** (verge-green): the only green used directly on asphalt: inline links, input focus border, checkbox accent, the current-language check mark, caret. Its 14% tint marks focus halos and legal placeholders.

### Neutral
- **Asphalt** (asphalt): page ground and default section background.
- **Raised Asphalt** (asphalt-raised): alternating sections, input wells, mobile nav sheet.
- **Road Bed** (road-bed): the road strip under the gantry. **Shoulder** (shoulder): footer ground.
- **Surface / Surface 2 / Surface 3**: car cards and FAQ items; spec chips, language menu and photo wells; hovered menu rows and scrollbar thumb.
- **Gantry Steel** (steel-beam, steel-post, steel-edge): beam body, post highlight, post edge. Used only by the hero gantry and its hangers.
- **Road Paint** (lane): dashed lane lines; at 16% opacity it forms the dashed divider at the top of each section, at 40 to 55% the solid road edges and footer rule.
- **Text** (text) for body, **Label Text** (text-label) for form labels and spec chips, **Muted** (muted) for supporting copy off-sign, **Placeholder** (placeholder) for input hints.
- **Line / Line Strong**: hairline borders on asphalt surfaces.
- **Warning Red** (danger): invalid fields and the form error, with a 14% red halo.

### Named Rules
**The No Yellow Rule.** Yellow never appears: not as accent, highlight, warning or placeholder marker. Green is the only chromatic accent.

**The Two Greens Rule.** Wayfinder Green is a surface you hang text on; Verge Green is a line or mark drawn on asphalt. Never set body text in Wayfinder Green on asphalt, and never fill a sign with Verge Green.

**The Steel Is Structure Rule.** Steel grey describes the gantry, never a button, card or text colour.

## Typography

**Display Font:** Overpass (with system-ui, -apple-system, Segoe UI, Roboto, Arial)
**Arabic Font:** Noto Kufi Arabic (falling back to Overpass)

**Character:** Highway signage type: heavy, open, unornamented white letters meant to be read at speed. Both families are self-hosted variable fonts (weights 100 to 900) split by unicode range.

### Hierarchy
- **Display** (800, clamp(2.3rem, 5vw, 3.9rem), 1.08, -0.02em): the headline sign only; capped at 14ch so it breaks like a sign legend.
- **Headline** (800, clamp(1.8rem, 3.4vw, 2.7rem), 1.08, -0.015em): section titles and sign titles.
- **Title** (800, 1.2rem): card names (1.4rem), step titles, summary and sub-sign titles.
- **Place Name** (800, 1.35rem, 1.15): destinations on the directory sign; the Arabic name follows at 1rem, 600, in Faded Sign White.
- **Price** (900, 1.75rem on cards, 1.3 to 1.6rem on plates, tabular figures): every price, fee, total and kilometre figure uses tabular numerals.
- **Body** (400, 1rem, 1.6): paragraphs; lead copy at 1.12rem, max 36em; FAQ answers max 68ch; legal text max 70ch.
- **Label** (700, 0.9rem): form labels; legends 800 at 1.1rem.
- **Plate Label** (800, 0.74rem, 0.1em, uppercase): the car category plate only.

### Named Rules
**The Heavy Sign Rule.** Headings are 800, price figures 900; nothing on a sign is set lighter than 600.

**The Arabic Reset Rule.** Under `dir="rtl"` headings drop letter-spacing to 0 and open line-height to 1.3; body line-height opens to 1.85. Uppercase tracking is removed from plate labels.

## Layout

A single 1200px container with a 20px gutter (16px under 640px). Sections are generous (104px vertical, 72px on phones) and alternate Asphalt and Raised Asphalt; each section after the first carries a 4px dashed lane line along its top edge (56px dash, 48px gap). Section heads are left-aligned, max 720px, 48px above content.

The hero is a two-column gantry (1.25fr headline sign, 1fr price sign, 28px gap) hung 74px below a steel beam, followed by a 92px road strip with a centred dashed lane. Under 1000px the signs stack and hang one below the other (52px gap); under 640px the posts disappear and the beam runs edge to edge.

Grids: fleet in two columns (26px gap), steps in three, booking as 1fr form info beside a 1.25fr form with a sticky summary sign (top 108px). Everything collapses to one column at 640px. Breakpoints are 1100px (nav becomes a sheet), 1000px (columns stack) and 640px (phone). All spacing and alignment use logical properties so the layout mirrors cleanly in Arabic.

## Elevation & Depth

Depth is physical, not decorative: signs hang in front of the asphalt, so they carry one deep ambient shadow plus the inset rim; everything on the asphalt is flat until hovered. The sticky header is translucent asphalt with a 14px blur.

### Shadow Vocabulary
- **Hanging sign** (`box-shadow: 0 22px 50px rgba(0,0,0,.5)`): signs, the language menu, the lightbox image, hovered car cards and the mobile nav sheet.
- **Sign rim** (`box-shadow: inset 0 0 0 4px #1b6440, inset 0 0 0 6px rgba(255,255,255,.92)`): every full sign. Smaller sign objects scale it down: tiles and tier boards 3px / 4.5px, buttons, checklist and FAQ marks 2px / 3.5px, category plates 2px / 3px.
- **Gantry beam** (`box-shadow: 0 10px 24px rgba(0,0,0,.5)`): the steel beam only.
- **Focus halo** (`box-shadow: 0 0 0 3px` Verge Green at 14%): inputs on asphalt; white at 25% inside a sign.

### Named Rules
**The Flat Asphalt Rule.** Surfaces on the ground are flat at rest. A car card lifts 2px and gains the hanging shadow only on hover with a fine pointer.

## Shapes

Rounded rectangles throughout, with radius scaling by object size: signs and cards 14px, buttons, inputs and FAQ items 10px, tier boards 9px, white plates 8px, fee tags and spec chips 6px, category plates 5px. The step number is a sign tab: rounded top corners only (7px), white rim on three sides, sitting on top of its step sign. Rules inside signs are 1.5px white lines at 30 to 40% opacity; borders on asphalt are 1px hairlines. Only the scrollbar thumb is a full pill.

## Components

### Buttons
Heavy, sign-like and tactile: 800 weight, 48px minimum height (44px small), 10px radius, 12px by 22px padding.
- **White plate (primary on a sign):** Sign White ground, Wayfinder Green text; hovers to Plate Hover.
- **Green sign (primary on asphalt):** Wayfinder Green ground with the 2px / 3.5px inset rim, white text; hovers to Wayfinder Green, Lit.
- **Ghost / outline:** transparent, white text, 2px white border at 55%; hover makes the border solid and adds an 8% white fill.
- **States:** hover lifts 1px (fine pointers only); press scales to 0.97 over 160ms with cubic-bezier(0.23, 1, 0.32, 1); focus is a 3px solid white outline offset 2px.

### Chips
- **Spec chips:** Surface 2 ground, Label Text, 6px radius, 15px muted stroke icon.
- **Category plate:** a miniature sign on the card, uppercase plate label, green with a thin white rim.

### Cards / Containers
- **Car card:** Surface ground, 1px Line border, 14px radius, 3:2 photo well, body padded 20px by 22px. Prices tier on a small green **distance board** (the tier board) styled like a kilometre sign.
- **Booking form and FAQ items:** the same asphalt surface; FAQ toggles are 32px green sign squares with a white plus that rotates 45 degrees when open.

### Inputs / Fields
- **On asphalt:** Raised Asphalt well, 1px Line Strong border, 10px radius, 48px height, 16px text; hover brightens the border; focus switches to a Verge Green border with its halo.
- **On a sign:** 24% black well with a 38% white border; focus turns the border solid white with a white halo.
- **Error:** Warning Red border and 14% red halo; checkbox labels turn red.

### Navigation
Sticky 84px header (76px on phones) of translucent asphalt with a hairline bottom border. The logo is shown unchanged at 68px height with a hairline frame. Links are Muted, 700, 0.95rem, turning white on hover; the green sign button ends the row. Under 1100px the nav becomes a full-width Raised Asphalt sheet with hairline-divided rows. The language switch is a Surface 2 button opening a scaled menu (150ms) with a Verge Green check on the current language.

### The Sign (signature component)
Wayfinder Green panel, 14px radius, sign rim, hanging shadow, 34px by 36px padding (26px by 22px on phones). Headings white, body Faded Sign White. Readouts inside it sit on white plates. In the hero each sign hangs from the beam on two steel hangers and settles in once (620ms drop of 10px, second sign 110ms later; a 300ms fade under reduced motion).

### Directory Sign
The handover sign: rows of arrow, kilometres, bilingual place name and a white fee tag, each row separated by a 1.5px white rule. Arrows mirror under RTL; Arabic names isolate their direction.

### Floating WhatsApp Plate
A 58px white plate with a 14px radius and green WhatsApp stroke icon, fixed bottom-end, ringed in asphalt; scales to 1.06 on hover, 0.94 on press.

## Do's and Don'ts

### Do:
- **Do** put every block the visitor must read or act on (headline, price, summary, directions, transfers, contact) on a Wayfinder Green sign with the full sign rim.
- **Do** use a white plate with green text for the primary action and for every price or total that sits on a sign.
- **Do** set every price, fee and distance in tabular numerals at 800 to 900 weight.
- **Do** write place names bilingually, Latin then Arabic, with the Arabic in Faded Sign White.
- **Do** draw icons as 2px stroked SVG from the sprite, and mirror arrows, chevrons and the route swap under `dir="rtl"`.
- **Do** divide sections with the dashed lane line, never a solid rule.
- **Do** keep hover lifts behind `(hover: hover) and (pointer: fine)` and give every pressable a 0.97 press scale.
- **Do** show the logo unchanged, uncropped, with only a hairline frame.

### Don't:
- **Don't** use yellow, in any role.
- **Don't** fill a sign with Verge Green or set body text in Wayfinder Green on asphalt.
- **Don't** use steel grey outside the gantry.
- **Don't** put asphalt surfaces in front of signs or give flat asphalt cards a shadow at rest.
- **Don't** use text glyphs (arrows, ticks) as icons; use the stroked SVG sprite or the masked check and plus.
- **Don't** set anything on a sign lighter than 600, or keep Latin letter-spacing on Arabic headings.
