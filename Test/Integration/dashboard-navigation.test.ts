import { test, expect } from '@playwright/test';

test.describe('Dashboard Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
  });

  test('dashboard page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('can navigate to problems page', async ({ page }) => {
    await page.click('text=Problems');
    await expect(page).toHaveURL(/.*problems/);
    await expect(page.locator('h1')).toContainText('Problems');
  });

  test('can navigate to questions page', async ({ page }) => {
    await page.click('text=Questions');
    await expect(page).toHaveURL(/.*questions/);
    await expect(page.locator('h1')).toContainText('Questions');
  });

  test('can navigate to leaderboard page', async ({ page }) => {
    await page.click('text=Leaderboard');
    await expect(page).toHaveURL(/.*leaderboard/);
    await expect(page.locator('h1')).toContainText('Leaderboard');
  });

  test('can navigate to progress page', async ({ page }) => {
    await page.click('text=Progress');
    await expect(page).toHaveURL(/.*progress/);
    await expect(page.locator('h1')).toContainText('Progress');
  });

  test('can navigate to explore page', async ({ page }) => {
    await page.click('text=Explore');
    await expect(page).toHaveURL(/.*explore/);
    await expect(page.locator('h1')).toContainText('Explore');
  });
});

test.describe('Dashboard Layout', () => {
  test('displays navigation elements', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Check for navigation items
    await expect(page.locator('text=Problems')).toBeVisible();
    await expect(page.locator('text=Questions')).toBeVisible();
    await expect(page.locator('text=Leaderboard')).toBeVisible();
    await expect(page.locator('text=Progress')).toBeVisible();
    await expect(page.locator('text=Explore')).toBeVisible();
  });

  test('maintains layout across page navigation', async ({ page }) => {
    await page.goto('/dashboard');
    
    const navExists = await page.locator('nav').count();
    expect(navExists).toBeGreaterThan(0);

    await page.click('text=Problems');
    const navStillExists = await page.locator('nav').count();
    expect(navStillExists).toBeGreaterThan(0);
  });
});

