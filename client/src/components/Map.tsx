import { useEffect, useRef } from "react";

interface MapViewProps {
  initialCenter: { lat: number; lng: number };
  initialZoom: number;
  onMapReady?: (map: google.maps.Map) => void;
}

const API_KEY = import.meta.env.VITE_FRONTEND_FORGE_API_KEY;

function loadGoogleMaps(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof google !== "undefined" && google.maps) {
      resolve();
      return;
    }
    if (document.getElementById("google-maps-script")) {
      const check = setInterval(() => {
        if (typeof google !== "undefined" && google.maps) {
          clearInterval(check);
          resolve();
        }
      }, 100);
      return;
    }
    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = "https://maps.googleapis.com/maps/api/js?key=" + API_KEY + "&v=weekly&libraries=marker";
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Maps"));
    document.head.appendChild(script);
  });
}

export function MapView({ initialCenter, initialZoom, onMapReady }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadGoogleMaps().then(() => {
      if (!containerRef.current) return;
      const map = new google.maps.Map(containerRef.current, {
        center: initialCenter,
        zoom: initialZoom,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      });
      if (onMapReady) onMapReady(map);
    }).catch(console.error);
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}
