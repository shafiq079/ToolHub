import React, { useEffect } from 'react';

const GoogleAd: React.FC = () => {
  useEffect(() => {
    try {
      // Initialize the ad slot
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense Error:', e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-4802098433494020"
      data-ad-slot="2976060197"
      data-ad-format="auto"
      data-full-width-responsive="true"
      data-adtest="on"
    ></ins>
  );
};

export default GoogleAd;
