import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMapEvents
} from "react-leaflet"

import "leaflet/dist/leaflet.css"

import L from "leaflet"







// =========================
// ICONO RECOGIDA
// =========================

const pickupIcon = L.divIcon({

  html:`

  <div class="map-pin pickup-pin">

    <span>📦</span>

  </div>

  `,

  className:"",

  iconSize:[45,45],

  iconAnchor:[22,45]

})









// =========================
// ICONO ENTREGA
// =========================

const destinationIcon = L.divIcon({

  html:`

  <div class="map-pin destination-pin">

    <span>⚑</span>

  </div>

  `,

  className:"",

  iconSize:[45,45],

  iconAnchor:[22,45]

})









// =========================
// ICONO MENSAJERO
// =========================

const messengerIcon = L.divIcon({

  html:`

  <div class="map-pin messenger-pin">

    <span>🛵</span>

  </div>

  `,

  className:"",

  iconSize:[45,45],

  iconAnchor:[22,22]

})










type Point = {

  lat:number

  lng:number

}








type Props = {


  points:Point[]


  route?:Point[]


  messengerLocation?:Point


  onChange:(points:Point[])=>void


}









// =========================
// CONTROL DEL MAPA
// =========================

function MapClick({


points,

onChange


}:Props){



useMapEvents({



click(e){



let newPoints=[...points]




if(newPoints.length >= 2){

newPoints=[]

}





newPoints.push({

lat:e.latlng.lat,

lng:e.latlng.lng

})





onChange(newPoints)



}



})





return null


}














function RealMap({


points,


route=[],


messengerLocation,


onChange



}:Props){





const havana:[number,number]=[

23.1136,

-82.3666

]









const routePositions:[number,number][] =


route.map(point=>[

point.lat,

point.lng

])











const linePositions:[number,number][] =


points.length===2


?


[


[

points[0].lat,

points[0].lng

],


[

points[1].lat,

points[1].lng

]


]


:

[]














return(



<MapContainer



center={havana}


zoom={13}



style={{

height:"550px",

width:"100%",

borderRadius:"15px"

}}



>









{/* MAPA OSCURO VOLANDO */}


<TileLayer


attribution="© OpenStreetMap"


url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"


/>









<MapClick


points={points}


onChange={onChange}


/>













{

points.map((point,index)=>(



<Marker



key={index}



position={[

point.lat,

point.lng

]}



icon={

index===0

?

pickupIcon

:

destinationIcon

}



>


<Popup>


{

index===0

?

"📦 Punto de recogida"

:

"⚑ Punto de entrega"

}


</Popup>



</Marker>



))

}













{/* RUTA REAL */}


{

routePositions.length>0 && (



<Polyline



positions={routePositions}



pathOptions={{


color:"#38bdf8",

weight:6,

opacity:0.95


}}



/>



)

}













{/* LINEA TEMPORAL */}


{

routePositions.length===0 &&

linePositions.length===2 && (



<Polyline



positions={linePositions}



pathOptions={{


color:"#2563eb",

weight:4,

dashArray:"10,10",

opacity:0.8


}}



/>



)

}













{/* MENSAJERO GPS */}


{

messengerLocation && (



<Marker



position={[

messengerLocation.lat,

messengerLocation.lng

]}



icon={messengerIcon}



>


<Popup>

🛵 Mensajero en ruta

</Popup>



</Marker>



)

}









</MapContainer>



)


}



export default RealMap