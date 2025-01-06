import React, { useState, useEffect } from 'react';
import "../index.css";
import ProjectFormModal from './CreateProjectModal';
import "../estilos/project.css";
import "../estilos/projectModal.css";
import "../estilos/home.css";
import "../estilos/cards.css";
import "../estilos/buttons.css";
import axiosInstance from '../services/axiosInstance';
import { Project, Team } from './types';

interface LocalProject {
    id: number;
    name: string;
    description: string;
    teamName?: string;
    deadline?: string;
}

interface ProjectsProps {
    projects: Project[];
    setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
    onDeleteProject: (projectId: number) => void;
}

const Projects: React.FC<ProjectsProps> = ({ projects, setProjects, onDeleteProject }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [teams, setTeams] = useState<Team[]>([]);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    useEffect(() => {
        const fetchProjectsAndTeams = async () => {
            try {
                const [projectsResponse, teamsResponse] = await Promise.all([
                    axiosInstance.get('/projects'),
                    axiosInstance.get('/teams'),
                ]);

                setProjects(projectsResponse.data || []);
                setTeams(teamsResponse.data || []);
            } catch (error) {
                console.error("Error fetching projects or teams:", error);
            }
        };

        fetchProjectsAndTeams();
    }, [setProjects]);

    const handleSubmit = async (formData: { name: string; description: string; teamId: number }) => {
        try {
            const response = await axiosInstance.post('/projects', formData);
            const savedProject = response.data;
            setProjects((prevProjects) => [...prevProjects, savedProject]);
            alert("Project created successfully!");
        } catch (error: any) {
            console.error("Error creating project:", error.response?.data || error.message);
            alert("Failed to create project: " + (error.response?.data?.message || error.message));
        } finally {
            handleCloseModal();
        }
    };

    const handleDeleteProject = async (projectId: number) => {
        try {
            await axiosInstance.delete(`/projects/${projectId}`);
            
            setProjects((prevProjects) =>
                prevProjects.filter((project) => project.id !== projectId)
            );
        } catch (error) {
            console.error("Error deleting project:", error);
            alert("Failed to delete project.");
        }
    };

    return (
        <>
            <div className="projects-container">
                <div className="projects-header">
                    <h1 className="projects-title">Projects</h1>
                    <button className="projects-btn-primary" onClick={handleOpenModal}>
                        Create New Project
                    </button>
                </div>
                <div className="projects-grid">
                    {projects.map((project) => (
                        <div key={project.id} className="projects-card">
                            <h2 className="projects-card-title">{project.name}</h2>
                            <p>{project.description}</p>
                            <p><strong>Team:</strong> {project.teamName || "No team assigned"}</p>
                            <p><strong>Deadline:</strong> {project.deadline ? new Date(project.deadline).toLocaleDateString() : "No deadline set"}</p>
                            <button
                                className="delete-btn"
                                onClick={() => handleDeleteProject(project.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <ProjectFormModal
                    onClose={handleCloseModal}
                    onSubmit={handleSubmit}
                    teams={teams}
                />
            )}
        </>
    );
};

export default Projects;
