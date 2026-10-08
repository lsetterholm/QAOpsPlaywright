const ExcelJs = require('exceljs');
const {test, expect, request} = require('@playwright/test');

async function writeExcelTest(searchText, replaceText, change, filePath){
    
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet, searchText,change);

    const cell = worksheet.getCell(output.row, output.column+change.colChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);
};

async function readExcel(worksheet, searchText,change)
{
    let output = {row:-1,column:-1}
    worksheet.eachRow((row,rowNumber)=>
    {
        row.eachCell((cell, colNumber)=>
        {
            if(cell.value === searchText)
            {
                output.row = rowNumber;
                output.column = colNumber;
            }
        });
    });
    return output;
};

//writeExcelTest("Mango", 350, {rowChange:0,colChange:2}, 'C:\\Users\\lsett\\Downloads\\download.xlsx');

test('Upload Download Excel Validation', async({page})=>
{
    const textSearch = 'Mango'
    const updateValue = "350";
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole("button", {name: "Download"}).click();
    
    const download = await downloadPromise;
    await download.saveAs('C:\\Users\\lsett\\Downloads\\download.xlsx');

    writeExcelTest(textSearch, updateValue, {rowChange:0,colChange:2}, 'C:\\Users\\lsett\\Downloads\\download.xlsx');
    await page.getByRole("button", {name: "Choose File"}).click();
    await page.getByRole("button", {name: "Choose File"}).setInputFiles('C:\\Users\\lsett\\Downloads\\download.xlsx');
    const textLocator = page.getByText(textSearch);
    const desiredRow = await page.getByRole('row').filter({has:textLocator});

    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
});