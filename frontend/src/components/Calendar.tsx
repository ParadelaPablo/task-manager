import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axiosInstance from "../services/axiosInstance";
import "../estilos/calendar.css";

interface Project {
    id: number;
    name: string;
    deadline: string;
}

const CalendarComponent: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [date, setDate] = useState<Date | [Date, Date] | null>(new Date());
    const [markedDates, setMarkedDates] = useState<Date[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axiosInstance.get("/projects");
                setProjects(response.data || []);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);

    useEffect(() => {
        const dates = projects.map((project) => new Date(project.deadline));
        setMarkedDates(dates);
    }, [projects]);

    const handleChange = (value: Date | Date[] | null) => {
        if (Array.isArray(value)) {
            setDate(value.length === 2 ? [value[0], value[1]] : value[0]);
        } else {
            setDate(value);
        }
    };

    const tileClassName = ({ date, view }: { date: Date; view: string }) => {
        if (view === "month") {
            const isMarked = markedDates.some((markedDate) => {
                return (
                    markedDate.getDate() === date.getDate() &&
                    markedDate.getMonth() === date.getMonth() &&
                    markedDate.getFullYear() === date.getFullYear()
                );
            });

            return isMarked ? "marked-date" : "";
        }
    };

    const tileContent = ({ date, view }: { date: Date; view: string }) => {
        if (view === "month") {
            const projectNames = projects
                .filter((project) => new Date(project.deadline).toDateString() === date.toDateString())
                .map((project) => project.name);

            return projectNames.length > 0 ? (
                <div className="project-names">
                    {projectNames.map((name, index) => (
                        <div key={index} className="project-name">
                            <strong>Project:</strong> {name}
                        </div>
                    ))}
                </div>
            ) : null;
        }
    };

    return (
        <div className="calendar-container">
            <h2>Deadlines Calendar</h2>
            <Calendar
                value={date}
                tileClassName={tileClassName}
                tileContent={tileContent}
                className="calendar-container2"
            />
        </div>
    );
};

export default CalendarComponent;
