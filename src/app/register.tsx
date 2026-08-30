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

const BRAND_BLUE = "#2F6BFF";

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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={24} color="#071A3A" />
        </TouchableOpacity>
        <View style={styles.headerTitleRow}>
          <Ionicons name="notifications" size={20} color={BRAND_BLUE} />
          <Text style={styles.headerTitle}> REGISTER</Text>
        </View>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.pageTitle}>Register for Event</Text>
        <Text style={styles.pageSubtitle}>
          Fill in your details to confirm your spot
        </Text>

        {/* Event Card — Alibaba Hackathon */}
        <View style={styles.eventCard}>
          <Image
            source={require("../../assets/images/opportunities/hackathon.jpg")}
            style={styles.eventImage}
            resizeMode="cover"
          />

          <View style={styles.eventInfoBlock}>
            <Text style={styles.eventTitle}>Alibaba Hackathon</Text>

            <View style={styles.eventRow}>
              <Ionicons name="location-outline" size={14} color="#5A6B8C" />
              <Text style={styles.eventRowText}>Expo Center, Karachi</Text>
            </View>

            <View style={styles.eventRow}>
              <Ionicons name="calendar-outline" size={14} color="#5A6B8C" />
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

        {/* Form */}
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
          activeOpacity={0.8}
        >
          <Text style={styles.registerButtonText}>Register Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#071A3A",
    letterSpacing: 0.5,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#071A3A",
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 13,
    color: "#5A6B8C",
    marginBottom: 20,
  },
  eventCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E3E7F2",
    borderRadius: 16,
    padding: 12,
    marginBottom: 24,
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
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
    color: "#071A3A",
    marginBottom: 4,
  },
  eventRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  eventRowText: {
    fontSize: 12,
    color: "#5A6B8C",
    marginLeft: 5,
  },
  eventDetailsLink: {
    fontSize: 12,
    color: BRAND_BLUE,
    fontWeight: "600",
    marginTop: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: "#5A6B8C",
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    backgroundColor: "#F8F9FC",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E3E7F2",
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 14,
    color: "#071A3A",
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
    borderColor: BRAND_BLUE,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: BRAND_BLUE,
    borderColor: BRAND_BLUE,
  },
  checkboxText: {
    fontSize: 13,
    color: "#5A6B8C",
  },
  registerButton: {
    backgroundColor: BRAND_BLUE,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 26,
    shadowColor: BRAND_BLUE,
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