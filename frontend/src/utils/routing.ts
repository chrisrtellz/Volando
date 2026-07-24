export async function getRoute(

  start:{
    lat:number,
    lng:number
  },

  end:{
    lat:number,
    lng:number
  }

){


  const url =
  `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`



  const response = await fetch(url)


  const data = await response.json()



  if(!data.routes?.length){

    return null

  }



  const route = data.routes[0]



  return {

    distance:Number(

      (route.distance / 1000)

      .toFixed(2)

    ),



    coordinates:

    route.geometry.coordinates.map(

      (point:number[])=>({

        lat:point[1],

        lng:point[0]

      })

    )

  }



}