// Intentionally minimal stub. gatsby-plugin-utils loads gatsby-sharp at require
// time via dist/polyfill-remote-file/graphql/gatsby-image-resolver.js, but only
// *calls* it when transforming images from remote files — which this site never
// uses. Empty exports satisfy module load; any real call fails with a plain
// "not a function" TypeError, which is acceptable for a code path we do not run.
module.exports = {};
