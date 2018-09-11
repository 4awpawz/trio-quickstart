module.exports = ($, frag) => {
    const activeHeaderItem = frag.activeHeaderItem;
    if (!activeHeaderItem) {
        throw new Error("Error: \"activeHeaderItem\" property not found in fragment");
    }
    $(`li.header__nav-item:nth-child(${activeHeaderItem})`).addClass("header__nav-item--active");
};