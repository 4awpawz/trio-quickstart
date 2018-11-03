module.exports = ({ $, page, site }) => {
    // tag under title
    $("div.tag").append(page.matter.data.forTag);
    // articles list
    const cat = site.sortedTagCatalog.find(item =>
        item.tag === page.matter.data.forTag);
    cat.related.forEach(item => {
        $("ul.blog__articles").append(/* html */`
            <li>
                <a data-trio-link href="${item.url}">${item.title}</a>
            </li>
        `);
    });
    // tags list
    const $target = $("ul.blog__tags-list");
    site.sortedTagCatalog
        .forEach(item => {
            $target.append(/* html */`
                <li class="blog__tags-list-item">
                    <a data-trio-link href="/${site.userConfig.blogFolderName}/tag/${item.tag}">${item.tag}</a>
                </li>
            `);
        });
};