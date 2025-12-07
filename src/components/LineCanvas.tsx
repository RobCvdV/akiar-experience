import { motion, useTransform } from 'framer-motion';
import { useState } from 'react';
import { pulsingTone, sineOsc } from '../audio/synths';
import { useAudio } from '../hooks/useAudio';
import { useMouseTracking } from '../hooks/useMouseTracking';

export function LineCanvas() {
  const { mouseX, mouseY, speed } = useMouseTracking();
  const { isReady, play, stop } = useAudio();
  const [isPlaying, setIsPlaying] = useState(false);

  // Line center position
  const centerX = 400;
  const centerY = 300;

  // Calculate proximity (0 when mouse is at center, higher when far)
  const proximity = useTransform([mouseX, mouseY], ([mx, my]) => {
    const dx = (mx as number) - centerX;
    const dy = (my as number) - centerY;
    return Math.sqrt(dx * dx + dy * dy);
  });

  // Glow intensity based on proximity (closer = brighter)
  const glowIntensity = useTransform(proximity, (dist) => {
    const maxDist = 300;
    const normalized = Math.max(0, 1 - (dist as number) / maxDist);
    return 5 + normalized * 15; // Range: 5 to 20
  });

  // Line path animates based on mouse speed
  const pathVariants = {
    static: {
      d: 'M 200 300 Q 300 200 400 300 T 600 300',
    },
    animated: {
      d: 'M 200 300 Q 300 400 400 300 T 600 300',
    },
  };

  const handleClick = () => {
    if (!isReady) return;

    if (isPlaying) {
      stop();
      setIsPlaying(false);
    } else {
      // Play a pulsing tone on click
      play(pulsingTone(220, 0.3));
      setIsPlaying(true);
    }
  };

  const handleHover = () => {
    if (!isReady || isPlaying) return;
    // Play brief tone on hover
    play(sineOsc(440, 0.2));
    setTimeout(() => stop(), 200);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0a0a',
      }}
    >
      <div style={{ marginBottom: '20px', color: '#888', fontFamily: 'monospace' }}>
        <motion.div>
          Mouse Speed: <motion.span>{useTransform(speed, (s) => Math.round(s as number))}</motion.span>
        </motion.div>
        <div>Audio: {isReady ? 'Ready' : 'Loading...'}</div>
        <div style={{ marginTop: '10px', fontSize: '12px' }}>
          Hover over the line for sound | Click to toggle pulsing tone
        </div>
      </div>

      <svg
        width="800"
        height="600"
        style={{ border: '1px solid #333' }}
        role="img"
        aria-label="Interactive neon line animation canvas"
      >
        {/* Define glow filter */}
        <defs>
          <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="strong-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="blur1" />
            <feGaussianBlur stdDeviation="16" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Animated line with neon glow */}
        <motion.path
          variants={pathVariants}
          initial="static"
          animate="animated"
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          stroke="#00ffff"
          strokeWidth="3"
          fill="none"
          filter="url(#neon-glow)"
          style={{ cursor: 'pointer' }}
          onHoverStart={handleHover}
          onClick={handleClick}
        />

        {/* Interactive circle that responds to mouse proximity */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r="20"
          fill="none"
          stroke="#ff00ff"
          strokeWidth="2"
          filter="url(#strong-glow)"
          style={{
            filter: useTransform(glowIntensity, (intensity) => {
              return `drop-shadow(0 0 ${intensity}px #ff00ff)`;
            }),
          }}
        />

        {/* Speed-reactive line */}
        <motion.line
          x1="100"
          y1="500"
          x2={useTransform(speed, (s) => 100 + Math.min((s as number) / 2, 600))}
          y2="500"
          stroke="#ffff00"
          strokeWidth="2"
          filter="url(#neon-glow)"
        />
        <text x="100" y="530" fill="#888" fontSize="12" fontFamily="monospace">
          Speed indicator
        </text>
      </svg>
    </div>
  );
}
