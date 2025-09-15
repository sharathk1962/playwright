import { Page, Locator } from '@playwright/test';
//Json->string->js object
const data = JSON.parse(JSON.stringify(require("../utils/testdata.json")));
export class HomePage {
    page: Page;
    searchInput: Locator;
    searchButton: Locator;
    viewProfile: Locator;
    loggedInUser: Locator;
        searchTextInput: Locator;
        searchInputExp: Locator;


    constructor(page: Page) {
        this.page = page;
        this.viewProfile = page.locator('div[class="view-profile-wrapper"] a');
        this.loggedInUser = page.locator('div[title="Sharath Kumar"]');
        this.searchInput = page.locator('.nI-gNb-sb__placeholder');
        this.searchButton = page.locator('.ni-gnb-icn.ni-gnb-icn-search');
        this.searchTextInput = page.locator('input[placeholder="Enter keyword / designation / companies"]');
        this.searchInputExp = page.locator(`ul[class='dropdown '] li[title='${data.testData.experience}']`);


    }
}

