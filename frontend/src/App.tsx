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


import ProtectedRoute from "./components/auth/ProtectedRoute"
import ProtectedAdmin from "./components/auth/ProtectedAdmin"





function App() {


  return (


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


            <ProtectedRoute>


              <Client />


            </ProtectedRoute>


          }


        />








        {/* PANEL CLIENTE */}


        <Route


          path="/client-panel"


          element={


            <ProtectedRoute>


              <ClientPanel />


            </ProtectedRoute>


          }


        />









        {/* MENSAJERO - TRABAJO */}


        <Route


          path="/messenger"


          element={


            <ProtectedRoute>


              <Messenger />


            </ProtectedRoute>


          }


        />









        {/* PANEL MENSAJERO */}


        <Route


          path="/messenger-panel"


          element={


            <ProtectedRoute>


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