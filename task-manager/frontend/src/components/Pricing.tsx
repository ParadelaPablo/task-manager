import "../index.css";
import "../estilos/pricing.css";

const Pricing = () => {
    return (
        <div className="pricing">
            <main className="main-content">
                <h2 className="section-title">Pricing Plans</h2>
                <p className="section-description">
                    Unlock seamless task management and elevate team collaboration with our tailored plans.
                </p>
                <p className="advantages">
                    With flexible pricing options, you get access to advanced tools, real-time updates, and a user-friendly
                    interface designed to boost productivity.
                </p>
                <div className="pricing-cards">
                    <div className="pricing-card">
                        <h3 className="card-title">Basic Plan</h3>
                        <p className="card-price">$9.99/month</p>
                        <ul className="card-features">
                            <li>Basic Task Management</li>
                            <li>5 Team Members</li>
                            <li>Email Support</li>
                        </ul>
                        <button className="btn-primary">Choose Plan</button>
                    </div>
                    <div className="pricing-card highlighted">
                        <h3 className="card-title">Pro Plan</h3>
                        <p className="card-price">$19.99/month</p>
                        <ul className="card-features">
                            <li>Advanced Task Tools</li>
                            <li>15 Team Members</li>
                            <li>Priority Support</li>
                        </ul>
                        <button className="btn-primary">Choose Plan</button>
                    </div>
                    <div className="pricing-card">
                        <h3 className="card-title">Premium Plan</h3>
                        <p className="card-price">$29.99/month</p>
                        <ul className="card-features">
                            <li>All Features Included</li>
                            <li>Unlimited Team Members</li>
                            <li>Dedicated Support</li>
                        </ul>
                        <button className="btn-primary">Choose Plan</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Pricing;
