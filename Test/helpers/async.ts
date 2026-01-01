import { waitFor } from '@testing-library/react';

export const waitForLoadingToFinish = async () => {
  await waitFor(() => {
    const loadingElements = document.querySelectorAll('[data-testid*="loading"]');
    loadingElements.forEach(el => {
      expect(el.textContent).not.toContain('loading');
    });
  });
};

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const waitForElement = async (selector: string, timeout = 5000) => {
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    const element = document.querySelector(selector);
    if (element) return element;
    await sleep(100);
  }
  
  throw new Error(`Element ${selector} not found after ${timeout}ms`);
};

