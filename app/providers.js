'use client';

import { DeviceDetectionProvider } from '../components/device-detection';
import ClientProviders from './components/ClientProviders';

export function RootProvider({ children }) {
  return (
    <DeviceDetectionProvider>
      <ClientProviders>
        {children}
      </ClientProviders>
    </DeviceDetectionProvider>
  );
} 