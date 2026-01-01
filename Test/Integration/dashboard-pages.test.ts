import { test, expect } from '@playwright/test';

test.describe('Problems Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard/problems');
  });

  test('loads and displays page title', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Problems');
  });

  test('displays sample problems', async ({ page }) => {
    await expect(page.locator('text=Memory layout & pointers')).toBeVisible();
    await expect(page.locator('text=TCP flow control')).toBeVisible();
    await expect(page.locator('text=Struct vs class')).toBeVisible();
    await expect(page.locator('text=Cache locality')).toBeVisible();
  });

  test('displays difficulty badges', async ({ page }) => {
    await expect(page.locator('text=Easy')).toBeVisible();
    await expect(page.locator('text=Medium')).toBeVisible();
    await expect(page.locator('text=Hard')).toBeVisible();
  });

  test('browse tracks link is clickable', async ({ page }) => {
    const link = page.locator('text=Browse tracks').first();
    await expect(link).toBeVisible();
    await link.click();
    await expect(page).toHaveURL(/.*explore/);
  });

  test('renders card components', async ({ page }) => {
    const cards = page.locator('[class*="card"]');
    await expect(cards.first()).toBeVisible();
  });
});

test.describe('Questions Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard/questions');
  });

  test('loads and displays page title', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Questions');
  });

  test('displays placeholder content', async ({ page }) => {
    await expect(page.locator('text=Coming soon')).toBeVisible();
  });

  test('displays description text', async ({ page }) => {
    const description = page.locator('text=/plug in your real questions data/i');
    await expect(description).toBeVisible();
  });
});

test.describe('Leaderboard Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard/leaderboard');
  });

  test('loads and displays page title', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Leaderboard');
  });

  test('displays table headers', async ({ page }) => {
    await expect(page.locator('text=Rank')).toBeVisible();
    await expect(page.locator('text=User')).toBeVisible();
    await expect(page.locator('text=Score')).toBeVisible();
  });

  test('displays leaderboard entries', async ({ page }) => {
    await expect(page.locator('text=You')).toBeVisible();
    await expect(page.locator('text=Grinder')).toBeVisible();
    await expect(page.locator('text=Struggler')).toBeVisible();
  });

  test('displays scores in table', async ({ page }) => {
    await expect(page.locator('text=1280')).toBeVisible();
    await expect(page.locator('text=1214')).toBeVisible();
    await expect(page.locator('text=987')).toBeVisible();
  });

  test('table is properly structured', async ({ page }) => {
    const table = page.locator('table');
    await expect(table).toBeVisible();
    
    const rows = table.locator('tbody tr');
    await expect(rows).toHaveCount(3);
  });
});

test.describe('Progress Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard/progress');
  });

  test('loads and displays page title', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Progress');
  });

  test('page is accessible', async ({ page }) => {
    await expect(page).toHaveURL(/.*progress/);
  });
});

test.describe('Explore Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard/explore');
  });

  test('loads and displays page title', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Explore');
  });

  test('page is accessible', async ({ page }) => {
    await expect(page).toHaveURL(/.*explore/);
  });
});

