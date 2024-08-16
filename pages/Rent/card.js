import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ title, children }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    marginHorizontal: 4,
    marginVertical: 6,
  },
  header: {
    backgroundColor: '#3498db', // Change background color here
    padding: 5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff', // Optional: Change text color
  },
  content: {
    padding: 20,
  },
});

export default Card;
