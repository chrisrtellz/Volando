import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc
} from "firebase/firestore"

import { db } from "../firebase/firestore"



export type OrderStatus =

  | "Buscando mensajero"
  | "Mensajero asignado"
  | "Recogiendo pedido"
  | "En camino"
  | "Entregado"





export type Location = {

  lat:number

  lng:number

}






export type Order = {


  id:number


  firebaseId?:string



  clientId:number

  clientName:string



  pickupAddress?:string

  destinationAddress?:string



  pickup:Location

  destination:Location



  route?:Location[]



  distance:number

  price:number

  status:OrderStatus




  messengerId?:number

  messenger?:string

  messengerVehicle?:string

  messengerRating?:number




  messengerLocation?:Location


}







const ORDERS_COLLECTION="orders"









// CREAR PEDIDO


export async function createOrder(

order:Order

){



const result = await addDoc(

collection(

db,

ORDERS_COLLECTION

),

order

)



return result.id


}











// OBTENER PEDIDOS


export async function getOrders():Promise<Order[]>{



const snapshot = await getDocs(

collection(

db,

ORDERS_COLLECTION

)

)





return snapshot.docs.map(item=>({



firebaseId:item.id,


...item.data()



} as Order))



}











// BUSCAR POR ID


export async function getOrderById(

id:number

):Promise<Order|undefined>{



const q=query(

collection(db,ORDERS_COLLECTION),

where(

"id",

"==",

id

)

)



const snapshot=await getDocs(q)



if(snapshot.empty){

return undefined

}



const item=snapshot.docs[0]



return {


firebaseId:item.id,


...item.data()



} as Order



}











// ACEPTAR PEDIDO


export async function acceptOrder(


id:number,


messengerId:number,


messengerName:string,


vehicle:string


){



const q=query(

collection(db,ORDERS_COLLECTION),

where(

"id",

"==",

id

)

)



const snapshot=await getDocs(q)



if(snapshot.empty){

return

}





const ref=doc(

db,

ORDERS_COLLECTION,

snapshot.docs[0].id

)





await updateDoc(

ref,

{


status:"Mensajero asignado",


messengerId,


messenger:messengerName,


messengerVehicle:vehicle,


messengerRating:5


}


)



}












// CAMBIAR ESTADO


export async function updateOrderStatus(


id:number,


status:OrderStatus


){



const q=query(

collection(db,ORDERS_COLLECTION),

where(

"id",

"==",

id

)

)



const snapshot=await getDocs(q)



if(snapshot.empty){

return

}





await updateDoc(

doc(

db,

ORDERS_COLLECTION,

snapshot.docs[0].id

),

{


status


}

)



}











// GPS MENSAJERO


export async function updateMessengerLocation(


id:number,


location:Location


){



const q=query(

collection(db,ORDERS_COLLECTION),

where(

"id",

"==",

id

)

)



const snapshot=await getDocs(q)



if(snapshot.empty){

return

}





await updateDoc(

doc(

db,

ORDERS_COLLECTION,

snapshot.docs[0].id

),

{


messengerLocation:location


}

)



}











// BORRAR PEDIDO


export async function deleteOrder(

firebaseId:string

){



await deleteDoc(

doc(

db,

ORDERS_COLLECTION,

firebaseId

)

)



}
