import { newE2EPage } from '@stencil/core/testing';

describe('dtpc-play-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<dtpc-play-button></dtpc-play-button>');

    const element = await page.find('dtpc-play-button');
    expect(element).toHaveClass('hydrated');
  });
});
