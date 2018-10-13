module.exports = ({ $, frag, siteMetadata }) => {
    const fmtCategory = frag.matter.data.forCategory.join("/");
    // category under title
    $("div.category").append(fmtCategory);
    // articles list
    const cat = siteMetadata.categoriesCatalog.find(item => {
        return item.category === fmtCategory;
    });
    cat.related.forEach(item => {
        $("ul.blog__articles").append(`
            <li>
                <a data-trio-link href="${item.url}">${item.title}</a>
            </li>
        `);
    });
    // categories list
    const $target = $("ul.blog__categories-list");
    siteMetadata.categoriesCatalog
        .forEach(item => {
            $target.append(`
                <li class="blog__categories-list-item">
                    <a data-trio-link href="/${siteMetadata.userConfig.blogFolderName}/category/${item.category}">${item.category}</a>
                </li>
            `);
        });
};
