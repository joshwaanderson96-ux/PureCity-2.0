import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ArrowLeft, Filter, Layers, Navigation, Loader2 } from "lucide-react";
import { Icon } from "leaflet";

// Fix for default marker icon in leaflet with bundler
const DefaultIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Mock issues data
const mockIssues = [
  { id: 1, lat: 28.6139, lng: 77.2090, type: "waste", status: "open", desc: "Large debris pile" },
  { id: 2, lat: 28.6150, lng: 77.2150, type: "pothole", status: "in-progress", desc: "Main road pothole" },
  { id: 3, lat: 28.6100, lng: 77.2000, type: "water", status: "open", desc: "Pipeline leak" },
  { id: 4, lat: 28.6200, lng: 77.2200, type: "streetlight", status: "resolved", desc: "Light post down" },
];

function RecenterMap({ position }: { position: {lat: number, lng: number} | null }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView([position.lat, position.lng], map.getZoom(), { animate: true });
    }
  }, [position, map]);
  return null;
}

export default function ExploreMap() {
  const [userLoc, setUserLoc] = useState<{lat: number, lng: number} | null>(null);
  const [loadingLoc, setLoadingLoc] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const getUserLocation = () => {
    setLoadingLoc(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setLoadingLoc(false);
        },
        (err) => {
          console.error(err);
          alert("Could not get location. Ensure GPS is allowed.");
          setLoadingLoc(false);
        }
      );
    } else {
      alert("Geolocation is not supported in this browser.");
      setLoadingLoc(false);
    }
  };

  useEffect(() => {
    // Optionally trigger immediately
    // getUserLocation();
  }, []);

  const defaultCenter = { lat: 28.6139, lng: 77.2090 }; // Delhi format
  const center = userLoc || defaultCenter;

  const filteredIssues = activeFilter === "all" ? mockIssues : mockIssues.filter(i => i.type === activeFilter);

  return (
    <div className="flex-grow flex flex-col h-[calc(100vh-64px)] relative">
      <div className="absolute top-4 left-4 z-[400] bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl shadow-xl max-w-sm w-[calc(100%-2rem)]">
         <Link to="/home" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
         </Link>
         <h1 className="text-2xl font-bold dark:text-white mb-2">City Activity Map</h1>
         <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">View real-time, geolocated civic reports across the city structure.</p>

         <button 
           onClick={getUserLocation}
           className="w-full flex justify-center items-center gap-2 bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors mb-4"
           disabled={loadingLoc}
         >
           {loadingLoc ? <Loader2 className="w-4 h-4 animate-spin"/> : <Navigation className="w-4 h-4" />}
           {loadingLoc ? "Locating..." : "Find My Location"}
         </button>

         <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Filters</p>
            <div className="flex flex-wrap gap-2">
              {['all', 'waste', 'pothole', 'water', 'streetlight'].map(f => (
                <button 
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize border transition-colors ${activeFilter === f ? 'bg-primary text-white border-primary' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-transparent hover:border-slate-300'}`}
                >
                  {f}
                </button>
              ))}
            </div>
         </div>
      </div>

      <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
         <div className="bg-white/90 dark:bg-slate-900/90 p-2 rounded-xl shadow-lg flex flex-col items-center border border-slate-200 dark:border-slate-700">
           <button className="p-2 hover:text-primary transition-colors tooltip" title="Layers"><Layers className="w-5 h-5"/></button>
           <div className="h-px w-full bg-slate-200 dark:bg-slate-700 my-1"></div>
           <button className="p-2 hover:text-primary transition-colors tooltip" title="Toggle Heatmap"><Filter className="w-5 h-5"/></button>
         </div>
      </div>

      <div className="flex-grow w-full z-0 relative">
        <MapContainer center={[center.lat, center.lng]} zoom={13} scrollWheelZoom={true} className="w-full h-full" zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <RecenterMap position={userLoc} />

          {/* User Location Marker */}
          {userLoc && (
            <Marker position={[userLoc.lat, userLoc.lng]} icon={DefaultIcon}>
              <Popup>
                You are here.
              </Popup>
            </Marker>
          )}

          {/* Issue Markers */}
          {filteredIssues.map((issue) => (
             <Circle 
               key={issue.id}
               center={[issue.lat, issue.lng]}
               radius={issue.status === 'resolved' ? 50 : 150}
               pathOptions={{ 
                 color: issue.status === 'open' ? 'red' : issue.status === 'resolved' ? 'green' : 'orange',
                 fillColor: issue.status === 'open' ? 'red' : issue.status === 'resolved' ? 'green' : 'orange',
                 fillOpacity: 0.4
               }}
             >
               <Popup>
                 <div className="p-1">
                   <p className="font-bold capitalize">{issue.type}</p>
                   <p className="text-sm">{issue.desc}</p>
                   <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full text-white ${issue.status === 'open' ? 'bg-red-500' : issue.status === 'resolved' ? 'bg-green-500' : 'bg-orange-500'}`}>
                     {issue.status}
                   </span>
                 </div>
               </Popup>
             </Circle>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
