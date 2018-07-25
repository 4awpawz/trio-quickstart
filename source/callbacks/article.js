module.exports = ($, frag, frags) => {
    $("h1").append(frag.title);
    $("div.breadcrumbs").append(`<a href="${frag.blogPageUrl}">${frag.blogPageUrl}</a>`);
}