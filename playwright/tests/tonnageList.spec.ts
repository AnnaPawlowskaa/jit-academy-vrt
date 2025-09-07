import { test, expect } from "@playwright/test";
import tonnageList from "../fixtures/tonnageList.json";
import tce from "../fixtures/tce.json";

test("Signal Platform - Tonnage List - Mocked", async ({ page }) => {
  await page.route("/api/tonnageList*", async (route) => {
    await route.fulfill({ json: tonnageList });
  });
  await page.route("/api/tonnageList/tce*", async (route) => {
    await route.fulfill({ json: tce });
  });
  await page.goto("https://unstable.dev.signalocean.com/");
  await page.fill("#enterEmailFormEmail", "user1@stresstest.com");
  await page.click("#enterEmailFormSubmit");
  await page.fill("#password", "Qweasd12@");
  await page.click("#submitLogin");
  await page.getByRole("button", { name: "Accept" }).click();
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("networkidle");
  await page.goto("https://unstable.dev.signalocean.com/tonnagelist");
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("networkidle");

  await expect(page).toHaveScreenshot({
    mask: [page.locator(".tw-flex-shrink-0")],
  });
});

// import { test, expect } from "@playwright/test";

// test("Signal Platform - Tonnage List", async ({ page }) => {
//   await page.goto("https://unstable.dev.signalocean.com/");
//   await page.fill("#enterEmailFormEmail", "user1@stresstest.com");
//   await page.click("#enterEmailFormSubmit");
//   await page.fill("#password", "Qweasd12@");
//   await page.click("#submitLogin");
//   await page.getByRole("button", { name: "Accept" }).click();
//   await page.waitForLoadState("domcontentloaded");
//   await page.waitForLoadState("networkidle");
//   await page.goto("https://unstable.dev.signalocean.com/tonnagelist");
//   await page.waitForLoadState("domcontentloaded");
//   await page.waitForLoadState("networkidle");
//   //   await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.05 });
//   await expect(page).toHaveScreenshot({
//     mask: [page.locator("div.tw-flex-shrink-0")],
//   });
// });
