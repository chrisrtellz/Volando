import Navbar from "../components/Navbar"

import {
  getCurrentUser
} from "../data/auth"

import {
  useState
} from "react"



function MessengerPanel(){


const user = getCurrentUser()



const [editing,setEditing] = useState(false)



const [phone,setPhone] = useState("")

const [address,setAddress] = useState("")





return(


<>


<Navbar />





<main className="messenger-panel-page">





<section className="messenger-profile-card">






<div className="profile-header">



<div className="profile-icon">

🛵

</div>




<div>


<h1>

{user?.name}

</h1>


<p>

Mensajero Volando

</p>


</div>



</div>









<div className="profile-info">



<h3>

Información personal

</h3>




<p>

📧 Email:

<br/>

{user?.email}

</p>






<p>

📱 Teléfono:

<br/>

{

phone ||

"No agregado"

}

</p>






<p>

📍 Dirección:

<br/>

{

address ||

"No agregada"

}

</p>






<p>

🛵 Vehículo:

<br/>

{

user?.vehicle ||

"No registrado"

}

</p>






</div>









<div className="rating-box">


<h3>

⭐ Valoración

</h3>


<p>

0.0 / 5

</p>


<small>

Las valoraciones aparecerán después de tus entregas.

</small>


</div>









<button

className="primary"

onClick={()=>setEditing(!editing)}

>

{

editing

?

"Cerrar edición"

:

"Editar perfil"

}


</button>









{

editing && (


<div className="edit-box">



<h3>

Actualizar datos

</h3>




<input

placeholder="Teléfono"

value={phone}

onChange={e=>setPhone(e.target.value)}

/>







<input

placeholder="Dirección"

value={address}

onChange={e=>setAddress(e.target.value)}

/>








<button

className="register"

>

Guardar

</button>




</div>


)



}









</section>









<section className="messenger-stats">





<h2>

📊 Resumen

</h2>






<div className="stat-card">


<h3>

📦 Entregas

</h3>


<p>

0

</p>


</div>







<div className="stat-card">


<h3>

💰 Ganancias

</h3>


<p>

0 CUP

</p>


</div>







<div className="stat-card">


<h3>

⭐ Valoración

</h3>


<p>

0.0

</p>


</div>








</section>









<section className="delivery-history">


<h2>

📋 Historial

</h2>



<div className="empty-box">


<p>

Todavía no tienes entregas.

</p>


</div>


</section>









</main>



</>


)


}



export default MessengerPanel