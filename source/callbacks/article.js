const { sep } = require("path");

const fillTagsList = ($target, data, blogFolderName) => {
    data.sort()
        .forEach(item => {
            const fixedCategory = item.replace(" ", "");
            $target.append(`<li class="article__tags-list-item"><a class="article__link article__link--small "data-trio-link href="${sep}${blogFolderName}${sep}${fixedCategory}">${item}<${sep}a><${sep}li>`);
        });
};

module.exports = ($, frag, siteMetadata) => {
    $("h1.article__title").append(frag.title);
    $("div.article__date").append(frag.articleDate);
    $("div.breadcrumbs").append(`<a data-trio-link href="${frag.blogPageUrl}">${frag.blogPageUrl}<${sep}a>`);
    if (frag.matter.data.image) {
        console.log(frag.matter.data.image);
        $("img.article__image").attr("src", `${sep}media${sep}${frag.matter.data.image}`);
    }
    if (frag.matter.data.subtitle) {
        $("div.article__subtitle").append(frag.matter.data.subtitle);
    } else {
        $("div.article__subtitle").css("visibility", "hidden");
    }
    // related articles list
    const relatedArticlesSet = new Set();
    frag.relatedArticlesByCategory.forEach(item =>
        item.related.forEach(related =>
            relatedArticlesSet.add(`${related.url}\n${related.title}\n${related.excerpt}`)));
    const $relatedArticlesList = $("ul.article__related-articles-list");
    Array.from(relatedArticlesSet)
        .map(item => {
            const parts = item.split("\n");
            return {
                url: parts[0],
                title: parts[1],
                excerpt: parts[2]
            }
        })
        .sort((a, b) => a.title.localeCompare(b.title))
        .forEach(item => {
            $relatedArticlesList
                .append(`<li class="article__related-articles-list-item"><a class="article__link article__link--small" data-trio-link href="${item.url}">${item.title}<br>${item.excerpt}<${sep}a>`);
        });
    // categories lists
    const $articleTagList = $("div.article__tags").find("ul.article__tags-list");
    fillTagsList($articleTagList, frag.category, siteMetadata.userConfig.blogFolderName);
    const $allTagsList = $("div.article__all-tags").find("ul.article__tags-list");
    fillTagsList($allTagsList, siteMetadata.sortedCategoryCatalog.map(item => item.category), siteMetadata.userConfig.blogFolderName);
};