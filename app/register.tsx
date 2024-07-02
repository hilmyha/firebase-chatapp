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
import CustomKeyboardView from "../components/CustomKeyboardView";
import { useAuth } from "../context/authContext";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const usernameRef = useRef("");
  const profileRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleRegister = async () => {
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !usernameRef.current ||
      !profileRef.current
    ) {
      Alert.alert("Register", "Please fill all the fields!");
      return;
    }
    setLoading(true);

    // Register process
    let response = await register(
      emailRef.current,
      passwordRef.current,
      usernameRef.current,
      profileRef.current
    );
    setLoading(false);

    console.log(response);
    if (!response.success) {
      Alert.alert("Register", response.msg || "Failed to register!");
      return;
    }
  };

  return (
    <CustomKeyboardView>
      <StatusBar style="dark" />
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/data-storage-1-71.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.main}>
        <View style={styles.form}>
          <View style={styles.textInput}>
            <Ionicons name="person" size={hp(2.7)} color="gray" />
            <TextInput
              onChangeText={(text) => (usernameRef.current = text)}
              placeholderTextColor={"gray"}
              placeholder="Username"
            />
          </View>
          <View style={styles.textInput}>
            <Ionicons name="mail" size={hp(2.7)} color="gray" />
            <TextInput
              onChangeText={(text) => (emailRef.current = text)}
              placeholderTextColor={"gray"}
              placeholder="Email"
            />
          </View>
          <View style={styles.textInput}>
            <Ionicons name="lock-closed" size={hp(2.7)} color="gray" />
            <TextInput
              secureTextEntry={true}
              onChangeText={(text) => (passwordRef.current = text)}
              placeholderTextColor={"gray"}
              placeholder="Password"
            />
          </View>
          <View style={styles.textInput}>
            <Ionicons name="image" size={hp(2.7)} color="gray" />
            <TextInput
              onChangeText={(text) => (profileRef.current = text)}
              placeholderTextColor={"gray"}
              placeholder="Profile URL"
            />
          </View>

          {loading ? (
            <View style={{ paddingVertical: 6 }}>
              <ActivityIndicator size="large" color="gray" />
            </View>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: hp(2.6),
                }}
              >
                Register
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
            <Text style={{ fontSize: hp(1.8) }}>Already have account? </Text>
            <Text
              style={{
                fontSize: hp(1.8),
                fontWeight: "bold",
                color: "#9b2727",
              }}
              onPress={() => router.push("login")}
            >
              Login
            </Text>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
}

const styles = StyleSheet.create({
  rootcontainer: {
    flex: 1,
  },
  main: {
    paddingHorizontal: 24,
    paddingTop: hp(5),
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
