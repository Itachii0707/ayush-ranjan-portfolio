'use client';

import { useEffect, useRef, useState } from 'react';
import { Camera, RefreshCw, AlertCircle, Award } from 'lucide-react';
import toast from 'react-hot-toast';

// Types for MediaPipe global objects
declare global {
  interface Window {
    Hands: any;
    Camera: any;
    drawConnectors: any;
    drawLandmarks: any;
    HAND_CONNECTIONS: any;
  }
}

interface Bubble {
  id: number;
  x: number;
  y: number;
  radius: number;
  color: string;
  popped: boolean;
  scoreAwarded: boolean;
}

export function HandGestureDemo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isLoadingScripts, setIsLoadingScripts] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [fingerPos, setFingerPos] = useState({ x: -100, y: -100 });
  const [cameraError, setCameraError] = useState(false);

  const activeCameraRef = useRef<any>(null);
  const activeHandsRef = useRef<any>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize targets/bubbles
  const generateBubbles = (canvasWidth: number, canvasHeight: number) => {
    const colors = ['#00E5FF', '#C084FC', '#FF2E93', '#2FE67E', '#FFBD2E'];
    const newBubbles: Bubble[] = [];
    for (let i = 0; i < 5; i++) {
      newBubbles.push({
        id: i,
        x: Math.random() * (canvasWidth - 100) + 50,
        y: Math.random() * (canvasHeight - 100) + 50,
        radius: 35,
        color: colors[i % colors.length],
        popped: false,
        scoreAwarded: false,
      });
    }
    setBubbles(newBubbles);
  };

  // Inject script loader helper
  const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject();
      document.head.appendChild(script);
    });
  };

  // Start Camera and CV Hand Tracking Pipeline
  const startCameraPipeline = async () => {
    setIsLoadingScripts(true);
    setCameraError(false);
    
    try {
      // 1. Inject MediaPipe Scripts Dynamically
      await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js');
      await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.js');

      setIsLoadingScripts(false);
      setIsModelLoading(true);

      if (!window.Hands || !window.Camera) {
        throw new Error('MediaPipe failed to load globally.');
      }

      // 2. Initialize MediaPipe Hands
      const hands = new window.Hands({
        locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      hands.onResults(onResultsHandler);
      activeHandsRef.current = hands;

      // 3. Request Camera Access
      if (videoRef.current) {
        const camera = new window.Camera(videoRef.current, {
          onFrame: async () => {
            if (videoRef.current && activeHandsRef.current) {
              await activeHandsRef.current.send({ image: videoRef.current });
            }
          },
          width: 640,
          height: 480,
        });

        await camera.start();
        activeCameraRef.current = camera;
        setIsCameraActive(true);
        
        // Spawn bubbles in canvas size
        if (canvasRef.current) {
          generateBubbles(canvasRef.current.width, canvasRef.current.height);
        }
        
        toast.success('Webcam activated! Wave your hand in front of the camera.');
      }
    } catch (err) {
      console.error(err);
      setCameraError(true);
      toast.error('Failed to access webcam or load MediaPipe.');
    } finally {
      setIsModelLoading(false);
      setIsLoadingScripts(false);
    }
  };

  // Handle hand landmark prediction results
  const onResultsHandler = (results: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear Canvas and Draw mirrored video stream as BG
    ctx.save();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw mirrored background
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    // Map Index Finger Tip (Landmark 8)
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      const landmarks = results.multiHandLandmarks[0];
      const indexTip = landmarks[8]; // Landmark 8: INDEX_FINGER_TIP

      // Mirror X coordinates for direct mapping
      const fingerX = (1 - indexTip.x) * canvas.width;
      const fingerY = indexTip.y * canvas.height;
      setFingerPos({ x: fingerX, y: fingerY });

      // Draw skeleton connecting joints (mirrored on canvas)
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00E5FF';

      // Simple bone connections
      const fingers = [
        [0, 1, 2, 3, 4],     // Thumb
        [0, 5, 6, 7, 8],     // Index
        [9, 10, 11, 12],     // Middle
        [13, 14, 15, 16],    // Ring
        [0, 17, 18, 19, 20], // Pinky
        [5, 9, 13, 17]       // Palm base
      ];

      fingers.forEach((joints) => {
        ctx.beginPath();
        for (let i = 0; i < joints.length; i++) {
          const pt = landmarks[joints[i]];
          const px = (1 - pt.x) * canvas.width;
          const py = pt.y * canvas.height;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      });

      // Draw Joint Nodes
      ctx.fillStyle = '#C084FC';
      ctx.shadowBlur = 4;
      landmarks.forEach((pt: any) => {
        const px = (1 - pt.x) * canvas.width;
        const py = pt.y * canvas.height;
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, 2 * Math.PI);
        ctx.fill();
      });

      // Draw Finger Pointer Dot
      ctx.fillStyle = '#00E5FF';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#00E5FF';
      ctx.beginPath();
      ctx.arc(fingerX, fingerY, 10, 0, 2 * Math.PI);
      ctx.fill();
    } else {
      setFingerPos({ x: -100, y: -100 });
    }

    // Reset shadows for drawing bubbles
    ctx.shadowBlur = 0;
  };

  // Frame rendering and collision detection loop
  useEffect(() => {
    if (!isCameraActive) return;

    const renderLoop = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) return;

      // Draw/Update Bubbles
      setBubbles((prevBubbles) => {
        const updated = prevBubbles.map((bubble) => {
          if (bubble.popped) return bubble;

          // Collision Detection (Distance formula)
          const dist = Math.hypot(fingerPos.x - bubble.x, fingerPos.y - bubble.y);
          if (dist < bubble.radius) {
            return { ...bubble, popped: true };
          }
          return bubble;
        });

        // Trigger Score increments on popped events
        updated.forEach((bubble) => {
          if (bubble.popped && !bubble.scoreAwarded) {
            bubble.scoreAwarded = true;
            setScore((prev) => prev + 1);
            toast('🫧 Bubble popped! +1', { icon: '✨' });
          }
        });

        // If all bubbles are popped, spawn new ones!
        const allPopped = updated.every((b) => b.popped);
        if (allPopped && updated.length > 0) {
          setTimeout(() => {
            generateBubbles(canvas.width, canvas.height);
          }, 300);
        }

        return updated;
      });

      // Draw Game Elements on top of the mirrored video
      bubbles.forEach((bubble) => {
        if (bubble.popped) {
          // Draw pop splash rings
          ctx.strokeStyle = bubble.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(bubble.x, bubble.y, 45, 0, 2 * Math.PI);
          ctx.stroke();
          return;
        }

        // Draw neon bubble
        ctx.save();
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, 2 * Math.PI);
        
        ctx.strokeStyle = bubble.color;
        ctx.lineWidth = 4;
        ctx.shadowBlur = 15;
        ctx.shadowColor = bubble.color;
        ctx.stroke();

        // Shiny glass overlay reflection
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(bubble.x - 10, bubble.y - 10, 10, 1.25 * Math.PI, 1.75 * Math.PI);
        ctx.stroke();
        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isCameraActive, fingerPos, bubbles]);

  // Clean up streams on unmount
  useEffect(() => {
    return () => {
      if (activeCameraRef.current) {
        activeCameraRef.current.stop();
      }
      if (activeHandsRef.current) {
        activeHandsRef.current.close();
      }
    };
  }, []);

  const handleReset = () => {
    setScore(0);
    if (canvasRef.current) {
      generateBubbles(canvasRef.current.width, canvasRef.current.height);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto glass-strong rounded-2xl border border-white/10 p-6 flex flex-col items-center gap-6 shadow-2xl">
      <div className="text-center space-y-2">
        <h3 className="font-grotesk font-black text-xl text-silver-bright flex items-center justify-center gap-2">
          <Camera className="text-cyan-DEFAULT" size={22} />
          Computer Vision Gesture Playground
        </h3>
        <p className="text-silver-dim text-xs leading-relaxed max-w-md">
          Proves our <strong>Gesture Virtual Mouse</strong> logic in-browser! Enable your camera, wave your hand, and pop bubbles using your index finger.
        </p>
      </div>

      {/* Camera Feed / Active Viewport */}
      <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-obsidian-900 border border-white/5 flex items-center justify-center shadow-inner">
        {/* Hidden video element used as feed input for MediaPipe */}
        <video
          ref={videoRef}
          className="absolute hidden"
          width="640"
          height="480"
          playsInline
          muted
        />

        {/* Canvas that renders the mirrored feed + hand bones + target bubbles */}
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          className="w-full h-full object-cover scale-x-[-1] pointer-events-none absolute z-10"
        />

        {/* Mirrored canvas doesn't map overlays nicely, we overlay normal drawing */}
        <canvas
          ref={canvasRef}
          width="640"
          height="480"
          className="w-full h-full object-cover absolute z-20"
        />

        {/* Standby Cover (when camera is inactive) */}
        {!isCameraActive && (
          <div className="absolute inset-0 bg-obsidian-900/90 z-30 flex flex-col items-center justify-center p-8 text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-cyan-DEFAULT/10 border border-cyan-DEFAULT/30 flex items-center justify-center animate-pulse">
              <Camera size={28} className="text-cyan-DEFAULT" />
            </div>
            
            {cameraError ? (
              <div className="space-y-2 text-red-400 max-w-sm">
                <AlertCircle size={24} className="mx-auto" />
                <h4 className="font-bold">Camera Access Failed</h4>
                <p className="text-xs">Make sure permissions are granted and no other application is utilizing the camera feed.</p>
              </div>
            ) : (
              <div className="space-y-1 max-w-xs">
                <h4 className="font-grotesk font-semibold text-silver-bright">Hands-free Demo Ready</h4>
                <p className="text-xs text-silver-dim">MediaPipe is loaded entirely client-side for zero latency and safe local data streaming.</p>
              </div>
            )}

            <button
              onClick={startCameraPipeline}
              disabled={isLoadingScripts || isModelLoading}
              className="px-6 py-3 rounded-xl bg-cyan-DEFAULT text-obsidian-900 font-grotesk font-black text-sm hover:bg-cyan-muted hover:scale-105 disabled:opacity-60 transition-all cursor-pointer shadow-lg shadow-cyan-glow"
            >
              {isLoadingScripts ? 'Downloading AI Scripts…' : isModelLoading ? 'Initializing Models…' : 'Activate Web Camera'}
            </button>
          </div>
        )}
      </div>

      {/* Dashboard & Scores */}
      {isCameraActive && (
        <div className="w-full flex items-center justify-between border-t border-white/5 pt-4 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
              <Award className="text-green-400" size={20} />
            </div>
            <div>
              <p className="text-silver-dim text-[10px] uppercase font-bold tracking-wider">Score Board</p>
              <h5 className="font-grotesk font-black text-silver-bright leading-none text-base">{score} Bubbles Popped</h5>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-silver-mid hover:text-cyan-DEFAULT hover:border-cyan-DEFAULT/20 text-xs font-semibold transition-all cursor-pointer"
          >
            <RefreshCw size={12} />
            Reset Score
          </button>
        </div>
      )}
    </div>
  );
}
