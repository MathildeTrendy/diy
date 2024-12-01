import { StyleSheet, FlatList } from "react-native";
import {
  ScrollableMainContainer,
  SectionHeader,
  DisplayCard,
  ProductCard
} from "../components";
import { getDiyData } from "../config/data";

export default function App() {
  return (
    <ScrollableMainContainer contentContainerStyle={styles.container}>
      <SectionHeader style={styles.header}>Current Deals</SectionHeader>

      <FlatList
        data={getDiyData({ popular: true })}
        renderItem={({ item }) => <DisplayCard {...item} />}
        keyExtractor={({id}) => id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 25,
        }}
      />

      <SectionHeader
        style={styles.header}
        rightText="View all"
        rightTextOnPress={() => {}}
      >
        Popular
      </SectionHeader>

      <FlatList
        data={getDiyData({ deal: true })}
        renderItem={({ item }) => <ProductCard {...item} />}
        keyExtractor={({id}) => id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 25,
          marginBottom: 10
        }}
        />

      <SectionHeader
        style={styles.header}
        rightText="View all"
        rightTextOnPress={() => {}}
      >
        Our Collection
      </SectionHeader>
      <FlatList
        data={getDiyData({}).slice(0, 5)}
        renderItem={({ item }) => <DisplayCard {...item} />}
        keyExtractor={({id}) => id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingLeft: 25,
        }}
      />
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
