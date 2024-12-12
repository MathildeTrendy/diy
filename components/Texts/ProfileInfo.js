import {View, StyleSheet} from "react-native";
import StyledText from "./StyledText";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../config/theme";



const ProfileInfo = ({icon, label, children, style}) => {
    
    return (
    <View style={[styles.container, style]}>
        <View>
            <AntDesign name={icon} size={20} color={colors.tertiary}/>
            <StyledText style={styles.labelText}>{label}</StyledText>
        </View>
        <StyledText>{children}</StyledText>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "soace-between",
        alignItems: 'center',
        backgroundColor: colors.secondary,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 15,
        marginBottom: 15
    },
    label: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    labelText: {
        marginLeft: 10,
        color: colors.tertiary
    }

})

export default ProfileInfo;