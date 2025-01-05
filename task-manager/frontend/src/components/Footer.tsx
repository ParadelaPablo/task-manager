import '../estilos/footer.css';
import "../index.css";
import '@fortawesome/fontawesome-free/css/all.css';


const Footer = () => {
return (
<footer className="footer">
    <div className="footer-container">
    <div className="footer-section">
        <h2>Task Manager</h2>
        <p className='p-footer'>Streamlining collaboration and productivity.</p>
    </div>
    <div className="footer-sections-group">
        <div className="footer-section">
        <h3>Product</h3>
        <ul>
            <li>Task Tracking</li>
            <li>Team Collaboration</li>
            <li>Performance Insights</li>
        </ul>
        </div>
        <div className="footer-section">
        <h3>Resources</h3>
        <ul>
            <li>Help Center</li>
            <li>Tutorials</li>
            <li>API Documentation</li>
        </ul>
        </div>
        <div className="footer-section">
        <h3>Company</h3>
        <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Contact</li>
        </ul>
        </div>
    </div>
    </div>
    <p className="footer-text">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook footer-icon"></i>
        </a>
        &copy; 2024 Task Manager. All Rights Reserved.
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram footer-icon"></i>
        </a>
    </p>
</footer>
);
};

export default Footer;
