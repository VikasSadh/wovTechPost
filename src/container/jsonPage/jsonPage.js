import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function JsonPage(props) {
  return (
    <View style={styles.container}>
      <Text>
          {JSON.stringify(props.text)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
});
