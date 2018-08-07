module.exports = ($, frag, siteMetaData) => {
    const blogFolderName = frag.matter.data.blogFolderName;
    $("#trio-blog-link").attr("href", `/${frag.matter.data.blogFolderName}`);
};