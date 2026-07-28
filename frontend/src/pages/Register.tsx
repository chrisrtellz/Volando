import Navbar from '../components/Navbar'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  Footprints,
  Bike,
  Car,
  UserRound,
  PackageCheck
} from "lucide-react"


import {
  supabase
} from "../supabase/client"


import {
  createSupabaseUser
} from "../data/supabaseUsers"








function Register(){



const navigate = useNavigate()





const [name,setName] = useState("")

const [email,setEmail] = useState("")

const [password,setPassword] = useState("")





const [role,setRole] = useState<
"cliente" | "mensajero"
>("cliente")





const [vehicle,setVehicle] = useState("")

const [vehicleMultiplier,setVehicleMultiplier] = useState(1)








function selectVehicle(

name:string,

multiplier:number

){


setVehicle(name)

setVehicleMultiplier(multiplier)


}









async function register(){



if(
!name ||
!email ||
!password
){

alert(
"Completa todos los campos"
)

return

}







if(

role==="mensajero" &&

vehicle===""

){

alert(
"Selecciona un vehículo"
)

return

}









try{





const {

data,

error

}=await supabase.auth.signUp({

email,

password

})







if(error){

throw error

}








if(!data.user){

throw new Error(
"No se pudo crear el usuario en Auth"
)

}








const uid=data.user.id







const profile = await createSupabaseUser({



id:Date.now(),



uid,



name,



email,



role,



vehicle,



vehicleMultiplier,



available:false,



active:true,





// DATOS PARA VERIFICACION

phone:"",

address:"",

idDocument:"",

vehiclePlate:"",

licenseNumber:"",





// CLIENTE APROBADO
// MENSAJERO PENDIENTE


verified:

role==="cliente",





profileComplete:

role==="cliente",





verificationStatus:

role==="mensajero"

?

"pending"

:

"approved"




})









if(!profile){


throw new Error(

"No se pudo guardar el perfil"

)


}








alert(

"Cuenta creada correctamente"

)





navigate("/login")







}

catch(error:any){



console.error(

"ERROR REGISTRO:",

error

)





alert(

"Error creando cuenta"

)



}




}









return(


<>


<Navbar />





<main className="register-page">








<h1>

Crear cuenta

</h1>







<p>

Únete a Volando

</p>









<input


placeholder="Nombre"


value={name}


onChange={

e=>setName(e.target.value)

}


/>










<input


placeholder="Correo electrónico"


type="email"


value={email}


onChange={

e=>setEmail(e.target.value)

}


/>










<input


placeholder="Contraseña"


type="password"


value={password}


onChange={

e=>setPassword(e.target.value)

}


/>











<h3>

¿Cómo quieres usar Volando?

</h3>











<div className="role-selector">










<div


className={

role==="cliente"

?

"role-card active"

:

"role-card"

}


onClick={()=>setRole("cliente")}


>





<div className="role-icon">


<UserRound size={50}/>


</div>








<h3>

Cliente

</h3>








<p>

Necesito enviar paquetes

</p>







</div>













<div


className={

role==="mensajero"

?

"role-card active"

:

"role-card"

}


onClick={()=>setRole("mensajero")}


>





<div className="role-icon">


<PackageCheck size={50}/>


</div>








<h3>

Mensajero

</h3>








<p>

Quiero realizar entregas

</p>







</div>









</div>














{


role==="mensajero" &&

(


<>






<h3>

¿Con qué realizarás las entregas?

</h3>









<div className="vehicle-selector">










<div


className={

vehicle==="A pie"

?

"vehicle-card active"

:

"vehicle-card"

}


onClick={()=>selectVehicle(

"A pie",

1

)}


>





<div className="role-icon">


<Footprints size={50}/>


</div>






<h3>

A pie

</h3>






<p>

Sin vehículo

</p>





</div>















<div


className={

vehicle==="Bicicleta"

?

"vehicle-card active"

:

"vehicle-card"

}


onClick={()=>selectVehicle(

"Bicicleta",

1.15

)}


>





<div className="role-icon">


<Bike size={50}/>


</div>






<h3>

Bicicleta

</h3>






<p>

Entrega rápida urbana

</p>





</div>














<div


className={

vehicle==="Moto"

?

"vehicle-card active"

:

"vehicle-card"

}


onClick={()=>selectVehicle(

"Moto",

1.40

)}


>





<div className="role-icon">


<Bike size={50}/>


</div>






<h3>

Moto

</h3>






<p>

Mayor velocidad

</p>





</div>















<div


className={

vehicle==="Auto"

?

"vehicle-card active"

:

"vehicle-card"

}


onClick={()=>selectVehicle(

"Auto",

1.80

)}


>





<div className="role-icon">


<Car size={50}/>


</div>






<h3>

Auto

</h3>






<p>

Paquetes grandes

</p>





</div>













</div>





</>

)

}









<button


className="primary"


onClick={register}


>

Crear cuenta

</button>









</main>





</>


)


}





export default Register