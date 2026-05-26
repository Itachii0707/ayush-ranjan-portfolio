'use client';
import dynamic from 'next/dynamic';

const Scene = dynamic(
  () => import('./scenes/ServicesScene').then((m) => m.ServicesScene),
  { ssr: false, loading: () => null }
);

export function ServicesScene() {
  return <Scene />;
}
