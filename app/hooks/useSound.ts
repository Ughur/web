'use client';

import { useCallback } from 'react';

type SoundType = 'click' | 'hover' | 'success' | 'failure';

const sounds = {
  click:
    typeof Audio !== 'undefined'
      ? new Audio('/sounds/coin-pickup(click).mp3')
      : undefined,
  hover:
    typeof Audio !== 'undefined'
      ? new Audio('/sounds/pixel-jump(hover).mp3')
      : undefined,
  success:
    typeof Audio !== 'undefined'
      ? new Audio('/sounds/8-bit(success).mp3')
      : undefined,
  failure:
    typeof Audio !== 'undefined'
      ? new Audio('/sounds/pixel-death(failure).mp3')
      : undefined,
};

// To make sure sounds can be rapidly re-triggered.
for (const key in sounds) {
  const sound = sounds[key as SoundType];
  if (sound) {
    sound.preload = 'auto';
  }
}

const useSound = () => {
  const playSound = useCallback((type: SoundType) => {
    const sound = sounds[type];
    if (sound) {
      sound.currentTime = 0;
      sound
        .play()
        .catch((error) => console.error(`Error playing sound: ${type}`, error));
    }
  }, []);

  return playSound;
};

export default useSound;
