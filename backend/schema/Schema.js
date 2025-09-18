const mongoose = require("mongoose");
const express = require("express");
const { Schema } = mongoose;

const PostSchema = new Schema(
	{
		authour: String,
		description: String,
	},
	{ timestamps: true }
);

const UserSchema = new Schema(
	{
		username: String,
		password: String,
		gender: String,
		niveau: String
	},
	{ timestamps: true }
);
const Post = mongoose.model("RafiqiPost", PostSchema);
const User = mongoose.model("RafiqiUser", UserSchema);
module.exports = { Post, User };
