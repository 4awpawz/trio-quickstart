const { sep } = require("path");

const fillTagsList = ($target, data, blogFolderName) => {
    data.sort()
        .forEach(item => {
            const fixedTag = item.replace(" ", "");
            $target.append(`<li class="article__tags-list-item"><a class="article__link article__link--small "data-trio-link href="${sep}${blogFolderName}${sep}tag${sep}${fixedTag}">${item}<${sep}a><${sep}li>`);
        });
};

module.exports = ($, frag, siteMetadata) => {
    $("h1.article__title").append(frag.title);
    $("div.article__date").append(frag.articleDate);
    if (frag.matter.data.image) {
        $("img.banner__image").attr("src", `${sep}media${sep}${frag.matter.data.image}`);
    }
    if (frag.matter.data.subtitle) {
        $("div.article__subtitle").append(frag.matter.data.subtitle);
    } else {
        $("div.article__subtitle").css("visibility", "hidden");
    }

    // related articles list
    const $relatedArticlesList = $("ul.article__related-articles-list");
    frag.relatedArticlesByTagFlattened.forEach(item =>
        $relatedArticlesList
            .append(`<li class="article__related-articles-list-item"><a class="article__link article__link--small" data-trio-link href="${item.url}">${item.title}<br>${item.excerpt}</a></li>`)
    );

    // tags lists
    const $articleTagList = $("div.article__tags").find("ul.article__tags-list");
    fillTagsList($articleTagList, frag.tag, siteMetadata.userConfig.blogFolderName);
    const $allTagsList = $("div.article__all-tags").find("ul.article__tags-list");
    fillTagsList($allTagsList, siteMetadata.sortedTagCatalog.map(item => item.tag), siteMetadata.userConfig.blogFolderName);

    // previous & next article links
    const $prevLink  = $("a.article__previous-link");
    const $nextLink  = $("a.article__next-link");
    if (frag.prevArticleUrl) {
        $prevLink.attr("href", frag.prevArticleUrl);
    } else {
        $prevLink.css("visibility", "hidden");
    }
    if (frag.nextArticleUrl) {
        $nextLink.attr("href", frag.nextArticleUrl);
    } else {
        $nextLink.css("visibility", "hidden");
    }
};