import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "../context/authContext";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Sign In", "Please fill all the fields!");
      return;
    }

    // login process
    setLoading(true);
    const response = await login(emailRef.current, passwordRef.current);
    setLoading(false);
    if (!response.success) {
      Alert.alert("Sign In", response.msg || "Failed to sign in!");
      return;
    }
  };

  return (
    <SafeAreaView style={styles.rootcontainer}>
      <StatusBar style="dark" />
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/authentication-65.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.main}>
        <View style={styles.form}>
          <View>
            <View style={styles.textInput}>
              <Ionicons name="mail" size={hp(2.7)} color="gray" />
              <TextInput
                onChangeText={(text) => (emailRef.current = text)}
                placeholderTextColor={"gray"}
                placeholder="Enter your email"
              />
            </View>
          </View>
          <View>
            <View style={styles.textInput}>
              <Ionicons name="lock-closed" size={hp(2.7)} color="gray" />
              <TextInput
                secureTextEntry={true}
                onChangeText={(text) => (passwordRef.current = text)}
                placeholderTextColor={"gray"}
                placeholder="Enter your password"
              />
            </View>

            <Text
              style={{
                fontSize: hp(1.7),
                marginTop: 4,
                textAlign: "right",
                textDecorationLine: "underline",
              }}
              onPress={() => console.log("Forgot password")}
            >
              Forgot password?
            </Text>
          </View>

          {loading ? (
            <View style={{ paddingVertical: 6 }}>
              <ActivityIndicator size="large" color="gray" />
            </View>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: hp(2.6),
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          )}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 12,
            }}
          >
            <Text style={{ fontSize: hp(1.8) }}>Don't have an account? </Text>
            <Text
              style={{
                fontSize: hp(1.8),
                fontWeight: "bold",
                color: "#9b2727",
              }}
              onPress={() => router.push("register")}
            >
              Register
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootcontainer: {
    flex: 1,
  },
  main: {
    paddingHorizontal: 24,
    paddingVertical: hp(5),
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: hp(6),
  },
  image: {
    height: hp(30),
    resizeMode: "contain",
  },
  form: {
    gap: 20,
    paddingVertical: hp(4),
  },
  title: {
    fontWeight: "bold",
    fontSize: hp(4),
    textAlign: "center",
  },
  textInput: {
    borderRadius: 8,
    padding: 12,
    gap: 12,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    flexDirection: "row",
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#9b2727",
    borderRadius: 8,
    alignItems: "center",
  },
});
