import React from "react"
import { Link } from "react-router"
import { useAuth } from "../features/auth/hooks/useAuth"
import "../style/app-header.scss"

const AppHeader = ({ showHome = false }) => {
    const { user } = useAuth()

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
            </div>
        </header>
    )
}

export default AppHeader
