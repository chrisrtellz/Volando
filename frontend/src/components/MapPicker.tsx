import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents
} from 'react-leaflet'

import 'leaflet/dist/leaflet.css'

import { useState } from 'react'


type Point = {

  lat:number
  lng:number

}



function ClickHandler({

  setPoints

}:{

  setPoints:(points:Point[])=>void

}){


  const [points,setLocalPoints] = useState<Point[]>([])



  useMapEvents({

    click(e){


      let newPoints = [

        ...points,

        {

          lat:e.latlng.lat,

          lng:e.latlng.lng

        }

      ]



      if(newPoints.length > 2){

        newPoints=[

          newPoints[1],

          newPoints[2]

        ]

      }



      setLocalPoints(newPoints)

      setPoints(newPoints)


    }

  })



  return (

    <>

    {
      points.map((point,index)=>(

        <Marker

          key={index}

          position={[

            point.lat,

            point.lng

          ]}

        />

      ))
    }



    {

      points.length===2 &&

      <Polyline

        positions={[

          [

            points[0].lat,

            points[0].lng

          ],

          [

            points[1].lat,

            points[1].lng

          ]

        ]}

      />

    }


    </>

  )

}





function MapPicker({

  onChange

}:{

  onChange:(points:Point[])=>void

}){


return(

<MapContainer

center={[

23.1136,

-82.3666

]}

zoom={13}

style={{

height:"650px",

width:"100%"

}}

>


<TileLayer

url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"

/>



<ClickHandler

setPoints={onChange}

/>


</MapContainer>


)


}


export default MapPicker