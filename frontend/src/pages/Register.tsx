import Navbar from '../components/Navbar'
import { useState } from 'react'
import { createUser, getUsers } from '../data/users'
import { useNavigate } from 'react-router-dom'


function Register() {


  const navigate = useNavigate()



  const [name,setName] = useState("")

  const [email,setEmail] = useState("")

  const [password,setPassword] = useState("")


  const [role,setRole] = useState<"cliente" | "mensajero">("cliente")



  const [vehicle,setVehicle] = useState("")

  const [vehicleMultiplier,setVehicleMultiplier] = useState(1)





  function selectVehicle(

    name:string,

    multiplier:number

  ){


    setVehicle(name)

    setVehicleMultiplier(multiplier)


  }









  function register(){



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

      role === "mensajero" &&

      vehicle === ""

    ){


      alert(
        "Selecciona un vehículo"
      )


      return

    }







    const exists = getUsers().find(

      user => user.email === email

    )






    if(exists){


      alert(
        "Ese correo ya está registrado"
      )


      return


    }









    createUser({


      id:Date.now(),


      name,


      email,


      password,


      role,


      vehicle,


      vehicleMultiplier,


      available:false



    })








    alert(

      "Cuenta creada correctamente"

    )





    navigate("/login")



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

👤

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

🛵

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

role==="mensajero" && (



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

🚶

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

🚲

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

🛵

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

🚗

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