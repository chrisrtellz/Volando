export function calculatePrice(distance:number) {


  let pricePerKm = 0



  if(distance <= 3){

    pricePerKm = 300

  }

  else if(distance <= 5){

    pricePerKm = 275

  }

  else if(distance <= 10){

    pricePerKm = 250

  }

  else{

    pricePerKm = 225

  }



  return Math.round(
    distance * pricePerKm
  )

}