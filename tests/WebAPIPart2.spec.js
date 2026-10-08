const {test, expect} = require('@playwright/test');
let webContext;

test.beforeAll(async({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    await page.locator("#userEmail").fill("oktoberfestolv@gmail.com");
    await page.locator("#userPassword").fill("Qwerty1!");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    //stores cookies/ tokens to storage state.json
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState:'state.json'})
})

test('Client App Playwright test', async ()=>
{
    const productName = 'ZARA COAT 3'
    const email = "oktoberfestolv@gmail.com"
    const page = await webContext.newPage();
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    
    //await expect(page.locator(".card-body b").first()).toBeVisible();
    //await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents()
    console.log(titles);
    const count = await products.count();
    for(let i = 0;i<count; ++i)
    {
       if(await products.nth(i).locator("b").textContent() === productName)
       {
        await products.nth(i).locator("text= Add To Cart").click();
        break;
       }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();

    await page.locator("[value = '4542 9931 9292 2293']").fill("1234123412311234");
    await page.locator(".input.ddl").first().selectOption({label: '03'});
    await page.locator(".input.ddl").last().selectOption({label: '20'});
    await page.locator("input[name='coupon']").fill("rahulshettyacademy");
    //await page.locator("button[type='submit']").click();
    //expect(await page.locator(".mt-1.ng-star-inserted")).toHaveText("* Coupon Applied");
    
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionCount = await dropdown.locator("button").count();
    for(let i=0; i<optionCount; ++i)
    {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text.trim() === "India")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const order = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(order.split(" ")[2])

    await page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']").click();
    const row = await page.locator("tbody tr");
    await row.first().waitFor();
    //const orderCount = await row.count();
    for(let i=0;i<await row.count();++i)
    {
        const text = await row.locator("th").nth(i).textContent();
        if(order.includes(text))
        {
            await row.locator(".btn.btn-primary").nth(i).click();
            break;
        }
    }
    
    const orderDetail = await page.locator(".col-text.-main").textContent();
    expect(order.includes(orderDetail)).toBeTruthy();
    //await page.pause();

});