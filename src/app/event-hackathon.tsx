import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function EventHackathonScreen() {
  const router = useRouter();

  const openMap = () => {
    Linking.openURL(
      "https://www.google.com/maps/search/?api=1&query=Expo%20Center%20Karachi"
    ).catch((error) => {
      console.log("Map error:", error);
    });
  };

  const handleRegister = () => {
    router.push("/register" as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color="#071A3A"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Event Details</Text>

          <View style={styles.headerSpace} />
        </View>

        {/* EVENT IMAGE */}
        <Image
          source={{
            uri:
              "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1000",
          }}
          style={styles.banner}
          resizeMode="cover"
        />

        {/* EVENT TITLE */}
        <Text style={styles.title}>
          Alibaba Hackathon
        </Text>

        <Text style={styles.subtitle}>
          With Alkhidmat Internship Ending Ceremony
        </Text>

        {/* EVENT INFORMATION */}
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.iconBox}>
              <Ionicons
                name="location-outline"
                size={20}
                color="#2F6BFF"
              />
            </View>

            <View style={styles.infoDetails}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>
                Expo Center, Karachi
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconBox}>
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#2F6BFF"
              />
            </View>

            <View style={styles.infoDetails}>
              <Text style={styles.infoLabel}>Date</Text>
              <Text style={styles.infoValue}>
                29 Sep 2026 (Tuesday)
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconBox}>
              <Ionicons
                name="time-outline"
                size={20}
                color="#2F6BFF"
              />
            </View>

            <View style={styles.infoDetails}>
              <Text style={styles.infoLabel}>Time</Text>
              <Text style={styles.infoValue}>
                5:00 PM Onward
              </Text>
            </View>
          </View>

          <View style={styles.lastInfoRow}>
            <View style={styles.iconBox}>
              <Ionicons
                name="people-outline"
                size={20}
                color="#2F6BFF"
              />
            </View>

            <View style={styles.infoDetails}>
              <Text style={styles.infoLabel}>
                Participants
              </Text>

              <Text style={styles.infoValue}>
                Open for all volunteers and interns
              </Text>
            </View>
          </View>
        </View>

        {/* ABOUT EVENT */}
        <Text style={styles.sectionTitle}>
          About Event
        </Text>

        <Text style={styles.description}>
          Join Alkhidmat for a mega evening at Expo Center
          Karachi. The Alibaba Hackathon brings together
          young talent for a night of innovation, followed
          by the closing ceremony of the Alkhidmat
          internship program, celebrating our interns and
          their journey.
        </Text>

        {/* ORGANIZER */}
        <Text style={styles.sectionTitle}>
          Organizer
        </Text>

        <View style={styles.organizerCard}>
          <View style={styles.organizerIcon}>
            <Ionicons
              name="business-outline"
              size={21}
              color="#2F6BFF"
            />
          </View>

          <View style={styles.organizerDetails}>
            <Text style={styles.organizerName}>
              Alkhidmat Foundation Pakistan
            </Text>

            <Text style={styles.organizerRole}>
              Event Organizer
            </Text>
          </View>
        </View>

        {/* VIEW MAP */}
        <TouchableOpacity
          style={styles.mapButton}
          onPress={openMap}
          activeOpacity={0.8}
        >
          <Ionicons
            name="location-outline"
            size={19}
            color="#2F6BFF"
          />

          <Text style={styles.mapButtonText}>
            View Map
          </Text>
        </TouchableOpacity>

        {/* REGISTER */}
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
          activeOpacity={0.8}
        >
          <Text style={styles.registerText}>
            Register Now
          </Text>

          <Ionicons
            name="arrow-forward"
            size={19}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  header: {
    height: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5EAF3",
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#071A3A",
  },

  headerSpace: {
    width: 40,
  },

  banner: {
    width: "100%",
    height: 190,
    borderRadius: 18,
    marginBottom: 18,
    backgroundColor: "#EAF0FF",
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#071A3A",
  },

  subtitle: {
    fontSize: 13,
    lineHeight: 19,
    color: "#64748B",
    marginTop: 5,
    marginBottom: 20,
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5EAF3",
    padding: 15,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 14,
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F7",
  },

  lastInfoRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#EAF0FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  infoDetails: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#94A3B8",
    marginBottom: 3,
  },

  infoValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
    lineHeight: 18,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#071A3A",
    marginTop: 23,
    marginBottom: 8,
  },

  description: {
    fontSize: 13,
    lineHeight: 21,
    color: "#64748B",
  },

  organizerCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E5EAF3",
    padding: 13,
  },

  organizerIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#EAF0FF",
    alignItems: "center",
    justifyContent: "center",
  },

  organizerDetails: {
    flex: 1,
    marginLeft: 11,
  },

  organizerName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#071A3A",
  },

  organizerRole: {
    fontSize: 10,
    color: "#94A3B8",
    marginTop: 3,
  },

  mapButton: {
    height: 50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2F6BFF",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },

  mapButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2F6BFF",
    marginLeft: 7,
  },

  registerButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: "#2F6BFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  registerText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    marginRight: 8,
  },
});