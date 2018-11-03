const fillTagsList = ($target, data, blogFolderName) => {
    data.sort().forEach(item => {
        const fixedTag = item.replace(" ", "");
        $target.append(/* html */`
            <li class="article__tags-list-item">
                <a class="article__link" data-trio-link href="/${blogFolderName}/tag/${fixedTag}">${item}</a>
            </li>
        `);
    });
};

module.exports = ({ $, page, site }) => {
    const { data } = page.matter;
    $("h1.article__title").append(data.title);
    $("div.article__date").append(page.articleDate);
    if (data.image) {
        $("img.banner__image").attr("src", `/media/${data.image}`);
    }
    if (data.subtitle) {
        $("div.article__subtitle").append(data.subtitle);
    } else {
        $("div.article__subtitle").css("visibility", "hidden");
    }

    // related articles list
    const $relatedArticlesList = $("ul.article__related-articles-list");
    page.relatedArticlesByTagFlattened.forEach(item => {
        const relatedArticle = site.articlesCatalog.find(rel => item.id === rel.id);
        $relatedArticlesList.append(/* html */`
            <li class="article__related-articles-list-item">
                <a class="article__link" data-trio-link href="${item.url}">
                    <div class="article__related-article-title">${item.title}</div>
                    <div class="article__related-article-subtitle">${relatedArticle.matter.data.subtitle}</div>
                    <div class="article__related-article-date">${item.articleDate}</div>
                    <p class="article__related-article-excerpt">${item.excerpt}</p>
                </a>
            </li>
        `);
    });

    // tags lists
    const $articleTagList = $("section.article__tags").find("ul.article__tags-list");
    fillTagsList($articleTagList, data.tag, site.userConfig.blogFolderName);
    const $allTagsList = $("section.article__all-tags").find("ul.article__tags-list");
    fillTagsList($allTagsList, site.sortedTagCatalog.map(item => item.tag), site.userConfig.blogFolderName);

    // previous & next article links
    const $nextLink = $("a.page-links__newer-link");
    const $prevLink = $("a.page-links__older-link");
    if (page.nextArticleUrl) {
        $nextLink.attr("href", page.nextArticleUrl);
    } else {
        $nextLink.addClass("page-links__newer-link--hidden");
    }
    if (page.previousArticleUrl) {
        $prevLink.attr("href", page.previousArticleUrl);
    } else {
        $prevLink.addClass("page-links__older-link--hidden");
    }
};