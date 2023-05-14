import React from "react";
import { Link } from "react-router-dom";

class About extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <div id="page-wrapper">
                <section id="main" className="container">
                    <header>
                        <h2>About Us</h2>
                        <p>Learn about Singh Notaries</p>
                    </header>
                    <div className="box">
                        <span className="image featured"><img src="images/pic01.jpg" alt="" /></span>
                        <h3>This is a subheading</h3>
                        <p>Cep risus aliquam gravida cep ut lacus amet. Adipiscing faucibus nunc placerat. Tempus adipiscing turpis non blandit accumsan eget lacinia nunc integer interdum amet aliquam ut orci non col ut ut praesent. Semper amet interdum mi. Phasellus enim laoreet ac ac commodo faucibus faucibus. Curae ante vestibulum ante. Blandit. Ante accumsan nisi eu placerat gravida placerat adipiscing in risus fusce vitae ac mi accumsan nunc in accumsan tempor blandit aliquet aliquet lobortis. Ultricies blandit lobortis praesent turpis. Adipiscing accumsan adipiscing adipiscing ac lacinia cep. Orci blandit a iaculis adipiscing ac. Vivamus ornare laoreet odio vis praesent nunc lorem mi. Erat. Tempus sem faucibus ac id. Vis in blandit. Nascetur ultricies blandit ac. Arcu aliquam. Accumsan mi eget adipiscing nulla. Non vestibulum ac interdum condimentum semper commodo massa arcu.</p>
                        <div className="row">
                            <div className="row-6 row-12-mobilep">
                                <h3>And now a subheading</h3>
                                <p>Adipiscing faucibus nunc placerat. Tempus adipiscing turpis non blandit accumsan eget lacinia nunc integer interdum amet aliquam ut orci non col ut ut praesent. Semper amet interdum mi. Phasellus enim laoreet ac ac commodo faucibus faucibus. Curae lorem ipsum adipiscing ac. Vivamus ornare laoreet odio vis praesent.</p>
                            </div>
                            <div className="row-6 row-12-mobilep">
                                <h3>And another subheading</h3>
                                <p>Adipiscing faucibus nunc placerat. Tempus adipiscing turpis non blandit accumsan eget lacinia nunc integer interdum amet aliquam ut orci non col ut ut praesent. Semper amet interdum mi. Phasellus enim laoreet ac ac commodo faucibus faucibus. Curae lorem ipsum adipiscing ac. Vivamus ornare laoreet odio vis praesent.</p>
                            </div>
                        </div>
                    </div>
                    <footer id="footer">
                        <Link to="/home">Home </Link>  &nbsp; &nbsp;
                        <Link to="/FAQ">FAQ</Link> &nbsp; &nbsp;
                        <Link to="/about">About</Link> &nbsp; &nbsp;
                        <Link to="/contact">Contact</Link> &nbsp; &nbsp;
                        <Link to="/login">Log In</Link>
                        <ul className="copyright">
                            <li>&copy; Singh Notaries. All rights reserved.</li>
                        </ul>
                    </footer>
                </section>
            </div>
        )
    }
}

export default About;