const {test, expect} = require('@playwright/test');

test('Other Client App Playwright test', async ({page})=>
{
    const productName = 'ZARA COAT 3'
    const email = "oktoberfestolv@gmail.com"
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    console.log(await page.title())
    await expect(page).toHaveTitle("Let's Shop");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Qwerty1!");
    await page.getByRole("button", {name:"Login"}).click();
    //await expect(page.locator(".card-body b").first()).toBeVisible();
    //await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    
    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button", {name:"Add to Cart"}).click();
    await page.getByRole("listitem").getByRole('button', {name:"Cart"}).click();


    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
    
    await page.getByRole("button",{name:"Checkout"}).click();

    await page.locator("[value = '4542 9931 9292 2293']").fill("1234123412311234");
    await page.locator(".input.ddl").first().selectOption({label: '03'});
    await page.locator(".input.ddl").last().selectOption({label: '20'});
    await page.locator("input[name='coupon']").fill("rahulshettyacademy");
    //await page.locator("button[type='submit']").click();
    //expect(await page.locator(".mt-1.ng-star-inserted")).toHaveText("* Coupon Applied");
    
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    await page.getByRole("button", {name:"India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
    const order = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    await page.getByRole('button', {name:"ORDERS"}).click();
    

    await page.locator('tr').filter({hasText:order.split(" ")[2]}).getByRole('button', {name:"View"}).click();
    const orderNum = await page.locator('.col-text.-main').textContent();
    expect(order.includes(orderNum)).toBeTruthy();
    
});