const { join, normalize } = require("path");

module.exports = ($, frag, siteMetaData) => {
    frag.articles
        .forEach(article =>
            $("ul.articles")
                .append(`<li><a data-trio-link href="${article.url}">${article.title}</a></li>`)
        );
};