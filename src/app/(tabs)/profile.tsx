import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import type { ComponentProps } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const BRAND_BLUE = "#2F6BFF";
const DEEP_BLUE = "#071A3A";
const MID_BLUE = "#0D2B63";
const LIGHT_BLUE = "#EAF1FF";
const TEXT_GRAY = "#667085";
const BORDER = "#E5EAF3";
const BG = "#F5F7FB";

type IconName = ComponentProps<typeof Ionicons>["name"];

interface MenuItem {
  icon: IconName;
  label: string;
  subtitle: string;
  route: string;
}

const ACCOUNT_ITEMS: MenuItem[] = [
  {
    icon: "create-outline",
    label: "Edit Profile",
    subtitle: "Update your personal information",
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

const OTHER_ITEMS: MenuItem[] = [
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

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log Out",
          style: "destructive",
          onPress: () => router.replace("/login" as any),
        },
      ]
    );
  };

  const openRoute = (route: string) => {
    router.push(route as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.page}>

          {/* =========================================
              HEADER
          ========================================= */}
          <View style={styles.topHeader}>
            <View>
              <Text style={styles.smallGreeting}>MY ACCOUNT</Text>
              <Text style={styles.headerTitle}>Profile</Text>
            </View>

            <TouchableOpacity
              style={styles.headerIcon}
              activeOpacity={0.8}
              onPress={() => router.push("/settings" as any)}
            >
              <Ionicons
                name="settings-outline"
                size={21}
                color={DEEP_BLUE}
              />
            </TouchableOpacity>
          </View>

          {/* =========================================
              HERO PROFILE CARD
          ========================================= */}
          <View style={styles.heroCard}>

            {/* Decorative circles */}
            <View style={styles.heroCircleOne} />
            <View style={styles.heroCircleTwo} />

            <View style={styles.heroTopRow}>
              <View style={styles.avatarOuter}>
                <View style={styles.avatar}>
                  <Ionicons
                    name="person"
                    size={36}
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
                <Text style={styles.heroName}>Samia Qadri</Text>

                <Text style={styles.heroEmail}>
                  samia.qadri@example.com
                </Text>

                <View style={styles.volunteerBadge}>
                  <Ionicons
                    name="ribbon"
                    size={13}
                    color="#E8C56A"
                  />
                  <Text style={styles.volunteerBadgeText}>
                    ACTIVE VOLUNTEER
                  </Text>
                </View>
              </View>
            </View>

            {/* Hero divider */}
            <View style={styles.heroDivider} />

            {/* Hero footer */}
            <View style={styles.heroFooter}>
              <View>
                <Text style={styles.heroFooterLabel}>
                  VOLUNTEER STATUS
                </Text>
                <Text style={styles.heroFooterValue}>
                  Making an Impact
                </Text>
              </View>

              <TouchableOpacity
                style={styles.heroEditButton}
                activeOpacity={0.85}
                onPress={() => openRoute("/edit-profile")}
              >
                <Ionicons
                  name="create-outline"
                  size={17}
                  color={DEEP_BLUE}
                />
                <Text style={styles.heroEditText}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* =========================================
              IMPACT STATS
          ========================================= */}
          <View style={styles.statsHeader}>
            <Text style={styles.sectionHeading}>Your Impact</Text>
            <Ionicons
              name="trending-up-outline"
              size={18}
              color={BRAND_BLUE}
            />
          </View>

          <View style={styles.statsCard}>

            <View style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: "#EAF1FF" }]}>
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
              <View style={[styles.statIcon, { backgroundColor: "#FFF7E1" }]}>
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
              <View style={[styles.statIcon, { backgroundColor: "#E9F8F0" }]}>
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

          {/* =========================================
              QUICK ACTIONS
          ========================================= */}
          <Text style={styles.sectionHeading}>Quick Actions</Text>

          <View style={styles.quickRow}>

            <TouchableOpacity
              style={styles.quickCard}
              activeOpacity={0.82}
              onPress={() => openRoute("/my-events")}
            >
              <View style={[styles.quickIcon, { backgroundColor: "#EAF1FF" }]}>
                <Ionicons
                  name="calendar"
                  size={21}
                  color={BRAND_BLUE}
                />
              </View>

              <Text style={styles.quickTitle}>My Events</Text>
              <Text style={styles.quickSubtitle}>View events</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickCard}
              activeOpacity={0.82}
              onPress={() => openRoute("/certificates")}
            >
              <View style={[styles.quickIcon, { backgroundColor: "#FFF7E1" }]}>
                <Ionicons
                  name="ribbon"
                  size={21}
                  color="#B88718"
                />
              </View>

              <Text style={styles.quickTitle}>Certificates</Text>
              <Text style={styles.quickSubtitle}>Your awards</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.quickCard}
              activeOpacity={0.82}
              onPress={() => openRoute("/notifications")}
            >
              <View style={[styles.quickIcon, { backgroundColor: "#EAF8F2" }]}>
                <Ionicons
                  name="notifications"
                  size={21}
                  color="#26965B"
                />
              </View>

              <Text style={styles.quickTitle}>Updates</Text>
              <Text style={styles.quickSubtitle}>Notifications</Text>
            </TouchableOpacity>

          </View>

          {/* =========================================
              ACCOUNT
          ========================================= */}
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionHeading}>Account</Text>
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

          {/* =========================================
              MORE
          ========================================= */}
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionHeading}>More</Text>
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

          {/* =========================================
              LOGOUT
          ========================================= */}
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

          {/* =========================================
              FOOTER
          ========================================= */}
          <View style={styles.footer}>
            <View style={styles.footerLine} />

            <View style={styles.footerBrand}>
              <Ionicons
                name="heart"
                size={13}
                color={BRAND_BLUE}
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

      {/* =========================================
          BOTTOM NAVIGATION
      ========================================= */}
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
          icon="ribbon-outline"
          label="Certificates"
          onPress={() => router.push("/certificates" as any)}
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

  scrollContent: {
    paddingBottom: 125,
  },

  page: {
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    paddingHorizontal: 18,
    paddingTop: 12,
  },

  /* HEADER */

  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  smallGreeting: {
    fontSize: 10,
    fontWeight: "700",
    color: BRAND_BLUE,
    letterSpacing: 1.4,
    marginBottom: 3,
  },

  headerTitle: {
    fontSize: 27,
    fontWeight: "800",
    color: DEEP_BLUE,
  },

  headerIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: BORDER,
  },

  /* HERO */

  heroCard: {
    backgroundColor: DEEP_BLUE,
    borderRadius: 24,
    padding: 20,
    marginBottom: 22,
    overflow: "hidden",
    minHeight: 205,
  },

  heroCircleOne: {
    position: "absolute",
    width: 170,
    height: 170,
    borderRadius: 85,
    right: -70,
    top: -80,
    backgroundColor: MID_BLUE,
    opacity: 0.75,
  },

  heroCircleTwo: {
    position: "absolute",
    width: 110,
    height: 110,
    borderRadius: 55,
    right: 35,
    bottom: -65,
    backgroundColor: "#123C82",
    opacity: 0.65,
  },

  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatarOuter: {
    position: "relative",
    marginRight: 15,
  },

  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: BRAND_BLUE,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.18)",
  },

  onlineDot: {
    position: "absolute",
    right: 0,
    bottom: 2,
    width: 21,
    height: 21,
    borderRadius: 11,
    backgroundColor: "#27AE60",
    borderWidth: 3,
    borderColor: DEEP_BLUE,
    alignItems: "center",
    justifyContent: "center",
  },

  heroIdentity: {
    flex: 1,
  },

  heroName: {
    fontSize: 21,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  heroEmail: {
    fontSize: 11,
    color: "#AFC0E5",
    marginTop: 4,
  },

  volunteerBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(232,197,106,0.14)",
    borderWidth: 1,
    borderColor: "rgba(232,197,106,0.3)",
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 5,
    marginTop: 9,
  },

  volunteerBadgeText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#E8C56A",
    letterSpacing: 0.6,
    marginLeft: 5,
  },

  heroDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.12)",
    marginVertical: 18,
  },

  heroFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  heroFooterLabel: {
    fontSize: 8,
    fontWeight: "700",
    color: "#8498C3",
    letterSpacing: 1,
  },

  heroFooterValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 3,
  },

  heroEditButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 9,
  },

  heroEditText: {
    fontSize: 12,
    fontWeight: "800",
    color: DEEP_BLUE,
    marginLeft: 5,
  },

  /* SECTION */

  sectionHeading: {
    fontSize: 15,
    fontWeight: "800",
    color: DEEP_BLUE,
    marginBottom: 11,
  },

  statsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    fontWeight: "600",
    marginBottom: 11,
  },

  /* STATS */

  statsCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: BORDER,
    paddingVertical: 16,
    marginBottom: 22,
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
    fontWeight: "800",
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

  /* QUICK ACTIONS */

  quickRow: {
    flexDirection: "row",
    marginBottom: 4,
  },

  quickCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
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
    fontWeight: "800",
    color: DEEP_BLUE,
  },

  quickSubtitle: {
    fontSize: 9,
    color: "#8A96B5",
    marginTop: 3,
  },

  /* MENU */

  menuCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    borderWidth: 1,
    borderColor: BORDER,
    overflow: "hidden",
    marginBottom: 3,
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
    width: 40,
    height: 40,
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
    fontWeight: "800",
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

  /* LOGOUT */

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
    fontWeight: "800",
    color: "#C73737",
  },

  logoutSubtitle: {
    fontSize: 10,
    color: "#B87575",
    marginTop: 3,
  },

  /* FOOTER */

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

  footerText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#8A96B5",
    marginLeft: 5,
  },

  version: {
    fontSize: 9,
    color: "#B4BDCE",
    marginTop: 4,
  },

  /* BOTTOM NAV */

  bottomNav: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5EAF3",
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
    fontWeight: "800",
  },
});