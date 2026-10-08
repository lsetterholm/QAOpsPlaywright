const base = require('@playwright/test');
const {APIUtils} = require("../utils/APIUtils.js")
const {request} = require('@playwright/test');
const loginPayLoad = {userEmail:"oktoberfestolv@gmail.com", userPassword:"Qwerty1!"}
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]}


exports.customtest = base.test.extend(

{
authenticatedPage: async({browser}, use)=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client")
    await page.locator("#userEmail").fill("oktoberfestolv@gmail.com");
    await page.locator("#userPassword").fill("Qwerty1!");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await use(page);
    //tear down - runs after all code closed, even in test itself (anything after use)
    await context.close();
},

createOrder : async({},use)=>
{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    const response = await apiUtils.createOrder(orderPayload);
    await use(response);
    await apiContext.dispose();
},

testDataForOrder : {
    productName : 'ADIDAS ORIGIONAL'
}
});