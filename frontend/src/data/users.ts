export type UserRole =
  | "cliente"
  | "mensajero"
  | "admin"




export type User = {


  id:number


  name:string


  email:string


  password:string


  role:UserRole


  vehicle:string


  vehicleMultiplier:number


  available:boolean


  active?:boolean


}







const KEY = "users"









export function getUsers():User[]{


  const saved = localStorage.getItem(KEY)



  if(saved){



    const users = JSON.parse(saved)



    return users.map((user:any)=>({



      ...user,



      vehicle:user.vehicle || "",



      vehicleMultiplier:
        user.vehicleMultiplier || 1,



      available:
        user.available ?? false,



      active:
        user.active ?? true



    }))



  }



  return []

}











function saveUsers(users:User[]){



  localStorage.setItem(

    KEY,

    JSON.stringify(users)

  )


}











export function createUser(user:User){



  const users = getUsers()



  users.push(user)



  saveUsers(users)



}











export function loginUser(

  email:string,

  password:string

){



  const users = getUsers()



  return users.find(



    user =>



      user.email === email &&



      user.password === password &&



      user.active !== false



  )



}











// Crear usuario administrador


export function createAdmin(){



  const users = getUsers()



  const exists = users.find(


    user => user.role === "admin"


  )



  if(exists){


    return


  }






  const admin:User = {



    id:Date.now(),



    name:"Administrador",



    email:"admin@volando.com",



    password:"123456",



    role:"admin",



    vehicle:"",



    vehicleMultiplier:0,



    available:false,



    active:true



  }







  users.push(admin)



  saveUsers(users)



}











// Cambiar disponibilidad del mensajero


export function updateAvailability(


  id:number,


  status:boolean


){



  const users = getUsers()



  const updatedUsers = users.map(user=>{



    if(user.id === id){



      return {



        ...user,



        available:status



      }



    }





    return user



  })







  saveUsers(updatedUsers)



}











// Eliminar usuario


export function deleteUser(


  id:number


){



  const users = getUsers()



  const filteredUsers = users.filter(


    user => user.id !== id


  )



  saveUsers(filteredUsers)



}











// Activar o bloquear usuario


export function toggleUserActive(


  id:number


){



  const users = getUsers()



  const updatedUsers = users.map(user=>{



    if(user.id === id){



      return {



        ...user,



        active:!user.active



      }



    }



    return user



  })




  saveUsers(updatedUsers)



}