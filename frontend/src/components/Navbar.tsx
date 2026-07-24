import { useNavigate } from "react-router-dom"
import { getCurrentUser, logout } from "../data/auth"
import { useState } from "react"

function Navbar() {

  const navigate = useNavigate()

  const [user, setUser] = useState(getCurrentUser())

  function handleLogout() {

    logout()

    setUser(null)

    navigate("/login")

  }

  function goPanel() {

    if (user?.role === "cliente") {

      navigate("/client-panel")

    }

    if (user?.role === "mensajero") {

      navigate("/messenger-panel")

    }

    if (user?.role === "admin") {

      navigate("/admin-panel")

    }

  }

  return (

    <header className="navbar">

      {/* LOGO */}

      <div

        className="logo"

        onClick={() => navigate("/")}

      >

        <div className="logo-icon">

          🪽

        </div>

        <div className="logo-text">

          <h2>VOLANDO</h2>

          <span>Plataforma de mensajería</span>

        </div>

        <div className="logo-home">

          🏠 Volver al inicio

        </div>

      </div>

      {/* BOTONES */}

      <div className="nav-buttons">

        {

          !user && (

            <>

              <button

                className="login"

                onClick={() => navigate("/login")}

              >

                Entrar

              </button>

              <button

                className="register"

                onClick={() => navigate("/register")}

              >

                Crear cuenta

              </button>

            </>

          )

        }

        {

          user && (

            <>

              <span className="user-name">

                👤 {user.name}

              </span>

              <button

                className="secondary"

                onClick={goPanel}

              >

                Mi panel

              </button>

              <button

                className="login"

                onClick={handleLogout}

              >

                Salir

              </button>

            </>

          )

        }

      </div>

    </header>

  )

}

export default Navbar