import React, { useState, useRef, useEffect } from 'react';
import { Product } from '../types';
import {
  X,
  Camera,
  RefreshCw,
  ShoppingBag,
  Sliders,
  Scissors,
  Check,
  Download,
  AlertCircle,
  Eye,
  Maximize2,
  Sparkles,
  User,
  Move
} from 'lucide-react';

interface VirtualFittingRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  initialProduct?: Product | null;
  onAddToCart: (product: Product, size: string) => void;
  onBookFitting: () => void;
}

// Bespoke Garment Cutout SVG definitions for realistic fit overlays
interface GarmentOverlaySpec {
  id: string;
  name: string;
  type: 'tuxedo' | 'blazer' | 'bandhgala' | 'overshirt' | 'linen';
  categoryLabel: string;
  price: number;
  colorName: string;
}

export default function VirtualFittingRoomModal({
  isOpen,
  onClose,
  products,
  initialProduct,
  onAddToCart,
  onBookFitting,
}: VirtualFittingRoomModalProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product>(() => {
    return initialProduct || products[0];
  });

  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [isFlipped, setIsFlipped] = useState(true);

  // Overlay tuning controls
  const [scale, setScale] = useState(100); // 70 to 140%
  const [offsetY, setOffsetY] = useState(25); // -100 to 100 px
  const [offsetX, setOffsetX] = useState(0); // -100 to 100 px
  const [opacity, setOpacity] = useState(95); // 50 to 100%
  const [showGuide, setShowGuide] = useState(true);
  const [snapshotUrl, setSnapshotUrl] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState('40R');
  const [isAdded, setIsAdded] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Synchronize when initialProduct changes
  useEffect(() => {
    if (initialProduct) {
      setSelectedProduct(initialProduct);
      if (initialProduct.availableSizes.length > 0) {
        setSelectedSize(initialProduct.availableSizes[0]);
      }
    }
  }, [initialProduct]);

  // Handle camera stream setup and tear-down
  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setSnapshotUrl(null);
      return;
    }

    if (!isDemoMode) {
      startCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen, isDemoMode]);

  const startCamera = async () => {
    try {
      setCameraError(null);
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera device not supported by this browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
      setHasCameraPermission(true);
    } catch (err: any) {
      console.warn('Camera access unavailable:', err);
      setCameraError(err.message || 'Camera permission denied or camera not found.');
      setHasCameraPermission(false);
      // Fallback seamlessly to demo model mirror
      setIsDemoMode(true);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const handleCaptureSnapshot = () => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement('canvas');
    const width = 800;
    const height = 900;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw background (video or demo backdrop)
    if (videoRef.current && hasCameraPermission && !isDemoMode) {
      ctx.save();
      if (isFlipped) {
        ctx.translate(width, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(videoRef.current, 0, 0, width, height);
      ctx.restore();
    } else {
      // Demo backdrop
      ctx.fillStyle = '#141416';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#26262b';
      ctx.beginPath();
      ctx.arc(width / 2, height / 2 - 80, 110, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add luxury watermark branding
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(0, height - 70, width, 70);

    ctx.fillStyle = '#C5A059';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText('TS MENSWEAR · SPENCER PLAZA', 30, height - 38);

    ctx.fillStyle = '#ffffff';
    ctx.font = '14px sans-serif';
    ctx.fillText(`Virtual Fitting: ${selectedProduct.name} (${selectedSize})`, 30, height - 16);

    const dataUrl = canvas.toDataURL('image/png');
    setSnapshotUrl(dataUrl);
  };

  const handleAddLook = () => {
    onAddToCart(selectedProduct, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Backdrop click */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Fitting Room Container */}
      <div className="relative bg-[#0d0d0d] border border-white/15 rounded-2xl max-w-5xl w-full overflow-hidden shadow-2xl z-10 my-4 flex flex-col max-h-[95vh]">
        {/* Top Header */}
        <div className="p-4 md:p-5 border-b border-white/10 flex items-center justify-between bg-zinc-950">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-[#c5a059]/10 border border-[#c5a059]/20 text-[#c5a059]">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c5a059] font-medium">
                <span>AR Mirror Experience</span>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span>Spencer Plaza Atelier</span>
              </div>
              <h2 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight">
                Virtual Bespoke Fitting Room
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Camera / Demo Toggle */}
            <button
              onClick={() => setIsDemoMode(!isDemoMode)}
              className={`px-3 py-1.5 text-xs rounded-md border font-medium transition-colors ${
                isDemoMode
                  ? 'bg-zinc-800 text-white border-white/20'
                  : 'bg-zinc-900/80 text-zinc-300 border-white/10 hover:border-white/20'
              }`}
            >
              {isDemoMode ? 'Demo Studio Mode' : 'Live Camera Mode'}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close fitting room"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Body: Fitting Mirror Stage + Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
          {/* Mirror Display Viewport (8 Cols) */}
          <div className="lg:col-span-8 bg-black relative flex items-center justify-center overflow-hidden min-h-[380px] sm:min-h-[480px]">
            <div
              ref={containerRef}
              className="relative w-full h-full min-h-[420px] sm:min-h-[500px] flex items-center justify-center bg-zinc-950 select-none overflow-hidden"
            >
              {/* 1. Base Layer: Real Camera Video Stream or Demo Studio Backdrop */}
              {!isDemoMode ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-200 ${
                    isFlipped ? 'scale-x-[-1]' : 'scale-x-1'
                  }`}
                />
              ) : (
                /* Demo Studio Backdrop with subtle mannequin silhouette */
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#18181b] via-[#101012] to-[#09090a]">
                  <div className="w-52 h-64 rounded-full bg-zinc-800/40 border border-white/5 blur-[1px] flex items-center justify-center">
                    <User className="w-36 h-36 text-zinc-700/60 stroke-1" />
                  </div>
                  <span className="text-zinc-500 font-mono text-[11px] mt-4 uppercase tracking-widest">
                    Studio Mannequin Mirror Feed
                  </span>
                </div>
              )}

              {/* 2. Optional Shoulder Alignment Guide */}
              {showGuide && (
                <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center opacity-40">
                  <div className="w-64 h-72 border-2 border-dashed border-[#c5a059] rounded-t-full relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black px-2 text-[10px] text-[#c5a059] font-mono uppercase tracking-wider">
                      Align Shoulders Here
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Bespoke Garment Overlay */}
              <div
                className="absolute pointer-events-none transition-transform duration-75 ease-out flex items-center justify-center will-change-transform"
                style={{
                  transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale / 100})`,
                  opacity: opacity / 100,
                  width: '420px',
                  height: '520px',
                }}
              >
                {/* SVG Render of Selected Formalwear Item */}
                <svg
                  viewBox="0 0 400 500"
                  className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)] filter contrast-105"
                >
                  <defs>
                    <linearGradient id="charcoalWool" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2c2c30" />
                      <stop offset="50%" stopColor="#18181b" />
                      <stop offset="100%" stopColor="#0f0f11" />
                    </linearGradient>

                    <linearGradient id="navyWool" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1e293b" />
                      <stop offset="50%" stopColor="#0f172a" />
                      <stop offset="100%" stopColor="#090d16" />
                    </linearGradient>

                    <linearGradient id="rawSilk" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3d2c1d" />
                      <stop offset="50%" stopColor="#22170f" />
                      <stop offset="100%" stopColor="#140d08" />
                    </linearGradient>

                    <linearGradient id="satinLapel" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#45454a" />
                      <stop offset="50%" stopColor="#1a1a1c" />
                      <stop offset="100%" stopColor="#0a0a0c" />
                    </linearGradient>

                    <linearGradient id="goldButton" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f3e1a6" />
                      <stop offset="50%" stopColor="#c5a059" />
                      <stop offset="100%" stopColor="#8d6c29" />
                    </linearGradient>
                  </defs>

                  {/* Rendering based on category */}
                  {selectedProduct.category === 'suits' && selectedProduct.id === 'ts-01' ? (
                    /* The Spencer Peak-Lapel Tuxedo */
                    <g id="tuxedo">
                      {/* Left & Right Shoulders and Body */}
                      <path
                        d="M 120 70 L 60 120 L 75 390 L 160 410 L 200 410 L 240 410 L 325 390 L 340 120 L 280 70 L 245 85 C 220 95, 180 95, 155 85 Z"
                        fill="url(#charcoalWool)"
                        stroke="#3f3f46"
                        strokeWidth="1.5"
                      />
                      {/* Left Arm Sleeves */}
                      <path
                        d="M 60 120 L 30 260 L 55 370 L 85 365 L 75 220 L 80 140 Z"
                        fill="#18181b"
                        stroke="#27272a"
                      />
                      {/* Right Arm Sleeves */}
                      <path
                        d="M 340 120 L 370 260 L 345 370 L 315 365 L 325 220 L 320 140 Z"
                        fill="#18181b"
                        stroke="#27272a"
                      />
                      {/* Crisp White Shirt Collar & Black Silk Bowtie */}
                      <polygon points="175,85 200,120 185,125 165,95" fill="#f4f4f5" />
                      <polygon points="225,85 200,120 215,125 235,95" fill="#f4f4f5" />
                      {/* Bowtie */}
                      <polygon points="180,105 220,105 200,118" fill="#000000" />
                      <polygon points="180,130 220,130 200,118" fill="#000000" />
                      <circle cx="200" cy="118" r="4" fill="#27272a" />
                      {/* Peak Lapels (Silk Satin) */}
                      <path
                        d="M 160 85 L 140 160 L 115 145 L 155 240 L 200 280 L 200 130 Z"
                        fill="url(#satinLapel)"
                        stroke="#52525b"
                        strokeWidth="1"
                      />
                      <path
                        d="M 240 85 L 260 160 L 285 145 L 245 240 L 200 280 L 200 130 Z"
                        fill="url(#satinLapel)"
                        stroke="#52525b"
                        strokeWidth="1"
                      />
                      {/* Satin Covered Front Button */}
                      <circle cx="200" cy="295" r="7" fill="#09090b" stroke="#52525b" strokeWidth="1" />
                      {/* Breast Pocket with Silk Pocket Square */}
                      <rect x="120" y="200" width="35" height="5" fill="#09090b" />
                      <polygon points="125,200 135,185 142,200" fill="#f4f4f5" />
                    </g>
                  ) : selectedProduct.id === 'ts-02' ? (
                    /* Anna Salai Double-Breasted 6x2 Navy Blazer */
                    <g id="doubleBreasted">
                      {/* Torso */}
                      <path
                        d="M 125 65 L 55 120 L 70 400 L 160 415 L 240 415 L 330 400 L 345 120 L 275 65 L 240 80 C 215 90, 185 90, 160 80 Z"
                        fill="url(#navyWool)"
                        stroke="#334155"
                        strokeWidth="1.5"
                      />
                      {/* Sleeves */}
                      <path d="M 55 120 L 30 270 L 55 380 L 80 375 L 70 210 Z" fill="#0f172a" stroke="#1e293b" />
                      <path d="M 345 120 L 370 270 L 345 380 L 320 375 L 330 210 Z" fill="#0f172a" stroke="#1e293b" />
                      {/* Sweeping Wide Peak Lapels */}
                      <path
                        d="M 160 80 L 130 170 L 105 155 L 145 270 L 225 310 L 200 120 Z"
                        fill="#0f172a"
                        stroke="#475569"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M 240 80 L 270 170 L 295 155 L 255 270 L 175 310 L 200 120 Z"
                        fill="#1e293b"
                        stroke="#475569"
                        strokeWidth="1.2"
                      />
                      {/* Chennai Gold 6x2 Buttons */}
                      <circle cx="178" cy="265" r="7" fill="url(#goldButton)" stroke="#fff" strokeWidth="0.5" />
                      <circle cx="222" cy="265" r="7" fill="url(#goldButton)" stroke="#fff" strokeWidth="0.5" />
                      <circle cx="178" cy="305" r="7" fill="url(#goldButton)" stroke="#fff" strokeWidth="0.5" />
                      <circle cx="222" cy="305" r="7" fill="url(#goldButton)" stroke="#fff" strokeWidth="0.5" />
                      <circle cx="178" cy="345" r="7" fill="url(#goldButton)" stroke="#fff" strokeWidth="0.5" />
                      <circle cx="222" cy="345" r="7" fill="url(#goldButton)" stroke="#fff" strokeWidth="0.5" />
                    </g>
                  ) : selectedProduct.id === 'ts-03' ? (
                    /* Chettinad Raw Silk Bandhgala */
                    <g id="bandhgala">
                      {/* Torso */}
                      <path
                        d="M 125 70 L 60 125 L 75 420 L 160 425 L 240 425 L 325 420 L 340 125 L 275 70 L 235 75 C 215 80, 185 80, 165 75 Z"
                        fill="url(#rawSilk)"
                        stroke="#5c4028"
                        strokeWidth="1.5"
                      />
                      {/* Sleeves */}
                      <path d="M 60 125 L 35 270 L 60 380 L 85 375 L 75 210 Z" fill="#22170f" stroke="#3d2c1d" />
                      <path d="M 340 125 L 365 270 L 340 380 L 315 375 L 325 210 Z" fill="#22170f" stroke="#3d2c1d" />
                      {/* Mandarin Stand Collar */}
                      <path
                        d="M 165 75 C 180 65, 220 65, 235 75 L 235 95 C 220 85, 180 85, 165 95 Z"
                        fill="#3d2c1d"
                        stroke="url(#goldButton)"
                        strokeWidth="1.5"
                      />
                      {/* 7 Antique Brass Center Buttons */}
                      {[120, 160, 200, 240, 280, 320, 360].map((y, i) => (
                        <circle key={i} cx="200" cy={y} r="5" fill="url(#goldButton)" stroke="#000" strokeWidth="0.5" />
                      ))}
                      {/* Center placket line */}
                      <line x1="200" y1="95" x2="200" y2="425" stroke="#3d2c1d" strokeWidth="2" />
                    </g>
                  ) : (
                    /* General Bespoke Blazer & Overshirt Silhouette */
                    <g id="generalBlazer">
                      <path
                        d="M 125 70 L 60 125 L 75 400 L 160 415 L 240 415 L 325 400 L 340 125 L 275 70 L 235 85 C 215 95, 185 95, 165 85 Z"
                        fill="#18181b"
                        stroke="#3f3f46"
                        strokeWidth="1.5"
                      />
                      <path d="M 60 125 L 35 270 L 60 380 L 85 375 L 75 210 Z" fill="#121214" stroke="#27272a" />
                      <path d="M 340 125 L 365 270 L 340 380 L 315 375 L 325 210 Z" fill="#121214" stroke="#27272a" />
                      {/* Open lapel view */}
                      <polygon points="165,85 145,210 200,260 200,105" fill="#27272a" stroke="#3f3f46" />
                      <polygon points="235,85 255,210 200,260 200,105" fill="#27272a" stroke="#3f3f46" />
                      <circle cx="200" cy="275" r="6" fill="#c5a059" />
                      <circle cx="200" cy="320" r="6" fill="#c5a059" />
                    </g>
                  )}
                </svg>
              </div>

              {/* Floating Camera / Mirror Status Tag */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] text-zinc-300">
                <span className={`w-2 h-2 rounded-full ${!isDemoMode && hasCameraPermission ? 'bg-emerald-500 animate-pulse' : 'bg-[#c5a059]'}`} />
                <span>{!isDemoMode && hasCameraPermission ? 'Live Camera Feed' : 'Studio Mirror Demo'}</span>
              </div>

              {/* Quick Mirror Controls (Flip, Guides) */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5">
                <button
                  onClick={() => setIsFlipped(!isFlipped)}
                  title="Flip Mirror"
                  className="p-2 rounded-full bg-black/75 hover:bg-black text-zinc-300 hover:text-white border border-white/10 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setShowGuide(!showGuide)}
                  title="Toggle Shoulder Alignment Guideline"
                  className={`p-2 rounded-full border transition-colors ${
                    showGuide
                      ? 'bg-[#c5a059] text-black border-[#c5a059]'
                      : 'bg-black/75 text-zinc-400 border-white/10'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Bottom Snapshot Action Button */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
                <button
                  onClick={handleCaptureSnapshot}
                  className="px-5 py-2.5 bg-white text-black hover:bg-[#c5a059] rounded-full font-semibold text-xs uppercase tracking-wider transition-colors shadow-2xl flex items-center gap-2 cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>Capture Fit Snapshot</span>
                </button>
              </div>
            </div>

            {/* Snapshot Preview Dialog Overlay if photo taken */}
            {snapshotUrl && (
              <div className="absolute inset-0 bg-black/90 backdrop-blur-md z-30 p-6 flex flex-col items-center justify-center animate-fadeIn">
                <div className="max-w-sm w-full bg-zinc-950 p-4 rounded-xl border border-white/15 text-center space-y-4">
                  <div className="flex items-center justify-between text-xs text-[#c5a059]">
                    <span className="uppercase tracking-widest font-mono">Boutique Fit Capture</span>
                    <button
                      onClick={() => setSnapshotUrl(null)}
                      className="p-1 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="aspect-[4/5] rounded-lg overflow-hidden border border-white/10 bg-black">
                    <img src={snapshotUrl} alt="Snapshot Preview" className="w-full h-full object-cover" />
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={snapshotUrl}
                      download={`TS-Menswear-Fit-${selectedProduct.id}.png`}
                      className="flex-1 py-2.5 bg-[#c5a059] text-black font-semibold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Save Photo</span>
                    </a>
                    <button
                      onClick={() => setSnapshotUrl(null)}
                      className="px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs uppercase tracking-wider rounded"
                    >
                      Retake
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Controls Panel (4 Cols) */}
          <div className="lg:col-span-4 p-5 md:p-6 bg-zinc-950 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 overflow-y-auto max-h-[550px] lg:max-h-none">
            <div className="space-y-6">
              {/* Active Garment Card */}
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#c5a059] font-mono block mb-1">
                  Currently Trying On
                </span>
                <h3 className="font-display text-xl font-bold text-white leading-tight">
                  {selectedProduct.name}
                </h3>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-mono text-base font-semibold text-white">
                    ₹{selectedProduct.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">
                    · {selectedProduct.categoryLabel}
                  </span>
                </div>
              </div>

              {/* Garment Selector Carousel */}
              <div>
                <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium block mb-2">
                  Select Garment to Visualize:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {products.slice(0, 4).map((p) => {
                    const isCurrent = selectedProduct.id === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => {
                          setSelectedProduct(p);
                          if (p.availableSizes.length > 0) setSelectedSize(p.availableSizes[0]);
                        }}
                        className={`p-2.5 rounded-lg border text-left text-xs transition-colors flex flex-col justify-between ${
                          isCurrent
                            ? 'border-[#c5a059] bg-[#c5a059]/10 text-white'
                            : 'border-white/10 bg-zinc-900/60 text-zinc-400 hover:border-white/20'
                        }`}
                      >
                        <span className="font-medium text-white truncate text-[11px]">{p.name}</span>
                        <span className="font-mono text-[10px] text-[#c5a059] mt-1">₹{p.price.toLocaleString('en-IN')}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Fine Fit Adjustment Controls */}
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-white/5 space-y-3.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-300 font-medium flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Fit Scaling & Placement</span>
                  </span>
                  <button
                    onClick={() => {
                      setScale(100);
                      setOffsetY(25);
                      setOffsetX(0);
                      setOpacity(95);
                    }}
                    className="text-[10px] text-zinc-500 hover:text-white"
                  >
                    Reset
                  </button>
                </div>

                {/* Scale (Jacket Size / Distance) */}
                <div>
                  <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                    <span>Jacket Scale (Torso Width)</span>
                    <span className="font-mono text-white">{scale}%</span>
                  </div>
                  <input
                    type="range"
                    min="75"
                    max="135"
                    value={scale}
                    onChange={(e) => setScale(Number(e.target.value))}
                    className="w-full accent-[#c5a059] cursor-pointer"
                  />
                </div>

                {/* Vertical Offset (Shoulder Height) */}
                <div>
                  <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                    <span>Vertical Position (Shoulder Line)</span>
                    <span className="font-mono text-white">{offsetY}px</span>
                  </div>
                  <input
                    type="range"
                    min="-60"
                    max="90"
                    value={offsetY}
                    onChange={(e) => setOffsetY(Number(e.target.value))}
                    className="w-full accent-[#c5a059] cursor-pointer"
                  />
                </div>

                {/* Opacity Drape Blend */}
                <div>
                  <div className="flex justify-between text-[11px] text-zinc-400 mb-1">
                    <span>Overlay Blend</span>
                    <span className="font-mono text-white">{opacity}%</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="100"
                    value={opacity}
                    onChange={(e) => setOpacity(Number(e.target.value))}
                    className="w-full accent-[#c5a059] cursor-pointer"
                  />
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <label className="text-xs uppercase tracking-wider text-zinc-400 font-medium block mb-2">
                  Select Preferred Size:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProduct.availableSizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 text-xs font-mono rounded transition-colors ${
                        selectedSize === sz
                          ? 'bg-[#c5a059] text-black font-bold'
                          : 'bg-zinc-900 text-zinc-300 hover:text-white border border-white/10'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="space-y-2.5 pt-6 border-t border-white/10 mt-6">
              <button
                onClick={handleAddLook}
                className={`w-full py-3 rounded-md font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
                  isAdded ? 'bg-emerald-500 text-black' : 'bg-white text-black hover:bg-[#c5a059]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add This Look to Bag</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  onClose();
                  onBookFitting();
                }}
                className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 rounded-md text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
              >
                <Scissors className="w-3.5 h-3.5 text-[#c5a059]" />
                <span>Reserve Physical Fitting in Spencer Plaza</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
