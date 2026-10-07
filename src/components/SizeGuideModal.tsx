import React, { useState } from 'react';
import { X, Ruler, Check, HelpCircle, Scissors, Sparkles, MapPin } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: 'suits' | 'shirts' | 'trousers';
  onSelectSize?: (size: string) => void;
  currentSelectedSize?: string;
}

type GarmentType = 'suits' | 'shirts' | 'trousers';
type UnitType = 'in' | 'cm';

interface SuitRow {
  standard: string;
  bespokeMetric: string;
  chestIn: number;
  shoulderIn: number;
  sleeveIn: number;
  jacketLengthIn: number;
  waistIn: number;
  drop: string;
}

interface ShirtRow {
  standard: string;
  bespokeMetric: string;
  collarIn: number;
  chestIn: number;
  waistIn: number;
  sleeveIn: number;
  shoulderIn: number;
  lengthIn: number;
}

interface TrouserRow {
  standard: string;
  bespokeMetric: string;
  waistIn: number;
  hipIn: number;
  thighIn: number;
  inseamIn: number;
  riseIn: number;
  hemIn: number;
}

const SUIT_DATA: SuitRow[] = [
  { standard: '36R (XS)', bespokeMetric: 'Metric 46-Drop 7', chestIn: 36, shoulderIn: 17.0, sleeveIn: 24.5, jacketLengthIn: 28.5, waistIn: 30, drop: 'Drop 7' },
  { standard: '38R (S)', bespokeMetric: 'Metric 48-Drop 7', chestIn: 38, shoulderIn: 17.5, sleeveIn: 25.0, jacketLengthIn: 29.0, waistIn: 32, drop: 'Drop 7' },
  { standard: '40R (M)', bespokeMetric: 'Metric 50-Drop 6', chestIn: 40, shoulderIn: 18.2, sleeveIn: 25.5, jacketLengthIn: 29.5, waistIn: 34, drop: 'Drop 6' },
  { standard: '42R (L)', bespokeMetric: 'Metric 52-Drop 6', chestIn: 42, shoulderIn: 19.0, sleeveIn: 26.0, jacketLengthIn: 30.0, waistIn: 36, drop: 'Drop 6' },
  { standard: '44R (XL)', bespokeMetric: 'Metric 54-Drop 5', chestIn: 44, shoulderIn: 19.8, sleeveIn: 26.5, jacketLengthIn: 30.5, waistIn: 39, drop: 'Drop 5' },
  { standard: '46R (XXL)', bespokeMetric: 'Metric 56-Drop 5', chestIn: 46, shoulderIn: 20.4, sleeveIn: 27.0, jacketLengthIn: 31.0, waistIn: 42, drop: 'Drop 5' },
];

const SHIRT_DATA: ShirtRow[] = [
  { standard: '38 (S)', bespokeMetric: 'Neck 15.0" Slim', collarIn: 15.0, chestIn: 39, waistIn: 35, sleeveIn: 32.5, shoulderIn: 17.5, lengthIn: 29.0 },
  { standard: '40 (M)', bespokeMetric: 'Neck 15.7" Tailored', collarIn: 15.7, chestIn: 41, waistIn: 37, sleeveIn: 33.5, shoulderIn: 18.2, lengthIn: 29.5 },
  { standard: '42 (L)', bespokeMetric: 'Neck 16.5" Regular', collarIn: 16.5, chestIn: 43, waistIn: 39, sleeveIn: 34.5, shoulderIn: 19.0, lengthIn: 30.0 },
  { standard: '44 (XL)', bespokeMetric: 'Neck 17.2" Comfort', collarIn: 17.2, chestIn: 46, waistIn: 42, sleeveIn: 35.5, shoulderIn: 19.8, lengthIn: 30.5 },
  { standard: '46 (XXL)', bespokeMetric: 'Neck 18.0" Grand', collarIn: 18.0, chestIn: 49, waistIn: 45, sleeveIn: 36.0, shoulderIn: 20.5, lengthIn: 31.0 },
];

const TROUSER_DATA: TrouserRow[] = [
  { standard: '30 / S', bespokeMetric: 'Waist 76cm Slim Gurkha', waistIn: 30, hipIn: 38, thighIn: 23.5, inseamIn: 31.5, riseIn: 10.5, hemIn: 14.5 },
  { standard: '32 / M', bespokeMetric: 'Waist 81cm Tailored', waistIn: 32, hipIn: 40, thighIn: 24.5, inseamIn: 32.0, riseIn: 11.0, hemIn: 15.0 },
  { standard: '34 / L', bespokeMetric: 'Waist 86cm Classic', waistIn: 34, hipIn: 42, thighIn: 25.5, inseamIn: 32.5, riseIn: 11.5, hemIn: 15.5 },
  { standard: '36 / XL', bespokeMetric: 'Waist 91cm Comfort', waistIn: 36, hipIn: 44, thighIn: 26.5, inseamIn: 33.0, riseIn: 12.0, hemIn: 16.0 },
  { standard: '38 / XXL', bespokeMetric: 'Waist 96cm Regal', waistIn: 38, hipIn: 46, thighIn: 27.5, inseamIn: 33.0, riseIn: 12.5, hemIn: 16.5 },
];

export default function SizeGuideModal({
  isOpen,
  onClose,
  initialCategory = 'suits',
  onSelectSize,
  currentSelectedSize,
}: SizeGuideModalProps) {
  const [activeTab, setActiveTab] = useState<GarmentType>(initialCategory);
  const [unit, setUnit] = useState<UnitType>('in');
  
  // Interactive Size Recommender Calculator
  const [userChest, setUserChest] = useState<number>(40);
  const [userWaist, setUserWaist] = useState<number>(34);

  if (!isOpen) return null;

  const toDisplay = (valInInches: number) => {
    if (unit === 'cm') {
      return (valInInches * 2.54).toFixed(1);
    }
    return valInInches.toFixed(1);
  };

  // Compute recommendation
  const recommendedSuit = SUIT_DATA.reduce((prev, curr) => {
    return Math.abs(curr.chestIn - userChest) < Math.abs(prev.chestIn - userChest) ? curr : prev;
  });

  const handleApplySize = (sizeStr: string) => {
    if (onSelectSize) {
      // Extract clean size (e.g. 40R from "40R (M)" or 40 from "40 (M)")
      const clean = sizeStr.split(' ')[0];
      onSelectSize(clean);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div className="relative bg-[#0f0f0f] border border-white/15 rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl z-10 my-6 flex flex-col max-h-[92vh]">
        {/* Modal Top Bar */}
        <div className="p-5 md:p-6 border-b border-white/10 flex items-center justify-between bg-zinc-950">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-[#c5a059]/10 border border-[#c5a059]/20 text-[#c5a059]">
              <Ruler className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#c5a059] font-medium">
                <span>TS Menswear Master Tailoring</span>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span>Spencer Plaza Atelier</span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                Bespoke Size & Fit Guide
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher & Unit Toggle Bar */}
        <div className="p-4 md:px-6 bg-zinc-950/70 border-b border-white/5 flex flex-wrap items-center justify-between gap-3">
          {/* Garment Selector Tabs */}
          <div className="flex items-center gap-1.5 bg-zinc-900/90 p-1 rounded-lg border border-white/10">
            <button
              onClick={() => setActiveTab('suits')}
              className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors ${
                activeTab === 'suits'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Suits & Blazers
            </button>
            <button
              onClick={() => setActiveTab('shirts')}
              className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors ${
                activeTab === 'shirts'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Shirts & Kurtas
            </button>
            <button
              onClick={() => setActiveTab('trousers')}
              className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors ${
                activeTab === 'trousers'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Trousers & Chinos
            </button>
          </div>

          {/* Unit Switcher (Inches vs Centimeters) */}
          <div className="flex items-center gap-1.5 bg-zinc-900 p-1 rounded-lg border border-white/10 text-xs font-mono">
            <span className="text-zinc-500 text-[11px] px-1 uppercase tracking-wider">Unit:</span>
            <button
              onClick={() => setUnit('in')}
              className={`px-2.5 py-1 rounded transition-colors ${
                unit === 'in'
                  ? 'bg-[#c5a059] text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Inches (in)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-2.5 py-1 rounded transition-colors ${
                unit === 'cm'
                  ? 'bg-[#c5a059] text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6">
          {/* Conversion Table Block */}
          <div className="border border-white/10 rounded-xl overflow-hidden bg-zinc-950">
            <div className="p-3.5 bg-zinc-900/60 border-b border-white/10 flex items-center justify-between text-xs">
              <span className="font-semibold text-white uppercase tracking-wider">
                {activeTab === 'suits' && 'Suits, Blazers & Tuxedos Conversion Chart'}
                {activeTab === 'shirts' && 'Linen Shirts & Bandhgala Kurtas Conversion Chart'}
                {activeTab === 'trousers' && 'Gurkha Trousers & Tailored Pants Conversion Chart'}
              </span>
              <span className="text-zinc-500 font-mono text-[11px]">
                Values shown in: <strong className="text-[#c5a059]">{unit === 'in' ? 'Inches (in)' : 'Centimeters (cm)'}</strong>
              </span>
            </div>

            <div className="overflow-x-auto">
              {activeTab === 'suits' && (
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-900 text-zinc-400 uppercase tracking-wider font-mono text-[11px] border-b border-white/10">
                    <tr>
                      <th className="p-3">Standard Size</th>
                      <th className="p-3">Bespoke Metric</th>
                      <th className="p-3">To Fit Chest</th>
                      <th className="p-3">Shoulder</th>
                      <th className="p-3">Sleeve</th>
                      <th className="p-3">Jacket Length</th>
                      <th className="p-3">Trouser Waist</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-normal">
                    {SUIT_DATA.map((row) => {
                      const isMatch = currentSelectedSize && row.standard.startsWith(currentSelectedSize);
                      return (
                        <tr
                          key={row.standard}
                          className={`hover:bg-zinc-900/50 transition-colors ${
                            isMatch ? 'bg-[#c5a059]/10' : ''
                          }`}
                        >
                          <td className="p-3 font-semibold text-white flex items-center gap-1.5">
                            {isMatch && <Check className="w-3.5 h-3.5 text-[#c5a059]" />}
                            <span>{row.standard}</span>
                          </td>
                          <td className="p-3 text-[#c5a059] font-mono text-[11px]">
                            {row.bespokeMetric}
                          </td>
                          <td className="p-3 font-mono tabular-nums text-zinc-200">
                            {toDisplay(row.chestIn)} {unit}
                          </td>
                          <td className="p-3 font-mono tabular-nums text-zinc-300">
                            {toDisplay(row.shoulderIn)} {unit}
                          </td>
                          <td className="p-3 font-mono tabular-nums text-zinc-300">
                            {toDisplay(row.sleeveIn)} {unit}
                          </td>
                          <td className="p-3 font-mono tabular-nums text-zinc-300">
                            {toDisplay(row.jacketLengthIn)} {unit}
                          </td>
                          <td className="p-3 font-mono tabular-nums text-zinc-300">
                            {toDisplay(row.waistIn)} {unit}
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleApplySize(row.standard)}
                              className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider bg-zinc-800 hover:bg-[#c5a059] hover:text-black text-white rounded transition-colors whitespace-nowrap"
                            >
                              Choose Size
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}

              {activeTab === 'shirts' && (
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-900 text-zinc-400 uppercase tracking-wider font-mono text-[11px] border-b border-white/10">
                    <tr>
                      <th className="p-3">Standard Size</th>
                      <th className="p-3">Bespoke Collar Spec</th>
                      <th className="p-3">Collar</th>
                      <th className="p-3">To Fit Chest</th>
                      <th className="p-3">Waist</th>
                      <th className="p-3">Shoulder</th>
                      <th className="p-3">Shirt Length</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-normal">
                    {SHIRT_DATA.map((row) => {
                      const isMatch = currentSelectedSize && row.standard.startsWith(currentSelectedSize);
                      return (
                        <tr
                          key={row.standard}
                          className={`hover:bg-zinc-900/50 transition-colors ${
                            isMatch ? 'bg-[#c5a059]/10' : ''
                          }`}
                        >
                          <td className="p-3 font-semibold text-white flex items-center gap-1.5">
                            {isMatch && <Check className="w-3.5 h-3.5 text-[#c5a059]" />}
                            <span>{row.standard}</span>
                          </td>
                          <td className="p-3 text-[#c5a059] font-mono text-[11px]">
                            {row.bespokeMetric}
                          </td>
                          <td className="p-3 font-mono tabular-nums text-zinc-200">
                            {toDisplay(row.collarIn)} {unit}
                          </td>
                          <td className="p-3 font-mono tabular-nums text-zinc-300">
                            {toDisplay(row.chestIn)} {unit}
                          </td>
                          <td className="p-3 font-mono tabular-nums text-zinc-300">
                            {toDisplay(row.waistIn)} {unit}
                          </td>
                          <td className="p-3 font-mono tabular-nums text-zinc-300">
                            {toDisplay(row.shoulderIn)} {unit}
                          </td>
                          <td className="p-3 font-mono tabular-nums text-zinc-300">
                            {toDisplay(row.lengthIn)} {unit}
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleApplySize(row.standard)}
                              className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider bg-zinc-800 hover:bg-[#c5a059] hover:text-black text-white rounded transition-colors whitespace-nowrap"
                            >
                              Choose Size
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}

              {activeTab === 'trousers' && (
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-900 text-zinc-400 uppercase tracking-wider font-mono text-[11px] border-b border-white/10">
                    <tr>
                      <th className="p-3">Waist Size</th>
                      <th className="p-3">Bespoke Fit Metric</th>
                      <th className="p-3">Waist Band</th>
                      <th className="p-3">Hip / Seat</th>
                      <th className="p-3">Thigh</th>
                      <th className="p-3">Inseam Length</th>
                      <th className="p-3">Front Rise</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-normal">
                    {TROUSER_DATA.map((row) => {
                      const isMatch = currentSelectedSize && row.standard.startsWith(currentSelectedSize);
                      return (
                        <tr
                          key={row.standard}
                          className={`hover:bg-zinc-900/50 transition-colors ${
                            isMatch ? 'bg-[#c5a059]/10' : ''
                          }`}
                        >
                          <td className="p-3 font-semibold text-white flex items-center gap-1.5">
                            {isMatch && <Check className="w-3.5 h-3.5 text-[#c5a059]" />}
                            <span>{row.standard}</span>
                          </td>
                          <td className="p-3 text-[#c5a059] font-mono text-[11px]">
                            {row.bespokeMetric}
                          </td>
                          <td className="p-3 font-mono tabular-nums text-zinc-200">
                            {toDisplay(row.waistIn)} {unit}
                          </td>
                          <td className="p-3 font-mono tabular-nums text-zinc-300">
                            {toDisplay(row.hipIn)} {unit}
                          </td>
                          <td className="p-3 font-mono tabular-nums text-zinc-300">
                            {toDisplay(row.thighIn)} {unit}
                          </td>
                          <td className="p-3 font-mono tabular-nums text-zinc-300">
                            {toDisplay(row.inseamIn)} {unit}
                          </td>
                          <td className="p-3 font-mono tabular-nums text-zinc-300">
                            {toDisplay(row.riseIn)} {unit}
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleApplySize(row.standard)}
                              className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider bg-zinc-800 hover:bg-[#c5a059] hover:text-black text-white rounded transition-colors whitespace-nowrap"
                            >
                              Choose Size
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Interactive Fit Recommender Calculator */}
          <div className="p-5 rounded-xl bg-zinc-950 border border-[#c5a059]/30 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-[11px] uppercase tracking-[0.2em] text-[#c5a059] font-mono block">
                  Interactive Fit Finder
                </span>
                <h4 className="font-display text-lg font-bold text-white">
                  Enter Your Body Measurements
                </h4>
              </div>

              <div className="flex items-center gap-2 bg-zinc-900 px-3 py-1.5 rounded-lg border border-white/10">
                <span className="text-xs text-zinc-400">Calculated Recommendation:</span>
                <strong className="text-sm font-mono text-[#c5a059]">
                  {recommendedSuit.standard}
                </strong>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-zinc-300 block mb-1">
                  Your Bare Chest Circumference: <strong className="text-white font-mono">{userChest} inches</strong> ({Math.round(userChest * 2.54)} cm)
                </label>
                <input
                  type="range"
                  min="34"
                  max="48"
                  step="0.5"
                  value={userChest}
                  onChange={(e) => setUserChest(parseFloat(e.target.value))}
                  className="w-full accent-[#c5a059] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
                  <span>34" (XS)</span>
                  <span>40" (M)</span>
                  <span>48" (XXL)</span>
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-300 block mb-1">
                  Your Natural Trouser Waist: <strong className="text-white font-mono">{userWaist} inches</strong> ({Math.round(userWaist * 2.54)} cm)
                </label>
                <input
                  type="range"
                  min="28"
                  max="44"
                  step="0.5"
                  value={userWaist}
                  onChange={(e) => setUserWaist(parseFloat(e.target.value))}
                  className="w-full accent-[#c5a059] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-zinc-500 font-mono mt-1">
                  <span>28" (Slim)</span>
                  <span>34" (Regular)</span>
                  <span>44" (Comfort)</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-zinc-400 gap-2">
              <span className="italic">
                Recommended for your profile: <strong className="text-white">{recommendedSuit.standard}</strong> in {recommendedSuit.bespokeMetric}
              </span>
              <button
                onClick={() => handleApplySize(recommendedSuit.standard)}
                className="px-4 py-2 bg-[#c5a059] text-black font-semibold text-xs uppercase tracking-wider rounded hover:bg-[#dfbf7a] transition-colors whitespace-nowrap self-start sm:self-auto"
              >
                Apply Recommended Size ({recommendedSuit.standard.split(' ')[0]})
              </button>
            </div>
          </div>

          {/* How to Measure Master Tailor Guide */}
          <div className="p-5 rounded-xl bg-zinc-950/80 border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Scissors className="w-4 h-4 text-[#c5a059]" />
              <h4 className="text-xs uppercase tracking-wider font-semibold text-white">
                How Our Spencer Plaza Master Cutters Take Measurements
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-zinc-300">
              <div className="p-3 rounded-lg bg-zinc-900/60 border border-white/5 space-y-1">
                <strong className="text-white block font-medium">1. Chest / Torso</strong>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  Wrap the tape around the fullest part of your chest, keeping it level under the armpits. Stand naturally without inflating your lungs.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900/60 border border-white/5 space-y-1">
                <strong className="text-white block font-medium">2. Shoulder Width</strong>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  Measure across the back from the tip of the left acromion bone to the right acromion bone along the natural curve of the neck base.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-zinc-900/60 border border-white/5 space-y-1">
                <strong className="text-white block font-medium">3. Trouser Waist & Rise</strong>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  Measure around where you prefer your waistband to sit (our Gurkha trousers sit at the natural navel line for classical drape).
                </p>
              </div>
            </div>
          </div>

          {/* Spencer Plaza Bespoke Guarantee Banner */}
          <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/10 flex items-start gap-3 text-xs text-zinc-400">
            <MapPin className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white font-medium block">
                The Spencer Plaza 2-Inch Inlay Guarantee
              </strong>
              <p className="text-[11px] mt-0.5 text-zinc-400 leading-relaxed">
                Every jacket, trouser, and Bandhgala crafted at TS Menswear includes a 2-inch internal fabric reserve along the side seams and cuff hems. If your size fluctuates, our master tailors at Spencer Plaza Phase 2 will perform in-house alterations with zero charge.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 md:px-6 bg-zinc-950 border-t border-white/10 flex items-center justify-between">
          <div className="text-xs text-zinc-500">
            Need custom bespoke measurements? Visit our Phase 2 fitting lounge.
          </div>
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white text-black hover:bg-[#c5a059] text-xs font-semibold uppercase tracking-wider rounded transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
