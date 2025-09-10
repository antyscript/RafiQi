import React, { useState, useEffect } from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { Alert } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

function PostPage() {
	let posts = null;
	try {
		useEffect(_ => {
			fetch("http://localhost:3000/posts")
				.then(res => res.json())
				.then(result => {
					posts = result;
				});
		}, []);
	} catch (err) {
		console.log("error in fetch posts");
	}
	return (
		<>
			<Alert
				style={{ border: "1px solid #ccc" }}
				icon={<CheckIcon fontSize="inherit" />}
				severity="info"
			>
				تم إنشاء الحساب بنجاح
			</Alert>
			
			{posts ?
			    posts.map(post => {
			      return (<>
			      			<Post date={post.createdAt} name={post.author} content={post.content} />

			      </>)
			    })
			  : "nothing"
			  }
			  
			  
			}
			}
			<Post date="10/10/2000" name="me" content="anithing" />
			<Post date="10/10/2000" name="me" content="anithing" />
			<Post date="10/10/2000" name="me" content="anithing" />
			<Post date="10/10/2000" name="me" content="anithing" />
		</>
	);
}
/*function PostSchema() {
	return (
		<>
			<Post />
		</>
	);
}*/

const Post = ({ avatar, name, date, content }) => {
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
				<img
					style={styles.avatar}
					src={avatar || "/default.jpg"}
					alt="avater"
				/>
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
export default PostPage;
