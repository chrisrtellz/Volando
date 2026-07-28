import {
  supabase
} from "../supabase/client"


import {
  getSupabaseUserByUid
} from "./supabaseUsers"








export type CurrentUser = {


  id:number


  uid:string


  name:string


  email:string


  role:
    | "cliente"
    | "mensajero"
    | "admin"



  vehicle:string


  vehicleMultiplier:number


  available:boolean



  verified:boolean


  profileComplete:boolean


  verificationStatus:
    | "pending"
    | "approved"
    | "rejected"



}








const SESSION_KEY="currentUser"











// LOGIN


export async function login(

email:string,

password:string

):Promise<CurrentUser|null>{



try{


const {

data,

error

}=await supabase.auth.signInWithPassword({

email,

password

})




if(error || !data.user){

console.error(
"Error login:",
error
)

return null

}




const uid=data.user.id



const profile = await getSupabaseUserByUid(uid)



if(!profile){

return null

}





const session:CurrentUser={


id:profile.id,

uid:profile.uid,

name:profile.name,

email:profile.email,

role:profile.role,

vehicle:profile.vehicle || "",

vehicleMultiplier:
profile.vehicleMultiplier || 1,

available:
profile.available ?? false,


verified:
profile.verified ?? false,


profileComplete:
profile.profileComplete ?? false,


verificationStatus:
profile.verificationStatus || "pending"


}




saveSession(session)


return session



}
catch(error){


console.error(
"Error login:",
error
)


return null


}


}











// GUARDAR SESION


export function saveSession(
user:CurrentUser
){

localStorage.setItem(

SESSION_KEY,

JSON.stringify(user)

)

}











// OBTENER SESION


export function getCurrentUser()

:CurrentUser|null{


const saved =
localStorage.getItem(
SESSION_KEY
)



if(saved){

return JSON.parse(saved)

}


return null


}











// REFRESCAR DATOS DEL USUARIO DESDE SUPABASE
// IMPORTANTE PARA APROBACIONES DEL ADMIN


export async function refreshCurrentUser(){


const current = getCurrentUser()



if(!current){

return null

}



const profile = await getSupabaseUserByUid(

current.uid

)



if(!profile){

return null

}



const updated:CurrentUser={


id:profile.id,

uid:profile.uid,

name:profile.name,

email:profile.email,

role:profile.role,

vehicle:profile.vehicle || "",

vehicleMultiplier:
profile.vehicleMultiplier || 1,

available:
profile.available ?? false,


verified:
profile.verified ?? false,


profileComplete:
profile.profileComplete ?? false,


verificationStatus:
profile.verificationStatus || "pending"


}



saveSession(updated)



return updated


}











// CERRAR SESION


export async function logout(){


await supabase.auth.signOut()


localStorage.removeItem(

SESSION_KEY

)


}











// LOGIN CHECK


export function isLogged(){


return getCurrentUser() !== null


}











// ACTUALIZAR DISPONIBILIDAD


export function updateSessionAvailability(

status:boolean

){


const saved =
localStorage.getItem(
SESSION_KEY
)



if(saved){


const user:CurrentUser =
JSON.parse(saved)



user.available=status



saveSession(user)


}


}











// ACTUALIZAR VERIFICACION


export function updateSessionVerification(

verified:boolean,

profileComplete:boolean,

status:
"pending"
|
"approved"
|
"rejected"

){



const saved =
localStorage.getItem(
SESSION_KEY
)



if(saved){



const user:CurrentUser =
JSON.parse(saved)



user.verified=verified


user.profileComplete=profileComplete


user.verificationStatus=status



saveSession(user)



}


}











// ROLES


export function isAdmin(){

return getCurrentUser()?.role==="admin"

}



export function isMessenger(){

return getCurrentUser()?.role==="mensajero"

}



export function isClient(){

return getCurrentUser()?.role==="cliente"

}