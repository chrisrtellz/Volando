import {
  supabase
} from "../supabase/client"





export type UserRole =
  | "cliente"
  | "mensajero"
  | "admin"









export type SupabaseUser = {


  id:number


  uid:string


  name:string


  email:string


  role:UserRole


  vehicle:string


  vehicleMultiplier:number


  available:boolean


  active:boolean


}








const USERS_TABLE = "users"









// ===============================
// CREAR USUARIO
// ===============================


export async function createSupabaseUser(

  user:SupabaseUser

){



  const {

    data,

    error

  } = await supabase

  .from(USERS_TABLE)

  .insert(user)

  .select()

  .single()







  if(error){


    console.error(

      "Error creando usuario en Supabase:",

      error

    )


    throw error


  }








  return data



}











// ===============================
// OBTENER TODOS LOS USUARIOS
// ===============================


export async function getSupabaseUsers()

:Promise<SupabaseUser[]>{





  const {

    data,

    error

  } = await supabase

  .from(USERS_TABLE)

  .select("*")








  if(error){



    console.error(

      "Error obteniendo usuarios:",

      error

    )



    return []



  }








  return data as SupabaseUser[]



}












// ===============================
// BUSCAR POR EMAIL
// ===============================


export async function getSupabaseUserByEmail(

  email:string

)

:Promise<SupabaseUser|null>{





  const {

    data,

    error

  } = await supabase

  .from(USERS_TABLE)

  .select("*")

  .eq(

    "email",

    email

  )

  .single()







  if(error){



    console.error(

      "Error buscando email:",

      error

    )



    return null



  }








  return data as SupabaseUser



}











// ===============================
// BUSCAR POR UID SUPABASE AUTH
// ===============================


export async function getSupabaseUserByUid(

  uid:string

)

:Promise<SupabaseUser|null>{





  const {

    data,

    error

  } = await supabase

  .from(USERS_TABLE)

  .select("*")

  .eq(

    "uid",

    uid

  )

  .single()







  if(error){



    console.error(

      "Error buscando UID:",

      error

    )



    return null



  }








  return data as SupabaseUser



}












// ===============================
// CAMBIAR DISPONIBILIDAD MENSAJERO
// ===============================


export async function updateSupabaseAvailability(

  id:number,

  status:boolean

){





  const {

    error

  } = await supabase

  .from(USERS_TABLE)

  .update({

    available:status

  })

  .eq(

    "id",

    id

  )








  if(error){


    console.error(

      "Error actualizando disponibilidad:",

      error

    )


  }



}











// ===============================
// BLOQUEAR / ACTIVAR USUARIO
// ===============================


export async function toggleSupabaseUserActive(

  id:number

){





  const {

    data,

    error

  } = await supabase

  .from(USERS_TABLE)

  .select(

    "active"

  )

  .eq(

    "id",

    id

  )

  .single()








  if(error){


    console.error(

      "Error leyendo usuario:",

      error

    )


    return


  }









  const result = await supabase

  .from(USERS_TABLE)

  .update({

    active:!(data.active ?? true)

  })

  .eq(

    "id",

    id

  )








  if(result.error){


    console.error(

      "Error cambiando estado:",

      result.error

    )


  }



}












// ===============================
// ELIMINAR USUARIO
// ===============================


export async function deleteSupabaseUser(

  id:number

){





  const {

    error

  } = await supabase

  .from(USERS_TABLE)

  .delete()

  .eq(

    "id",

    id

  )








  if(error){


    console.error(

      "Error eliminando usuario:",

      error

    )


  }



}