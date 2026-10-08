const {test, expect} = require('@playwright/test');

test('Playwright Special locators', async ({page})=>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("Qwerty1!");
    await page.getByRole("button", {name:'submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout: 10_000});

    await page.getByRole("link", {name: "Shop"}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
}); 
//test
test('Playwright Test level time out', async ({page})=>
{
    test.setTimeout(60000);
    const slowExpect = expect.configure({timeout:9000});
    page.setDefaultTimeout(9000); //action timeout
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("Qwerty1!");
    await page.getByRole("button", {name:'submit'}).click({timeout:15000});
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout: 10_000});

    await page.getByRole("link", {name: "Shop"}).click();
    await slowExpect(page.locator(".my-4").first()).toHaveText("Shop")
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
}); 