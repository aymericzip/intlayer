import Script from 'next/script';
import React from 'react';

const GoogleAnalytics = () => (
  <>
    <Script
      strategy="lazyOnload"
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`}
    />

    <Script id="" strategy="lazyOnload">
      {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
            });
        `}
    </Script>
  </>
);

export default GoogleAnalytics;
