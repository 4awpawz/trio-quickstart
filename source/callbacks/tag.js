module.exports = ({ $, frag, siteMetadata }) => {
    // tag under title
    $("div.tag").append(frag.matter.data.forTag);
    // articles list
    const cat = siteMetadata.sortedTagCatalog.find(item =>
        item.tag === frag.matter.data.forTag);
    cat.related.forEach(item => {
        $("ul.blog__articles").append(`
            <li>
                <a data-trio-link href="${item.url}">${item.title}</a>
            </li>
        `);
    });
    // tags list
    const $target = $("ul.blog__tags-list");
    siteMetadata.sortedTagCatalog
        .forEach(item => {
            $target.append(`
                <li class="blog__tags-list-item">
                    <a data-trio-link href="/${siteMetadata.userConfig.blogFolderName}/tag/${item.tag}">${item.tag}</a>
                </li>
            `);
        });
};