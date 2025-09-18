import { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState({ nameuser: "ضيف" });

	useEffect(() => {
		const simpleInfo = localStorage.getItem("simpleInfo");
		if (simpleInfo) {
			// حول string إلى object
			setUser(JSON.parse(simpleInfo));
		}
	}, []);

	const login = userData => {
		localStorage.setItem("simpleInfo", JSON.stringify(userData));
		setUser(userData);
	};

	const logout = () => {
		localStorage.removeItem("simpleInfo");
		setUser({ nameuser: "ضيف" });
	};

	return (
		<UserContext.Provider value={{ user, login, logout }}>
			{children}
		</UserContext.Provider>
	);
};

export const backWebSite = "https://rafiqi.onrender.com";
export const useUser = () => useContext(UserContext);
