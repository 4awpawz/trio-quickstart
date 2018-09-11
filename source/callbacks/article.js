const fillTagsList = ($target, data, blogFolderName) => {
    data.sort()
        .forEach(item => {
            const fixedTag = item.replace(" ", "");
            $target.append(`<li class="article__tags-list-item"><a class="article__link article__link "data-trio-link href="/${blogFolderName}/tag/${fixedTag}">${item}</a></li>`);
        });
};

module.exports = ($, frag, siteMetadata) => {
    $("h1.article__title").append(frag.title);
    $("div.article__date").append(frag.articleDate);
    if (frag.image) {
        $("img.banner__image").attr("src", `/media/${frag.image}`);
    }
    if (frag.subtitle) {
        $("div.article__subtitle").append(frag.subtitle);
    } else {
        $("div.article__subtitle").css("visibility", "hidden");
    }

    // related articles list
    const $relatedArticlesList = $("ul.article__related-articles-list");
    frag.relatedArticlesByTagFlattened.forEach(item => {
        const ra = siteMetadata.articlesCatalog.find(rel => item.id === rel.id);
        $relatedArticlesList
            .append(`<li class="article__related-articles-list-item"><a class="article__link article__link" data-trio-link href="${item.url}"><div class="article__related-article-title">${item.title}</div><div class="article__related-article-subtitle">${ra.subtitle}</div><div class="article__related-article-date">${item.date}</div><p class="article__related-article-excerpt">${item.excerpt}</p></a></li>`)
    });

    // tags lists
    const $articleTagList = $("div.article__tags").find("ul.article__tags-list");
    fillTagsList($articleTagList, frag.tag, siteMetadata.userConfig.blogFolderName);
    const $allTagsList = $("div.article__all-tags").find("ul.article__tags-list");
    fillTagsList($allTagsList, siteMetadata.sortedTagCatalog.map(item => item.tag), siteMetadata.userConfig.blogFolderName);

    // previous & next article links
    const $nextLink  = $("a.page-links__newer-link");
    const $prevLink  = $("a.page-links__older-link");
    if (frag.nextArticleUrl) {
        $nextLink.attr("href", frag.nextArticleUrl);
    } else {
        $nextLink.addClass("page-links__newer-link--hidden");
    }
    if (frag.previousArticleUrl) {
        $prevLink.attr("href", frag.previousArticleUrl);
    } else {
        $prevLink.addClass("page-links__older-link--hidden")
    }
};