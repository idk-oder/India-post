
import { ParcelData } from './types';

export const INDIA_POST_RED = '#DA251D';

export const MOCK_PARCELS: Record<string, ParcelData> = {
  'IP123456789IN': {
    trackingId: 'IP123456789IN',
    status: 'In Transit',
    origin: { name: 'New Delhi (DPH)', lat: 28.6139, lng: 77.2090 },
    destination: { name: 'Hyderabad (HYD)', lat: 17.3850, lng: 78.4867 },
    current: { lat: 21.1458, lng: 79.0882, name: 'Nagpur Transit Hub' },
    expectedDelivery: '2023-10-26T10:00:00',
    activities: [
      { id: '1', status: 'In Transit', location: 'Nagpur Logistics Hub', timestamp: 'Oct 24, 2023, 14:20', details: 'Parcel processed and departed towards Hyderabad.' },
      { id: '2', status: 'Processed', location: 'New Delhi Sorting Office', timestamp: 'Oct 23, 2023, 09:15', details: 'Item sorted at the automated hub.' },
      { id: '3', status: 'Collected', location: 'Delhi Main GPO', timestamp: 'Oct 22, 2023, 16:45', details: 'Package successfully picked up from sender.' }
    ]
  },
  'IP555666777IN': {
    trackingId: 'IP555666777IN',
    status: 'In Transit',
    origin: { name: 'Mumbai (BOM)', lat: 19.0760, lng: 72.8777 },
    destination: { name: 'Pune (PNQ)', lat: 18.5204, lng: 73.8567 },
    current: { lat: 18.7500, lng: 73.4000, name: 'Lonavala Ghat Area' },
    expectedDelivery: '2023-10-25T18:00:00',
    isTrafficDelayed: true,
    activities: [
      { id: 't1', status: 'In Transit', location: 'Mumbai-Pune Expressway', timestamp: 'Oct 25, 2023, 15:30', details: 'Delayed due to heavy traffic congestion at Lonavala Ghat.' },
      { id: 't2', status: 'Collected', location: 'Mumbai Central GPO', timestamp: 'Oct 25, 2023, 09:00', details: 'Item received and dispatched for regional transit.' }
    ]
  },
  'IP987654321IN': {
    trackingId: 'IP987654321IN',
    status: 'Out for Delivery',
    origin: { name: 'Hyderabad (HYD)', lat: 17.3850, lng: 78.4867 },
    destination: { name: 'Vijayawada (VJD)', lat: 16.5062, lng: 80.6480 },
    current: { lat: 16.5500, lng: 80.6000, name: 'Benz Circle, Vijayawada' },
    expectedDelivery: '2023-10-25T14:00:00',
    activities: [
      { id: 'a1', status: 'Out for Delivery', location: 'Vijayawada Central', timestamp: 'Oct 25, 2023, 08:30', details: 'Out with delivery executive.' },
      { id: 'a2', status: 'In Transit', location: 'Suryapet Transit Point', timestamp: 'Oct 24, 2023, 20:15', details: 'Moving towards destination city.' },
      { id: 'a3', status: 'Collected', location: 'Hyderabad GPO', timestamp: 'Oct 24, 2023, 10:00', details: 'Consignment received at counter.' }
    ]
  },
  'IP456789123IN': {
    trackingId: 'IP456789123IN',
    status: 'Collected',
    origin: { name: 'Bangalore (BLR)', lat: 12.9716, lng: 77.5946 },
    destination: { name: 'Guntur (GNT)', lat: 16.3067, lng: 80.4365 },
    current: { lat: 12.9716, lng: 77.5946, name: 'Bangalore Parcel Hub' },
    expectedDelivery: '2023-10-28T18:00:00',
    activities: [
      { id: 'b1', status: 'Collected', location: 'Bangalore City GPO', timestamp: 'Oct 25, 2023, 11:30', details: 'Package registered and weighing completed.' }
    ]
  },
  'IP321654987IN': {
    trackingId: 'IP321654987IN',
    status: 'In Transit',
    origin: { name: 'Mumbai (BOM)', lat: 19.0760, lng: 72.8777 },
    destination: { name: 'Chennai (MAA)', lat: 13.0827, lng: 80.2707 },
    current: { lat: 17.6773, lng: 75.9064, name: 'Solapur Sorting Center' },
    expectedDelivery: '2023-10-27T09:00:00',
    activities: [
      { id: 'c1', status: 'In Transit', location: 'Solapur Transit Point', timestamp: 'Oct 25, 2023, 15:45', details: 'Consignment in transit by rail.' },
      { id: 'c2', status: 'Collected', location: 'Mumbai Central GPO', timestamp: 'Oct 24, 2023, 12:00', details: 'Item picked up for express delivery.' }
    ]
  }
};

export const MOCK_ACTIVITIES = MOCK_PARCELS['IP123456789IN'].activities;
export const PARCEL_COORDS = MOCK_PARCELS['IP123456789IN'];
