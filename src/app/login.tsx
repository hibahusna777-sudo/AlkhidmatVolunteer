import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { makeRedirectUri } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { useRouter } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

import { useAuth } from "../context/AuthContext";

WebBrowser.maybeCompleteAuthSession();

const GOOGLE_WEB_CLIENT_ID =
  "758307128837-d6mvtq49fjjfk28koi78t2ndaostf9gj.apps.googleusercontent.com";

const GOOGLE_REDIRECT_URI =
  "https://hibahusna777-sudo.github.io/AlkhidmatVolunteer/";

type UserData = {
  id: string;
  name: string;
  email: string;
  picture?: string;
  provider: "google" | "email";
};

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const redirectUri = useMemo(() => {
    if (Platform.OS === "web") {
      return GOOGLE_REDIRECT_URI;
    }

    return makeRedirectUri({
      scheme: "alkhidmatvolunteer",
      path: "oauthredirect",
    });
  }, []);

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: GOOGLE_WEB_CLIENT_ID,
    redirectUri,
  });

  // GOOGLE AUTH RESPONSE
  useEffect(() => {
    if (!response) return;

    const completeGoogleLogin = async () => {
      if (
        response.type === "dismiss" ||
        response.type === "cancel"
      ) {
        setGoogleLoading(false);
        return;
      }

      if (response.type === "error") {
        setGoogleLoading(false);

        Alert.alert(
          "Google Sign-In",
          response.error?.message ||
            "Google Sign-In could not be completed. Please try again."
        );

        return;
      }

      if (response.type !== "success") {
        setGoogleLoading(false);
        return;
      }

      try {
        const accessToken =
          response.authentication?.accessToken;

        if (!accessToken) {
          throw new Error("Google access token missing.");
        }

        const result = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!result.ok) {
          throw new Error(
            "Google account information unavailable."
          );
        }

        const data = await result.json();

        const user: UserData = {
          id: String(data.sub || ""),
          name: String(
            data.name ||
              data.given_name ||
              data.email?.split("@")[0] ||
              "Volunteer"
          ),
          email: String(data.email || ""),
          picture: data.picture,
          provider: "google",
        };

        if (!user.email) {
          throw new Error("Google email unavailable.");
        }

        await AsyncStorage.setItem(
          "currentUser",
          JSON.stringify(user)
        );

        await AsyncStorage.setItem(
          "isLoggedIn",
          "true"
        );

        setGoogleLoading(false);
        router.replace("/home");
      } catch (error) {
        console.log("Google login error:", error);

        setGoogleLoading(false);

        Alert.alert(
          "Google Sign-In",
          "Google account information could not be saved. Please try again."
        );
      }
    };

    completeGoogleLogin();
  }, [response, router]);

  // EMAIL LOGIN
  const handleEmailLogin = async () => {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      Alert.alert(
        "Email Required",
        "Please enter your email address."
      );
      return;
    }

    if (!cleanEmail.includes("@")) {
      Alert.alert(
        "Invalid Email",
        "Please enter a valid email address."
      );
      return;
    }

    if (!password) {
      Alert.alert(
        "Password Required",
        "Please enter your password."
      );
      return;
    }

    try {
      const result = await login(cleanEmail, password);

      if (!result.success) {
        Alert.alert(
          "Login Failed",
          result.message || "Incorrect email or password."
        );
        return;
      }

      router.replace("/home");
    } catch (error) {
      console.log("Email login error:", error);

      Alert.alert(
        "Login Error",
        "Unable to complete your login."
      );
    }
  };

  // GOOGLE LOGIN
  const handleGoogleSignIn = async () => {
    if (!request) {
      Alert.alert(
        "Please Wait",
        "Google Sign-In is still preparing."
      );
      return;
    }

    try {
      setGoogleLoading(true);
      await promptAsync();
    } catch (error) {
      console.log("Google prompt error:", error);

      setGoogleLoading(false);

      Alert.alert(
        "Google Sign-In",
        "Google Sign-In could not be opened. Please try again."
      );
    }
  };

  // FORGOT PASSWORD
  const handleForgotPassword = () => {
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      Alert.alert(
        "Forgot Password",
        "Please enter your email address first."
      );
      return;
    }

    Alert.alert(
      "Password Recovery",
      `Password recovery request prepared for:\n\n${cleanEmail}\n\nA real reset email requires a connected account service.`
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={
          Platform.OS === "ios" ? "padding" : undefined
        }
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* HERO */}

          <View style={styles.hero}>
            <View style={styles.logoBox}>
              <Image
                source={require("../../assets/images/alkhidmat-logo.png")}
                style={styles.logoImage}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.title}>
              Welcome Back
            </Text>

            <Text style={styles.subtitle}>
              Sign in to continue your volunteer journey
            </Text>
          </View>

          {/* LOGIN CARD */}

          <View style={styles.card}>
            {/* EMAIL */}

            <Text style={styles.label}>
              Email Address
            </Text>

            <View style={styles.inputWrap}>
              <Ionicons
                name="mail-outline"
                size={19}
                color="#A9B8DD"
                style={styles.inputIcon}
              />

              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor="#7F91B8"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                textContentType="emailAddress"
                style={styles.input}
              />
            </View>

            {/* PASSWORD */}

            <Text style={styles.label}>
              Password
            </Text>

            <View style={styles.inputWrap}>
              <Ionicons
                name="lock-closed-outline"
                size={19}
                color="#A9B8DD"
                style={styles.inputIcon}
              />

              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#7F91B8"
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
              />

              <Pressable
                onPress={() =>
                  setShowPassword((value) => !value)
                }
                style={styles.eyeButton}
              >
                <Ionicons
                  name={
                    showPassword
                      ? "eye-off-outline"
                      : "eye-outline"
                  }
                  size={20}
                  color="#A9B8DD"
                />
              </Pressable>
            </View>

            {/* FORGOT PASSWORD
                Correct position: directly under password */}

            <Pressable
              onPress={handleForgotPassword}
              style={styles.forgot}
            >
              <Text style={styles.forgotText}>
                Forgot Password?
              </Text>
            </Pressable>

            {/* LOGIN */}

            <Pressable
              onPress={handleEmailLogin}
              style={({ pressed }) => [
                styles.loginButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.loginButtonText}>
                Sign In
              </Text>

              <Ionicons
                name="arrow-forward"
                size={19}
                color="#FFFFFF"
              />
            </Pressable>

            {/* DIVIDER */}

            <View style={styles.dividerRow}>
              <View style={styles.divider} />

              <Text style={styles.orText}>
                OR
              </Text>

              <View style={styles.divider} />
            </View>

            {/* GOOGLE - SMALL PROFESSIONAL ACTION */}

            <Pressable
              onPress={handleGoogleSignIn}
              disabled={googleLoading}
              style={({ pressed }) => [
                styles.googleAction,
                pressed && styles.pressed,
                googleLoading && styles.disabled,
              ]}
            >
              {googleLoading ? (
                <ActivityIndicator
                  size="small"
                  color="#FFFFFF"
                />
              ) : (
                <View style={styles.googleIcon}>
                  <Text style={styles.googleG}>
                    G
                  </Text>
                </View>
              )}

              <Text style={styles.googleActionText}>
                {googleLoading
                  ? "Connecting..."
                  : "Continue with Google"}
              </Text>
            </Pressable>

            {/* SIGN UP - SMALL ACTION */}

            <View style={styles.signupRow}>
              <Text style={styles.signupText}>
                New to Alkhidmat?
              </Text>

              <Pressable
                onPress={() => router.push("/signup")}
                style={styles.signupAction}
              >
                <Ionicons
                  name="person-add-outline"
                  size={15}
                  color="#E8C56A"
                />

                <Text style={styles.signupLink}>
                  Create Account
                </Text>
              </Pressable>
            </View>
          </View>

          <Text style={styles.footer}>
            Alkhidmat Volunteer Management
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#071A3A",
  },

  flex: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    paddingHorizontal: 22,
    paddingVertical: 28,
    justifyContent: "center",
  },

  // HERO

  hero: {
    alignItems: "center",
    marginBottom: 24,
  },

  logoBox: {
    width: 60,
    height: 40,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,

    shadowColor: "#000000",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 5,
  },

  logoImage: {
    width: 166,
    height: 72,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 31,
    fontWeight: "800",
    textAlign: "center",
  },

  subtitle: {
    color: "#A9B8DD",
    fontSize: 14,
    marginTop: 7,
    textAlign: "center",
  },

  // CARD

  card: {
    backgroundColor: "#0D2B63",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  label: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
    marginTop: 5,
  },

  inputWrap: {
    minHeight: 54,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(169,184,221,0.25)",
    backgroundColor: "#10234B",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  inputIcon: {
    marginLeft: 15,
  },

  input: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15,
    paddingHorizontal: 12,
    paddingVertical: 14,
  },

  eyeButton: {
    padding: 14,
  },

  // FORGOT

  forgot: {
    alignSelf: "flex-end",
    marginTop: -5,
    marginBottom: 17,
  },

  forgotText: {
    color: "#E8C56A",
    fontSize: 12,
    fontWeight: "700",
  },

  // LOGIN

  loginButton: {
    minHeight: 54,
    borderRadius: 15,
    backgroundColor: "#2F6BFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },

  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  // DIVIDER

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(169,184,221,0.2)",
  },

  orText: {
    color: "#7185AF",
    fontSize: 11,
    fontWeight: "700",
    marginHorizontal: 11,
  },

  // GOOGLE SMALL ACTION

  googleAction: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    gap: 8,
  },

  googleIcon: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  googleG: {
    color: "#4285F4",
    fontSize: 17,
    fontWeight: "900",
  },

  googleActionText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  // SIGN UP SMALL ACTION

  signupRow: {
    marginTop: 16,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "rgba(169,184,221,0.12)",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
  },

  signupText: {
    color: "#8FA2C9",
    fontSize: 12,
  },

  signupAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  signupLink: {
    color: "#E8C56A",
    fontSize: 12,
    fontWeight: "800",
  },

  footer: {
    color: "#7185AF",
    fontSize: 10,
    textAlign: "center",
    marginTop: 18,
  },

  pressed: {
    opacity: 0.72,
  },

  disabled: {
    opacity: 0.55,
  },
});