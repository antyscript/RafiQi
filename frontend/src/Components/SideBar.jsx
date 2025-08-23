import CloseIcon from "@mui/icons-material/Close";

function SideBar({ setOpen, open }) {
	return (
		<div className={`SideBar ${open ? "" : "ShowSide"}`}>
			<CloseIcon
				onClick={_ => {
					setOpen(false);
				}}
				style={{
					position: "relative",
					top: "7px",
					left: "210px",
					fontSize: "2rem"
				}}
			/>
		</div>
	);
}

export default SideBar;
