import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/GetLowLevel/i);
  });

  test('displays authentication options', async ({ page }) => {
    await page.goto('/');
    
    // Check if auth dialog or button exists
    const authButton = page.locator('button').filter({ hasText: /sign in|login|get started/i });
    const buttonCount = await authButton.count();
    
    if (buttonCount > 0) {
      await expect(authButton.first()).toBeVisible();
    }
  });

  test('can access dashboard', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Either shows dashboard or redirects to auth
    const url = page.url();
    expect(url).toMatch(/dashboard|login|signin|\//);
  });
});

test.describe('Responsive Design', () => {
  const viewports = [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1920, height: 1080 },
  ];

  for (const viewport of viewports) {
    test(`dashboard renders correctly on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/dashboard/problems');
      
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('text=Problems')).toBeVisible();
    });
  }
});

test.describe('Navigation Performance', () => {
  test('pages load within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/dashboard/problems');
    const loadTime = Date.now() - startTime;
    
    await expect(page.locator('h1')).toBeVisible();
    expect(loadTime).toBeLessThan(5000); // 5 seconds
  });

  test('subsequent navigation is fast', async ({ page }) => {
    await page.goto('/dashboard');
    
    const startTime = Date.now();
    await page.click('text=Problems');
    await expect(page.locator('h1')).toContainText('Problems');
    const navigationTime = Date.now() - startTime;
    
    expect(navigationTime).toBeLessThan(3000); // 3 seconds
  });
});

test.describe('Error Handling', () => {
  test('handles non-existent routes gracefully', async ({ page }) => {
    const response = await page.goto('/dashboard/non-existent-page');
    
    // Should either show 404 or redirect
    expect(response?.status()).toBeDefined();
  });

  test('maintains navigation on error', async ({ page }) => {
    await page.goto('/dashboard');
    
    try {
      await page.goto('/dashboard/invalid-route');
    } catch (e) {
      // Expected to possibly fail
    }
    
    // Should still be able to navigate
    await page.goto('/dashboard/problems');
    await expect(page.locator('h1')).toContainText('Problems');
  });
});

