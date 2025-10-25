import factorIoBold from './font/factor-io-bold.woff2';
import factorIoMedium from './font/factor-io-medium.woff2';
import factorIoRegular from './font/factor-io-regular.woff2';

export const fontStyles = `
@font-face {
  font-family: 'Factor IO';
  font-style: normal;
  font-weight: 400;
  src: url(${factorIoRegular}) format('woff2');
  font-display: swap;
}

@font-face {
  font-family: 'Factor IO';
  font-style: normal;
  font-weight: 500;
  src: url(${factorIoMedium}) format('woff2');
  font-display: swap;
}

@font-face {
  font-family: 'Factor IO';
  font-style: normal;
  font-weight: 700;
  src: url(${factorIoBold}) format('woff2');
  font-display: swap;
}

.yoomoney-widget {
  font-family: 'Factor IO', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
`;