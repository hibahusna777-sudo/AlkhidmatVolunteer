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

export default function HomeScreen() {
  const router = useRouter();

  const openScan = () => router.push("/scan");
  const openMyEvents = () => router.push("/my-events");
  const openAssistant = () => router.push("/assistant");
  const openNearby = () => router.push("/nearby");
  const openCertificates = () => router.push("/certificates");
  const openBanoQabil = () => router.push("/flagship-program");

  // Explore Events → Hackathon/Event screen
  const openHackathon = () => router.push("/event-hackathon");

  const openAlkhidmatWebsite = () => {
    Linking.openURL("https://alkhidmat.org/");
  };

  const features = [
    {
      key: "qr",
      icon: "qr-code-outline" as const,
      title: "QR Attendance\n& Certificates",
      description:
        "Mark attendance via QR codes and earn certificates.",
      onPress: openScan,
    },
    {
      key: "my-events",
      icon: "calendar-outline" as const,
      title: "My Events",
      description:
        "Track events you've joined and find new ones.",
      onPress: openMyEvents,
    },
    {
      key: "assistant",
      icon: "chatbubbles-outline" as const,
      title: "AI Assistant",
      description:
        "Get quick guidance and answers when you need it.",
      onPress: openAssistant,
    },
    {
      key: "nearby",
      icon: "location-outline" as const,
      title: "Nearby\nOpportunities",
      description:
        "Discover volunteering opportunities close to you.",
      onPress: openNearby,
    },
    {
      key: "certificates",
      icon: "ribbon-outline" as const,
      title: "Certificates",
      description:
        "View and download certificates you've earned.",
      onPress: openCertificates,
    },
    {
      key: "flagship",
      icon: "school-outline" as const,
      title: "Flagship Program",
      description:
        "Explore free IT training and skill development.",
      onPress: openBanoQabil,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* ================= HERO ================= */}
        <View style={styles.hero}>

          {/* Full banner image */}
          <Image
            source={require("../../assets/images/opportunities/50-years-banner.jpg")}
            style={styles.heroImage}
            resizeMode="cover"
          />

          {/* Dark overlay for readable text */}
          <View style={styles.heroOverlay} />

          {/* Hero content */}
          <View style={styles.heroContent}>

            {/* Top row */}
            <View style={styles.topRow}>

              {/* Logo */}
              <View style={styles.logoBadge}>
                <Image
                  source={require("../../assets/images/alkhidmat-logo.png")}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>

              {/* Notification */}
              <TouchableOpacity
                style={styles.bellButton}
                activeOpacity={0.7}
              >
                <Ionicons
                  name="notifications-outline"
                  size={19}
                  color="#FFFFFF"
                />
                <View style={styles.bellDot} />
              </TouchableOpacity>

            </View>

            {/* Greeting */}
            <View style={styles.heroTextArea}>
              <Text style={styles.greeting}>
                Assalam o Alaikum, Welcome back!
              </Text>

              <Text style={styles.heroTitle}>
                Empowering Communities{"\n"}
                <Text style={styles.heroTitleAccent}>
                  Through Volunteering
                </Text>
              </Text>

              <Text style={styles.heroParagraph}>
                Join meaningful opportunities and make a positive
                difference in your community.
              </Text>

              {/* Explore button */}
              <TouchableOpacity
                style={styles.exploreButton}
                onPress={openHackathon}
                activeOpacity={0.85}
              >
                <Text style={styles.exploreText}>
                  Explore Events
                </Text>

                <Ionicons
                  name="arrow-forward"
                  size={16}
                  color="#0B2A5B"
                />
              </TouchableOpacity>
            </View>

          </View>
        </View>

        {/* ================= INTRO ================= */}
        <View style={styles.introRow}>
          <Ionicons
            name="people"
            size={18}
            color="#0B2A5B"
          />

          <Text style={styles.introText}>
            We spoke with volunteers and found key challenges.
            Here's what can{" "}
            <Text style={styles.introAccent}>
              help you
            </Text>
            :
          </Text>
        </View>

        {/* ================= FEATURE CARDS ================= */}
        <View style={styles.featureGrid}>
          {features.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={styles.featureCard}
              onPress={item.onPress}
              activeOpacity={0.8}
            >
              <View style={styles.featureIconCircle}>
                <Ionicons
                  name={item.icon}
                  size={22}
                  color="#FFFFFF"
                />
              </View>

              <Text style={styles.featureTitle}>
                {item.title}
              </Text>

              <Text style={styles.featureDescription}>
                {item.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ================= CTA ================= */}
        <View style={styles.ctaBand}>

          <Text style={styles.ctaHeadline}>
            Which feature would be{"\n"}
            <Text style={styles.ctaHeadlineAccent}>
              most useful
            </Text>{" "}
            to you?
          </Text>

          <TouchableOpacity
            style={styles.ctaButton}
            onPress={openAlkhidmatWebsite}
            activeOpacity={0.85}
          >
            <Ionicons
              name="globe-outline"
              size={16}
              color="#0B2A5B"
            />

            <Text style={styles.ctaButtonTextBold}>
              Visit Alkhidmat.org
            </Text>
          </TouchableOpacity>

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
    paddingBottom: 20,
  },

  /* ================= HERO ================= */

  hero: {
    marginHorizontal: 16,
    marginTop: 12,
    height: 280,
    borderRadius: 24,
    overflow: "hidden",
    position: "relative",
    backgroundColor: "#0B2A5B",
  },

  // Image fills the COMPLETE banner
  heroImage: {
    ...StyleSheet.absoluteFill,
    width: "100%",
    height: "100%",
  },

  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(6, 20, 46, 0.30)",
  },

  heroContent: {
    flex: 1,
    padding: 20,
    position: "relative",
    zIndex: 2,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logoBadge: {
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 42,
    height: 42,
  },

  bellButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },

  bellDot: {
    position: "absolute",
    top: 9,
    right: 10,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#F97316",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },

  heroTextArea: {
    marginTop: "auto",
  },

  greeting: {
    fontSize: 13,
    color: "#F1F5F9",
    marginBottom: 6,
  },

  heroTitle: {
    fontSize: 23,
    fontWeight: "800",
    color: "#FFFFFF",
    lineHeight: 29,
    marginBottom: 7,
  },

  heroTitleAccent: {
    color: "#FBBF24",
  },

  heroParagraph: {
    fontSize: 12,
    color: "#E2E8F0",
    lineHeight: 18,
    marginBottom: 14,
    maxWidth: 300,
  },

  exploreButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#FBBF24",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },

  exploreText: {
    color: "#0B2A5B",
    fontSize: 13,
    fontWeight: "800",
  },

  /* ================= INTRO ================= */

  introRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    paddingHorizontal: 20,
    marginTop: 22,
    marginBottom: 16,
  },

  introText: {
    flex: 1,
    fontSize: 13,
    color: "#334155",
    lineHeight: 19,
    fontWeight: "600",
  },

  introAccent: {
    color: "#2F6BFF",
    fontWeight: "800",
  },

  /* ================= FEATURE GRID ================= */

  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    gap: 12,
  },

  featureCard: {
    width: "47%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: "#EEF2F7",

    shadowColor: "#0F172A",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 2,
  },

  featureIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#2F6BFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  featureTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0B2A5B",
    marginBottom: 5,
    lineHeight: 17,
  },

  featureDescription: {
    fontSize: 11,
    color: "#64748B",
    lineHeight: 15,
  },

  /* ================= CTA ================= */

  ctaBand: {
    backgroundColor: "#0B2A5B",
    marginTop: 24,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },

  ctaHeadline: {
    fontSize: 17,
    fontWeight: "800",
    color: "#FFFFFF",
    lineHeight: 23,
    marginBottom: 14,
  },

  ctaHeadlineAccent: {
    color: "#FBBF24",
  },

  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FBBF24",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignSelf: "flex-start",
  },

  ctaButtonTextBold: {
    fontSize: 12,
    color: "#0B2A5B",
    fontWeight: "800",
  },
});