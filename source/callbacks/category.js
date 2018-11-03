module.exports = ({ $, page, site }) => {
    const fmtCategory = page.matter.data.forCategory.join("/");
    // category under title
    $("div.category").append(fmtCategory);
    // articles list
    const cat = site.categoriesCatalog.find(item => {
        return item.category === fmtCategory;
    });
    cat.related.forEach(item => {
        $("ul.blog__articles").append(/* html */`
            <li>
                <a data-trio-link href="${item.url}">${item.title}</a>
            </li>
        `);
    });
    // categories list
    const $target = $("ul.blog__categories-list");
    site.categoriesCatalog
        .forEach(item => {
            $target.append(/* html */`
                <li class="blog__categories-list-item">
                    <a data-trio-link href="/${site.userConfig.blogFolderName}/category/${item.category}">${item.category}</a>
                </li>
            `);
        });
};
