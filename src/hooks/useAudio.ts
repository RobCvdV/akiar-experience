import { el, type NodeRepr_t } from '@elemaudio/core';
import type WebRenderer from '@elemaudio/web-renderer';
import { useEffect, useState } from 'react';
import { getCore, initAudio, resumeAudio } from '../audio/audioContext';

export function useAudio() {
  const [core, setCore] = useState<WebRenderer | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    initAudio().then((renderer) => {
      if (mounted) {
        setCore(renderer);
        setIsReady(true);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const play = (signal: NodeRepr_t) => {
    const coreInstance = getCore();
    if (coreInstance) {
      resumeAudio();
      coreInstance.render(el.mul(0.3, signal), el.mul(0.3, signal)); // Stereo output
    }
  };

  const stop = () => {
    const coreInstance = getCore();
    if (coreInstance) {
      coreInstance.render(el.const({ value: 0 }), el.const({ value: 0 }));
    }
  };

  return { core, isReady, play, stop };
}
