const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils')
//executes first before al tests
const loginPayLoad = {userEmail:"oktoberfestolv@gmail.com", userPassword:"Qwerty1!"}
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
let response;
test.beforeAll( async() =>
{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayLoad);
    response = await apiUtils.createOrder(orderPayload);
});

//runs one time before each and every test
test.beforeEach(()=>
{

});

test('@Web Place the order', async ({page})=>
{
    
    await page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    }, response.token);
    const productName = 'ZARA COAT 3'
    const email = "oktoberfestolv@gmail.com"
    await page.goto("https://rahulshettyacademy.com/client/")
    
    await page.locator(".btn.btn-custom[routerlink='/dashboard/myorders']").click();
    const row = await page.locator("tbody tr");
    await row.first().waitFor();
    //const orderCount = await row.count();
    for(let i=0;i<await row.count();++i)
    {
        const text = await row.locator("th").nth(i).textContent();
        if(response.orderId.includes(text))
        {
            await row.locator(".btn.btn-primary").nth(i).click();
            break;
        }
    }
    
    const orderDetail = await page.locator(".col-text.-main").textContent();
    expect(response.orderId.includes(orderDetail)).toBeTruthy();
    //await page.pause();

});