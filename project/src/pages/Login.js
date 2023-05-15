import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

{/*class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error: "",
        };
    }

    

    handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("/login", {
                email: this.state.email,
                password: this.state.password,
            });

            // Upon successful login, redirect the user to the Home page.
            this.props.history.push("/home");
        } catch (error) {
            this.setState({ error: error.response.data.description });
        }
    };

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div id="page-wrapper">
                <section id="main" className="container medium">
                    <header>
                        <h2>Log In</h2>
                        <p>Singh Notaries</p>
                    </header>
                    <div className="box">
                        <form onSubmit={this.handleSubmit}>
                            <div className="row gtr-50 gtr-uniform">
                                <div className="col-12">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={this.state.email}
                                        placeholder="Email"
                                        onChange={(event) =>
                                            this.setState({
                                                email: event.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="col-12">
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={this.state.password}
                                        placeholder="Password"
                                        onChange={(event) =>
                                            this.setState({
                                                password: event.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="col-12">
                                    <ul className="actions special">
                                        <li>
                                            <input type="submit" value="Login" />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                        <div style={{ textAlign: "center" }}>
                            <Link to="/signup">Don't have an account?</Link>
                        </div>
                        {this.state.error && (
                            <p className="error-message">{this.state.error}</p>
                        )}
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
}*/}
const Login = ({onLoginSuccess}) => {
    const Navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await axios.post("/login", {
                email,
                password,
            });
    
            // Upon successful login, redirect the user to the Dashboard page.
            Navigate('/dashboard');
            
        } catch (error) {
            setError(error.response.data.description);
        }
    };
    
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    return (
        <div id="page-wrapper">
            <section id="main" className="container medium">
                <header>
                    <h2>Log In</h2>
                    <p>Singh Notaries</p>
                </header>
                <div className="box">
                    <form onSubmit={handleSubmit}>
                        <div className="row gtr-50 gtr-uniform">
                            <div className="col-12">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    placeholder="Email"
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                            </div>
                            <div className="col-12">
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={password}
                                    placeholder="Password"
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                            </div>
                            <div className="col-12">
                                <ul className="actions special">
                                    <li>
                                        <input type="submit" value="Login" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </form>
                    <div style={{ textAlign: "center" }}>
                        <Link to="/signup">Don't have an account?</Link>
                    </div>
                    {error && <p className="error-message">{error}</p>}
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
};

export default Login;
