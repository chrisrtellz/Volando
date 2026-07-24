import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc
} from "firebase/firestore"

import {
  db
} from "../firebase/firestore"





export type UserRole =
  | "cliente"
  | "mensajero"
  | "admin"







export type FirebaseUser = {


  firebaseId?: string


  id: number


  uid: string


  name: string


  email: string


  role: UserRole


  vehicle: string


  vehicleMultiplier: number


  available: boolean


  active: boolean


}






const USERS_COLLECTION = "users"










// ===============================
// CREAR USUARIO
// ===============================


export async function createFirebaseUser(

  user: FirebaseUser

){


  const ref = await addDoc(

    collection(

      db,

      USERS_COLLECTION

    ),

    user

  )


  return ref.id


}









// ===============================
// OBTENER TODOS LOS USUARIOS
// ===============================


export async function getFirebaseUsers()

:Promise<FirebaseUser[]>{



  const snapshot = await getDocs(

    collection(

      db,

      USERS_COLLECTION

    )

  )





  return snapshot.docs.map(docSnap => {


    const data = docSnap.data()


    return {


      firebaseId: docSnap.id,


      id: data.id,


      uid: data.uid,


      name: data.name,


      email: data.email,


      role: data.role,


      vehicle: data.vehicle ?? "",


      vehicleMultiplier:
        data.vehicleMultiplier ?? 1,


      available:
        data.available ?? false,


      active:
        data.active ?? true


    } as FirebaseUser


  })



}









// ===============================
// BUSCAR POR EMAIL
// ===============================


export async function getFirebaseUserByEmail(

  email:string

)

:Promise<FirebaseUser|null>{



  const q = query(

    collection(

      db,

      USERS_COLLECTION

    ),


    where(

      "email",

      "==",

      email

    )

  )





  const snapshot = await getDocs(q)





  if(snapshot.empty){

    return null

  }






  const data = snapshot.docs[0].data()





  return {


    firebaseId:
      snapshot.docs[0].id,


    id:data.id,


    uid:data.uid,


    name:data.name,


    email:data.email,


    role:data.role,


    vehicle:data.vehicle ?? "",


    vehicleMultiplier:
      data.vehicleMultiplier ?? 1,


    available:
      data.available ?? false,


    active:
      data.active ?? true



  } as FirebaseUser



}









// ===============================
// BUSCAR POR UID FIREBASE AUTH
// ===============================


export async function getFirebaseUserByUid(

  uid:string

)

:Promise<FirebaseUser|null>{



  const q=query(

    collection(

      db,

      USERS_COLLECTION

    ),


    where(

      "uid",

      "==",

      uid

    )

  )






  const snapshot = await getDocs(q)





  if(snapshot.empty){

    return null

  }







  const data=snapshot.docs[0].data()





  return {


    firebaseId:
      snapshot.docs[0].id,


    id:data.id,


    uid:data.uid,


    name:data.name,


    email:data.email,


    role:data.role,


    vehicle:data.vehicle ?? "",


    vehicleMultiplier:
      data.vehicleMultiplier ?? 1,


    available:
      data.available ?? false,


    active:
      data.active ?? true



  } as FirebaseUser



}









// ===============================
// CAMBIAR DISPONIBILIDAD MENSAJERO
// ===============================


export async function updateFirebaseAvailability(

  id:number,

  status:boolean

){



  const q=query(

    collection(

      db,

      USERS_COLLECTION

    ),


    where(

      "id",

      "==",

      id

    )

  )





  const snapshot = await getDocs(q)





  if(snapshot.empty){

    return

  }





  await updateDoc(

    doc(

      db,

      USERS_COLLECTION,

      snapshot.docs[0].id

    ),

    {


      available:status


    }

  )



}











// ===============================
// BLOQUEAR / ACTIVAR USUARIO
// ===============================


export async function toggleFirebaseUserActive(

  id:number

){



  const q=query(

    collection(

      db,

      USERS_COLLECTION

    ),


    where(

      "id",

      "==",

      id

    )

  )






  const snapshot = await getDocs(q)





  if(snapshot.empty){

    return

  }






  const current = snapshot.docs[0].data()





  await updateDoc(

    doc(

      db,

      USERS_COLLECTION,

      snapshot.docs[0].id

    ),

    {


      active:
        !(current.active ?? true)


    }

  )



}









// ===============================
// ELIMINAR USUARIO
// ===============================


export async function deleteFirebaseUser(

  id:number

){



  const q=query(

    collection(

      db,

      USERS_COLLECTION

    ),


    where(

      "id",

      "==",

      id

    )

  )





  const snapshot = await getDocs(q)





  if(snapshot.empty){

    return

  }







  await deleteDoc(

    doc(

      db,

      USERS_COLLECTION,

      snapshot.docs[0].id

    )

  )



}