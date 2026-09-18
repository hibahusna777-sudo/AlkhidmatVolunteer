import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const USER_NAME = "Sadaf";

const COLORS = {
  navy: "#0B2A5B",
  navyDark: "#071A3A",
  blue: "#2F6BFF",
  blueLight: "#EAF0FF",
  white: "#FFFFFF",
  background: "#F5F7FB",
  text: "#0B2A5B",
  muted: "#64748B",
  lightMuted: "#94A3B8",
  border: "#EEF2F7",
};

type Volunteer = {
  id: string;
  name: string;
  field: string;
  city: string;
  avatarColor: string;
};

const VOLUNTEERS: Volunteer[] = [
  {
    id: "1",
    name: "Ahmad Hussain",
    field: "Community Services",
    city: "Karachi",
    avatarColor: "#2F6BFF",
  },
  {
    id: "2",
    name: "Sania Zahra",
    field: "Education Support",
    city: "Lahore",
    avatarColor: "#8B5CF6",
  },
  {
    id: "3",
    name: "Muhammad Asif",
    field: "Health & Wellness",
    city: "Islamabad",
    avatarColor: "#2F6BFF",
  },
  {
    id: "4",
    name: "Rukhsana Khan",
    field: "Event Management",
    city: "Peshawar",
    avatarColor: "#2F6BFF",
  },
];

const getInitials = (fullName: string) => {
  const parts = fullName.trim().split(" ");

  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }

  return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
};

export default function SeniorVolunteersScreen() {
  const router = useRouter();

  const [search, setSearch] = useState("");

  const filteredVolunteers = VOLUNTEERS.filter((person) => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return true;
    }

    return (
      person.name.toLowerCase().includes(query) ||
      person.field.toLowerCase().includes(query) ||
      person.city.toLowerCase().includes(query)
    );
  });

  const viewProfile = (person: Volunteer) => {
    Alert.alert(
      person.name,
      `${person.field}\nSenior Volunteer • ${person.city}`,
    );
  };

  const openFilter = () => {
    Alert.alert("Filter", "Filter options will be available here.");
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* ================= HEADER ================= */}
      <View style={styles.header}>

        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color={COLORS.white}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Senior Volunteers
          </Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.bellButton}
            activeOpacity={0.7}
          >
            <Ionicons
              name="notifications-outline"
              size={18}
              color={COLORS.white}
            />
            <View style={styles.bellDot} />
          </TouchableOpacity>

          <View style={styles.profileChip}>
            <View style={styles.avatarSmall}>
              <Text style={styles.avatarSmallLetter}>
                {USER_NAME.charAt(0)}
              </Text>
            </View>

            <Text style={styles.profileName}>
              {USER_NAME}
            </Text>
          </View>
        </View>

      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* ================= HERO ================= */}
        <View style={styles.hero}>
          <View style={styles.heroCircle} />

          <View style={styles.heroRow}>
            <View style={styles.heroIcon}>
              <Ionicons
                name="people"
                size={30}
                color={COLORS.white}
              />
            </View>

            <View style={styles.heroTextArea}>
              <Text style={styles.heroTitle}>
                Senior Volunteers
              </Text>

              <Text style={styles.heroSubtitle}>
                Experienced. Dedicated. Always Ready to Serve.
              </Text>
            </View>
          </View>

          <Text style={styles.heroDescription}>
            Our senior volunteers bring valuable experience,
            leadership and guidance to help create a stronger
            and more impactful community.
          </Text>
        </View>

        {/* ================= SEARCH ================= */}
        <View style={styles.searchRow}>

          <View style={styles.searchBox}>
            <Ionicons
              name="search"
              size={18}
              color={COLORS.lightMuted}
            />

            <TextInput
              style={styles.searchInput}
              placeholder="Search by name, skill or role..."
              placeholderTextColor={COLORS.lightMuted}
              value={search}
              onChangeText={setSearch}
            />
          </View>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={openFilter}
            activeOpacity={0.8}
          >
            <Ionicons
              name="options-outline"
              size={20}
              color={COLORS.muted}
            />
          </TouchableOpacity>

        </View>

        {/* ================= VOLUNTEER LIST ================= */}
        {filteredVolunteers.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons
                name="search-outline"
                size={32}
                color={COLORS.lightMuted}
              />
            </View>

            <Text style={styles.emptyTitle}>
              No volunteers found
            </Text>

            <Text style={styles.emptyText}>
              Try searching with a different name or role.
            </Text>
          </View>
        ) : (
          filteredVolunteers.map((person) => (
            <View key={person.id} style={styles.card}>

              {/* Avatar */}
              <View
                style={[
                  styles.avatarLarge,
                  { backgroundColor: person.avatarColor },
                ]}
              >
                <Text style={styles.avatarLargeText}>
                  {getInitials(person.name)}
                </Text>
              </View>

              {/* Info */}
              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>
                  {person.name}
                </Text>

                <Text style={styles.cardField}>
                  {person.field}
                </Text>

                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    Senior Volunteer
                  </Text>
                </View>

                <View style={styles.locationRow}>
                  <Ionicons
                    name="location-outline"
                    size={12}
                    color={COLORS.lightMuted}
                  />

                  <Text style={styles.locationText}>
                    {person.city}
                  </Text>
                </View>
              </View>

              {/* View profile */}
              <TouchableOpacity
                style={styles.profileButton}
                onPress={() => viewProfile(person)}
                activeOpacity={0.8}
              >
                <Text style={styles.profileButtonText}>
                  View Profile
                </Text>

                <Ionicons
                  name="arrow-forward"
                  size={13}
                  color={COLORS.blue}
                />
              </TouchableOpacity>

            </View>
          ))
        )}

        {/* ================= IMPACT BANNER ================= */}
        <View style={styles.impactCard}>
          <View style={styles.impactIcon}>
            <Ionicons
              name="people"
              size={22}
              color={COLORS.white}
            />
          </View>

          <View style={styles.impactTextArea}>
            <Text style={styles.impactTitle}>
              Make an Impact
            </Text>

            <Text style={styles.impactSubtitle}>
              Your experience can inspire and guide others.
            </Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  /* ================= HEADER ================= */

  header: {
    backgroundColor: COLORS.navy,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.white,
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  bellButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },

  bellDot: {
    position: "absolute",
    top: 7,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#F97316",
    borderWidth: 1.5,
    borderColor: COLORS.navy,
  },

  profileChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingLeft: 3,
    paddingRight: 9,
    paddingVertical: 3,
    borderRadius: 20,
    gap: 6,
  },

  avatarSmall: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarSmallLetter: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.blue,
  },

  profileName: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.white,
  },

  scrollContent: {
    paddingBottom: 28,
  },

  /* ================= HERO ================= */

  hero: {
    backgroundColor: COLORS.navy,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 26,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: "hidden",
    position: "relative",
  },

  heroCircle: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    right: -70,
    top: -60,
    backgroundColor: "rgba(255,255,255,0.05)",
  },

  heroRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  heroIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
  },

  heroTextArea: {
    flex: 1,
  },

  heroTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.white,
    marginBottom: 4,
  },

  heroSubtitle: {
    fontSize: 11.5,
    color: "#C8D4ED",
    lineHeight: 16,
  },

  heroDescription: {
    marginTop: 14,
    fontSize: 12,
    lineHeight: 18,
    color: "#C8D4ED",
  },

  /* ================= SEARCH ================= */

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 18,
    marginTop: 20,
    marginBottom: 16,
  },

  searchBox: {
    flex: 1,
    height: 48,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 9,
  },

  searchInput: {
    flex: 1,
    height: "100%",
    fontSize: 13,
    color: COLORS.text,
  },

  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },

  /* ================= CARDS ================= */

  card: {
    marginHorizontal: 18,
    marginBottom: 13,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#0F172A",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },

    elevation: 2,
  },

  avatarLarge: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  avatarLargeText: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.white,
  },

  cardInfo: {
    flex: 1,
  },

  cardName: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.text,
  },

  cardField: {
    fontSize: 11.5,
    color: COLORS.muted,
    marginTop: 2,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.blueLight,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 7,
    marginTop: 7,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.blue,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 7,
  },

  locationText: {
    fontSize: 10.5,
    color: COLORS.lightMuted,
  },

  profileButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderColor: COLORS.blue,
    borderRadius: 9,
    paddingHorizontal: 11,
    paddingVertical: 8,
    marginLeft: 8,
  },

  profileButtonText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.blue,
  },

  /* ================= EMPTY ================= */

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
    paddingHorizontal: 40,
  },

  emptyIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  emptyTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.text,
  },

  emptyText: {
    fontSize: 12,
    color: COLORS.muted,
    textAlign: "center",
    marginTop: 6,
    lineHeight: 18,
  },

  /* ================= IMPACT ================= */

  impactCard: {
    marginHorizontal: 18,
    marginTop: 8,
    backgroundColor: COLORS.navyDark,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
  },

  impactIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
  },

  impactTextArea: {
    flex: 1,
  },

  impactTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.white,
  },

  impactSubtitle: {
    fontSize: 11.5,
    color: "#C8D4ED",
    marginTop: 3,
    lineHeight: 16,
  },
});