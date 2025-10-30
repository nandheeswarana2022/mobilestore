
import { Product } from './types';

export const DUMMY_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'AuraPhone Pro X',
    price: 1099,
    description: 'The future is here. With the revolutionary A18 Bionic chip, a stunning ProView XDR display, and a cinematic camera system, the AuraPhone Pro X redefines what a phone can do.',
    category: 'Smartphones',
    imageUrl: 'https://picsum.photos/seed/phone1/800/800',
    rating: 4.9,
    reviews: 1240,
    features: ['A18 Bionic Chip', '6.7" ProView XDR Display', 'Triple-lens Pro Camera', '5G Connectivity', 'All-day Battery Life']
  },
  {
    id: 2,
    name: 'ZenithPad Air',
    price: 799,
    description: 'Lightness meets power. The ZenithPad Air features the powerful Z2 chip in a thin and light design. Perfect for work, play, and creativity on the go.',
    category: 'Tablets',
    imageUrl: 'https://picsum.photos/seed/tablet1/800/800',
    rating: 4.8,
    reviews: 890,
    features: ['Z2 Fusion Chip', '10.9" Liquid Retina Display', '12MP Wide Camera', 'USB-C Connector', 'Supports ZenithPencil 2']
  },
  {
    id: 3,
    name: 'PulseBuds Pro',
    price: 249,
    description: 'Immersive sound, total silence. PulseBuds Pro feature Active Noise Cancellation, Transparency mode, and a customizable fit for all-day comfort and incredible audio quality.',
    category: 'Audio',
    imageUrl: 'https://picsum.photos/seed/earbuds1/800/800',
    rating: 4.7,
    reviews: 2315,
    features: ['Active Noise Cancellation', 'Spatial Audio', 'Sweat and Water Resistant', '24-hour Battery Life', 'Wireless Charging Case']
  },
  {
    id: 4,
    name: 'ChronoWatch Series 9',
    price: 429,
    description: 'The ultimate device for a healthy life. The ChronoWatch Series 9 features advanced health sensors, a brilliant always-on display, and powerful fitness tracking.',
    category: 'Wearables',
    imageUrl: 'https://picsum.photos/seed/watch1/800/800',
    rating: 4.9,
    reviews: 1850,
    features: ['Blood Oxygen Sensor', 'ECG App', 'Fall Detection', 'Swimproof', 'GPS + Cellular options']
  },
  {
    id: 5,
    name: 'NovaBook Pro 14"',
    price: 1999,
    description: 'Pro anywhere. The new NovaBook Pro delivers game-changing performance for pro users. With the blazing-fast N1 Pro chip, it’s a beast.',
    category: 'Laptops',
    imageUrl: 'https://picsum.photos/seed/laptop1/800/800',
    rating: 4.8,
    reviews: 750,
    features: ['N1 Pro Chip', 'Liquid Retina XDR display', '1080p FaceTime HD camera', 'Up to 21 hours battery life', 'MagSafe 3 charging']
  },
  {
    id: 6,
    name: 'Sphere Home Mini',
    price: 49,
    description: 'Room-filling sound. Your intelligent assistant. The Sphere Home Mini is a powerful smart speaker with 360-degree audio and the helpfulness of the Sphere Assistant.',
    category: 'Smart Home',
    imageUrl: 'https://picsum.photos/seed/speaker1/800/800',
    rating: 4.6,
    reviews: 3120,
    features: ['360-degree sound', 'Voice-controlled assistant', 'Control smart home devices', 'Privacy focused', 'Made with recycled materials']
  }
];
