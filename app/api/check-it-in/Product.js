import API from "../index";
// import { retrieveData } from "../../util/helpers";
import EncryptedStorage from "react-native-encrypted-storage";

export async function createProduct(apiData) {
	console.log(API);
	console.log("createProduct API CALLED");
	let data = await EncryptedStorage.getItem("userData");
	data = JSON.parse(data);
	const accessToken = data.tokens.access.token;
	var config = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		},
	};
	console.log(apiData);
	return API.post("/product", JSON.stringify(apiData), config);
}

export async function getAllProducts() {
	console.log(API);
	console.log("API CALLED: getAllProducts");
	let data = await EncryptedStorage.getItem("userData");
	data = JSON.parse(data);
	const accessToken = data.tokens.access.token;
	var config = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		},
	};
	console.log(config);
	return API.get("/product?limit=10&page=1&sortBy=createdAt%3Adesc", config);
}

export async function getCategoricalProduct(categoryId) {
	console.log("API CALLED: getAllProducts");
	// let data = await EncryptedStorage.getItem("userData");
	// data = JSON.parse(data);
	// const accessToken = data.tokens.access.token;
	var config = {
		headers: {
			// Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		},
	};
	console.log(config);
	return API.get(`/product?limit=10&page=1&category=${categoryId}`, config);
}
export async function getUserProduct() {
	console.log("API CALLED: getAllProducts");
	let data = await EncryptedStorage.getItem("userData");
	data = JSON.parse(data);
	console.log(data)
	const accessToken = data.tokens.access.token;
	const userId = data.user.id;
	var config = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		},
	};
	console.log(config);
	return API.get(`/product?limit=10&page=1&user=${userId}`, config);
}
export async function productFilter(filters) {
	console.log("API CALLED: getAllProducts");
	let data = await EncryptedStorage.getItem("userData");
	data = JSON.parse(data);
	const accessToken = data.tokens.access.token;
	var config = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		},
	};
	let url = `/product?`;
	console.log(config);
	Object.keys(filters).map((key, index) => {
		url += `&${key}=${filters[key]}`;
	});
	return API.get(url, config);
}

export async function likeProduct(productId) {
	console.log("API CALLED: likeProduct");
	let data = await EncryptedStorage.getItem("userData");
	data = JSON.parse(data);
	const accessToken = data.tokens.access.token;
	var config = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		},
	};
	console.log(config);
	console.log(productId);
	return API.post(`/product/${productId}/like`, {}, config);
}

export async function saveProduct(productId) {
	console.log("API CALLED: saveProduct");
	let data = await EncryptedStorage.getItem("userData");
	data = JSON.parse(data);
	const accessToken = data.tokens.access.token;
	var config = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		},
	};
	console.log(config);
	console.log(productId);
	return API.post(`/product/${productId}/save`, {}, config);
}

export async function uploadVideo(name, uri) {
	console.log(API);
	console.log("API CALLED: uploadVideo");
	console.log(name, uri);
	let data = await EncryptedStorage.getItem("userData");
	data = JSON.parse(data);
	const accessToken = data.tokens.access.token;
	var config = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "multipart/form-data",
		},
	};
	var formData = new FormData();
	const videoName = new Date().getTime().toString() + ".mp4";
	console.log(videoName);
	formData.append("product", {
		name ,
		uri,
		type: "video/mp4",
	});
	return API.post(`/product/upload-image`, formData, config);
}
