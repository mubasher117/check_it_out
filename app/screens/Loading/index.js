import { Component } from "react";
import SplashScreen from "react-native-splash-screen";
import { NavigationActions, StackActions } from "react-navigation";
import { connect } from "react-redux";
import { toggleAuthMsg, logout } from "../../Redux/store/actions/auth";

import jwt_decode from "jwt-decode";
import StringsOfLanguages from "../../util/stringsOfLanguage";
import { retrieveData } from "../../util/helpers";
import { useEffect } from "react";

const Loading = (props) => {
	const onProcess = () => {
		SplashScreen.hide();
		retrieveData("userData")
			.then((data) => {
				console.log(data);
				props.navigation.navigate("Dashboard");
			})
			.catch((err) => props.navigation.navigate("AuthHome"));
	};

	useEffect(() => {
		onProcess();
	});

	return null;
};

export default Loading;
