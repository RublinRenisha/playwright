const {test,expect} = require ('@playwright/test');
test('user login',async({page})=> {
    await page.goto('https://dev.gearloop.com/');
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.locator('#contact').last().fill('rat960222104@gmail.com');
    await page.locator('button:has-text("Sign In")').last().click();
    await page.pause();
    await page.waitForTimeout(2000);
    await page.locator('button:has-text("Verify")').last().click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/renter-dashboard/);
})
test('user signup',async({page})=>{
    await page.goto('https://dev.gearloop.com/');
    await page.waitForLoadState('networkidle');
    await page.getByRole('button',{name:'Sign up'}).click()
    await page.locator('#contact').last().fill('fenawe7471@lidugw.com');
    await page.locator('button:has-text("Join Gear Loop")').last().click();
    await page.locator('#email-opt-in').check();
    await page.locator('#terms-checkbox').check()
    await page.getByRole('button',{name:'Agree & continue'}).click();
    await page.pause();
    await page.waitForTimeout(2000);
    await page.locator('button:has-text("Verify")').last().click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/renter-dashboard/)

})