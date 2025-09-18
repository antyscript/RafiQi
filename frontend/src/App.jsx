import { Routes, Route, Link, useLocation, Outlet } from "react-router-dom";
import { useUser } from "./context/Contexts";

import { useState, useContext } from "react";
import "./App.css";
import { Home, Cont } from "./Home.jsx";
import CalculPage from "./Components/CalculPage.jsx";
import PostPage from "./Components/PostPage.jsx";
import Header from "./Components/Header.jsx";
import Information from "./Components/info.jsx";
import Profiles from "./Components/Profiles.jsx";
import {
	TCSF,
	TCAL,
	ABAC_LSH,
	ABAC_SCEXP,
	BBAC_SH,
	BBAC_PC,
	IsSI
} from "./Components/Level.jsx";
import Signup from "./Components/signup.jsx";
import Login from "./Components/login.jsx";

function App() {
	return (
		<>
			<Routes>
				<Route
					path="/"
					element={
						<>
							<Home>
								<Cont />
							</Home>
							<main>
								<CalculPage />
							</main>
						</>
					}
				/>
				<Route
					path="/note"
					element={
						<>
							<Home>
								<Cont />
							</Home>
							<main>
								<Outlet />
							</main>
						</>
					}
				>
					<Route path="tcsf" element={<TCSF />} />
					<Route path="tcal" element={<TCAL />} />
					<Route path="1bac-scexp" element={<ABAC_SCEXP />} />
					<Route path="1bac-lsh" element={<ABAC_LSH />} />
					<Route path="2bac-pc" element={<BBAC_PC />} />
					<Route path="2bac-sh" element={<BBAC_SH />} />
				</Route>
				<Route
					path="/posts"
					element={
						<>
							<Home>
								<Cont />
							</Home>
							<main>
								<IsSI>
									<PostPage />
								</IsSI>
							</main>
						</>
					}
				/>
				<Route
					path="/signup"
					element={
						<>
							<Home />
							<main>
								<Signup />
							</main>
						</>
					}
				/>
				<Route
					path="/login"
					element={
						<>
							<Home />
							<main>
								<Login />
							</main>
						</>
					}
				/>
				<Route
					path="/info"
					element={
						<>
							<Home />
							<main>
								<Information />
							</main>
						</>
					}
				/>
				<Route
					path="/profile/:user"
					element={
						<>
							<Home />
							<main>
								<Profiles />
							</main>
						</>
					}
				/>
			</Routes>
		</>
	);
}

export default App;
