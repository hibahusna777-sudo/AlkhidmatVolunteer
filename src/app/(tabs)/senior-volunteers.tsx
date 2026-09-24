import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const CURRENT_USER_KEY = "@alkhidmat_current_user";

const COLORS = {
  navy: "#0B2A5B",
  navyDark: "#071A3A",
  blue: "#2F6BFF",
  blueLight: "#EAF0FF",
  gold: "#E8C56A",
  white: "#FFFFFF",
  background: "#F5F7FB",
  text: "#0B2A5B",
  muted: "#64748B",
  lightMuted: "#94A3B8",
  border: "#EEF2F7",
};

type CurrentUser = {
  id?: string;
  fullName?: string;
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  role?: string;
};

type Volunteer = {
  id: string;
  name: string;
  phone: string;
  field: string;
  city: string;
  avatarColor: string;
};

const VOLUNTEERS: Volunteer[] = [
  {
    id: "1",
    name: "Haroon Rajput",
    phone: "+92 332 3635376",
    field: "Community Services",
    city: "Karachi",
    avatarColor: "#2F6BFF",
  },
  {
    id: "2",
    name: "Asad Aaley",
    phone: "+92 333 2668263",
    field: "Education Support",
    city: "Lahore",
    avatarColor: "#8B5CF6",
  },
  {
    id: "3",
    name: "Tabinda Tariq",
    phone: "+92 335 0133950",
    field: "Community Services",
    city: "Karachi",
    avatarColor: "#2F6BFF",
  },
  {
    id: "4",
    name: "Hamas Malik",
    phone: "+92 331 2469322",
    field: "Event Management",
    city: "Islamabad",
    avatarColor: "#2F6BFF",
  },
  {
    id: "5",
    name: "Talha Shahid",
    phone: "+92 344 4482399",
    field: "Volunteer Management",
    city: "Peshawar",
    avatarColor: "#8B5CF6",
  },
];

const getInitials = (fullName: string) => {
  const cleanName = fullName.trim();

  if (!cleanName) {
    return "AK";
  }

  const parts = cleanName.split(/\s+/);

  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }

  return (
    parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
  ).toUpperCase();
};

export default function SeniorVolunteersScreen() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    loadCurrentUser();
  }, []);

  const loadCurrentUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem(CURRENT_USER_KEY);

      if (storedUser) {
        const parsedUser: CurrentUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
      }
    } catch (error) {
      console.log("Could not load current user:", error);
    } finally {
      setLoading(false);
    }
  };

  const displayName = useMemo(() => {
    return (
      currentUser?.fullName?.trim() ||
      currentUser?.name?.trim() ||
      "Volunteer"
    );
  }, [currentUser]);

  const initials = useMemo(() => {
    return getInitials(displayName);
  }, [displayName]);

  const filteredVolunteers = VOLUNTEERS.filter((person) => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return true;
    }

    return (
      person.name.toLowerCase().includes(query) ||
      person.field.toLowerCase().includes(query) ||
      person.city.toLowerCase().includes(query) ||
      person.phone.toLowerCase().includes(query)
    );
  });

  const viewProfile = (person: Volunteer) => {
    Alert.alert(
      person.name,
      `${person.field}\nSenior Volunteer • ${person.city}\n\nPhone: ${person.phone}`,
      [
        {
          text: "Close",
          style: "cancel",
        },
      ],
    );
  };

  const openFilter = () => {
    Alert.alert(
      "Filter Volunteers",
      "Volunteer filtering options will be available here.",
    );
  };

  const openMyProfile = () => {
    setMenuOpen(false);
    router.replace("/profile");
  };

  const openSeniorVolunteers = () => {
    setMenuOpen(false);
  };

  const openSettings = () => {
    setMenuOpen(false);

    setTimeout(() => {
      Alert.alert(
        "Settings",
        "Account and app settings will be available here.",
      );
    }, 200);
  };

  const openHelp = () => {
    setMenuOpen(false);

    setTimeout(() => {
      Alert.alert(
        "Help & Support",
        "Help and support options will be available here.",
      );
    }, 200);
  };

  const handleLogout = () => {
    setMenuOpen(false);

    setTimeout(() => {
      Alert.alert(
        "Logout",
        "Are you sure you want to logout?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Logout",
            style: "destructive",
            onPress: async () => {
              try {
                await AsyncStorage.removeItem(CURRENT_USER_KEY);
                await AsyncStorage.removeItem("@alkhidmat_profile");

                router.replace("/login");
              } catch (error) {
                Alert.alert(
                  "Logout Error",
                  "Unable to logout. Please try again.",
                );
              }
            },
          },
        ],
      );
    }, 200);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.blue} />

        <Text style={styles.loadingText}>
          Loading volunteers...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* ================= HEADER ================= */}

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            style={styles.backButton}
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

          {/* ================= ACCOUNT DROPDOWN BUTTON ================= */}

          <TouchableOpacity
            style={styles.profileChip}
            activeOpacity={0.8}
            onPress={() => setMenuOpen(true)}
          >
            <View style={styles.avatarSmall}>
              <Text style={styles.avatarSmallLetter}>
                {initials}
              </Text>
            </View>

            <Text
              style={styles.profileName}
              numberOfLines={1}
            >
              {displayName}
            </Text>

            <Ionicons
              name="chevron-down"
              size={13}
              color={COLORS.white}
            />
          </TouchableOpacity>
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
              autoCapitalize="none"
              returnKeyType="search"
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

        {/* ================= RESULT COUNT ================= */}

        <View style={styles.resultHeader}>
          <Text style={styles.resultTitle}>
            Volunteer Directory
          </Text>

          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>
              {filteredVolunteers.length}
            </Text>
          </View>
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
              Try searching with a different name, phone number
              or role.
            </Text>
          </View>
        ) : (
          filteredVolunteers.map((person) => (
            <View
              key={person.id}
              style={styles.card}
            >
              {/* Avatar */}

              <View
                style={[
                  styles.avatarLarge,
                  {
                    backgroundColor: person.avatarColor,
                  },
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

                <View style={styles.phoneRow}>
                  <Ionicons
                    name="call-outline"
                    size={12}
                    color={COLORS.blue}
                  />

                  <Text style={styles.phoneText}>
                    {person.phone}
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
                  View
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

      {/* ================= ACCOUNT DROPDOWN MODAL ================= */}

      <Modal
        visible={menuOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuOpen(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setMenuOpen(false)}
        >
          <Pressable
            style={styles.dropdown}
            onPress={(event) => event.stopPropagation()}
          >
            {/* Dropdown Header */}

            <View style={styles.dropdownHeader}>
              <View style={styles.dropdownAvatar}>
                <Text style={styles.dropdownAvatarText}>
                  {initials}
                </Text>
              </View>

              <View style={styles.dropdownUserInfo}>
                <Text
                  style={styles.dropdownName}
                  numberOfLines={1}
                >
                  {displayName}
                </Text>

                <Text style={styles.dropdownRole}>
                  Volunteer Account
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => setMenuOpen(false)}
                style={styles.closeButton}
              >
                <Ionicons
                  name="close"
                  size={20}
                  color={COLORS.muted}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.dropdownDivider} />

            {/* My Profile */}

            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={openMyProfile}
              activeOpacity={0.7}
            >
              <View style={styles.dropdownIcon}>
                <Ionicons
                  name="person-outline"
                  size={19}
                  color={COLORS.blue}
                />
              </View>

              <Text style={styles.dropdownItemText}>
                My Profile
              </Text>

              <Ionicons
                name="chevron-forward"
                size={16}
                color={COLORS.lightMuted}
              />
            </TouchableOpacity>

            {/* Senior Volunteers */}

            <TouchableOpacity
              style={[
                styles.dropdownItem,
                styles.dropdownItemActive,
              ]}
              onPress={openSeniorVolunteers}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.dropdownIcon,
                  styles.dropdownIconActive,
                ]}
              >
                <Ionicons
                  name="people-outline"
                  size={19}
                  color={COLORS.white}
                />
              </View>

              <Text
                style={[
                  styles.dropdownItemText,
                  styles.dropdownItemTextActive,
                ]}
              >
                Senior Volunteers
              </Text>

              <Ionicons
                name="checkmark"
                size={17}
                color={COLORS.blue}
              />
            </TouchableOpacity>

            {/* Settings */}

            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={openSettings}
              activeOpacity={0.7}
            >
              <View style={styles.dropdownIcon}>
                <Ionicons
                  name="settings-outline"
                  size={19}
                  color={COLORS.blue}
                />
              </View>

              <Text style={styles.dropdownItemText}>
                Settings
              </Text>

              <Ionicons
                name="chevron-forward"
                size={16}
                color={COLORS.lightMuted}
              />
            </TouchableOpacity>

            {/* Help */}

            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={openHelp}
              activeOpacity={0.7}
            >
              <View style={styles.dropdownIcon}>
                <Ionicons
                  name="help-circle-outline"
                  size={19}
                  color={COLORS.blue}
                />
              </View>

              <Text style={styles.dropdownItemText}>
                Help & Support
              </Text>

              <Ionicons
                name="chevron-forward"
                size={16}
                color={COLORS.lightMuted}
              />
            </TouchableOpacity>

            <View style={styles.dropdownDivider} />

            {/* Logout */}

            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.dropdownIcon,
                  styles.logoutIcon,
                ]}
              >
                <Ionicons
                  name="log-out-outline"
                  size={19}
                  color="#DC2626"
                />
              </View>

              <Text
                style={[
                  styles.dropdownItemText,
                  styles.logoutText,
                ]}
              >
                Logout
              </Text>

              <Ionicons
                name="chevron-forward"
                size={16}
                color="#FCA5A5"
              />
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: 12,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.muted,
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
    gap: 10,
    flex: 1,
  },

  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.white,
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
    paddingRight: 8,
    paddingVertical: 3,
    borderRadius: 20,
    gap: 5,
    maxWidth: 135,
  },

  avatarSmall: {
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarSmallLetter: {
    fontSize: 11,
    fontWeight: "800",
    color: COLORS.blue,
  },

  profileName: {
    fontSize: 11.5,
    fontWeight: "700",
    color: COLORS.white,
    maxWidth: 75,
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
    marginBottom: 12,
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

  /* ================= RESULT HEADER ================= */

  resultHeader: {
    paddingHorizontal: 18,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  resultTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.text,
  },

  countBadge: {
    minWidth: 24,
    height: 24,
    paddingHorizontal: 7,
    borderRadius: 12,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
  },

  countBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: COLORS.blue,
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

  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 5,
  },

  phoneText: {
    fontSize: 10.5,
    color: COLORS.blue,
    fontWeight: "600",
  },

  profileButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: COLORS.blue,
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginLeft: 7,
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

  /* ================= DROPDOWN ================= */

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(7,26,58,0.38)",
    alignItems: "flex-end",
    paddingTop: 58,
    paddingRight: 14,
  },

  dropdown: {
    width: 285,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    paddingVertical: 8,

    shadowColor: "#071A3A",
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 8,
    },

    elevation: 10,
  },

  dropdownHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  dropdownAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
  },

  dropdownAvatarText: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.white,
  },

  dropdownUserInfo: {
    flex: 1,
    marginLeft: 10,
  },

  dropdownName: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.text,
  },

  dropdownRole: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 3,
  },

  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },

  dropdownDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 5,
  },

  dropdownItem: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginHorizontal: 7,
    borderRadius: 12,
  },

  dropdownItemActive: {
    backgroundColor: COLORS.blueLight,
  },

  dropdownIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
  },

  dropdownIconActive: {
    backgroundColor: COLORS.blue,
  },

  logoutIcon: {
    backgroundColor: "#FEF2F2",
  },

  dropdownItemText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.text,
  },

  dropdownItemTextActive: {
    color: COLORS.blue,
  },

  logoutText: {
    color: "#DC2626",
  },
});