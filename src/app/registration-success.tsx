import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const COLORS = {
  navy: "#071A3A",
  blue: "#2F6BFF",
  gold: "#E8C56A",
  white: "#FFFFFF",
  background: "#F4F7FC",
  muted: "#5A6B8C",
  border: "#E3E7F2",
  success: "#22C55E",
};

export default function RegistrationSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* HERO */}
        <View style={styles.hero}>
          <View style={styles.heroCircleOne} />
          <View style={styles.heroCircleTwo} />

          <View style={styles.badge}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>REGISTRATION CONFIRMED</Text>
          </View>

          <View style={styles.iconCircle}>
            <Ionicons name="checkmark" size={48} color="#FFFFFF" />
          </View>

          <Text style={styles.heroTitle}>You're Registered!</Text>
          <Text style={styles.heroSubtitle}>
            Your registration was completed successfully.
          </Text>
        </View>

        {/* INFO CARD */}
        <View style={styles.content}>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoIconWrap}>
                <Ionicons name="mail-outline" size={17} color={COLORS.blue} />
              </View>
              <Text style={styles.infoText}>
                A confirmation has been noted for your registration.
              </Text>
            </View>

            <View style={[styles.infoRow, { marginBottom: 0 }]}>
              <View style={styles.infoIconWrap}>
                <Ionicons name="time-outline" size={17} color={COLORS.blue} />
              </View>
              <Text style={styles.infoText}>
                Please arrive on time with a valid ID.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push("/home" as any)}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryButtonText}>Back to Home</Text>
          <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push("/my-events" as any)}
          activeOpacity={0.7}
        >
          <Text style={styles.secondaryButtonText}>View My Events</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
  },

  /* HERO */
  hero: {
    backgroundColor: COLORS.navy,
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 46,
    paddingHorizontal: 24,
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
    right: -80,
    top: -80,
    backgroundColor: "#16366F",
    opacity: 0.6,
  },
  heroCircleTwo: {
    position: "absolute",
    width: 130,
    height: 130,
    borderRadius: 65,
    left: -70,
    bottom: -50,
    backgroundColor: "#0E2A5B",
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
    marginBottom: 22,
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
  iconCircle: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: COLORS.success,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: COLORS.success,
    shadowOpacity: 0.4,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.white,
    marginBottom: 8,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 13,
    color: "#C8D4ED",
    textAlign: "center",
    lineHeight: 19,
  },

  /* INFO CARD */
  content: {
    paddingHorizontal: 24,
    marginTop: -24,
  },
  infoCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
    gap: 12,
  },
  infoIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#EAF1FF",
    alignItems: "center",
    justifyContent: "center",
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.muted,
    lineHeight: 19,
    marginTop: 6,
  },

  /* FOOTER */
  footer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 30,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.blue,
    borderRadius: 14,
    paddingVertical: 16,
    marginBottom: 12,
    gap: 8,
    shadowColor: COLORS.blue,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryButton: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  secondaryButtonText: {
    color: "#334155",
    fontSize: 15,
    fontWeight: "600",
  },
});