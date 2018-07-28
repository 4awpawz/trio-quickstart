const { sep } = require("path");

module.exports = ($, frag, siteMetaData) => {
    // category under title
    $("div.category").append(frag.forCategory);
    // articles list
    const cat = siteMetaData.categoryCatalog.filter(item =>
        item.category === frag.forCategory);
    cat[0].related.forEach(item => {
        $("ul.blog__articles")
            .append(`<li><a data-trio-link href="${item.url}">${item.title}</a></li>`)
    });
    // categories list
    const $target = $("ul.blog__tags-list");
    siteMetaData.categoryCatalog
        .sort((a, b) => a.category.localeCompare(b.category))
        .forEach(item => {
            const fixedCategory = item.category.replace(" ", "");
            $target.append(`<li class="blog__tags-list-item"><a data-trio-link href="${sep}blog${sep}${fixedCategory}">${item.category}</a></li>`);
        });
};