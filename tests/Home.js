const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: false,
    args: ['--start-maximized']
  });

  const context = await browser.newContext({
    viewport: null  // Required when using --start-maximized
  });

  const page = await context.newPage();

  await page.goto('https://www.mycoveragehub.com');
  await page.click("(//button[text()='Sign in'])[2]")
  await page.fill("//input[@id='username']",'evjtestuser@gmail.com')
  await page.fill("//input[@id='password']",'Warranty@123')
  await page.click("//button[@name='action']")
  const textContent = await page.textContent("//h1[text()='Welcome to your TotalCare portal']"); // e.g., '#welcome-message'

if (textContent && textContent.includes('Welcome to your TotalCare portal')) {
  console.log('Login successfully');
} else {
  console.log('Not Login');
}
const policyNamelocator = page.locator("//h3[text()='Jacana Care +']"); // change selector to your actual element
const policyType = await policyNamelocator.textContent();

console.log('Policy Type :', policyType);

const policyNumberlocator = page.locator("//p[@class='text-[16px] text-black pr-16']"); // change selector to your actual element
const policyNumber = await policyNumberlocator.textContent();

console.log('Policy Number :', policyNumber);

const policyAddresslocator = page.locator("//p[@class='text-sm text-black']"); // change selector to your actual element
const policyAddress = await policyAddresslocator.textContent();

console.log('Policy Address :', policyAddress);
await page.waitForTimeout(5000);

await browser.close(); // You can close the browser if needed
})();
