import React, { useState } from 'react';
import "../estilos/modal.css";

interface ProjectFormModalProps {
    onClose: () => void;
    onSubmit: (data: { name: string; description: string; teamId: number; deadline: string }) => void;
    teams: { id: number; name: string }[]; 
}

const ProjectFormModal: React.FC<ProjectFormModalProps> = ({ onClose, onSubmit, teams }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [teamId, setTeamId] = useState<number | string>('');
    const [deadline, setDeadline] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = { name, description, teamId: Number(teamId), deadline };
        onSubmit(data);
        onClose();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Create New Project</h2>
                <form onSubmit={handleSubmit}>
                    <label>Project Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <label>Team:</label>
                    <select
                        value={teamId}
                        onChange={(e) => setTeamId(e.target.value)}
                        required
                    >
                        <option value="">Select a team</option>
                        {teams.map((team) => (
                            <option key={team.id} value={team.id}>
                                {team.name}
                            </option>
                        ))}
                    </select>
                    <label>Deadline:</label>
                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        required
                    />
                    <button type="submit">Submit</button>
                    <button type="button" className="cancel-btn" onClick={onClose}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProjectFormModal;
