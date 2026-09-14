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

  const handleRegister = () => {
    if (!fullName || !phoneNumber || !emergencyContact) {
      Alert.alert("Missing Information", "Please fill all required fields.");
      return;
    }
    if (!agreed) {
      Alert.alert("Terms Required", "Please agree to the terms & conditions.");
      return;
    }

    // TODO: yahan apna API call / Firebase submit logic lagayein
    router.push("/registration-success" as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO */}
        <View style={styles.hero}>
          <View style={styles.heroCircleOne} />
          <View style={styles.heroCircleTwo} />

          <View style={styles.heroTop}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-back" size={20} color={COLORS.navy} />
            </TouchableOpacity>

            <View style={styles.badge}>
              <View style={styles.badgeDot} />
              <Text style={styles.badgeText}>EVENT REGISTRATION</Text>
            </View>

            <View style={{ width: 40 }} />
          </View>

          <Text style={styles.heroTitle}>Register for the Event</Text>
          <Text style={styles.heroSubtitle}>
            Fill in your details to confirm your spot
          </Text>

          {/* EVENT MINI CARD, floats at the bottom of the hero */}
          <View style={styles.eventCard}>
            <Image
              source={require("../../assets/images/opportunities/hackathon.jpg")}
              style={styles.eventImage}
              resizeMode="cover"
            />

            <View style={styles.eventInfoBlock}>
              <Text style={styles.eventTitle}>Alibaba Hackathon</Text>

              <View style={styles.eventRow}>
                <Ionicons name="location-outline" size={13} color={COLORS.muted} />
                <Text style={styles.eventRowText}>Expo Center, Karachi</Text>
              </View>

              <View style={styles.eventRow}>
                <Ionicons name="calendar-outline" size={13} color={COLORS.muted} />
                <Text style={styles.eventRowText}>
                  29 Sep 2026 | 5:00 PM Onward
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => router.push("/event-hackathon" as any)}
                activeOpacity={0.7}
              >
                <Text style={styles.eventDetailsLink}>Event Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* FORM */}
        <View style={styles.formWrap}>
          <Text style={styles.sectionTitle}>Your Information</Text>

          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#8A96B5"
            value={fullName}
            onChangeText={setFullName}
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            placeholderTextColor="#8A96B5"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />

          <Text style={styles.label}>Emergency Contact</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter emergency contact"
            placeholderTextColor="#8A96B5"
            keyboardType="phone-pad"
            value={emergencyContact}
            onChangeText={setEmergencyContact}
          />

          <Text style={styles.label}>Any Message (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Type your message..."
            placeholderTextColor="#8A96B5"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
          />

          {/* Checkbox */}
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setAgreed(!agreed)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
              {agreed && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
            </View>
            <Text style={styles.checkboxText}>
              I agree to the terms & conditions
            </Text>
          </TouchableOpacity>

          {/* Register Button */}
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            activeOpacity={0.85}
          >
            <Text style={styles.registerButtonText}>Confirm Registration</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>
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

  /* HERO */
  hero: {
    backgroundColor: COLORS.navy,
    paddingTop: 14,
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: "hidden",
    position: "relative",
  },
  heroCircleOne: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    right: -70,
    top: -60,
    backgroundColor: "#16366F",
    opacity: 0.6,
  },
  heroCircleTwo: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    left: -60,
    bottom: -40,
    backgroundColor: "#0E2A5B",
  },
  heroTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
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
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.10)",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
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
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.white,
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 13,
    color: "#C8D4ED",
    marginBottom: 22,
  },

  eventCard: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 12,
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  eventImage: {
    width: 64,
    height: 64,
    borderRadius: 10,
    marginRight: 12,
  },
  eventInfoBlock: {
    flex: 1,
    justifyContent: "center",
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.navy,
    marginBottom: 4,
  },
  eventRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  eventRowText: {
    fontSize: 12,
    color: COLORS.muted,
    marginLeft: 5,
  },
  eventDetailsLink: {
    fontSize: 12,
    color: COLORS.blue,
    fontWeight: "600",
    marginTop: 4,
  },

  /* FORM */
  formWrap: {
    paddingHorizontal: 20,
    paddingTop: 26,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.navy,
    marginBottom: 14,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.muted,
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 14,
    color: COLORS.navy,
  },
  textArea: {
    height: 90,
    textAlignVertical: "top",
  },
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
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: COLORS.blue,
    borderColor: COLORS.blue,
  },
  checkboxText: {
    fontSize: 13,
    color: COLORS.muted,
  },
  registerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.blue,
    borderRadius: 14,
    paddingVertical: 16,
    marginTop: 26,
    gap: 8,
    shadowColor: COLORS.blue,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});