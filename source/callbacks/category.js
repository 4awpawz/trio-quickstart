module.exports = ($, frag, siteMetaData) => {
    // category under title
    $("div.category").append(frag.forCategory);
    // articles list
    const cat = siteMetaData.sortedCategoryCatalog.filter(item =>
        item.category === frag.forCategory);
    cat[0].related.forEach(item => {
        $("ul.blog__articles")
            .append(`<li><a data-trio-link href="${item.url}">${item.title}</a></li>`)
    });
    // categories list
    const $target = $("ul.blog__tags-list");
    siteMetaData.sortedCategoryCatalog
        .forEach(item => {
            const fixedCategory = item.category.replace(" ", "");
            $target.append(`<li class="blog__tags-list-item"><a data-trio-link href="/${siteMetaData.userConfig.blogFolderName}/${fixedCategory}">${item.category}</a></li>`);
        });
};