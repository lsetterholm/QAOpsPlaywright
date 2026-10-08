const {test, expect, request} = require('@playwright/test');


test('Security test request intercept', async({page})=>
{
    const productName = 'ZARA COAT 3'
    const email = "oktoberfestolv@gmail.com"
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    console.log(await page.title())
    await expect(page).toHaveTitle("Let's Shop");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Qwerty1!");
    await page.locator("#login").click();
    //await expect(page.locator(".card-body b").first()).toBeVisible();
    //await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    route=>route.continue({url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765b6"}))
    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
})