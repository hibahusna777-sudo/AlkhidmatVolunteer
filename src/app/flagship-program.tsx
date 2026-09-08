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

const BANO_QABIL_WEBSITE = "https://banoqabil.pk/";

const englishCourseCenters = [
  {
    name: "Panorama Saddar",
    phone: "0337-9616064",
    timing: "4:00 PM - 6:00 PM",
  },
  {
    name: "13-D, Gulshan-e-Iqbal",
    phone: "0337-9616065",
    timing: "8:00 PM - 10:00 PM",
  },
  {
    name: "PIB Colony",
    phone: "021-34130666",
    timing: "10:00 AM - 12:00 PM",
  },
  {
    name: "Jamia Millia Malir",
    phone: "0337-9616062",
    timing: "4:00 PM - 6:00 PM",
  },
];

export default function NearbyScreen() {
  const router = useRouter();

  const callCenter = (phone: string) => {
    const digitsOnly = phone.replace(/[^0-9+]/g, "");
    Linking.openURL(`tel:${digitsOnly}`);
  };

  const openBanoQabilWebsite = () => {
    Linking.openURL(BANO_QABIL_WEBSITE);
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
            <Text style={styles.headerTitle}>Nearby Opportunities</Text>
            <View style={{ width: 24 }} />
          </View>

          <Text style={styles.subheading}>
            Bano Qabil skill development programs open for enrollment
          </Text>

          {/* ================= PROGRAM 1: BANO QABIL DIGITAL INNOVATION ================= */}
          <View style={styles.programCard}>
            <Image
              source={require("../../assets/images/opportunities/banoqabil.png")}
              style={styles.programImage}
              resizeMode="cover"
            />

            <View style={styles.programBody}>
              <View style={styles.tagRow}>
                <View style={[styles.tag, styles.tagGreen]}>
                  <Ionicons name="rocket-outline" size={12} color="#22C55E" />
                  <Text style={[styles.tagText, styles.tagTextGreen]}>
                    IT & Digital Skills
                  </Text>
                </View>
              </View>

              <Text style={styles.programTitle}>
                Igniting Young Minds Through Digital Innovation
              </Text>

              <Text style={styles.programDescription}>
                Bano Qabil is Alkhidmat Foundation's flagship program
                offering free IT training, courses, and mentorship — helping
                students build real, in-demand skills for the future.
              </Text>

              <TouchableOpacity
                style={styles.enrollButton}
                onPress={openBanoQabilWebsite}
                activeOpacity={0.85}
              >
                <Ionicons name="globe-outline" size={16} color="#FFFFFF" />
                <Text style={styles.enrollButtonText}>Enroll Now</Text>
                <Ionicons name="arrow-forward" size={15} color="#FFFFFF" />
              </TouchableOpacity>

              <Text style={styles.footnote}>
                Opens banoqabil.pk in your browser
              </Text>
            </View>
          </View>

          {/* ================= PROGRAM 2: SPOKEN ENGLISH COURSE ================= */}
          <View style={styles.programCard}>
            <Image
              source={require("../../assets/images/opportunities/spoken-english.jpg")}
              style={styles.programImage}
              resizeMode="cover"
            />

            <View style={styles.programBody}>
              <View style={styles.tagRow}>
                <View style={styles.tag}>
                  <Ionicons name="chatbubbles-outline" size={12} color="#2F6BFF" />
                  <Text style={styles.tagText}>Spoken English</Text>
                </View>
              </View>

              <Text style={styles.programTitle}>
                Speak with Confidence. Communicate with Impact!
              </Text>

              <Text style={styles.programDescription}>
                Admissions are open for the Spoken English Course under the
                Alkhidmat Bano Qabil Skill Development Program — designed
                for beginners who want to improve everyday English
                communication and build confidence.
              </Text>

              {/* Duration / Schedule */}
              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Ionicons name="time-outline" size={15} color="#2F6BFF" />
                  <Text style={styles.metaText}>2 Months</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="calendar-outline" size={15} color="#2F6BFF" />
                  <Text style={styles.metaText}>3 Days a Week</Text>
                </View>
              </View>

              {/* Centers */}
              <Text style={styles.centersHeading}>Available Centers</Text>

              {englishCourseCenters.map((center) => (
                <TouchableOpacity
                  key={center.name}
                  style={styles.centerRow}
                  onPress={() => callCenter(center.phone)}
                  activeOpacity={0.7}
                >
                  <View style={styles.centerInfo}>
                    <Text style={styles.centerName}>{center.name}</Text>
                    <Text style={styles.centerTiming}>{center.timing}</Text>
                  </View>
                  <View style={styles.callButton}>
                    <Ionicons name="call-outline" size={14} color="#2F6BFF" />
                    <Text style={styles.callButtonText}>{center.phone}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
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
    marginBottom: 20,
  },

  programCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "#EEF2F7",
    shadowColor: "#0F172A",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  programImage: {
    width: "100%",
    height: 150,
  },
  programBody: {
    padding: 18,
  },

  tagRow: { flexDirection: "row", marginBottom: 10 },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF0FF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 5,
  },
  tagGreen: { backgroundColor: "#E8FBF0" },
  tagText: { fontSize: 10, fontWeight: "700", color: "#2F6BFF" },
  tagTextGreen: { color: "#22C55E" },

  programTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 8,
    lineHeight: 22,
  },
  programDescription: {
    fontSize: 13,
    color: "#64748B",
    lineHeight: 20,
    marginBottom: 16,
  },

  metaRow: {
    flexDirection: "row",
    gap: 18,
    marginBottom: 16,
  },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  metaText: { fontSize: 12, fontWeight: "700", color: "#334155" },

  centersHeading: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 10,
  },
  centerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
  },
  centerInfo: { flex: 1 },
  centerName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 2,
  },
  centerTiming: { fontSize: 11, color: "#64748B" },
  callButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  callButtonText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2F6BFF",
  },

  enrollButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2F6BFF",
    borderRadius: 12,
    paddingVertical: 14,
    gap: 8,
    marginTop: 4,
  },
  enrollButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  footnote: {
    fontSize: 10,
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 8,
  },
});