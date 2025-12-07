import WebRenderer from '@elemaudio/web-renderer';

// Initialize Elementary Audio web renderer
let audioContext: AudioContext | null = null;
let core: WebRenderer | null = null;

export async function initAudio(): Promise<WebRenderer> {
  if (core) {
    return core;
  }

  // Create audio context
  audioContext = new AudioContext();

  // Initialize Elementary renderer
  core = new WebRenderer();

  // Initialize with audio context
  const node = await core.initialize(audioContext, {
    numberOfInputs: 0,
    numberOfOutputs: 1,
    outputChannelCount: [2], // Stereo output
  });

  // Connect to audio destination
  node.connect(audioContext.destination);

  return core;
}

export function getAudioContext(): AudioContext | null {
  return audioContext;
}

export function getCore(): WebRenderer | null {
  return core;
}

export function resumeAudio(): void {
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume();
  }
}
