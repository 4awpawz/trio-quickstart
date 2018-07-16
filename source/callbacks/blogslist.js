const { join, normalize } = require("path");

module.exports = ($, siteMetaData) => {
    const articles = siteMetaData.filter(md => md.destPath.startsWith(`${join("public", "blog", "articles")}`));
    console.log("article count", articles.length);

    articles.forEach(article => $("ul.articles")
        .append(`<li><a data-trio-link href="${article.url}">${article.title}</a></li>`));
};