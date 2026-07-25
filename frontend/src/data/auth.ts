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


}







const SESSION_KEY="currentUser"









// LOGIN SUPABASE


export async function login(


email:string,


password:string


):Promise<CurrentUser|null>{






try{





const {

data,

error

} = await supabase.auth.signInWithPassword({


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








const uid = data.user.id







const profile = await getSupabaseUserByUid(


uid


)






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

profile.available ?? false



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











// CERRAR SESION


export async function logout(){



await supabase.auth.signOut()



localStorage.removeItem(


SESSION_KEY


)



}












// USUARIO ACTUAL


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












// ESTA LOGUEADO


export function isLogged(){



return getCurrentUser() !== null



}












// ACTUALIZAR DISPONIBILIDAD LOCAL


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