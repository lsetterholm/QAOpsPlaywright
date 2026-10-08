const base = require('@playwright/test')

exports.customtest = base.test.extend(
{
    testDataForOrder : {
        username: "oktoberfestolv@gmail.com",
        password:"Qwerty1!",
        productName:"ZARA COAT 3"
    }
});