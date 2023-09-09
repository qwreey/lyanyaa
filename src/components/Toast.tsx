
import { StyleSheet, Text, View } from 'react-native';

const stylesheet = StyleSheet.create({
    Frame: {
        position: "absolute",
        backgroundColor: "rgba(128,128,128,1)"
    }
})

export default function Toast({ text }:{
    text: string
}) {
    return (
        <View style={[stylesheet.Frame, { backgroundColor: "pink" }]}>
            <Text>{text}</Text>
        </View>
    );
}
