module.exports = ($, frag, siteMetaData) => {
    const fmtCategory = frag.forCategory.join("/");
    // category under title
    $("div.category").append(fmtCategory);
    // articles list
    const cat = siteMetaData.categoriesCatalog.find(item => {
        return item.category === fmtCategory;
    });
    cat.related.forEach(item => {
        $("ul.blog__articles")
            .append(`<li><a data-trio-link href="${item.url}">${item.title}</a></li>`)
    });
    // categories list
    const $target = $("ul.blog__categories-list");
    siteMetaData.categoriesCatalog
        .forEach(item => {
            $target.append(`<li class="blog__categories-list-item"><a data-trio-link href="/${siteMetaData.userConfig.blogFolderName}/category/${item.category}">${item.category}</a></li>`);
        });
};
