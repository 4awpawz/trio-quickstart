module.exports = ($, frag, siteMetaData) => {
    $("#trio-blog-link").attr("href", `/${siteMetaData.userConfig.blogFolderName}`);
};