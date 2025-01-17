import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Button, Alert } from "react-native";
import { StyledButton } from "../components";


const PrivacyPolicy = ({ navigation }) => {
  const [isAccepted, setIsAccepted] = useState(false);

  const handleAccept = () => {
    setIsAccepted(true);
    console.log("Navigation state:", navigation.getState());
    Alert.alert("Thank you!", "You have accepted the data policy.", [
      {
        text: "OK",
        onPress: () => {
        navigation.reset({
          index: 0,
          routes: [{ name: "RootTabs"}],
        });
        console.log("After reset:", navigation.getState());
    },
},
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, {color: "#b3cccc"}]}>Privacy Policy</Text>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.policyText}>
          {`Your privacy is important to us. We collect and process your data in accordance with GDPR. Below is a summary of how we handle your data:

- Data Collection: We collect only the necessary data for your app experience.
- Data Usage: Your data is used to enhance and personalize your experience.
- Data Sharing: We do not share your data with third parties without your consent.
- Your Rights: You have the right to access, modify, or delete your data at any time.

For more details, please contact our support team.
          `}
        </Text>
      </ScrollView>

      {!isAccepted && (
        <StyledButton style={styles.acceptButton} onPress={handleAccept}>
          Accept
        </StyledButton>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 60,
    backgroundColor: "#9ca3af",
  },
  title: {
    padding: 30,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
  policyText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#fff",
  },
  acceptButton: {
    marginTop: 10,
    backgroundColor: "#b3cccc",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PrivacyPolicy;