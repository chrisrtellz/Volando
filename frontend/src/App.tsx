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









        <Route


          path="/client"


          element={


            <ProtectedRoute>


              <Client />


            </ProtectedRoute>


          }


        />











        <Route


          path="/messenger"


          element={


            <ProtectedRoute>


              <Messenger />


            </ProtectedRoute>


          }


        />









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