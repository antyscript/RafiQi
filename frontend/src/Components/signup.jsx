import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser , backWebSite} from "../context/Contexts.jsx";
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

// import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

export default function Signup() {
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword(show => !show);
	// set state for every input (for more speed)
	const [name, setName] = useState("");
	const [pass, setPass] = useState("");
	const [gen, setGender] = useState("male");
	const [niv, setNiveau] = useState("TC");
	// useuser
	const { login } = useUser();
	//nav
	const navigate = useNavigate();
	// alert state
	const [showAlert, setAlert] = useState(false);
	// errors
	const [errors, setError] = useState({
		usernameError: "",
		passwordError: ""
	});
	//button disabled
	const [loading, setLoading] = React.useState(false);

	// send data

	function sendMyData(e) {
		console.log("clikced");
		let data = {
			username: name,
			password: pass,
			gender: gen,
			niveau: niv
		};
		console.log(`generate data, that is : ${JSON.stringify(data)}`);
		e.preventDefault();
		let hasError = check(data, errors, setError);
		if (!hasError) {
			console.log("doonee");
			setLoading(true);
			fetch(`${backWebSite}/signup`, {
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify(data)
			})
				.then(res => res.json())
				.then(resData => {
					console.log("****************************");
					console.log("resdata : " + JSON.stringify(resData));
					setLoading(false);
					if (resData.yourError?.username) {
						setError(prev => ({
							...prev,
							usernameError: resData.yourError.username
						}));
					} else {
						setAlert(true);
						login({ nameuser: data.username });
						setTimeout(_ => {
							navigate("/");
							setAlert(false);
						}, 3000);
					}
					console.log(resData.msg);
				})
				.catch(err => {
					setLoading(false);
					console.log("this is an error : " + err);
					setError(prev => ({
						...prev,
						usernameError: "حدث خطأ، تحقق من الاتصال"
					}));
				});
		} else {
			return;
		}
	}
	// options

	const genders = [
		{
			value: "male",
			label: "انا ذكر"
		},
		{
			value: "female",
			label: "أنا أنثى"
		},
		{
			value: "neutre",
			label: "غير معرف"
		}
	];
	const level = [
		{
			value: "APIC",
			label: "إعدادي"
		},
		{
			value: "TC",
			label: "جذع مشترك"
		},
		{
			value: "ABAC",
			label: "اولى باكالوريا"
		},
		{
			value: "BBAC",
			label: "الثانية باكالوريا"
		},
		{
			value: "OTHER",
			label: "اخر"
		}
	];

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
					تم إنشاء الحساب بنجاح
				</Alert>
			) : (
				""
			)}
			<div
				style={{
					marginTop: "36px",
					textAlign: "right",
					fontSize: "0.7rem"
				}}
			>
				قم بإنشاء حساب جديد، اذا كنت تمتلك حسابا بالفعل قم بـ
				<Link to="/login">
					<span style={{ color: "#f97316" }}> تسجيل</span>
				</Link>
				، بمتابعتك وإنشائك للحساب فإنك توافق على
				<Link to="/info">
					<span style={{ color: "#f97316" }}> سياستنا</span>
				</Link>
			</div>
			<div
				style={{
					direction: "rtl",
					marginTop: "5px",
					textAlign: "right",
					fontSize: "0.7rem"
				}}
			>
				حاول إنشاء اسم مستخدم فريد، يسمح فقط بالأحرف A-Z والأرقام 0-9
				والخط السفلي _ (underscore) لا فارغات ولا رموز غريبة ويجب ان
				يكون الاسم بين 3 الى 20 حرف وكلمة السر اطول من 6 رموز
			</div>
			<div className="flex SignUp">
				<h3 style={{ direction: "rtl", fontWeight: 600 }}>
					إنشاء حساب جديد
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
						value={name}
						onChange={e => setName(e.target.value)}
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
						onChange={e => setPass(e.target.value)}
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
									onMouseDown={e => e.preventDefault()}
									onMouseUp={e => e.preventDefault()}
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
				{/* gender */}
				<Box
					component="form"
					sx={{
						"& .MuiTextField-root": { m: 1, width: "200px" }
					}}
					noValidate
					autoComplete="off"
				>
					<TextField
						id="outlined-select-currency"
						select
						label="جنسك"
						defaultValue="female"
						size="small"
						value={gen}
						onChange={e => {
							setGender(e.target.value);
						}}
					>
						{genders.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
				</Box>
				{/* level schol*/}
				<Box
					component="form"
					sx={{
						"& .MuiTextField-root": { m: 1, width: "200px" }
					}}
					noValidate
					autoComplete="off"
				>
					<TextField
						id="outlined-select-currency"
						select
						label="مستواك الدراسي"
						defaultValue="TC"
						size="small"
						value={niv}
						onChange={e => {
							setNiveau(e.target.value);
						}}
					>
						{level.map(option => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>
				</Box>
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
						إنشاء حساب
					</Button>
				</Box>
				<div>
					<span>هل لديك حساب ؟</span> |
					<Link to="/login">
						<span className="go">سجل</span>
					</Link>
				</div>
			</div>
		</>
	);
}
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
	} else if (!testing.test(data.password) && data.password.length < 12) {
		err.passwordError = "كلمة مرورك ضعيفة !";
	} else {
		err.passwordError = "";
	}
	setError(err);
	return err.usernameError || err.passwordError ? true : false;
}
