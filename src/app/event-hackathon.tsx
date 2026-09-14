import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const COLORS = {
  navy: "#071A3A",
  navy2: "#0C234F",
  blue: "#2F6BFF",
  blueLight: "#EAF0FF",
  gold: "#E8C56A",
  white: "#FFFFFF",
  background: "#F4F7FC",
  text: "#1E293B",
  muted: "#64748B",
  lightMuted: "#94A3B8",
  border: "#E2E8F0",
  success: "#16A34A",
};

export default function EventHackathonScreen() {
  const router = useRouter();

  const openMap = () => {
    const mapUrl =
      "https://www.google.com/maps/search/?api=1&query=Expo%20Center%20Karachi";

    Linking.openURL(mapUrl).catch((error) => {
      console.log("Map error:", error);
    });
  };

  const handleRegister = () => {
    router.push("/register");
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
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={21} color={COLORS.navy} />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Event Details</Text>
          </View>

          <View style={styles.headerPlaceholder} />
        </View>

        {/* HERO, illustrated graphic instead of a photo */}
        <View style={styles.hero}>
          <View style={styles.heroCircleOne} />
          <View style={styles.heroCircleTwo} />

          {/* subtle circuit-style decoration */}
          <View style={styles.circuitDot1} />
          <View style={styles.circuitDot2} />
          <View style={styles.circuitLineH} />
          <View style={styles.circuitLineV} />

          <View style={styles.heroTop}>
            <View style={styles.badge}>
              <View style={styles.badgeDot} />
              <Text style={styles.badgeText}>FLAGSHIP PROGRAM</Text>
            </View>

            <View style={styles.heroIcon}>
              <Ionicons name="code-slash-outline" size={23} color={COLORS.gold} />
            </View>
          </View>

          <Text style={styles.heroTitle}>Alibaba Hackathon</Text>

          <Text style={styles.heroSubtitle}>
            Innovation • Technology • Youth
          </Text>

          <View style={styles.heroDivider} />

          <Text style={styles.heroDescription}>
            A special innovation event by Alkhidmat bringing
            young talent together with an inspiring internship
            ending ceremony.
          </Text>

          <View style={styles.heroStats}>
            <View style={styles.heroStat}>
              <Ionicons name="calendar-outline" size={17} color={COLORS.gold} />
              <Text style={styles.heroStatValue}>29 SEP</Text>
              <Text style={styles.heroStatLabel}>2026</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.heroStat}>
              <Ionicons name="time-outline" size={17} color={COLORS.gold} />
              <Text style={styles.heroStatValue}>5:00 PM</Text>
              <Text style={styles.heroStatLabel}>Onward</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.heroStat}>
              <Ionicons name="location-outline" size={17} color={COLORS.gold} />
              <Text style={styles.heroStatValue}>KARACHI</Text>
              <Text style={styles.heroStatLabel}>Expo Center</Text>
            </View>
          </View>
        </View>

        {/* QUICK INFO */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Event Information</Text>
          <Text style={styles.sectionHint}>Official details</Text>
        </View>

        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Ionicons name="location-outline" size={21} color={COLORS.blue} />
            </View>
            <Text style={styles.infoLabel}>LOCATION</Text>
            <Text style={styles.infoValue}>Expo Center, Karachi</Text>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Ionicons name="calendar-outline" size={21} color={COLORS.blue} />
            </View>
            <Text style={styles.infoLabel}>DATE</Text>
            <Text style={styles.infoValue}>29 Sep 2026</Text>
            <Text style={styles.infoSmall}>Tuesday</Text>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Ionicons name="time-outline" size={21} color={COLORS.blue} />
            </View>
            <Text style={styles.infoLabel}>TIME</Text>
            <Text style={styles.infoValue}>5:00 PM</Text>
            <Text style={styles.infoSmall}>Onward</Text>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Ionicons name="people-outline" size={21} color={COLORS.blue} />
            </View>
            <Text style={styles.infoLabel}>PARTICIPANTS</Text>
            <Text style={styles.infoValue}>Volunteers & Interns</Text>
          </View>
        </View>

        {/* ABOUT */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>About This Event</Text>
        </View>

        <View style={styles.aboutCard}>
          <View style={styles.aboutAccent} />
          <View style={styles.aboutContent}>
            <View style={styles.aboutHeadingRow}>
              <View style={styles.aboutIcon}>
                <Ionicons name="bulb-outline" size={21} color={COLORS.gold} />
              </View>
              <Text style={styles.aboutHeading}>Innovation & Celebration</Text>
            </View>

            <Text style={styles.description}>
              Join Alkhidmat for a special evening at Expo Center
              Karachi. The Alibaba Hackathon provides an opportunity
              for young talent to explore technology, creativity and
              innovative ideas.
            </Text>

            <Text style={[styles.description, styles.descriptionGap]}>
              The event will also feature the ending ceremony of
              the Alkhidmat internship program, celebrating the
              achievements and journey of participating interns.
            </Text>
          </View>
        </View>

        {/* ORGANIZER */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Organizer</Text>
        </View>

        <View style={styles.organizerCard}>
          <View style={styles.organizerLogo}>
            <Ionicons name="business-outline" size={25} color={COLORS.blue} />
          </View>

          <View style={styles.organizerDetails}>
            <Text style={styles.organizerName}>Alkhidmat Foundation Pakistan</Text>
            <Text style={styles.organizerRole}>Official Event Organizer</Text>
          </View>

          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={19} color={COLORS.success} />
          </View>
        </View>

        {/* MAP */}
        <TouchableOpacity style={styles.mapButton} onPress={openMap} activeOpacity={0.8}>
          <View style={styles.mapIcon}>
            <Ionicons name="map-outline" size={20} color={COLORS.blue} />
          </View>

          <View style={styles.mapTextContainer}>
            <Text style={styles.mapTitle}>Expo Center Karachi</Text>
            <Text style={styles.mapSubtitle}>Open location in Google Maps</Text>
          </View>

          <Ionicons name="open-outline" size={18} color={COLORS.blue} />
        </TouchableOpacity>

        {/* REGISTER CARD */}
        <View style={styles.registerCard}>
          <View style={styles.registerTop}>
            <View>
              <Text style={styles.registerTitle}>Ready to participate?</Text>
              <Text style={styles.registerSubtitle}>
                Secure your place in this flagship event.
              </Text>
            </View>

            <View style={styles.registerIcon}>
              <Ionicons name="rocket-outline" size={23} color={COLORS.gold} />
            </View>
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            activeOpacity={0.85}
          >
            <Text style={styles.registerText}>Register Now</Text>
            <Ionicons name="arrow-forward" size={19} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* FOOTER, unchanged */}
        <View style={styles.footer}>
          <Ionicons name="shield-checkmark-outline" size={16} color={COLORS.lightMuted} />
          <Text style={styles.footerText}>Powered by Alkhidmat Volunteer Platform</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingHorizontal: 18, paddingBottom: 45 },

  header: {
    height: 66,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  headerCenter: { flex: 1, alignItems: "center" },
  headerTitle: { fontSize: 16, fontWeight: "800", color: COLORS.navy },
  headerPlaceholder: { width: 42 },

  hero: {
    minHeight: 330,
    borderRadius: 26,
    backgroundColor: COLORS.navy,
    padding: 22,
    overflow: "hidden",
    position: "relative",
    shadowColor: "#071A3A",
    shadowOpacity: 0.2,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 7 },
    elevation: 6,
  },
  heroCircleOne: {
    position: "absolute",
    width: 190,
    height: 190,
    borderRadius: 95,
    right: -85,
    top: -75,
    backgroundColor: "#16366F",
    opacity: 0.65,
  },
  heroCircleTwo: {
    position: "absolute",
    width: 130,
    height: 130,
    borderRadius: 65,
    left: -75,
    bottom: -55,
    backgroundColor: "#0E2A5B",
  },
  circuitDot1: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.gold,
    opacity: 0.7,
    right: 40,
    top: 120,
  },
  circuitDot2: {
    position: "absolute",
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: COLORS.gold,
    opacity: 0.5,
    right: 90,
    top: 150,
  },
  circuitLineH: {
    position: "absolute",
    width: 60,
    height: 1,
    backgroundColor: "rgba(232,197,106,0.35)",
    right: 40,
    top: 123,
  },
  circuitLineV: {
    position: "absolute",
    width: 1,
    height: 30,
    backgroundColor: "rgba(232,197,106,0.35)",
    right: 90,
    top: 123,
  },

  heroTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.10)",
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  badgeDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: COLORS.gold, marginRight: 7 },
  badgeText: { color: COLORS.gold, fontSize: 9, fontWeight: "800", letterSpacing: 0.8 },
  heroIcon: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.10)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  heroTitle: {
    marginTop: 27,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "900",
    color: COLORS.white,
    letterSpacing: -0.5,
  },
  heroSubtitle: { marginTop: 7, fontSize: 13, fontWeight: "600", color: COLORS.gold },
  heroDivider: { height: 1, backgroundColor: "rgba(255,255,255,0.12)", marginVertical: 17 },
  heroDescription: { fontSize: 12, lineHeight: 19, color: "#C8D4ED", maxWidth: 330 },
  heroStats: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 21,
    paddingTop: 17,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.10)",
  },
  heroStat: { flex: 1, alignItems: "center" },
  heroStatValue: { marginTop: 6, fontSize: 10, fontWeight: "800", color: COLORS.white },
  heroStatLabel: { marginTop: 2, fontSize: 9, color: "#9FB0D0" },
  statDivider: { width: 1, height: 35, backgroundColor: "rgba(255,255,255,0.12)" },

  sectionHeader: {
    marginTop: 25,
    marginBottom: 11,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  sectionTitle: { fontSize: 18, fontWeight: "900", color: COLORS.navy },
  sectionHint: { fontSize: 10, fontWeight: "600", color: COLORS.lightMuted },

  infoGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  infoCard: {
    width: "48.3%",
    minHeight: 138,
    backgroundColor: COLORS.white,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginBottom: 11,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  infoLabel: { fontSize: 9, fontWeight: "800", color: COLORS.lightMuted, letterSpacing: 0.5 },
  infoValue: { marginTop: 5, fontSize: 12, lineHeight: 17, fontWeight: "700", color: COLORS.text },
  infoSmall: { marginTop: 2, fontSize: 10, color: COLORS.muted },

  aboutCard: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },
  aboutAccent: { width: 5, backgroundColor: COLORS.blue },
  aboutContent: { flex: 1, padding: 16 },
  aboutHeadingRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  aboutIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  aboutHeading: { flex: 1, fontSize: 14, fontWeight: "800", color: COLORS.navy },
  description: { fontSize: 12, lineHeight: 20, color: COLORS.muted },
  descriptionGap: { marginTop: 10 },

  organizerCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  organizerLogo: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
  },
  organizerDetails: { flex: 1, marginLeft: 12 },
  organizerName: { fontSize: 13, fontWeight: "800", color: COLORS.navy },
  organizerRole: { marginTop: 4, fontSize: 10, color: COLORS.muted },
  verifiedBadge: { marginLeft: 8 },

  mapButton: {
    marginTop: 13,
    minHeight: 67,
    backgroundColor: COLORS.white,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
  },
  mapIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
  },
  mapTextContainer: { flex: 1, marginLeft: 11 },
  mapTitle: { fontSize: 12, fontWeight: "800", color: COLORS.navy },
  mapSubtitle: { marginTop: 3, fontSize: 9, color: COLORS.muted },

  registerCard: {
    marginTop: 20,
    borderRadius: 21,
    backgroundColor: COLORS.navy2,
    padding: 17,
    overflow: "hidden",
  },
  registerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  registerTitle: { fontSize: 16, fontWeight: "900", color: COLORS.white },
  registerSubtitle: { marginTop: 4, fontSize: 10, color: "#AFC0DF" },
  registerIcon: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: "rgba(232,197,106,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  registerButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: COLORS.blue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  registerText: { fontSize: 14, fontWeight: "800", color: COLORS.white, marginRight: 9 },

  footer: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 22 },
  footerText: { marginLeft: 6, fontSize: 9, color: COLORS.lightMuted },
});