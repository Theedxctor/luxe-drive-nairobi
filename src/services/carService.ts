import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface Car {
  id?: string;
  make: string;
  model: string;
  year: number;
  pricePerDay: number;
  available: boolean;
  imageUrl: string;
  description?: string;
}

const CARS_COLLECTION = 'cars';

export const getCars = async (): Promise<Car[]> => {
  const querySnapshot = await getDocs(collection(db, CARS_COLLECTION));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Car[];
};

export const addCar = async (car: Omit<Car, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, CARS_COLLECTION), car);
  return docRef.id;
};

export const updateCar = async (id: string, car: Partial<Car>): Promise<void> => {
  const carRef = doc(db, CARS_COLLECTION, id);
  await updateDoc(carRef, car);
};

export const deleteCar = async (id: string): Promise<void> => {
  const carRef = doc(db, CARS_COLLECTION, id);
  await deleteDoc(carRef);
};
