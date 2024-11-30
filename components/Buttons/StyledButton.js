import { TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import StyledText from "../Texts/StyledText";
import { colors } from "../../config/theme";
import {AntDesign} from "@expo/vector-icons";

const StyledButton = ({ children, style, textStyle, icon, onPress, isLoading }) => 
    {
    return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
        {isLoading && (
            <ActivityIndicator
            size="small"
            color={textStyle?.color ||colors.secondary}
            /> 
        )}

        {!isLoading && <>
    {!icon && (
    <StyledText bold style={[styles.text, textStyle]}>
        {children}
        </StyledText>
    )}

    {icon && (
        <>
        <StyledText bold style={[styles.text, textStyle]}>
        {children + " "}
        </StyledText>
        <AntDesign name={icon} size={19} color={colors.primary} style={[styles.text, textStyle]}
        />
        </>
    )}
    </>}
    </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.accent + "cc",
        borderRadius: 15,
        flexDirection: 'row'
    },
    text: {
        color: colors.primary
    }
})

export default StyledButton;