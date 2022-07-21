class Tabs {
    #navEl;
    #contentEl;
    #activeTabIndex;

    static CLASS_BTN = 'btn';
    static CLASS_CONTENT = 'content';
    static CLASS_ACTIVE_BTN = 'btn-active';
    static CLASS_ACTIVE_ITEM = 'item-active';

    constructor (rootEl) {
        const ACTIVE_TAB_DEFAULT = 0;
        const [navEL, contentEl] = rootEl.children;

        this.#navEl = navEL;
        this.#contentEl = contentEl;

        this.bindStyles();
        this.bindEvents();
        this.setActiveTab(ACTIVE_TAB_DEFAULT);
    }

    bindStyles() {
        for(const navItem of this.#navEl.children){
            navItem.classList.add(Tabs.CLASS_BTN);
        }

        for(const contentItem of this.#contentEl.children){
            contentItem.classList.add(Tabs.CLASS_CONTENT);
        }
    }

    bindEvents() {
        this.#navEl.addEventListener('click', (e) => this.onNavElClick(e));
    }

    onNavElClick(e) {
        if(e.target.classList.contains(Tabs.CLASS_BTN)){
            const newActiveTab = this.getNavItemIndex(e.target);

            this.hideActiveTab();
            this.setActiveTab(newActiveTab);
        }
    }

    setActiveTab(index) {
        const [navItemEl, contentItemEl] = this.getTabItemByIndex(index);

        navItemEl.classList.add(Tabs.CLASS_ACTIVE_BTN);
        contentItemEl.classList.add(Tabs.CLASS_ACTIVE_ITEM);

        this.#activeTabIndex = index;
    }

    hideActiveTab() {
        const [navItemEl, contentItemEl] = this.getTabItemByIndex(this.#activeTabIndex);

        navItemEl.classList.remove(Tabs.CLASS_ACTIVE_BTN);
        contentItemEl.classList.remove(Tabs.CLASS_ACTIVE_ITEM);
    }

    getTabItemByIndex(index) {
        return [this.#navEl.children[index], this.#contentEl.children[index]];
    }

    getNavItemIndex(el) {
        const navItemEl = el.closest('.' + Tabs.CLASS_BTN);

        for(let i = 0; i < this.#navEl.children.length; i++) {
            const currentNavItemEl = this.#navEl.children[i];
            if (currentNavItemEl === navItemEl){
                return i;
            }
        }
    }
}

export default Tabs;