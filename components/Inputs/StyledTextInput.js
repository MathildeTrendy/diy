import { useState } from "react";
import {View, TextInput, StyleSheet} from "react-native"
import {AntDesign} from "@expo/vector-icons"
import { colors } from "../../config/theme"

const StyledTextInput = ({icon, style, ...props}) => {
    const [activeBackgroundColor, setActiveBackgroundColor] = useState("")

    const customOnFocus = () => {
        props?.onFocus;
        setActiveBackgroundColor(colors.highlight);
    };

    const customOnBlur = () => {
        props?.onBlur;
        setActiveBackgroundColor();
    };

    return (
        <View>
        <View style={styles.leftIcon}>
            <AntDesign name={icon} color={colors.placeholder} size={30} />
        </View>
        <TextInput 
        placeholderTextColor={colors.placeholder}
         {...props}
         onFocus={customOnFocus}
         onBlur={customOnBlur}
          style={[styles.inputField, {
                backgroundColor: activeBackgroundColor 
                ? activeBackgroundColor
                : colors.secondary,
          },
          style,
        ]}
        />
    </View>
    );
};

const styles = StyleSheet.create({
    inputField: {
        height: 50,
        fontSize: 16,
        color: colors.tint,
        paddingLeft: 55,
        paddingRight: 15,
        borderRadius: 10
    },
    leftIcon: {
        left: 15,
        top: 10,
        zIndex: 1,
        position: 'absolute'
    }
});

export default StyledTextInput;