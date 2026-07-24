export async function getAddress(

  lat:number,

  lng:number

):Promise<string>{



  try{



    const response = await fetch(

      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`

    )





    const data = await response.json()





    if(data && data.display_name){



      return data.display_name



    }





    return "Dirección desconocida"





  }

  catch(error){



    console.error(

      "Error obteniendo dirección",

      error

    )



    return "Dirección no disponible"



  }



}
