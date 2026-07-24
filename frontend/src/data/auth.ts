import { getUsers } from "./users"



export type CurrentUser = {


  id:number


  name:string


  email:string


  role:
    | "cliente"
    | "mensajero"
    | "admin"



  vehicle:string


  vehicleMultiplier:number


  available:boolean


}







const SESSION_KEY = "currentUser"











export function login(


  email:string,


  password:string


){



  const users = getUsers()



  const user = users.find(



    user =>



      user.email === email &&



      user.password === password



  )









  if(user){



    const session:CurrentUser = {



      id:user.id,



      name:user.name,



      email:user.email,



      role:user.role,



      vehicle:user.vehicle || "",



      vehicleMultiplier:
        user.vehicleMultiplier || 1,



      available:
        user.available ?? false



    }








    localStorage.setItem(


      SESSION_KEY,


      JSON.stringify(session)


    )







    return session



  }









  return null



}














export function logout(){



  localStorage.removeItem(


    SESSION_KEY


  )


}














export function getCurrentUser():CurrentUser | null{



  const saved = localStorage.getItem(


    SESSION_KEY


  )








  if(saved){



    return JSON.parse(saved)



  }








  return null



}














export function isLogged(){



  return getCurrentUser() !== null



}















// Actualizar disponibilidad del mensajero

export function updateSessionAvailability(


  status:boolean


){



  const saved = localStorage.getItem(


    SESSION_KEY


  )





  if(saved){



    const user:CurrentUser = JSON.parse(saved)





    user.available = status





    localStorage.setItem(


      SESSION_KEY,


      JSON.stringify(user)


    )



  }



}











// Verificar si es administrador

export function isAdmin(){



  const user = getCurrentUser()



  return user?.role === "admin"



}











// Verificar si es mensajero

export function isMessenger(){



  const user = getCurrentUser()



  return user?.role === "mensajero"



}











// Verificar si es cliente

export function isClient(){



  const user = getCurrentUser()



  return user?.role === "cliente"



}