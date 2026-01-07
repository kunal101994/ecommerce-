
import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Aether Wireless Headphones',
    price: 349.99,
    description: 'Immerse yourself in pure sound with active noise cancellation and 40-hour battery life.',
    category: 'Electronics',
    image: 'https://picsum.photos/seed/audio1/800/600',
    rating: 4.8,
    stock: 12,
    features: ['Noise Cancelling', '40h Battery', 'Bluetooth 5.2']
  },
  {
    id: '2',
    name: 'Nordic Minimalist Watch',
    price: 189.00,
    description: 'Timeless elegance meets modern precision. Sapphire crystal and premium Italian leather.',
    category: 'Accessories',
    image: 'https://picsum.photos/seed/watch1/800/600',
    rating: 4.9,
    stock: 5,
    features: ['Leather Strap', 'Sapphire Glass', 'Water Resistant']
  },
  {
    id: '3',
    name: 'Zenith Smart Light',
    price: 59.99,
    description: 'Transform your living space with millions of colors controlled by your voice.',
    category: 'Home',
    image: 'https://picsum.photos/seed/light1/800/600',
    rating: 4.5,
    stock: 25,
    features: ['Voice Control', '16M Colors', 'Energy Efficient']
  },
  {
    id: '4',
    name: 'Lumina Espresso Machine',
    price: 899.00,
    description: 'Barista-quality coffee at home. Professional grade extraction and milk frothing.',
    category: 'Kitchen',
    image: 'https://picsum.photos/seed/coffee1/800/600',
    rating: 4.7,
    stock: 3,
    features: ['15 Bar Pump', 'Steam Wand', 'Burr Grinder']
  },
  {
    id: '5',
    name: 'Titanium Travel Bottle',
    price: 75.00,
    description: 'Ultralight, indestructible, and keeps beverages hot for 24 hours.',
    category: 'Lifestyle',
    image: 'https://picsum.photos/seed/bottle1/800/600',
    rating: 4.6,
    stock: 50,
    features: ['BPA Free', '24h Hot/Cold', 'Lifetime Warranty']
  },
  {
    id: '6',
    name: 'Ergo-Flex Keyboard',
    price: 229.00,
    description: 'Mechanical precision designed for ultimate wrist comfort during long sessions.',
    category: 'Electronics',
    image: 'https://picsum.photos/seed/key1/800/600',
    rating: 4.8,
    stock: 8,
    features: ['Split Design', 'RGB Lighting', 'Silent Switches']
  }
];

export const CATEGORIES = ['All', 'Electronics', 'Accessories', 'Home', 'Kitchen', 'Lifestyle'];
