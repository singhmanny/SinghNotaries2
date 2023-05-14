import React from "react";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginButton from "./pages/LoginButton";
import FAQ from "./pages/FAQ";
import Signup from "./pages/Signup";
import Payment from "./pages/Payment"
import Login from "./pages/Login"

function App() {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/home' element={<Home />} />
					<Route path='/FAQ' element={<FAQ />} />
					<Route path='/about' element={<About />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='/signup' element={<Signup />} />
					<Route path='/login' element={<Login />} />
					<Route path='/pay' element={<Payment />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;

