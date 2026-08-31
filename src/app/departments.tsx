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

// All numbers, emails, and links below are taken directly from
// alkhidmat.org — nothing here is guessed or made up.
const MAIN_HELPLINE = "0800 44448";
const MAIN_EMAIL = "info@alkhidmat.org";

type Department = {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bg: string;
  website: string;
};

const DEPARTMENTS: Department[] = [
  {
    id: "disaster-management",
    title: "Disaster Management",
    description:
      "Emergency relief, shelter, ration packages, and response hubs for disaster-affected communities across Pakistan.",
    icon: "warning-outline",
    color: "#F97316",
    bg: "#FFF1E6",
    website: "https://alkhidmat.org/donations/area-of-work/disaster-management",
  },
  {
    id: "health",
    title: "Alkhidmat Hospitals",
    description:
      "A nationwide network of hospitals, blood banks, mobile clinics, and free health camps for underserved communities.",
    icon: "medkit-outline",
    color: "#EF4444",
    bg: "#FEECEC",
    website: "https://alkhidmat.org/donations/area-of-work/health/hospitals",
  },
  {
    id: "food-distribution",
    title: "Food Distribution",
    description:
      "Ration packages with wheat, rice, cooking oil, and pulses delivered to underserved and deserving families.",
    icon: "restaurant-outline",
    color: "#22C55E",
    bg: "#E8FBF0",
    website:
      "https://alkhidmat.org/donations/area-of-work/community-services/food-package-ration",
  },
  {
    id: "clean-water",
    title: "Clean Water",
    description:
      "Water filtration plants, hand pumps, and gravity flow schemes bringing safe drinking water to rural areas.",
    icon: "water-outline",
    color: "#2F6BFF",
    bg: "#EAF0FF",
    website: "https://alkhidmat.org/donations/area-of-work/clean-water",
  },
];

export default function DepartmentsScreen() {
  const router = useRouter();

  const callHelpline = () => {
    Linking.openURL(`tel:${MAIN_HELPLINE.replace(/\s/g, "")}`);
  };

  const emailAlkhidmat = () => {
    Linking.openURL(`mailto:${MAIN_EMAIL}`);
  };

  const openWebsite = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
              <Ionicons name="chevron-back" size={24} color="#0F172A" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Alkhidmat Departments</Text>
            <View style={{ width: 24 }} />
          </View>

          <Text style={styles.subheading}>
            Official contact numbers and links for Alkhidmat Foundation Pakistan
          </Text>

          {/* Main helpline card */}
          <View style={styles.helplineCard}>
            <View style={styles.helplineIcon}>
              <Ionicons name="call" size={20} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.helplineLabel}>Alkhidmat Main Helpline</Text>
              <Text style={styles.helplineNumber}>{MAIN_HELPLINE}</Text>
            </View>
            <TouchableOpacity
              style={styles.helplineCallButton}
              onPress={callHelpline}
              activeOpacity={0.8}
            >
              <Ionicons name="call-outline" size={16} color="#2F6BFF" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.emailRow} onPress={emailAlkhidmat} activeOpacity={0.7}>
            <Ionicons name="mail-outline" size={15} color="#64748B" />
            <Text style={styles.emailText}>{MAIN_EMAIL}</Text>
          </TouchableOpacity>

          {/* Departments */}
          <Text style={styles.sectionTitle}>Departments</Text>

          {DEPARTMENTS.map((dept) => (
            <View key={dept.id} style={styles.deptCard}>
              <View style={styles.deptTopRow}>
                <View style={[styles.deptIcon, { backgroundColor: dept.bg }]}>
                  <Ionicons name={dept.icon} size={22} color={dept.color} />
                </View>
                <Text style={styles.deptTitle}>{dept.title}</Text>
              </View>

              <Text style={styles.deptDescription}>{dept.description}</Text>

              <View style={styles.deptActions}>
                <TouchableOpacity
                  style={styles.deptWebsiteButton}
                  onPress={() => openWebsite(dept.website)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="globe-outline" size={14} color="#2F6BFF" />
                  <Text style={styles.deptWebsiteText}>Official Page</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deptCallButton}
                  onPress={callHelpline}
                  activeOpacity={0.8}
                >
                  <Ionicons name="call-outline" size={14} color="#FFFFFF" />
                  <Text style={styles.deptCallText}>Call</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <Text style={styles.footnote}>
            All numbers and links are sourced directly from alkhidmat.org.
            Website buttons open the official Alkhidmat Foundation site in
            your browser.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FB" },
  scrollContent: { paddingBottom: 40 },
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
    marginBottom: 6,
  },
  headerTitle: { fontSize: 16, fontWeight: "700", color: "#0F172A" },
  subheading: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 18,
  },

  helplineCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0B2A5B",
    borderRadius: 16,
    padding: 14,
    marginBottom: 8,
  },
  helplineIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  helplineLabel: {
    fontSize: 11,
    color: "#CBD5E1",
    marginBottom: 2,
  },
  helplineNumber: {
    fontSize: 17,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  helplineCallButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  emailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  emailText: {
    fontSize: 12,
    color: "#64748B",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#071A3A",
    marginBottom: 12,
  },

  deptCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#EEF2F7",
    shadowColor: "#0F172A",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  deptTopRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  deptIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  deptTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
    flex: 1,
  },
  deptDescription: {
    fontSize: 12.5,
    color: "#64748B",
    lineHeight: 19,
    marginBottom: 14,
  },
  deptActions: {
    flexDirection: "row",
    gap: 10,
  },
  deptWebsiteButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAF0FF",
    borderRadius: 10,
    paddingVertical: 10,
    gap: 6,
  },
  deptWebsiteText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#2F6BFF",
  },
  deptCallButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2F6BFF",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 6,
  },
  deptCallText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  footnote: {
    fontSize: 10.5,
    color: "#94A3B8",
    lineHeight: 16,
    textAlign: "center",
    marginTop: 8,
  },
});