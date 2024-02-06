// If you are using third-party API
"use client"

import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function Home() {
  const Map = useMemo(() => dynamic(
    () => import('@/app/map'),
    { 
      loading: () => <p>A map is loading</p>,
      // need to disable SSR for map to work
      ssr: false
    }
  ), []);

  return (
    <main>
      <div>
          <Map />
      </div>
    </main>
    
  );
}
