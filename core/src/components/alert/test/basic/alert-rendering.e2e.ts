import { configs, test } from '@utils/test/playwright';
import { AlertFixture } from './fixture';

configs().forEach(({ config, screenshot, title }) => {
  test.describe(title('should not have visual regressions'), () => {
    let alertFixture!: AlertFixture;

    test.beforeEach(async ({ page }) => {
      await page.goto('/src/components/alert/test/basic', config);
      alertFixture = new AlertFixture(page, screenshot);
    });
    test('header, subheader, message', async () => {
      await alertFixture.open('#basic');
      await alertFixture.screenshot('basic');
    });

    test('long message', async () => {
      await alertFixture.open('#longMessage');
      await alertFixture.screenshot('longMessage');
    });

    test('more than two buttons', async () => {
      await alertFixture.open('#multipleButtons');
      await alertFixture.screenshot('multipleButtons');
    });

    test('no message', async () => {
      await alertFixture.open('#noMessage');
      await alertFixture.screenshot('noMessage');
    });

    test('two buttons', async () => {
      await alertFixture.open('#confirm');
      await alertFixture.screenshot('confirm');
    });

    test('form prompt', async () => {
      await alertFixture.open('#prompt');
      await alertFixture.screenshot('prompt');
    });

    test('radios', async () => {
      await alertFixture.open('#radio');
      await alertFixture.screenshot('radio');
    });

    test('checkboxes', async () => {
      await alertFixture.open('#checkbox');
      await alertFixture.screenshot('checkbox');
    });
  });
});
