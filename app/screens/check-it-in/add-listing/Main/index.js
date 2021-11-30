import React, { useEffect, useState, useContext } from "react";
import RNFS from "react-native-fs";
import { View, SafeAreaView, ScrollView } from "react-native";
import * as ImagePicker from "react-native-image-picker";
import RNFetchBlob from "react-native-fetch-blob";
import Video from "react-native-video";
import {
	Button,
	CustomTextInput,
	TitledComponent,
} from "../../../../components";
import { BaseColor, BaseStyle } from "../../../../config";
import getStyles from "./styles";
import DeleteIcon from "../../../../assets/icons/delete.svg";
import { TouchableOpacity } from "react-native";
import NavigationService from "../../../../navigation/NavigationService";
import { ThemeContext } from "../../../../context/ThemeContext";
import Loader from "../../../../components/LoaderScreen";
import { NavigationEvents } from "react-navigation";
import { retrieveData, storeData } from "../../../../util/helpers";
import { uploadVideo } from "../../../../api/check-it-in/Product";
import { AuthContext } from "../../../../context/authContext";

const Main = (props) => {
	const { videoUriContext, titleContext, setTitleContext } =
		useContext(AuthContext);
	const [title, setTitle] = useState("");
	const [inputFocusStyle, setInputFocusStyle] = useState();
	const [videoUri, setVideoUri] = useState("");
	const [videoName, setVideoName] = useState("");
	const [videoEncoded, setVideoEncoded] = useState("");
	const [tempState, setTempState] = useState(0);
	const [styles, setStyles] = useState();
	const themeContext = useContext(ThemeContext);
	const { userSession } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		console.log("titleaaa", titleContext);
		setTitle(titleContext);
		setVideoUri(videoUriContext);
		console.log(userSession.tokens.access.token);
		setStyles(getStyles(themeContext.isDarkMode));
	}, [tempState]);
	const _handleNext = () => {
		retrieveData("productData")
			.then((data) => {
				data = { ...data, title };
				storeData("productData", data);
				props.jumpTo(2);
			})
			.catch((err) => {
				setIsLoading(true);
				uploadVideo(videoName, videoUri)
					.then((res) => {
						setIsLoading(false);
						const data = { title, videoUrl: res.data?.data };
						storeData("productData", data);
						props.jumpTo(2);
					})
					.catch((err) => {
						setIsLoading(false);
						alert("File too large!");
					});
			});
	};
	const selectVideo = async () => {
		ImagePicker.launchImageLibrary(
			{ mediaType: "video", includeBase64: true, videoQuality: "low" },
			(response) => {
				console.log(response);
				if (response && response.assets) {
					console.log("IN path");
					console.log(response.assets[0]?.uri);
					setVideoUri(response.assets[0]?.uri);
					setVideoName(response.assets[0]?.fileName);

					// RNFetchBlob.fs
					//   .readFile(response.assets[0]?.uri, "base64")
					//   .then((data) => {
					//     console.log("BASE64 DATA");
					//     setVideoEncoded(data);
					//     console.log("BASE64 DATA END");
					//   });

					// .stat(response.assets[0]?.uri)
					// .then((stats) => {
					//   // setVideoUri("file://" + stats.path);
					//   RNFS.readFile(stats.path, 'base64')
					//   .then(res =>{
					//     console.log("BASE64 DATA");
					//     console.log(res);
					//     console.log("BASE64 DATA END");
					//   });

					// })
					// .catch((err) => {});
				}
			}
		);
	};

	return (
		<>
			{!styles ? (
				<Loader />
			) : (
				<SafeAreaView style={BaseStyle.safeAreaView}>
					<NavigationEvents
						onDidFocus={(payload) => setTempState(tempState + 1)}
					/>
					<ScrollView keyboardShouldPersistTaps="handled">
						<View style={styles.container}>
							<TitledComponent
								title="Title"
								subTitle="Eg. Brand, Model, Size etc."
								valueComponent={
									<CustomTextInput
										style={styles.input}
										inputStyle={[styles.inputText, inputFocusStyle]}
										autoCorrect={false}
										value={title}
										onChangeText={(text) => {
											console.log(text);
											setTitle(text);
											setTitleContext(text);
										}}
										onBlur={() => setInputFocusStyle(null)}
										onFocus={() => setInputFocusStyle(styles.inputFocus)}
									/>
								}
								containerStyle={styles.componentContainer}
								titleStyle={styles.componentTitle}
								subTitleStyle={styles.subTitle}
							/>

							{(!videoUri || videoUri == "") && (
								<View style={styles.headerRow}>
									<Button
										style={styles.btn}
										gradient
										gradientType="horizontalRight"
										gradientColor={["#113337", "#22564E"]}
										styleText={styles.buttonText}
										onPress={() => NavigationService.navigate("VideoUpload")}
									>
										Take a Video
									</Button>
									<Button
										style={styles.btn}
										gradient
										gradientType="horizontalRight"
										gradientColor={["#113337", "#22564E"]}
										styleText={styles.buttonText}
										onPress={selectVideo}
									>
										Share a Video
									</Button>
								</View>
							)}

							{videoUri !== "" && (
								<View style={styles.videoContainer}>
									<Video
										source={{
											uri: videoUri,
										}}
										style={styles.video}
										repeat
									/>
									<TouchableOpacity
										style={styles.icon}
										onPress={() => setVideoUri("")}
									>
										<DeleteIcon />
									</TouchableOpacity>
								</View>
							)}
						</View>
						<Button
							loading={isLoading}
							style={styles.nextButton}
							gradient
							gradientType="horizontalRight"
							gradientColor={[
								BaseColor.buttonPrimaryGradientStart,
								BaseColor.buttonPrimaryGradientEnd,
							]}
							onPress={_handleNext}
						>
							Next
						</Button>
					</ScrollView>
				</SafeAreaView>
			)}
		</>
	);
};

export default Main;
