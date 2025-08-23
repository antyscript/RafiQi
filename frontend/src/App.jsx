import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Home from "./Home.jsx";
import CalculPage from "./Components/CalculPage.jsx";
import PostPage from "./Components/PostPage.jsx";
import {
	TCSF,
	TCAL,
	ABAC_LSH,
	ABAC_SCEXP,
	BBAC_SH,
	BBAC_SP
} from "./Components/Level.jsx";

function App() {
	return (
		<>
			<Home />
			<main>
				<Routes>
					<Route path="/" element={<CalculPage />} />
					<Route path="/tcsf" element={<TCSF />} />
					<Route path="/tcal" element={<TCAL />} />
					<Route path="/1bac-scexp" element={<ABAC_SCEXP />} />
					<Route path="/1bac-lsh" element={<ABAC_LSH />} />
					<Route path="/2bac-pc" element={<BBAC_SP />} />
					<Route path="/2bac-sh" element={<BBAC_SH />} />
					<Route path="/posts" element={<PostPage />} />
				</Routes>
			</main>
		</>
	);
}

export default App;
