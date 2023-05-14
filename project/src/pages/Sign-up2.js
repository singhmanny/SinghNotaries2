{
    
}
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";


class Signup extends React.Component {
    componentDidMount() {
		window.scrollTo(0, 0);
	}
    
    constructor(props) {
        super(props);

        this.state = {
            full_name: "",
            email: "",
            _password: "",
            error: "",
        };
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post("/signup", {
                full_name: this.state.full_name,
                email: this.state.email,
                password: this.state.password,
            });

            // Upon successful signup, redirect the user to the Login page.
            navigate('/login')
            this.props.history.push("/login");
        } catch (error) {
            this.setState({ error: error.response.data.description });
        }
    };

    render() {
        return (
            <div id="page-wrapper">
                <section id="main" className="container medium">
                    <header>
                        <h2>Sign Up</h2>
                        <p>Singh Notaries</p>
                    </header>
                    <div className="box">
                        <form onSubmit={this.handleSubmit}>
                            <div className="row gtr-50 gtr-uniform">
                                <div className="col-12">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={this.state.name}
                                        placeholder="Full Name"
                                        onChange={(event) =>
                                            this.setState({
                                                name: event.target.value,
                                            })
                                        }
                                    />
                                </div>
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
                                {/* This is a multi-line comment in JSX
<div className="col-12">
    <input
        type="password"
        name="confirmPassword"
        id="confirmPassword"
        value={this.state.confirmPassword}
        placeholder="Confirm Password"
        onChange={(event) =>
            this.setState({
                confirmPassword: event.target.value,
            })
        }
    />
</div>
*/}
                                <div className="col-12">
                                    <ul className="actions special">
                                        <li>
                                            <input type="submit" value="Sign Up" />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                        {this.state.error && (
                            <p className="error-message">{this.state.error}</p>
                        )}
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
}
export default Signup;
