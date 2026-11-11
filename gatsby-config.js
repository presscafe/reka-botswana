module.exports = {
  siteMetadata: {
    title: `Reka Botswana`,
    description:
      'Reka Botswana — the home of verified Made-in-Botswana quality. Shop clothing, food, beauty and craft made by Botswana makers, or list your own workshop and reach customers across the country.',
    siteUrl: `https://rekabotswana.co.bw`,
    author: `Reka Botswana`,
  },
  plugins: [
    // PWA delivery: hand-audited service worker in /static/sw.js (registered
    // in production only from components/Layout), manifest in
    // /static/site.webmanifest. Workbox-based plugins were avoided to keep
    // the dependency tree minimal and deterministic.
  ],
};
