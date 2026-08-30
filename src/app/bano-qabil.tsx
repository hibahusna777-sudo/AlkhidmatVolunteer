import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Opportunity = {
  id: string;
  title: string;
  category: string;
  location: string;
  image: any;
  onPress: (router: ReturnType<typeof useRouter>) => void;
};

// NOTE: Opportunities that already have their own detail screen
// (Bano Qabil, Hackathon) navigate there directly. The rest show a
// "coming soon" style detail alert until their own screens are built —
// this avoids wiring them to the wrong page by mistake.
const OPPORTUNITIES: Opportunity[] = [
  {
    id: "bano-qabil",
    title: "Bano Qabil",
    category: "Free IT Training",
    location: "Multiple Cities",
    image: require("../../assets/images/opportunities/banoqabil.png"),
    onPress: (router) => router.push("/bano-qabil" as any),
  },
  {
    id: "hackathon",
    title: "Alibaba Hackathon",
    category: "Tech Event",
    location: "Expo Center, Karachi",
    image: require("../../assets/images/opportunities/hackathon.jpg"),
    onPress: (router) => router.push("/event-hackathon" as any),
  },
  {
    id: "food-distribution",
    title: "Food Distribution",
    category: "Community Service",
    location: "Orangi Town, Karachi",
    image: require("../../assets/images/opportunities/food-distribution.jpg"),
    onPress: () =>
      Alert.alert("Food Distribution", "Full details page coming soon."),
  },
  {
    id: "blood-donation",
    title: "Blood Donation Camp",
    category: "Health Drive",
    location: "Liaquatabad, Karachi",
    image: require("../../assets/images/opportunities/blood-donation.jpg"),
    onPress: () =>
      Alert.alert("Blood Donation Camp", "Full details page coming soon."),
  },
  {
    id: "clean-water",
    title: "Clean Water Project",
    category: "Community Service",
    location: "Various Areas",
    image: require("../../assets/images/opportunities/clean-water.jpg"),
    onPress: () =>
      Alert.alert("Clean Water Project", "Full details page coming soon."),
  },
  {
    id: "free-it",
    title: "Free IT Course",
    category: "Skill Development",
    location: "Online / On-site",
    image: require("../../assets/images/opportunities/freeit.png"),
    onPress: () =>
      Alert.alert("Free IT Course", "Full details page coming soon."),
  },
  {
    id: "aptitude-test",
    title: "Aptitude Test",
    category: "Assessment",
    location: "Alkhidmat Centers",
    image: require("../../assets/images/opportunities/aptitude-test.jpg"),
    onPress: () =>
      Alert.alert("Aptitude Test", "Full details page coming soon."),
  },
  {
    id: "e-gaming",
    title: "E-Gaming Arena",
    category: "Recreational Event",
    location: "Expo Center, Karachi",
    image: require("../../assets/images/opportunities/e-gaming-arena.jpg"),
    onPress: () =>
      Alert.alert("E-Gaming Arena", "Full details page coming soon."),
  },
  {
    id: "podcast-stories",
    title: "Podcast Stories",
    category: "Media & Content",
    location: "Alkhidmat Studio",
    image: require("../../assets/images/opportunities/podcast-stories.jpg"),
    onPress: () =>
      Alert.alert("Podcast Stories", "Full details page coming soon."),
  },
  {
    id: "vocal-mania",
    title: "Vocal Mania Voice",
    category: "Talent Program",
    location: "Alkhidmat Centers",
    image: require("../../assets/images/opportunities/vocal-mania-voice.jpg"),
    onPress: () =>
      Alert.alert("Vocal Mania Voice", "Full details page coming soon."),
  },
];

export default function NearbyScreen() {
  const router = useRouter();

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
            Discover volunteer, learning, and event opportunities near you
          </Text>

          {/* List */}
          {OPPORTUNITIES.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => item.onPress(router)}
            >
              <Image source={item.image} style={styles.cardImage} resizeMode="cover" />

              <View style={styles.cardInfo}>
                <Text style={styles.cardCategory}>{item.category}</Text>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.locationRow}>
                  <Ionicons name="location-outline" size={13} color="#64748B" />
                  <Text style={styles.locationText}>{item.location}</Text>
                </View>
              </View>

              <Ionicons name="chevron-forward" size={20} color="#CBD5E1" />
            </TouchableOpacity>
          ))}
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
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#EEF2F7",
    shadowColor: "#0F172A",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  cardImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 12,
  },
  cardInfo: { flex: 1 },
  cardCategory: {
    fontSize: 10,
    fontWeight: "700",
    color: "#2F6BFF",
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginBottom: 3,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  locationRow: { flexDirection: "row", alignItems: "center" },
  locationText: { fontSize: 11, color: "#64748B", marginLeft: 4 },
});