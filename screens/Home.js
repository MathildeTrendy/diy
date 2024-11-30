import { StyleSheet, View } from "react-native";
import { StyledText } from "../components";
import { getWineData } from "../config/data";

export default function App() {
  return (
    <View style={styles.container}>
      <StyledText big>Wine app</StyledText>
      <StyledText big>
        {getWineData({ searchTerm: "Sweet", popular: true }).length}
      </StyledText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
