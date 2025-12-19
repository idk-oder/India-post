
export interface WeatherData {
  condition: string;
  description: string;
  temp: number;
  icon: string;
  lat: number;
  lon: number;
}

export interface PredictionResult {
  delayHours: number;
  confidence: number;
  reason: string;
}

export interface ActivityLog {
  id: string;
  status: string;
  location: string;
  timestamp: string;
  details: string;
}

export interface LatLng {
  lng: number;
  lat: number;
  name?: string;
}

export interface ParcelData {
  trackingId: string;
  status: 'Collected' | 'In Transit' | 'Out for Delivery' | 'Delivered';
  origin: LatLng;
  destination: LatLng;
  current: LatLng;
  expectedDelivery: string;
  activities: ActivityLog[];
  isTrafficDelayed?: boolean;
}

export enum PageType {
  HOME = 'home',
  LIVE = 'live',
  PREDICTION = 'prediction',
  PROGRESS = 'progress',
  NOTIFICATIONS = 'notifications',
  SETTINGS = 'settings',
  PROFILE = 'profile'
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  timestamp: string;
  read: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
}

export type Language = 'EN' | 'HI' | 'TE';
