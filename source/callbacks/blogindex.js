module.exports = ($, frag, siteMetaData) => {
    // articles list
    if (frag.articles) {
        frag.articles
            .forEach(article =>
                $("ul.blog__articles")
                    .append(`<li><a data-trio-link href="${article.url}">${article.title}</a></li>`)
            );
    }
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
    // tags list
    const $target = $("ul.blog__tags-list");
    siteMetaData.sortedTagCatalog
        .forEach(item => {
            const fixedTag = item.tag.replace(" ", "");
            $target.append(`<li class="blog__tags-list-item"><a data-trio-link href="/${siteMetaData.userConfig.blogFolderName}/${fixedTag}">${item.tag}</a></li>`);
        });
};