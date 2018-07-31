const { sep } = require("path");

module.exports = ($, frag, siteMetaData) => {
    // articles list
    frag.articles
        .forEach(article =>
            $("ul.blog__articles")
                .append(`<li><a data-trio-link href="${article.url}">${article.title}</a></li>`)
        );
    // blog page links
    const $prevAnchorTag = $("a.prev-page");
    const $nextAnchorTag = $("a.next-page");
    if (frag.prevPageUrl) {
        $prevAnchorTag.attr("href", frag.prevPageUrl);
    } else {
        $prevAnchorTag.addClass("prev-page--hidden")
    }
    if (frag.nextPageUrl) {
        $nextAnchorTag.attr("href", frag.nextPageUrl);
    } else {
        $nextAnchorTag.addClass("next-page--hidden")
    }
    // categories list
    const $target = $("ul.blog__tags-list");
    siteMetaData.categoryCatalog
        .sort((a, b) => a.category.localeCompare(b.category))
        .forEach(item => {
            const fixedCategory = item.category.replace(" ", "");
            $target.append(`<li class="blog__tags-list-item"><a data-trio-link href="${sep}blog${sep}${fixedCategory}">${item.category}</a></li>`);
        });
};