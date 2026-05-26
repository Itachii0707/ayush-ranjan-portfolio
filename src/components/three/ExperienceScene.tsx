'use client';
import dynamic from 'next/dynamic';

const Scene = dynamic(
  () => import('./scenes/ExperienceScene').then((m) => m.ExperienceScene),
  { ssr: false, loading: () => null }
);

export function ExperienceScene() {
  return <Scene />;
}
