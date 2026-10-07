import { Product } from '../types';

export interface StyleEnsemble {
  id: string;
  name: string;
  theme: string;
  occasion: string;
  description: string;
  pieces: {
    role: string;
    productId: string;
  }[];
  ensemblePrice: number;
  originalPrice: number;
  image: string;
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'ts-01',
    name: 'The Spencer Peak-Lapel Tuxedo',
    category: 'suits',
    categoryLabel: 'Bespoke Tailoring',
    price: 24999,
    originalPrice: 28999,
    description: 'Mastercrafted two-piece tuxedo woven from Super 140s Italian Merino wool. Features hand-stitched silk peak lapels, floating canvas chest piece, and bespoke horn buttons.',
    fabric: 'Super 140s Italian Merino Wool & Mulberry Silk',
    fit: 'Contemporary Tailored Fit',
    color: 'Charcoal Obsidian',
    availableSizes: ['38R', '40R', '42R', '44R', '46R'],
    inStock: true,
    spencerPlazaStock: 'Phase 2 Boutique Rack A1 · 3 suits ready to fit',
    featured: true,
    isNewArrival: true,
    videoTimestamp: '00:04',
    accentColor: '#1A1A1A',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=80',
    details: [
      'Full floating horsehair canvas interior for natural drape',
      'Hand-stitched Milanese buttonhole on left lapel',
      'Dual rear vents with reinforced bar-tack stitching',
      'Complementary in-person fitting at Spencer Plaza Flagship'
    ]
  },
  {
    id: 'ts-02',
    name: 'Anna Salai Double-Breasted Blazer',
    category: 'suits',
    categoryLabel: 'Bespoke Tailoring',
    price: 18499,
    originalPrice: 21999,
    description: 'An architectural 6x2 double-breasted silhouette honoring Chennai elegance. Cut from high-twist textured wool that resists creasing in tropical weather.',
    fabric: 'High-Twist Tropical Wool (280 GSM)',
    fit: 'Structured European Silhouette',
    color: 'Deep Midnight Navy',
    availableSizes: ['38R', '40R', '42R', '44R'],
    inStock: true,
    spencerPlazaStock: 'Phase 2 Atelier · 4 units available',
    featured: true,
    videoTimestamp: '00:12',
    accentColor: '#0E1726',
    image: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=1200&q=80',
    details: [
      'Wide sweeping peak lapels with gentle curve',
      'Bespoke Chennai Gold-rimmed matte horn buttons',
      'Ticket pocket detail on right hip',
      'Bemberg cupro lining for smooth friction-free wear'
    ]
  },
  {
    id: 'ts-03',
    name: 'Chettinad Raw Silk Bandhgala & Sherwani',
    category: 'heritage',
    categoryLabel: 'Spencer Heritage',
    price: 16999,
    originalPrice: 19500,
    description: 'A contemporary bridge between Dravidian handloom heritage and modern tailoring. Handwoven mulberry silk with subtle matte slub texture and regal mandarin collar.',
    fabric: 'Pure Handspun Raw Silk & Cotton Weft',
    fit: 'Regal Slim Fit',
    color: 'Temple Bronze & Black',
    availableSizes: ['38', '40', '42', '44'],
    inStock: true,
    spencerPlazaStock: 'Heritage Lounge Display · 2 units available',
    featured: true,
    isNewArrival: true,
    videoTimestamp: '00:19',
    accentColor: '#2B1E13',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=80',
    details: [
      'Seven antique brass buttons embossed with TS monogram',
      'Stand Mandarin collar reinforced for crisp posture',
      'Concealed double chest pocket for pocket square',
      'Hand-stitched pick stitching along all edges'
    ]
  },
  {
    id: 'ts-04',
    name: 'Luxe Heavyweight Streetwear Overshirt',
    category: 'streetwear',
    categoryLabel: 'Luxury Streetwear',
    price: 5499,
    originalPrice: 6999,
    description: 'Drop-shoulder architectural overshirt constructed from 460 GSM organic loopback terry. Engineered boxy silhouette tailored for the modern metropolitan.',
    fabric: '460 GSM Heavyweight Organic French Terry',
    fit: 'Architectural Relaxed Boxy',
    color: 'Pitch Carbon Black',
    availableSizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    spencerPlazaStock: 'Streetwear Rack 02 · 8 units available',
    featured: true,
    videoTimestamp: '00:27',
    accentColor: '#121212',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    details: [
      'Custom gunmetal double zipper with elongated pull',
      'Twin oversized cargo chest pockets with hidden snaps',
      'Reinforced elbow paneling for durability',
      'Garment dyed and enzyme-washed for plush hand feel'
    ]
  },
  {
    id: 'ts-05',
    name: 'Coromandel Pure Irish Linen Shirt',
    category: 'linen',
    categoryLabel: 'Linen Collection',
    price: 4899,
    originalPrice: 5999,
    description: 'Spun from certified Belgian flax for unparalleled breathability in South Indian summers. Features a relaxed camp collar and Australian mother-of-pearl buttons.',
    fabric: '100% Certified European Flax Linen',
    fit: 'Breezy Relaxed Resort Fit',
    color: 'Ivory Sand',
    availableSizes: ['38', '40', '42', '44', '46'],
    inStock: true,
    spencerPlazaStock: 'Phase 2 Summer Rack · 12 units available',
    featured: false,
    videoTimestamp: '00:35',
    accentColor: '#E6E2DD',
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=80',
    details: [
      'Pre-washed with organic enzymes to avoid shrinkage',
      'Natural cross-hatch linen texture that softens over time',
      'Genuine Trocas shell buttons with cross-stitching',
      'French seam construction throughout'
    ]
  },
  {
    id: 'ts-06',
    name: 'Pleated Gurkha Wool Trousers',
    category: 'suits',
    categoryLabel: 'Tailored Separates',
    price: 6899,
    originalPrice: 7999,
    description: 'High-waisted trousers with authentic twin-buckle Gurkha waistband and deep forward double pleats. Cut generous through the thigh with a clean taper to a 2-inch cuff.',
    fabric: 'Fine Wool-Viscose Twill with Natural Stretch',
    fit: 'High-Rise Tapered Classic',
    color: 'Slate Charcoal',
    availableSizes: ['30', '32', '34', '36', '38'],
    inStock: true,
    spencerPlazaStock: 'Phase 2 Trouser Bar · 6 pairs available',
    featured: false,
    videoTimestamp: '00:42',
    accentColor: '#262626',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1200&q=80',
    details: [
      'Self-fabric crossover belt with antique brass buckles',
      'Generous 2-inch pre-turned cuffs for weighted drape',
      'Curved slanted side pockets and jetted rear pockets',
      'Internal rubberized shirt-stay grip band'
    ]
  },
  {
    id: 'ts-07',
    name: 'Goodyear-Welted Tuscan Leather Oxfords',
    category: 'accessories',
    categoryLabel: 'Artisanal Footwear',
    price: 12999,
    originalPrice: 14999,
    description: 'Hand-burnished wholecut dress shoes made from full-grain calfskin imported from Tuscany. Built on a traditional English chisel toe last with channel-stitched oak leather soles.',
    fabric: 'Full-Grain Italian Calfskin Leather',
    fit: 'True to Size (E Width)',
    color: 'Espresso Patina',
    availableSizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    inStock: true,
    spencerPlazaStock: 'Phase 2 Shoe Salon · 5 pairs in stock',
    featured: false,
    videoTimestamp: '00:49',
    accentColor: '#36221A',
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1200&q=80',
    details: [
      'Full Goodyear welt construction (resoleable for life)',
      'Hand-painted gradient patina by master colorists',
      'Cork footbed filler that molds to your foot shape',
      'Includes brass TS shoe horn and cedar dust bags'
    ]
  },
  {
    id: 'ts-08',
    name: 'Spencer Plaza Atelier Silk & Accents Set',
    category: 'accessories',
    categoryLabel: 'Spencer Heritage',
    price: 3499,
    originalPrice: 4200,
    description: 'Limited edition set featuring brushed brass cufflinks engraved with Spencer Plaza geometric arcade lattice, paired with hand-rolled 100% Kanchipuram twill silk square.',
    fabric: 'Solid Brushed Brass & 100% Hand-rolled Silk',
    fit: 'Standard One Size',
    color: 'Chennai Gold & Ivory',
    availableSizes: ['One Size'],
    inStock: true,
    spencerPlazaStock: 'Cashier Showcase · 15 gift sets',
    featured: false,
    videoTimestamp: '00:55',
    accentColor: '#C5A059',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    details: [
      'Solid brass with 18k gold satin PVD finish',
      'Artisanal hand-rolled edges on 42cm x 42cm silk',
      'Velvet-lined commemorative Spencer Plaza gift case',
      'TS Monogram hallmark certificate included'
    ]
  },
  {
    id: 'ts-09',
    name: 'Royal Heritage Gala Sherwani & Dress Stole',
    category: 'heritage',
    categoryLabel: 'Spencer Heritage',
    price: 28999,
    originalPrice: 34000,
    description: 'Exquisite ceremonial formalwear handcrafted for grand galas and wedding receptions. Features intricate zardozi embroidery over textured raw silk, accompanied by an ivory organza stole.',
    fabric: 'Pure Mulberry Silk with Hand-Embroidered Zardozi',
    fit: 'Regal Formal Silhouette',
    color: 'Ivory Royal Gold',
    availableSizes: ['38', '40', '42', '44', '46'],
    inStock: true,
    spencerPlazaStock: 'Bridal & Groom VIP Suite · 2 custom pieces',
    featured: true,
    isNewArrival: true,
    videoTimestamp: '01:05',
    accentColor: '#D4AF37',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
    details: [
      'Hand-sewn gold bullion wire embroidery along front placket and cuffs',
      'Includes coordinated chanderi silk churidar and handcrafted stole',
      'Lined in pure breathable Habotai silk for all-day royal comfort',
      'Dedicated Spencer Plaza master cutter fitting consultation'
    ]
  },
  {
    id: 'ts-10',
    name: 'Italian Merino Wool Formal Dress Overcoat',
    category: 'suits',
    categoryLabel: 'Bespoke Tailoring',
    price: 21500,
    originalPrice: 25000,
    description: 'Full-length architectural double-breasted dress coat tailored from 620 GSM Melton wool. Designed to drape effortlessly over suits or stand alone as a commanding statement.',
    fabric: '620 GSM Italian Melton Wool & Cashmere Blend',
    fit: 'Structured Longline Silhouette',
    color: 'Obsidian Midnight',
    availableSizes: ['38R', '40R', '42R', '44R'],
    inStock: true,
    spencerPlazaStock: 'Winter Showcase Rack · 4 units in stock',
    featured: true,
    videoTimestamp: '01:12',
    accentColor: '#101014',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=80',
    details: [
      'Substantial peak lapels with structured roped shoulders',
      'Deep back vent with button tab closure',
      'Full Bemberg silk lining and dual interior storm pockets',
      'Water-repellent nanotech finish for fine wool preservation'
    ]
  },
  {
    id: 'ts-11',
    name: 'Midnight Velvet Embroidered Dinner Jacket',
    category: 'suits',
    categoryLabel: 'Bespoke Tailoring',
    price: 26500,
    originalPrice: 31000,
    description: 'Plush Italian cotton velvet evening jacket featuring hand-embroidered lapel accents and satin-covered button details. The pinnacle of celebratory black-tie panache.',
    fabric: '100% Pure Italian Cotton Velvet',
    fit: 'Sculpted Evening Fit',
    color: 'Midnight Sapphire',
    availableSizes: ['38R', '40R', '42R', '44R'],
    inStock: true,
    spencerPlazaStock: 'VIP Black Tie Lounge · 3 jackets ready',
    featured: false,
    isNewArrival: true,
    videoTimestamp: '01:20',
    accentColor: '#0B1B3A',
    image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1200&q=80',
    details: [
      'Curved shawl collar rendered in jet-black Duchess satin',
      'Single satin-covered closure button with reinforced shank',
      'Jetted evening pockets without flap interruption',
      'Custom TS gold interior piping and monogrammed lining'
    ]
  },
  {
    id: 'ts-12',
    name: 'Handloom Khadi Silk Kurta & Waistcoat Ensemble',
    category: 'heritage',
    categoryLabel: 'Spencer Heritage',
    price: 13499,
    originalPrice: 15999,
    description: 'Two-piece festive ensemble featuring an asymmetrical draped khadi silk kurta paired with an embroidered Nehru waistcoat. A sophisticated celebratory attire for modern gentlemen.',
    fabric: 'Handspun Khadi Silk & Raw Matka Weave',
    fit: 'Modern Drape Classic',
    color: 'Sunstone Amber & Charcoal',
    availableSizes: ['38', '40', '42', '44'],
    inStock: true,
    spencerPlazaStock: 'Phase 2 Boutique Rack C2 · 5 sets available',
    featured: false,
    videoTimestamp: '01:28',
    accentColor: '#3A2E1E',
    image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=1200&q=80',
    details: [
      'Asymmetrical side-slit hem for fluid walking drape',
      'Nehru jacket accented with antique mother-of-pearl buttons',
      'Breathable all-natural fibers woven on Tamil Nadu looms',
      'Includes tonal silk pocket square pre-folded by atelier master'
    ]
  }
];

export const CURATED_STYLE_ENSEMBLES: StyleEnsemble[] = [
  {
    id: 'ens-01',
    name: 'The Black Tie Imperial Gala',
    theme: 'Evening Formal',
    occasion: 'Grand Reception & Black Tie Galas',
    description: 'The pinnacle of bespoke evening elegance. The Spencer Peak-Lapel Tuxedo paired with Tuscan leather oxfords and hand-rolled Kanchipuram silk square.',
    pieces: [
      { role: 'Jacket & Trouser', productId: 'ts-01' },
      { role: 'Footwear', productId: 'ts-07' },
      { role: 'Accessories', productId: 'ts-08' }
    ],
    ensemblePrice: 37499,
    originalPrice: 48198,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'ens-02',
    name: 'The Spencer Plaza Executive Stance',
    theme: 'Corporate Power Dressing',
    occasion: 'Boardrooms & Strategic Keynotes',
    description: 'An architectural 6x2 double-breasted navy blazer with high-waisted pleated Gurkha wool trousers and burnished dress shoes.',
    pieces: [
      { role: 'Double-Breasted Blazer', productId: 'ts-02' },
      { role: 'Gurkha Trousers', productId: 'ts-06' },
      { role: 'Goodyear Oxford Shoes', productId: 'ts-07' }
    ],
    ensemblePrice: 33999,
    originalPrice: 44997,
    image: 'https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'ens-03',
    name: 'Royal Dravidian Heritage Ensemble',
    theme: 'Festive & Ceremonial',
    occasion: 'Weddings & Celebratory Evenings',
    description: 'Handspun raw silk bandhgala paired with handcrafted khadi vestments and limited edition gold-trimmed accessories.',
    pieces: [
      { role: 'Silk Bandhgala', productId: 'ts-03' },
      { role: 'Ceremonial Kurta Set', productId: 'ts-12' },
      { role: 'Cufflink & Silk Square', productId: 'ts-08' }
    ],
    ensemblePrice: 28999,
    originalPrice: 39698,
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'ens-04',
    name: 'Coromandel Coastal Luxury',
    theme: 'Warm-Weather Sartorial',
    occasion: 'Resort Evenings & Weekend Soirees',
    description: 'Crisp Belgian flax linen shirt combined with lightweight Gurkha trousers and bespoke comfort tailoring.',
    pieces: [
      { role: 'Pure Irish Linen Shirt', productId: 'ts-05' },
      { role: 'Gurkha Pleated Trousers', productId: 'ts-06' },
      { role: 'Silk Accent Square', productId: 'ts-08' }
    ],
    ensemblePrice: 12999,
    originalPrice: 18198,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1200&q=80'
  }
];
