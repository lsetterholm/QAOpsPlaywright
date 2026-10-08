const {test, expect} = require('@playwright/test');


test('Page Playwright test', async ({page})=>
{
    const event = "Test Event " + Date.now()
    await page.goto("https://eventhub.rahulshettyacademy.com");
    await page.getByPlaceholder("you@email.com").fill("oktoberfestolv@gmail.com");
    await page.getByLabel("Password").fill("Qwerty1!");
    await page.getByRole('button', {name:"Sign In"});
    expect(await page.locator("span[class='inline-flex items-center justify-center px-6 py-2.5 text-base font-semibold rounded-lg bg-white text-indigo-700 hover:bg-indigo-50 transition-colors w-full sm:w-auto']").isVisible()).toBeTruthy;
    await page.getByRole('button', {name: 'Admin'}).click();
    await page.locator('a').filter({ hasText: 'Manage Events' }).first();
    await page.getByRole('textbox', { name: 'Title*' }).fill(event);
    await page.getByRole('textbox', { name: 'Describe the event…' }).filter("Test Event");
    await page.getByRole('textbox', { name: 'City*' }).fill("Yo Mama");
    await page.getByRole('spinbutton', { name: 'Price ($)*' }).fill("100000000");
    await page.getByRole('spinbutton', { name: 'Total Seats*' }).fill("10");

});