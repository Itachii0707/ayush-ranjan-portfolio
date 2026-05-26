'use client';
import dynamic from 'next/dynamic';

const Scene = dynamic(
  () => import('./scenes/AboutScene').then((m) => m.AboutScene),
  { ssr: false, loading: () => null }
);

export function AboutScene() {
  return <Scene />;
}
