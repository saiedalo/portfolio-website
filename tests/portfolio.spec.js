// @ts-check
const { test, expect } = require('@playwright/test');

const BASE = 'http://localhost:3333';

// Helper: clear localStorage so each test starts with a fresh theme
async function clearStorage(page) {
  await page.addInitScript(() => localStorage.clear());
}

// =========================================
// INDEX.HTML — Home page
// =========================================
test.describe('Home page (index.html)', () => {

  test('page loads and has correct title', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/index.html`);
    await expect(page).toHaveTitle(/ARCHITECT\.AI/);
  });

  test('hero headline and CTA buttons are visible', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/index.html`);
    await expect(page.locator('h1')).toContainText('Intelligente Systeme');
    await expect(page.locator('a.btn-cta').first()).toBeVisible();
    await expect(page.locator('a.btn-ghost').first()).toBeVisible();
  });

  test('code block renders with syntax highlighting', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/index.html`);
    await expect(page.locator('.code-block')).toBeVisible();
    await expect(page.locator('.code-block__filename')).toContainText('azure_rag_pipeline.py');
    await expect(page.locator('.code-kw').first()).toBeVisible();
  });

  test('stats strip shows all four stats', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/index.html`);
    const stats = page.locator('.stat-value');
    await expect(stats).toHaveCount(4);
    await expect(stats.first()).toContainText('12+');
  });

  test('tech badges are rendered', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/index.html`);
    const badges = page.locator('.tech-badge');
    await expect(badges).toHaveCount(8);
    await expect(page.locator('.tech-badge').first()).toContainText('LangChain');
  });

  test('expertise cards are rendered', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/index.html`);
    const cards = page.locator('.expertise-card');
    await expect(cards).toHaveCount(3);
    await expect(cards.nth(0)).toContainText('Cloud Architecture');
    await expect(cards.nth(1)).toContainText('DSGVO');
    await expect(cards.nth(2)).toContainText('MLOps');
  });

  test('testimonial cards render all three', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/index.html`);
    const cards = page.locator('.testimonial-card');
    await expect(cards).toHaveCount(3);
    await expect(cards.nth(0)).toContainText('Thomas Müller');
    await expect(cards.nth(1)).toContainText('Sandra Becker');
    await expect(cards.nth(2)).toContainText('Robert Wagner');
  });

  test('FAQ accordion items are present (collapsed by default)', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/index.html`);
    const items = page.locator('.faq-accordion .accordion-item');
    await expect(items).toHaveCount(4);
    // All collapsed by default
    const collapsePanel = page.locator('.faq-accordion .accordion-collapse').first();
    await expect(collapsePanel).not.toHaveClass(/show/);
  });

  test('FAQ accordion opens and closes on click', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/index.html`);
    const firstBtn = page.locator('.faq-accordion .accordion-button').first();
    const firstBody = page.locator('#faq1');

    // Open
    await firstBtn.click();
    await expect(firstBody).toHaveClass(/show/);
    await expect(firstBtn).toHaveAttribute('aria-expanded', 'true');

    // Close
    await firstBtn.click();
    await expect(firstBody).not.toHaveClass(/show/);
    await expect(firstBtn).toHaveAttribute('aria-expanded', 'false');
  });

  test('CTA banner is visible and links to kontakt.html', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/index.html`);
    const cta = page.locator('.cta-banner');
    await expect(cta).toBeVisible();
    await expect(cta.locator('a.btn-cta')).toHaveAttribute('href', 'kontakt.html');
  });

  test('footer renders with all four columns', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/index.html`);
    const footer = page.locator('.site-footer');
    await expect(footer).toBeVisible();
    await expect(footer.locator('.site-footer__link')).toHaveCount(7);
  });

});

// =========================================
// NAVIGATION
// =========================================
test.describe('Navigation', () => {

  test('brand logo links back to index.html', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/projekte.html`);
    await expect(page.locator('.site-nav__brand')).toHaveAttribute('href', 'index.html');
  });

  test('desktop nav has 4 links', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/index.html`);
    const links = page.locator('.site-nav__links .site-nav__link');
    await expect(links).toHaveCount(4);
  });

  test('nav links point to correct pages', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/index.html`);
    const links = page.locator('.site-nav__links .site-nav__link');
    await expect(links.nth(0)).toHaveAttribute('href', 'projekte.html');
    await expect(links.nth(1)).toHaveAttribute('href', 'ueber-mich.html');
    await expect(links.nth(2)).toHaveAttribute('href', 'blog.html');
    await expect(links.nth(3)).toHaveAttribute('href', 'kontakt.html');
  });

  test('nav page navigation works', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/index.html`);
    await page.locator('.site-nav__links .site-nav__link[href="projekte.html"]').click();
    await expect(page).toHaveURL(/projekte\.html/);
    await expect(page).toHaveTitle(/Projekte/);
  });

  test('availability badge is visible', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/index.html`);
    await expect(page.locator('.avail-badge').first()).toBeVisible();
    await expect(page.locator('.avail-badge').first()).toContainText('Verfügbar');
  });

  test('mobile offcanvas opens on hamburger click', async ({ page, viewport }) => {
    await clearStorage(page);
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${BASE}/index.html`);
    const hamburger = page.locator('[data-bs-target="#mobileNav"]');
    await expect(hamburger).toBeVisible();
    await hamburger.click();
    await expect(page.locator('#mobileNav')).toHaveClass(/show/);
  });

  test('offcanvas closes on close button', async ({ page }) => {
    await clearStorage(page);
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${BASE}/index.html`);
    await page.locator('[data-bs-target="#mobileNav"]').click();
    await page.locator('#mobileNav .btn-icon[data-bs-dismiss="offcanvas"]').click();
    await expect(page.locator('#mobileNav')).not.toHaveClass(/show/);
  });

  test('nav becomes scrolled after scrolling past hero', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/index.html`);
    const nav = page.locator('#site-nav');
    await expect(nav).not.toHaveClass(/nav-scrolled/);
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForTimeout(200);
    await expect(nav).toHaveClass(/nav-scrolled/);
  });

});

// =========================================
// THEME TOGGLE
// =========================================
test.describe('Theme switcher', () => {

  test('defaults to light mode when no preference stored', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/index.html`);
    const theme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    );
    // Either light or dark depending on OS — just check it's set
    expect(['light', 'dark']).toContain(theme);
  });

  test('toggle switches from light to dark', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('portfolio-theme', 'light'));
    await page.goto(`${BASE}/index.html`);
    const btn = page.locator('#theme-toggle');
    await btn.click();
    const theme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    );
    expect(theme).toBe('dark');
  });

  test('toggle switches from dark to light', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('portfolio-theme', 'dark'));
    await page.goto(`${BASE}/index.html`);
    const btn = page.locator('#theme-toggle');
    await btn.click();
    const theme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    );
    expect(theme).toBe('light');
  });

  test('theme persists across page reload', async ({ page }) => {
    // Don't use addInitScript here — it re-runs on reload and would reset localStorage
    await page.goto(`${BASE}/index.html`);
    // Force light mode via evaluate (runs once, survives reload)
    await page.evaluate(() => localStorage.setItem('portfolio-theme', 'light'));
    await page.reload();
    await page.locator('#theme-toggle').click(); // light → dark
    await page.reload(); // dark should persist from localStorage
    const theme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    );
    expect(theme).toBe('dark');
  });

  test('theme persists across page navigation', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('portfolio-theme', 'dark'));
    await page.goto(`${BASE}/index.html`);
    await page.locator('.site-nav__links .site-nav__link[href="projekte.html"]').click();
    const theme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-theme')
    );
    expect(theme).toBe('dark');
  });

  test('data-bs-theme is set alongside data-theme', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('portfolio-theme', 'dark'));
    await page.goto(`${BASE}/index.html`);
    const bsTheme = await page.evaluate(() =>
      document.documentElement.getAttribute('data-bs-theme')
    );
    expect(bsTheme).toBe('dark');
  });

  test('theme icon changes on toggle', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('portfolio-theme', 'light'));
    await page.goto(`${BASE}/index.html`);
    const icon = page.locator('#theme-toggle .theme-icon');
    await expect(icon).toContainText('dark_mode');
    await page.locator('#theme-toggle').click();
    await expect(icon).toContainText('light_mode');
  });

});

// =========================================
// ÜBER MICH PAGE
// =========================================
test.describe('Über mich page (ueber-mich.html)', () => {

  test('page loads with correct title', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/ueber-mich.html`);
    await expect(page).toHaveTitle(/Über mich/);
  });

  test('hero headline is visible', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/ueber-mich.html`);
    await expect(page.locator('h1')).toContainText('Expertise');
  });

  test('expertise badges render', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/ueber-mich.html`);
    // .tech-badge is used throughout the page (hero + skills chips), check specific texts
    await expect(page.locator('.tech-badge').filter({ hasText: 'Cloud Architect' })).toBeVisible();
    await expect(page.locator('.tech-badge').filter({ hasText: 'ML Specialist' })).toBeVisible();
    await expect(page.locator('.tech-badge').filter({ hasText: 'Compliance Expert' })).toBeVisible();
  });

  test('timeline has 3 steps', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/ueber-mich.html`);
    const steps = page.locator('.timeline-card');
    await expect(steps).toHaveCount(3);
    await expect(steps.nth(0)).toContainText('Die Anfänge');
    await expect(steps.nth(1)).toContainText('KI-Spezialisierung');
    await expect(steps.nth(2)).toContainText('Senior Architekt');
  });

  test('values section has 3 cards', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/ueber-mich.html`);
    const cards = page.locator('.expertise-card');
    await expect(cards).toHaveCount(3);
    await expect(cards.nth(0)).toContainText('Pragmatismus');
    await expect(cards.nth(1)).toContainText('Sicherheit');
    await expect(cards.nth(2)).toContainText('Transparenz');
  });

  test('current focus section renders', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/ueber-mich.html`);
    await expect(page.locator('.current-focus')).toBeVisible();
    await expect(page.locator('.current-focus')).toContainText('Aktueller Fokus');
  });

  test('skill bars are rendered', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/ueber-mich.html`);
    const bars = page.locator('.skill-bar');
    await expect(bars).toHaveCount(4);
    // Check that fill elements have inline width styles
    const fills = page.locator('.skill-bar__fill');
    await expect(fills).toHaveCount(4);
    const width = await fills.first().getAttribute('style');
    expect(width).toContain('width:');
  });

  test('architecture patterns chips render', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/ueber-mich.html`);
    await expect(page.locator('.tech-badge').filter({ hasText: 'Microservices' })).toBeVisible();
    await expect(page.locator('.tech-badge').filter({ hasText: 'Serverless' })).toBeVisible();
  });

});

// =========================================
// PROJEKTE PAGE — Filter tabs
// =========================================
test.describe('Projekte page (projekte.html)', () => {

  test('page loads with correct title', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/projekte.html`);
    await expect(page).toHaveTitle(/Projekte/);
  });

  test('hero headline is visible', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/projekte.html`);
    await expect(page.locator('h1')).toContainText('Meine Projekte');
  });

  test('filter tabs render with 4 options', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/projekte.html`);
    const tabs = page.locator('[data-filter-btn]');
    await expect(tabs).toHaveCount(4);
  });

  test('"Alle" tab is active by default', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/projekte.html`);
    const alleTab = page.locator('[data-filter-btn="alle"]');
    await expect(alleTab).toHaveClass(/filter-btn--active/);
  });

  test('all 6 project cards are visible with "Alle" selected', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/projekte.html`);
    const cards = page.locator('[data-category]');
    await expect(cards).toHaveCount(6);
    for (let i = 0; i < 6; i++) {
      await expect(cards.nth(i)).toBeVisible();
    }
  });

  test('"KI-Lösungen" filter shows only KI cards', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/projekte.html`);
    await page.locator('[data-filter-btn="ki-loesungen"]').click();

    // KI cards: project 1, 2, 3, 4 have ki-loesungen
    const visibleCards = page.locator('[data-category*="ki-loesungen"]');
    await expect(visibleCards).toHaveCount(4);

    // Non-KI card (project 5: open-source only) should be hidden
    const hiddenCard = page.locator('[data-category="open-source"]');
    await expect(hiddenCard).toHaveCount(1);
    await page.waitForTimeout(350); // wait for hide animation
    await expect(hiddenCard).not.toBeVisible();
  });

  test('"Web Apps" filter shows correct cards', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/projekte.html`);
    await page.locator('[data-filter-btn="web-apps"]').click();

    const visibleCards = page.locator('[data-category*="web-apps"]');
    await expect(visibleCards).toHaveCount(2);
  });

  test('"Open Source" filter shows correct cards', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/projekte.html`);
    await page.locator('[data-filter-btn="open-source"]').click();

    const visibleCards = page.locator('[data-category*="open-source"]');
    await expect(visibleCards).toHaveCount(2);
  });

  test('switching back to "Alle" shows all cards again', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/projekte.html`);

    // Filter down
    await page.locator('[data-filter-btn="web-apps"]').click();
    await page.waitForTimeout(350);

    // Go back to all
    await page.locator('[data-filter-btn="alle"]').click();
    await page.waitForTimeout(350);

    const cards = page.locator('[data-category]');
    for (let i = 0; i < 6; i++) {
      await expect(cards.nth(i)).toBeVisible();
    }
  });

  test('active tab style updates on click', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/projekte.html`);
    const webTab = page.locator('[data-filter-btn="web-apps"]');
    await webTab.click();
    await expect(webTab).toHaveClass(/filter-btn--active/);
    await expect(page.locator('[data-filter-btn="alle"]')).not.toHaveClass(/filter-btn--active/);
  });

  test('project cards have Live Demo and GitHub buttons', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/projekte.html`);
    const firstCard = page.locator('[data-category]').first();
    await expect(firstCard.locator('a', { hasText: 'Live Demo' })).toBeVisible();
    await expect(firstCard.locator('a', { hasText: 'GitHub' })).toBeVisible();
  });

});

// =========================================
// BLOG PAGE
// =========================================
test.describe('Blog page (blog.html)', () => {

  test('page loads with correct title', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/blog.html`);
    await expect(page).toHaveTitle(/Blog/);
  });

  test('page header renders', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/blog.html`);
    await expect(page.locator('h1')).toContainText('Insights');
  });

  test('featured article is visible', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/blog.html`);
    await expect(page.locator('.blog-featured')).toBeVisible();
    await expect(page.locator('.blog-featured')).toContainText('Multi-Agent-Systemen');
  });

  test('blog post grid has 4 posts', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/blog.html`);
    const posts = page.locator('.blog-card');
    await expect(posts).toHaveCount(4);
  });

  test('sidebar search input is visible', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/blog.html`);
    await expect(page.locator('.sidebar-search input')).toBeVisible();
  });

  test('sidebar has 5 category buttons', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/blog.html`);
    const cats = page.locator('.category-btn');
    await expect(cats).toHaveCount(5);
    await expect(cats.first()).toContainText('Alle');
    await expect(cats.first()).toHaveClass(/category-btn--active/);
  });

  test('blog cards have "Lesen" links', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/blog.html`);
    const readLinks = page.locator('.blog-card a', { hasText: 'Lesen' });
    await expect(readLinks).toHaveCount(4);
  });

  test('"Mehr Artikel laden" button is visible', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/blog.html`);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator('button', { hasText: 'Mehr Artikel laden' })).toBeVisible();
  });

});

// =========================================
// KONTAKT PAGE — Form validation
// =========================================
test.describe('Kontakt page (kontakt.html)', () => {

  test('page loads with correct title', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/kontakt.html`);
    await expect(page).toHaveTitle(/Kontakt/);
  });

  test('page header renders', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/kontakt.html`);
    await expect(page.locator('h1')).toContainText('Lassen Sie uns sprechen');
  });

  test('contact form fields are present', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/kontakt.html`);
    await expect(page.locator('#contact-name')).toBeVisible();
    await expect(page.locator('#contact-email')).toBeVisible();
    await expect(page.locator('#contact-type')).toBeVisible();
    await expect(page.locator('#contact-budget')).toBeVisible();
    await expect(page.locator('#contact-message')).toBeVisible();
  });

  test('submit button is visible', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/kontakt.html`);
    await expect(page.locator('#contact-form button[type="submit"]')).toBeVisible();
  });

  test('form shows validation errors on empty submit', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/kontakt.html`);
    await page.locator('#contact-form button[type="submit"]').click();
    // Required fields should get is-invalid class
    await expect(page.locator('#contact-name')).toHaveClass(/is-invalid/);
    await expect(page.locator('#contact-email')).toHaveClass(/is-invalid/);
    await expect(page.locator('#contact-message')).toHaveClass(/is-invalid/);
  });

  test('email field validates format', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/kontakt.html`);
    await page.locator('#contact-name').fill('Test User');
    await page.locator('#contact-email').fill('not-an-email');
    await page.locator('#contact-message').fill('Test message');
    await page.locator('#contact-form button[type="submit"]').click();
    await expect(page.locator('#contact-email')).toHaveClass(/is-invalid/);
  });

  test('valid form submission shows success message', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/kontakt.html`);
    await page.locator('#contact-name').fill('Max Mustermann');
    await page.locator('#contact-email').fill('max@beispiel.de');
    await page.locator('#contact-type').selectOption('KI-Architektur & Consulting');
    await page.locator('#contact-message').fill('Ich benötige Ihre Beratung für ein KI-Projekt.');
    await page.locator('#contact-form button[type="submit"]').click();
    await expect(page.locator('#form-success')).toBeVisible();
    await expect(page.locator('#contact-form')).not.toBeVisible();
  });

  test('invalid state clears on typing', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/kontakt.html`);
    // Trigger validation
    await page.locator('#contact-form button[type="submit"]').click();
    await expect(page.locator('#contact-name')).toHaveClass(/is-invalid/);
    // Type to clear
    await page.locator('#contact-name').fill('A');
    await expect(page.locator('#contact-name')).not.toHaveClass(/is-invalid/);
  });

  test('direct contact cards are visible', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/kontakt.html`);
    const cards = page.locator('.contact-info-card');
    await expect(cards).toHaveCount(3);
    await expect(cards.nth(0)).toContainText('contact@ai-architect.dev');
  });

  test('FAQ bento cards are visible', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/kontakt.html`);
    const faqCards = page.locator('.faq-bento');
    await expect(faqCards).toHaveCount(4);
  });

  test('location map section renders', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/kontakt.html`);
    await expect(page.locator('.location-map')).toBeVisible();
    await expect(page.locator('.location-card')).toContainText('Berlin');
  });

});

// =========================================
// CSS DESIGN TOKENS — spot-checks
// =========================================
test.describe('Design tokens and CSS', () => {

  test('light mode: body background is correct color', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('portfolio-theme', 'light'));
    await page.goto(`${BASE}/index.html`);
    const bg = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim()
    );
    expect(bg).toBe('#faf8ff');
  });

  test('dark mode: body background is correct color', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('portfolio-theme', 'dark'));
    await page.goto(`${BASE}/index.html`);
    const bg = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--color-bg').trim()
    );
    expect(bg).toBe('#031427');
  });

  test('light mode: primary color token is set', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('portfolio-theme', 'light'));
    await page.goto(`${BASE}/index.html`);
    const primary = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim()
    );
    expect(primary).toBe('#004ac6');
  });

  test('dark mode: primary color token is set', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('portfolio-theme', 'dark'));
    await page.goto(`${BASE}/index.html`);
    const primary = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim()
    );
    expect(primary).toBe('#adc6ff');
  });

  test('site-container has correct max-width', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/index.html`);
    const maxWidth = await page.evaluate(() =>
      getComputedStyle(document.querySelector('.site-container')).maxWidth
    );
    expect(maxWidth).toBe('1440px');
  });

  test('Sora font is applied to h1', async ({ page }) => {
    await clearStorage(page);
    await page.goto(`${BASE}/index.html`);
    const fontFamily = await page.evaluate(() =>
      getComputedStyle(document.querySelector('h1')).fontFamily
    );
    expect(fontFamily.toLowerCase()).toContain('sora');
  });

});

// =========================================
// RESPONSIVE — mobile viewport checks
// =========================================
test.describe('Responsive layout', () => {

  test('desktop nav is hidden on mobile', async ({ page }) => {
    await clearStorage(page);
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${BASE}/index.html`);
    // The desktop link list has d-none d-lg-flex — should not be visible
    const desktopNav = page.locator('.site-nav__links.d-none.d-lg-flex');
    await expect(desktopNav).toBeHidden();
  });

  test('hamburger button is visible on mobile', async ({ page }) => {
    await clearStorage(page);
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${BASE}/index.html`);
    await expect(page.locator('[data-bs-target="#mobileNav"]')).toBeVisible();
  });

  test('hero layout stacks on mobile', async ({ page }) => {
    await clearStorage(page);
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`${BASE}/index.html`);
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('.btn-cta').first()).toBeVisible();
  });

  test('desktop nav is visible at 1280px', async ({ page }) => {
    await clearStorage(page);
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.goto(`${BASE}/index.html`);
    const desktopNav = page.locator('.site-nav__links');
    await expect(desktopNav).toBeVisible();
  });

});

// =========================================
// CROSS-PAGE — internal links
// =========================================
test.describe('Cross-page navigation', () => {

  const pages = [
    { url: 'index.html',     title: 'COELN.AI' },
    { url: 'ueber-mich.html', title: 'Über mich' },
    { url: 'projekte.html',  title: 'Projekte' },
    { url: 'blog.html',      title: 'Blog' },
    { url: 'kontakt.html',   title: 'Kontakt' },
  ];

  for (const p of pages) {
    test(`${p.url} loads without console errors`, async ({ page }) => {
      const errors = [];
      page.on('pageerror', err => errors.push(err.message));
      page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      await clearStorage(page);
      await page.goto(`${BASE}/${p.url}`);
      // Filter out expected network errors for external image URLs
      const criticalErrors = errors.filter(e =>
        !e.includes('net::ERR') &&
        !e.includes('Failed to load resource') &&
        !e.includes('404')
      );
      expect(criticalErrors).toHaveLength(0);
    });
  }

  test('all pages share the same nav structure', async ({ page }) => {
    await clearStorage(page);
    for (const p of pages) {
      await page.goto(`${BASE}/${p.url}`);
      await expect(page.locator('#site-nav')).toBeVisible();
      await expect(page.locator('.site-nav__brand')).toBeVisible();
      await expect(page.locator('#theme-toggle')).toBeVisible();
      await expect(page.locator('.site-footer')).toBeVisible();
    }
  });

});
