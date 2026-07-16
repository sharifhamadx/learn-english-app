import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.moko.learnenglish',
  appName: 'Moko Learn English',
  webDir: 'public',
  server: {
    url: 'https://mokolearnenglish.netlify.app',
    cleartext: true
  }
};

export default config;
