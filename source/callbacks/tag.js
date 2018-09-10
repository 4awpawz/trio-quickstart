module.exports = ($, frag, siteMetaData) => {
    // tag under title
    $("div.tag").append(frag.forTag);
    // articles list
    const cat = siteMetaData.sortedTagCatalog.find(item =>
        item.tag === frag.forTag);
    cat.related.forEach(item => {
        $("ul.blog__articles")
            .append(`<li><a data-trio-link href="${item.url}">${item.title}</a></li>`)
    });
    // tags list
    const $target = $("ul.blog__tags-list");
    siteMetaData.sortedTagCatalog
        .forEach(item => {
            $target.append(`<li class="blog__tags-list-item"><a data-trio-link href="/${siteMetaData.userConfig.blogFolderName}/tag/${item.tag}">${item.tag}</a></li>`);
        });
};