import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import fs from "fs";

export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			workbox: {
				globPatterns: [
					"**/*.{js,css,html,ico,png,jpg,svg,ttf,woff,woff2}"
				]
			},
			includeAssets: [
				"favicon.ico",
				"apple-touch-icon.png",
				"masked-icon.svg"
			],
			manifest: {
				name: "RafiQi",
				short_name: "RafiQi",
				description: "your classmate ! v2",
				theme_color: "#F97316",
				background_color: "#ffffff",
				display: "standalone",
				start_url: "/",
				icons: [
					{
						src: "pwa-X.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable"
					},
					{
						src: "pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "any"
					},
					{
						src: "pwa-512-x.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any"
					}
				]
			}
		})
	],
	server: {
/*		https: {
			key: fs.readFileSync("../cert/localhost-key.pem"),
			cert: fs.readFileSync("../cert/localhost.pem")
		},
		host: "localhost",
		port: 5173,*/
		historyApiFallback: true
	}
});
