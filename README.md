# Shunqi Lu — academic website

Personal academic homepage: [https://shunqilu.github.io/](https://shunqilu.github.io/).

Every paper has its own HTML page with key contributions, keywords, abstract, a citable
DOI, a BibTeX block, and a direct PDF link. The site is static, has no build step, and is
published by GitHub Pages from the `main` branch.

## Papers

- [Sharp closure thresholds for two-hidden-layer ReLU networks](https://shunqilu.github.io/publications/sharp-closure-thresholds.html) · [PDF](https://shunqilu.github.io/publications/sharp_closure_thresholds_two_hidden_layer_relu_networks_v1.pdf) · [DOI](https://doi.org/10.5281/zenodo.22728502)
- [Completing the classification of maximum scattered linear sets in PG(1, q^5)](https://shunqilu.github.io/publications/maximum-scattered-linear-sets-pg1q5.html) · [PDF](https://shunqilu.github.io/publications/classification_maximum_scattered_linear_sets_PG1q5.pdf) · [DOI](https://doi.org/10.5281/zenodo.22232593)
- [Exact coordinate-balancing calculus and sharp stability for symmetric lattice cross-covariograms](https://shunqilu.github.io/publications/covariogram-balancing.html) · [PDF](https://shunqilu.github.io/publications/covariogram-balancing.pdf) · [DOI](https://doi.org/10.5281/zenodo.22178367)

## Structure

`index.html` carries the whole site: an About section, the research areas, and the
complete, date-keyed list of papers. `publications/index.html` only redirects to that
list, so the old `/publications/` URL keeps working. Each paper additionally has its own
page under `publications/`.

Nothing is keyed to the current number of papers or areas. Entries are ordered by hand,
newest first, and both lists take any number of rows.

## Adding a new paper

1. **Put the PDF in `publications/`**, keeping the file name lowercase and descriptive.

2. **Create the paper page.** Copy `publications/_template.html` to
   `publications/<url-slug>.html` and replace every `{{PLACEHOLDER}}`. The template lists
   what each placeholder means at the top of the file. Keep the `citation_*` meta tags
   accurate — Google Scholar reads them.

3. **Add the list entry.** In `index.html`, copy an existing
   `<article class="paper-card" id="p-…">` block into `#papers`, newest first, and edit it.
   The `id` is what the research-area links point at, so it must be unique. The left column
   is the publication date, not a running number.

4. **File it under its research areas.** In the `.areas` list in `index.html`, add
   `<li><a href="#p-…">Title</a></li>` to each area the paper belongs to. Only list an area
   the paper genuinely sits in. The paper count beside each area name is counted by
   `site.js` from these entries, so there is nothing else to update. A brand-new direction
   needs one more `<div class="area">` block.

5. **Add the URL to `sitemap.xml`** with today's `<lastmod>`.

6. **Bump the `?v=` query string** on the stylesheet, script, and KaTeX links across all
   pages together, so nobody gets a new stylesheet with an old script.

### Writing the content

The abstract, the keyword line, the MSC classification, and every key contribution are
reproduced from the paper itself rather than paraphrased; each contribution names the
result it comes from in a `<span class="ref">`.

Formulae are written as LaTeX between `\(` and `\)` (display: `\[` and `\]`) and set by
KaTeX. Put the whole expression inside the delimiters, numerals included — `\(d \ge 14\)`,
not `\(d \ge\)&nbsp;14` — so that symbols and digits share one face. The first letter of
the abstract becomes the sunk initial automatically, so it must be a plain letter.

### Local preview

```bash
python -m http.server 8000
```

Then open `http://localhost:8000/`. Hard-reload after editing CSS or JS, or bump the `?v=`
query string.

## Design notes

Restrained scholarly look: near-white warm canvas, ink text, and one dark-gold accent, used
for links, a short marker under each heading, the sunk initial that opens an abstract, and
the brief highlight that marks a paper you have just jumped to. The paper list sits directly
under a static (never overlaying) header, so it is the first thing a visitor reads. No
textures, tints, entrance animations, or decorative illustrations — hierarchy comes from type
size, spacing, and hairline rules.

- `assets/style.css` — all styling, with light and dark palettes driven by custom
  properties in `:root`. Dark mode follows `prefers-color-scheme`.
- `assets/site.js` — four progressive enhancements: KaTeX typesetting, the BibTeX copy
  button, the per-area paper counts, and the jump highlight. Each one degrades to a working
  page when the script does not run.
- `assets/katex/` — KaTeX 0.16.22, vendored. Formulae do not depend on a CDN.
- Fonts are self-hosted (Crimson Pro for text, Atkinson Hyperlegible for interface, and
  Capo Sfogliato for the ornamented capital that opens an abstract); nothing is loaded
  remotely. Capo Sfogliato is subset to the 26 capitals and restricted to `U+41-5A` by
  `unicode-range`, so a page without an abstract never fetches it.
- Structure comes from rules, spacing, and type alone, so every page stays cheap to extend.

The reading-column and publication-entry conventions are adapted from
[Minimal Light](https://github.com/yaoyao-liu/minimal-light). Third-party notices, font
licenses, and the KaTeX license are in
[THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## License

All rights reserved.

© 2026 Shunqi Lu. All rights reserved.

Third-party template and font materials retain their respective licenses. These licenses
do not apply to the papers or other original site content.
