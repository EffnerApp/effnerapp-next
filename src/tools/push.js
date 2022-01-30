import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import {Platform} from "react-native";
import axios from "axios";
import {BASE_URL} from "./resources";
import {withAuthentication} from "./helpers";

async function registerForPushNotifications() {
	let pushToken;
	if (Constants.isDevice) {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== "granted") {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== "granted") {
			alert("Failed to get push token for push notification!");
			return;
		}
		pushToken = (await Notifications.getExpoPushTokenAsync()).data;
		console.log('recv pushToken ... ' + pushToken);
	}

	if (Platform.OS === "android") {
		await Notifications.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FF231F7C",
		});
	}

	return pushToken;
}

const subscribeToChannel = async (credentials, channelId, pushToken) => {
	console.log('subscribing to push channel ' + channelId);
	await axios.post(
		`${BASE_URL}/v3/push/subscribe/${channelId}`,
		{
			pushToken,
		},
		withAuthentication(credentials)
	);
};

const revokePushToken = async (credentials, pushToken) => {
	console.log('revoking push token');
	await axios.post(
		`${BASE_URL}/v3/push/revokeToken`,
		{
			pushToken,
		},
		withAuthentication(credentials)
	);
};

export {registerForPushNotifications, subscribeToChannel, revokePushToken};
