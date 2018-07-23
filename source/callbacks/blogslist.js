const { join, normalize } = require("path");

module.exports = ($, frag, siteMetaData) => {
    siteMetaData.articlesCatalog.forEach(article => $("ul.articles")
        .append(`<li><a data-trio-link href="${article.url}">${article.title}</a></li>`));
};