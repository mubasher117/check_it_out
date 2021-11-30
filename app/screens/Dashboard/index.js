import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Dimensions, BackHandler } from "react-native";
import {
	Button,
	CustomTextInput,
	Error,
	Header,
	Icon,
	CustomDropDown,
	TitledList,
	TitledComponent,
	Filters,
	Modal,
} from "../../components";
import { BaseColor, BaseStyle, PurpleColor, YellowColor } from "../../config";
import VideoData from "../../components/check-it-out/VideoDisplay";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Ionicon from "react-native-vector-icons/Ionicons";
import { NavigationEvents } from "react-navigation";
import { withNavigationFocus } from "react-navigation";

import getStyles from "./style";
// import { videoData } from "../../util/data";
import { TouchableOpacity } from "react-native";
import { getCategories } from "../../api/check-it-out/categories";
import { DashboardHeader } from "../../components/Header/DashboardHeader";
import CheckItIn from "../check-it-in";
import { retrieveData } from "../../util/helpers";
import Loader from "../../components/LoaderScreen";
import {
	getAllProducts,
	getCategoricalProduct,
} from "../../api/check-it-in/Product";
import EncryptedStorage from "react-native-encrypted-storage";
const { width, height } = Dimensions.get("window");
import config from "react-native-config";
const axios = require("axios");
const Api = axios.create();
const backendServer = config.BACKEND_SERVER;
const routeBase = "v1";
const categories12 = [
	{ title: "Automotive & Powersports", id: "6117a344ddda9d002130b688" },
	{ title: "Baby Products", id: "6117a430ddda9d002130b689" },
	{ title: "Beauty", id: "6117a471ddda9d002130b68a" },
	{ title: "Books", id: "6117a488ddda9d002130b68b" },
	{ title: "Camera & Photo", id: "6117a497ddda9d002130b68d" },
	{ title: "Cell Phones & Accessories", id: "6117a4d6ddda9d002130b68e" },
	{ title: "Clothing", id: "6117a4f2ddda9d002130b68f" },
	{ title: "Collectible Coins", id: "6117a51eddda9d002130b690" },
	{ title: "Consumer Electronics", id: "6117a540ddda9d002130b691" },
	{ title: "Entertainment Collectibles", id: "6117a563ddda9d002130b692" },
	{ title: "Fine Art", id: "6117a572ddda9d002130b693" },
	{ title: "Grocery & Gourmet Food", id: "6117a58bddda9d002130b694" },
	{ title: "Health & Personal Care", id: "6117a5c5ddda9d002130b695" },
	{ title: "Home & Garden", id: "6117a5d7ddda9d002130b696" },
	{ title: "Hotels & Resorts", id: "6117a5e4ddda9d002130b697" },
	{ title: "Independent Design", id: "6117a5fcddda9d002130b698" },
	{ title: "Industrial & Scientific", id: "6117a60fddda9d002130b699" },
	{ title: "Major Appliances", id: "6117a61dddda9d002130b69a" },
	{ title: "Music", id: "6117a62addda9d002130b69b" },
	{ title: "Musical Instruments", id: "6117a63addda9d002130b69c" },
	{ title: "Office Products", id: "6117a646ddda9d002130b69d" },
	{ title: "Outdoors", id: "6117a653ddda9d002130b69e" },
	{ title: "Personal Computers", id: "6117a66dddda9d002130b69f" },
	{ title: "Pets & Pet Supplies", id: "6117a67fddda9d002130b6a0" },
	{ title: "Sports", id: "6117a692ddda9d002130b6a1" },
	{ title: "Sports Collectibles", id: "6117a69fddda9d002130b6a2" },
	{ title: "Tools & Home Improvement", id: "6117a6b4ddda9d002130b6a3" },
	{ title: "Toys & Games", id: "6117a6c4ddda9d002130b6a4" },
	{ title: "Video, DVD & Blu-ray", id: "6117a6d5ddda9d002130b6a5" },
	{ title: "Video Games", id: "6117a6e1ddda9d002130b6a6" },
	{ title: "Watches & Jewelry", id: "6117a6f0ddda9d002130b6a7" },
];
const VideoPlay = (props) => {
	const [categories, setCategories] = useState(categories12);
	const [searchText, setSearchText] = useState();
	const [activeMode, setActiveMode] = useState("cio");
	const [displayMode, setDisplayMode] = useState("default");
	const [styles, setStyles] = useState();
	const [videoData, setVideoData] = useState([]);
	const [savedVideos, setSavedVideos] = useState([]);

	useEffect(() => {
		_getSavedImages();
		getAllProducts().then((res) => {
			console.log(res.data.results);
			setVideoData(res.data.results)});
		
		retrieveData("isDarkMode")
			.then((mode) => {
				if (mode) {
					setStyles(getStyles(true));
				} else {
					setStyles(getStyles(false));
				}
			})
			.catch((err) => setStyles(getStyles(true)));

		// getCategories().then((data) => setCategories(data));
		//Back Handler
		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			backAction
		);
		const unsubscribe = props.navigation.addListener("didFocus", () => {
			getAllProducts().then((res) => setVideoData(res.data.results));
			console.log("Focused");
			BackHandler.addEventListener("hardwareBackPress", backAction);
		});
		const onBlurScreen = props.navigation.addListener("didBlur", () => {
			console.log("UNFOCUSED");
			// backHandler.remove();
		});
		return () => {
			unsubscribe;
			onBlurScreen;
			backHandler.remove();
		};
	}, []);

	const _getSavedImages = async() => {
		let data = await EncryptedStorage.getItem("userData");
	data = JSON.parse(data);
	console.log(data)
	const accessToken = data.tokens.access.token;
		const headers = {
			"Content-Type": "application/json",
			Authorization: "Bearer " + accessToken,
		};
		Api.get(
			`${backendServer}/${routeBase}/product/saved`,

			{ headers: headers }
		)
			.then((res) => {
				console.log(res.status);
				setSavedVideos(res.data.results);
			})
			.catch((error) => {
				console.log("errors", error.response);
			});
	};
	// useFocusEffect(
	// 	React.useCallback(() => {
	// 		console.log("Hi");

	// 		return () => unsubscribe();
	// 	}, [])
	// );

	const backAction = async () => {
		_handleMode("default");
		props.navigation.navigate("Dashboard");
		return true;
	};
	const _handleMode = (mode) =>
		displayMode == mode ? setDisplayMode("default") : setDisplayMode(mode);
	const _handleActiveMode = (mode) => setActiveMode(mode);
	const _handleCategory = (id) => {
		getCategoricalProduct(id).then((res) => {
			setVideoData(res.data.results);
			setDisplayMode("default");
		});
	};
	return (
		<>
			{!styles ? (
				<Loader />
			) : (
				<View style={styles.mainContainer}>
					<DashboardHeader
						handleDisplayMode={_handleMode}
						handleActiveMode={_handleActiveMode}
						applyTheme={true}
					/>
					{activeMode == "cio" ? (
						<>
							{displayMode == "default" && (
								<FlatList
									data={videoData}
									pagingEnabled={true}
									renderItem={({ item, index }) => {
										// console.log("SAVED VIDEOS:   ", savedVideos)
										const isSavedProduct = savedVideos.findIndex(prod => prod.id === item.id)
										console.log(isSavedProduct)
										return (
											<VideoData
												navigation={props.navigation}
												item={item}
												key={item?.id}
												isSaved={isSavedProduct === -1 ? false : true}
											/>
										);
									}}
								/>
							)}

							{displayMode == "category" && (
								<View style={styles.innerContainer}>
									<TitledList
										title="Categories"
										dataList={categories}
										itemType="touchable"
										label="title"
										value="id"
										_handleItemPress={(id) => _handleCategory(id)}
										containerStyle={styles.categoriesContainer}
										titleStyle={styles.categoriesTitle}
										itemStyle={styles.item}
									/>
								</View>
							)}

							{displayMode == "filter" && (
								<View style={styles.innerContainer}>
									<Filters />
								</View>
							)}
						</>
					) : (
						<>
							<CheckItIn />
							{displayMode == "category" && (
								<View style={styles.innerContainer}>
									<TitledList
										title="Categories"
										dataList={categories}
										itemType="touchable"
										label="title"
										value="id"
										_handleItemPress={(id) => _handleCategory(id)}
										containerStyle={styles.categoriesContainer}
										titleStyle={styles.categoriesTitle}
										itemStyle={styles.item}
									/>
								</View>
							)}

							{displayMode == "filter" && (
								<View style={styles.innerContainer}>
									<Filters />
								</View>
							)}
						</>
					)}

					<View style={{ width: 55, height: 68 }} />
				</View>
			)}
		</>
	);
};

export default VideoPlay;
