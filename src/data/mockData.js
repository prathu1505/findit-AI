export const initialItems = [
  {
    id: 'item-1',
    type: 'found',
    category: 'Bags & Luggage',
    name: 'Navy Canvas Backpack',
    location: 'Central Library, 2nd Floor Reading Room',
    date: '2026-10-24',
    description: 'Dark navy blue canvas backpack with brown leather base trim and a silver zipper. Contains a notebook and blue water bottle inside.',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    verificationQuestion: 'What initials or label is written on the front interior pocket?',
    reporter: 'Campus Security Desk'
  },
  {
    id: 'item-2',
    type: 'lost',
    category: 'Electronics',
    name: 'Silver Wireless Headphones',
    location: 'Student Union, Lounge Area B',
    date: '2026-10-23',
    description: 'Over-ear silver wireless headphones with grey foam ear-cushions. Stored in a black zippered hard case.',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    verificationQuestion: 'What small logo or sticker is on the right hinge?',
    reporter: 'Student (ID: ...842)'
  },
  {
    id: 'item-3',
    type: 'found',
    category: 'Personal Accessories',
    name: 'Brown Leather Bi-fold Wallet',
    location: 'South Campus Café Table 14',
    date: '2026-10-23',
    description: 'Genuine brown leather bi-fold wallet with slight scuff marks on the rear corner. Handed to cafe cashier.',
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    verificationQuestion: 'What color is the library/transit card inside the second card slot?',
    reporter: 'Café Staff'
  },
  {
    id: 'item-4',
    type: 'lost',
    category: 'Everyday Essentials',
    name: 'Matte Black Water Bottle (32oz)',
    location: 'Recreation Center, Locker Room Exit',
    date: '2026-10-22',
    description: '32oz double-wall insulated bottle with black sports lid and small scratch on bottom rim.',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    verificationQuestion: 'What outdoor brand logo is printed in white near the neck?',
    reporter: 'Member #2041'
  },
  {
    id: 'item-5',
    type: 'lost',
    category: 'Bags & Luggage',
    name: 'Blue Herschel Classic Backpack',
    location: 'Central Library, Main Lobby',
    date: '2026-10-24',
    description: 'Navy blue Herschel style backpack, left near the study carrels around 3:30 PM. Has a small brass keychain on the front zipper.',
    imageUrl: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=800&q=80',
    verificationQuestion: 'What keychain charm is attached to the zipper pull?',
    reporter: 'David M.'
  },
  {
    id: 'item-6',
    type: 'found',
    category: 'Electronics',
    name: 'Sony Noise Canceling Headphones in Black Case',
    location: 'Student Union, 1st Floor Study Pod',
    date: '2026-10-23',
    description: 'Silver-grey over-ear headphones found left on a couch in the corner pod. Battery was still at 60%.',
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    verificationQuestion: 'What is the Bluetooth device name saved on the headphones?',
    reporter: 'Union Staff Member'
  }
];

export const initialMatches = [
  {
    id: 'match-1',
    confidenceScore: 94,
    lostItemId: 'item-5',
    foundItemId: 'item-1',
    lostItemName: 'Blue Herschel Classic Backpack',
    foundItemName: 'Navy Canvas Backpack',
    locationDistance: 'Same building (~30 meters, Central Library)',
    timeDifference: 'Reported within 2 hours of loss',
    matchFactors: [
      { factor: 'Visual Similarity', status: 'high', details: 'Navy canvas texture, brown leather base trim match visual descriptors.' },
      { factor: 'Location Proximity', status: 'high', details: 'Both reports origin from Central Library (Main Lobby vs 2nd Floor).' },
      { factor: 'Timestamp Window', status: 'high', details: 'Reported lost Oct 24, 3:30 PM; turned in at 5:10 PM.' }
    ],
    explanation: 'Very high confidence match based on color profile, bag silhouette, location landmark, and correlated timestamp.'
  },
  {
    id: 'match-2',
    confidenceScore: 89,
    lostItemId: 'item-2',
    foundItemId: 'item-6',
    lostItemName: 'Silver Wireless Headphones',
    foundItemName: 'Sony Noise Canceling Headphones in Black Case',
    locationDistance: 'Same venue (Student Union Lounge vs 1st Floor Pod)',
    timeDifference: 'Reported same day (Oct 23)',
    matchFactors: [
      { factor: 'Hardware Model & Color', status: 'high', details: 'Silver over-ear wireless chassis with grey cushions.' },
      { factor: 'Enclosure Case', status: 'high', details: 'Black protective case matches description given by owner.' },
      { factor: 'Location Proximity', status: 'medium', details: 'Found in adjacent student union study area.' }
    ],
    explanation: 'Strong match between reported missing silver headphones and turned-in unit at Student Union reception.'
  }
];

export const categories = [
  'All Categories',
  'Electronics',
  'Bags & Luggage',
  'Personal Accessories',
  'Everyday Essentials',
  'Keys & Badges',
  'Books & Documents'
];
