import { test, expect } from "@playwright/test";

test('Signal Platform - Login Visual Test', async ({page}) => {
    await page.goto('https://unstable.dev.signalocean.com/');
    await page.waitForLoadState('domcontentloaded')
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot();
});