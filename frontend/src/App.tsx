import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useUser, SignedIn } from "@clerk/clerk-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Projects from "./components/Project";
import { Project } from "./components/types";
import Teams from "./components/Teams";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import NotFound from "./components/NotFound";
import axiosInstance from "./services/axiosInstance";
import CalendarComponent from "./components/Calendar";

const App: React.FC = () => {
    const { isSignedIn } = useUser();
    const navigate = useNavigate();
    const [hasRedirected, setHasRedirected] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        if (isSignedIn && !hasRedirected) {
            navigate("/dashboard");
            setHasRedirected(true);
        }
    }, [isSignedIn, navigate, hasRedirected]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axiosInstance.get("/api/projects");
                const formattedProjects = response.data.map((project: any) => ({
                    ...project,
                    team: { id: project.teamId, name: project.teamName },
                }));
                setProjects(formattedProjects);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        if (isSignedIn) {
            fetchProjects();
        }
    }, [isSignedIn]);

    const handleSignOut = () => {
        navigate("/");
        setHasRedirected(false);
    };

    

    return (
        <div className="app-container">
            <Navbar loggedIn={isSignedIn || false} onSignOut={handleSignOut} />
            <Routes>
                <Route path="/" element={<Home onSignIn={() => {}} />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/contact" element={<Contact />} />

                <Route
                    path="/dashboard"
                    element={
                        <SignedIn>
                            <Dashboard/>
                        </SignedIn>
                    }
                />
                <Route
                    path="/projects"
                    element={
                        <SignedIn>
                            <Projects
                                projects={projects}
                                setProjects={setProjects}
                                onDeleteProject={() => {}}
                            />
                        </SignedIn>
                    }
                />
                <Route
                    path="/teams"
                    element={
                        <SignedIn>
                            <Teams />
                        </SignedIn>
                    }
                />
                <Route
                    path="/calendar"
                    element={
                        <SignedIn>
                            <CalendarComponent />
                        </SignedIn>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
