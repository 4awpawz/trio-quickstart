module.exports = ({ $, siteMetadata }) => {
    $("#trio-blog-link").attr("href", `/${siteMetadata.userConfig.blogFolderName}`);
};