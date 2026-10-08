// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { channel } from 'node:diagnostics_channel';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config=({
  testDir: './tests',
  timeout: 40 *1000, // full test timeout
  expect : {timeout: 5000}, // expect timeout
  reporter:'html',
  use: {
    browserName : 'chromium',
    headless:false,
    
    actionTimeout: 10_000, //timout for elements
    navigationTimeout: 30 * 1000,
    trace:"on",
    //channel: 'msedge'
    //screenshot: 'on',
    //trace: 'retain-on-failure',
  },


});
module.exports = config
