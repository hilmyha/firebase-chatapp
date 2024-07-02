import React, { useEffect } from "react";
import { router, Slot, useRouter, useSegments } from "expo-router";
import { StyleSheet, View } from "react-native";
import { AuthContextProvider, useAuth } from "../context/authContext";

const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();

  useEffect(() => {
    // check if user is authenticated or not
    if (typeof isAuthenticated == "undefined") return;
    const inApp = segments[0] == "(app)";
    if (isAuthenticated && !inApp) {
      // redirect to home if user is authenticated
      router.replace("home");
    } else if (isAuthenticated == false) {
      // redirect to login if user is not authenticated
      router.replace("login");
    }
  }, [isAuthenticated]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
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
