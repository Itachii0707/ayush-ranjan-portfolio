'use client';
import { useState, useEffect } from 'react';

export type PerformanceTier = 'low' | 'medium' | 'high';

export interface DevicePerformance {
  tier: PerformanceTier;
  pixelRatio: number;
  maxParticles: number;
  enablePostProcessing: boolean;
  enableShadows: boolean;
}

export function useDevicePerformance(): DevicePerformance {
  const [performance, setPerformance] = useState<DevicePerformance>({
    tier: 'high',
    pixelRatio: 1,
    maxParticles: 1000,
    enablePostProcessing: true,
    enableShadows: true,
  });

  useEffect(() => {
    const pixelRatio = Math.min(window.devicePixelRatio, 2);

    // Detect low-end devices
    const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;

    let tier: PerformanceTier = 'high';

    if (isMobile || hardwareConcurrency <= 2 || (memory !== undefined && memory <= 2)) {
      tier = 'low';
    } else if (hardwareConcurrency <= 4 || (memory !== undefined && memory <= 4)) {
      tier = 'medium';
    }

    // Override: if user prefers reduced motion, go low
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      tier = 'low';
    }

    const configs: Record<PerformanceTier, DevicePerformance> = {
      low: {
        tier: 'low',
        pixelRatio: Math.min(pixelRatio, 1),
        maxParticles: 200,
        enablePostProcessing: false,
        enableShadows: false,
      },
      medium: {
        tier: 'medium',
        pixelRatio: Math.min(pixelRatio, 1.5),
        maxParticles: 500,
        enablePostProcessing: false,
        enableShadows: false,
      },
      high: {
        tier: 'high',
        pixelRatio,
        maxParticles: 1000,
        enablePostProcessing: true,
        enableShadows: true,
      },
    };

    setPerformance(configs[tier]);
  }, []);

  return performance;
}
