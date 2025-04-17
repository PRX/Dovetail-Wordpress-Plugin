import { newE2EPage } from '@stencil/core/testing';

describe('dtpc-slider', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<dtpc-slider></dtpc-slider>');

    const element = await page.find('dtpc-slider');
    expect(element).toHaveClass('hydrated');
  });
});
