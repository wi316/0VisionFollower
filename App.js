import { useEffect } from "react";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";

import RootNavigation from "./src/Navigation";
import ErrorBoundary from "./src/Components/ErrorBoundary";

// ce ficher est le ficher de debut dexection de notre application

export default function App() {
  return (
    <SafeAreaView style={styles.SafeArea}>
      <ErrorBoundary>
        <RootNavigation />
      </ErrorBoundary>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeArea: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    marginHorizontal: 20,
  },
});
