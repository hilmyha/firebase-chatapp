import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function StartPage() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="gray" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    justifyContent: "center",
    marginHorizontal: "auto",
  },
});
