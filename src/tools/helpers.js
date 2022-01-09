import AsyncStorage from "@react-native-async-storage/async-storage";
import alert from "react-native-web/dist/exports/Alert";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import {Platform} from "react-native";
import axios from "axios";
import Toast from "react-native-toast-message";
import {CommonActions} from "@react-navigation/native";
import platform from "react-native-web/dist/exports/Platform";
import {startActivityAsync} from "expo-intent-launcher";
import * as WebBrowser from 'expo-web-browser';
// import { BASE_URL } from "./api";
// import queryString from "query-string";
// import { CommonActions } from "@react-navigation/routers";
// import Toast from "react-native-root-toast";

const save = async (key, value) => {
    if (!value) await AsyncStorage.removeItem(key);
    else await AsyncStorage.setItem(key, JSON.stringify(value));
};

const load = async (key) => {
    const data = await AsyncStorage.getItem(key);
    if (!data) return;

    return JSON.parse(data);
};


const showToast = (title, message, type = 'success') => {
    Toast.show({
        type,
        text1: title,
        text2: message
    });
}

const navigateTo = (navigation, to, params = {}) => {
    navigation.dispatch(CommonActions.reset({
        index: 0,
        routes: [{name: to, params}]
    }));
}

const getPlatform = () => {
    return Platform.OS;
}

const runsOn = (os) => {
    return Platform.OS === os;
}


// const getLevel = async () => {
// 	return (await load('APP_CLASS')).match('^\\d{1,2}')[0];
// };

const getLevel = (sClass) => {
    return sClass.match('^\\d{1,2}')[0];
};

const openUri = async (uri) => {
    // open PDFs with the action view handler on android (fixes issue #163: https://github.com/EffnerApp/EffnerApp/issues/163)
    if (uri.endsWith('.pdf') && runsOn('android')) {
        await startActivityAsync('android.intent.action.VIEW', {
            data: uri,
            flags: 1,
            type: 'application/pdf'
        });
    } else {
        await WebBrowser.openBrowserAsync(uri);
    }
}

const groupBy = (list, keyGetter) => {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
};

//
// export async function registerForPushNotifications() {
// 	let pushToken;
// 	if (Constants.isDevice) {
// 		const { status: existingStatus } =
// 			await Notifications.getPermissionsAsync();
// 		let finalStatus = existingStatus;
// 		if (existingStatus !== "granted") {
// 			const { status } = await Notifications.requestPermissionsAsync();
// 			finalStatus = status;
// 		}
// 		if (finalStatus !== "granted") {
// 			alert("Failed to get push token for push notification!");
// 			return;
// 		}
// 		pushToken = (await Notifications.getExpoPushTokenAsync()).data;
// 		console.log(pushToken);
//
// 		const token = await load("tokenRaw");
//
// 		if (token) {
// 			await addPushToken(pushToken);
// 		}
//
// 		await save("pushToken", pushToken);
// 	}
//
// 	if (Platform.OS === "android") {
// 		await Notifications.setNotificationChannelAsync("default", {
// 			name: "default",
// 			importance: Notifications.AndroidImportance.MAX,
// 			vibrationPattern: [0, 250, 250, 250],
// 			lightColor: "#FF231F7C",
// 		});
// 	}
//
// 	return pushToken;
// }
//
// export async function addPushToken(pushToken) {
// 	await axios.post(
// 		`${BASE_URL}/push/addToken`,
// 		{
// 			pushToken,
// 		},
// 		{
// 			headers: {
// 				Authorization: "Bearer " + (await load("tokenRaw")),
// 			},
// 		}
// 	);
// }
//
// export async function revokePushToken(pushToken) {
// 	await axios.post(
// 		`${BASE_URL}/push/revokeToken`,
// 		{
// 			pushToken,
// 		},
// 		{
// 			headers: {
// 				Authorization: "Bearer " + (await load("tokenRaw")),
// 			},
// 		}
// 	);
// }

export {save, load, showToast, navigateTo, getPlatform, runsOn, getLevel, openUri, groupBy}
