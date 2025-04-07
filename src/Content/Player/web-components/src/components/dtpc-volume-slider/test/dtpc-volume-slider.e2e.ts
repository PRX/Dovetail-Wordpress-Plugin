import { newE2EPage } from '@stencil/core/testing';

describe('dtpc-volume-slider', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<dtpc-volume-slider></dtpc-volume-slider>');

    const element = await page.find('dtpc-volume-slider');
    expect(element).toHaveClass('hydrated');
  });
});
