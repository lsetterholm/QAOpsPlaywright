const playwright = require('@playwright/test');
const {POManager} = require('../../pageobjects/POManager');
const {Before, After,BeforeStep,AfterStep,Status } = require('@cucumber/cucumber');

Before(async function (){
    const browser = await playwright.chromium.launch({
        headless:false
    });
    const context = await browser.newContext();
    this.page = await context.newPage()
    this.poManager = new POManager(this.page);
});

BeforeStep({tags: "@foo or @bar"},function(){
    
});

AfterStep(async function({result}){
    if(result.status === Status.FAILED)
    {
        await this.page.screenshot({path: 'screenshow1.png'});
    }
});

After(function(){
    console.log("last to execute")
});