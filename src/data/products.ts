import { Product } from '../types/product';

// Add or edit products here
const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Earbuds',
    description: 'High-quality wireless earbuds with noise cancellation technology and 24 hour battery life.',
    price: 129.99,
    discountedPrice: 99.99, // On promotion
    imageUrl: 'https://www.paty.com.ar/assets/site/images/sections/products/packaging-mobile/classic.jpg?v=1.2',
    categories: ['electronics'],
    stock: 15,
    featured: true,
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Track your fitness, receive notifications, and more with this modern smartwatch.',
    price: 199.99,
    imageUrl: 'https://www.paty.com.ar/assets/site/images/sections/products/packaging-mobile/classic.jpg?v=1.2',
    categories: ['electronics'],
    stock: 8,
  },
  {
    id: '3',
    name: 'Casual T-Shirt',
    description: 'Comfortable cotton t-shirt available in multiple colors and sizes.',
    price: 24.99,
    discountedPrice: 19.99, // On promotion
    imageUrl: 'https://images.pexels.com/photos/428340/pexels-photo-428340.jpeg',
    categories: ['clothing'],
    stock: 50,
  },
  {
    id: '4',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with adjustable brewing strength and 12-cup capacity.',
    price: 89.99,
    imageUrl: 'https://images.pexels.com/photos/4820828/pexels-photo-4820828.jpeg',
    categories: ['home'],
    stock: 12,
    featured: true,
  },
  {
    id: '5',
    name: 'Novel - "The Midnight Library"',
    description: 'Bestselling novel about a library that contains alternate versions of your life.',
    price: 16.99,
    imageUrl: 'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg',
    categories: ['books'],
    stock: 30,
  },
  {
    id: '6',
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat with carrying strap, perfect for home or studio practice.',
    price: 29.99,
    discountedPrice: 24.99, // On promotion
    imageUrl: 'https://images.pexels.com/photos/4498155/pexels-photo-4498155.jpeg',
    categories: ['sports'],
    stock: 25,
  },
  {
    id: '7',
    name: 'Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with 20 hours of battery life and water resistance.',
    price: 79.99,
    imageUrl: 'https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg',
    categories: ['electronics'],
    stock: 18,
  },
  {
    id: '8',
    name: 'Dinner Plate Set',
    description: 'Set of 4 ceramic dinner plates with modern design.',
    price: 49.99,
    imageUrl: 'https://images.pexels.com/photos/6103188/pexels-photo-6103188.jpeg',
    categories: ['home'],
    stock: 10,
    featured: true,
  },
];

export default products;
