import { StyleSheet, View, FlatList } from "react-native";
import {
  StyledText,
  ScrollableMainContainer,
  SectionHeader,
  DisplayCard,
} from "../components";
import { getWineData } from "../config/data";

export default function App() {
  return (
    <ScrollableMainContainer contentContainerStyle={styles.container}>
      <SectionHeader style={styles.header}>Current Deals</SectionHeader>

      <FlatList
        data={getWineData({ deal: true })}
        renderItem={({ item }) => <DisplayCard {...item}></DisplayCard>}
        keyExtractor={(item) => item.id.toString()}
      />
      <SectionHeader
        style={styles.header}
        rightText="View all"
        rightTextOnPress={() => {}}
      >
        Popular
      </SectionHeader>

      <SectionHeader
        style={styles.header}
        rightText="View all"
        rightTextOnPress={() => {}}
      >
        Our Collection
      </SectionHeader>
    </ScrollableMainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingBottom: 25,
  },
  header: {
    paddingHorizontal: 25,
    marginTop: 20,
    marginBottom: 15,
  },
});
