
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { INDIA_POST_RED } from '../../constants';
import { LatLng } from '../../types';
import { Loader2 } from 'lucide-react';

interface ParcelMapProps {
  className?: string;
  origin: LatLng;
  destination: LatLng;
  current: LatLng;
  t: (key: string) => string;
}

const ParcelMap: React.FC<ParcelMapProps> = ({ className, origin, destination, current, t }) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  const markersRef = useRef<L.LayerGroup | null>(null);
  const polylineRef = useRef<L.Polyline | null>(null);

  const updateMapLayers = () => {
    if (!mapRef.current) return;

    if (markersRef.current) markersRef.current.clearLayers();
    else markersRef.current = L.layerGroup().addTo(mapRef.current);

    if (polylineRef.current) polylineRef.current.remove();

    const coordsOrigin: [number, number] = [origin.lat, origin.lng];
    const coordsDest: [number, number] = [destination.lat, destination.lng];
    const coordsCurrent: [number, number] = [current.lat, current.lng];

    const originIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div class="custom-marker-pin" style="background: #22c55e;"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
    L.marker(coordsOrigin, { icon: originIcon })
      .bindPopup(`<b>${t('origin')}:</b> ${origin.name}`)
      .addTo(markersRef.current);

    const destIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div class="custom-marker-pin" style="background: ${INDIA_POST_RED};"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
    L.marker(coordsDest, { icon: destIcon })
      .bindPopup(`<b>${t('destination')}:</b> ${destination.name}`)
      .addTo(markersRef.current);

    const currentIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `<div class="custom-marker-pin live-marker-pulse"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
    L.marker(coordsCurrent, { icon: currentIcon })
      .bindPopup(`<b>Live Status:</b> ${t('steps.InTransit')}`)
      .addTo(markersRef.current);

    polylineRef.current = L.polyline([coordsOrigin, coordsCurrent, coordsDest], {
      color: INDIA_POST_RED,
      weight: 3,
      opacity: 0.7,
      dashArray: '5, 10'
    }).addTo(mapRef.current);

    const bounds = L.latLngBounds([coordsOrigin, coordsDest, coordsCurrent]);
    mapRef.current.fitBounds(bounds, { padding: [40, 40], maxZoom: 10 });
  };

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [20.5937, 78.9629],
      zoom: 5,
      zoomControl: false,
      attributionControl: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;
    setLoading(false);

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(containerRef.current);

    updateMapLayers();

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!loading && mapRef.current) {
      updateMapLayers();
    }
  }, [origin, destination, current, loading, t]);

  return (
    <div className={`relative w-full h-full bg-slate-100 dark:bg-slate-800 ${className} transition-colors`}>
      {loading && (
        <div className="absolute inset-0 z-[1000] flex flex-col items-center justify-center bg-white/90 dark:bg-slate-900/90 transition-colors">
          <Loader2 className="animate-spin text-red-600 mb-2" size={32} />
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{t('loadingMap')}</p>
        </div>
      )}
      <div ref={containerRef} className="w-full h-full rounded-xl overflow-hidden" />
    </div>
  );
};

export default ParcelMap;
