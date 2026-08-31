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
  const openBanoQabil = () => router.push("/bano-qabil");
  const openHackathon = () => router.push("/event-hackathon");

  const quickAccessItems = [
    {
      key: "nearby",
      label: "Nearby\nOpportunities",
      icon: "location-outline" as const,
      onPress: openNearby,
      tint: "#EAF0FF",
      iconColor: "#2F6BFF",
    },
    {
      key: "my-events",
      label: "My Events",
      icon: "calendar-outline" as const,
      onPress: openMyEvents,
      tint: "#F3EAFF",
      iconColor: "#8B5CF6",
    },
    {
      key: "scan",
      label: "Scan QR\nAttendance",
      icon: "qr-code-outline" as const,
      onPress: openScan,
      tint: "#FFF1E6",
      iconColor: "#F97316",
    },
    {
      key: "certificates",
      label: "Certificates",
      icon: "document-text-outline" as const,
      onPress: openCertificates,
      tint: "#E8FBF0",
      iconColor: "#22C55E",
    },
    {
      key: "assistant",
      label: "AI Assistant",
      icon: "sparkles-outline" as const,
      onPress: openAssistant,
      tint: "#FDEAF6",
      iconColor: "#EC4899",
    },
    {
      key: "bano-qabil",
      label: "Bano Qabil",
      icon: "school-outline" as const,
      onPress: openBanoQabil,
      tint: "#FFF7E0",
      iconColor: "#D4A017",
    },
  ];

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

            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.bellButton} activeOpacity={0.7}>
                <Ionicons name="notifications-outline" size={20} color="#334155" />
                <View style={styles.bellDot} />
              </TouchableOpacity>

              <View style={styles.avatar}>
                <Image
                  source={require("../../assets/images/alkhidmat-logo.png")}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>

          {/* BANNER — Explore Events opens the Hackathon page */}
          <View style={styles.banner}>
            <Image
              source={require("../../assets/images/home-banner.jpg")}
              style={styles.bannerImage}
              resizeMode="cover"
            />

            <View style={styles.bannerOverlay}>
              <View style={styles.bannerBadge}>
                <Ionicons name="heart" size={11} color="#FFFFFF" />
                <Text style={styles.bannerBadgeText}>Volunteer Program</Text>
              </View>

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
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Quick Access</Text>
          </View>

          <View style={styles.grid}>
            {quickAccessItems.map((item) => (
              <TouchableOpacity
                key={item.key}
                style={styles.card}
                onPress={item.onPress}
                activeOpacity={0.8}
              >
                <View style={[styles.iconCircle, { backgroundColor: item.tint }]}>
                  <Ionicons name={item.icon} size={22} color={item.iconColor} />
                </View>
                <Text style={styles.cardText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  greeting: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 3,
  },
  welcome: {
    fontSize: 21,
    fontWeight: "800",
    color: "#071A3A",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  bellButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5EAF3",
  },
  bellDot: {
    position: "absolute",
    top: 10,
    right: 11,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#EF4444",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5EAF3",
  },
  logo: {
    width: 40,
    height: 40,
  },
  banner: {
    width: "100%",
    height: 195,
    borderRadius: 22,
    overflow: "hidden",
    marginBottom: 28,
    backgroundColor: "#0B2A5B",
    shadowColor: "#0B2A5B",
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  bannerOverlay: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 22,
    backgroundColor: "rgba(6, 20, 46, 0.6)",
  },
  bannerBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 10,
    gap: 5,
  },
  bannerBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  bannerTitle: {
    fontSize: 25,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: "#E2E8F0",
    marginBottom: 16,
  },
  exploreButton: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2F6BFF",
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 12,
    shadowColor: "#2F6BFF",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  exploreText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
    marginRight: 6,
  },
  sectionHeaderRow: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#071A3A",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "31.5%",
    minHeight: 116,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: "#EEF2F7",
    shadowColor: "#0F172A",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 11,
    lineHeight: 15,
    color: "#334155",
    textAlign: "center",
    fontWeight: "600",
  },
});