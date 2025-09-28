import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { useUser } from "../context/Contexts.jsx";

function SideBar({ setOpen, open }) {
	const { user, logout } = useUser();
	let location = useLocation();
	useEffect(() => {
		setOpen(false);
	}, [location]);
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
			<div className="profile">
				<Avatar
					style={{
						backgroundColor: `#${Math.floor(
							Math.random() * 10000
						)}`,
						boxShadow: "0 0 5px rgb(0,0,0,0.2"
					}}
				>
					{user.username[0]}
				</Avatar>
				<span>{user.username}</span>
			</div>
			<ul className="ul">
				<li>
					<Link to="/">
						<button>الرئيسية</button>
					</Link>
				</li>
				<li>
					<Link to="/signup">
						<button>تسجيل الدخول</button>
					</Link>
				</li>
				<li>
					<Link to="/info">
						<button>حول</button>
					</Link>
				</li>
				<li>
					<button
						onClick={_ => {
							confirm("متأكد ؟") ? logout() : null;
							setTimeout(_ => setOpen(false), 500);
						}}
					>
						تسجيل الخروج
					</button>
				</li>
			</ul>
		</div>
	);
}

export default SideBar;

/*import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <List sx={{ pt: 0 }}>
        {emails.map((email) => (
          <ListItem disablePadding key={email}>
            <ListItemButton onClick={() => handleListItemClick(email)}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick('addAccount')}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};



 function Dialog() {
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Typography variant="subtitle1" component="div">
        Selected: {selectedValue}
      </Typography>
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        Open simple dialog
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}*/
