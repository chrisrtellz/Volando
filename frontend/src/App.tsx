import './App.css'

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'


import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

import Client from './pages/Client'
import Messenger from './pages/Messenger'
import Admin from './pages/Admin'

import ClientPanel from './pages/ClientPanel'
import MessengerPanel from './pages/MessengerPanel'

import MessengerVerification from './pages/MessengerVerification'


import ProtectedRoute from "./components/auth/ProtectedRoute"
import ProtectedAdmin from "./components/auth/ProtectedAdmin"








function App() {


return(


<BrowserRouter>


<Routes>





<Route

path="/"

element={<Home />}

/>







<Route

path="/login"

element={<Login />}

/>







<Route

path="/register"

element={<Register />}

/>










{/* CLIENTE - SOLICITAR ENVIOS */}


<Route


path="/client"


element={


<ProtectedRoute role="cliente">


<Client />


</ProtectedRoute>


}


/>









{/* PANEL CLIENTE */}


<Route


path="/client-panel"


element={


<ProtectedRoute role="cliente">


<ClientPanel />


</ProtectedRoute>


}


/>









{/* MENSAJERO - PEDIDOS */}


<Route


path="/messenger"


element={


<ProtectedRoute role="mensajero">


<Messenger />


</ProtectedRoute>


}


/>









{/* VERIFICACION MENSAJERO */}


<Route


path="/messenger-verification"


element={


<ProtectedRoute role="mensajero">


<MessengerVerification />


</ProtectedRoute>


}


/>









{/* PANEL MENSAJERO */}


<Route


path="/messenger-panel"


element={


<ProtectedRoute role="mensajero">


<MessengerPanel />


</ProtectedRoute>


}


/>









{/* ADMIN */}


<Route


path="/admin"


element={


<ProtectedAdmin>


<Admin />


</ProtectedAdmin>


}


/>







</Routes>


</BrowserRouter>


)


}


export default App