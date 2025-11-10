import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import 'dotenv/config';

// Add type for process.env
interface ProcessEnv {
  [key: string]: string | undefined;
}

declare const process: {
  env: ProcessEnv;
  exit: (code?: number) => never;
};

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfzJFWUFy993FR2qoRUdVy_t8S0KosOPo",
  authDomain: "luxedriveke.firebaseapp.com",
  projectId: "luxedriveke",
  storageBucket: "luxedriveke.firebasestorage.app",
  messagingSenderId: "456250680903",
  appId: "1:456250680903:web:714c5999180fa987aff362",
  measurementId: "G-PPQF4P3SP4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to add a delay between operations
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Your fleet data
const fleetData = [
  // Executive SUVs
  {
    make: 'Toyota',
    model: 'Land Cruiser LC200',
    year: 2023,
    category: 'Executive SUVs',
    seats: 8,
    luggageCapacity: '4 Large Bags',
    pricePerDay: 300,
    pricePerWeek: 1800,
    pricePerMonth: 6000,
    minimumRentalDays: 1,
    features: ['V8 Engine', 'Off-Road Capable', 'Premium Interior', '4WD', 'Leather Seats', 'Sunroof', 'Navigation System'],
    transmission: 'Automatic',
    fuelType: 'Diesel',
    engineSize: '4.5L V8',
    imageUrls: ['/images/vehicles/land-cruiser-lc200.jpg'],
    isAvailable: true,
    description: 'The legendary Toyota Land Cruiser LC200 combines off-road capability with luxury. Perfect for both city driving and safari adventures.',
    highlights: ['Perfect for safari tours', 'Spacious and comfortable', 'Excellent for rough terrain'],
    included: ['Free Airport Pickup', '24/7 Roadside Assistance', 'Unlimited Mileage', 'Full Insurance'],
    notIncluded: ['Fuel', 'Parking Fees', 'Airport Drop-off (if different from pickup)'],
    isFeatured: true,
    rating: 4.8,
    reviewCount: 24
  },
  {
    make: 'Toyota',
    model: 'Land Cruiser Prado J150',
    year: 2023,
    category: 'Executive SUVs',
    seats: 7,
    luggageCapacity: '3 Large Bags',
    pricePerDay: 250,
    pricePerWeek: 1500,
    pricePerMonth: 5000,
    minimumRentalDays: 1,
    features: ['All-Terrain Ready', 'Premium Sound', 'Spacious Interior', '4WD', 'Leather Seats', 'Sunroof', 'Navigation'],
    transmission: 'Automatic',
    fuelType: 'Diesel',
    engineSize: '2.8L Turbo Diesel',
    imageUrls: ['/images/vehicles/land-cruiser-prado.jpg'],
    isAvailable: true,
    description: 'Versatile luxury SUV perfect for both city driving and off-road adventures.',
    highlights: ['Great for family trips', 'Excellent fuel efficiency', 'Premium comfort'],
    included: ['Free Airport Pickup', '24/7 Roadside Assistance', 'Unlimited Mileage', 'Full Insurance'],
    notIncluded: ['Fuel', 'Parking Fees'],
    isFeatured: true,
    rating: 4.7,
    reviewCount: 32
  },
  {
    make: 'Lexus',
    model: 'LX 570',
    year: 2023,
    category: 'Executive SUVs',
    seats: 8,
    luggageCapacity: '4 Large Bags',
    pricePerDay: 350,
    pricePerWeek: 2100,
    pricePerMonth: 7000,
    minimumRentalDays: 1,
    features: ['Spacious Interior', 'Premium Sound', 'Superior Comfort', '4WD', 'Leather Seats', 'Panoramic Sunroof'],
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engineSize: '5.7L V8',
    imageUrls: ['/images/vehicles/lx570.jpg'],
    isAvailable: true,
    description: 'Luxury SUV with superior comfort and advanced technology features.',
    highlights: ['Luxury interior', 'Smooth ride', 'Advanced safety features'],
    included: ['Free Airport Pickup', '24/7 Roadside Assistance', 'Unlimited Mileage', 'Full Insurance'],
    notIncluded: ['Fuel', 'Parking Fees'],
    isFeatured: true,
    rating: 4.8,
    reviewCount: 28
  },
  {
    make: 'Mercedes',
    model: 'GLC',
    year: 2023,
    category: 'Executive SUVs',
    seats: 5,
    luggageCapacity: '2 Large Bags',
    pricePerDay: 200,
    pricePerWeek: 1200,
    pricePerMonth: 4000,
    minimumRentalDays: 1,
    features: ['Premium Technology', 'Efficient Performance', 'Elegant Design', 'Leather Seats', 'Panoramic Sunroof'],
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engineSize: '2.0L Turbo',
    imageUrls: ['/images/vehicles/mercedes-glc.jpg'],
    isAvailable: true,
    description: 'Elegant and efficient luxury SUV for city driving.',
    highlights: ['Great fuel economy', 'Luxurious interior', 'Advanced tech features'],
    included: ['Free Airport Pickup', '24/7 Roadside Assistance', 'Unlimited Mileage', 'Full Insurance'],
    notIncluded: ['Fuel', 'Parking Fees'],
    isFeatured: true,
    rating: 4.6,
    reviewCount: 35
  },
  {
    make: 'Mercedes',
    model: 'GLE',
    year: 2023,
    category: 'Executive SUVs',
    seats: 5,
    luggageCapacity: '3 Large Bags',
    pricePerDay: 280,
    pricePerWeek: 1700,
    pricePerMonth: 5800,
    minimumRentalDays: 1,
    features: ['Spacious Interior', 'Advanced Technology', 'Premium Comfort', '4MATIC', 'Leather Seats', 'Panoramic Sunroof'],
    transmission: 'Automatic',
    fuelType: 'Diesel',
    engineSize: '3.0L V6',
    imageUrls: ['/images/vehicles/mercedes-gle.jpg'],
    isAvailable: true,
    description: 'Premium midsize luxury SUV with advanced technology and comfort features.',
    highlights: ['Spacious cabin', 'Smooth ride', 'High-tech features'],
    included: ['Free Airport Pickup', '24/7 Roadside Assistance', 'Unlimited Mileage', 'Full Insurance'],
    notIncluded: ['Fuel', 'Parking Fees'],
    isFeatured: true,
    rating: 4.7,
    reviewCount: 29
  },
  {
    make: 'Mercedes',
    model: 'G-Wagon',
    year: 2023,
    category: 'Executive SUVs',
    seats: 5,
    luggageCapacity: '3 Large Bags',
    pricePerDay: 500,
    pricePerWeek: 3000,
    pricePerMonth: 10000,
    minimumRentalDays: 1,
    features: ['Premium Leather', 'Advanced Safety', 'All-Terrain Capable', '4MATIC', 'Panoramic Sunroof', 'Burmester Sound System'],
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engineSize: '4.0L V8',
    imageUrls: ['/images/vehicles/g-wagon.jpg'],
    isAvailable: true,
    description: 'The iconic Mercedes G-Wagon combines luxury with exceptional off-road capabilities.',
    highlights: ['Iconic design', 'Luxury interior', 'Exceptional off-road capability'],
    included: ['Free Airport Pickup', '24/7 Roadside Assistance', 'Unlimited Mileage', 'Full Insurance'],
    notIncluded: ['Fuel', 'Parking Fees'],
    isFeatured: true,
    rating: 4.9,
    reviewCount: 18
  },
  {
    make: 'Range Rover',
    model: 'Vogue',
    year: 2023,
    category: 'Executive SUVs',
    seats: 5,
    luggageCapacity: '3 Large Bags',
    pricePerDay: 450,
    pricePerWeek: 2700,
    pricePerMonth: 9000,
    minimumRentalDays: 1,
    features: ['Air Suspension', 'Panoramic Roof', 'Luxury Interior', 'Terrain Response', 'Premium Sound System'],
    transmission: 'Automatic',
    fuelType: 'Diesel',
    engineSize: '3.0L V6',
    imageUrls: ['/images/vehicles/range-rover-vogue.jpg'],
    isAvailable: true,
    description: 'The epitome of British luxury with exceptional comfort and capability.',
    highlights: ['Luxury interior', 'Smooth ride', 'Premium features'],
    included: ['Free Airport Pickup', '24/7 Roadside Assistance', 'Unlimited Mileage', 'Full Insurance'],
    notIncluded: ['Fuel', 'Parking Fees'],
    isFeatured: true,
    rating: 4.8,
    reviewCount: 22
  },
  {
    make: 'Porsche',
    model: 'Cayenne',
    year: 2023,
    category: 'Executive SUVs',
    seats: 5,
    luggageCapacity: '2 Large Bags',
    pricePerDay: 400,
    pricePerWeek: 2400,
    pricePerMonth: 8000,
    minimumRentalDays: 1,
    features: ['Sport Performance', 'Premium Interior', 'Advanced Technology', 'Panoramic Sunroof', 'Sports Exhaust'],
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engineSize: '3.0L V6',
    imageUrls: ['/images/vehicles/porsche-cayenne.jpg'],
    isAvailable: true,
    description: 'Sports car performance in a luxury SUV package.',
    highlights: ['Sporty handling', 'Luxury interior', 'High performance'],
    included: ['Free Airport Pickup', '24/7 Roadside Assistance', 'Unlimited Mileage', 'Full Insurance'],
    notIncluded: ['Fuel', 'Parking Fees'],
    isFeatured: true,
    rating: 4.7,
    reviewCount: 26
  },
  {
    make: 'BMW',
    model: 'X6',
    year: 2023,
    category: 'Executive SUVs',
    seats: 5,
    luggageCapacity: '2 Large Bags',
    pricePerDay: 380,
    pricePerWeek: 2300,
    pricePerMonth: 7500,
    minimumRentalDays: 1,
    features: ['Sporty Design', 'Luxury Interior', 'Dynamic Performance', 'Panoramic Sunroof', 'Premium Sound'],
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engineSize: '3.0L TwinPower Turbo',
    imageUrls: ['/images/vehicles/bmw-x6.jpg'],
    isAvailable: true,
    description: 'Sporty and luxurious coupe-SUV with dynamic performance.',
    highlights: ['Sporty design', 'Luxury features', 'Great handling'],
    included: ['Free Airport Pickup', '24/7 Roadside Assistance', 'Unlimited Mileage', 'Full Insurance'],
    notIncluded: ['Fuel', 'Parking Fees'],
    isFeatured: true,
    rating: 4.6,
    reviewCount: 24
  },
  // Luxury Sedans
  {
    make: 'Mercedes',
    model: 'S-Class',
    year: 2023,
    category: 'Luxury Sedans',
    seats: 4,
    luggageCapacity: '2 Large Bags',
    pricePerDay: 350,
    pricePerWeek: 2100,
    pricePerMonth: 7000,
    minimumRentalDays: 1,
    features: ['Massage Seats', 'Executive Rear', 'Premium Technology', 'Burmester Sound', 'Ambient Lighting'],
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engineSize: '3.0L Inline-6',
    imageUrls: ['/images/vehicles/mercedes-s-class.jpg'],
    isAvailable: true,
    description: 'The ultimate in luxury sedans with cutting-edge technology and comfort.',
    highlights: ['Ultimate luxury', 'Advanced technology', 'Executive comfort'],
    included: ['Free Airport Pickup', '24/7 Roadside Assistance', 'Unlimited Mileage', 'Full Insurance'],
    notIncluded: ['Fuel', 'Parking Fees'],
    isFeatured: true,
    rating: 4.9,
    reviewCount: 30
  },
  {
    make: 'Mercedes',
    model: 'C200',
    year: 2023,
    category: 'Luxury Sedans',
    seats: 5,
    luggageCapacity: '1 Large Bag',
    pricePerDay: 180,
    pricePerWeek: 1100,
    pricePerMonth: 3800,
    minimumRentalDays: 1,
    features: ['Premium Interior', 'Advanced Safety', 'Efficient Performance', 'MBUX System', 'LED Lighting'],
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engineSize: '2.0L Turbo',
    imageUrls: ['/images/vehicles/mercedes-c200.jpg'],
    isAvailable: true,
    description: 'Compact luxury sedan with premium features and efficient performance.',
    highlights: ['Great value', 'Premium features', 'Efficient'],
    included: ['Free Airport Pickup', '24/7 Roadside Assistance', 'Unlimited Mileage', 'Full Insurance'],
    notIncluded: ['Fuel', 'Parking Fees'],
    isFeatured: true,
    rating: 4.5,
    reviewCount: 42
  },
  {
    make: 'Toyota',
    model: 'Crown',
    year: 2023,
    category: 'Luxury Sedans',
    seats: 5,
    luggageCapacity: '2 Large Bags',
    pricePerDay: 150,
    pricePerWeek: 900,
    pricePerMonth: 3000,
    minimumRentalDays: 1,
    features: ['Spacious Interior', 'Premium Comfort', 'Reliable Performance', 'Advanced Safety', 'Infotainment System'],
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    engineSize: '2.5L Hybrid',
    imageUrls: ['/images/vehicles/toyota-crown.jpg'],
    isAvailable: true,
    description: 'Comfortable and reliable luxury sedan with hybrid efficiency.',
    highlights: ['Great fuel economy', 'Comfortable ride', 'Reliable'],
    included: ['Free Airport Pickup', '24/7 Roadside Assistance', 'Unlimited Mileage', 'Full Insurance'],
    notIncluded: ['Fuel', 'Parking Fees'],
    isFeatured: true,
    rating: 4.4,
    reviewCount: 38
  },
  {
    make: 'Toyota',
    model: 'Mark X',
    year: 2023,
    category: 'Luxury Sedans',
    seats: 5,
    luggageCapacity: '2 Large Bags',
    pricePerDay: 140,
    pricePerWeek: 850,
    pricePerMonth: 2800,
    minimumRentalDays: 1,
    features: ['Sport Performance', 'Premium Interior', 'Advanced Technology', 'Sunroof', 'Premium Sound'],
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engineSize: '2.5L V6',
    imageUrls: ['/toyota-mark-x.jpg'],
    isAvailable: true,
    description: 'Sporty luxury sedan with a balance of performance and comfort.',
    highlights: ['Sporty design', 'Comfortable interior', 'Good performance'],
    included: ['Free Airport Pickup', '24/7 Roadside Assistance', 'Unlimited Mileage', 'Full Insurance'],
    notIncluded: ['Fuel', 'Parking Fees'],
    isFeatured: true,
    rating: 4.3,
    reviewCount: 35
  },
  {
    make: 'Audi',
    model: 'A6',
    year: 2023,
    category: 'Luxury Sedans',
    seats: 5,
    luggageCapacity: '2 Large Bags',
    pricePerDay: 220,
    pricePerWeek: 1300,
    pricePerMonth: 4500,
    minimumRentalDays: 1,
    features: ['Quattro Drive', 'Premium Technology', 'Luxury Interior', 'Virtual Cockpit', 'Bang & Olufsen Sound'],
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engineSize: '2.0L Turbo',
    imageUrls: ['/images/vehicles/audi-a6.jpg'],
    isAvailable: true,
    description: 'Sophisticated luxury sedan with cutting-edge technology and Quattro all-wheel drive.',
    highlights: ['Advanced technology', 'Comfortable ride', 'Premium interior'],
    included: ['Free Airport Pickup', '24/7 Roadside Assistance', 'Unlimited Mileage', 'Full Insurance'],
    notIncluded: ['Fuel', 'Parking Fees'],
    isFeatured: true,
    rating: 4.6,
    reviewCount: 31
  },
  // Executive Vans & Transfers
  {
    make: 'Toyota',
    model: 'Alphard',
    year: 2023,
    category: 'Executive Vans & Transfers',
    seats: 7,
    luggageCapacity: '4 Large Bags',
    pricePerDay: 200,
    pricePerWeek: 1200,
    pricePerMonth: 4000,
    minimumRentalDays: 1,
    features: ['Spacious Interior', 'Premium Comfort', 'Electric Doors', 'Rear Entertainment', 'Captain Seats'],
    transmission: 'Automatic',
    fuelType: 'Petrol',
    engineSize: '2.5L Hybrid',
    imageUrls: ['/images/vehicles/toyota-alphard.jpg'],
    isAvailable: true,
    description: 'Luxury MPV with premium comfort and spacious interior for group travel.',
    highlights: ['Spacious interior', 'Premium comfort', 'Great for groups'],
    included: ['Free Airport Pickup', '24/7 Roadside Assistance', 'Unlimited Mileage', 'Full Insurance'],
    notIncluded: ['Fuel', 'Parking Fees'],
    isFeatured: true,
    rating: 4.7,
    reviewCount: 27
  },
  {
    make: 'Mercedes',
    model: 'V-Class',
    year: 2023,
    category: 'Executive Vans & Transfers',
    seats: 7,
    luggageCapacity: '5 Large Bags',
    pricePerDay: 250,
    pricePerWeek: 1500,
    pricePerMonth: 5000,
    minimumRentalDays: 1,
    features: ['Premium Interior', 'Advanced Safety', 'Flexible Seating', 'Panoramic Roof', 'Ambient Lighting'],
    transmission: 'Automatic',
    fuelType: 'Diesel',
    engineSize: '2.0L Turbo Diesel',
    imageUrls: ['/images/vehicles/mercedes-v-class.jpg'],
    isAvailable: true,
    description: 'Luxury people carrier with premium features and ample space for passengers and luggage.',
    highlights: ['Luxury interior', 'Spacious cabin', 'Premium features'],
    included: ['Free Airport Pickup', '24/7 Roadside Assistance', 'Unlimited Mileage', 'Full Insurance'],
    notIncluded: ['Fuel', 'Parking Fees'],
    isFeatured: true,
    rating: 4.8,
    reviewCount: 23
  }
];

async function seedDatabase() {
  try {
    const carsCollection = collection(db, 'cars');
    
    for (const car of fleetData) {
      try {
        await addDoc(carsCollection, {
          ...car,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        console.log(`✅ Added ${car.make} ${car.model} to Firestore`);
        
        // Add a small delay to avoid rate limiting
        await delay(200);
      } catch (error) {
        console.error(`❌ Error adding ${car.make} ${car.model}:`, error);
      }
    }
    
    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase().catch(error => {
  console.error('Unhandled error in seed script:', error);
  process.exit(1);
});
