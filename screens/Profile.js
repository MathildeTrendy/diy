import { useContext } from "react";
import { MainContainer, StyledText, ProfileInfo, ProductCard } from "../components";
import { StyleSheet, FlatList } from "react-native";
import { colors } from "../config/theme";
import { UserContext } from "../utils/context";
import { AntDesign } from "@expo/vector-icons";
import { getDiyData } from "../config/data";

const Profile = () => {
    const{activeUser} = useContext(UserContext);
    const savedProducts = [...getDiyData({})];

    return ( 
    <MainContainer style={styles.container}>
        <StyledText style={styles.header} bold>
            Account
        </StyledText>
    
    
    <ProfileInfo icon="user" label="Username">
        {activeUser?.username}
        </ProfileInfo>
    <ProfileInfo icon="user" label="Email">
        {activeUser?.email}
        </ProfileInfo>
    <ProfileInfo icon="enviromento" label="Address">
        {activeUser?.address}
        </ProfileInfo>

    <StyledText style={styles.header} bold>
        WishList{" "}
        <AntDesign name="heart" size={17} color={colors.darkred + "cc"}/>       
    </StyledText>

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

    }
})

export default Profile;