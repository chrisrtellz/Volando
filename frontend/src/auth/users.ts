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


}







const STORAGE_KEY = "users"








export function getUsers():User[]{


  const saved = localStorage.getItem(

    STORAGE_KEY

  )



  if(saved){


    return JSON.parse(saved)


  }



  return []

}








function saveUsers(users:User[]){



  localStorage.setItem(

    STORAGE_KEY,

    JSON.stringify(users)

  )


}








export function register(user:User){



  const users = getUsers()



  users.push(user)



  saveUsers(users)



}









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



  return user



}








export function logout(){


  localStorage.removeItem(

    "session"

  )


}








export function saveSession(user:User){


  localStorage.setItem(

    "session",

    JSON.stringify(user)

  )


}








export function getSession():User|null{



  const saved = localStorage.getItem(

    "session"

  )



  if(saved){


    return JSON.parse(saved)


  }



  return null


}