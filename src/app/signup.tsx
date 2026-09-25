import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useAuth } from "../context/AuthContext";
import useGoogleSignIn from "../hooks/useGoogleSignIn";

const COLORS = {
  navy: "#071A3A",
  midBlue: "#0D2B63",
  blue: "#2F6BFF",
  blueDark: "#1746C7",
  royalGold: "#E8C56A",
  white: "#FFFFFF",

  background: "#F5F8FF",
  text: "#10244A",
  muted: "#667694",
  lightMuted: "#8D9BB5",
  border: "#DCE4F2",
};

export default function SignupScreen() {
  const router = useRouter();

  const { signup } = useAuth();

  const {
    promptGoogleSignIn,
    googleLoading,
    isGoogleReady,
  } = useGoogleSignIn();

  const [role, setRole] =
    useState<"volunteer" | "organizer">("volunteer");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const handleSignup = async () => {
    const cleanName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();
    const cleanCity = city.trim();

    if (!cleanName) {
      Alert.alert(
        "Missing Information",
        "Please enter your full name."
      );
      return;
    }

    if (!cleanEmail || !cleanEmail.includes("@")) {
      Alert.alert(
        "Invalid Email",
        "Please enter a valid email address."
      );
      return;
    }

    if (!cleanPhone) {
      Alert.alert(
        "Missing Information",
        "Please enter your phone number."
      );
      return;
    }

    if (!cleanCity) {
      Alert.alert(
        "Missing Information",
        "Please enter your city."
      );
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Weak Password",
        "Password must be at least 6 characters long."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Password Error",
        "Passwords do not match."
      );
      return;
    }

    try {
      setIsSubmitting(true);

      const result = await signup({
        fullName: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        city: cleanCity,
        role,
        password,
      });

      if (!result.success) {
        Alert.alert(
          "Signup Failed",
          result.message || "Please try again."
        );
        return;
      }

      Alert.alert(
        "Account Created",
        `Welcome, ${cleanName}! Your ${role} account has been created.`,
        [
          {
            text: "Continue",
            onPress: () => router.replace("/home"),
          },
        ]
      );
    } catch (error) {
      console.log("Signup error:", error);

      Alert.alert(
        "Signup Error",
        "Something went wrong while creating your account."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          {/* HERO */}

          <View style={styles.hero}>
            <View style={styles.logoBox}>
              <Image
                source={require("../../assets/images/alkhidmat-logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.heroSmall}>
              ALKHIDMAT VOLUNTEER
            </Text>

            <Text style={styles.heroTitle}>
              Create your{" "}
              <Text style={styles.goldText}>
                account
              </Text>
            </Text>

            <Text style={styles.heroSubtitle}>
              Join our volunteer community and make a
              meaningful difference through service.
            </Text>
          </View>

          {/* MAIN CARD */}

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderText}>
                <Text style={styles.cardTitle}>
                  Create Account
                </Text>

                <Text style={styles.cardSubtitle}>
                  Choose your role and enter your details
                </Text>
              </View>

              <View style={styles.cardIcon}>
                <Ionicons
                  name="person-add-outline"
                  size={20}
                  color={COLORS.blue}
                />
              </View>
            </View>

            {/* GOOGLE */}

            <TouchableOpacity
              style={[
                styles.googleButton,
                (!isGoogleReady || googleLoading) &&
                  styles.disabledButton,
              ]}
              onPress={promptGoogleSignIn}
              activeOpacity={0.85}
              disabled={
                !isGoogleReady || googleLoading
              }
            >
              <View style={styles.googleCircle}>
                <Text style={styles.googleG}>
                  G
                </Text>
              </View>

              <Text style={styles.googleText}>
                {googleLoading
                  ? "Connecting..."
                  : "Continue with Google"}
              </Text>
            </TouchableOpacity>

            {!isGoogleReady && !googleLoading && (
              <Text style={styles.googleNote}>
                Google sign-in is currently unavailable
                in this build.
              </Text>
            )}

            {/* DIVIDER */}

            <View style={styles.dividerRow}>
              <View style={styles.divider} />

              <Text style={styles.orText}>
                OR
              </Text>

              <View style={styles.divider} />
            </View>

            {/* ROLE */}

            <Text style={styles.sectionLabel}>
              ACCOUNT TYPE
            </Text>

            <View style={styles.roleRow}>
              <TouchableOpacity
                style={[
                  styles.roleButton,
                  role === "volunteer" &&
                    styles.roleButtonActive,
                ]}
                onPress={() =>
                  setRole("volunteer")
                }
                activeOpacity={0.85}
              >
                <Ionicons
                  name="people-outline"
                  size={19}
                  color={
                    role === "volunteer"
                      ? COLORS.white
                      : COLORS.muted
                  }
                />

                <Text
                  style={[
                    styles.roleText,
                    role === "volunteer" &&
                      styles.roleTextActive,
                  ]}
                >
                  Volunteer
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.roleButton,
                  role === "organizer" &&
                    styles.roleButtonActive,
                ]}
                onPress={() =>
                  setRole("organizer")
                }
                activeOpacity={0.85}
              >
                <Ionicons
                  name="business-outline"
                  size={19}
                  color={
                    role === "organizer"
                      ? COLORS.white
                      : COLORS.muted
                  }
                />

                <Text
                  style={[
                    styles.roleText,
                    role === "organizer" &&
                      styles.roleTextActive,
                  ]}
                >
                  Organizer
                </Text>
              </TouchableOpacity>
            </View>

            {/* FULL NAME */}

            <Text style={styles.label}>
              Full Name
            </Text>

            <View style={styles.inputWrap}>
              <Ionicons
                name="person-outline"
                size={19}
                color={COLORS.lightMuted}
              />

              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor={
                  COLORS.lightMuted
                }
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>

            {/* EMAIL */}

            <Text style={styles.label}>
              Email Address
            </Text>

            <View style={styles.inputWrap}>
              <Ionicons
                name="mail-outline"
                size={19}
                color={COLORS.lightMuted}
              />

              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor={
                  COLORS.lightMuted
                }
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* PHONE */}

            <Text style={styles.label}>
              Phone Number
            </Text>

            <View style={styles.inputWrap}>
              <Ionicons
                name="call-outline"
                size={19}
                color={COLORS.lightMuted}
              />

              <TextInput
                style={styles.input}
                placeholder="03XX-XXXXXXX"
                placeholderTextColor={
                  COLORS.lightMuted
                }
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>

            {/* CITY */}

            <Text style={styles.label}>
              City
            </Text>

            <View style={styles.inputWrap}>
              <Ionicons
                name="location-outline"
                size={19}
                color={COLORS.lightMuted}
              />

              <TextInput
                style={styles.input}
                placeholder="Your city"
                placeholderTextColor={
                  COLORS.lightMuted
                }
                value={city}
                onChangeText={setCity}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>

            {/* PASSWORD */}

            <Text style={styles.label}>
              Create Password
            </Text>

            <View style={styles.inputWrap}>
              <Ionicons
                name="lock-closed-outline"
                size={19}
                color={COLORS.lightMuted}
              />

              <TextInput
                style={styles.input}
                placeholder="Create a password"
                placeholderTextColor={
                  COLORS.lightMuted
                }
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />

              <TouchableOpacity
                onPress={() =>
                  setShowPassword(
                    (value) => !value
                  )
                }
              >
                <Ionicons
                  name={
                    showPassword
                      ? "eye-off-outline"
                      : "eye-outline"
                  }
                  size={20}
                  color={COLORS.lightMuted}
                />
              </TouchableOpacity>
            </View>

            {/* CONFIRM PASSWORD */}

            <Text style={styles.label}>
              Confirm Password
            </Text>

            <View style={styles.inputWrap}>
              <Ionicons
                name="lock-closed-outline"
                size={19}
                color={COLORS.lightMuted}
              />

              <TextInput
                style={styles.input}
                placeholder="Re-enter your password"
                placeholderTextColor={
                  COLORS.lightMuted
                }
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={
                  !showConfirmPassword
                }
                autoCapitalize="none"
                autoCorrect={false}
              />

              <TouchableOpacity
                onPress={() =>
                  setShowConfirmPassword(
                    (value) => !value
                  )
                }
              >
                <Ionicons
                  name={
                    showConfirmPassword
                      ? "eye-off-outline"
                      : "eye-outline"
                  }
                  size={20}
                  color={COLORS.lightMuted}
                />
              </TouchableOpacity>
            </View>

            {/* SIGN UP */}

            <TouchableOpacity
              style={[
                styles.signupButton,
                isSubmitting &&
                  styles.signupButtonDisabled,
              ]}
              onPress={handleSignup}
              activeOpacity={0.85}
              disabled={isSubmitting}
            >
              <Text style={styles.signupButtonText}>
                {isSubmitting
                  ? "Creating Account..."
                  : "Create Account"}
              </Text>

              {!isSubmitting && (
                <Ionicons
                  name="arrow-forward"
                  size={19}
                  color={COLORS.white}
                />
              )}
            </TouchableOpacity>

            {/* LOGIN */}

            <View style={styles.loginRow}>
              <Text style={styles.loginText}>
                Already have an account?
              </Text>

              <TouchableOpacity
                onPress={() =>
                  router.push("/login")
                }
                activeOpacity={0.7}
              >
                <Text style={styles.loginLink}>
                  Login
                </Text>
              </TouchableOpacity>
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
  container: {
    flex: 1,
    backgroundColor: COLORS.navy,
  },

  flex: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 28,
  },

  hero: {
    backgroundColor: COLORS.navy,
    paddingHorizontal: 22,
    paddingTop: 26,
    paddingBottom: 48,
  },

  logoBox: {
    width: 50,
    height: 40,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    alignSelf: "flex-start",
  },

  logo: {
    width: 136,
    height: 52,
  },

  heroSmall: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.6,
    color: COLORS.royalGold,
    marginBottom: 7,
  },

  heroTitle: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "900",
    color: COLORS.royalGold,
  },

  goldText: {
    color: COLORS.royalGold,
  },

  heroSubtitle: {
    color: COLORS.white,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
    maxWidth: 330,
  },

  card: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -22,
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 28,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  cardHeaderText: {
    flex: 1,
    paddingRight: 12,
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: "900",
    color: COLORS.navy,
  },

  cardSubtitle: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 4,
  },

  cardIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#EAF1FF",
    alignItems: "center",
    justifyContent: "center",
  },

  googleButton: {
    height: 52,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  googleCircle: {
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },

  googleG: {
    fontSize: 19,
    fontWeight: "900",
    color: "#4285F4",
  },

  googleText: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.text,
  },

  googleNote: {
    fontSize: 10,
    lineHeight: 15,
    color: COLORS.muted,
    textAlign: "center",
    marginTop: 7,
  },

  disabledButton: {
    opacity: 0.55,
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },

  orText: {
    fontSize: 10,
    fontWeight: "900",
    color: COLORS.muted,
    marginHorizontal: 10,
  },

  sectionLabel: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.2,
    color: COLORS.blue,
    marginBottom: 8,
  },

  roleRow: {
    flexDirection: "row",
    backgroundColor: "#E9EEF8",
    borderRadius: 15,
    padding: 4,
    marginBottom: 18,
  },

  roleButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  roleButtonActive: {
    backgroundColor: COLORS.blue,
  },

  roleText: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.muted,
  },

  roleTextActive: {
    color: COLORS.white,
  },

  label: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 7,
    marginTop: 3,
  },

  inputWrap: {
    height: 52,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 13,
  },

  input: {
    flex: 1,
    height: "100%",
    fontSize: 14,
    color: COLORS.text,
  },

  signupButton: {
    height: 54,
    borderRadius: 15,
    backgroundColor: COLORS.blue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    marginTop: 8,
  },

  signupButtonDisabled: {
    opacity: 0.6,
  },

  signupButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "900",
  },

  loginRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 19,
    gap: 5,
  },

  loginText: {
    color: COLORS.muted,
    fontSize: 12,
  },

  loginLink: {
    color: COLORS.blueDark,
    fontSize: 12,
    fontWeight: "900",
  },

  footer: {
    backgroundColor: COLORS.background,
    color: "#71809D",
    textAlign: "center",
    fontSize: 9,
    paddingBottom: 5,
  },
});