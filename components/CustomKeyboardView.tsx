import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import React from "react";

const android = Platform.OS === "android";

interface CustomKeyboardViewProps {
  children: React.ReactNode;
}

export default function CustomKeyboardView({ children }: CustomKeyboardViewProps) {
  return (
    <KeyboardAvoidingView
      behavior={android ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
