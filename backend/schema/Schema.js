const mongoose = require("mongoose");
const express = require("express");
const { Schema } = mongoose;

const PostSchema = new Schema(
	{
		authour: { type: String, required: true },
		description: { type: String, required: true },
		whoLiked: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }]
	},
	{ timestamps: true }
);

const UserSchema = new Schema(
	{
		username: { type: String, required: true },
		password: { type: String, required: true },
		gender: { type: String, required: true },
		niveau: { type: String, required: true },
		whatliked: [{ type: Schema.Types.ObjectId, ref: "Post", default : [] }]
	},
	{ timestamps: true }
);
const Post = mongoose.model("RafiqiPost", PostSchema);
const User = mongoose.model("RafiqiUser", UserSchema);
module.exports = { Post, User, UserSchema, PostSchema };
