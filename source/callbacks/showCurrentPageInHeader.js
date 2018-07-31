const showCurrentPageInHeader = ($, frag) => {
    const activeHeaderItem = frag.matter.data.activeHeaderItem;
    // if (!activeHeaderItem) {
    //     throw new Error("All pages requre the \"activeHeaderItem\" property defined in its fragment's front-matter");
    // }
    if (activeHeaderItem) {
        $(`li.header__nav-item:nth-child(${activeHeaderItem})`).addClass("header__nav-item--active");
    }
};

module.exports = showCurrentPageInHeader;