import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  category: string;
  seats: number;
  luggageCapacity: string;
  pricePerDay: number;
  features: string[];
  imageUrls: string[];
  description: string;
  highlights: string[];
  included: string[];
  notIncluded: string[];
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
}

export const useFleet = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        console.log('Fetching vehicles from Firestore...');
        const querySnapshot = await getDocs(collection(db, 'cars'));
        console.log('Firestore query result:', querySnapshot);
        
        const vehiclesData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          console.log(`Vehicle ${doc.id}:`, data);
          return {
            id: doc.id,
            ...data
          } as Vehicle;
        });
        
        console.log('Processed vehicles data:', vehiclesData);
        setVehicles(vehiclesData);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
        console.error('Error fetching vehicles:', err);
      }
    };

    fetchVehicles();
  }, []);

  // Group vehicles by category
  const categories = [
    {
      title: 'Executive SUVs',
      description: 'Command respect with our premium SUV collection',
      icon: 'Briefcase',
      vehicles: vehicles.filter(vehicle => vehicle.category === 'Executive SUVs')
    },
    {
      title: 'Luxury Sedans',
      description: 'Elegance and sophistication in every mile',
      icon: 'Users',
      vehicles: vehicles.filter(vehicle => vehicle.category === 'Luxury Sedans')
    },
    {
      title: 'Executive Vans & Transfers',
      description: 'Premium group transport and airport transfers',
      icon: 'Bus',
      vehicles: vehicles.filter(vehicle => vehicle.category === 'Executive Vans & Transfers')
    }
  ];

  console.log('Categories with vehicles:', categories);
  return { categories, loading, error };
  
};
