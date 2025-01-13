import "../index.css";
import React from "react";
import "../estilos/home.css";

interface HomeProps {
    onSignIn: () => void;
}

const Home: React.FC<HomeProps> = ({ onSignIn }) => {
    return (
        <div className="home">
            <main className="main-home">
                <section className="hero">
                    <div className="hero-left">
                        <h2 className="hero-title">Elevate Your Team's Performance</h2>
                        <p className="hero-description">
                            Empower your company with effortless task management and seamless collaboration.
                        </p>
                        <button onClick={onSignIn} className="btn btn-primary"></button>
                    </div>
                    <div className="hero-right">
                        <img
                            src="./Logo.png"
                            alt="Company Logo"
                            className="hero-logo"
                        />
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
