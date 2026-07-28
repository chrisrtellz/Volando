import Navbar from "../components/Navbar"

import {
  useState
} from "react"


import {
  getCurrentUser,
  updateSessionVerification
} from "../data/auth"


import {
  updateMessengerProfile
} from "../data/supabaseUsers"


import {
  Phone,
  MapPin,
  IdCard,
  Car,
  FileText,
  ShieldCheck,
  Bike
} from "lucide-react"








function MessengerVerification(){


const user = getCurrentUser()





const [phone,setPhone] = useState("")

const [address,setAddress] = useState("")

const [idDocument,setIdDocument] = useState("")

const [licenseNumber,setLicenseNumber] = useState("")

const [vehiclePlate,setVehiclePlate] = useState("")




const [noLicense,setNoLicense] = useState(false)

const [noPlate,setNoPlate] = useState(false)






// PERSISTENTE
const [submitted,setSubmitted] = useState(

user?.profileComplete === true &&

user?.verificationStatus === "pending"

)









async function sendVerification(){



if(
!phone ||
!address ||
!idDocument ||
(!licenseNumber && !noLicense) ||
(!vehiclePlate && !noPlate)
){

alert(
"Completa todos los campos obligatorios"
)

return

}






if(!user){

return

}









await updateMessengerProfile(

user.id,

{


phone,

address,

idDocument,


licenseNumber:

noLicense

?

null

:

licenseNumber,




vehiclePlate:

noPlate

?

null

:

vehiclePlate


}

)









// GUARDAR ESTADO LOCAL

updateSessionVerification(

false,

true,

"pending"

)







setSubmitted(true)



}









return(

<>


<Navbar />





<main className="verification-page">





<section className="verification-container">







<div className="verification-header">



<div className="verification-logo">

<Bike size={45}/>

</div>




<h1>

Verificación de mensajero

</h1>




<p>

Completa tu ficha para comenzar a recibir pedidos en Volando.

</p>



</div>









<div className="verification-progress">






<div className={

submitted

?

"step completed"

:

"step active"

}>


{

submitted

?

"✓"

:

"1"

}



<span>

Datos personales

</span>



</div>









<div className={

submitted

?

"line active"

:

"line"

}>

</div>









<div className={

submitted

?

"step active"

:

"step"

}>


{

submitted

?

"⏳"

:

"2"

}



<span>

Revisión

</span>



</div>








<div className="line">

</div>








<div className="step">


3



<span>

Aprobación

</span>


</div>






</div>









<div className="verification-card">







{submitted &&

<div className="pending-box">



<h2>

⏳ Cuenta pendiente

</h2>




<p>

Tus datos fueron enviados correctamente.

</p>




<p>

Un administrador debe aprobar tu cuenta antes de comenzar a recibir pedidos.

</p>




</div>

}









{!submitted &&

<>





<h2>

📋 Información requerida

</h2>






<p className="info-text">

Estos datos serán revisados por el equipo de Volando antes de activar tu cuenta.

</p>









<div className="input-group">

<Phone size={22}/>


<input

placeholder="Número de teléfono"

value={phone}

onChange={e=>setPhone(e.target.value)}

/>


</div>









<div className="input-group">

<MapPin size={22}/>


<input

placeholder="Dirección actual"

value={address}

onChange={e=>setAddress(e.target.value)}

/>


</div>









<div className="input-group">

<IdCard size={22}/>


<input

placeholder="Documento de identidad"

value={idDocument}

onChange={e=>setIdDocument(e.target.value)}

/>


</div>









<div className="input-group">

<FileText size={22}/>


<input

placeholder="Número de licencia"

value={licenseNumber}

disabled={noLicense}

onChange={e=>setLicenseNumber(e.target.value)}

/>


</div>









<label

className={

noLicense

?

"check-option checked"

:

"check-option"

}

>



<input

type="checkbox"

checked={noLicense}

onChange={e=>{


setNoLicense(e.target.checked)



if(e.target.checked){

setLicenseNumber("")

}



}}

/>



<span>

No poseo licencia

</span>



</label>









<div className="input-group">

<Car size={22}/>


<input

placeholder="Matrícula del vehículo"

value={vehiclePlate}

disabled={noPlate}

onChange={e=>setVehiclePlate(e.target.value)}

/>


</div>









<label

className={

noPlate

?

"check-option checked"

:

"check-option"

}

>



<input

type="checkbox"

checked={noPlate}

onChange={e=>{


setNoPlate(e.target.checked)



if(e.target.checked){

setVehiclePlate("")

}



}}

/>



<span>

No poseo matrícula

</span>



</label>









<button

className="verification-button"

onClick={sendVerification}

>



<ShieldCheck size={22}/>



Enviar solicitud de aprobación



</button>







</>

}







</div>









</section>






</main>





</>

)


}



export default MessengerVerification