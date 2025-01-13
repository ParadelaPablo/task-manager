import "../index.css";
import React from "react";
import "../estilos/home.css";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
    return (
        <div className="home">
            <main className="main-home">
                <section className="hero">
                    <div className="hero-left">
                        <h2 className="hero-title">Elevate Your Team's Performance</h2>
                        <p className="hero-description">
                            Empower your company with effortless task management and seamless collaboration.
                        </p>
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
