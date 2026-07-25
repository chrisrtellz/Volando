import Navbar from '../components/Navbar'

import {
  useState
} from 'react'

import {
  useNavigate
} from 'react-router-dom'


import {
  login
} from "../data/auth"







function Login(){



const navigate = useNavigate()






const [email,setEmail]=useState("")


const [password,setPassword]=useState("")


const [error,setError]=useState("")









async function handleLogin(){



setError("")







const user = await login(

email,

password

)









if(!user){



setError(

"Error iniciando sesión. Revisa consola."

)


return


}









if(user.role==="admin"){



navigate("/admin")


return


}










if(user.role==="cliente"){



navigate("/client")


return


}










if(user.role==="mensajero"){



navigate("/messenger")


return


}






}









return(


<>


<Navbar />






<main className="register-page">






<h1>

Iniciar sesión

</h1>








<p>

Accede a tu cuenta de Volando.

</p>









<input



placeholder="Correo"



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













{


error &&



<p style={{color:"red"}}>


{error}


</p>



}












<button



className="primary"



onClick={handleLogin}



>



Entrar



</button>









</main>





</>


)



}



export default Login