import { Page,Locator } from '@playwright/test';

export class SearchPage {
    page: Page;
    searchPageTitle: Locator;
    passwordInput: Locator;
    loginButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.searchPageTitle = page.locator('input[placeholder="Enter your active Email ID / Username"]');
        this.passwordInput = page.locator('input[type="password"]');
        this.loginButton = page.locator('button[type="submit"]');
    }
}