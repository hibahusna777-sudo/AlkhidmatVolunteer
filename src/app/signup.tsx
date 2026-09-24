import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
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

const COLORS = {
  navy: "#071A3A",
  blue: "#2F6BFF",
  white: "#FFFFFF",
  background: "#F5F8FF",
  text: "#10244A",
  muted: "#71809D",
  lightMuted: "#94A3B8",
  border: "#E2E8F5",
  gold: "#E8C56A",
};

type Role = "volunteer" | "organizer";

type UserData = {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  role: Role;
  provider: "email";
};

export default function SignupScreen() {
  const router = useRouter();

  const [role, setRole] = useState<Role>("volunteer");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      const user: UserData = {
        id: cleanEmail,
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        city: cleanCity,
        role,
        provider: "email",
      };

      // Save account information
      await AsyncStorage.setItem(
        "currentUser",
        JSON.stringify(user)
      );

      // Save login status
      await AsyncStorage.setItem(
        "isLoggedIn",
        "true"
      );

      // Save password locally for this demo app
      await AsyncStorage.setItem(
        `password_${cleanEmail}`,
        password
      );

      Alert.alert(
        "Account Created",
        `Welcome, ${cleanName}! Your ${role} account has been created successfully.`,
        [
          {
            text: "Continue",
            onPress: () => router.replace("/home"),
          },
        ]
      );
    } catch (error) {
      console.log("Signup Error:", error);

      Alert.alert(
        "Signup Failed",
        "Your account could not be created. Please try again."
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
          {/* HEADER */}
          <View style={styles.hero}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
              activeOpacity={0.8}
            >
              <Ionicons
                name="chevron-back"
                size={22}
                color={COLORS.white}
              />
            </TouchableOpacity>

            <View style={styles.logoBadge}>
              <Ionicons
                name="people"
                size={27}
                color={COLORS.blue}
              />
            </View>

            <Text style={styles.heroTitle}>
              Create Your Account
            </Text>

            <Text style={styles.heroSubtitle}>
              Join Alkhidmat and make a meaningful
              difference through volunteering.
            </Text>
          </View>

          {/* FORM CARD */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Make your profile
            </Text>

            <Text style={styles.cardSubtitle}>
              Enter your details to get started
            </Text>

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
                  size={18}
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
                  size={18}
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
                size={18}
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
                size={18}
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
                size={18}
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
                size={18}
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
              />
            </View>

            {/* PASSWORD */}
            <Text style={styles.label}>
              Create Password
            </Text>

            <View style={styles.inputWrap}>
              <Ionicons
                name="lock-closed-outline"
                size={18}
                color={COLORS.lightMuted}
              />

              <TextInput
                style={styles.input}
                placeholder="Minimum 6 characters"
                placeholderTextColor={
                  COLORS.lightMuted
                }
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />

              <TouchableOpacity
                onPress={() =>
                  setShowPassword(
                    (value) => !value
                  )
                }
                activeOpacity={0.7}
              >
                <Ionicons
                  name={
                    showPassword
                      ? "eye-off-outline"
                      : "eye-outline"
                  }
                  size={19}
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
                size={18}
                color={COLORS.lightMuted}
              />

              <TextInput
                style={styles.input}
                placeholder="Re-enter your password"
                placeholderTextColor={
                  COLORS.lightMuted
                }
                value={confirmPassword}
                onChangeText={
                  setConfirmPassword
                }
                secureTextEntry={
                  !showConfirmPassword
                }
                autoCapitalize="none"
              />

              <TouchableOpacity
                onPress={() =>
                  setShowConfirmPassword(
                    (value) => !value
                  )
                }
                activeOpacity={0.7}
              >
                <Ionicons
                  name={
                    showConfirmPassword
                      ? "eye-off-outline"
                      : "eye-outline"
                  }
                  size={19}
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
                  size={18}
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
                  router.replace("/login")
                }
                activeOpacity={0.7}
              >
                <Text style={styles.loginLink}>
                  Sign In
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
    paddingBottom: 25,
  },

  hero: {
    backgroundColor: COLORS.navy,
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 48,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor:
      "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 22,
  },

  logoBadge: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  heroTitle: {
    fontSize: 29,
    fontWeight: "900",
    color: COLORS.white,
    marginBottom: 8,
  },

  heroSubtitle: {
    fontSize: 13,
    lineHeight: 20,
    color: "#C8D4ED",
    maxWidth: 330,
  },

  card: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -22,
    paddingHorizontal: 22,
    paddingTop: 27,
    paddingBottom: 28,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.navy,
    textAlign: "center",
  },

  cardSubtitle: {
    fontSize: 12,
    color: COLORS.muted,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 22,
  },

  sectionLabel: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
    color: COLORS.blue,
    marginBottom: 8,
  },

  roleRow: {
    flexDirection: "row",
    backgroundColor: "#E8EDF6",
    borderRadius: 14,
    padding: 4,
    marginBottom: 20,
  },

  roleButton: {
    flex: 1,
    minHeight: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    borderRadius: 11,
  },

  roleButtonActive: {
    backgroundColor: COLORS.blue,
  },

  roleText: {
    fontSize: 13,
    fontWeight: "700",
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
  },

  inputWrap: {
    height: 52,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 14,
    marginBottom: 15,
  },

  input: {
    flex: 1,
    height: "100%",
    color: COLORS.text,
    fontSize: 14,
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
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    marginTop: 20,
  },

  loginText: {
    fontSize: 12.5,
    color: COLORS.muted,
  },

  loginLink: {
    fontSize: 12.5,
    color: COLORS.blue,
    fontWeight: "900",
  },

  footer: {
    backgroundColor: COLORS.background,
    textAlign: "center",
    color: "#9AA7BD",
    fontSize: 10,
    paddingBottom: 10,
  },
});