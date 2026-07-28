import Navbar from "../components/Navbar"

import {
  useState,
  useEffect
} from "react"


import {
  getSupabaseUsers,
  deleteSupabaseUser,
  toggleSupabaseUserActive,
  updateMessengerVerification
} from "../data/supabaseUsers"

import type {
  SupabaseUser
} from "../data/supabaseUsers"


import {
  getOrders,
  updateOrderStatus,
  cancelOrder,
  deleteOrder
} from "../data/orders"

import type {
  Order,
  OrderStatus
} from "../data/orders"


import {
  getCurrentUser
} from "../data/auth"









function Admin(){


const admin = getCurrentUser()



const [users,setUsers] = useState<SupabaseUser[]>([])

const [orders,setOrders] = useState<Order[]>([])









async function loadUsers(){


const data = await getSupabaseUsers()


setUsers(data)


}









async function loadOrders(){


const data = await getOrders()


setOrders(data)


}









async function refresh(){


await loadUsers()

await loadOrders()


}










useEffect(()=>{


refresh()


const timer=setInterval(()=>{


refresh()


},3000)



return()=>clearInterval(timer)


},[])









async function blockUser(id:number){


await toggleSupabaseUserActive(id)


refresh()


}









async function removeUser(id:number){


const ok=window.confirm(
"¿Eliminar usuario?"
)


if(!ok){

return

}


await deleteSupabaseUser(id)


refresh()


}










// ===============================
// VERIFICACION MENSAJERO
// ===============================


async function verifyMessenger(

id:number,

status:
"approved"
|
"rejected"

){


await updateMessengerVerification(

id,

status

)


refresh()


}










async function changeOrderStatus(

id:number,

status:OrderStatus

){


await updateOrderStatus(

id,

status

)


refresh()


}









async function removeOrder(id:number){


const ok=window.confirm(
"¿Eliminar pedido?"
)


if(!ok){

return

}


await deleteOrder(id)


refresh()


}












return(

<>


<Navbar />




<main className="admin-dashboard">





<header className="admin-header">


<h1>
⚡ Volando Admin
</h1>


<p>
Centro de control - {admin?.name}
</p>


</header>









<section className="admin-stats">



<div className="admin-stat-card">

<h3>
👥 Usuarios
</h3>

<strong>
{users.length}
</strong>

</div>






<div className="admin-stat-card">

<h3>
🛵 Mensajeros
</h3>

<strong>

{
users.filter(
u=>u.role==="mensajero"
).length
}

</strong>

</div>






<div className="admin-stat-card">

<h3>
⏳ Pendientes
</h3>

<strong>

{
users.filter(
u=>
u.role==="mensajero"
&&
u.verificationStatus==="pending"
).length
}

</strong>

</div>






<div className="admin-stat-card">

<h3>
📦 Pedidos
</h3>

<strong>
{orders.length}
</strong>

</div>



</section>









<section className="admin-grid">









<div className="admin-box">


<h2>
🛵 Usuarios / Mensajeros
</h2>






{

users.map(user=>(



<div

className="admin-item"

key={user.id}

>



<h3>
{user.name}
</h3>




<p>
📧 {user.email}
</p>



<p>
Rol: {user.role}
</p>






{

user.role==="mensajero"

&&

<>


<hr/>


<h4>
📋 Ficha del mensajero
</h4>




<p>
🛵 Vehículo:

{" "}

{user.vehicle || "No registrado"}

</p>




<p>
⚡ Multiplicador:

{" "}

{user.vehicleMultiplier || 1}

</p>




<p>
📱 Teléfono:

{" "}

{user.phone || "No enviado"}

</p>




<p>
🏠 Dirección:

{" "}

{user.address || "No enviada"}

</p>




<p>
🪪 Documento:

{" "}

{user.idDocument || "No enviado"}

</p>




<p>
🚗 Matrícula:

{" "}

{user.vehiclePlate || "No enviada"}

</p>




<p>
📄 Licencia:

{" "}

{user.licenseNumber || "No enviada"}

</p>





<p>

📋 Perfil:

{" "}

{

user.profileComplete

?

"✅ Completo"

:

"❌ Incompleto"

}


</p>





<p>

🔐 Verificado:

{" "}

{

user.verified

?

"✅ Sí"

:

"❌ No"

}


</p>







<p>

Estado:

{" "}

{

user.verificationStatus==="approved"

?

"✅ Aprobado"

:

user.verificationStatus==="rejected"

?

"❌ Rechazado"

:

"⏳ Pendiente"

}

</p>






{


user.verificationStatus==="pending"

&&

(


<div className="admin-actions">


<button

className="primary"

disabled={!user.profileComplete}

onClick={()=>verifyMessenger(

user.id,

"approved"

)}

>

✅ Aprobar

</button>





<button

className="danger"

onClick={()=>verifyMessenger(

user.id,

"rejected"

)}

>

❌ Rechazar

</button>


</div>


)


}





</>

}







<p>

Estado cuenta:

{" "}

{

user.active

?

"🟢 Activo"

:

"🔴 Bloqueado"

}

</p>







<div className="admin-actions">


<button

className="primary"

onClick={()=>blockUser(user.id)}

>

{

user.active

?

"Bloquear"

:

"Activar"

}

</button>






<button

className="danger"

onClick={()=>removeUser(user.id)}

>

Eliminar

</button>



</div>






</div>


))


}


</div>













<div className="admin-box">


<h2>
📦 Pedidos
</h2>






{

orders.map(order=>(



<div

className="admin-item"

key={order.id}

>



<h3>
Pedido #{order.id}
</h3>



<p>
👤 Cliente:

{" "}

{order.clientName || "Cliente"}

</p>



<p>
📏 Distancia:

{" "}

{order.distance} km

</p>



<p>
💰 Precio:

{" "}

{order.price} CUP

</p>




<p>

Estado:

</p>



<select

value={order.status}

onChange={(e)=>

changeOrderStatus(

order.id,

e.target.value as OrderStatus

)

}

>


<option>
Buscando mensajero
</option>

<option>
Mensajero asignado
</option>

<option>
Recogiendo pedido
</option>

<option>
En camino
</option>

<option>
Entregado
</option>

<option>
Cancelado
</option>


</select>







{

order.messenger &&

<p>

🛵 {order.messenger}

<br/>

🚗 {order.messengerVehicle}

</p>

}






<div className="admin-actions">


<button

className="danger"

onClick={()=>cancelOrder(order.id)}

>

Cancelar

</button>





<button

className="danger"

onClick={()=>removeOrder(order.id)}

>

Eliminar

</button>



</div>






</div>


))


}



</div>






</section>







</main>



</>

)


}



export default Admin