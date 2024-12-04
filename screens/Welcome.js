import { useContext, useState, useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { onboardingData } from "../config/data";
import { colors } from "../config/theme";
import { StyledText, StyledButton } from "../components";
import { ScreenWidth } from "../config/constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HeaderHeightContext } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { storeData } from "./../utils/storage";
import { OnboardingContext } from "../utils/context";

const Welcome = ({ route }) => {
  const navigation = useNavigation();
  const [activeScreen] = useState(route.params?.activeScreen || 1); //Hvis ikke active screen er der, falder den tilbage på 1
  const onLastScreen = activeScreen === onboardingData.length; //hvis dette er true, skal vi gemme 'skip' knappen
  const { setIsDiyAppOnboarded } = useContext(OnboardingContext);
  const [completingOnboarding, setCompletingOnboarding] = useState(false);

  const completeOnBoarding = async () => {
    try {
      setCompletingOnboarding(true);
      await storeData("@DiyApp:Onboarding", true);

      setTimeout(() => {
        setIsDiyAppOnboarded(true);
        setCompletingOnboarding(false);
      }, 500);
    } catch (error) {
      console.warn(error);
      setCompletingOnboarding(false); //hvis fejl, sætter vi denne
    }
  };

  useEffect(() => {
    //useEffect-hook
    if (onLastScreen) {
      //checker om vi er på lastScreen(sidste billede)
      navigation.setOptions({
        headerRight: () => <></>,
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={onboardingData[activeScreen - 1].image}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={{ marginTop: useContext(HeaderHeightContext) }}>
        <View style={styles.imageContainer}>
          <Image
            source={onboardingData[activeScreen - 1].image}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <StyledText style={styles.title}>
          {onboardingData[activeScreen - 1].title}
        </StyledText>

        <StyledText style={styles.summary}>
          {onboardingData[activeScreen - 1].summary}
        </StyledText>
      </View>

      <View style={styles.bottomContent}>
        <View style={styles.pageIndicators}>
          {onboardingData.map((item) => {
            if (item.id === activeScreen) {
              return (
                <MaterialCommunityIcons
                  name="checkbox-blank-circle"
                  size={15}
                  color={colors.metallic + "cc"}
                  key={item.id} //hvilket id og hvilket item?
                />
              );
            }

            return (
              <MaterialCommunityIcons
                name="checkbox-blank-circle-outline"
                size={15}
                color={colors.tertiary + "33"} //hvad er tertiary?
                key={item.id} //hvilket id og hvilket item?
              />
            );
          })}
        </View>
        <StyledButton
          icon="arrowright"
          isLoading={completingOnboarding}
          onPress={() => {
            if (onLastScreen) return completeOnBoarding();
            navigation.push("Welcome", { activeScreen: activeScreen + 1 }); //we want active screen to be increased by 1
          }}
        >
          {onLastScreen ? "Explore" : "Next"}
        </StyledButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: colors.primary,
    paddingHorizontal: 35,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    height: "120%",
    opacity: 0.4,
  },
  imageContainer: {
    width: ScreenWidth - 70,
    height: ScreenWidth - 70,
    borderRadius: 45,
    marginBottom: 35,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  summary: {
    textAlign: "center",
    color: colors.tertiary,
  },
  bottomContent: {
    alignItems: "center",
    marginBottom: 25,
  },
  pageIndicators: {
    flexDirection: "row",
    marginBottom: 15,
  },
});
export default Welcome;
