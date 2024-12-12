import {Modal, View, TouchableOpacity, StyleSheet } from "react-native";
import StyledText from "../Texts/StyledText";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../config/theme";

const AlertModal = ({ children, onClose, isVisible }) => {
    return (
    <Modal transparent={true} animationType="slide" visible={isVisible}>
        <View style={styles.modalContent}>
            <View style={styles.titleContainer}>
                <StyledText style={styles.title}>Confirmation</StyledText>
                <TouchableOpacity onPress={onClose}>
                    <Feather name="x" size={22} color={colors.primary}/>
                </TouchableOpacity>
            </View>
            {children}
        </View>
    </Modal>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        width: '100',
        height: 'auto',
        backgroundColor: colors.secondary,
        position: 'absolute',
        bottom: 0
    },
    titleContainer: {
        backgroundColor: colors.tertiary,
        paddingHorizontal: 25,
        paddingVertidal: 5,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: colors.primary,
    }

})

export default AlertModal;