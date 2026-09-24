import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BRAND_BLUE = "#2F6BFF";
const DEEP_BLUE = "#071A3A";
const MID_BLUE = "#0D2B63";
const LIGHT_BLUE = "#EAF1FF";
const BG = "#F5F7FB";
const BORDER = "#E5EAF3";
const TEXT_GRAY = "#667085";
const GOLD = "#E8C56A";

type UserData = {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  role?: string;
};

type IconName = React.ComponentProps<typeof Ionicons>["name"];

const ACCOUNT_ITEMS: {
  icon: IconName;
  label: string;
  subtitle: string;
  route: string;
}[] = [
  {
    icon: "create-outline",
    label: "Edit Profile",
    subtitle: "Update your name, phone and city",
    route: "/edit-profile",
  },
  {
    icon: "calendar-outline",
    label: "My Events",
    subtitle: "View your volunteer activities",
    route: "/my-events",
  },
  {
    icon: "ribbon-outline",
    label: "Certificates",
    subtitle: "View your achievements",
    route: "/certificates",
  },
  {
    icon: "notifications-outline",
    label: "Notifications",
    subtitle: "Stay updated with opportunities",
    route: "/notifications",
  },
];

const OTHER_ITEMS: {
  icon: IconName;
  label: string;
  subtitle: string;
  route: string;
}[] = [
  {
    icon: "help-circle-outline",
    label: "Help & Support",
    subtitle: "Get assistance when you need it",
    route: "/help-support",
  },
  {
    icon: "information-circle-outline",
    label: "About Alkhidmat",
    subtitle: "Learn more about the foundation",
    route: "/about",
  },
  {
    icon: "settings-outline",
    label: "Settings",
    subtitle: "Manage your app preferences",
    route: "/settings",
  },
];

// Validates that a stored name looks like an actual human name,
// not leftover test data, an email, or a URL/domain.
function isValidDisplayName(value?: string): boolean {
  if (!value) return false;
  const trimmed = value.trim();
  if (trimmed.length === 0) return false;
  if (trimmed.includes("@")) return false;
  if (trimmed.includes("://")) return false;
  if (trimmed.includes(".") && !trimmed.includes(" ")) return false;
  if (/^[a-z0-9.-]+\.[a-z]{2,}$/i.test(trimmed)) return false;
  return true;
}

export default function ProfileScreen() {
  const router = useRouter();

  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUserRaw = await AsyncStorage.getItem("currentUser");
      const profileRaw = await AsyncStorage.getItem("@alkhidmat_profile");

      let currentUser: UserData = {};
      let savedProfile: UserData = {};

      if (currentUserRaw) {
        try {
          currentUser = JSON.parse(currentUserRaw);
        } catch {
          currentUser = {};
        }
      }

      if (profileRaw) {
        try {
          savedProfile = JSON.parse(profileRaw);
        } catch {
          savedProfile = {};
        }
      }

      const mergedUser: UserData = {
        ...savedProfile,
        ...currentUser,
      };

      setUser(mergedUser);
    } catch (error) {
      console.log("Profile load error:", error);
      setUser({});
    } finally {
      setLoading(false);
    }
  };

  const displayName = isValidDisplayName(user?.name)
    ? user!.name!.trim()
    : "My Profile";

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out from your Alkhidmat account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log Out",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("currentUser");
              await AsyncStorage.removeItem("@alkhidmat_profile");

              router.replace("/login" as any);
            } catch (error) {
              console.log("Logout error:", error);
              router.replace("/login" as any);
            }
          },
        },
      ]
    );
  };

  const openRoute = (route: string) => {
    router.push(route as any);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingScreen}>
        <View style={styles.loadingLogoBox}>
          <Image
            source={require("../../../assets/images/alkhidmat-logo.png")}
            style={styles.loadingLogo}
            resizeMode="contain"
          />
        </View>

        <ActivityIndicator
          size="small"
          color={BRAND_BLUE}
          style={{ marginTop: 18 }}
        />

        <Text style={styles.loadingText}>Loading your profile...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.page}>

          {/* HEADER */}
          <View style={styles.topHeader}>
            <View>
              <Text style={styles.smallGreeting}>MY ACCOUNT</Text>
              <Text style={styles.headerTitle}>Profile</Text>
            </View>

            <TouchableOpacity
              style={styles.headerIcon}
              activeOpacity={0.8}
              onPress={() => openRoute("/settings")}
            >
              <Ionicons
                name="settings-outline"
                size={21}
                color={DEEP_BLUE}
              />
            </TouchableOpacity>
          </View>

          {/* PROFILE HERO */}
          <View style={styles.heroCard}>
            <View style={styles.heroCircleOne} />
            <View style={styles.heroCircleTwo} />

            {/* BRAND */}
            <View style={styles.brandRow}>
              <View style={styles.logoBox}>
                <Image
                  source={require("../../../assets/images/alkhidmat-logo.png")}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.brandTextArea}>
                <Text style={styles.brandName}>ALKHIDMAT</Text>
                <Text style={styles.brandSub}>Volunteer App</Text>
              </View>

              <View style={styles.activePill}>
                <View style={styles.activeDot} />
                <Text style={styles.activeText}>ACTIVE</Text>
              </View>
            </View>

            <View style={styles.heroDividerTop} />

            {/* USER INFORMATION */}
            <View style={styles.heroTopRow}>
              <View style={styles.avatarOuter}>
                <View style={styles.avatar}>
                  <Ionicons
                    name="person"
                    size={32}
                    color="#FFFFFF"
                  />
                </View>

                <View style={styles.onlineDot}>
                  <Ionicons
                    name="checkmark"
                    size={10}
                    color="#FFFFFF"
                  />
                </View>
              </View>

              <View style={styles.heroIdentity}>
                <Text
                  style={styles.heroName}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {displayName}
                </Text>

                <View style={styles.volunteerBadge}>
                  <Ionicons
                    name="ribbon"
                    size={12}
                    color={GOLD}
                  />

                  <Text style={styles.volunteerBadgeText}>
                    ALKHIDMAT VOLUNTEER
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.heroDivider} />

            {/* STATUS + EDIT */}
            <View style={styles.heroFooter}>
              <View style={styles.heroFooterLeft}>
                <View style={styles.statusIconWrap}>
                  <Ionicons
                    name="pulse-outline"
                    size={14}
                    color="#69DFA0"
                  />
                </View>

                <View>
                  <Text style={styles.heroFooterLabel}>
                    VOLUNTEER STATUS
                  </Text>

                  <Text style={styles.heroFooterValue}>
                    Making an Impact
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.heroEditButton}
                activeOpacity={0.85}
                onPress={() => openRoute("/edit-profile")}
              >
                <Ionicons
                  name="create-outline"
                  size={15}
                  color={DEEP_BLUE}
                />

                <Text style={styles.heroEditText}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* IMPACT */}
          <View style={styles.statsHeader}>
            <Text style={styles.sectionHeading}>
              Your Impact
            </Text>

            <View style={styles.trendIcon}>
              <Ionicons
                name="trending-up-outline"
                size={17}
                color={BRAND_BLUE}
              />
            </View>
          </View>

          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <View
                style={[
                  styles.statIcon,
                  { backgroundColor: "#EAF1FF" },
                ]}
              >
                <Ionicons
                  name="people-outline"
                  size={19}
                  color={BRAND_BLUE}
                />
              </View>

              <Text style={styles.statNumber}>6</Text>
              <Text style={styles.statLabel}>Programs</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <View
                style={[
                  styles.statIcon,
                  { backgroundColor: "#FFF7E1" },
                ]}
              >
                <Ionicons
                  name="time-outline"
                  size={19}
                  color="#B88718"
                />
              </View>

              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Hours</Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <View
                style={[
                  styles.statIcon,
                  { backgroundColor: "#E9F8F0" },
                ]}
              >
                <Ionicons
                  name="ribbon-outline"
                  size={19}
                  color="#26965B"
                />
              </View>

              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Certificates</Text>
            </View>
          </View>

          {/* QUICK ACTIONS */}
          <Text style={styles.sectionHeading}>
            Quick Actions
          </Text>

          <View style={styles.quickRow}>
            <TouchableOpacity
              style={styles.quickCard}
              activeOpacity={0.82}
              onPress={() => openRoute("/my-events")}
            >
              <View
                style={[
                  styles.quickIcon,
                  { backgroundColor: "#EAF1FF" },
                ]}
              >
                <Ionicons
                  name="calendar"
                  size={21}
                  color={BRAND_BLUE}
                />
              </View>

              <Text style={styles.quickTitle}>
                My Events
              </Text>

              <Text style={styles.quickSubtitle}>
                View events
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickCard}
              activeOpacity={0.82}
              onPress={() => openRoute("/certificates")}
            >
              <View
                style={[
                  styles.quickIcon,
                  { backgroundColor: "#FFF7E1" },
                ]}
              >
                <Ionicons
                  name="ribbon"
                  size={21}
                  color="#B88718"
                />
              </View>

              <Text style={styles.quickTitle}>
                Certificates
              </Text>

              <Text style={styles.quickSubtitle}>
                Your awards
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.quickCard,
                styles.quickCardLast,
              ]}
              activeOpacity={0.82}
              onPress={() => openRoute("/notifications")}
            >
              <View
                style={[
                  styles.quickIcon,
                  { backgroundColor: "#EAF8F2" },
                ]}
              >
                <Ionicons
                  name="notifications"
                  size={21}
                  color="#26965B"
                />
              </View>

              <Text style={styles.quickTitle}>
                Updates
              </Text>

              <Text style={styles.quickSubtitle}>
                Notifications
              </Text>
            </TouchableOpacity>
          </View>

          {/* ACCOUNT */}
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionHeading}>
              Account
            </Text>

            <Text style={styles.sectionCount}>
              {ACCOUNT_ITEMS.length} items
            </Text>
          </View>

          <View style={styles.menuCard}>
            {ACCOUNT_ITEMS.map((item, index) => (
              <TouchableOpacity
                key={item.label}
                style={[
                  styles.menuRow,
                  index !== ACCOUNT_ITEMS.length - 1 &&
                    styles.menuRowBorder,
                ]}
                activeOpacity={0.75}
                onPress={() => openRoute(item.route)}
              >
                <View style={styles.menuIconWrap}>
                  <Ionicons
                    name={item.icon}
                    size={20}
                    color={BRAND_BLUE}
                  />
                </View>

                <View style={styles.menuTextArea}>
                  <Text style={styles.menuLabel}>
                    {item.label}
                  </Text>

                  <Text style={styles.menuSubtitle}>
                    {item.subtitle}
                  </Text>
                </View>

                <View style={styles.chevronWrap}>
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color="#94A3B8"
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* MORE */}
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionHeading}>
              More
            </Text>
          </View>

          <View style={styles.menuCard}>
            {OTHER_ITEMS.map((item, index) => (
              <TouchableOpacity
                key={item.label}
                style={[
                  styles.menuRow,
                  index !== OTHER_ITEMS.length - 1 &&
                    styles.menuRowBorder,
                ]}
                activeOpacity={0.75}
                onPress={() => openRoute(item.route)}
              >
                <View style={styles.menuIconWrap}>
                  <Ionicons
                    name={item.icon}
                    size={20}
                    color={BRAND_BLUE}
                  />
                </View>

                <View style={styles.menuTextArea}>
                  <Text style={styles.menuLabel}>
                    {item.label}
                  </Text>

                  <Text style={styles.menuSubtitle}>
                    {item.subtitle}
                  </Text>
                </View>

                <View style={styles.chevronWrap}>
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color="#94A3B8"
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* LOGOUT */}
          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.82}
            onPress={handleLogout}
          >
            <View style={styles.logoutIcon}>
              <Ionicons
                name="log-out-outline"
                size={19}
                color="#D64545"
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.logoutTitle}>
                Log Out
              </Text>

              <Text style={styles.logoutSubtitle}>
                Sign out from your account
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={17}
              color="#D64545"
            />
          </TouchableOpacity>

          {/* FOOTER */}
          <View style={styles.footer}>
            <View style={styles.footerLine} />

            <View style={styles.footerBrand}>
              <Image
                source={require("../../../assets/images/alkhidmat-logo.png")}
                style={styles.footerLogo}
                resizeMode="contain"
              />

              <Text style={styles.footerText}>
                Alkhidmat Volunteer App
              </Text>
            </View>

            <Text style={styles.version}>
              Version 1.0.0
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>
        <NavItem
          icon="home-outline"
          label="Home"
          onPress={() => router.push("/home" as any)}
        />

        <NavItem
          icon="flag-outline"
          label="Programs"
          onPress={() => router.push("/my-events" as any)}
        />

        <NavItem
          icon="calendar-outline"
          label="My Events"
          onPress={() => router.push("/my-events" as any)}
        />

        <NavItem
          icon="location-outline"
          label="Nearby"
          onPress={() => router.push("/nearby" as any)}
        />

        <NavItem
          icon="person"
          label="Profile"
          active
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
}

/* =========================================
   BOTTOM NAV ITEM
========================================= */

function NavItem({
  icon,
  label,
  active,
  onPress,
}: {
  icon: IconName;
  label: string;
  active?: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.navItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.navIconWrap,
          active && styles.navIconWrapActive,
        ]}
      >
        <Ionicons
          name={icon}
          size={19}
          color={active ? BRAND_BLUE : "#8A96B5"}
        />
      </View>

      <Text
        style={[
          styles.navLabel,
          active && styles.navLabelActive,
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

/* =========================================
   STYLES
========================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },

  loadingScreen: {
    flex: 1,
    backgroundColor: BG,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingLogoBox: {
    width: 82,
    height: 82,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: BORDER,
    elevation: 3,
  },

  loadingLogo: {
    width: 58,
    height: 58,
  },

  loadingText: {
    marginTop: 12,
    fontSize: 12,
    color: TEXT_GRAY,
    fontWeight: "600",
  },

  scrollContent: {
    paddingBottom: 105,
  },

  page: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    paddingHorizontal: 18,
    paddingTop: 12,
  },

  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  smallGreeting: {
    fontSize: 10,
    fontWeight: "800",
    color: BRAND_BLUE,
    letterSpacing: 1.5,
    marginBottom: 3,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: DEEP_BLUE,
  },

  headerIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: BORDER,
  },

  heroCard: {
    backgroundColor: DEEP_BLUE,
    borderRadius: 24,
    padding: 20,
    marginBottom: 23,
    overflow: "hidden",
  },

  heroCircleOne: {
    position: "absolute",
    width: 170,
    height: 170,
    borderRadius: 85,
    right: -70,
    top: -80,
    backgroundColor: MID_BLUE,
    opacity: 0.55,
  },

  heroCircleTwo: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: 50,
    right: 20,
    bottom: -50,
    backgroundColor: "#123C82",
    opacity: 0.45,
  },

  brandRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 30,
    height: 30,
  },

  brandTextArea: {
    flex: 1,
    marginLeft: 10,
  },

  brandName: {
    fontSize: 12,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: 1.2,
  },

  brandSub: {
    fontSize: 9,
    color: "#AFC0E5",
    marginTop: 2,
    fontWeight: "600",
  },

  activePill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "rgba(39,174,96,0.14)",
    borderWidth: 1,
    borderColor: "rgba(39,174,96,0.25)",
  },

  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#32D583",
    marginRight: 5,
  },

  activeText: {
    fontSize: 8,
    fontWeight: "900",
    color: "#69DFA0",
    letterSpacing: 0.5,
  },

  heroDividerTop: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.10)",
    marginVertical: 16,
  },

  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatarOuter: {
    position: "relative",
    marginRight: 14,
  },

  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: BRAND_BLUE,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.16)",
  },

  onlineDot: {
    position: "absolute",
    right: -1,
    bottom: 1,
    width: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: "#27AE60",
    borderWidth: 3,
    borderColor: DEEP_BLUE,
    alignItems: "center",
    justifyContent: "center",
  },

  heroIdentity: {
    flex: 1,
    minWidth: 0,
  },

  heroName: {
    fontSize: 19,
    fontWeight: "900",
    color: "#FFFFFF",
  },

  volunteerBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(232,197,106,0.14)",
    borderWidth: 1,
    borderColor: "rgba(232,197,106,0.28)",
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 5,
    marginTop: 8,
  },

  volunteerBadgeText: {
    fontSize: 8,
    fontWeight: "900",
    color: GOLD,
    letterSpacing: 0.6,
    marginLeft: 5,
  },

  heroDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.12)",
    marginVertical: 17,
  },

  heroFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  heroFooterLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  statusIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: "rgba(39,174,96,0.14)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  heroFooterLabel: {
    fontSize: 8,
    fontWeight: "800",
    color: "#8498C3",
    letterSpacing: 1,
  },

  heroFooterValue: {
    fontSize: 13,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 2,
  },

  heroEditButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },

  heroEditText: {
    fontSize: 11,
    fontWeight: "900",
    color: DEEP_BLUE,
    marginLeft: 5,
  },

  statsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sectionHeading: {
    fontSize: 15,
    fontWeight: "900",
    color: DEEP_BLUE,
    marginBottom: 11,
  },

  trendIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: LIGHT_BLUE,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  statsCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 21,
    borderWidth: 1,
    borderColor: BORDER,
    paddingVertical: 16,
    marginBottom: 23,
  },

  statItem: {
    flex: 1,
    alignItems: "center",
  },

  statIcon: {
    width: 35,
    height: 35,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 7,
  },

  statNumber: {
    fontSize: 19,
    fontWeight: "900",
    color: DEEP_BLUE,
  },

  statLabel: {
    fontSize: 10,
    color: TEXT_GRAY,
    marginTop: 2,
    fontWeight: "600",
  },

  statDivider: {
    width: 1,
    height: 58,
    backgroundColor: "#E8ECF4",
  },

  quickRow: {
    flexDirection: "row",
    marginBottom: 4,
  },

  quickCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 12,
    marginRight: 8,
    minHeight: 116,
  },

  quickCardLast: {
    marginRight: 0,
  },

  quickIcon: {
    width: 37,
    height: 37,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  quickTitle: {
    fontSize: 11,
    fontWeight: "900",
    color: DEEP_BLUE,
  },

  quickSubtitle: {
    fontSize: 9,
    color: "#8A96B5",
    marginTop: 3,
  },

  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 22,
  },

  sectionCount: {
    fontSize: 10,
    color: "#98A2B3",
    fontWeight: "700",
    marginBottom: 11,
  },

  menuCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BORDER,
    overflow: "hidden",
  },

  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
    paddingVertical: 13,
  },

  menuRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#EEF1F6",
  },

  menuIconWrap: {
    width: 41,
    height: 41,
    borderRadius: 13,
    backgroundColor: LIGHT_BLUE,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  menuTextArea: {
    flex: 1,
    paddingRight: 8,
  },

  menuLabel: {
    fontSize: 13,
    fontWeight: "900",
    color: DEEP_BLUE,
  },

  menuSubtitle: {
    fontSize: 10,
    color: "#8A96B5",
    marginTop: 3,
    lineHeight: 14,
  },

  chevronWrap: {
    width: 28,
    height: 28,
    borderRadius: 9,
    backgroundColor: "#F7F9FC",
    alignItems: "center",
    justifyContent: "center",
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF6F6",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#F8DDDD",
    paddingHorizontal: 13,
    paddingVertical: 13,
    marginTop: 22,
  },

  logoutIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: "#FFEAEA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  logoutTitle: {
    fontSize: 13,
    fontWeight: "900",
    color: "#C73737",
  },

  logoutSubtitle: {
    fontSize: 10,
    color: "#B87575",
    marginTop: 3,
  },

  footer: {
    alignItems: "center",
    paddingTop: 25,
    paddingBottom: 5,
  },

  footerLine: {
    width: 45,
    height: 3,
    borderRadius: 3,
    backgroundColor: "#DCE3F0",
    marginBottom: 12,
  },

  footerBrand: {
    flexDirection: "row",
    alignItems: "center",
  },

  footerLogo: {
    width: 20,
    height: 20,
  },

  footerText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#8A96B5",
    marginLeft: 6,
  },

  version: {
    fontSize: 9,
    color: "#B4BDCE",
    marginTop: 4,
  },

  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: BORDER,
    paddingTop: 7,
    paddingBottom: 17,
    paddingHorizontal: 3,
  },

  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  navIconWrap: {
    width: 34,
    height: 28,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  navIconWrapActive: {
    backgroundColor: LIGHT_BLUE,
  },

  navLabel: {
    fontSize: 8,
    color: "#8A96B5",
    marginTop: 2,
    textAlign: "center",
    fontWeight: "600",
  },

  navLabelActive: {
    color: BRAND_BLUE,
    fontWeight: "900",
  },
});