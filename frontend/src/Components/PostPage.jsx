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
import moment from "moment";
import "moment/dist/locale/ar";
//moment.updateLocale("ar", null);
moment.locale("ar");
const token = localStorage.getItem("token");

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

import { io } from "socket.io-client";
const socket = io(backWebSite);

function PostPage() {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		fetch(`${backWebSite}/posts`)
			.then(res => {
				if (!res.ok) {
					throw new Error(`HTTP error: ${res.status}`);
				}
				return res.json();
			})
			.then(data => {
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
			{posts && posts.length > 0 ? (
				<>
					<CreatePost />
					{posts.map(post => (
						<Post
							key={post._id}
							date={moment(post.createdAt).fromNow()}
							name={post.authour}
							content={post.description}
							id={post._id}
							likes={post.whoLiked.length}
						/>
					))}
				</>
			) : (
				<>
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
					<p
						style={{
							fontSize: "0.7rem",
							marginTop: "36px"
						}}
					>
						إذا تأخر الرد لاكثر من دقيقة المرجوا مراجعة إتصالك
						بالانترنت او انه حدث خطأ في السيرفر
					</p>
				</>
			)}
		</>
	);
}

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
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token
			},
			body: JSON.stringify({ content })
		})
			.then(res => res.json())
			.then(data => {
				console.log("hello999999 " + JSON.stringify(data));
				if (data.pMsg && data.status === 200) {
					setMsg(data.pMsg);
					setTimeout(_ => setMsg(""), 1000);
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

const Post = ({
	avatar = "/default.jpg",
	name,
	date,
	content,
	id,
	likes = 0
}) => {
	const [like, setLike] = useState(false);
	const [PostLikes, setPostLikes] = useState(likes);
	/*	async function likeAPost(id) {
		setLike(!like);
		SetPostLikes(prev => (like ? prev - 1 : prev + 1));

		try {
			await fetch(`${backWebSite}/posts/${id}/like`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token
				}
			});
		} catch (err) {
			// لو حصل خطأ، ارجع الحالة
			setLike(like);
			SetPostLikes(prev => (like ? prev + 1 : prev - 1));
			console.error(err);
		}
	}
	*/
	useEffect(() => {
		socket.on("likesUpdate", data => {
			if (data.postId === id) {
				setPostLikes(data.likes);
			}
		});
		return () => socket.off("likesUpdate");
	}, [id]);

	async function likeAPost(postId) {
		setLike(!like);
		setPostLikes(prev => (like ? prev - 1 : prev + 1));

		try {
			await fetch(`${backWebSite}/posts/${postId}/like`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token
				}
			});
		} catch (err) {
			setLike(like);
			setPostLikes(prev => (like ? prev + 1 : prev - 1));
			console.error(err);
		}
	}
	return (
		<div className="post-container">
			<div className="post-header">
				<img className="post-avatar" src={avatar} alt="avatar" />
				<div className="post-info">
					<h4 className="post-name">{name}</h4>
					<span className="post-date">{date}</span>
				</div>
			</div>

			<div className="post-content">
				<p>{content}</p>
			</div>

			<div className="post-actions">
				<button className="post-button" onClick={() => likeAPost(id)}>
					{like ? (
						<StarIcon style={{ color: "#f97316" }} />
					) : (
						<StarBorderIcon />
					)}
				</button>
				<span>{PostLikes}</span>
			</div>
		</div>
	);
};
export default PostPage;
