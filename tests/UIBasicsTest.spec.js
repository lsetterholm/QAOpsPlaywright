const {test, expect} = require('@playwright/test');



test('Browser Context Playwright test', async ({browser})=>
{
    //below lines are the defaults (given with page) so only need them if passing things like cookies
    
    const context = await browser.newContext();
    const page = await context.newPage();
    //page.route('**/*.{css,jpg,png,jpeg}',route=>route.abort()); // blocks css and images
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
    //listeners
    page.on('request', request=>console.log(request.url()));
    page.on('response',response=>console.log(response.url(),response.status()));
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await userName.fill("rahulshetty");
    await page.locator('#password').fill("Learning@830$3mK2");
    await signIn.click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    console.log(await cardTitles.nth(1).textContent());
    console.log(await cardTitles.first().textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
    await page.pause();
});

test('Page Playwright test', async ({page})=>
{
    await page.goto("https://google.com")
    console.log(await page.title())
    await expect(page).toHaveTitle("Google");
});

test('Other Page Playwright test', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    console.log(await page.title())
    await expect(page).toHaveTitle("Let's Shop");
    await page.locator("#userEmail").fill("oktoberfestolv@gmail.com");
    await page.locator("#userPassword").fill("Qwerty1!");
    await page.locator("#login").click();
    //await expect(page.locator(".card-body b").first()).toBeVisible();
    //await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    console.log(await page.locator(".card-body b").allTextContents());
});

test('UI Controls Playwright test', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const signIn = page.locator("#signInBtn");
    const dropDown = page.locator("select.form-control");
    const docLink = page.locator("[href*='documents-request']")
    await dropDown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    //await console.log(page.locator(".radiotextsty").last().isChecked());
    //await page.pause();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    await expect(page.locator("#terms")).not.toBeChecked();
    //expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(docLink).toHaveAttribute("class", "blinkingText");
});

//input value over textcontent on line 80 for dynamic update since input is not part of the dom

test('Child Windows Playwright test', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const docLink = page.locator("[href*='documents-request']");
    const userName = page.locator('#username');
    const [newPage] = await Promise.all( //ties all states parallel asyncronously 
        [context.waitForEvent('page'), //listen for new page to open - needs to be before event to listen for new page
        docLink.click(),//new page is open
    ]);


    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0]
    console.log(domain);
    await userName.fill(domain);
    console.log(await userName.inputValue());

});