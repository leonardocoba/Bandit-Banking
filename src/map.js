import React, { Component } from "react";
import { View, StyleSheet, Dimensions, Image, Text } from "react-native";
import MapView, { Polyline, Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import { stores } from "../data/cashback"; // Import the data

class MapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      storesInRadius: [],
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Location permission denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      this.setState({
        latitude,
        longitude,
      });

      // Filter stores within a 10-mile radius based on coordinates
      const storesInRadius = stores.filter((store) => {
        const distance = this.calculateDistance(
          latitude,
          longitude,
          store.locations[0].latitude, // Use the first location's latitude
          store.locations[0].longitude // Use the first location's longitude
        );
        return distance <= 10;
      });

      this.setState({
        storesInRadius,
        loading: false,
      });
    } catch (error) {
      console.error("Error getting current location:", error);
    }
  }

  // Function to calculate the distance between two coordinates
  calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    const miles = distance * 0.621371; // Convert to miles
    return miles;
  };

  deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  render() {
    const { latitude, longitude, storesInRadius, loading } = this.state;

    return (
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Fetching your location...</Text>
          </View>
        ) : (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {/* Custom cursor marker for current location */}
            <Marker
              coordinate={{
                latitude,
                longitude,
              }}
              title="My Location"
              description="This is where I am"
            >
              <Image
                source={require("../public/user_icon.png")}
                style={{ width: 40, height: 40 }}
              />
            </Marker>

            {/* Markers for stores in radius */}
            {storesInRadius.map((store) => (
              <Marker
                key={store.id}
                coordinate={{
                  latitude: store.locations[0].latitude,
                  longitude: store.locations[0].longitude,
                }}
                title={store.name}
                description={`Cashback: ${store.cashback}`}
              >
                <Image
                  source={require("../public/cash_icon.png")} // Replace with your store icon
                  style={{ width: 40, height: 40 }}
                />
                <Callout>
                  <View>
                    <Text>{store.name}</Text>
                    <Text>Cashback: {store.cashback}</Text>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.755,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default MapScreen;
