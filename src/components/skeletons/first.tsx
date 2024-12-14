"use client";
import React from "react";
import dynamic from 'next/dynamic';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Image from 'next/image';

// Add this CSS class at the top of your component
const pulsingCircle = {
  animation: "pulsing 2s infinite",
  "@keyframes pulsing": {
    "0%": {
      transform: "scale(0.95)",
      opacity: 0.5,
    },
    "70%": {
      transform: "scale(1.1)",
      opacity: 0.3,
    },
    "100%": {
      transform: "scale(0.95)",
      opacity: 0.5,
    },
  },
};

export const SkeletonOne = () => {
  const berlinPosition: [number, number] = [52.5200, 13.4050];
  const members = [
    { 
      name: "Lukas Weber", 
      location: "Kreuzberg", 
      role: "Tech Lead", 
      position: [52.4965, 13.3617], 
      status: "online", // online, away, offline
      avatar: "https://tabler.io/_next/image?url=%2Favatars%2Fdefault%2Fb0a4b1922813b989103a3616d7111562.png&w=400&q=75"
    },
    { 
      name: "Anna Schmidt", 
      location: "Mitte", 
      role: "Product Manager", 
      position: [52.5200, 13.4050],
      status: "away",
      avatar: "https://tabler.io/_next/image?url=%2Favatars%2Fdefault%2Fbb3d2a58ea153b635a4951d82affb4db.png&w=400&q=75"
    },
    { 
      name: "Max Mueller", 
      location: "Prenzlauer Berg", 
      role: "UX Designer", 
      position: [52.5426, 13.4149],
      status: "offline",
      avatar: "https://tabler.io/_next/image?url=%2Favatars%2Fdefault%2F67b732b96785fd368415dd82951466c1.png&w=400&q=75"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "#22c55e"; // green-500
      case "away": return "#f59e0b";   // amber-500
      case "offline": return "#6b7280"; // gray-500
      default: return "#6b7280";
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="p-4 space-y-4 overflow-y-auto max-h-[500px] relative">
        <div className="w-full md:w-[90%] p-5 mx-auto bg-white dark:bg-neutral-900 shadow-2xl group">
          {/* Map Header */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-2 items-center">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span className="text-sm text-neutral-500">42 Members in Berlin</span>
            </div>
            <div className="flex space-x-2">
              <div className="px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-xs">
                Filter by Industry
              </div>
              <div className="px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-xs">
                Filter by Role
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="relative w-full aspect-[16/7] rounded-xl bg-neutral-100 dark:bg-neutral-800 overflow-hidden mb-[10px]">
            <MapContainer
              key="map"
              center={berlinPosition}
              zoom={12}
              className="h-full w-full rounded-xl"
              zoomControl={true}
              scrollWheelZoom={true}
              attributionControl={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {members.map((member, index) => (
                <React.Fragment key={index}>
                  {member.status === "online" && (
                    <CircleMarker 
                      center={member.position as [number, number]}
                      pathOptions={{ 
                        color: getStatusColor(member.status),
                        fillColor: getStatusColor(member.status),
                        fillOpacity: 0.2,
                        weight: 2,
                        opacity: 0.5,
                        radius: 20,
                        className: "animate-pulse"
                      }}
                    >
                      <style jsx global>{`
                        @keyframes pulsing {
                          0% {
                            stroke-opacity: 0.3;
                            stroke-width: 1;
                          }
                          50% {
                            stroke-opacity: 0.6;
                            stroke-width: 2;
                          }
                          100% {
                            stroke-opacity: 0.3;
                            stroke-width: 1;
                          }
                        }
                        .leaflet-interactive {
                          animation: pulsing 2s infinite;
                        }
                      `}</style>
                    </CircleMarker>
                  )}
                  <CircleMarker 
                    center={member.position as [number, number]}
                    pathOptions={{ 
                      color: getStatusColor(member.status),
                      fillColor: getStatusColor(member.status),
                      fillOpacity: 0.8,
                      weight: 2,
                      radius: 8
                    }}
                  >
                    <Popup>
                      <div className="text-sm">
                        <div className="flex items-center gap-2">
                          <strong>{member.name}</strong>
                          <span 
                            className={`h-2 w-2 rounded-full`}
                            style={{ backgroundColor: getStatusColor(member.status) }}
                          />
                        </div>
                        {member.location} · {member.role}
                      </div>
                    </Popup>
                  </CircleMarker>
                </React.Fragment>
              ))}
            </MapContainer>
          </div>

          {/* Member Cards */}
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {members.map((member, index) => (
              <MemberCard 
                key={index}
                name={member.name} 
                location={member.location} 
                role={member.role}
                status={member.status}
                avatar={member.avatar}
              />
            ))}
          </div>
        </div>
        <div 
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F3EDE5] dark:from-[#1D3640]" 
        />
      </div>
    </div>
  );
};

const MemberCard = ({ 
  name, 
  location, 
  role, 
  status, 
  avatar
}: { 
  name: string; 
  location: string; 
  role: string; 
  status: string;
  avatar: string;
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "#22c55e";
      case "away": return "#f59e0b";
      case "offline": return "#6b7280";
      default: return "#6b7280";
    }
  };

  return (
    <div className="flex-shrink-0 p-3 bg-neutral-50 dark:bg-neutral-800 rounded-lg w-48">
      <div className="flex items-center space-x-2">
        <div className="relative">
          <Image 
            src={avatar} 
            alt={`${name}'s avatar`} 
            width={32} 
            height={32} 
            className="rounded-full" 
          />
          <div 
            className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white dark:border-neutral-800"
            style={{ backgroundColor: getStatusColor(status) }}
          />
        </div>
        <div>
          <div className="text-sm font-medium">{name}</div>
          <div className="text-xs text-neutral-500">{location}</div>
        </div>
      </div>
      <div className="mt-2 text-xs text-neutral-500">{role}</div>
    </div>
  );
};
