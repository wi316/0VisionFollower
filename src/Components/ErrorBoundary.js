import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.toString() };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={ Style.container }>
          <Text>An error occurred: {this.state.errorMessage}</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const Style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})

export default ErrorBoundary;
