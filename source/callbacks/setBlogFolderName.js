module.exports = ({ $, site }) => {
    $("#trio-blog-link").attr("href", `/${site.userConfig.blogFolderName}`);
};