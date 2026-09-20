// Four small enhancements. Every one of them degrades to a working page when it
// is absent: formulae stay in their LaTeX source form, the BibTeX button stays
// hidden, the area counts stay empty, and the research-area links remain plain
// in-page anchors.
document.addEventListener('DOMContentLoaded', function () {
  // 1. Typeset every formula written between \( and \). Only these delimiters
  //    are recognised, so a stray dollar sign in prose is never mistaken for
  //    maths. Code blocks are skipped, which keeps the BibTeX entries intact.
  if (window.renderMathInElement) {
    window.renderMathInElement(document.body, {
      delimiters: [
        { left: '\\(', right: '\\)', display: false },
        { left: '\\[', right: '\\]', display: true }
      ],
      ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
      throwOnError: false
    });

    // KaTeX may break a line straight after a formula, which leaves the comma or
    // full stop that follows it stranded at the start of the next line. Tying the
    // two together afterwards keeps that from happening in any paper, without
    // needing a wrapper in the markup. The auto-render extension already gives
    // each inline formula a bare span of its own, and that span is the node the
    // punctuation sits beside.
    document.querySelectorAll('.katex').forEach(function (formula) {
      if (formula.closest('.katex-display')) return;
      var host = formula.parentNode;
      var isOwnWrapper = host && host.tagName === 'SPAN' && !host.className &&
        host.childNodes.length === 1;
      if (!isOwnWrapper) {
        host = document.createElement('span');
        formula.parentNode.insertBefore(host, formula);
        host.appendChild(formula);
      }
      var after = host.nextSibling;
      if (!after || after.nodeType !== Node.TEXT_NODE) return;
      var trailing = /^[),.;:!?%\]]+/.exec(after.nodeValue);
      if (!trailing) return;
      host.appendChild(document.createTextNode(trailing[0]));
      host.classList.add('math-run');
      after.nodeValue = after.nodeValue.slice(trailing[0].length);
    });
  }

  // 2. Copy button for each BibTeX block.
  document.querySelectorAll('.copy-btn').forEach(function (button) {
    var source = document.querySelector(button.dataset.copyTarget);
    if (!source || !navigator.clipboard) return;
    button.hidden = false;
    button.addEventListener('click', function () {
      navigator.clipboard.writeText(source.innerText.trim()).then(function () {
        var original = button.dataset.label || button.textContent;
        button.dataset.label = original;
        button.textContent = 'Copied';
        button.dataset.copied = 'true';
        window.setTimeout(function () {
          button.textContent = original;
          button.removeAttribute('data-copied');
        }, 2000);
      });
    });
  });

  // 3. Paper count per research area, read off the markup so adding a paper to an
  //    area needs no second edit.
  document.querySelectorAll('.area').forEach(function (area) {
    var slot = area.querySelector('[data-area-count]');
    var total = area.querySelectorAll('.area-papers li').length;
    if (!slot || !total) return;
    slot.textContent = total === 1 ? '1 paper' : total + ' papers';
  });

  // 4. Mark the entry a research-area link points at, for two seconds.
  var FLASH_MS = 2000;
  var timer;
  function flash(hash) {
    var target = hash && hash.length > 1 && document.getElementById(hash.slice(1));
    if (!target || !target.classList.contains('paper-card')) return;
    window.clearTimeout(timer);
    document.querySelectorAll('.paper-card.is-flash').forEach(function (card) {
      card.classList.remove('is-flash');
    });
    // Reading a layout property restarts the animation when the same entry is
    // picked twice in a row.
    void target.offsetWidth;
    target.classList.add('is-flash');
    timer = window.setTimeout(function () {
      target.classList.remove('is-flash');
    }, FLASH_MS);
  }

  document.querySelectorAll('.area-papers a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function () {
      flash(link.hash);
    });
  });
  window.addEventListener('hashchange', function () {
    flash(window.location.hash);
  });
  if (window.location.hash) flash(window.location.hash);
});
