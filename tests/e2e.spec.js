const { test, expect } = require('@playwright/test');

test('builder has placeholders + preview and generate', async ({ page, context }) => {
  await page.goto('/');
  await expect(page.getByPlaceholder('Rahul')).toBeVisible();
  await expect(page.getByPlaceholder('Priya')).toBeVisible();
  await expect(page.getByRole('button', { name: /preview/i })).toBeVisible();

  await page.getByPlaceholder('Rahul').fill('Rahul');
  await page.getByPlaceholder('Priya').fill('Priya');
  await page.getByRole('button', { name: /generate link/i }).click();
  await expect(page.getByText('Share this link:')).toBeVisible();
  await expect(page.getByRole('button', { name: /refresh stats/i })).toBeVisible();

  const [preview] = await Promise.all([
    context.waitForEvent('page'),
    page.getByRole('button', { name: /preview/i }).click()
  ]);
  await preview.waitForLoadState();
  await expect(preview.getByRole('button', { name: /yes/i })).toBeVisible();
  await expect(preview.getByRole('button', { name: /^no/i })).toBeVisible();
});

test('ask page no button exists + yes flow works', async ({ page }) => {
  await page.goto('/ask?from=Rahul&to=Priya&theme=cute&tone=classic&lid=test123');
  await expect(page.getByRole('button', { name: /yes/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /^no/i })).toBeVisible();

  await page.getByRole('button', { name: /yes/i }).click();
  await expect(page.getByText(/said YES/i)).toBeVisible();
  await expect(page.getByRole('button', { name: /create your own/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /reply challenge/i })).toBeVisible();
});