import Navbar from '../components/Navbar'
import {useState} from 'react'
import {login} from '../data/auth'
import {useNavigate} from 'react-router-dom'



function Login(){


  const navigate = useNavigate()



  const [email,setEmail] = useState("")

  const [password,setPassword] = useState("")

  const [error,setError] = useState("")








  function handleLogin(){



    const user = login(

      email,

      password

    )







    if(!user){



      setError(

        "Correo o contraseña incorrectos"

      )


      return


    }







    // ADMIN

    if(user.role === "admin"){


      navigate("/admin")


      return


    }








    // CLIENTE

    if(user.role === "cliente"){


      navigate("/client")


      return


    }









    // MENSAJERO

    if(user.role === "mensajero"){


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