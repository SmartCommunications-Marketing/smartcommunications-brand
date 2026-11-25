# SMART Brand Guide website: notes for Claude

This file tells Claude how the Smart Communications brand guide website works and how to change it safely. Keep it at the root of the repository, so Claude Code reads it at the start of every session. Update it when something here stops being true.

## The project in one paragraph

A one-page brand guide for Smart Communications (logo, color, type, icons, images, voice, events, sub-brands, templates, guides) plus a Starter Prompts page. It is plain HTML, CSS and JavaScript: no build step, no framework, no dependencies, no database. Everything that goes live is in `site/`. Designed and built by Studio Rendezvous in 2026; owned and edited by Smart Communications marketing (Alistair) from November 2026.

- **Repository:** https://github.com/SmartCommunications-Marketing/smartcommunications-brand (public)
- **Live site:** https://brand.smartcommunications.com/, hosted on GitHub Pages (see "Hosting and domain" below)
- **Starter Prompts page:** https://brand.smartcommunications.com/prompts/
- **Old address:** https://smartcommunications-marketing.github.io/smartcommunications-brand/ forwards to the live site, so old links keep working.

## How a change goes live

1. `git pull` first. Studio Rendezvous may also push fixes, so start from the latest copy.
2. Edit the files.
3. Preview locally: `python3 tools/serve.py`, then open http://localhost:4180 (the Starter Prompts page is at http://localhost:4180/prompts/). The preview server turns caching off, so a reload shows the edit.
4. Check the change in the browser, at desktop width and at phone width (about 375 px).
5. Raise the version tag if you changed a stylesheet or script (see the next section).
6. Commit with a plain-English message, then push to `main`. The workflow `.github/workflows/pages.yml` publishes `site/` to the live site in about a minute. Watch it with `gh run watch` or in the repository's Actions tab.

**Pushing to `main` publishes to the live site.** Always show the person the change in the local preview and get a clear yes before pushing.

## Hosting and domain

Since November 2026 the guide runs on GitHub Pages at brand.smartcommunications.com, in place of the earlier plan to wrap it in WordPress on Kinsta.

- **Custom domain:** set in the repository's Settings → Pages → Custom domain, as `brand.smartcommunications.com`. It must say exactly that. Set to `smartcommunications.com` once by mistake, it sent every visitor to the main Smart website. There is no `CNAME` file in `site/`; with a workflow-published site, GitHub uses the setting, not a file.
- **DNS (managed by Smart's IT, in Cloudflare):** a CNAME record `brand` → `smartcommunications-marketing.github.io`, DNS only (no Cloudflare proxy), and a TXT record `_github-pages-challenge-SmartCommunications-Marketing.brand` that verifies the domain for the GitHub organization. Both must stay in place. Nothing else on smartcommunications.com points at GitHub.
- **HTTPS:** enforced. GitHub issues and renews the certificate itself.
- **If a publish fails with `No artifacts named "github-pages" were found`,** it's a timing glitch on GitHub's side: the site files uploaded, but GitHub hadn't registered them when the deploy step looked. It happened several times in November 2026. The live site keeps the previous version meanwhile. Re-run the failed run (`gh run rerun <run id>`, or Re-run jobs in the Actions tab), or start a fresh publish with `gh workflow run pages.yml --ref main`; retry until it succeeds, then check the live page.
- **After a change to the custom domain,** start a fresh publish (`gh workflow run pages.yml --ref main`) so GitHub serves the new address.
- **Search engines:** the `noindex` tag only covers the two HTML pages. GitHub Pages can't add a "don't index" header to the downloads (PDFs, decks, zips), so a download linked from somewhere public could still show up in search.

## The one rule: version tags

Stylesheets and scripts are loaded with a version tag, for example `css/site.css?v=20261111c`. Browsers and GitHub Pages cache files for up to 10 minutes, so after changing any `.css` or `.js` file, raise its tag. Otherwise visitors keep seeing the old file.

- Use the date plus a letter: `?v=20261120a`, then `?v=20261120b` for a second change the same day.
- `site/index.html` loads `css/tokens.css`, `css/site.css`, `js/data.js`, `js/site.js`. Raise all four together to keep it simple.
- `site/prompts/index.html` loads `../css/tokens.css`, `../css/site.css`, `prompts.css` and five scripts. Raise those together too.
- Icons have their own tag: `const V = "?v=…"` in `site/js/site.js`. Raise it when icon artwork changes.
- Changes to `index.html` itself need no tag.

## Where things are

| To change | Edit |
|---|---|
| Wording, sections, cards, buttons | `site/index.html` |
| A button that says "Link coming" | `window.SC_LINKS` at the top of `site/js/data.js`: paste the URL in place of `null`. The button switches on by itself. |
| Brand colors, spacing, type sizes | `site/css/tokens.css` (and the swatch data `window.SC_COLORS` in `site/js/data.js`) |
| CMYK values shown on swatches | `window.SC_PRINT` in `site/js/data.js` |
| Component styles | `site/css/site.css` |
| Icon names and search words | `window.SC_ICONS` in `site/js/data.js` |
| Sub-brand palettes (Innovate, Accordant, Scale) | `window.SC_SUBBRANDS` in `site/js/data.js` |
| Behavior: sections, copy-to-clipboard, icon browser, swatches | `site/js/site.js` |
| Logos, icons, photos, downloads | Files in `site/assets/`. Replace a file with one of the same name, so links keep working. |
| Prompt builder forms (13 types) | `site/prompts/builder.js` |
| Brand updates the prompt builder passes to AI agents | `site/prompts/brand-updates.js` (`window.SC_BRAND_UPDATES`): add new entries at the top |
| How prompts adapt to Claude vs. other AI assistants | `site/prompts/assistant.js` |
| Local preview server | `tools/serve.py` |

Section anchors in `index.html`: `#logo`, `#product-logos`, `#color`, `#typography`, `#iconography`, `#images`, `#voice`, `#events`, `#sub-brands`, `#templates`, `#prompts`, `#guides`. Each brand section is a `.section__card` with a matching `…-panel` body.

### Notes on specific areas

- **Asset folders:** `logos/` (SVG), `png-logos/` (2000 px PNG), `print-logos/` (EPS, CMYK and RGB), `icons/{dark,light,dark-2color,light-2color}/`, `subbrands/`, `innovate27/`, `events/`, `templates/`, `images/`, `clearspace/`, `guides/`, `downloads/` (zips, decks, Excel templates, swatches, tokens).
- **Logos and icon packs:** the zips in `site/assets/downloads/` were built from the files in the asset folders. If a logo or icon changes, rebuild the matching zip too, keeping the same folder layout inside it, or the download will be out of date.
- **CMYK logo files** are EPS only (SVG and PNG can't hold CMYK). They were made in Adobe Illustrator.
- **Prompt library:** removed from the Starter Prompts page in November 2026 (Brittany's review); the page is now the prompt builder only. `prompts-data.js` and `prompts.js` are kept in the repo, not loaded, in case it comes back.
- **AI guardrail:** prompts are for words. Public-facing visuals (ads, social graphics, PDFs, event graphics) go to the creative team to design, or to review and refine anything AI made; the builder adds that line to public-facing prompt types. Tidying up presentations and internal documents in the approved templates is fine.
- **Brand updates (test):** the builder adds only the entries in `brand-updates.js` dated after the day the person's AI agent last learned the brand (default: `kitDate`, the Claude brand kit release). When a brand rule changes, add an entry there, and raise `kitDate` when a new brand kit goes out.
- **Word letterhead:** `site/assets/downloads/SmartCommunications_Letterhead_Template_2026.docx`, Smart's 2026 letterhead from Brittany (November 2026), published as she sent it.
- **Large files:** GitHub refuses files over 100 MB, and warns above 50 MB. The master deck is about 30 MB. Link to SharePoint for anything bigger.
- **Proxima Nova (Adobe Fonts):** loads from Smart's own Adobe Fonts web project, `https://use.typekit.net/wde7hle.css` (Regular and Bold, with italics), linked in the `<head>` of both HTML pages. Adobe gives the web project a single link that works on any address, so moving the site to brand.smartcommunications.com needs no change in Adobe Fonts. If the web project is ever replaced, swap the new link into both pages.

## Brand rules for anything written on the site

- Voice: approachable, clear and assured. Second person, active voice, American English, one idea per sentence, outcome before feature.
- Exact product names, never abbreviated: Smart Communications™, SmartCOMM™, SmartIQ™, SmartPATH™, SmartHUB™, SmartDX™.
- "Conversation Cloud" is retired (November 2026). Talk about the full platform (the Smart Communications platform) or name individual products.
- Title case for headings. Button labels say exactly what they do ("Download RGB logo pack", "Download DM Sans"), not just "Download".
- No invented statistics, customer names or quotes.
- Typefaces: Proxima Nova for PDFs, print and video; Segoe UI for PowerPoint; Roboto for product, website, social and ads. The site itself uses Roboto and Proxima Nova.
- Use colors from `tokens.css`; don't introduce new hex values.

## Things not to do

- **Don't remove the `noindex` tags** (`<meta name="robots" content="noindex, nofollow">` in both HTML pages). Smart decided the guide is public but stays out of search engines. Don't add a `robots.txt` that blocks the site either: search engines must be able to read the pages to see the tag.
- **Don't commit font files** (Proxima Nova, Segoe UI). Segoe UI is Microsoft's and can't be redistributed; Proxima Nova loads from Adobe Fonts. The type images on the site are PNG pictures, not fonts.
- **Don't commit full-size licensed stock photos.** Photo downloads will be finished backgrounds (cropped, with brand overlays), not raw stock.
- **Don't commit passwords, API keys or hosting credentials.** The repository is public.
- **Don't push without the person's go-ahead.**

## Review mode (closing out)

Collapsing sections came back in November 2026: `const REVIEW_PERIOD = false;` in `site/js/site.js`. Sections start closed, with Expand all / Collapse all, and a nav link or `#anchor` opens its own section.

The BugHerd review that Studio Rendezvous runs is still open for the last few comments:

- Both HTML pages have a small script in `<head>` that loads BugHerd (`sidebarv2.js`), but only from the review link (`?review=1`). Ordinary visitors never load it.
- On the review link every section opens and stays open, so BugHerd comment pins land on the right elements. `?review=0` turns it off for that browser tab.

Leave the BugHerd script alone until Studio Rendezvous confirms review is finished. Then, for launch:

1. Remove the BugHerd `<script>` block from `site/index.html` and `site/prompts/index.html`.
2. Keep the `noindex` tags.
3. Raise the version tags.

`og:url` and `og:image` in `site/index.html` already point at brand.smartcommunications.com (done November 2026).

## Still open (November 2026)

- **20 "Link coming" buttons:** the `null` entries in `window.SC_LINKS` (image library and cut-out library, which are hidden for now, the Innovate 2027 PowerPoint template, the PowerPoint toolkit, event backdrops and retractable banners, giveaway templates, the SmartIQ Story video).
- **Finished photo backgrounds** for the image packs: still to come. The two image pack cards and the Text Overlay example were removed from Images in November 2026 (the raw stock and overlay example were misleading); bring the packs back once finished backgrounds exist. The Innovate city photos were replaced in November 2026 with finished versions (Innovate27 bar, logo and color treatment); each city downloads as a zip of 2000 × 1334 px PNGs from `site/assets/downloads/`.
- **Prompt builder:** "Social post or display ad" writes text-only copy (LinkedIn post, LinkedIn ad, display ad, ad carousel). Once the messaging framework is final, Brittany wants the prompts to tell Claude to read the brand guide and the messaging framework.
- **Brand updates log:** a test; Brittany to try it before it's announced.
- **2027 PowerPoint template:** add it to Templates (and the Innovate card) once Brittany sends the link.
- **Open BugHerd comments:** #111 SmartIQ Story link, #154 Innovate 2027 template, #159 PowerPoint toolkit, #58 footer contacts and Asana link, #59 case study / PathFactory / YouTube thumbnail guide, #49 industry icons (parked).
## Contacts

- Smart Communications: Alistair (brand, owner of the repository), Brittany (prompts, brand), Brandyn (video and The Brief links).
- Studio Rendezvous: designed and built the site; holds the scripts that generated the icon sets, CMYK/RGB logo files, Innovate photos and the prompt library, available on request.
