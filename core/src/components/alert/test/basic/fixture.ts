import { expect } from '@playwright/test';
import type { Locator } from '@playwright/test';
import type { E2EPage } from '@utils/test/playwright';

export class AlertFixture {
  readonly page: E2EPage;
  readonly screenshotFn?: (file: string) => string;

  private alert!: Locator;

  constructor(page: E2EPage, screenshot?: (file: string) => string) {
    this.page = page;
    this.screenshotFn = screenshot;
  }

  async open(selector: string) {
    const ionAlertDidPresent = await this.page.spyOnEvent('ionAlertDidPresent');
    await this.page.locator(selector).click();
    await ionAlertDidPresent.next();
    this.alert = this.page.locator('ion-alert');
    await expect(this.alert).toBeVisible();

    return this.alert;
  }

  async dismiss() {
    const ionAlertDidDismiss = await this.page.spyOnEvent('ionAlertDidDismiss');
    await this.alert.evaluate((el: HTMLIonAlertElement) => el.dismiss());
    await ionAlertDidDismiss.next();
    await expect(this.alert).not.toBeVisible();
  }

  async screenshot(modifier: string) {
    const { screenshotFn } = this;

    if (!screenshotFn) {
      throw new Error(
        'A screenshot function is required to take a screenshot. Pass one in when creating ActionSheetFixture.'
      );
    }

    await expect(this.alert).toHaveScreenshot(screenshotFn(`alert-${modifier}`));
  }
}
