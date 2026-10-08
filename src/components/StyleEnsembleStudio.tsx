import React, { useState, useRef, useEffect } from 'react';
import { CURATED_STYLE_ENSEMBLES, INITIAL_PRODUCTS, StyleEnsemble } from '../data/products';
import { Product } from '../types';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, ShoppingBag, ArrowRight, Scissors, Check, Eye, Film, Maximize2 } from 'lucide-react';
import FashionImage from './FashionImage';

interface StyleEnsembleStudioProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, size: string) => void;
  onBookFitting: () => void;
}

const MOTION_VIDEOS = [
  {
    id: 'vid-01',
    title: 'Runway Drape & Movement',
    subtitle: 'Atelier Spring/Summer Cut',
    src: '/videos/hero_fashion_motion.mp4',
    badge: 'Video 01',
    duration: '0:15',
  },
  {
    id: 'vid-02',
    title: 'Bespoke Suits & Tailoring',
    subtitle: 'Italian Wool & Structured Canvas',
    src: '/videos/suit_tailor_motion.mp4',
    badge: 'Video 02',
    duration: '0:12',
  },
  {
    id: 'vid-03',
    title: 'Ceremonial Dresses & Sherwani',
    subtitle: 'Handloom Raw Silk & Festive Grandeur',
    src: '/videos/dress_ceremonial_motion.mp4',
    badge: 'Video 03',
    duration: '0:12',
  },
];

export default function StyleEnsembleStudio({
  onSelectProduct,
  onAddToCart,
  onBookFitting,
}: StyleEnsembleStudioProps) {
  const [selectedEnsembleIndex, setSelectedEnsembleIndex] = useState(0);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [addedEnsemble, setAddedEnsemble] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(15);
  const videoRef = useRef<HTMLVideoElement>(null);

  const currentEnsemble: StyleEnsemble = CURATED_STYLE_ENSEMBLES[selectedEnsembleIndex];
  const activeVideo = MOTION_VIDEOS[activeVideoIndex];

  // Resolve pieces to actual product objects
  const ensembleProducts = currentEnsemble.pieces.map((piece) => {
    const prod = INITIAL_PRODUCTS.find((p) => p.id === piece.productId) || INITIAL_PRODUCTS[0];
    return {
      role: piece.role,
      product: prod,
    };
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration);
      }
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [activeVideoIndex]);

  const handleSelectVideo = (idx: number) => {
    setActiveVideoIndex(idx);
    if (videoRef.current) {
      videoRef.current.src = MOTION_VIDEOS[idx].src;
      videoRef.current.load();
      videoRef.current.play().then(() => setIsVideoPlaying(true)).catch(() => {});
    }
  };

  const handleTogglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsVideoPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  const handleToggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  const handleAddFullEnsemble = () => {
    ensembleProducts.forEach(({ product }) => {
      onAddToCart(product, product.availableSizes[0] || 'Standard');
    });
    setAddedEnsemble(true);
    setTimeout(() => setAddedEnsemble(false), 2500);
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <section id="ensembles" className="py-20 md:py-28 px-4 sm:px-6 lg:px-12 bg-[#0c0c0e] border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a059] mb-2 font-medium">
              <Film className="w-4 h-4 text-[#c5a059]" />
              <span>Spencer Plaza Atelier</span>
              <span aria-hidden="true" className="text-zinc-600">·</span>
              <span>Fashion Motion Studio & Style Editions</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white uppercase">
              Motion Studio & Ensembles
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-lg font-light leading-relaxed">
            Experience our tailored garments and ceremonial dresses in continuous motion. Watch how fine Italian wool, Irish linen, and handspun raw silk drape and move in high definition.
          </p>
        </div>

        {/* Video Selector Shelf (Direct Access to All 3 Videos) */}
        <div className="mb-10 bg-zinc-950/80 p-4 rounded-2xl border border-white/10">
          <div className="flex items-center justify-between mb-3 text-xs uppercase tracking-wider text-zinc-400 font-mono">
            <span className="flex items-center gap-2 text-[#c5a059]">
              <Film className="w-3.5 h-3.5" />
              <span>Select Motion Video Clip (3 Ready to Play)</span>
            </span>
            <span className="text-zinc-500">1080p High-Bitrate MP4</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {MOTION_VIDEOS.map((vid, idx) => {
              const isActive = idx === activeVideoIndex;
              return (
                <button
                  key={vid.id}
                  onClick={() => handleSelectVideo(idx)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-[#c5a059]/15 border-[#c5a059] text-white shadow-lg shadow-[#c5a059]/10'
                      : 'bg-zinc-900/60 border-white/5 hover:border-white/20 text-zinc-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-[#c5a059] text-black' : 'bg-white/10 text-zinc-300'
                    }`}>
                      <Play className="w-3.5 h-3.5 ml-0.5" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-white line-clamp-1">{vid.title}</div>
                      <div className="text-[11px] text-zinc-400 line-clamp-1">{vid.subtitle}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-[#c5a059] border border-white/10 ml-2">
                    {vid.duration}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Stage: Left Look Breakdown, Right Live Video Reel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Ensemble Showcase & Piece Breakdown (7 Columns) */}
          <div className="lg:col-span-7 bg-zinc-950 rounded-2xl border border-white/10 p-6 md:p-8 flex flex-col justify-between shadow-xl">
            <div>
              {/* Header of Active Ensemble */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="px-2.5 py-1 rounded bg-[#c5a059]/15 text-[#c5a059] border border-[#c5a059]/30 text-xs font-mono uppercase tracking-wider">
                  {currentEnsemble.occasion}
                </span>
                <span className="text-xs text-zinc-400 font-mono">
                  Save 15% on complete styling
                </span>
              </div>

              <h3 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-2">
                {currentEnsemble.name}
              </h3>
              <p className="text-xs md:text-sm text-zinc-300 font-light leading-relaxed mb-6">
                {currentEnsemble.description}
              </p>

              {/* Garment Piece Breakdown */}
              <div className="space-y-3 mb-6">
                <span className="text-xs uppercase tracking-widest text-zinc-500 font-mono block">
                  Included Bespoke Pieces
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {ensembleProducts.map(({ role, product }) => (
                    <div
                      key={product.id}
                      onClick={() => onSelectProduct(product)}
                      className="group p-3 rounded-xl bg-zinc-900/80 border border-white/10 hover:border-[#c5a059] transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2 bg-black">
                        <FashionImage
                          src={product.image}
                          alt={product.name}
                          productType={product.category === 'suits' ? 'suit' : product.category === 'heritage' ? 'bandhgala' : product.category === 'linen' ? 'linen' : 'accessories'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-1.5 left-1.5 bg-black/80 px-1.5 py-0.5 rounded text-[9px] font-mono text-[#c5a059] border border-white/10">
                          {role}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-white truncate group-hover:text-[#c5a059] transition-colors">
                          {product.name}
                        </h4>
                        <div className="flex items-center justify-between text-[11px] text-zinc-400 mt-1">
                          <span className="font-mono text-zinc-300">₹{product.price.toLocaleString('en-IN')}</span>
                          <span className="text-[#c5a059] flex items-center gap-0.5 text-[10px]">
                            <Eye className="w-3 h-3" /> View
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Price & Action Row */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-zinc-500 uppercase tracking-wider block font-mono">
                  Complete Ensemble Price
                </span>
                <div className="flex items-baseline gap-2.5">
                  <span className="font-display text-2xl md:text-3xl font-bold text-white">
                    ₹{currentEnsemble.ensemblePrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-zinc-500 line-through">
                    ₹{currentEnsemble.originalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddFullEnsemble}
                  className={`px-5 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    addedEnsemble
                      ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                      : 'bg-white text-black hover:bg-[#c5a059] shadow-lg'
                  }`}
                >
                  {addedEnsemble ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added 3 Pieces</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add Ensemble to Bag</span>
                    </>
                  )}
                </button>
                <button
                  onClick={onBookFitting}
                  className="px-4 py-3 rounded-lg text-xs font-medium uppercase tracking-wider text-zinc-300 hover:text-white border border-white/15 hover:border-[#c5a059] transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Reserve in-store fitting trial at Spencer Plaza"
                >
                  <Scissors className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>Book Trial</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: AI-Generated Motion Video Reel (5 Columns) */}
          <div className="lg:col-span-5 bg-zinc-950 rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col sticky top-24">
            <div className="relative aspect-[4/5] bg-black overflow-hidden flex items-center justify-center group">
              {/* Motion Video */}
              <video
                ref={videoRef}
                src={activeVideo.src}
                poster={currentEnsemble.image}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
              />

              {/* Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none" />

              {/* Video Badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <div className="bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-mono tracking-widest text-[#c5a059] border border-[#c5a059]/40 flex items-center gap-2 uppercase shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{activeVideo.title}</span>
                </div>
              </div>

              {/* Play / Pause Centered Click Target */}
              <button
                onClick={handleTogglePlay}
                className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 cursor-pointer"
                aria-label={isVideoPlaying ? "Pause motion video" : "Play motion video"}
              >
                <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl hover:scale-105 transition-transform">
                  {isVideoPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                </div>
              </button>

              {/* Bottom Video Meta */}
              <div className="absolute bottom-5 left-5 right-5 z-10 text-left pointer-events-none">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#c5a059]">
                  Spencer Plaza Flagship Video Feed
                </span>
                <p className="text-sm text-white font-semibold drop-shadow-md">
                  {activeVideo.subtitle}
                </p>
              </div>
            </div>

            {/* Video Control Bar */}
            <div className="p-4 bg-zinc-900/95 border-t border-white/10 flex flex-col gap-2.5">
              {/* Scrubbing Timeline Slider */}
              <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400">
                <span className="tabular-nums">{formatSeconds(currentTime)}</span>
                <input
                  type="range"
                  min="0"
                  max={duration || 15}
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeek}
                  className="flex-1 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-[#c5a059]"
                />
                <span className="tabular-nums">{formatSeconds(duration || 15)}</span>
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleTogglePlay}
                    className="p-1.5 hover:text-white transition-colors cursor-pointer text-[#c5a059]"
                    aria-label={isVideoPlaying ? "Pause" : "Play"}
                  >
                    {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        videoRef.current.currentTime = 0;
                        videoRef.current.play().catch(() => {});
                      }
                    }}
                    className="p-1.5 hover:text-white transition-colors cursor-pointer text-zinc-400"
                    title="Restart"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline">1080p MP4</span>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Speed buttons */}
                  <div className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded border border-white/10 text-[10px]">
                    {[0.5, 1.0, 1.5].map((spd) => (
                      <button
                        key={spd}
                        onClick={() => handleSpeedChange(spd)}
                        className={`px-1.5 py-0.5 rounded cursor-pointer ${
                          playbackSpeed === spd ? 'bg-[#c5a059] text-black font-semibold' : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        {spd}x
                      </button>
                    ))}
                  </div>

                  {/* Sound Toggle */}
                  <button
                    onClick={handleToggleMute}
                    className="p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#c5a059]" />}
                  </button>

                  {/* Fullscreen Button */}
                  <button
                    onClick={handleFullscreen}
                    className="p-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                    title="Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
