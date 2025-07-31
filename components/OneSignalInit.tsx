'use client';

import { useEffect } from 'react';


declare global {
  interface Window {
    OneSignalDeferred: any[];
  }
}

const OneSignalInit = () => {
  useEffect(() => {
    // Charger le SDK OneSignal si ce n'est pas déjà fait
    const script = document.createElement('script');
    script.src = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js';
    script.defer = true;
    document.head.appendChild(script);

    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async (OneSignal: any) => {
      await OneSignal.init({
        appId: "c2dc5670-7bf8-4f1f-b682-9310b39bb863",
        safari_web_id: "web.onesignal.auto.50dac47a-d084-4e57-bf73-88f5ab7beb6e",
        notifyButton: {
          enable: true,
        },
        allowLocalhostAsSecureOrigin: true,
      });
    });
  }, []);

  return null;
};

export default OneSignalInit;
