import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import transactions from "../data/transaction"; // Import transaction data

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleOpenCardPress = () => {
    navigation.navigate("Cards");
  };

  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      {/* Card Background */}
      <ImageBackground
        source={require("../public/background-card.jpeg")}
        style={styles.cardContainer}
        imageStyle={{ borderRadius: 10 }}
        resizeMode="cover"
      >
        {/* Card Name */}
        <Text style={[styles.cardName, styles.textShadow]}>Quicksilver</Text>

        {/* Current Balance */}
        <View style={styles.balanceContainer}>
          <Text style={[styles.label, styles.textShadow]}>
            Current Balance:
          </Text>
          <Text style={[styles.balance, styles.textShadow]}>$1,255.77</Text>
        </View>

        {/* Available Balance */}
        <View style={styles.balanceContainer}>
          <Text style={[styles.label, styles.textShadow]}>
            Available Balance:
          </Text>
          <Text style={[styles.balance, styles.textShadow]}>$2,500.00</Text>
        </View>
      </ImageBackground>

      {/* Button to open a new card */}
      <TouchableOpacity
        onPress={handleOpenCardPress}
        style={styles.openCardButton}
      >
        <Text style={styles.openCardButtonText}>Open a New Card</Text>
      </TouchableOpacity>

      {/* Container for transaction list */}
      <View
        style={[
          styles.scrollableBoxContainer,
          { top: 300, left: -15, width: screenWidth - 10 },
        ]}
      >
        {/* Title "Transactions" */}
        <Text style={[styles.title, styles.textShadow]}>Transactions</Text>

        {/* ScrollView for displaying transactions */}
        <ScrollView
          contentContainerStyle={styles.scrollableBoxContent}
          initialContentOffset={{ x: 0, y: 0 }}
          horizontal={false} // Disable horizontal scrolling
        >
          {/* Mapping through transactions and displaying each one */}
          {transactions.map((transaction) => (
            <View style={styles.transactionItem} key={transaction.id}>
              <Text style={styles.transactionText}>{transaction.company}</Text>
              <Text style={styles.transactionDescription}>
                {transaction.description}
              </Text>
              <Text style={styles.transactionAmount}>{transaction.amount}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

// Styles for the components (Excluded from comments)
const styles = StyleSheet.create({
  // Styles for the overall container (Excluded from comments)
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    padding: 20,
  },
  // Styles for the card container (Excluded from comments)
  cardContainer: {
    padding: 20,
    borderRadius: 10,
    width: "110%",
    marginTop: -170,
    marginLeft: 5,
  },
  // Styles for the card name (Excluded from comments)
  cardName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  // Styles for the balance container (Excluded from comments)
  balanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  // Styles for labels (Excluded from comments)
  label: {
    fontSize: 16,
    color: "white",
  },
  // Styles for balance amounts (Excluded from comments)
  balance: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  // Styles for text shadows (Excluded from comments)
  textShadow: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  // Styles for the "Open a New Card" button (Excluded from comments)
  openCardButton: {
    backgroundColor: "#e32f45",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  // Styles for the button text (Excluded from comments)
  openCardButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  // Styles for the scrollable box containing transactions (Excluded from comments)
  scrollableBoxContainer: {
    flexGrow: 1,
    position: "absolute",
    width: "100%",
    height: 290,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -100,
    minWidth: "100%",
  },
  // Styles for the scrollable box content (Excluded from comments)
  scrollableBoxContent: {
    alignItems: "center",
  },
  // Styles for the title "Transactions" (Excluded from comments)
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ff340a",
    marginLeft: 50,
  },
  // Styles for each transaction item (Excluded from comments)
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    width: "85%",
  },
  // Styles for transaction text (Excluded from comments)
  transactionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "left",
  },
  // Styles for transaction description (Excluded from comments)
  transactionDescription: {
    flex: 1,
    fontSize: 12,
    color: "#777",
    textAlign: "center",
  },
  // Styles for transaction amount (Excluded from comments)
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
  },
});

export default HomeScreen;
