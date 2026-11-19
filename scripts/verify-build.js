#!/usr/bin/env node
/*
 * Post-build verification for Reka Botswana.
 * Fails (exit 1) if the built site breaks its own contract:
 *   1. every referenced local asset in built HTML exists in public/
 *   2. expected routes exist (core pages + every catalogue/journal item)
 *   3. PWA contract: sw.js present, manifest valid, icons present,
 *      security headers and SW no-cache rules in _headers/netlify.toml
 *   4. no forbidden strings leak into any built page
 *   5. JSON-LD blocks parse as JSON
 *   6. page-data exists for every generated route
 * Run: node scripts/verify-build.js (after `gatsby build`)
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const publicDir = path.join(root, 'public');
const failures = [];
const passes = [];

const ok = (msg) => passes.push(msg);
const fail = (msg) => failures.push(msg);

if (!fs.existsSync(publicDir)) {
  console.error('✗ public/ does not exist — run `gatsby build` first.');
  process.exit(1);
}

// ---------- collect html files ----------
const htmlFiles = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) htmlFiles.push(full);
  }
})(publicDir);
ok(`built html pages: ${htmlFiles.length}`);
if (htmlFiles.length < 30) fail(`suspiciously few html pages (${htmlFiles.length}) — build incomplete?`);

// ---------- 1) asset references ----------
const assetRef = /(?:href|src)="(\/[^"#]+\.(?:js|css|woff2|png|jpe?g|svg|ico|webmanifest|txt))"/g;
let missing = 0;
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  for (const match of html.matchAll(assetRef)) {
    const target = path.join(publicDir, decodeURIComponent(match[1]));
    if (!fs.existsSync(target)) {
      missing++;
      if (missing <= 5) fail(`missing asset ${match[1]} referenced by ${path.relative(publicDir, file)}`);
    }
  }
}
missing ? fail(`${missing} missing asset reference(s)`) : ok('all referenced assets exist');

// ---------- 2) expected routes ----------
const productSlugs = JSON.parse(fs.readFileSync(path.join(root, 'src/helpers/product.json'), 'utf8')).map((p) => p.slug);
const journalSlugs = JSON.parse(fs.readFileSync(path.join(root, 'src/helpers/blog.json'), 'utf8')).map((j) => j.slug);
const coreRoutes = ['', 'shop', 'cart', 'search', 'about', 'faq', 'support', 'journal', 'order-confirmation', '404.html'];
const expectedRoutes = [
  ...coreRoutes,
  ...productSlugs.map((s) => `product/${s}`),
  ...journalSlugs.map((s) => `journal/${s}`),
];
for (const route of expectedRoutes) {
  const candidates = route.endsWith('.html')
    ? [path.join(publicDir, route)]
    : [path.join(publicDir, route, 'index.html')];
  if (!candidates.some((c) => fs.existsSync(c))) fail(`route missing: /${route}`);
}
ok(`route coverage checked: ${expectedRoutes.length} routes (+ 404 variants)`);

// ---------- 3) PWA contract ----------
const swPath = path.join(publicDir, 'sw.js');
if (fs.existsSync(swPath)) ok('sw.js present');
else fail('sw.js missing from build output');

const manifestPath = path.join(publicDir, 'site.webmanifest');
try {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  for (const key of ['name', 'short_name', 'start_url', 'display', 'theme_color', 'background_color', 'icons']) {
    if (manifest[key] === undefined) fail(`site.webmanifest missing "${key}"`);
  }
  for (const icon of manifest.icons || []) {
    if (!fs.existsSync(path.join(publicDir, icon.src))) fail(`manifest icon missing: ${icon.src}`);
  }
  ok('site.webmanifest valid, icons present');
} catch (e) {
  fail(`site.webmanifest invalid: ${e.message}`);
}

const headersPath = path.join(root, 'static/_headers');
if (fs.existsSync(headersPath)) {
  const headers = fs.readFileSync(headersPath, 'utf8');
  for (const needle of ['X-Frame-Options', 'X-Content-Type-Options', '/sw.js', 'must-revalidate']) {
    if (!headers.includes(needle)) fail(`static/_headers missing "${needle}"`);
  }
  ok('static/_headers carries security + sw.js rules');
}
const netlifyToml = fs.readFileSync(path.join(root, 'netlify.toml'), 'utf8');
if (!netlifyToml.includes('sw.js')) fail('netlify.toml lost the sw.js no-cache rule');
else ok('netlify.toml sw.js no-cache rule present');

// exactly one <title> per page
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const titles = (html.match(/<title[\s>]/g) || []).length;
  if (titles !== 1) fail(`expected exactly 1 <title> in ${path.relative(publicDir, file)}, found ${titles}`);
}
ok('every built page has exactly one <title>');

// no literal "undefined" in visible markup text (cheap sentinel for template bugs)
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  if (/>[^<{}]*undefined[^<{}]*</.test(html)) fail(`literal "undefined" rendered in ${path.relative(publicDir, file)}`);
}
ok('no literal undefined rendered in markup');

// sitemap generated
if (fs.existsSync(path.join(publicDir, 'sitemap/sitemap-index.xml'))) ok('sitemap generated');
else fail('sitemap missing (gatsby-plugin-sitemap)');

// ---------- 4) forbidden strings ----------
const forbidden = ['fonts.googleapis.com', 'fonts.gstatic.com', 'localhost:8000', '127.0.0.1', 'accountSuccess', 'how-to-use', 'netlify-templates', 'mock.js'];
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  for (const needle of forbidden) {
    if (html.includes(needle)) fail(`forbidden string "${needle}" in ${path.relative(publicDir, file)}`);
  }
}
ok('no forbidden strings in built pages');

// ---------- 5) JSON-LD parses ----------
const jsonLd = /<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs;
let ldCount = 0;
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  for (const match of html.matchAll(jsonLd)) {
    ldCount++;
    try {
      JSON.parse(match[1]);
    } catch (e) {
      fail(`invalid JSON-LD in ${path.relative(publicDir, file)}: ${e.message}`);
    }
  }
}
ok(`JSON-LD blocks parsed: ${ldCount}`);
if (ldCount === 0) fail('no JSON-LD blocks found in any built page');

// ---------- 6) page-data for generated pages ----------
for (const slug of [...productSlugs.map((s) => `product/${s}`), ...journalSlugs.map((s) => `journal/${s}`)]) {
  const pd = path.join(publicDir, 'page-data', slug, 'page-data.json');
  if (!fs.existsSync(pd)) fail(`page-data missing for /${slug}`);
}
ok('page-data present for generated routes');

// ---------- report ----------
console.log('\n✓ passes:');
for (const p of passes) console.log('  +', p);
if (failures.length) {
  console.error('\n✗ FAILURES:');
  for (const f of failures) console.error('  -', f);
  process.exit(1);
}
console.log('\nBuild verification passed.');
