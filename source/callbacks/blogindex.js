const createArticleMediaObject = (article, cheerio) => {
    const $mediaObj = cheerio.load(`<li id="article-${article.id}"><a data-trio-link href="${article.url}"><article class="article-media-object"></article></a></li>`);
    const $item = $mediaObj("article");
    $item.append(`<img data-trio-link class="article-media-object__image" src="/media/${article.image}" alt="article image">`);
    $item.append("<div class=\"article-media-object__details\"></div>");
    const $details = $mediaObj("div.article-media-object__details");
    $details.append(`<h2 class="article-media-object__details-title">${article.title}</h2>`);
    $details.append(`<div class="article-media-object__details-subtitle">${article.subtitle}</div>`);
    $details.append(`<div class="article-media-object__details-date">${article.articleDate}</div>`);
    $details.append(`<p class="article-media-object__excerpt">${article.excerpt}</p>`);
    return $mediaObj;
};

module.exports = ({ $, frag, siteMetadata, cheerio }) => {
    const page = parseInt(frag.page, 10);
    const paginate = parseInt(siteMetadata.userConfig.paginate, 10);
    const totPages = (parseInt(siteMetadata.articlesCount / paginate, 10)) +
        (siteMetadata.articlesCount % paginate ? 1 : 0);

    // articles list
    if (siteMetadata.articlesCount) {
        const iStart = paginate * (page - 1);
        const iEnd = iStart + paginate;
        const articles = siteMetadata.articlesCatalog.slice(iStart, iEnd);
        articles.forEach(article =>
            $("ul.blog__articles").append(createArticleMediaObject(article, cheerio).html())
        );
    }

    // blog page links
    const $newerAnchorTag = $("a.page-links__newer-link");
    const $olderAnchorTag = $("a.page-links__older-link");
    if (page > 1) {
        const newerPage = page - 1 === 1
            ? `/${siteMetadata.userConfig.blogFolderName}`
            : `/${siteMetadata.userConfig.blogFolderName}/${page - 1}`;
        $newerAnchorTag.attr("href", newerPage);
    } else {
        $newerAnchorTag.addClass("page-links__newer-link--hidden");
    }
    if (page < totPages) {
        $olderAnchorTag.attr("href", `/${siteMetadata.userConfig.blogFolderName}/${page + 1}`);
    } else {
        $olderAnchorTag.addClass("page-links__older-link--hidden");
    }

    // tags list
    const $target = $("ul.blog__tags-list");
    siteMetadata.sortedTagCatalog
        .forEach(item => {
            const fixedTag = item.tag.replace(" ", "");
            $target.append(`<li class="blog__tags-list-item"><a data-trio-link href="/${siteMetadata.userConfig.blogFolderName}/tag/${fixedTag}">${item.tag}</a></li>`);
        });
};