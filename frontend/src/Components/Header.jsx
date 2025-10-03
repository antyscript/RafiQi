import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";

function Header({ setOpen, children }) {
	const theme = useTheme();
	const HeaderStyle = {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.text.primary
	};

	return (
		<>
			<div className="Rhead flex" style={HeaderStyle}>
				<div>
					<img src="/webicon.png" />
					<h1>
						Rafiqi <span>v2.0.2</span>
					</h1>
				</div>
				<MenuIcon
					onClick={_ => {
						setOpen(true);
					}}
				/>
			</div>
			{children}
		</>
	);
}
export default Header;
