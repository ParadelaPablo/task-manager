import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { SignInButton, UserButton, useAuth } from "@clerk/clerk-react";
import "../estilos/navbar.css";
import "../estilos/buttons.css";
import "../estilos/icon.css";
import "../index.css";

interface NavbarProps {
    loggedIn: boolean;
    onSignOut: () => void; // Añadimos la prop onSignOut
}

const Navbar: React.FC<NavbarProps> = ({ loggedIn, onSignOut }) => {
    const { isSignedIn } = useAuth();

    useEffect(() => {
        if (isSignedIn) {
            // Aquí podrías añadir lógica adicional si lo necesitas
        }
    }, [isSignedIn]);

    return (
        <nav className="navbar">
            <div className="navbar-title">CollabTask</div>
            <div className="navbar-links">
                {!loggedIn ? (
                    <>
                        <Link to="/" className="navbar-link">Home</Link>
                        <Link to="/pricing" className="navbar-link">Pricing</Link>
                        <Link to="/contact" className="navbar-link">Contact</Link>
                    </>
                ) : (
                    <>
                        <Link to="/dashboard" className="navbar-link">Dashboard</Link>
                        <Link to="/projects" className="navbar-link">Projects</Link>
                        <Link to="/teams" className="navbar-link">Teams</Link>
                        <Link to="/calendar" className="navbar-link">Calendar</Link>
                    </>
                )}
            </div>
            <div className="navbar-buttons">
                {!loggedIn ? (
                    <SignInButton mode="modal">
                        <button className="btn btn-primary">Sign In</button>
                    </SignInButton>
                ) : (
                    <>
                        <div className="icon-container">
                            <span className="icon">🔔</span>
                        </div>
                        <div className="icon-container">
                            <UserButton />
                        </div>
                        <button className="btn btn-secondary" onClick={onSignOut}>
                            Sign Out
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
