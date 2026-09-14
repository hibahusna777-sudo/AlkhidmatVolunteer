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

const BRAND_BLUE = "#2F6BFF";

export default function AboutScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.page}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={22} color="#071A3A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About Alkhidmat</Text>
          <View style={{ width: 22 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.logoWrap}>
            <Image
              source={require("../../assets/images/alkhidmat-logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.orgName}>Alkhidmat Foundation Pakistan</Text>
          <Text style={styles.tagline}>Together we can make a difference</Text>

          <Text style={styles.paragraph}>
            Alkhidmat Foundation Pakistan is one of the country's largest
            welfare organizations, working across education, health,
            microfinance, disaster relief, and community services to serve
            people in need across Pakistan.
          </Text>

          <Text style={styles.paragraph}>
            This Volunteer app connects volunteers with programs and events,
            makes attendance and certificates easy to manage, and helps
            everyone contribute to Alkhidmat's mission more effectively.
          </Text>

          <View style={styles.card}>
            <View style={styles.row}>
              <Ionicons name="globe-outline" size={16} color={BRAND_BLUE} />
              <Text style={styles.rowText}>www.alkhidmat.org</Text>
            </View>
            <View style={styles.row}>
              <Ionicons name="mail-outline" size={16} color={BRAND_BLUE} />
              <Text style={styles.rowText}>support@alkhidmat.org</Text>
            </View>
            <View style={styles.row}>
              <Ionicons name="location-outline" size={16} color={BRAND_BLUE} />
              <Text style={styles.rowText}>Head Office, Lahore, Pakistan</Text>
            </View>
          </View>

          <Text style={styles.version}>App version 1.0.0</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  page: {
    flex: 1,
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerTitle: { fontSize: 16, fontWeight: "800", color: "#071A3A" },
  logoWrap: { alignItems: "center", marginBottom: 16 },
  logo: { width: 70, height: 70 },
  orgName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#071A3A",
    textAlign: "center",
  },
  tagline: {
    fontSize: 12,
    color: "#5A6B8C",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 18,
  },
  paragraph: {
    fontSize: 13,
    color: "#3A4A6B",
    lineHeight: 20,
    marginBottom: 14,
  },
  card: {
    backgroundColor: "#F8F9FC",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E3E7F2",
    padding: 16,
    marginTop: 6,
    marginBottom: 20,
    gap: 12,
  },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  rowText: { fontSize: 13, color: "#071A3A" },
  version: {
    textAlign: "center",
    fontSize: 11,
    color: "#B7C0DC",
    marginBottom: 20,
  },
});