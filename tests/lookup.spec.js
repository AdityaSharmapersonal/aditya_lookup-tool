import { test, expect } from '@playwright/test';

test('search for Canada and verify results', async ({ page }) => {
  // Navigate to the search page
  await page.goto('http://localhost:3002/search');

  // Type "Canada" in the search input
  await page.fill('input[name="q"]', 'Canada');

  // Click the Search button
  await page.click('button[type="submit"]');

  // Wait for the results to load
  await page.waitForSelector('.results-grid');

  // Check that Canada appears in the results
  await expect(page.locator('.results-grid').getByText('Canada')).toBeVisible();
});