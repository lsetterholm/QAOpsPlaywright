const {test, expect} = require('@playwright/test');
test.describe.configure({mode:'parallel'}); // run all tests in file in parallel
//test.describe.configure({mode:'serial'}); //so basically if one test fails, all the next ones will (so if one test is dependent on others. like if login fails, no sense running nest ones)
test("Popup validations", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("https://google.com");
    //await page.goBack();
    //await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden(); 

    page.on("dialog", dialog => dialog.accept());
    //page.on("dialog", dialog => dialog.dismiss());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    //iframe set up
    const framesPage =  page.frameLocator("#courses-iframe");
    //two elements the same, so only picking the visible one
    await framesPage.locator("li a[hred*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);
});


test("@Web Screenshot & Visual comparision", async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: 'partial_screenshot.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'screenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden(); 
});

test('visual', async({page})=>
{
    await page.goto("https://flightaware.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
});