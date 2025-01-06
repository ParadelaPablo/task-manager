import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

const NotFound: React.FC = () => {
const navigate = useNavigate();

const handleGoHome = () => {
navigate("/"); 
};

return (
<div className="not-found-container">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <button className="btn btn-primary" onClick={handleGoHome}>
    Go to Home
    </button>
</div>
);
};

export default NotFound;
