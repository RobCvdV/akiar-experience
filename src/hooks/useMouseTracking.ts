import { useMotionValue, useTransform, useVelocity } from 'framer-motion';
import { useEffect } from 'react';

export interface MouseTracking {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  speed: number;
}

export function useMouseTracking() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const velocityX = useVelocity(mouseX);
  const velocityY = useVelocity(mouseY);

  // Calculate speed (magnitude of velocity vector)
  const speed = useTransform([velocityX, velocityY], ([vx, vy]) => {
    return Math.sqrt((vx as number) ** 2 + (vy as number) ** 2);
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return {
    mouseX,
    mouseY,
    velocityX,
    velocityY,
    speed,
  };
}

/**
 * Calculate distance between mouse and a point
 */
export function useProximity(targetX: number, targetY: number, mouseX: number, mouseY: number) {
  const dx = mouseX - targetX;
  const dy = mouseY - targetY;
  return Math.sqrt(dx * dx + dy * dy);
}
