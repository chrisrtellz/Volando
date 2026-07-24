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





const icon = L.icon({

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

  iconSize:[25,41],

  iconAnchor:[12,41]

})








const messengerIcon = L.divIcon({

  html:"🛵",

  className:"messenger-icon",

  iconSize:[35,35],

  iconAnchor:[17,17]

}) as L.DivIcon







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



<TileLayer



attribution="OpenStreetMap"



url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"



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



icon={icon}



>


<Popup>


{

index===0


?


"📦 Punto recogida"


:


"🏁 Punto entrega"


}


</Popup>



</Marker>



))

}












{

routePositions.length>0 && (


<Polyline


positions={routePositions}


/>


)


}









{

routePositions.length===0 &&

linePositions.length===2 && (


<Polyline


positions={linePositions}


/>


)


}











// Mensajero GPS

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