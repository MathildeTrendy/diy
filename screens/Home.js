import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  ScrollableMainContainer,
  SectionHeader,
  DisplayCard,
  ProductCard,
} from "../components";

// Hent subscribeToUserItems
import { subscribeToUserItems } from "../utils/itemService";

// Dummy local data (som før):
import {
  getUniqueFindItemData,
  getPopularItemData,
} from "../config/data";

import { UserContext } from "../utils/context";

export default function Home() {
  const navigation = useNavigation();
  const { activeUser } = useContext(UserContext);

  const [myCollection, setMyCollection] = useState([]);

  useEffect(() => {
    if (!activeUser?.uid) return;

    // Sæt real-time subscription for items ejet af "activeUser.uid"
    const unsubscribe = subscribeToUserItems(activeUser.uid, (items) => {
      setMyCollection(items);
    });

    return () => unsubscribe();
  }, [activeUser]);

  return (
    <ScrollableMainContainer contentContainerStyle={styles.container}>
      {/* Unique Finds - stadig dine hardcodede data */}
      <SectionHeader style={styles.header}>Unique Finds</SectionHeader>
      <FlatList
        data={getUniqueFindItemData({ popular: true })}
        renderItem={({ item }) => <DisplayCard {...item} />}
        keyExtractor={({ id }) => id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
      />

      {/* Popular - stadig dine hardcodede data */}
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

      {/* My Collection (live-data fra Firestore) */}
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
