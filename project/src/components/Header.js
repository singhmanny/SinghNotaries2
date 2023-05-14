import React from "react";


class Header extends React.Component {
    render() {
        return (
            <div>
                <header id="header" className="alt">
                <nav id="nav">
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="FAQ.html">FAQs</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="contact.html">Contact</a></li>
                        <li><a href="#" className="button">Sign Up</a></li>
                    </ul>
                </nav>
            </header>
            </div>
        )
    }
}
export default Header;