module.exports = ($, frag, siteMetaData) => {
    // tag under title
    $("div.tag").append(frag.forTag);
    // articles list
    const cat = siteMetaData.sortedTagCatalog.filter(item =>
        item.tag === frag.forTag);
    cat[0].related.forEach(item => {
        $("ul.blog__articles")
            .append(`<li><a data-trio-link href="${item.url}">${item.title}</a></li>`)
    });
    // tags list
    const $target = $("ul.blog__tags-list");
    siteMetaData.sortedTagCatalog
        .forEach(item => {
            const fixedTag = item.tag.replace(" ", "");
            $target.append(`<li class="blog__tags-list-item"><a data-trio-link href="/${siteMetaData.userConfig.blogFolderName}/${fixedTag}">${item.tag}</a></li>`);
        });
};