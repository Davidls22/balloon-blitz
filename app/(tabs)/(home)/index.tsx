import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <ImageBackground
      source={require("../../../assets/images/hotAirBackground.png")}
      style={styles.container}
    >
      <Image
        source={require("../../../assets/images/Logo.png")}
        style={styles.logoImage}
      />
      <View style={styles.centerView}>
        <Link href="/(tabs)/(home)/game" asChild>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>Start Game</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centerView: {
    alignItems: "center",
  },
  logoImage: {
    width: 350,
    height: 150,
    resizeMode: "contain",
    marginBottom: 200,
  },
  startButton: {
    backgroundColor: "#f44336",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 110,
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});