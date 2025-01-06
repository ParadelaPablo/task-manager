import React, { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosInstance';
import "../index.css";

interface CreateTeamModalProps {
    onClose: () => void;
    onSubmit: (data: { name: string; memberIds: number[] }) => void;
}

const CreateTeamModal: React.FC<CreateTeamModalProps> = ({ onClose, onSubmit }) => {
    const [name, setName] = useState('');
    const [memberIds, setMemberIds] = useState<number[]>([]);
    const [employees, setEmployees] = useState<{ id: number; name: string }[]>([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axiosInstance.get('/employees');
                setEmployees(response.data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };

        fetchEmployees();
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = { name, memberIds };
        onSubmit(data);
        onClose();
    };

    const handleCheckboxChange = (employeeId: number) => {
        setMemberIds((prevIds) =>
            prevIds.includes(employeeId)
                ? prevIds.filter((id) => id !== employeeId)
                : [...prevIds, employeeId]
        );
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Create New Team</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Team Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Select Members:
                        <div className="employee-select-container">
                            {employees.map((employee) => (
                                <div key={employee.id} className="employee-checkbox">
                                    <input
                                        type="checkbox"
                                        value={employee.id}
                                        checked={memberIds.includes(employee.id)}
                                        onChange={() => handleCheckboxChange(employee.id)}
                                    />
                                    <span>{employee.name}</span>
                                </div>
                            ))}
                        </div>
                    </label>
                    <button type="submit">Submit</button>
                    <button type="button" onClick={onClose} className="cancel-btn">
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateTeamModal;
