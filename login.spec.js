const { test, expect } = require('@playwright/test');

test.use({
    httpCredentials: {
        username: process.env.BASIC_AUTH_USER || 'tester',
        password: process.env.BASIC_AUTH_PASSWORD || 'Gearloop@123',
    }
});

test('user login', async ({ page }) => {
    await page.goto('https://dev.gearloop.com/', { waitUntil: 'domcontentloaded' });

    // Set the lastVisitedPath in localStorage to test redirect logic after login
    await page.evaluate(() => {
        localStorage.setItem('lastVisitedPath', '/lister-dashboard');
    });

    await page.getByRole('button', { name: 'Log in' }).click();
    await page.locator('#contact').last().fill('arunvincily@gmail.com');
    await page.locator('button:has-text("Sign In")').last().click();
    await page.pause();
    await page.waitForTimeout(2000);
    await page.locator('button:has-text("Verify")').last().click();
    await expect(page).toHaveURL(/lister-dashboard/);
})
test.skip('user signup', async ({ page }) => {
    await page.goto('https://dev.gearloop.com/');
    await page.getByRole('button', { name: 'Sign up' }).click()
    await page.locator('#contact').last().fill('fenawe7471@lidugw.com');
    await page.locator('button:has-text("Join Gear Loop")').last().click();
    await page.locator('#email-opt-in').check();
    await page.locator('#terms-checkbox').check()
    await page.getByRole('button', { name: 'Agree & continue' }).click();
    await page.pause();
    await page.waitForTimeout(2000);
    await page.locator('button:has-text("Verify")').last().click();
    await expect(page).toHaveURL(/renter-dashboard/)

})