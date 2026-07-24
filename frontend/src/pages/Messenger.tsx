import Navbar from '../components/Navbar'
import RealMap from '../components/RealMap'

import {
  getOrders,
  acceptOrder,
  updateOrderStatus
} from '../data/orders'

import type {
  OrderStatus,
  Order
} from '../data/orders'

import {
  getCurrentUser,
  updateSessionAvailability
} from '../data/auth'

import {
  updateAvailability
} from '../data/users'

import {
  useState,
  useEffect
} from 'react'





function Messenger(){


const user = getCurrentUser()





const [available,setAvailable] = useState(

  user?.available ?? false

)



const [orders,setOrders] = useState<Order[]>([])








async function loadOrders(){


const data = await getOrders()


setOrders(data)


}









useEffect(()=>{


loadOrders()



const timer=setInterval(()=>{


loadOrders()


},2000)



return()=>clearInterval(timer)


},[])









function toggleAvailability(){



if(!user){

return

}



const newStatus=!available



setAvailable(newStatus)



updateAvailability(

user.id,

newStatus

)



updateSessionAvailability(

newStatus

)



}











async function takeOrder(id:number){



if(!user){

return

}





if(!available){


alert(
"Debes estar disponible para aceptar pedidos"
)


return


}






await acceptOrder(


id,


user.id,


user.name,


user.vehicle


)



loadOrders()



}









async function changeStatus(


id:number,


status:OrderStatus


){



await updateOrderStatus(


id,


status


)



loadOrders()



}









const visibleOrders = orders.filter(order=>{


if(order.status==="Buscando mensajero"){


return true


}



if(order.messengerId===user?.id){


return true


}



return false


})









return(

<>


<Navbar />



<main>


<section className="messenger-panel">





<div className="messenger-profile">



<div className="profile-icon">

🛵

</div>





<div className="profile-info">


<h1>

Hola {user?.name}

</h1>



<p>

Vehículo:

{' '}

{user?.vehicle || "No registrado"}

</p>




<p>

⭐ 5.0

</p>




<p>

📦 Entregas completadas: 0

</p>



</div>







<button


className={

available

?

"status-online"

:

"status-offline"

}



onClick={toggleAvailability}



>


{

available

?

"🟢 Disponible"

:

"🔴 Desconectado"

}


</button>





</div>









<p>

Pedidos disponibles cerca de ti.

</p>









{

visibleOrders.length===0 ? (


<p>

No hay pedidos disponibles.

</p>


)

:

visibleOrders.map(order=>(



<div

className="card order-card"

key={order.id}

>





<h3>

Pedido #{order.id}

</h3>








<div className="address-box">



<p>

📦 Recogida:

<br/>

{

order.pickupAddress ||

"Dirección no disponible"

}

</p>




<p>

🏁 Entrega:

<br/>

{

order.destinationAddress ||

"Dirección no disponible"

}

</p>



</div>









<RealMap


points={[

order.pickup,

order.destination

]}



route={

order.route || []

}



messengerLocation={

order.messengerLocation

}



onChange={()=>{}}


/>









<p>

📏 Distancia:

{' '}

{order.distance}

km

</p>





<p>

💰 Ganancia:

{' '}

{order.price}

CUP

</p>





<p>

Estado:

{' '}

{order.status}

</p>











{

order.messenger && (

<>


<p>

🛵 Mensajero:

{' '}

{order.messenger}

</p>




<p>

🚗 Vehículo:

{' '}

{order.messengerVehicle}

</p>




<p>

⭐ Valoración:

{' '}

{order.messengerRating}

</p>


</>


)

}











{

order.status==="Buscando mensajero"

&&

(

<button

className="primary"

onClick={()=>takeOrder(order.id)}

>

Aceptar pedido

</button>

)

}











{

order.status==="Mensajero asignado"

&&

order.messengerId===user?.id

&&

(

<button

className="primary"

onClick={()=>changeStatus(

order.id,

"Recogiendo pedido"

)}

>

Recoger pedido

</button>

)

}









{

order.status==="Recogiendo pedido"

&&

order.messengerId===user?.id

&&

(

<button

className="primary"

onClick={()=>changeStatus(

order.id,

"En camino"

)}

>

Iniciar entrega

</button>

)

}









{

order.status==="En camino"

&&

order.messengerId===user?.id

&&

(

<button

className="primary"

onClick={()=>changeStatus(

order.id,

"Entregado"

)}

>

Finalizar entrega

</button>

)

}









{

order.status==="Entregado"

&&

order.messengerId===user?.id

&&

(

<p>

✅ Pedido completado

</p>

)

}







</div>


))


}



</section>


</main>


</>


)


}



export default Messenger