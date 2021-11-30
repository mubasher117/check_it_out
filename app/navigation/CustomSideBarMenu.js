// React Navigation Drawer with Sectioned Menu Options & Footer
// https://aboutreact.com/navigation-drawer-sidebar-menu-with-sectioned-menu-options-footer/

import React, { useState } from "react";
import {
	SafeAreaView,
	View,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { Text, Icon } from "../components";
import Collapsible from "react-native-collapsible";
import { PurpleColor } from "../config";
import { DrawerItems } from "react-navigation-drawer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/store/actions/auth";
import StringsOfLanguages from "../util/stringsOfLanguage";

const RouteGroup = ({
	groupName,
	subRoutes,
	iconName,
	iconFamily,
	handleClick,
	navigation,
}) => {
	const [collapsed, setCollapsed] = useState(true);

	return (
		<View
			key={groupName}
			style={{
				margin: 10,
				padding: 10,
			}}
		>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<Icon
						name={iconName}
						iconFamily={iconFamily}
						size={24}
						color="white"
					/>
					<Text whiteColor style={styles.iconItemText} body2>
						{groupName}
					</Text>
				</View>
			</View>
			{subRoutes.map((elem) => (
				<TouchableOpacity
					onPress={() => {
						handleClick(elem.route);
						setCollapsed(!collapsed);
					}}
					key={elem.route}
					style={styles.itemContainer}
				>
					<Text whiteColor body2>
						{elem.name}
					</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};

const CustomSideBarMenu = (props) => {
	const { state, descriptors, navigation } = props;
	const dispatch = useDispatch();
	const handleClick = (route) => {
		navigation.navigate(route);
	};

	return (
		<SafeAreaView
			style={{ flex: 1, backgroundColor: PurpleColor.primaryColor }}
		>
			<ScrollView keyboardShouldPersistTaps="handled">
				<View
					style={{
						padding: 20,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<View
						style={{
							height: 80,
							width: 80,
							borderRadius: 40,
							backgroundColor: "white",
							justifyContent: "center",
							alignItems: "center",
							marginBottom: 10,
							borderWidth: 1,
							borderColor: "black",
						}}
					>
						<Text whiteColor title2 style={{ color: PurpleColor.primaryColor }}>
							JD
						</Text>
					</View>
					<Text whiteColor body1>
						John Doe
					</Text>
				</View>

				<TouchableOpacity
					onPress={() => {
						navigation.navigate("ChangePassword");
					}}
					style={[
						styles.rowItem,
						styles.itemContainer,
						navigation.state.routeName === "ChangePassword"
							? {
									backgroundColor: "rgba(255,255,255,0.1)",
									borderRadius: 6,
							  }
							: {},
					]}
				>
					<Icon
						name="lock-closed"
						iconFamily="Ionicons"
						size={24}
						color="white"
					/>
					<Text whiteColor body2 style={[styles.iconItemText]}>
						{StringsOfLanguages.changePassword}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate("ChangeLanguage");
					}}
					style={[
						styles.rowItem,
						styles.itemContainer,
						navigation.state.routeName === "ChangeLanguage"
							? {
									backgroundColor: "rgba(255,255,255,0.1)",
									borderRadius: 6,
							  }
							: {},
					]}
				>
					<Icon
						name="language"
						iconFamily="FontAwesome"
						size={24}
						color="white"
					/>
					<Text whiteColor body2 style={[styles.iconItemText]}>
						{StringsOfLanguages.changeLanguage}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						dispatch(logout());
						navigation.navigate("SignIn");
					}}
					style={[styles.rowItem, styles.itemContainer]}
				>
					<Icon
						name="logout"
						iconFamily="MaterialCommunityIcons"
						size={24}
						color="white"
					/>
					<Text whiteColor body2 style={styles.iconItemText}>
						{StringsOfLanguages.logout}
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	sectionContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		marginTop: 10,
	},
	sectionLine: {
		backgroundColor: "gray",
		flex: 1,
		height: 1,
		marginLeft: 10,
		marginRight: 20,
	},
	iconItemText: {
		marginLeft: 15,
	},
	itemContainer: {
		marginLeft: 20,
		marginVertical: 10,
	},
	rowItem: {
		flexDirection: "row",
		alignItems: "center",
	},
});

export default CustomSideBarMenu;
