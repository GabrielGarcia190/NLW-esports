import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Component } from 'react'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello React Native</Text>

      <Button title='send1'/>
      <StatusBar style="auto" />
    </View>
  );
}

interface ButtonProps {
  title: string;
}

function Button(props: ButtonProps) {
  return (
    <TouchableOpacity>
      <Text>
      {props.title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});