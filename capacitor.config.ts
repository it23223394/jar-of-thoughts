import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jarofthoughts.app',
  appName: 'Jar of Thoughts',
  webDir: 'dist', // Vite's default build output folder — change this if yours differs
  server: {
    // Load the app from local files bundled inside the APK,
    // not from a remote URL — this is what makes it work offline
    // and avoids any "Chrome" feel.
    androidScheme: 'https',
  },
};

export default config;