const { sep } = require("path");

module.exports = ($, frag, siteMetaData) => {
    $("h1.article__title").append(frag.title);
    $("div.article__date").append(frag.articleDate);
    $("div.breadcrumbs").append(`<a data-trio-link href="${frag.blogPageUrl}">${frag.blogPageUrl}</a>`);
    if (frag.matter.data.image) {
        $("img.article__image").attr("src", `/media/html_css_js.png`);
    }
    if (frag.matter.data.subtitle) {
        $("div.article__subtitle").append(frag.matter.data.subtitle);
    } else {
        $("div.article__subtitle").css("visibility", "hidden");
    }
    // categories list
    const $target = $("ul.article__tags-list");
    siteMetaData.categoryCatalog
        .sort((a, b) => a.category.localeCompare(b.category))
        .forEach(item => {
            const fixedCategory = item.category.replace(" ", "");
            $target.append(`<li class="article__tags-list-item"><a data-trio-link href="${sep}blog${sep}${fixedCategory}">${item.category}</a></li>`);
        });
};