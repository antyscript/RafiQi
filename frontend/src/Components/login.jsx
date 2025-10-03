import * as React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useUser, backWebSite } from "../context/Contexts.jsx";
import { Visibility, VisibilityOff, AccountCircle } from "@mui/icons-material";
import {
	IconButton,
	OutlinedInput,
	InputLabel,
	InputAdornment,
	FormControl,
	FormHelperText,
	Box,
	TextField,
	MenuItem,
	Alert,
	Button
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

export default function Login() {
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword(show => !show);
	function Stop(e) {
		e.preventDefault();
	}
	// set state for every input (for more speed)
	const [name, setName] = useState("");
	const [pass, setPass] = useState("");
	//nav & user
	const { login } = useUser();
	const navigate = useNavigate();
	// alert state
	const [showAlert, setAlert] = useState(false);
	// errors
	const [errors, setError] = useState({
		usernameError: "",
		passwordError: ""
	});
	function check(data, errors, setError) {
		let err = { ...errors };
		let testing = /^[a-z0-9_]+$/;
		if (!data.username) {
			err.usernameError = "ادخل اسم مستخدم";
		} else if (data.username.length < 3 || data.username.length > 20) {
			err.usernameError = "ادخل طول صالح";
		} else if (!testing.test(data.username)) {
			err.usernameError = "أدخل رموز واحرف صالحة وازل المسافات";
		} else {
			err.usernameError = "";
		}
		if (!data.password) {
			err.passwordError = "ادخل كلمة مرور";
		} else if (data.password.length < 6) {
			err.passwordError = "ادخل طول صالح لكلمة المرور";
		} else {
			err.passwordError = "";
		}
		setError(err);
		return err.usernameError || err.passwordError ? true : false;
	}

	//button disabled
	const [loading, setLoading] = React.useState(false);

	// send data

	function sendMyData(e) {
		Stop(e);
		let data = {
			username: name,
			password: pass
		};
		let hasError = check(data, errors, setError);
		if (!hasError) {
			console.log("يتم ارسال طلب التسجيل");
			setLoading(true);
			fetch(`${backWebSite}/login`, {
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify(data)
			})
				.then(res => res.json())
				.then(resData => {
					console.log(resData.msg);
					setLoading(false);
					if (resData.yourError?.username) {
						setError(prev => ({
							...prev,
							usernameError: resData.yourError.username
						}));
					} else if (resData.yourError?.password) {
						setError(prev => ({
							...prev,
							passwordError: resData.yourError.password
						}));
					} else {
						login(resData.token);
						setAlert(true);
						setTimeout(_ => {
							navigate("/");
							setAlert(false);
						}, 1450);
					}
					console.log(resData.msg);
				})
				.catch(err => {
					console.log(err);
					setLoading(false);
					setError(prev => ({
						...prev,
						usernameError: "حدث خطأ، تحقق من الاتصال"
					}));
				});
		}
	}

	return (
		<>
			{showAlert ? (
				<Alert
					style={{
						position: "fixed",
						top: "50px",
						border: "1px solid #000"
					}}
					icon={<CheckIcon fontSize="inherit" />}
					severity="success"
				>
					تم التسجيل بنجاح
				</Alert>
			) : (
				""
			)}
			<div
				style={{
					marginTop: "60px",
					textAlign: "right",
					fontSize: "0.7rem"
				}}
			>
				قم بالتسجيل وإذا لم تكن تملك حسابا قم بـ
				<Link to="/signup">
					<span style={{ color: "#f97316" }}> إنشاء حساب</span>
				</Link>
				،يمكنك دائما، في حالة كانت لديك اسئلة، تفقد
				<Link to="/info">
					<span style={{ color: "#f97316" }}> سياستنا</span>
				</Link>
			</div>
			<div className="flex Login">
				<h3 style={{ direction: "rtl", fontWeight: 600 }}>
					تسجيل الدخول
				</h3>
				{/*username textfiled */}
				<Box sx={{ "& > :not(style)": { m: 1, width: "200px" } }}>
					<TextField
						size="small"
						id="input-with-icon-textfield"
						label="إسم المستخدم"
						helperText={
							<span
								style={{
									color: "rgb(247,64,64)",
									textAlign: "right",
									display: "block"
								}}
							>
								{errors.usernameError}
							</span>
						}
						error={errors.usernameError}
						slotProps={{
							input: {
								endAdornment: (
									<InputAdornment position="start">
										<AccountCircle />
									</InputAdornment>
								)
							}
						}}
						variant="outlined"
						value={name}
						onChange={e => {
							setName(e.target.value);
						}}
					/>
				</Box>
				{/* password textfiled */}
				<FormControl
					sx={{ m: 1, width: "200px" }}
					variant="outlined"
					size="small"
					error={errors.passwordError}
				>
					<InputLabel htmlFor="outlined-adornment-password">
						كلمة السر
					</InputLabel>
					<OutlinedInput
						value={pass}
						onChange={e => {
							setPass(e.target.value);
						}}
						id="outlined-adornment-password"
						type={showPassword ? "text" : "password"}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label={
										showPassword
											? "hide the password"
											: "display the password"
									}
									onClick={handleClickShowPassword}
									onMouseDown={e => Stop(e)}
									onMouseUp={e => Stop(e)}
									edge="start"
								>
									{showPassword ? (
										<VisibilityOff />
									) : (
										<Visibility />
									)}
								</IconButton>
							</InputAdornment>
						}
						label="Password"
					/>
					<FormHelperText
						style={{ color: "rgb(247,64,64)", textAlign: "right" }}
					>
						{errors.passwordError}
					</FormHelperText>
				</FormControl>

				{/* final */}
				<Box sx={{ "& > button": { m: 1 } }}>
					<Button
						sx={{ backgroundColor: "rgb(251,144,68)" }}
						className="submit"
						/*	color="primary"*/
						onClick={e => sendMyData(e)}
						loading={loading}
						loadingPosition="start"
						/*	startIcon={<SaveIcon />}*/
						variant="contained"
						disabled={loading}
					>
						تسجيل
					</Button>
				</Box>
				<div>
					<span>ليس لديك حساب ؟</span> |
					<Link to="/signup">
						<span className="go">إنشاء حساب</span>
					</Link>
				</div>
			</div>
			<p
				style={{
					fontSize: "0.7rem"
				}}
			>
				اذا كنت اول من يدخل للموقع او يرسل طلبا للسيرفر هذا اليوم او
				خلال 15 دقيقة السابقة، فقد يتعطل السيرفر على الرد حوالي 50 ثانية
				على الاقل
			</p>
		</>
	);
}
