import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

export default function RulesScreen() {
  return (
    <ImageBackground
      source={require("../../assets/images/hotAirBackground.png")}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.heading}>Game Rules</Text>
        <Text style={styles.paragraph}>1. Tap to move the balloon up.</Text>
        <Text style={styles.paragraph}>2. Avoid buildings and birds.</Text>
        <Text style={styles.paragraph}>3. Don’t run out of fuel.</Text>
        <Text style={styles.paragraph}>4. Enjoy the ride!</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFFCC',
    borderRadius: 10,
    padding: 30,
    marginHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#009',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  paragraph: {
    fontSize: 22,
    marginVertical: 5,
    textAlign: 'center',
    color: '#555',
  },
});