import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  const openNearby = () => router.push("/nearby");
  const openMyEvents = () => router.push("/my-events");
  const openScan = () => router.push("/scan");
  const openCertificates = () => router.push("/certificates");
  const openAssistant = () => router.push("/assistant");
  const openHackathon = () => router.push("/event-hackathon");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.page}>
          {/* HEADER */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Assalam o Alaikum,</Text>
              <Text style={styles.welcome}>Welcome back!</Text>
            </View>

            <View style={styles.avatar}>
              <Image
                source={require("../../assets/images/alkhidmat-logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
          </View>

          {/* BANNER */}
          <View style={styles.banner}>
            <Image
              source={require("../../assets/images/home-banner.jpg")}
              style={styles.bannerImage}
              resizeMode="cover"
            />

            <View style={styles.bannerOverlay}>
              <Text style={styles.bannerTitle}>Make an Impact</Text>
              <Text style={styles.bannerSubtitle}>
                Join hands for a better tomorrow
              </Text>

              <TouchableOpacity
                style={styles.exploreButton}
                onPress={openHackathon}
                activeOpacity={0.85}
              >
                <Text style={styles.exploreText}>Explore Events</Text>
                <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* QUICK ACCESS */}
          <Text style={styles.sectionTitle}>Quick Access</Text>

          <View style={styles.grid}>
            <TouchableOpacity style={styles.card} onPress={openNearby} activeOpacity={0.8}>
              <View style={styles.iconCircle}>
                <Ionicons name="location-outline" size={23} color="#2F6BFF" />
              </View>
              <Text style={styles.cardText}>Nearby{"\n"}Opportunities</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={openMyEvents} activeOpacity={0.8}>
              <View style={styles.iconCircle}>
                <Ionicons name="calendar-outline" size={23} color="#2F6BFF" />
              </View>
              <Text style={styles.cardText}>My Events</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={openScan} activeOpacity={0.8}>
              <View style={styles.iconCircle}>
                <Ionicons name="qr-code-outline" size={23} color="#2F6BFF" />
              </View>
              <Text style={styles.cardText}>Scan QR{"\n"}Attendance</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={openCertificates} activeOpacity={0.8}>
              <View style={styles.iconCircle}>
                <Ionicons name="document-text-outline" size={23} color="#2F6BFF" />
              </View>
              <Text style={styles.cardText}>Certificates</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={openAssistant} activeOpacity={0.8}>
              <View style={styles.iconCircle}>
                <Ionicons name="sparkles-outline" size={23} color="#2F6BFF" />
              </View>
              <Text style={styles.cardText}>AI Assistant</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={openHackathon} activeOpacity={0.8}>
              <View style={styles.iconCircle}>
                <Ionicons name="trophy-outline" size={23} color="#2F6BFF" />
              </View>
              <Text style={styles.cardText}>Hackathon{"\n"}Event</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  scrollContent: {
    paddingBottom: 30,
  },

  page: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 12,
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  greeting: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 3,
  },

  welcome: {
    fontSize: 20,
    fontWeight: "800",
    color: "#071A3A",
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5EAF3",
  },

  logo: {
    width: 44,
    height: 44,
  },

  /* BANNER */

  banner: {
    width: "100%",
    height: 175,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 25,
    backgroundColor: "#DCE6FF",
  },

  bannerImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },

  bannerOverlay: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(7, 26, 58, 0.55)",
  },

  bannerTitle: {
    fontSize: 23,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 5,
  },

  bannerSubtitle: {
    fontSize: 13,
    color: "#E2E8F0",
    marginBottom: 15,
  },

  exploreButton: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2F6BFF",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },

  exploreText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
    marginRight: 6,
  },

  /* QUICK ACCESS */

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#071A3A",
    marginBottom: 14,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "31.5%",
    minHeight: 112,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#EEF2F7",
    elevation: 2,
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },

  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#EAF0FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 9,
  },

  cardText: {
    fontSize: 11,
    lineHeight: 15,
    color: "#334155",
    textAlign: "center",
    fontWeight: "600",
  },
});