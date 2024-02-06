import { MapContainer, Marker, TileLayer, Popup, GeoJSON } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import Image from "next/image";
import regionData from "./data/region_i.json";
import officesData from "./data/offices.json";

export default function MyMap() {  
    let objRegionColor = {
      fillColor: "green",
      fillOpacity: 0.4,
      color: "black",
      weight: 2
    };
  
    let objMarkers = officesData.offices;
  
    const onEachRegion = (regionName: any, layer: any) => {
      const strRegions: string = regionName.properties.PROVINCE;
      const objDetails = regionName.properties.DETAILS;
  
      const popupContent = `
        <div style="
            display: flex; 
            flex-direction: column;
            align-items: center;
            justify-content: center;">
                <img src="/DA-LOGO-1024x1024.png" alt="Your Logo" width="100" height="100">
                <h1><b>${strRegions}</b></h1>
        </div>
        <hr/>
        <div style="margin-top: 10px">
            <span><b>Area:</b> ${objDetails.area}</span><br/>
            <span><b>Alienable and Disposable:</b> ${objDetails.alienableAndDisposable}</span><br/>
            <span><b>Forest:</b> ${objDetails.forest}</span><br/>
            <span><b>No. of Farmers:</b> ${objDetails.population}</span><br/>
            <br/>
            <div style="
            display: flex; 
            flex-direction: column;
            align-items: center;
            justify-content: center;">
                <span><b>Districts:<br/></b></span><div>${objDetails.districts}</div><br/>
                <span><b>${objDetails.cities > 1 ? "Cities" : "City"}:</b></span><div>${objDetails.cities}</div><br/>
                <span><b>Municipalities:</b></span><div>${objDetails.municipalities}</div><br/>
                <span><b>Barangays:</b></span><div>${objDetails.barangays}</div>
            </div>
          
        </div>
      `;
  
      layer.bindPopup(popupContent);
  
      layer.on({
        mouseover: (event: any) => {
            event.target.setStyle({
                fillColor: "yellow"
            });
        },
        mouseout: (event: any) => {
            event.target.setStyle(objRegionColor);
        }
      });
    };
  
    return (
      <MapContainer 
        // never forget this style to show map
        style={{ width: "100%", height: "100vh" }}
        center={[17.094, 120.6]} 
        zoom={8} 
        scrollWheelZoom={true}>
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Markers and Popup */}
        {
            objMarkers.map( (marker, index) => {
                return (
                <Marker key={index} position={[marker.geocode[0], marker.geocode[1]]}>
                    <Popup>
                    <div className="flex items-center">
                        <div>
                        <Image
                            src="/DA-LOGO-1024x1024.png"
                            width={100}
                            height={100}
                            alt="Picture of the author"
                        />
                        </div>
                        <div className="ml-2">
                        <b>{marker.office}</b>
                        <br />
                        <span>{marker.location}</span>
                        </div>
                    </div>
                    </Popup>
                </Marker>
                )
            })
        }
        
        {/* GeoJSON */}
        <GeoJSON 
            style={objRegionColor} 
            data={regionData.features as any}
            onEachFeature={onEachRegion}/>
      </MapContainer>
    );
  }
