const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils')
//executes first before al tests
const loginPayLoad = {userEmail:"oktoberfestolv@gmail.com", userPassword:"Qwerty1!"}
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
let response;
const fakePayloadOrders = {data:[],message:"No Orders"};
test.beforeAll( async() =>
{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayload);
});


test('Place the order', async ({page})=>
{
    
    await page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    }, response.token);
    const productName = 'ZARA COAT 3'
    const email = "oktoberfestolv@gmail.com"
    await page.goto("https://rahulshettyacademy.com/client/")
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", 
    async route => {
        const response = await page.request.fetch(route.request());
        const body = JSON.stringify(fakePayloadOrders);
        route.fulfill({
            response,
            body,

        });
    });
    
    await page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    console.log(await page.locator(".mt-4").textContent());
    


});