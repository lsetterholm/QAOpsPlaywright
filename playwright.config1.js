// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { channel } from 'node:diagnostics_channel';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config=({
  testDir: './tests',
  retries: 1, //amout of retry for failed failed scenarios
  timeout: 40 *1000, // full test timeout
  expect : {timeout: 5000}, // expect timeout
  reporter:'html',
  projects :[
    {
      name: 'safari',
      use:{
        browserName : 'webkit',
        headless : false,
        screenshot: 'off',
        workers: 1, // how many tests you want to run in parallel (same file runs in sequence)
        trace: 'on',
        video: 'retain-on-failure',
        //viewport : {width:620, height:720} // size of browser
        ...devices['iPhone 11'], //mobile size
        ignoreHttpsErrors: true, //ssl error handling
        permissions:['geolocations'], // allows chrome wants to know where you at
      }
    },
    {
      name: 'chrome',
      use:{
        browserName : 'chromium',
        headless : true,
        screenshot: 'on',
        trace: 'on',
        
      }
    },
  ]
  

});
module.exports = config
