import { expect } from '@playwright/test';
import { configs, test } from '@utils/test/playwright';
import { AlertFixture } from './fixture';

/**
 * This behavior does not vary across modes/directions
 */
configs({ mode: ['ios'], directions: ['ltr'] }).forEach(({ config, screenshot, title }) => {
  test.describe(title('alert: basic'), () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/src/components/alert/test/basic', config);
    });
    test('focus trap should work correctly', async ({ page, browserName }) => {
      const tabKey = browserName === 'webkit' ? 'Alt+Tab' : 'Tab';

      const alertFixture = new AlertFixture(page, screenshot);

      const alert = await alertFixture.open('#multipleButtons');
      const alertBtns = alert.locator('button');

      await page.keyboard.press(tabKey);
      await expect(alertBtns.nth(0)).toBeFocused();

      await page.keyboard.press(`Shift+${tabKey}`);
      await expect(alertBtns.nth(2)).toBeFocused();

      await page.keyboard.press(tabKey);
      await expect(alertBtns.nth(0)).toBeFocused();
    });

    test('should dismiss when async handler resolves', async ({ page }) => {
      const ionAlertDidPresent = await page.spyOnEvent('ionAlertDidPresent');
      const ionAlertDidDismiss = await page.spyOnEvent('ionAlertDidDismiss');
      const ionLoadingDidDismiss = await page.spyOnEvent('ionLoadingDidDismiss');

      const alert = page.locator('ion-alert');

      await page.click('#asyncHandler');
      await ionAlertDidPresent.next();

      await page.click('.alert-button');

      await expect(alert).toBeVisible();

      await ionLoadingDidDismiss.next();
      await ionAlertDidDismiss.next();

      await expect(alert).toBeHidden();
    });
  });
});
