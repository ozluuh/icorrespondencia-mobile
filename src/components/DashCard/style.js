import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#e7e7e7",
        flexGrow: 1,
        padding: 10,
        marginHorizontal: 5,
    },
    text: {
        fontSize: 28,
        fontWeight: "bold",
    },
    row: {
        flexDirection: "row"
    },
    alignBaseline: {
        alignItems: "center",
        justifyContent: "space-evenly"
    }
})