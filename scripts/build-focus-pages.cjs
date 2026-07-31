const fs = require("fs");
const path = require("path");
const registry = require("../assets/js/routes.js");

const root = path.resolve(__dirname, "..");
const focusScriptKb = (
  fs.statSync(path.join(root, "assets/js/focus-tools.js")).size / 1024
).toFixed(1);
const implementationEvidence = `
      <section class="section container content-prose reveal">
        <h2>Measured implementation evidence</h2>
        <table class="comparison">
          <thead><tr><th>Check</th><th>Current result</th><th>Why it matters</th></tr></thead>
          <tbody>
            <tr><td>Tool-specific JavaScript</td><td>${focusScriptKb} KB uncompressed, shared across four focus tools</td><td>One cacheable file avoids a separate framework bundle for each tool.</td></tr>
            <tr><td>Tool interaction network calls</td><td>0</td><td>Preview and code generation happen locally, so controls do not wait for an API.</td></tr>
            <tr><td>Responsive evidence</td><td>Desktop, tablet, and mobile preview states</td><td>Users can inspect layout decisions before copying output.</td></tr>
            <tr><td>Download format</td><td>CSS or HTML source</td><td>The result remains editable and is not locked to BentoCSS.</td></tr>
          </tbody>
        </table>
        <p class="muted">These are implementation measurements, not claims about production Core Web Vitals. Field LCP, INP, and CLS must be measured after deployment.</p>
      </section>`;

const viewportToolbar = `
  <div class="focus-toolbar" aria-label="Preview width">
    <button class="btn btn-secondary" type="button" data-viewport="desktop" aria-pressed="true">Desktop</button>
    <button class="btn btn-secondary" type="button" data-viewport="tablet" aria-pressed="false">Tablet</button>
    <button class="btn btn-secondary" type="button" data-viewport="mobile" aria-pressed="false">Mobile</button>
  </div>`;

const actions = `
  <div class="focus-actions">
    <button id="focus-copy" class="btn" type="button">Copy code</button>
    <button id="focus-download" class="btn btn-secondary" type="button">Download output</button>
  </div>`;

const builders = {
  "bento-grid-generator": `
    <section class="section container reveal" aria-labelledby="builder-title">
      <h2 id="builder-title">Build a responsive bento grid</h2>
      <p class="lead">Control the real structure of the layout: card count, columns, gap, featured-card span, and preview width. The exported CSS includes an intentional mobile fallback.</p>
      <div class="focus-builder">
        <form class="card focus-controls" onsubmit="return false">
          <label for="bento-columns">Desktop columns: <output id="bento-columns-output">4</output></label>
          <input id="bento-columns" data-focus-control type="range" min="2" max="6" value="4">
          <label for="bento-gap">Gap: 16px</label>
          <input id="bento-gap" data-focus-control type="range" min="0" max="40" value="16">
          <label for="bento-span">Featured card span</label>
          <input id="bento-span" data-focus-control type="range" min="1" max="4" value="2">
          <label for="bento-items">Number of cards</label>
          <input id="bento-items" data-focus-control type="range" min="1" max="24" value="6">
          <fieldset class="control-group"><legend>Responsive columns</legend>
            <label for="bento-desktop-columns">Desktop</label><input id="bento-desktop-columns" data-focus-control type="number" min="1" max="12" value="4">
            <label for="bento-tablet-columns">Tablet</label><input id="bento-tablet-columns" data-focus-control type="number" min="1" max="8" value="2">
            <label for="bento-mobile-columns">Mobile</label><input id="bento-mobile-columns" data-focus-control type="number" min="1" max="4" value="1">
          </fieldset>
          <fieldset class="control-group"><legend>Custom breakpoints</legend>
            <label for="bento-tablet-breakpoint">Tablet maximum width</label><input id="bento-tablet-breakpoint" data-focus-control type="number" min="480" max="1100" value="900">
            <label for="bento-mobile-breakpoint">Mobile maximum width</label><input id="bento-mobile-breakpoint" data-focus-control type="number" min="280" max="720" value="600">
          </fieldset>
          <label for="bento-column-unit">Column sizing</label><select id="bento-column-unit" data-focus-control><option value="fraction">Flexible fractions</option><option value="minmax">Responsive minmax</option><option value="fixed">Fixed pixels</option></select>
          <label for="bento-row-size">Minimum row size</label><input id="bento-row-size" data-focus-control type="range" min="60" max="240" value="110">
          <label for="bento-radius">Radius token</label><input id="bento-radius" data-focus-control type="range" min="0" max="36" value="18">
          <label for="bento-auto-flow">Auto placement</label><select id="bento-auto-flow" data-focus-control><option value="row">Row</option><option value="row dense">Row dense</option><option value="column">Column</option><option value="column dense">Column dense</option></select>
          <label><input id="bento-named-areas" data-focus-control type="checkbox"> Export optional named areas</label>
          <label><input id="bento-long-content" data-focus-control type="checkbox"> Test long content</label>
          <label><input id="bento-light-mode" data-focus-control type="checkbox"> Preview light mode</label>
          <details class="design-controls"><summary>Design tokens</summary>
            <label for="bento-background">Page background</label><input id="bento-background" data-focus-control type="color" value="#080e1d">
            <label for="bento-surface">Card surface</label><input id="bento-surface" data-focus-control type="color" value="#15223f">
            <label for="bento-text">Text color</label><input id="bento-text" data-focus-control type="color" value="#f8fafc">
            <label for="bento-border">Border color</label><input id="bento-border" data-focus-control type="color" value="#334155">
            <label for="bento-shadow">Shadow</label><select id="bento-shadow" data-focus-control><option value="none">None</option><option value="soft" selected>Soft</option><option value="strong">Strong</option></select>
            <label for="bento-type-scale">Typography scale</label><select id="bento-type-scale" data-focus-control><option value="compact">Compact</option><option value="normal" selected>Normal</option><option value="large">Large</option></select>
            <label for="bento-spacing-scale">Spacing scale</label><select id="bento-spacing-scale" data-focus-control><option value="compact">Compact</option><option value="normal" selected>Normal</option><option value="relaxed">Relaxed</option></select>
          </details>
          <p class="muted">The featured card is first in the document so the mobile reading order stays meaningful.</p>
        </form>
        <div class="card focus-preview">
          ${viewportToolbar}
          <div id="focus-canvas" class="focus-canvas" data-viewport="desktop">
            <div class="bento-focus-grid" aria-label="Responsive bento layout preview"></div>
          </div>
          <div id="bento-selection-panel" class="bento-selection-panel" aria-live="polite"><strong>No card selected</strong><p>Select a card to edit its breakpoint spans, name, nesting, and order.</p></div>
          <div id="bento-validation" class="bento-validation" role="status" aria-live="polite"></div>
        </div>
      </div>
      <div class="code focus-code-wrap"><pre><code id="focus-code"></code></pre></div>
      ${actions}
    </section>`,
  "css-grid-generator": `
    <section class="section container reveal" aria-labelledby="builder-title">
      <h2 id="builder-title">Design explicit CSS Grid tracks</h2>
      <p class="lead">Enter real CSS track definitions instead of choosing only a column count. Mix fractional, intrinsic, fixed, and minmax tracks, then test the result at three viewport widths.</p>
      <div class="focus-builder">
        <form class="card focus-controls" onsubmit="return false">
          <label for="css-columns">Column tracks</label>
          <input id="css-columns" data-focus-control type="text" value="2fr 1fr 1fr" spellcheck="false">
          <label for="css-rows">Row tracks</label>
          <input id="css-rows" data-focus-control type="text" value="auto auto" spellcheck="false">
          <label for="css-column-gap">Column gap</label>
          <input id="css-column-gap" data-focus-control type="range" min="0" max="48" value="16">
          <label for="css-row-gap">Row gap</label>
          <input id="css-row-gap" data-focus-control type="range" min="0" max="48" value="16">
          <label for="css-repeat-mode">Responsive repeat mode</label><select id="css-repeat-mode" data-focus-control><option value="manual">Manual tracks</option><option value="auto-fit">auto-fit</option><option value="auto-fill">auto-fill</option></select>
          <label for="css-min-track">Minimum responsive track</label><input id="css-min-track" data-focus-control type="text" value="14rem" spellcheck="false">
          <label for="css-named-areas">Named grid areas</label><textarea id="css-named-areas" data-focus-control rows="3" spellcheck="false">header header header\nmain main aside\nfooter footer footer</textarea>
          <label for="css-auto-columns">Implicit columns</label><select id="css-auto-columns" data-focus-control><option value="1fr">1fr</option><option value="auto">auto</option><option value="min-content">min-content</option><option value="max-content">max-content</option></select>
          <label for="css-auto-rows">Implicit rows</label><select id="css-auto-rows" data-focus-control><option value="minmax(6rem, auto)">minmax(6rem, auto)</option><option value="auto">auto</option><option value="1fr">1fr</option><option value="max-content">max-content</option></select>
          <label for="css-justify-items">Horizontal alignment</label><select id="css-justify-items" data-focus-control><option>stretch</option><option>start</option><option>center</option><option>end</option></select>
          <label for="css-align-items">Vertical alignment</label><select id="css-align-items" data-focus-control><option>stretch</option><option>start</option><option>center</option><option>end</option></select>
          <label for="css-breakpoint">Collapse breakpoint</label><input id="css-breakpoint" data-focus-control type="number" min="320" max="1200" value="720">
          <p class="muted">Try <code>minmax(14rem, 2fr) 1fr</code> or <code>repeat(3, minmax(0, 1fr))</code>.</p>
        </form>
        <div class="card focus-preview">
          ${viewportToolbar}
          <div id="focus-canvas" class="focus-canvas" data-viewport="desktop">
            <div class="css-focus-grid" aria-label="CSS Grid track preview">
              <article class="focus-tile featured">Primary area</article>
              <article class="focus-tile">Secondary</article>
              <article class="focus-tile">Tertiary</article>
              <article class="focus-tile">Supporting content</article>
            </div>
          </div>
        </div>
      </div>
      <div class="code focus-code-wrap"><pre><code id="focus-code"></code></pre></div>
      ${actions}
    </section>`,
  "tailwind-bento-generator": `
    <section class="section container reveal" aria-labelledby="builder-title">
      <h2 id="builder-title">Generate responsive Tailwind bento markup</h2>
      <p class="lead">Choose a Tailwind grid structure, control spacing, and decide whether the output should progressively add columns at the <code>md</code> and <code>lg</code> breakpoints.</p>
      <div class="focus-builder">
        <form class="card focus-controls" onsubmit="return false">
          <label for="tw-columns">Large-screen columns</label>
          <select id="tw-columns" data-focus-control>
            <option value="2">2 columns</option>
            <option value="3" selected>3 columns</option>
            <option value="4">4 columns</option>
          </select>
          <label for="tw-gap">Tailwind gap scale</label>
          <select id="tw-gap" data-focus-control>
            <option value="2">gap-2</option>
            <option value="4" selected>gap-4</option>
            <option value="6">gap-6</option>
            <option value="8">gap-8</option>
          </select>
          <label><input id="tw-responsive" data-focus-control type="checkbox" checked> Add responsive breakpoint classes</label>
          <label for="tw-version">Tailwind version</label><select id="tw-version" data-focus-control><option value="4">Tailwind 4</option><option value="3">Tailwind 3</option></select>
          <label for="tw-arbitrary-tracks">Arbitrary grid tracks</label><input id="tw-arbitrary-tracks" data-focus-control type="text" value="" placeholder="240px_minmax(0,1fr)" spellcheck="false">
          <label><input id="tw-dedupe" data-focus-control type="checkbox" checked> Deduplicate generated classes</label>
          <label for="tw-example-scope">Output scope</label><select id="tw-example-scope" data-focus-control><option value="component">Component only</option><option value="complete">Complete page example</option></select>
          <label><input id="tw-config-notes" data-focus-control type="checkbox" checked> Include configuration notes</label>
          <p class="muted">The preview approximates Tailwind’s spacing scale. The copied output uses real utility classes and keeps the featured item first.</p>
        </form>
        <div class="card focus-preview">
          ${viewportToolbar}
          <div id="focus-canvas" class="focus-canvas" data-viewport="desktop">
            <div class="tailwind-focus-grid" aria-label="Tailwind bento preview">
              <article class="focus-tile featured">Featured project</article>
              <article class="focus-tile">Card 2</article>
              <article class="focus-tile">Card 3</article>
              <article class="focus-tile">Card 4</article>
            </div>
          </div>
        </div>
      </div>
      <div class="code focus-code-wrap"><pre><code id="focus-code"></code></pre></div>
      ${actions}
    </section>`,
  "dashboard-layout-generator": `
    <section class="section container reveal" aria-labelledby="builder-title">
      <h2 id="builder-title">Compose a responsive dashboard shell</h2>
      <p class="lead">Build a dashboard around actual interface regions: navigation, KPI cards, an overview, activity, and a mobile state that removes the fixed sidebar from the layout.</p>
      <div class="focus-builder">
        <form class="card focus-controls" onsubmit="return false">
          <label for="dashboard-sidebar">Sidebar width</label>
          <input id="dashboard-sidebar" data-focus-control type="range" min="180" max="320" value="220">
          <label for="dashboard-gap">Shell gap</label>
          <input id="dashboard-gap" data-focus-control type="range" min="8" max="32" value="16">
          <label for="dashboard-cards">KPI cards</label>
          <input id="dashboard-cards" data-focus-control type="range" min="2" max="6" value="4">
          <label><input id="dashboard-header" data-focus-control type="checkbox" checked> Include application header</label>
          <label for="dashboard-charts">Chart regions</label><input id="dashboard-charts" data-focus-control type="range" min="0" max="4" value="2">
          <label><input id="dashboard-table" data-focus-control type="checkbox" checked> Include data table</label>
          <label><input id="dashboard-feed" data-focus-control type="checkbox" checked> Include activity feed</label>
          <label><input id="dashboard-mobile-nav" data-focus-control type="checkbox" checked> Include mobile navigation button</label>
          <label for="dashboard-state">Product state</label><select id="dashboard-state" data-focus-control><option value="ready">Loaded data</option><option value="loading">Loading</option><option value="empty">Empty</option><option value="error">Error</option></select>
          <p class="muted">On narrow screens the sidebar is removed from the grid. A production app should replace it with an accessible menu button and dialog or drawer.</p>
        </form>
        <div class="card focus-preview">
          ${viewportToolbar}
          <div id="focus-canvas" class="focus-canvas" data-viewport="desktop">
            <div class="dashboard-focus-grid" aria-label="Responsive dashboard preview">
              <aside class="dashboard-sidebar">Navigation<br><br>Overview<br>Reports<br>Team</aside>
              <div class="dashboard-main"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="code focus-code-wrap"><pre><code id="focus-code"></code></pre></div>
      ${actions}
    </section>`
};

const guides = {
  "bento-grid-generator": `
    <div id="guide">
      <section class="section container content-prose reveal">
        <h2>What this bento grid generator does differently</h2>
        <p>A bento layout is not just a group of rounded rectangles. It is a hierarchy expressed through size, position, content order, and responsive behavior. This generator exposes the structural decisions that control that hierarchy. You choose how many cards exist, how many desktop tracks are available, how wide the featured card should be, and how much space separates items.</p>
        <p>The first card is deliberately the featured card in both the preview and generated code. That choice preserves a logical source order when the layout becomes one column. It avoids the common mistake of using CSS visual reordering while assistive technologies and keyboard navigation continue to follow a different sequence.</p>

        <h2>Three original layout tests</h2>
        <div class="evidence-grid">
          <article class="card evidence-card"><h3>Desktop hierarchy</h3><p>Use four tracks and a two-column featured item when the primary story needs emphasis without dominating the whole screen.</p></article>
          <article class="card evidence-card"><h3>Tablet compression</h3><p>Switch the preview to tablet and check whether labels still fit. Reduce the feature span before reducing readable text size.</p></article>
          <article class="card evidence-card"><h3>Mobile reading order</h3><p>The one-column fallback removes all spans. Confirm that the first-to-last card sequence still tells the right story.</p></article>
        </div>

        <h2>Design decisions behind the output</h2>
        <ol class="annotation-list">
          <li><code>minmax(0, 1fr)</code> prevents long content from forcing a grid track wider than its container.</li>
          <li><code>gap</code> owns the layout rhythm, so individual cards do not need fragile outer margins.</li>
          <li>The featured item spans rows only on wider screens; fixed heights are avoided so real copy can grow.</li>
          <li>The mobile rule resets both column and row spans instead of relying on implicit placement.</li>
        </ol>

        <h2>When to use a bento layout</h2>
        <p>Bento composition works well for product features, portfolio case studies, dashboard summaries, service groups, and media collections where several related items have different importance. It is less suitable for a long chronological article, a dense data table, or a workflow whose sequence must be visually uniform.</p>

        <h2>Accessibility and edge cases</h2>
        <p>Keep headings in document order, make interactive cards individually focusable only when they perform an action, and avoid nesting buttons inside a card-wide link. Test long translations, missing images, empty descriptions, 200% zoom, keyboard focus, and reduced motion. A visual span should never be the only way importance is communicated.</p>

        <h2>Framework notes</h2>
        <p>The generated CSS can be moved into a CSS Module, styled component, Vue scoped style, or Astro component without changing its layout logic. In React, keep layout metadata separate from content data; a small variant such as <code>featured</code> or <code>wide</code> is easier to maintain than arbitrary span numbers stored on every content record.</p>

        <h2>Common implementation mistakes</h2>
        <ul>
          <li>Assigning a fixed pixel height to every card.</li>
          <li>Using visual reordering that contradicts the DOM.</li>
          <li>Creating a unique selector for every tile instead of a small variant system.</li>
          <li>Keeping four columns on a screen that cannot support readable content.</li>
          <li>Using decorative gradients with insufficient text contrast.</li>
        </ul>
      </section>
      <section class="section container content-prose reveal">
        <h2>Bento grid generator FAQ</h2>
        <details><summary>Does the exported grid require JavaScript?</summary><p>No. The export is CSS Grid. JavaScript powers only the editor controls, copy action, and download.</p></details>
        <details><summary>How many columns should a bento grid use?</summary><p>Use the smallest number that supports the content hierarchy. Three or four tracks are common on wide screens, but the right choice depends on container width and minimum readable card size.</p></details>
        <details><summary>Can I use the output commercially?</summary><p>Yes. Generated snippets may be adapted for personal and commercial projects under the BentoCSS generated-code license.</p></details>
      </section>
    </div>`,
  "css-grid-generator": `
    <div id="guide">
      <section class="section container content-prose reveal">
        <h2>A CSS Grid generator for track design, not only column counting</h2>
        <p>Real CSS Grid work often requires mixed track sizes. A content area may need twice the space of a sidebar; a navigation rail may need a fixed width; a card collection may need tracks that grow but never become narrower than a usable minimum. This tool accepts actual track syntax so the preview represents those decisions.</p>
        <p>Enter values such as <code>2fr 1fr</code>, <code>240px minmax(0, 1fr)</code>, or <code>repeat(3, minmax(12rem, 1fr))</code>. Separate row and column gaps make asymmetric systems possible, while the viewport buttons expose where an explicit desktop grid needs a mobile fallback.</p>

        <h2>Track-sizing examples</h2>
        <div class="evidence-grid">
          <article class="card evidence-card"><h3>Content and sidebar</h3><p><code>minmax(0, 2fr) minmax(16rem, 1fr)</code> protects the sidebar while allowing the primary area to absorb remaining space.</p></article>
          <article class="card evidence-card"><h3>Equal cards</h3><p><code>repeat(3, minmax(0, 1fr))</code> creates equal tracks and prevents overflowing descendants from widening them.</p></article>
          <article class="card evidence-card"><h3>Intrinsic navigation</h3><p><code>max-content minmax(0, 1fr)</code> gives navigation the width it needs and leaves the rest for content.</p></article>
        </div>

        <h2>How to reason about the generated CSS</h2>
        <ol class="annotation-list">
          <li>Explicit tracks describe the intended wide-screen composition.</li>
          <li>Column and row gaps are independent because editorial layouts often need different horizontal and vertical rhythm.</li>
          <li>The mobile fallback deliberately simplifies to one track; complex desktop areas should not be squeezed blindly.</li>
          <li>Items are left in source order so the fallback remains understandable.</li>
        </ol>

        <h2>CSS Grid versus Flexbox</h2>
        <p>Use Grid when rows and columns form a meaningful two-dimensional relationship. Use Flexbox when the main problem is distributing items along one axis, such as a toolbar or button group. They are complementary: a grid card can contain a flex row, and a flex-based shell can contain a grid gallery.</p>

        <h2>Accessibility and failure testing</h2>
        <p>CSS layout does not change semantics. Use landmarks, headings, lists, articles, and navigation according to the content. Test a very long unbroken string, translated labels, zoom, missing cards, and narrow containers. Add <code>min-width: 0</code> to grid children that contain code, tables, or long text when overflow appears.</p>

        <h2>Common mistakes</h2>
        <ul>
          <li>Using <code>1fr</code> without understanding its automatic minimum.</li>
          <li>Defining rows with fixed heights when content can wrap.</li>
          <li>Leaving explicit multi-column tracks active on narrow screens.</li>
          <li>Using grid areas to visually reorder content into an inaccessible sequence.</li>
          <li>Writing a complex shorthand that teammates cannot safely maintain.</li>
        </ul>

        <h2>Developer notes</h2>
        <p>Move stable values into custom properties when a component needs themes or variants. Container queries may be a better choice than viewport queries when the same component appears in a full page and a narrow sidebar. Keep the simplest rule that expresses the actual relationship.</p>
      </section>
      <section class="section container content-prose reveal">
        <h2>CSS Grid generator FAQ</h2>
        <details><summary>Can I use minmax and repeat?</summary><p>Yes. The track inputs accept normal CSS syntax supported by the browser rendering the preview.</p></details>
        <details><summary>Why does an invalid track value keep the previous layout?</summary><p>The browser ignores invalid CSS declarations. Correct the track syntax and the preview will update.</p></details>
        <details><summary>Does the download include a framework?</summary><p>No. It provides a minimal HTML starter and the generated CSS so it can be adapted to any stack.</p></details>
      </section>
    </div>`,
  "tailwind-bento-generator": `
    <div id="guide">
      <section class="section container content-prose reveal">
        <h2>Responsive Tailwind bento output without class guesswork</h2>
        <p>This generator focuses on the utility-class decisions that make a bento layout responsive: base columns, breakpoint columns, gap scale, featured spans, and source order. The preview helps verify composition, while the output remains ordinary HTML that can be translated to JSX or a template language.</p>
        <p>When responsive mode is enabled, the output begins with one column and progressively adds tracks. That mobile-first order is easier to reason about than defining a desktop grid and trying to undo every span later.</p>

        <h2>Output evidence at three widths</h2>
        <div class="evidence-grid">
          <article class="card evidence-card"><h3>Base state</h3><p><code>grid-cols-1</code> gives narrow screens a predictable reading sequence with no horizontal compression.</p></article>
          <article class="card evidence-card"><h3>Medium state</h3><p><code>md:grid-cols-2</code> introduces hierarchy once cards have enough inline space.</p></article>
          <article class="card evidence-card"><h3>Large state</h3><p><code>lg:grid-cols-3</code> or <code>lg:grid-cols-4</code> creates the final bento composition.</p></article>
        </div>

        <h2>Design decisions</h2>
        <ol class="annotation-list">
          <li>The featured element occurs first and receives span utilities only from the medium breakpoint.</li>
          <li>Spacing uses Tailwind’s scale so the output stays compatible with a project design system.</li>
          <li>Rounded surfaces and color utilities are examples, not required layout dependencies.</li>
          <li>The copied structure avoids plugin-only classes and works with standard Tailwind grid utilities.</li>
        </ol>

        <h2>Tailwind version notes</h2>
        <p>Core grid, gap, span, padding, color, and radius utilities are stable concepts across modern Tailwind versions. Projects with a restricted class scanner should keep generated class strings statically discoverable. If class names are assembled dynamically, ensure the build process safelists the possible values.</p>

        <h2>Accessibility guidance</h2>
        <p>Utilities do not provide semantics. Use <code>article</code>, headings, links, and buttons according to the content. Maintain visible focus styles, verify contrast against dark surfaces, and avoid hover-only information. Do not use responsive order utilities to create a visual order that differs from keyboard and screen-reader order.</p>

        <h2>Common mistakes</h2>
        <ul>
          <li>Generating class names dynamically so the production build removes them.</li>
          <li>Applying column spans at the base breakpoint.</li>
          <li>Using arbitrary values for every property instead of the shared theme.</li>
          <li>Copying a component without matching its colors to the project contrast requirements.</li>
          <li>Adding a dependency for a layout that standard utilities already support.</li>
        </ul>

        <h2>React and component notes</h2>
        <p>In JSX, replace <code>class</code> with <code>className</code>. Keep a small variant map for standard, featured, and wide cards rather than concatenating arbitrary user-controlled classes. This produces predictable builds and simpler reviews.</p>
      </section>
      <section class="section container content-prose reveal">
        <h2>Tailwind bento generator FAQ</h2>
        <details><summary>Does this load Tailwind into my project?</summary><p>No. It generates markup for a project that already uses Tailwind.</p></details>
        <details><summary>Can I use the markup in React?</summary><p>Yes. Change <code>class</code> to <code>className</code> and move repeated cards into components.</p></details>
        <details><summary>Why is the featured span applied at md?</summary><p>Base layouts should remain one column. Applying the span only when multiple tracks exist avoids implicit empty columns and confusing mobile placement.</p></details>
      </section>
    </div>`,
  "dashboard-layout-generator": `
    <div id="guide">
      <section class="section container content-prose reveal">
        <h2>A dashboard generator built around interface regions</h2>
        <p>A useful dashboard layout is more than an equal card grid. It coordinates persistent navigation, summary metrics, a primary overview, supporting activity, and a mobile navigation strategy. This generator exposes sidebar width, shell spacing, KPI density, and responsive preview states so those relationships can be tested before real data is connected.</p>
        <p>The generated CSS uses a two-column shell on wide screens and removes the sidebar track at the mobile breakpoint. A production application should pair that mobile state with an accessible menu button and a labeled dialog or drawer.</p>

        <h2>Responsive dashboard tests</h2>
        <div class="evidence-grid">
          <article class="card evidence-card"><h3>Scanning</h3><p>The overview spans the main content width, while KPI cards form a consistent comparison row beneath it.</p></article>
          <article class="card evidence-card"><h3>Navigation</h3><p>The sidebar width can grow for longer labels without assigning a fixed width to the main content.</p></article>
          <article class="card evidence-card"><h3>Mobile priority</h3><p>The main content becomes one column and keeps the overview before supporting metrics and activity.</p></article>
        </div>

        <h2>Layout decisions</h2>
        <ol class="annotation-list">
          <li><code>minmax(0, 1fr)</code> protects the main track from wide tables and charts.</li>
          <li>The shell gap and the card-grid gap are separate so page rhythm and component rhythm can evolve independently.</li>
          <li>The main overview spans both internal columns to establish the first scan target.</li>
          <li>The mobile breakpoint removes the desktop navigation region instead of squeezing it beside content.</li>
        </ol>

        <h2>States a production dashboard must include</h2>
        <p>Design loading, empty, partial-data, error, stale-data, and permission-denied states. Reserve stable chart and table space during loading to limit layout shift. A metric needs a label, value, period, and comparison context; color alone should not communicate whether a change is positive or negative.</p>

        <h2>Accessibility guidance</h2>
        <p>Use navigation and main landmarks, a single descriptive page heading, real table markup for tabular data, and text alternatives for chart conclusions. Keyboard focus must move into and out of a mobile navigation drawer predictably. Avoid auto-refreshing regions without warning, and announce important data updates through an appropriate live region.</p>

        <h2>Common dashboard mistakes</h2>
        <ul>
          <li>Keeping a fixed sidebar visible on narrow screens.</li>
          <li>Using cards for every piece of text, which weakens hierarchy.</li>
          <li>Rendering chart meaning only through color.</li>
          <li>Allowing tables to force the whole page wider than the viewport.</li>
          <li>Showing metrics without time period, units, or comparison context.</li>
        </ul>

        <h2>Framework and performance notes</h2>
        <p>The layout works with server-rendered HTML, React, Vue, or another framework. Lazy-load expensive chart libraries below the initial summary, reserve chart dimensions, and avoid rerendering the whole dashboard for one metric update. Keep navigation state separate from data-fetching state.</p>
      </section>
      <section class="section container content-prose reveal">
        <h2>Dashboard layout generator FAQ</h2>
        <details><summary>Does the generator include charts?</summary><p>It creates accessible layout regions for charts. Connect the exported structure to the chart library and data source used by your application.</p></details>
        <details><summary>What happens to the sidebar on mobile?</summary><p>The CSS removes it from the grid. Add a menu button and accessible drawer behavior in the application layer.</p></details>
        <details><summary>How many KPI cards should a dashboard show?</summary><p>Show only the metrics needed for the user’s immediate decision. Four is a useful starting point, not a rule.</p></details>
      </section>
    </div>`
};

const relatedByTool = {
  "bento-grid-generator": [
    "css-grid-generator",
    "tailwind-bento-generator",
    "bento-grid-examples",
    "best-bento-layouts",
    "legacy-templates",
    "design-guide"
  ],
  "css-grid-generator": [
    "bento-grid-generator",
    "css-grid-examples",
    "css-grid-cheatsheet",
    "dashboard-layout-generator",
    "design-guide"
  ],
  "tailwind-bento-generator": [
    "legacy-tailwind-bento-generator",
    "tailwind-guide",
    "bento-grid-generator",
    "tailwind-grid-cheatsheet",
    "dashboard-layout-generator"
  ],
  "dashboard-layout-generator": [
    "responsive-dashboard-layouts",
    "css-grid-generator",
    "bento-grid-generator",
    "tailwind-bento-generator",
    "ui-layout-templates"
  ]
};

for (const [id, builder] of Object.entries(builders)) {
  const route = registry.routes.find((candidate) => candidate.id === id);
  const file = path.join(root, route.outputPath);
  let html = fs.readFileSync(file, "utf8");
  const builderStart = html.indexOf(
    '<section class="section container reveal" aria-labelledby="builder-title">'
  );
  const guideStart = html.indexOf('<div id="guide">', builderStart);
  const relatedStart = html.indexOf(
    '<section class="section container related">',
    guideStart
  );
  if (builderStart < 0 || guideStart < 0 || relatedStart < 0) {
    throw new Error(`Unable to locate focus-page sections in ${route.outputPath}`);
  }

  html =
    html.slice(0, builderStart) +
    builder +
    guides[id].replace("</div>", `${implementationEvidence}</div>`) +
    html.slice(relatedStart);

  const newRelatedStart = html.indexOf(
    '<section class="section container related">'
  );
  const relatedEnd = html.indexOf(
    '<section class="section container card">',
    newRelatedStart
  );
  const relatedCards = relatedByTool[id].map((relatedId) => {
    const related = registry.routes.find((candidate) => candidate.id === relatedId);
    return `<a class="card" href="${related.url}"><span class="eyebrow">${related.type}</span><h3>${related.title}</h3><p class="muted">Open the related tool, example, or implementation guide.</p></a>`;
  }).join("");
  const relatedSection = `<section class="section container related"><h2>Related tools and guides</h2><div class="grid grid-3">${relatedCards}</div></section>`;
  html =
    html.slice(0, newRelatedStart) +
    relatedSection +
    html.slice(relatedEnd);

  html = html.replace("<body>", `<body data-focus-tool="${id}">`);
  if (!html.includes("/assets/js/focus-tools.js")) {
    html = html.replace(
      '<script src="/assets/js/main.js" defer></script>',
      '<script src="/assets/js/focus-tools.js" defer></script><script src="/assets/js/main.js" defer></script>'
    );
  }
  fs.writeFileSync(file, html.replace(/[ \t]+$/gm, ""));
}
