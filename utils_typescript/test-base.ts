import {test as baseTest} from '@playwright/test'
interface TestDataForOrder
{
    username: string;
    password: string;
    productName: string;
}
export const customtest = baseTest.extend<{testDataForOrder:TestDataForOrder}>(
{
    testDataForOrder : {
        username: "oktoberfestolv@gmail.com",
        password:"Qwerty1!",
        productName:"ZARA COAT 3"
    }
});