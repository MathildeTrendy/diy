import { useContext } from "react";
import { MainContainer, StyledText, StyledButton, ProfileInfo, ProductCard } from "../components";
import { StyleSheet, FlatList, View, TouchableOpacity } from "react-native";
import { colors } from "../config/theme";
import { UserContext, SavedProductsContext } from "../utils/context";
import { AntDesign } from "@expo/vector-icons";
import { ScreenWidth } from "../config/constants";
//import api from "../utils/api"; 

const Profile = () => {
    const{activeUser, setActiveUser} = useContext(UserContext);
    const {savedProducts} = useContext(SavedProductsContext);

    const handleDeleteAccount = async () => {
      Alert.alert(
        "Delete Account",
        "Are you sure you want to delete your account? This action cannot be undone.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: async () => {
              try {
                await api.delete(`/users/${activeUser.id}`);
                alert("Your account and data have been successfully deleted.");
                setActiveUser(null); //Nulstil brugeren
              } catch (error) {
                console.error("Error deleting account:", error);
                alert("An error occurred. Please try again later.");
              }
            },
          },
        ]
      );
    };
  
    return ( 
    <MainContainer style={styles.container}>
        <StyledText style={styles.header} bold>
            Account
        </StyledText>
    
    
    <ProfileInfo 
    icon="user" label="Username">
        {activeUser?.username}
        </ProfileInfo>
    <ProfileInfo 
    icon="user" label="Email">
        {activeUser?.email}
        </ProfileInfo>
    <ProfileInfo 
    icon="enviromento" label="Address">
        {activeUser?.address}
        </ProfileInfo>
   
    <StyledText style={styles.header} bold>
        WishList{" "}
        <AntDesign name="heart" size={17} color={colors.darkred + "cc"}/>       
    </StyledText>

    {(!savedProducts || savedProducts.length === 0) && (
        <View style={styles.emptyWishlist}>
          <AntDesign
            name="hearto"
            size={ScreenWidth * 0.4}
            color={colors.tertiary + "55"}
            style={{ marginBottom: 30 }}
          />

          <StyledText big>Your Wishlist is empty!</StyledText>
          <StyledText style={styles.emptyWishlistText}>
            No items found in your Wishlist
          </StyledText>

          <StyledButton style={styles.deleteButton} onPress={handleDeleteAccount}>
        Delete My Account
    </StyledButton>    

        </View>
      )}

    {savedProducts && savedProducts.length > 0 && (
        <FlatList
        data={savedProducts}
        renderItem={({ item }) => <ProductCard {...item} all />}
        keyExtractor={({ id }) => id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 25,
          marginBottom: 10,
        }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
       />
    )}
    </MainContainer>
);
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 25

    },
    header: {
        marginTop: 5,
        marginBottom: 15,
        color: colors.darkred + "cc"
    },
    deleteButton: {
      marginTop: 20,
      backgroundColor: "##FF0000",
      paddingVertical: 10,
      paddingHorizontal: 40,
      width: 260,
      height: 40,
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      marginBottom: 50,
    },
    emptyWishlist: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      emptyWishlistText: {
        color: colors.tertiary,
        marginTop: 5,
      },
})

export default Profile;