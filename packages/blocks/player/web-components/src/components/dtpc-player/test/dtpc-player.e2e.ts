import { newE2EPage } from '@stencil/core/testing';

describe('dtpc-player', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<dtpc-player></dtpc-player>');

    const element = await page.find('dtpc-player');
    expect(element).toHaveClass('hydrated');
  });
});
