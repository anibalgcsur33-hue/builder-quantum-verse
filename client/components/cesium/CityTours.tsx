import { useEffect } from "react";
import * as Cesium from "cesium";

type City = {
  id: string;
  name: string;
  lon: number;
  lat: number;
  height?: number;
  heading?: number; // grados
  pitch?: number;   // grados negativos = vista hacia abajo
  range?: number;   // metros
  region: 'peninsula' | 'canarias' | 'baleares';
  properties?: number; // número de propiedades disponibles
};

// Ciudades principales de España según Prompt Maestro
const CITIES: City[] = [
  // Península
  { id:"mad", name:"Madrid", lat:40.4168, lon:-3.7038, height:1200, heading:30, pitch:-35, range:3500, region:'peninsula', properties:1247 },
  { id:"bcn", name:"Barcelona", lat:41.3874, lon:2.1686, height:1200, heading:20, pitch:-30, range:3500, region:'peninsula', properties:892 },
  { id:"val", name:"Valencia", lat:39.4699, lon:-0.3763, height:1200, heading:15, pitch:-30, range:3500, region:'peninsula', properties:534 },
  { id:"sev", name:"Sevilla", lat:37.3886, lon:-5.9823, height:1200, heading:25, pitch:-30, range:3500, region:'peninsula', properties:387 },
  { id:"bil", name:"Bilbao", lat:43.2627, lon:-2.9253, height:1200, heading:35, pitch:-30, range:3500, region:'peninsula', properties:298 },
  { id:"mar", name:"Marbella", lat:36.5101, lon:-4.8824, height:1200, heading:60, pitch:-30, range:3500, region:'peninsula', properties:743 },

  // Islas Canarias (8 islas incluida La Graciosa)
  { id:"tf", name:"Santa Cruz de Tenerife", lat:28.4636, lon:-16.2518, height:1200, heading:15, pitch:-30, range:3500, region:'canarias', properties:456 },
  { id:"gc", name:"Las Palmas", lat:28.1248, lon:-15.4300, height:1200, heading:20, pitch:-30, range:3500, region:'canarias', properties:389 },
  { id:"lz", name:"Arrecife", lat:28.9606, lon:-13.5478, height:1200, heading:10, pitch:-30, range:3500, region:'canarias', properties:167 },
  { id:"fv", name:"Puerto del Rosario", lat:28.5003, lon:-13.8627, height:1200, heading:25, pitch:-30, range:3500, region:'canarias', properties:143 },
  { id:"lp", name:"Santa Cruz de La Palma", lat:28.6835, lon:-17.7648, height:1200, heading:30, pitch:-30, range:3500, region:'canarias', properties:89 },
  { id:"lg", name:"San Sebastián de La Gomera", lat:28.0916, lon:-17.1133, height:1200, heading:20, pitch:-30, range:3500, region:'canarias', properties:67 },
  { id:"eh", name:"Valverde", lat:27.8061, lon:-17.9152, height:1200, heading:15, pitch:-30, range:3500, region:'canarias', properties:34 },
  { id:"gr", name:"Caleta de Sebo", lat:29.2315, lon:-13.5050, height:1200, heading:10, pitch:-30, range:3500, region:'canarias', properties:12 }, // La Graciosa

  // Islas Baleares
  { id:"pm", name:"Palma", lat:39.5696, lon:2.6502, height:1200, heading:10, pitch:-30, range:3500, region:'baleares', properties:678 },
  { id:"ibz", name:"Ibiza", lat:38.9067, lon:1.4206, height:1200, heading:15, pitch:-30, range:3500, region:'baleares', properties:445 },
  { id:"men", name:"Mahón", lat:39.8885, lon:4.2659, height:1200, heading:20, pitch:-30, range:3500, region:'baleares', properties:234 },
  { id:"for", name:"Sant Francesc Xavier", lat:38.7222, lon:1.4307, height:1200, heading:25, pitch:-30, range:3500, region:'baleares', properties:78 } // Formentera
];

export function attachCityPins(viewer: Cesium.Viewer, onSelect?: (c: City) => void) {
  const ds = new Cesium.CustomDataSource("city-pins");
  viewer.dataSources.add(ds);

  const pinBuilder = new Cesium.PinBuilder();
  
  CITIES.forEach(c => {
    // Color según región
    let pinColor = "#7df"; // azul por defecto
    if (c.region === 'canarias') pinColor = "#0EE7E7"; // neon-teal
    if (c.region === 'baleares') pinColor = "#00E7A7"; // neon-emerald
    if (c.region === 'peninsula') pinColor = "#A855F7"; // púrpura

    const ent = ds.entities.add({
      position: Cesium.Cartesian3.fromDegrees(c.lon, c.lat),
      billboard: {
        image: pinBuilder.fromText("🏠", Cesium.Color.fromCssColorString(pinColor), 48).toDataURL(),
        scale: 0.9,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 3_000_000.0)
      },
      label: {
        text: `${c.name}\n${c.properties} propiedades`,
        font: "14px 'Plus Jakarta Sans'",
        fillColor: Cesium.Color.WHITE,
        showBackground: true,
        backgroundColor: Cesium.Color.fromBytes(10,14,24,200),
        pixelOffset: new Cesium.Cartesian2(0, -42),
        distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 1_500_000.0)
      },
      properties: c
    });
    (ent as any).__city = c;
  });

  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction((click: any) => {
    const picked = viewer.scene.pick(click.position);
    if (Cesium.defined(picked) && picked.id && picked.id.properties) {
      const c: City = picked.id.properties.getValue(Cesium.JulianDate.now());
      flyToCity(viewer, c);
      onSelect?.(c);
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  return () => {
    handler.destroy();
    viewer.dataSources.remove(ds, true);
  };
}

export function flyToCity(viewer: Cesium.Viewer, c: City) {
  const { lon, lat, height=1200, heading=20, pitch=-30, range=3500 } = c;
  
  console.log(`🎬 Tour cinematográfico iniciado: ${c.name} (${c.region})`);
  
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(lon, lat, height),
    orientation: {
      heading: Cesium.Math.toRadians(heading),
      pitch: Cesium.Math.toRadians(pitch),
      roll: 0
    },
    duration: 2.2
  });

  // Órbita cinematográfica sutil
  const s = viewer.scene;
  let t = 0;
  const remove = s.postRender.addEventListener(() => {
    t += s.deltaTime || 0.016;
    // Rotación más lenta y cinematográfica
    viewer.camera.rotate(Cesium.Cartesian3.UNIT_Z, -0.003 * s.deltaTime);
    if (t > 8) remove(); // órbita por 8 segundos
  });
}

// Función para vuelo panorámico por región
export function flyThroughRegion(viewer: Cesium.Viewer, region: 'peninsula' | 'canarias' | 'baleares') {
  const regionCities = CITIES.filter(c => c.region === region);
  console.log(`🎬 Tour panorámico por ${region}: ${regionCities.length} ciudades`);
  
  let currentIndex = 0;
  
  const flyToNext = () => {
    if (currentIndex >= regionCities.length) {
      console.log(`✅ Tour panorámico de ${region} completado`);
      return;
    }
    
    const city = regionCities[currentIndex];
    flyToCity(viewer, city);
    
    currentIndex++;
    setTimeout(flyToNext, 10000); // 10 segundos por ciudad
  };
  
  flyToNext();
}

// Clustering de propiedades por región
export function showRegionClusters(viewer: Cesium.Viewer) {
  const regions = {
    peninsula: { lat: 40.4, lon: -3.7, count: CITIES.filter(c => c.region === 'peninsula').reduce((sum, c) => sum + (c.properties || 0), 0) },
    canarias: { lat: 28.3, lon: -15.5, count: CITIES.filter(c => c.region === 'canarias').reduce((sum, c) => sum + (c.properties || 0), 0) },
    baleares: { lat: 39.6, lon: 2.9, count: CITIES.filter(c => c.region === 'baleares').reduce((sum, c) => sum + (c.properties || 0), 0) }
  };

  const clusterDS = new Cesium.CustomDataSource("region-clusters");
  viewer.dataSources.add(clusterDS);

  Object.entries(regions).forEach(([region, data]) => {
    const entity = clusterDS.entities.add({
      position: Cesium.Cartesian3.fromDegrees(data.lon, data.lat, 50000),
      billboard: {
        image: createClusterCanvas(data.count, region),
        scale: 1.2,
        verticalOrigin: Cesium.VerticalOrigin.CENTER
      },
      label: {
        text: `${region.toUpperCase()}\n${data.count} propiedades`,
        font: "16px 'Plus Jakarta Sans'",
        fillColor: Cesium.Color.WHITE,
        showBackground: true,
        backgroundColor: Cesium.Color.fromBytes(14, 165, 233, 180),
        pixelOffset: new Cesium.Cartesian2(0, 50)
      }
    });
  });

  return () => {
    viewer.dataSources.remove(clusterDS, true);
  };
}

// Función helper para crear canvas de cluster
function createClusterCanvas(count: number, region: string): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d')!;

  // Color según región
  let color = '#7df';
  if (region === 'canarias') color = '#0EE7E7';
  if (region === 'baleares') color = '#00E7A7';
  if (region === 'peninsula') color = '#A855F7';

  // Círculo con gradiente
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, color + '80');
  
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(32, 32, 28, 0, 2 * Math.PI);
  ctx.fill();

  // Texto del contador
  ctx.fillStyle = 'white';
  ctx.font = 'bold 14px Plus Jakarta Sans';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(count.toString(), 32, 32);

  return canvas;
}

export { CITIES };
