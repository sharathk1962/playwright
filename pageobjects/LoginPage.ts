import { Page,Locator } from '@playwright/test';

export class LoginPage {
    page: Page;
    usernameInput: Locator;
    passwordInput: Locator;
    loginButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('input[placeholder="Enter your active Email ID / Username"]');
        this.passwordInput = page.locator('input[type="password"]');
        this.loginButton = page.locator('button[type="submit"]');
    }
}