import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Form() {
    const Navigate = useNavigate();
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [type, setType] = useState("");
    const [witnesses, setWitnesses] = useState("");
    const [additional, setAdditional] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Get current date and time
        //let now = new Date();
        //let date = now.toISOString().split('T')[0];  // Get date in "YYYY-MM-DD" format
        //let time = now.toTimeString().split(' ')[0];  // Get time in "HH:MM:SS" format

        try {
            const response = await axios.post("/form", {
                firstname: firstname,
                lastname: lastname,
                email: email,
                phone: phone,
                address: address,
                city: city,
                state: state,
                zip: zip,
                type: type,
                //date: date,  // Use current date
                //time: time,  // Use current time
                witnesses: witnesses,
                additional: additional,
            });

            if (response.data.message === 'Notary form submitted successfully') {
                // Handle successful submission
                // For example, navigate to a different page or show a success message
                Navigate('/dashboard');
            }
        } catch (error) {
            // Handle error
            setError(error.response.data.message || "Failed to submit the form. Please check your inputs.");
        }
    };


    return (
    <section id="main" className="container medium">
          <header>
            <h2>E-Notary</h2>
            <p>Fill this form for E-Notary Service!</p>
          </header>
            <div className="box">
                <form onSubmit={handleSubmit}>

                <div className="row gtr-50 gtr-uniform">
                    <div className="col-12">
                    <label htmlFor="firstname">First Name:</label>
                    <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    value={firstname}
                    placeholder="First Name"
                    onChange={(event) => setFirstName(event.target.value)}
                />
            </div>

    <div className="col-12">
        <label htmlFor="lastname">Last Name:</label>
        <input
            type="text"
            name="lastname"
            id="lastname"
            value={lastname}
            placeholder="Last Name"
            onChange={(event) => setLastName(event.target.value)}
        />
    </div>

    <div className="col-12">
        <label htmlFor="email">Email:</label>
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
        <label htmlFor="phone">Phone:</label>
        <input
            type="text"
            name="phone"
            id="phone"
            value={phone}
            placeholder="Phone"
            onChange={(event) => setPhone(event.target.value)}
        />
    </div>

    <div className="col-12">
        <label htmlFor="address">Address:</label>
        <input
            type="text"
            name="address"
            id="address"
            value={address}
            placeholder="Address"
            onChange={(event) => setAddress(event.target.value)}
        />
    </div>

    <div className="col-12">
        <label htmlFor="city">City:</label>
        <input
            type="text"
            name="city"
            id="city"
            value={city}
            placeholder="City"
            onChange={(event) => setCity(event.target.value)}
        />
    </div>

    <div className="col-12">
        <label htmlFor="state">State:</label>
        <input
            type="text"
            name="state"
            id="state"
            value={state}
            placeholder="State"
            onChange={(event) => setState(event.target.value)}
        />
    </div>

    <div className="col-12">
        <label htmlFor="zip">Zip:</label>
        <input
            type="text"
            name="zip"
            id="zip"
            value={zip}
            placeholder="Zip"
            onChange={(event) => setZip(event.target.value)}
        />
    </div>

    <div className="col-12">
        <label htmlFor="type">Type:</label>
        <input
            type="text"
            name="type"
            id="type"
            value={type}
            placeholder="Type"
            onChange={(event) => setType(event.target.value)}
        />
    </div>

    <div className="col-12">
        <label htmlFor="witnesses">Witnesses:</label>
        <input
            type="text"
            name="witnesses"
            id="witnesses"
            value={witnesses}
            placeholder="# of Witnesses"
            onChange={(event) => setWitnesses(event.target.value)}
        />
    </div>

    <div className="col-12">
        <label htmlFor="additional">Additional:</label>
        <input
            type="text"
            name="additional"
            id="additional"
            value={additional}
            placeholder="Additional"
            onChange={(event) => setAdditional(event.target.value)}
        />
    </div>

    <div className="col-12">
        <ul className="actions special">
            <li>
                <input type="submit" value="Submit Form" />
            </li>
        </ul>
    </div>
</div>

</form>
                    <br />
    
        
              <Link to="/Upload">Upload Image</Link>
              <Link to="/File">View Image</Link>
              <Link to="/Schedule">Make a Schedule</Link>
              <Link to="/dashboard">Dashboard</Link>
            </div>
          </section>
        );
      }
    
    
    export default Form;
    