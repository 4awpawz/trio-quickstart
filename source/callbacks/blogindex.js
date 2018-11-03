const createArticleMediaObject = (article, cheerio) => {
    const { data } = article.matter;
    const $mediaObj = cheerio.load(/* html */`
        <li id="article-${article.id}">
            <a data-trio-link href="${article.url}">
                <article class="article-media-object">
                    <img data-trio-link class="article-media-object__image" src="/media/${data.image}" alt="article image">
                    <div class="article-media-object__details">
                        <h2 class="article-media-object__details-title">${data.title}</h2>
                        <div class="article-media-object__details-subtitle">${data.subtitle}</div>
                        <div class="article-media-object__details-date">${article.articleDate}</div>
                        <p class="article-media-object__excerpt">${article.matter.excerpt}</p>
                    </div>
                </article>
            </a>
        </li>
    `);
    return $mediaObj;
};

module.exports = ({ $, page, site, cheerio }) => {
    const { data } = page.matter;
    const blogIndexPage = parseInt(data.page, 10);
    const paginate = parseInt(site.userConfig.paginate, 10);
    const totPages = (parseInt(site.articlesCount / paginate, 10)) +
        (site.articlesCount % paginate ? 1 : 0);

    // articles list
    if (site.articlesCount) {
        const iStart = paginate * (blogIndexPage - 1);
        const iEnd = iStart + paginate;
        const articles = site.articlesCatalog.slice(iStart, iEnd);
        articles.forEach(article =>
            $("ul.blog__articles").append(createArticleMediaObject(article, cheerio).html())
        );
    }

    // blog page links
    const $newerAnchorTag = $("a.page-links__newer-link");
    const $olderAnchorTag = $("a.page-links__older-link");
    if (blogIndexPage > 1) {
        const newerPage = blogIndexPage - 1 === 1
            ? `/${site.userConfig.blogFolderName}`
            : `/${site.userConfig.blogFolderName}/${blogIndexPage - 1}`;
        $newerAnchorTag.attr("href", newerPage);
    } else {
        $newerAnchorTag.addClass("page-links__newer-link--hidden");
    }
    if (blogIndexPage < totPages) {
        $olderAnchorTag.attr("href", `/${site.userConfig.blogFolderName}/${blogIndexPage + 1}`);
    } else {
        $olderAnchorTag.addClass("page-links__older-link--hidden");
    }

    // tags list
    const $target = $("ul.blog__tags-list");
    site.sortedTagCatalog.forEach(item => {
        const fixedTag = item.tag.replace(" ", "");
        $target.append(/* html */`
            <li class="blog__tags-list-item">
                <a data-trio-link href="/${site.userConfig.blogFolderName}/tag/${fixedTag}">${item.tag}</a>
            </li>
        `);
    });
};