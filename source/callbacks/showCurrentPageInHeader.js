module.exports = ({ $, page }) => {
    const activeHeaderItem = page.matter.data.activeHeaderItem;
    if (!activeHeaderItem) {
        throw new Error("Error: \"activeHeaderItem\" property not found in fragment");
    }
    $(`li.header__nav-item:nth-child(${activeHeaderItem})`)
        .addClass("header__nav-item--active");
};