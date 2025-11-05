import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../pageobjects/loginpage';
import { HomePage } from '../pageobjects/HomePage';
import * as dotenv from 'dotenv';

const data = JSON.parse(JSON.stringify(require("../utils/testdata.json")));
// Load .env variables
dotenv.config();
const username = process.env.USERNAMETOLOGIN as string;
const password = process.env.PASSWORD as string;

if (!password || !username) {
    throw new Error("❌ Missing username/Password. Please set it in .env file.");
}
test.describe.serial('Naukri Flow', () => {
    let page: Page;
    //Json->string->js object
    test('Login to Naukri @cv @search', async ({ browser }) => {
        page = await browser.newPage();
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        await page.goto(data.urlCred.url);
        await page.locator('a#login_Layer').click();
        // Fill in the username and password fields from json file
        // await loginPage.usernameInput.fill(data.urlCred.username);
        // await loginPage.passwordInput.fill(data.urlCred.password);
        await loginPage.usernameInput.fill(username);
        await loginPage.passwordInput.fill(password);
                        await page.screenshot({ path: 'cred entered.png', fullPage: true });

        await loginPage.loginButton.first().click();

        // Verify successful login
        await page.screenshot({ path: 'after-login.png', fullPage: true });

        await expect(homePage.viewProfile).toBeVisible();
        await page.screenshot({ path: 'after-login1.png', fullPage: true });

        await expect(homePage.loggedInUser).toHaveText(data.testData.loggedinUserProfileName);
    });


    // Attach CV
    test('Attach CV @cv', async ({ }) => {
        const homePage = new HomePage(page);
        await homePage.viewProfile.click();
        await page.locator('#attachCV').waitFor();
        await page.locator('#attachCV').setInputFiles(data.testData.resumePath);
        await expect(page.locator('.msg')).toHaveText('Resume has been successfully uploaded.');
    });

    // Search Jobs
    test('Search Jobs @search', async ({ }) => {
        const homePage = new HomePage(page);
        await homePage.searchInput.waitFor();
        await homePage.searchInput.click();
        // await homePage.searchTextInput.fill('Automation Java Selenium');
        await page.getByPlaceholder("Enter keyword / designation / companies").fill(data.testData.jobSearchKey);
        await page.getByPlaceholder("Select experience").click();
        await homePage.searchInputExp.click();
        await homePage.searchButton.click();
        await expect(page).toHaveTitle(new RegExp(data.testData.jobSearchKey + ' Jobs'));
    });

    // test('Filter jobs and apply to all Jobs', async ({ }) => {

    // });
});
