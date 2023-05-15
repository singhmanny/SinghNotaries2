import React from "react";
import { Link } from "react-router-dom";

class FAQ extends React.Component {
    componentDidMount() {
      window.scrollTo(0, 0);
    }
    render() {
        return (
            <div id="page-wrapper">
            <section id="main" className="container">
                <header>
                    <h2> Welcome to your Dashboard! </h2>
                    <p>Please select a link below to get started</p>
                </header>
                <div className="box">
                    <h3>Please Select from Below</h3>
                    <Link to="/form">Sign up for E-Notary Service! </Link> <br></br>
                    <Link to="/schedule">Book an Appointment</Link> <br></br>
                    <Link to="/upload">Upload an image of your document</Link> <br></br>
                </div>
                <header>
                    <h2>FAQs</h2>
                    <p>Frequently Asked Questions.</p>
                </header>
                <div className="box">
                    <span className="image featured"><img src="images/pic01.jpg" alt="" /></span>
                    <h4><li>What is Notary?</li></h4>
                    <p>Notary is a person who performs legal formalities. To be specific, it is a person who acts a witness for signatures for public documents.</p>
                    <h4><li>What is e-Notary?</li></h4>
                    <p>E-Notary serves the same function as regular notary but in e-notary, the process of notary takes place in a digital format.</p>
                    <h4><li>What is Mobile Notary?</li></h4>
                    <p>Mobile Notary is where the customer can ask the notary to travel to the customer's destination and notarize documents. However, Mobile notary usually has additional fees added to the rate of the notary depending on the distance of the destination</p>
                    <h4><li>What kind of documents can be notarized?</li></h4>
                    Financial Documents like Mortgage closing documents, property deals, loan documents, financial statements.
                    Legal Documents like wills and trust deeds, advanced directives, custody and guardianship agreements, power of attorney.
                    <p>Business documents such as vendor and supplier contracts, commerical leases, property construction and loan agreements. Many more...</p>
                    <h4><li>How much are the charges?</li></h4>
                    <p>Charges can vary depending on mobile notary, e-notary, or regular notary and also depends on how many documents there are to be notarized.</p>
                    <h4><li>What is the response time?</li></h4>
                    <p>We try to give the best customer service to our customers. We try to get back to inquiries within 2 hours or so.</p>
                </div>
                <footer id="footer">
                    <Link to="/home">Home </Link>  &nbsp; &nbsp;
					<Link to="/FAQ">FAQ</Link> &nbsp; &nbsp;
					<Link to="/about">About</Link> &nbsp; &nbsp;
					<Link to="/contact">Contact</Link> &nbsp; &nbsp;
					<Link to="/Login">Log In</Link>
					<ul className="copyright">
						<li>&copy; Singh Notaries. All rights reserved.</li>
					</ul>
				</footer>
            </section>
            </div>
        )
    }
}

export default FAQ;