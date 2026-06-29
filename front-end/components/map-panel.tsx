// "use client"

// import { NearbyPlace } from "@/types/Property/nearbyPlace"
// import { MapPin } from "lucide-react"


// interface MapPanelProps {
//   location: string
//   city: string
//   nearbyPOI: NearbyPlace[]
// }

// export function MapPanel({ location, city, nearbyPOI }: MapPanelProps) {
//   return (
//     <div className="overflow-hidden rounded-2xl border border-border bg-card">
//       {/* Map placeholder with indigo styling */}
//       <div className="relative aspect-square bg-gradient-to-br from-primary/5 via-primary/10 to-primary/20">
//         {/* Street grid pattern */}
//         <div className="absolute inset-0 opacity-30">
//           <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//               <pattern
//                 id="grid"
//                 width="40"
//                 height="40"
//                 patternUnits="userSpaceOnUse"
//               >
//                 <path
//                   d="M 40 0 L 0 0 0 40"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="1"
//                   className="text-primary/40"
//                 />
//               </pattern>
//             </defs>
//             <rect width="100%" height="100%" fill="url(#grid)" />
//           </svg>
//         </div>

//         {/* Walking radius ring */}
//         <div className="absolute top-1/2 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-primary/30" />
//         <div className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-primary/20" />

//         {/* Property pin marker */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//           <div className="relative">
//             <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-lg">
//               <MapPin className="h-6 w-6 text-primary-foreground" />
//             </div>
//             <div className="absolute -bottom-1 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-primary" />
//           </div>
//         </div>

//         {/* Location label */}
//         <div className="absolute bottom-4 left-4 rounded-xl bg-background/90 px-3 py-2 backdrop-blur-sm">
//           <p className="text-sm font-medium text-foreground">{location}</p>
//           <p className="text-xs text-muted-foreground">{city}</p>
//         </div>
//       </div>

//       {/* POI chips */}
//       <div className="border-t border-border p-4">
//         <h4 className="mb-3 text-sm font-medium text-foreground">
//           Nearby places
//         </h4>
//         <div className="flex flex-wrap gap-2">
//           {nearbyPOI.map((poi, index) => (
//             <div
//               key={index}
//               className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-sm"
//             >
//               {/* <span>{poi.icon}</span> */}
//               <span className="font-medium text-secondary-foreground">
//                 {poi.name}
//               </span>
//               <span className="text-muted-foreground">— {poi.distance}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }
