import Navbar from '../components/Navbar'
import RealMap from '../components/RealMap'

import {
  useState,
  useEffect
} from 'react'

import {
  calculatePrice
} from '../utils/pricing'

import {
  createOrder,
  getOrders,
  cancelOrder
} from '../data/orders'

import {
  getCurrentUser
} from "../data/auth"

import {
  getSupabaseUsers
} from "../data/supabaseUsers"

import type {
  SupabaseUser
} from "../data/supabaseUsers"

import {
  getRoute
} from "../utils/routing"

import {
  getAddress
} from "../utils/geocoding"





function Client(){


const user = getCurrentUser()



const [users,setUsers] = useState<SupabaseUser[]>([])

const [distance,setDistance] = useState(0)

const [price,setPrice] = useState(0)

const [searching,setSearching] = useState(false)

const [orderId,setOrderId] = useState<number|null>(null)

const [currentOrder,setCurrentOrder] = useState<any>(null)

const [points,setPoints] = useState<any[]>([])

const [routePoints,setRoutePoints] = useState<any[]>([])

const [addresses,setAddresses] = useState<string[]>([])



const [showPanel,setShowPanel] = useState(true)







async function loadUsers(){

try{

const data = await getSupabaseUsers()

setUsers(data)

}

catch(error){

console.error(error)

}

}







const messengerUser =

currentOrder?.messenger

?

users.find(

u=>u.name===currentOrder.messenger

)

:

null







useEffect(()=>{


async function loadOrder(){


const saved = localStorage.getItem(
"clientOrder"
)


if(saved){


const id = Number(saved)


const orders = await getOrders()


const order = orders.find(
o=>o.id===id
)



if(order){


setOrderId(id)

setCurrentOrder(order)

setSearching(
order.status==="Buscando mensajero"
)


}

}



}



loadUsers()

loadOrder()


},[])









async function calculateRoute(
newPoints:any[]
){


if(newPoints.length===2){


const route = await getRoute(

newPoints[0],

newPoints[1]

)



if(route){


setDistance(route.distance)


setPrice(
calculatePrice(route.distance)
)


setRoutePoints(
route.coordinates
)


}


}



}










async function handleMapChange(
newPoints:any[]
){


setPoints(newPoints)


await calculateRoute(newPoints)



const names = await Promise.all(

newPoints.map(point=>

getAddress(
point.lat,
point.lng
)

)

)


setAddresses(names)



if(newPoints.length===2){

setShowPanel(true)

}


}









async function sendOrder(){


if(
distance===0 ||
points.length!==2
){

alert(
"Selecciona dos puntos en el mapa"
)

return

}



if(!user){

alert(
"Debes iniciar sesión"
)

return

}



const id = Date.now()



await createOrder({


id,


clientId:user.id,


clientName:user.name,


pickup:points[0],


destination:points[1],


pickupAddress:addresses[0],


destinationAddress:addresses[1],


distance,


price,


route:routePoints,


status:"Buscando mensajero"


})



setOrderId(id)

setCurrentOrder(null)

setSearching(true)


localStorage.setItem(
"clientOrder",
id.toString()
)



}









async function cancelCurrentOrder(){


if(!orderId){

return

}



const ok = window.confirm(
"¿Cancelar este pedido?"
)


if(!ok){

return

}



await cancelOrder(orderId)



localStorage.removeItem(
"clientOrder"
)


setOrderId(null)

setCurrentOrder(null)

setSearching(false)


}









useEffect(()=>{


const timer=setInterval(async()=>{


if(orderId){


const orders = await getOrders()


const order = orders.find(
o=>o.id===orderId
)



if(order){


setCurrentOrder(order)



if(
order.status!=="Buscando mensajero"
){

setSearching(false)

}


}


}



await loadUsers()



},3000)



return()=>clearInterval(timer)


},[orderId])









return(

<>


<Navbar />



<main className="client-page">



<section className="client-map">


<RealMap


points={points}


route={routePoints}


messengerLocation={
currentOrder?.messengerLocation
}


onChange={handleMapChange}


/>


</section>









<section

className={

showPanel

?

"client-form open"

:

"client-form"

}

>



<div className="panel-handle">

</div>




<h1>

Hola {user?.name} 👋

</h1>



<h2>

Solicitar envío

</h2>





<div className="address-box">


{
addresses[0] &&

<p>

📦 Recogida:

<br/>

{addresses[0]}

</p>

}



{
addresses[1] &&

<p>

🏁 Entrega:

<br/>

{addresses[1]}

</p>

}



</div>







<div className="price-box">


<h3>

Precio estimado

</h3>


<p>

Distancia:
{distance} km

</p>


<p>

Precio:
{price} CUP

</p>


</div>









{
currentOrder?.status==="Buscando mensajero" &&


<div className="searching-box">


<h2>

🔎 Buscando mensajero

</h2>


<p>

Tu pedido está disponible.

</p>


<button

className="danger"

onClick={cancelCurrentOrder}

>

Cancelar pedido

</button>


</div>

}









{
currentOrder?.status==="Mensajero asignado" &&


<div className="messenger-found">

<h2>

🛵 Mensajero encontrado

</h2>


<p>

{currentOrder.messenger}

</p>


<p>

🚘 {

messengerUser?.vehicle ||

currentOrder.messengerVehicle ||

"No registrado"

}

</p>


</div>

}









{
currentOrder?.status==="En camino" &&


<div className="messenger-found">

<h2>

🚚 En camino

</h2>

<p>

{currentOrder.messenger}

</p>

</div>

}









{
!searching &&
!currentOrder &&


<button

className="primary"

onClick={sendOrder}

>

Solicitar mensajero

</button>

}



</section>









<button

className="map-toggle"

onClick={()=>setShowPanel(!showPanel)}

>


{

showPanel

?

"⌄"

:

"⌃"

}


</button>





</main>


</>

)


}


export default Client