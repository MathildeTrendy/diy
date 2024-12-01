import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ScrollableMainContainer, StyledText, ProductInfo, StyledButton } from "../components";
import { getDiyData } from "../config/data";
import { colors } from "../config/theme";
import { AntDesign } from "@expo/vector-icons";

const Details = () => {
    const diyId = 2;
    const fetchedDiy = getDiyData({diyId})[0];

    return ( 
    <ScrollableMainContainer contentContainerStyle={styles.container}>
     <View style={styles.topSection}>
        <StyledText bold style={styles.name}>
            {fetchedDiy?.name}
        </StyledText>

        <ProductInfo label="Alcohol" style={styles.info}>
            {fetchedDiy?.alcohol + "%"}
            </ProductInfo>
        <ProductInfo label="Volume" style={styles.info}>
            {fetchedDiy?.volume}
            </ProductInfo>
        <ProductInfo label="Year" style={styles.info}>
            {fetchedDiy?.year}
            </ProductInfo>
        <ProductInfo label="Origin" style={styles.info}>
            {fetchedDiy?.origin}
            </ProductInfo>
        <StyledText big >
            {fetchedDiy?.currency + fetchedDiy?.price }
        </StyledText>
        <TouchableOpacity style={styles.heart}>
            <AntDesign name="hearto" size={27} color={colors.tertiary + "cc"}>
        </AntDesign>
        </TouchableOpacity>
        <Image source={fetchedDiy?.image} style={styles.image} />
        </View>

        <View style={styles.bottomSection}>
            <ProductInfo label={"Description"}>
            {fetchedDiy?.description}
            </ProductInfo>
            
            <StyledButton icon="shoppingcart">Add to cart</StyledButton>
        </View>
    </ScrollableMainContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 25
    },
    topSection: {
        paddingHorizontal: 25,
        paddingBottom: 25,
        backgroundColor: colors.secondary,
        borderBottomRightRadius: 15,
        borderBottomRightRadius: 15
    },
    name: {
    marginBottom: 30,
    fontsize: 30
},
    info: {
        margin: 15
    },
    heart: {
        backgroundColor: colors.primary,
        position: 'absolute',
        bottom: -20,
        right: "50%",
        padding: 10,
        borderRadius: 50,
        borderColor: colors.secondary,
        zIndex: 1
    },
    image: {
        position: 'absolute',
        height: '90%',
        width: "90%",
        resizedMode: "contain",
        right: -95,
        top: 90,
    }
});

export default Details;