import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState({ username: "ضيف" });
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			try {
				const payload = jwtDecode(token);
				setUser(payload);
			} catch {
				console.log("توكن غير صالح !");
				logout();
			}
		}
	}, []);

	const login = token => {
		logout();
		localStorage.setItem("token", token);
		try {
			const payload = jwtDecode(token);
			setUser(payload);
		} catch {
			console.log("توكن غير صالح !");
			logout();
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		setUser({ username: "ضيف" });
	setTimeout(_ => window.location.reload(), 1500)
	};

	return (
		<UserContext.Provider value={{ user, login, logout }}>
			{children}
		</UserContext.Provider>
	);
};

export const backWebSite = "http://localhost:5000"; // "https://rafiqi.onrender.com";
export const useUser = () => useContext(UserContext);
