// Firebase imports
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId,
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_ANALYTICS = getAnalytics(FIREBASE_APP);

export function logRestaurantVisit(restaurantId) {
  // const url = `https://tfg-nico-ruben.web.app/restaurant/${restaurantId}`;
  // first in local
  const url = `http://localhost:5173/restaurant/${restaurantId}`;
  logEvent(FIREBASE_ANALYTICS, `RestaurantVisits-${restaurantId}`, {
    url: url,
  });
}
