import React, { useState, useEffect } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { backWebSite } from "../context/Contexts";
/*import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import SaveIcon from "@mui/icons-material/Save";
import SendIcon from "@mui/icons-material/Send";*/

import {
	Avatar,
	Box,
	Button,
	Paper,
	TextField,
	Typography
} from "@mui/material";

import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

function PostPage() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		fetch(`${backWebSite}/posts`, {
			credentials: "include"
		})
			.then(res => {
				if (!res.ok) {
					throw new Error(`HTTP error: ${res.status}`);
				}
				const status = res.status;
				return res.json().then(data => ({ status, data }));
			})
			.then(({ status, data }) => {
				alert(
					"res status: " +
						status +
						" /// res : " +
						JSON.stringify(data)
				);
				if (Array.isArray(data)) {
					setPosts(data);
				} else {
					console.error("Unexpected response", data);
					setPosts([]);
				}
			})
			.catch(err => {
				console.error("Fetch failed", err);
				setPosts([]);
			});
	}, []);

	if (!Array.isArray(posts)) {
		return <p>خطأ: لم يتم تحميل المنشورات أو تحتاج تسجيل دخول</p>;
	}
	return (
		<>
			<CreatePost />
			{posts && posts.length > 0 ? (
				<>
					{posts.map(post => (
						<Post
							key={post.id}
							date={post.createdAt}
							name={post.author}
							content={post.content}
						/>
					))}
				</>
			) : (
				<div
					style={{
						marginTop: "100px",
						display: "flex",
						justifyContent: "center"
					}}
				>
					<Stack sx={{ color: "#f97316" }} direction="row">
						<CircularProgress />
					</Stack>
				</div>
			)}
		</>
	);
}

const Post = ({ avatar = "/default.jpg", name, date, content }) => {
	const [like, setLike] = useState(false);
	const styles = {
		post: {
			backgroundColor: "#fff",
			borderRadius: "12px",
			padding: "16px",
			margin: "12px 0",
			boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
			maxWidth: "500px"
		},
		postHeader: {
			display: "flex",
			alignItems: "center",
			marginBottom: "12px"
		},
		avatar: {
			width: "30px",
			height: "30px",
			borderRadius: "50%",
			objectFit: "cover",
			marginRight: "12px"
		},
		postInfo: {
			display: "flex",
			flexDirection: "column"
		},
		name: {
			margin: 0,
			fontSize: "16px",
			fontWeight: "bold"
		},
		date: {
			fontSize: "12px",
			color: "gray"
		},
		postContent: {
			fontSize: "14px",
			marginBottom: "12px"
		},
		postActions: {
			display: "flex",
			gap: "8px"
		},
		button: {
			backgroundColor: "#f0f0f0",
			border: "none",
			padding: "4px 5px 0px 5px",
			borderRadius: "6px",
			cursor: "pointer",
			fontSize: "12px",
			transition: "background-color 0.2s"
		}
	};

	return (
		<div style={styles.post}>
			<div style={styles.postHeader}>
				<img style={styles.avatar} src={avatar} />
				<div style={styles.postInfo}>
					<h4 style={styles.name}>{name}</h4>
					<span style={styles.date}>{date}</span>
				</div>
			</div>
			<div style={styles.postContent}>
				<p>{content}</p>
			</div>
			<div style={styles.postActions}>
				<button
					style={styles.button}
					onClick={() => setLike(like => !like)}
				>
					{like ? (
						<StarIcon style={{ color: "#f97316" }} />
					) : (
						<StarBorderIcon />
					)}
				</button>
			</div>
		</div>
	);
};

function CreatePost() {
	const [content, setContent] = useState("");
	const [msgs, setMsg] = useState("");
	function creatPost(e) {
		e.preventDefault();
		setContent(content.trim());
		if (content.length < 3 || content === "") {
			setMsg("المنشور قصير جدا !");
			return;
		}
		fetch(`${backWebSite}/posts`, {
			credentials: "include",
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ content })
		})
			.then(res => res.json())
			.then(data => {
				console.log("hello999999 " + data);
				if (data.pMsg && data.status === 200) {
					setMsg(data.pMsg);
					setTimeout(_ => setMsg(""), 2000);
				} else if (data.pMsg) {
					setMsg(data.pMsg);
				} else {
					setMsg("يبدوا انه حدث خطأ في الاستجابة");
				}
			})
			.catch(err => {
				setMsg("لم يتم نشر المنشور، تحقق من الاتصال");
				console.log(err);
			});
	}
	return (
		<Paper
			elevation={0}
			sx={{ p: 2, mb: 1, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
		>
			<Stack direction="row" spacing={1}>
				<Box sx={{ flexGrow: 1 }}>
					<TextareaAutosize
						minRows={3}
						value={content}
						onChange={e => setContent(e.target.value)}
						placeholder={
							"اكتب منشورا مفيدا ... \nوإلتزم بالاخلاق العامة !"
						}
						style={{
							width: "100%",
							fontSize: "1rem",
							padding: "8px",
							borderRadius: "4px",
							border: "1px solid #ccc",
							direction: "rtl"
						}}
					/>
					<Stack
						direction="row"
						justifyContent="start"
						sx={{ mt: 1, direction: "rtl" }}
					>
						<Button
							variant="contained"
							color="secondary"
							sx={{ backgroundColor: "#F97316" }}
							onClick={e => creatPost(e)}
						>
							نشر
						</Button>
						<p style={{ fontSize: "12px", margin: "5px" }}>
							{msgs}
						</p>
					</Stack>
				</Box>
			</Stack>
		</Paper>
	);
}

export default PostPage;
