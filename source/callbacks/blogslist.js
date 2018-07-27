const { join, normalize } = require("path");

module.exports = ($, frag, siteMetaData) => {
    frag.articles
        .forEach(article =>
            $("ul.blog__articles")
                .append(`<li><a data-trio-link href="${article.url}">${article.title}</a></li>`)
        );
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
    const $target = $("ul.blog__tags-list");
    const categories = siteMetaData.categoryCatalog
        .map(item => item.category)
        .sort();
    categories.forEach(item => $target.append(`<li class="blog__tags-list-item">${item}</li>`));
};