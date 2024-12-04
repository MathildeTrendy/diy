import { View } from "react-native";
import StyledText from "./StyledText";
import { colors } from "../../config/theme";

const ProductInfo = ({ label, children, style }) => {
  return (
    <View style={style}>
      <StyledText
        bold
        style={{ color: colors.metallic + "cc", marginBottom: 5 }}
      >
        {label}
      </StyledText>
      <StyledText>{children}</StyledText>
    </View>
  );
};

export default ProductInfo;
