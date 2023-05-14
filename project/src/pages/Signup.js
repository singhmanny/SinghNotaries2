import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("signup", {
                full_name: fullName,
                email: email,
                password: password,
            });
            navigate('/login')
        } catch (error) {
            setError("This user email address already exists. Please try logging in.");
        }
    };

    return (
        <div id="page-wrapper">
            <section id="main" className="container medium">
                <header>
                    <h2>Sign Up</h2>
                    <p>Singh Notaries</p>
                </header>
                <div className="box">
                    <form onSubmit={handleSubmit}>
                        <div className="row gtr-50 gtr-uniform">
                            {error && <p className="error-message">{error}</p>}
                            <div className="col-12">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={fullName}
                                    placeholder="Full Name"
                                    onChange={(event) =>
                                        setFullName(event.target.value)
                                    }
                                />
                            </div>
                            <div className="col-12">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    placeholder="Email"
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                />
                            </div>
                            <div className="col-12">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={password}
                                    placeholder="Password"
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                />
                            </div>
                            <div className="col-12">
                                <ul className="actions special">
                                    <li>
                                        <input type="submit" value="Sign Up" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </form>
                    <div style={{ textAlign: "center" }}>
                        <Link to="/login">Already have an account?</Link>
                    </div>
                </div>
            </section>
            <footer id="footer">
                <Link to="/home">Home </Link> &nbsp; &nbsp;
                <Link to="/FAQ">FAQ</Link> &nbsp; &nbsp;
                <Link to="/about">About</Link> &nbsp; &nbsp;
                <Link to="/contact">Contact</Link> &nbsp; &nbsp;
                <Link to="/login">Log In</Link>
                <ul className="copyright">
                    <li>&copy; Singh Notaries. All rights reserved.</li>
                </ul>
            </footer>
        </div>
    );
}

export default Signup;
