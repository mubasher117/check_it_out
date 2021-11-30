import React, { useState, useEffect, useContext } from "react";
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
	ToggleButton,
} from "../../index";
import { Picker } from "@react-native-picker/picker";
import DropDownPicker from "react-native-dropdown-picker";
import getStyles from "./style";
import { dropDownItems } from "../../../util/data";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { BaseColor } from "../../../config";
import { filter } from "lodash";
import { ThemeContext } from "../../../context/ThemeContext";
import Loader from "../../LoaderScreen";
import { map } from "lodash-es";

const filterButtons = [
	{ title: "New Videos", value: "" },
	{ title: "Most Watched", value: "" },
	{ title: "Most Favourited", value: "" },
	{ title: "Buy it Now", value: "" },
	{ title: "Bid Only", value: "" },
	{ title: "Pick up", value: "" },
	{ title: "Shippping", value: "" },
];

const Marker = ({ value, styles }) => (
	<>
		{!styles ? (
			<Loader />
		) : (
			<View
				style={{
					height: 70,
					paddingTop: 20,
					alignItems: "center",
				}}
			>
				<View
					style={{
						width: 30,
						height: 30,
						backgroundColor: "white",
						borderColor: "#6DF4E6",
						borderWidth: 2,
						borderRadius: 100,
					}}
				></View>
				<Text style={styles.markerTitle}>${value}</Text>
			</View>
		)}
	</>
);

const { width, height } = Dimensions.get("window");
const Filters = () => {
	const [selectedLanguage, setSelectedLanguage] = useState();
	const [styles, setStyles] = useState();
	const themeContext = useContext(ThemeContext);
	useEffect(() => {
		setStyles(getStyles(themeContext.isDarkMode));
	}, []);
	return (
		<>
			{!styles ? (
				<Loader />
			) : (
				<View style={styles.mainContainer}>
					<TitledList
						title="Filters"
						titleStyle={styles.title}
						dataList={[
							<TitledComponent
								containerStyle={styles.componentContainer1}
								title="Condition"
								titleStyle={styles.componentTitle}
								valueComponent={
									<View
										style={{
											borderRadius: 15,
											borderWidth: 1,
											// borderColor: "#bdc3c7",
											overflow: "hidden",
										}}
									>
										<Picker
											selectedValue={selectedLanguage}
											onValueChange={(itemValue, itemIndex) =>
												console.log(itemValue)
											}
											style={{
												borderRadius: 30,
												backgroundColor: "white",
											}}
										>
											{dropDownItems["condition"].map((item) => {
												return (
													<Picker.item label={item.label} value={item.value} />
												);
											})}
										</Picker>
										{/* <CustomDropDown
										itemList={dropDownItems["condition"]}
										placeholder="Select"
										style={{
											borderTopLeftRadius: 15,
											borderTopRightRadius: 15,
											borderBottomLeftRadius: 15,
											borderBottomRightRadius: 15,
										}}
										dropDownContainerStyle={styles.dropDownContainerStyle}
										handleSelected={(value) => console.log(value)}
										labelStyle={styles.labelStyle}
										listMode="MODAL"
										min={0}
										max={5}
										dropDownDirection="TOP"
									/> */}
									</View>
								}
							/>,

							<TitledComponent
								containerStyle={styles.componentContainer1}
								title="Brand"
								titleStyle={styles.componentTitle}
								valueComponent={
									<View
										style={{
											borderRadius: 15,
											borderWidth: 1,
											// borderColor: "#bdc3c7",
											overflow: "hidden",
										}}
									>
										<Picker
											selectedValue={selectedLanguage}
											onValueChange={(itemValue, itemIndex) =>
												console.log(itemValue)
											}
											style={{ borderRadius: 30, backgroundColor: "white" }}
										>
											{dropDownItems["brand"].map((item) => {
												return (
													<Picker.item label={item.label} value={item.value} />
												);
											})}
										</Picker>
									</View>
									// <CustomDropDown
									// 	itemList={dropDownItems["brand"]}
									// 	placeholder="Select"
									// 	style={{ borderRadius: 15 }}
									// 	dropDownContainerStyle={styles.dropDownContainerStyle}
									// 	handleSelected={(value) => console.log(value)}
									// 	labelStyle={styles.labelStyle}
									// 	listMode="MODAL"
									// 	dropDownMaxHeight={300}
									// 	zIndex={500000}
									// />
								}
							/>,
							<TitledComponent
								containerStyle={styles.componentContainer}
								title="Price"
								titleStyle={styles.componentTitle}
								valueComponent={
									<View style={{ paddingLeft: 15 }}>
										<MultiSlider
											values={[0, 100]}
											min={0}
											max={100}
											step={10}
											isMarkersSeparated={true}
											customMarkerLeft={(e) => (
												<Marker value={e.currentValue} styles={styles} />
											)}
											customMarkerRight={(e) => (
												<Marker value={e.currentValue} styles={styles} />
											)}
											selectedStyle={{ backgroundColor: "#6DF4E6" }}
											unselectedStyle={{ backgroundColor: "#6DF4E6" }}
											sliderLength={width - 70}
										/>
									</View>
								}
							/>,
							<View style={styles.toggleButtonContainer}>
								{filterButtons.map((button, index) => {
									return (
										<ToggleButton
											style={styles.button}
											textStyle={styles.buttonText}
											activeStyle={styles.buttonActive}
											activeTextStyle={styles.buttonTextActive}
											title={button.title}
										/>
									);
								})}
							</View>,
							<Button
								style={styles.premiumButton}
								styleText={styles.premiumButtonText}
								onPress={() => console.log("Filters Applied")}
							>
								Remove Advertisements (Premium)
							</Button>,
							<Button
								style={styles.clearFilterButton}
								styleText={styles.clearFilterButtonText}
								onPress={() => console.log("Filters Applied")}
							>
								Clear Filters
							</Button>,
							<Button
								style={styles.applyButton}
								gradient
								gradientType="horizontalRight"
								gradientColor={["#6BEBD3", BaseColor.buttonPrimaryGradientEnd]}
								onPress={() => console.log("Filters Applied")}
							>
								Apply Filters
							</Button>,
						]}
						itemType="custom"
						containerStyle={styles.listContainer}
					/>
				</View>
			)}
		</>
	);
};

export default Filters;
