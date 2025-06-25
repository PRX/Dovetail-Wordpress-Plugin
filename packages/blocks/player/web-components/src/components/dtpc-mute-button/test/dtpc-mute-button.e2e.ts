import { newE2EPage } from '@stencil/core/testing';

describe('dtpc-mute-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<dtpc-mute-button></dtpc-mute-button>');

    const element = await page.find('dtpc-mute-button');
    expect(element).toHaveClass('hydrated');
  });
});
