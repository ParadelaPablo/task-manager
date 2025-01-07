import { useState, useEffect } from 'react';
import "../index.css";
import CreateTeamModal from './CreateTeamModal';
import axiosInstance from '../services/axiosInstance';
import "../estilos/teams.css";
import "../estilos/teamModal.css";

interface Member {
    id: number;
    name: string;
}

interface Team {
    id: number;
    name: string;
    members: Member[];
    memberCount: number;
}

interface Project {
    id: number;
    name: string;
    description: string;
    team: { id: number; name: string };
    deadline: string;
}

const Teams = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [teams, setTeams] = useState<Team[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axiosInstance.get('/teams');
                setTeams(response.data || []);
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };

        const fetchProjects = async () => {
            try {
                const response = await axiosInstance.get('/projects');
                setProjects(response.data || []);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchTeams();
        fetchProjects();
    }, []);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleDeleteTeam = async (teamId: number) => {
        if (!window.confirm("Are you sure you want to delete this team?")) return;

        try {
            await axiosInstance.delete(`/teams/${teamId}`);
            setTeams((prevTeams) => prevTeams.filter((team) => team.id !== teamId));
            setProjects((prevProjects) => prevProjects.filter((project) => project.team?.id !== teamId));
            alert("Team and related projects deleted successfully!");
        } catch (error) {
            console.error("Error deleting team:", error);
            alert("Failed to delete team.");
        }
    };

    return (
        <>
            <div className="teams-container">
                <div className="teams-header">
                    <h1 className="teams-title">Teams</h1>
                    <button className="teams-btn-primary" onClick={handleOpenModal}>
                        Create New Team
                    </button>
                </div>
                <div className="teams-cards">
                    {teams.map((team) => (
                        <div key={team.id} className="teams-card">
                            <h2 className="teams-card-title">{team.name}</h2>
                            <p><strong>Members:</strong> {team.memberCount}</p>
                            <ul>
                                {team.members.map((member) => (
                                    <li key={member.id}>{member.name}</li>
                                ))}
                            </ul>
                            <button
                                className="delete-btn"
                                onClick={() => handleDeleteTeam(team.id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                <CreateTeamModal
                    onClose={handleCloseModal}
                    onSubmit={async (data) => {
                        try {
                            const response = await axiosInstance.post('/teams', data);
                            setTeams((prevTeams) => [...prevTeams, response.data]);
                            alert("Team created successfully!");
                        } catch (error) {
                            console.error("Error creating team:", error);
                            alert("Failed to create team.");
                        }
                    }}
                />
            )}
        </>
    );
};

export default Teams;
