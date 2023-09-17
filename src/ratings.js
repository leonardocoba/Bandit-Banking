import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Circle, G, Text as SvgText, Svg } from "react-native-svg";

const DonutChart = () => {
  const data = [
    { label: "Travel", amount: 658.0, color: "#0074D9" }, // Dark blue
    { label: "Restaurants & Dining", amount: 268.83, color: "#FF4136" }, // Deep red
    { label: "Shopping & Entertainment", amount: 153.59, color: "#149414" }, // Deep hunter green
    { label: "Transportation", amount: 76.78, color: "#6B2E85" }, // Deep purple
    { label: "Grocery", amount: 297.57, color: "#FF851B" }, // Lighter red
  ];

  // Sort the data array by amount in descending order
  data.sort((a, b) => b.amount - a.amount);

  const totalSpending = data.reduce((acc, item) => acc + item.amount, 0);

  const legend = data.map((item, index) => (
    <View key={index} style={styles.legendItem}>
      <View style={{ backgroundColor: item.color, ...styles.legendColor }} />
      <Text style={styles.legendText}>
        {item.label}: ${item.amount.toFixed(2)}
      </Text>
    </View>
  ));

  const totalSpendingText = `$${totalSpending.toFixed(2)}`;

  return (
    <View style={styles.chartContainer}>
      <Svg width="100%" height="240">
        {/* Draw the total amount of money text */}
        <SvgText
          x="50%"
          y="50%"
          fontSize={20}
          fontWeight="bold"
          textAnchor="middle"
          zIndex={1}
        >
          {totalSpendingText}
        </SvgText>

        {data.map((slice, index) => {
          const percentage = (slice.amount / totalSpending) * 100;
          const angle = (percentage * 360) / 100;
          const dashArray = [angle, 360 - angle];
          const dashOffset = -90; // Offset by 90 degrees to start from the top

          return (
            <G key={index}>
              {/* Draw the pie chart slice */}
              <Circle
                cx="50%"
                cy="120"
                r="80" // Inner radius for the donut chart
                fill="transparent" // Set fill to transparent to create the donut effect
                stroke={slice.color}
                strokeWidth="40" // Adjust strokeWidth for the donut width
                strokeDasharray={dashArray.join(",")}
                strokeDashoffset={dashOffset}
              />
            </G>
          );
        })}
      </Svg>

      <View style={styles.legend}>{legend}</View>
    </View>
  );
};

const RatingsScreen = () => {
  const score = 750;

  const ratingScales = [
    { min: 828, max: 850, label: "A+" },
    { min: 805, max: 827, label: "A" },
    { min: 781, max: 804, label: "A-" },
    { min: 741, max: 780, label: "B+" },
    { min: 701, max: 740, label: "B" },
    { min: 661, max: 700, label: "B-" },
    { min: 641, max: 660, label: "C+" },
    { min: 621, max: 640, label: "C" },
    { min: 601, max: 620, label: "C-" },
    { min: 567, max: 600, label: "D+" },
    { min: 534, max: 566, label: "D" },
    { min: 500, max: 533, label: "D-" },
  ];

  const getRating = (score) => {
    for (const scale of ratingScales) {
      if (score >= scale.min && score <= scale.max) {
        return scale.label;
      }
    }
    return "F";
  };

  const rating = getRating(score);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.upperSection}>
          <View style={styles.box}>
            <Text style={styles.score}>{score}</Text>
            <Text style={styles.label}>Credit Score</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.score}>{rating}</Text>
            <Text style={styles.label}>Rating</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log("How To Improve Score button pressed");
          }}
        >
          <Text style={styles.buttonText}>How To Improve Score</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ ...styles.button, marginTop: 10 }}
          onPress={() => {
            console.log("Re-evaluate My Score button pressed");
          }}
        >
          <Text style={styles.buttonText}>Re-evaluate My Score</Text>
        </TouchableOpacity>

        <DonutChart />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  upperSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  box: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  score: {
    fontSize: 36,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  chartContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10, // Adjusted marginTop to move the chart down
    marginBottom: 30, // Added marginBottom to create space between chart and buttons
  },
  legend: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    marginBottom: 5,
  },
  legendColor: {
    width: 10,
    height: 10,
    marginRight: 5,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
  },
});

export default RatingsScreen;
