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
  updateSupabaseAvailability
} from '../data/supabaseUsers'


import {
  useState,
  useEffect
} from 'react'


import {
  useNavigate
} from 'react-router-dom'







function Messenger(){



const user = getCurrentUser()


const navigate = useNavigate()







const [waitingApproval,setWaitingApproval] = useState(false)



const [available,setAvailable] = useState(

user?.available ?? false

)



const [orders,setOrders] = useState<Order[]>([])










// ===============================
// CONTROL VERIFICACION
// ===============================


useEffect(()=>{


if(!user){

return

}




if(
user.role==="mensajero"
){



if(
user.profileComplete===false

){

navigate(
"/messenger-verification"
)

return

}




if(

user.profileComplete===true &&

user.verified===false

){


setWaitingApproval(true)


return

}


}



},[user,navigate])












// ===============================
// CARGAR PEDIDOS
// ===============================


async function loadOrders(){



if(

!user ||

user.role!=="mensajero" ||

user.verified!==true

){

return

}



const data = await getOrders()


setOrders(data)



}









useEffect(()=>{


if(

user?.verified===true

){


loadOrders()



const timer=setInterval(()=>{


loadOrders()


},2000)



return()=>clearInterval(timer)



}


},[user])












// ===============================
// DISPONIBILIDAD
// ===============================


function toggleAvailability(){



if(!user){

return

}




if(

user.verified!==true

){


alert(

"Tu cuenta todavía no está aprobada"

)


return


}







const newStatus=!available



setAvailable(newStatus)






updateSupabaseAvailability(

user.id,

newStatus

)



updateSessionAvailability(

newStatus

)




}













// ===============================
// ACEPTAR PEDIDO
// ===============================


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












// ===============================
// CAMBIAR ESTADO
// ===============================


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












// ===============================
// PEDIDOS DISPONIBLES
// ===============================


const availableOrders = orders.filter(order=>{


return (

order.status==="Buscando mensajero"

)


})










// ===============================
// MIS PEDIDOS
// ===============================


const myOrders = orders.filter(order=>{


return (

order.messengerId===user?.id &&

order.status!=="Entregado" &&

order.status!=="Cancelado"

)


})













function OrderCard({order}:{order:Order}){



return(


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

{order.distance} km

</p>







<p>

💰 Ganancia:

{' '}

{order.price} CUP

</p>








<p>

Estado:

{' '}

{order.status}

</p>









{
order.messenger &&

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



</>


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







</div>


)



}















return(


<>


<Navbar />





<main>






{

waitingApproval &&

<section className="messenger-panel">


<div className="verification-card">


<h1>

⏳ Cuenta pendiente

</h1>


<p>

Tus datos fueron enviados correctamente.

</p>


<p>

Un administrador debe aprobar tu cuenta antes de comenzar a recibir pedidos.

</p>



</div>


</section>


}









{

!waitingApproval &&


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









<h2>

📦 Pedidos disponibles

</h2>







{

availableOrders.length===0 ?


<p>

No hay pedidos disponibles.

</p>


:


availableOrders.map(order=>(


<OrderCard

key={order.id}

order={order}

/>


))


}









<h2>

🛵 Mis pedidos

</h2>








{

myOrders.length===0 ?


<p>

No tienes pedidos activos.

</p>


:


myOrders.map(order=>(


<OrderCard

key={order.id}

order={order}

/>


))


}









</section>


}







</main>


</>


)


}





export default Messenger