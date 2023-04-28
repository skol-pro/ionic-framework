import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { Alert } from '../../alert';

describe('alert: htmlAttributes inheritance', () => {
  it('should correctly inherit attributes on host', async () => {
    const page = await newSpecPage({
      components: [Alert],
      template: () => <ion-alert htmlAttributes={{ 'data-testid': 'basic-alert' }}></ion-alert>,
    });

    const alert = page.body.querySelector('ion-alert');

    await expect(alert.getAttribute('data-testid')).toBe('basic-alert');
  });
});
