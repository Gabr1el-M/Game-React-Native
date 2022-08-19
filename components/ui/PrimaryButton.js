import { View, Text, Pressable, StyleSheet } from "react-native";

import Colors from "../../constants/colors";

export default function PrimaryButton({ children, onPress }) {
    
    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable 
            style={({ pressed }) => pressed 
            ? [styles.buttonInnerContainer, styles.pressed] 
            : styles.buttonInnerContainer} 
            onPress={onPress}
            android_ripple={{ color: Colors.primary500 }}
            >
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonOuterContainer: { // Exclusivo do android
        borderRadius: 28,
        margin: 4,
        overflow: "hidden"
    },
    buttonInnerContainer: {
        backgroundColor: Colors.primary500,
        borderRadius: 28,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2, // Exclusivo do android
        margin: 4,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    pressed: {
        opacity: 0.75,
    },
});