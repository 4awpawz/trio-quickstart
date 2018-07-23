const { join, normalize } = require("path");

module.exports = ($, frag, siteMetaData) => {
    let parts = frag.url.split("/");
    let n = parts.length > 2 ? parseInt(parts[parts.length - 1]) - 1 : 0;
    let i = siteMetaData.paginate * n;

    // generate list of articles for this blog page
    siteMetaData.articlesCatalog
        .slice(i, i + siteMetaData.paginate)
        .forEach(article =>
            $("ul.articles")
                .append(`<li><a data-trio-link href="${article.url}">${article.title}</a></li>`)
        );

    // generate the next anchor tag
    // $("a.next-blog-page").
    // if(i + )
};