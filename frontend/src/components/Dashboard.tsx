import React, { useState, useEffect } from "react";
import "../estilos/dashboard.css";
import axiosInstance from "../services/axiosInstance";
import { Project } from "./types";

const Dashboard: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [employeeCount, setEmployeeCount] = useState<number>(0);
    const [teamCount, setTeamCount] = useState<number>(0);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const employeeResponse = await axiosInstance.get("/employees/count");
                setEmployeeCount(employeeResponse.data.employeeCount); 
                
                const teamResponse = await axiosInstance.get("/teams/count");
                setTeamCount(teamResponse.data.teamCount); 

                const projectsResponse = await axiosInstance.get("/projects");
                setProjects(projectsResponse.data); 
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []); 

    const recentProjects = projects.filter((project) => {
        if (!project || !project.deadline) return false; 

        const today = new Date();
        const deadline = new Date(project.deadline);
        const difference = (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24); 
        return difference <= 7 && difference >= 0; 
    });

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Welcome back!</h1>
            <p className="dashboard-subtitle">Here's what's happening with your projects today.</p>

            <div className="dashboard-stats">
                <div className="dashboard-stat">
                    <h2>Total Projects</h2>
                    <p>{projects.length}</p>
                </div>
                <div className="dashboard-stat">
                    <h2>Upcoming Projects</h2>
                    <p>{recentProjects.length}</p>
                </div>
                <div className="dashboard-stat">
                    <h2>Total Teams</h2>
                    <p>{teamCount}</p>
                </div>
                <div className="dashboard-stat">
                    <h2>Total Employees</h2>
                    <p>{employeeCount}</p>
                </div>
            </div>

            <div className="dashboard-recent">
                <h2 className="recent-title">Recent Tasks</h2>
                <ul className="recent-list">
                    {recentProjects.map((project) => (
                        <li key={project.id} className="recent-item">
                            <div>
                                <h3>{project.name}</h3>
                                <p>
                                    {project.teamName || "No team assigned"} • Due in{" "}
                                    {Math.ceil(
                                        (new Date(project.deadline || "").getTime() - new Date().getTime()) /
                                            (1000 * 60 * 60 * 24)
                                    )}{" "}
                                    days
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
