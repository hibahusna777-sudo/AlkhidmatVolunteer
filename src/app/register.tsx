import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
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
  navy2: "#0D2B63",
  blue: "#2F6BFF",
  blueLight: "#EAF0FF",
  gold: "#E8C56A",
  white: "#FFFFFF",
  background: "#F4F7FC",
  muted: "#5A6B8C",
  border: "#E3E7F2",
};

export default function RegisterScreen() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [message, setMessage] = useState("");
  const [agreed, setAgreed] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleRegister = () => {
    if (!fullName.trim() || !phoneNumber.trim() || !emergencyContact.trim()) {
      Alert.alert(
        "Missing Information",
        "Please fill all required fields."
      );
      return;
    }

    if (!agreed) {
      Alert.alert(
        "Terms Required",
        "Please agree to the terms & conditions."
      );
      return;
    }

    router.push("/registration-success" as any);
  };

  const handleMenuPress = (item: string) => {
    setMenuVisible(false);

    switch (item) {
      case "My Profile":
        router.push("/profile" as any);
        break;

      case "My Events":
        router.push("/my-events" as any);
        break;

      case "Senior Volunteers":
        router.push("/senior-volunteers" as any);
        break;

      case "Settings":
        router.push("/settings" as any);
        break;

      case "Help & Support":
        router.push("/help-support" as any);
        break;

      case "Logout":
        Alert.alert("Logout", "You have been logged out.");
        break;

      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ================= HERO ================= */}
        <View style={styles.hero}>
          {/* Decorative circles */}
          <View style={styles.heroCircleOne} />
          <View style={styles.heroCircleTwo} />

          {/* TOP BAR */}
          <View style={styles.heroTop}>
            {/* BACK */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
              activeOpacity={0.8}
            >
              <Ionicons
                name="arrow-back"
                size={20}
                color={COLORS.white}
              />
            </TouchableOpacity>

            {/* LOGO */}
            <View style={styles.logoContainer}>
              <Image
                source={require("../../assets/images/alkhidmat-logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            {/* DROPDOWN BUTTON */}
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => setMenuVisible((previous) => !previous)}
              activeOpacity={0.8}
            >
              <View style={styles.profileIcon}>
                <Ionicons
                  name="person"
                  size={14}
                  color={COLORS.white}
                />
              </View>

              <View style={styles.profileTextWrap}>
                <Text style={styles.welcomeText}>Welcome</Text>
                <Text style={styles.volunteerText}>Volunteer</Text>
              </View>

              <Ionicons
                name={menuVisible ? "chevron-up" : "chevron-down"}
                size={14}
                color={COLORS.white}
              />
            </TouchableOpacity>
          </View>

          {/* ================= WORKING DROPDOWN ================= */}
          {menuVisible && (
            <View style={styles.dropdownMenu}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleMenuPress("My Profile")}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="person-outline"
                  size={18}
                  color={COLORS.navy}
                />

                <Text style={styles.menuText}>
                  My Profile
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleMenuPress("My Events")}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="calendar-outline"
                  size={18}
                  color={COLORS.navy}
                />

                <Text style={styles.menuText}>
                  My Events
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleMenuPress("Senior Volunteers")}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="people-outline"
                  size={18}
                  color={COLORS.navy}
                />

                <Text style={styles.menuText}>
                  Senior Volunteers
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleMenuPress("Settings")}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="settings-outline"
                  size={18}
                  color={COLORS.navy}
                />

                <Text style={styles.menuText}>
                  Settings
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleMenuPress("Help & Support")}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="help-circle-outline"
                  size={18}
                  color={COLORS.navy}
                />

                <Text style={styles.menuText}>
                  Help & Support
                </Text>
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleMenuPress("Logout")}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="log-out-outline"
                  size={18}
                  color="#D64545"
                />

                <Text style={styles.logoutText}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* HERO CONTENT */}
          <View style={styles.heroContent}>
            <View style={styles.badge}>
              <View style={styles.badgeDot} />

              <Text style={styles.badgeText}>
                EVENT REGISTRATION
              </Text>
            </View>

            <Text style={styles.heroTitle}>
              Register for the Event
            </Text>

            <Text style={styles.heroSubtitle}>
              Fill in your details to confirm your spot
            </Text>

            {/* EVENT INFO */}
            <View style={styles.eventInfoStrip}>
              <View style={styles.eventInfoItem}>
                <View style={styles.infoIcon}>
                  <Ionicons
                    name="calendar-outline"
                    size={16}
                    color={COLORS.gold}
                  />
                </View>

                <View>
                  <Text style={styles.infoLabel}>
                    EVENT DATE
                  </Text>

                  <Text style={styles.infoValue}>
                    29 September 2026
                  </Text>
                </View>
              </View>

              <View style={styles.infoDivider} />

              <View style={styles.eventInfoItem}>
                <View style={styles.infoIcon}>
                  <Ionicons
                    name="time-outline"
                    size={16}
                    color={COLORS.gold}
                  />
                </View>

                <View>
                  <Text style={styles.infoLabel}>
                    TIME
                  </Text>

                  <Text style={styles.infoValue}>
                    5:00 PM Onward
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* ================= FORM ================= */}
        <View style={styles.formWrap}>
          <View style={styles.formHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Your Information
              </Text>

              <Text style={styles.sectionSubtitle}>
                Please provide accurate details for registration.
              </Text>
            </View>

            <View style={styles.formIcon}>
              <Ionicons
                name="person-add-outline"
                size={21}
                color={COLORS.blue}
              />
            </View>
          </View>

          {/* FULL NAME */}
          <Text style={styles.label}>
            Full Name
          </Text>

          <View style={styles.inputWrapper}>
            <Ionicons
              name="person-outline"
              size={18}
              color={COLORS.muted}
              style={styles.inputIcon}
            />

            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="#8A96B5"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />
          </View>

          {/* PHONE */}
          <Text style={styles.label}>
            Phone Number
          </Text>

          <View style={styles.inputWrapper}>
            <Ionicons
              name="call-outline"
              size={18}
              color={COLORS.muted}
              style={styles.inputIcon}
            />

            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              placeholderTextColor="#8A96B5"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          {/* EMERGENCY */}
          <Text style={styles.label}>
            Emergency Contact
          </Text>

          <View style={styles.inputWrapper}>
            <Ionicons
              name="shield-checkmark-outline"
              size={18}
              color={COLORS.muted}
              style={styles.inputIcon}
            />

            <TextInput
              style={styles.input}
              placeholder="Enter emergency contact"
              placeholderTextColor="#8A96B5"
              keyboardType="phone-pad"
              value={emergencyContact}
              onChangeText={setEmergencyContact}
            />
          </View>

          {/* MESSAGE */}
          <Text style={styles.label}>
            Any Message{" "}
            <Text style={styles.optional}>
              (Optional)
            </Text>
          </Text>

          <View
            style={[
              styles.inputWrapper,
              styles.messageWrapper,
            ]}
          >
            <Ionicons
              name="chatbubble-outline"
              size={18}
              color={COLORS.muted}
              style={styles.messageIcon}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Type your message..."
              placeholderTextColor="#8A96B5"
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={4}
            />
          </View>

          {/* TERMS */}
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setAgreed((previous) => !previous)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.checkbox,
                agreed && styles.checkboxChecked,
              ]}
            >
              {agreed && (
                <Ionicons
                  name="checkmark"
                  size={14}
                  color={COLORS.white}
                />
              )}
            </View>

            <Text style={styles.checkboxText}>
              I agree to the terms & conditions
            </Text>
          </TouchableOpacity>

          {/* REGISTER */}
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            activeOpacity={0.85}
          >
            <Text style={styles.registerButtonText}>
              Confirm Registration
            </Text>

            <View style={styles.buttonArrow}>
              <Ionicons
                name="arrow-forward"
                size={17}
                color={COLORS.blue}
              />
            </View>
          </TouchableOpacity>

          {/* SECURITY */}
          <View style={styles.securityNote}>
            <Ionicons
              name="lock-closed-outline"
              size={15}
              color={COLORS.muted}
            />

            <Text style={styles.securityText}>
              Your information is used only for event registration.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    paddingBottom: 40,
  },

  /* ================= HERO ================= */

  hero: {
    backgroundColor: COLORS.navy,
    paddingTop: 14,
    paddingHorizontal: 20,
    paddingBottom: 32,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: "hidden",
    position: "relative",
  },

  heroCircleOne: {
    position: "absolute",
    width: 190,
    height: 190,
    borderRadius: 95,
    right: -95,
    top: -80,
    backgroundColor: "#3D72C4",
    opacity: 0.24,
  },

  heroCircleTwo: {
    position: "absolute",
    width: 145,
    height: 145,
    borderRadius: 72.5,
    left: -75,
    bottom: -78,
    backgroundColor: "#2A5CA8",
    opacity: 0.30,
  },

  heroTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 52,
    zIndex: 10,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.10)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },

  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },

  logo: {
    width: 105,
    height: 42,
  },

  /* ================= DROPDOWN ================= */

  profileButton: {
    minHeight: 40,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.10)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },

  profileIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 7,
  },

  profileTextWrap: {
    marginRight: 6,
  },

  welcomeText: {
    fontSize: 8,
    color: "#B8C7E6",
    fontWeight: "600",
  },

  volunteerText: {
    fontSize: 11,
    color: COLORS.white,
    fontWeight: "800",
  },

  dropdownMenu: {
    alignSelf: "flex-end",
    width: 215,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    paddingVertical: 7,
    marginTop: 8,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: COLORS.border,

    shadowColor: "#000000",
    shadowOpacity: 0.20,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 7,
    },

    elevation: 10,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 11,
  },

  menuText: {
    marginLeft: 11,
    fontSize: 12,
    color: COLORS.navy,
    fontWeight: "600",
  },

  logoutText: {
    marginLeft: 11,
    fontSize: 12,
    color: "#D64545",
    fontWeight: "700",
  },

  menuDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 4,
    marginHorizontal: 12,
  },

  /* ================= HERO CONTENT ================= */

  heroContent: {
    marginTop: 20,
    zIndex: 2,
  },

  badge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.10)",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    marginBottom: 12,
  },

  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.gold,
    marginRight: 7,
  },

  badgeText: {
    color: COLORS.gold,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.8,
  },

  heroTitle: {
    fontSize: 25,
    fontWeight: "900",
    color: COLORS.white,
    marginBottom: 7,
  },

  heroSubtitle: {
    fontSize: 13,
    color: "#C8D4ED",
    marginBottom: 22,
    lineHeight: 20,
  },

  eventInfoStrip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },

  eventInfoItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  infoIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "rgba(232,197,106,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  infoLabel: {
    color: "#9FB0D1",
    fontSize: 7,
    fontWeight: "800",
    letterSpacing: 0.7,
    marginBottom: 2,
  },

  infoValue: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "700",
  },

  infoDivider: {
    width: 1,
    height: 32,
    backgroundColor: "rgba(255,255,255,0.12)",
    marginHorizontal: 8,
  },

  /* ================= FORM ================= */

  formWrap: {
    paddingHorizontal: 20,
    paddingTop: 27,
  },

  formHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "900",
    color: COLORS.navy,
  },

  sectionSubtitle: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 4,
  },

  formIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.muted,
    marginBottom: 7,
    marginTop: 17,
  },

  optional: {
    fontWeight: "500",
    color: "#8A96B5",
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    minHeight: 49,
    paddingHorizontal: 13,
  },

  inputIcon: {
    marginRight: 9,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.navy,
    paddingVertical: 12,
  },

  messageWrapper: {
    alignItems: "flex-start",
    minHeight: 94,
    paddingTop: 11,
  },

  messageIcon: {
    marginRight: 9,
    marginTop: 2,
  },

  textArea: {
    height: 78,
    textAlignVertical: "top",
    paddingTop: 1,
  },

  /* ================= CHECKBOX ================= */

  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  checkboxChecked: {
    backgroundColor: COLORS.blue,
    borderColor: COLORS.blue,
  },

  checkboxText: {
    fontSize: 12,
    color: COLORS.muted,
    fontWeight: "500",
  },

  /* ================= BUTTON ================= */

  registerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.blue,
    borderRadius: 14,
    paddingVertical: 15,
    marginTop: 25,

    shadowColor: COLORS.blue,
    shadowOpacity: 0.28,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 4,
  },

  registerButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "800",
  },

  buttonArrow: {
    width: 27,
    height: 27,
    borderRadius: 9,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 9,
  },

  /* ================= SECURITY ================= */

  securityNote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 17,
    paddingHorizontal: 10,
  },

  securityText: {
    fontSize: 10,
    color: COLORS.muted,
    marginLeft: 6,
    textAlign: "center",
  },
});