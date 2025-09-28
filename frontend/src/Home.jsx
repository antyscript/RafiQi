import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SideBar from "./Components/SideBar.jsx";
import Header from "./Components/Header.jsx";
import CalculPage from "./Components/CalculPage.jsx";
import CalculateIcon from "@mui/icons-material/Calculate";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import * as React from "react";

export function Home({ children }) {
	const [open, setOpen] = useState(false);
	const location = useLocation();
	return (
		<>
			<Header setOpen={setOpen}>
				{React.Children.map(children, child =>
					React.cloneElement(child, {
						...child.props,
						open,
						setOpen
					})
				)}
	

				<SideBar open={open} setOpen={setOpen} />
			</Header>
		</>
	);
}
export function Cont({ open, setOpen }) {
	return (
		<>
			<div className="links flex" style={{ gap: "5px" }}>
				<Link to="/posts">
					<div
						className={`flex ${
							location.pathname === "/posts" ? "active" : ""
						}`}
					>
						<LibraryBooksIcon style={{ color: "#000" }} />
						<p style={{ color: "#000" }}>Posts</p>
					</div>
				</Link>
				<Link to="/">
					<div
						className={`flex ${
							location.pathname === "/" ? "active" : ""
						}${
							location.pathname.startsWith("/note")
								? "maybeActive"
								: ""
						}`}
					>
						<CalculateIcon style={{ color: "#000" }} />
						<p style={{ color: "#000" }}>calculate</p>
					</div>
				</Link>
			</div>
			<hr />
		</>
	);
}
