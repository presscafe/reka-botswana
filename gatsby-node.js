// https://stackoverflow.com/questions/63124432/how-do-i-configure-mini-css-extract-plugin-in-gatsby
exports.onCreateWebpackConfig = (helper) => {
  const { stage, actions, getConfig } = helper;
  if (stage === 'develop' || stage === 'build-javascript') {
    const config = getConfig();
    const miniCssExtractPlugin = config.plugins.find(
      (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin'
    );
    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true;
    }
    actions.replaceWebpackConfig(config);
  }
};

// Create one page per product and per journal article from build-time data.
const path = require('path');
const products = require('./src/helpers/product.json');
const journal = require('./src/helpers/blog.json');

exports.createPages = ({ actions }) => {
  const { createPage } = actions;

  products.forEach((product) => {
    createPage({
      path: `/product/${product.slug}`,
      component: path.resolve('./src/templates/product.js'),
      context: { slug: product.slug },
    });
  });

  journal.forEach((article) => {
    createPage({
      path: `/journal/${article.slug}`,
      component: path.resolve('./src/templates/journalArticle.js'),
      context: { slug: article.slug },
    });
  });
};
