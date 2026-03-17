import React from "react"
import { Link, useNavigate } from "react-router"
import { useAuth } from "../features/auth/hooks/useAuth"
import "../style/app-header.scss"

const AppHeader = ({ showHome = false, showAuthLinks = false }) => {
    const { user, handleLogout } = useAuth()
    const navigate = useNavigate()

    return (
        <header className="app-header">
            <Link className="app-header__brand" to={user ? "/" : "/login"}>
                Interview AI
            </Link>

            <div className="app-header__actions">
                {user && (
                    <div className="app-header__identity">
                        <span className="app-header__caption">Signed in as</span>
                        <strong>{user.username || user.email}</strong>
                    </div>
                )}

                {showHome && user && (
                    <Link className="button secondary-button" to="/">
                        Home
                    </Link>
                )}

                {showAuthLinks && !user && (
                    <>
                        <Link className="button secondary-button" to="/login">
                            Login
                        </Link>
                        <Link className="button primary-button" to="/register">
                            Register
                        </Link>
                    </>
                )}

                {user && (
                    <button
                        className="button secondary-button"
                        onClick={async () => {
                            await handleLogout()
                            navigate("/login")
                        }}
                    >
                        Logout
                    </button>
                )}
            </div>
        </header>
    )
}

export default AppHeader
