import { Text } from "react-native";
import { colors } from "../../config/theme";

const StyledText = ({children, small, big, bold, style, ...props }) => {
    return (
    <Text
        style={[
        {
            color: colors.tint,
            fontSize: small ? 14 : big ? 20 : 16,
            fontWeight: bold || big ? "bold" : "normal",
        },
        style,
    ]}
    {...props}
>
    {children}
</Text>
 );
};

export default StyledText;