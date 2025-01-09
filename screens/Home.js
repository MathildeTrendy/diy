// Home.js
import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import {
  ScrollableMainContainer,
  SectionHeader,
  DisplayCard,
  ProductCard,
} from "../components";
import { useNavigation } from "@react-navigation/native";
import { getUserItems } from "../utils/itemService"; // Henter kun items for én bruger
import { getUniqueFindItemData, getPopularItemData } from "../config/data"; // Din lokale data om deals/popular
import { UserContext } from "../utils/context";

export default function Home() {
  const navigation = useNavigation();
  const { activeUser } = useContext(UserContext);

  const [myCollection, setMyCollection] = useState([]);

  useEffect(() => {
    // Henter kun items fra Firestore, hvor ownerId == activeUser.uid
    if (activeUser?.uid) {
      fetchMyCollection();
    }
  }, [activeUser]);

  const fetchMyCollection = async () => {
    try {
      const userItems = await getUserItems(activeUser.uid);
      setMyCollection(userItems);
    } catch (error) {
      console.error("Error fetching user items for My Collection:", error);
    }
  };

  return (
    <ScrollableMainContainer contentContainerStyle={styles.container}>
      {/* Unique Finds */}
      <SectionHeader style={styles.header}>Unique Finds</SectionHeader>
      <FlatList
        // Stadig din local data-fil: getItemData({ popular: true })
        data={getUniqueFindItemData({ popular: true })}
        renderItem={({ item }) => <DisplayCard {...item} />}
        keyExtractor={({ id }) => id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
      />

      {/* Popular */}
      <SectionHeader
        style={styles.header}
        rightTextOnPress={() => {
          navigation.navigate("Popular");
        }}
      >
        Popular
      </SectionHeader>
      <FlatList
        data={getPopularItemData({ deal: true })}
        renderItem={({ item }) => <ProductCard {...item} />}
        keyExtractor={({ id }) => id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.flatListContainer, { marginBottom: 5 }]}
      />

      {/* My Collection (viser kun items fra logged-in user) */}
      <SectionHeader
        style={styles.header}
        rightTextOnPress={() => {
          navigation.navigate("Products");
        }}
      >
        My Collection
      </SectionHeader>
      <FlatList
        data={myCollection}
        renderItem={({ item }) => <DisplayCard {...item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
      />
    </ScrollableMainContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 25,
  },
  header: {
    paddingHorizontal: 25,
    marginTop: 20,
    marginBottom: -25,
  },
  flatListContainer: {
    paddingLeft: 25,
  },
});
