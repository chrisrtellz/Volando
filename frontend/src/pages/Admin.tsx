import Navbar from "../components/Navbar"

import {
  useState,
  useEffect
} from "react"


import {
  getSupabaseUsers,
  deleteSupabaseUser,
  toggleSupabaseUserActive
} from "../data/supabaseUsers"


import type {
  SupabaseUser
} from "../data/supabaseUsers"



import {
  getOrders
} from "../data/orders"


import type {
  Order
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






const timer = setInterval(()=>{


 refresh()


},3000)







return ()=>clearInterval(timer)



},[])














async function removeUser(id:number){



const confirmDelete = window.confirm(

"¿Eliminar usuario?"

)







if(!confirmDelete){

return

}







await deleteSupabaseUser(id)





refresh()



}















async function blockUser(id:number){



await toggleSupabaseUserActive(id)



refresh()



}
















return(


<>


<Navbar />





<main className="admin-page">







<h1>

Panel Administrador

</h1>







<p>

Bienvenido {admin?.name}

</p>













<section className="admin-stats">







<div className="card">


<h2>

Usuarios

</h2>


<p>

{users.length}

</p>


</div>









<div className="card">


<h2>

Mensajeros

</h2>


<p>



{

users.filter(

u=>u.role==="mensajero"

).length



}



</p>


</div>









<div className="card">


<h2>

Clientes

</h2>


<p>



{

users.filter(

u=>u.role==="cliente"

).length



}



</p>


</div>









<div className="card">


<h2>

Pedidos

</h2>


<p>

{orders.length}

</p>


</div>





</section>









<h2>

👥 Usuarios registrados

</h2>









{

users.length===0 ? (


<p>

No hay usuarios registrados.

</p>


)

:

users.map(user=>(





<div

className="card user-card"

key={user.id}

>








<h3>

{user.name}

</h3>









<p>

📧 {user.email}

</p>









<p>

Rol:

{" "}

{user.role}

</p>









{

user.role==="mensajero" && (


<p>

🛵 {user.vehicle}

</p>


)

}









<p>

Estado:

{" "}

{

user.active !== false

?

"🟢 Activo"

:

"🔴 Bloqueado"

}

</p>









<button

className="primary"

onClick={()=>blockUser(user.id)}

>

{

user.active !== false

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





))

}













<h2>

📦 Pedidos actuales

</h2>









{

orders.length===0 ? (


<p>

No hay pedidos.

</p>


)

:

orders.map(order=>(





<div

className="card order-card"

key={order.id}

>







<h3>

Pedido #{order.id}

</h3>









<p>

👤 Cliente:

{" "}

{order.clientName || "Sin datos"}

</p>









<p>

📏 Distancia:

{" "}

{order.distance}

km

</p>









<p>

💰 Precio:

{" "}

{order.price}

CUP

</p>









<p>

Estado:

{" "}

{order.status}

</p>












{

order.messenger && (


<>


<p>

🛵 Mensajero:

{" "}

{order.messenger}

</p>







<p>

🚗 Vehículo:

{" "}

{order.messengerVehicle}

</p>







<p>

⭐ Valoración:

{" "}

{order.messengerRating}

</p>


</>


)

}








</div>



))

}






</main>







</>


)


}



export default Admin