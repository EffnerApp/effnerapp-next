import {StyleSheet} from "react-native";
import {Themes} from "./ColorThemes";

export const GlobalStyles = (theme = Themes.light) => StyleSheet.create({
    screen: {
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.background
    },
    content: {
        width: "100%",
        height: "100%",
        maxWidth: "90%",
        maxHeight: "90%",
        padding: 12,
        backgroundColor: theme.colors.background,
        borderRadius: 4,
    },
    box: {
        padding: 12,
        backgroundColor: theme.colors.surface,
        margin: 8,
        borderRadius: 8
    },
    text: {
        color: theme.colors.font
    },
    dropShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.7,
        shadowRadius: 2,
        elevation: 10
    },
    textBigCenter: {
        color: theme.colors.font,
        fontSize: 17,
        textAlign: "center"
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    mt30: {
        marginTop: 30
    },
    mt15: {
        marginTop: 15
    },
    mt60: {
        marginTop: 60
    }
});