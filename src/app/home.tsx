import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // ================= NAVIGATION =================

  const openScan = () => router.push("/scan");
  const openMyEvents = () => router.push("/my-events");
  const openAssistant = () => router.push("/assistant");
  const openNearby = () => router.push("/nearby");
  const openCertificates = () => router.push("/certificates");
  const openFlagshipProgram = () =>
    router.push("/flagship-program");
  const openHackathon = () =>
    router.push("/event-hackathon");
  const openVideos = () => router.push("/video");

  const openProfile = () => {
    setMenuOpen(false);
    router.push("/profile");
  };

  const openSettings = () => {
    setMenuOpen(false);
    router.push("/settings");
  };

  const openHelpSupport = () => {
    setMenuOpen(false);
    router.push("/help-support");
  };

  const openSeniorVolunteers = () => {
    setMenuOpen(false);
    router.push("/senior-volunteers");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // ================= WEBSITE =================

  const openAlkhidmatWebsite = async () => {
    try {
      await Linking.openURL("https://alkhidmat.org/");
    } catch {
      Alert.alert(
        "Unable to Open",
        "Alkhidmat website could not be opened."
      );
    }
  };

  // ================= NOTIFICATIONS =================

  const openNotifications = () => {
    setMenuOpen(false);
    router.push("/notifications");
  };

  // ================= LOGOUT =================

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
            onPress: () => {
              router.replace("/login");
            },
          },
        ]
      );
    }, 150);
  };

  // ================= FEATURES =================

  const features = [
    {
      key: "qr",
      icon: "qr-code-outline" as const,
      title: "QR Attendance\n& Certificates",
      description:
        "Mark attendance via QR codes and earn certificates.",
      onPress: openScan,
    },
    {
      key: "my-events",
      icon: "calendar-outline" as const,
      title: "My Events",
      description:
        "Track events you've joined and find new ones.",
      onPress: openMyEvents,
    },
    {
      key: "assistant",
      icon: "chatbubbles-outline" as const,
      title: "AI Assistant",
      description:
        "Get quick guidance and answers when you need it.",
      onPress: openAssistant,
    },
    {
      key: "nearby",
      icon: "location-outline" as const,
      title: "Nearby\nOpportunities",
      description:
        "Discover volunteering opportunities close to you.",
      onPress: openNearby,
    },
    {
      key: "certificates",
      icon: "ribbon-outline" as const,
      title: "Certificates",
      description:
        "View and download certificates you've earned.",
      onPress: openCertificates,
    },
    {
      key: "flagship",
      icon: "school-outline" as const,
      title: "Flagship Program",
      description:
        "Explore free IT training and skill development.",
      onPress: openFlagshipProgram,
    },
  ];

  // ================= UI =================

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ================= HERO ================= */}

        <View style={styles.hero}>
          <View style={styles.heroContent}>
            {/* TOP ROW */}

            <View style={styles.topRow}>
              {/* ALKHIDMAT LOGO */}

              <View style={styles.logoBadge}>
                <Image
                  source={require("../../assets/images/alkhidmat-logo.png")}
                  style={styles.alkhidmatLogo}
                  resizeMode="contain"
                />
              </View>

              {/* RIGHT SIDE */}

              <View style={styles.topRightGroup}>
                {/* NOTIFICATION */}

                <TouchableOpacity
                  style={styles.bellButton}
                  activeOpacity={0.7}
                  onPress={openNotifications}
                >
                  <Ionicons
                    name="notifications-outline"
                    size={19}
                    color="#FFFFFF"
                  />

                  <View style={styles.bellDot} />
                </TouchableOpacity>

                {/* ACCOUNT DROPDOWN */}

                <Pressable
                  style={styles.profileChip}
                  onPress={() => setMenuOpen(true)}
                  hitSlop={10}
                  android_ripple={{
                    color: "rgba(255,255,255,0.18)",
                  }}
                  accessibilityRole="button"
                  accessibilityLabel="Open volunteer account menu"
                >
                  <View style={styles.avatarCircle}>
                    <Ionicons
                      name="person"
                      size={16}
                      color="#1857D8"
                    />
                  </View>

                  <View style={styles.profileChipText}>
                    <Text style={styles.profileChipName}>
                      Volunteer
                    </Text>

                    <Text style={styles.profileChipRole}>
                      Alkhidmat Volunteer
                    </Text>
                  </View>

                  <Ionicons
                    name="chevron-down"
                    size={18}
                    color="#FFFFFF"
                  />
                </Pressable>
              </View>
            </View>

            {/* HERO TEXT */}

            <View style={styles.heroTextArea}>
              <Text style={styles.greeting}>
                Assalam o Alaikum, Welcome back!
              </Text>

              <Text style={styles.heroTitle}>
                Empowering Communities{"\n"}
                <Text style={styles.heroTitleAccent}>
                  Through Volunteering
                </Text>
              </Text>

              <Text style={styles.heroParagraph}>
                Join meaningful opportunities and make a
                positive difference in your community.
              </Text>

              <TouchableOpacity
                style={styles.exploreButton}
                onPress={openHackathon}
                activeOpacity={0.85}
              >
                <Text style={styles.exploreText}>
                  Explore Events
                </Text>

                <Ionicons
                  name="arrow-forward"
                  size={16}
                  color="#10234B"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ================= INTRO ================= */}

        <View style={styles.introRow}>
          <Ionicons
            name="people"
            size={18}
            color="#1857D8"
          />

          <Text style={styles.introText}>
            We spoke with volunteers and found key challenges.
            Here's what can{" "}
            <Text style={styles.introAccent}>
              help you
            </Text>
            :
          </Text>
        </View>

        {/* ================= VIDEOS BUTTON ================= */}

        <TouchableOpacity
          style={styles.videoButton}
          onPress={openVideos}
          activeOpacity={0.88}
        >
          <View style={styles.videoIconBox}>
            <Ionicons
              name="play"
              size={17}
              color="#FFFFFF"
            />
          </View>

          <View style={styles.videoButtonText}>
            <Text style={styles.videoButtonTitle}>
              Watch Alkhidmat Videos
            </Text>

            <Text style={styles.videoButtonSubtitle}>
              Stories, youth initiatives & community impact
            </Text>
          </View>

          <View style={styles.videoArrow}>
            <Ionicons
              name="arrow-forward"
              size={17}
              color="#1857D8"
            />
          </View>
        </TouchableOpacity>

        {/* ================= FEATURE GRID ================= */}

        <View style={styles.featureGrid}>
          {features.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={styles.featureCard}
              onPress={item.onPress}
              activeOpacity={0.8}
            >
              <View style={styles.featureIconCircle}>
                <Ionicons
                  name={item.icon}
                  size={22}
                  color="#FFFFFF"
                />
              </View>

              <Text style={styles.featureTitle}>
                {item.title}
              </Text>

              <Text style={styles.featureDescription}>
                {item.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ================= CTA ================= */}

        <View style={styles.ctaBand}>
          <Text style={styles.ctaHeadline}>
            Which feature would be{"\n"}
            <Text style={styles.ctaHeadlineAccent}>
              most useful
            </Text>{" "}
            to you?
          </Text>

          <TouchableOpacity
            style={styles.ctaButton}
            onPress={openAlkhidmatWebsite}
            activeOpacity={0.85}
          >
            <Ionicons
              name="globe-outline"
              size={16}
              color="#10234B"
            />

            <Text style={styles.ctaButtonTextBold}>
              Visit Alkhidmat.org
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ================= ACCOUNT DROPDOWN ================= */}

      <Modal
        visible={menuOpen}
        transparent
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <View style={styles.modalRoot}>
          {/* BACKDROP */}

          <Pressable
            style={styles.modalBackdrop}
            onPress={closeMenu}
          />

          {/* DROPDOWN */}

          <View style={styles.dropdown}>
            {/* HEADER */}

            <View style={styles.dropdownHeader}>
              <View style={styles.dropdownAvatar}>
                <Ionicons
                  name="person"
                  size={20}
                  color="#1857D8"
                />
              </View>

              <View style={styles.dropdownHeaderText}>
                <Text style={styles.dropdownName}>
                  Volunteer
                </Text>

                <Text style={styles.dropdownRole}>
                  Alkhidmat Volunteer
                </Text>
              </View>

              <Pressable
                onPress={closeMenu}
                hitSlop={10}
                style={styles.closeButton}
              >
                <Ionicons
                  name="close"
                  size={18}
                  color="#64748B"
                />
              </Pressable>
            </View>

            <View style={styles.dropdownDivider} />

            {/* MY PROFILE */}

            <TouchableOpacity
              style={styles.dropdownItem}
              activeOpacity={0.7}
              onPress={openProfile}
            >
              <Ionicons
                name="person-outline"
                size={19}
                color="#1857D8"
              />

              <Text style={styles.dropdownItemText}>
                My Profile
              </Text>

              <Ionicons
                name="chevron-forward"
                size={16}
                color="#94A3B8"
              />
            </TouchableOpacity>

            {/* MY EVENTS */}

            <TouchableOpacity
              style={styles.dropdownItem}
              activeOpacity={0.7}
              onPress={() => {
                setMenuOpen(false);
                openMyEvents();
              }}
            >
              <Ionicons
                name="calendar-outline"
                size={19}
                color="#1857D8"
              />

              <Text style={styles.dropdownItemText}>
                My Events
              </Text>

              <Ionicons
                name="chevron-forward"
                size={16}
                color="#94A3B8"
              />
            </TouchableOpacity>

            {/* SENIOR VOLUNTEERS */}

            <TouchableOpacity
              style={styles.dropdownItem}
              activeOpacity={0.7}
              onPress={openSeniorVolunteers}
            >
              <Ionicons
                name="people-circle-outline"
                size={19}
                color="#1857D8"
              />

              <Text style={styles.dropdownItemText}>
                Senior Volunteers
              </Text>

              <Ionicons
                name="chevron-forward"
                size={16}
                color="#94A3B8"
              />
            </TouchableOpacity>

            {/* SETTINGS */}

            <TouchableOpacity
              style={styles.dropdownItem}
              activeOpacity={0.7}
              onPress={openSettings}
            >
              <Ionicons
                name="settings-outline"
                size={19}
                color="#475569"
              />

              <Text style={styles.dropdownItemText}>
                Settings
              </Text>

              <Ionicons
                name="chevron-forward"
                size={16}
                color="#94A3B8"
              />
            </TouchableOpacity>

            {/* HELP & SUPPORT */}

            <TouchableOpacity
              style={styles.dropdownItem}
              activeOpacity={0.7}
              onPress={openHelpSupport}
            >
              <Ionicons
                name="help-circle-outline"
                size={19}
                color="#475569"
              />

              <Text style={styles.dropdownItemText}>
                Help & Support
              </Text>

              <Ionicons
                name="chevron-forward"
                size={16}
                color="#94A3B8"
              />
            </TouchableOpacity>

            <View style={styles.dropdownDivider} />

            {/* LOGOUT */}

            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <Ionicons
                name="log-out-outline"
                size={19}
                color="#EF4444"
              />

              <Text style={styles.logoutText}>
                Logout
              </Text>

              <Ionicons
                name="chevron-forward"
                size={16}
                color="#EF4444"
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// ================= STYLES =================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  scrollContent: {
    paddingBottom: 20,
  },

  // ================= HERO =================

  hero: {
    marginHorizontal: 16,
    marginTop: 12,
    height: 280,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#10234B",
  },

  heroContent: {
    flex: 1,
    padding: 20,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // ================= LOGO =================

  logoBadge: {
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  alkhidmatLogo: {
    width: 42,
    height: 42,
  },

  // ================= TOP RIGHT =================

  topRightGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  bellButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.16)",
    alignItems: "center",
    justifyContent: "center",
  },

  bellDot: {
    position: "absolute",
    top: 9,
    right: 10,
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#FBBF24",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },

  // ================= PROFILE CHIP =================

  profileChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.16)",
    paddingLeft: 4,
    paddingRight: 10,
    paddingVertical: 4,
    borderRadius: 22,
    gap: 7,
    overflow: "hidden",
  },

  avatarCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  profileChipText: {
    justifyContent: "center",
    maxWidth: 112,
  },

  profileChipName: {
    fontSize: 10,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  profileChipRole: {
    fontSize: 7,
    color: "#DCE6F7",
    marginTop: 1,
  },

  // ================= HERO TEXT =================

  heroTextArea: {
    marginTop: "auto",
  },

  greeting: {
    fontSize: 13,
    color: "#E8EEF9",
    marginBottom: 6,
  },

  heroTitle: {
    fontSize: 23,
    fontWeight: "800",
    color: "#FFFFFF",
    lineHeight: 29,
    marginBottom: 7,
  },

  heroTitleAccent: {
    color: "#FBBF24",
  },

  heroParagraph: {
    fontSize: 12,
    color: "#DCE6F7",
    lineHeight: 18,
    marginBottom: 14,
    maxWidth: 300,
  },

  exploreButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#FBBF24",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
  },

  exploreText: {
    color: "#10234B",
    fontSize: 13,
    fontWeight: "800",
  },

  // ================= MODAL =================

  modalRoot: {
    flex: 1,
  },

  modalBackdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(6,20,46,0.30)",
  },

  // ================= DROPDOWN =================

  dropdown: {
    position: "absolute",
    top: 82,
    right: 18,
    width: 265,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#E8EDF5",
    shadowColor: "#10234B",
    shadowOpacity: 0.18,
    shadowRadius: 16,
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
    gap: 11,
  },

  dropdownAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#EAF0FF",
    alignItems: "center",
    justifyContent: "center",
  },

  dropdownHeaderText: {
    flex: 1,
  },

  dropdownName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#10234B",
  },

  dropdownRole: {
    fontSize: 11,
    color: "#1857D8",
    fontWeight: "600",
    marginTop: 3,
  },

  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },

  dropdownDivider: {
    height: 1,
    backgroundColor: "#EEF2F7",
    marginVertical: 6,
  },

  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 11,
  },

  dropdownItemText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
  },

  logoutText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: "#EF4444",
  },

  // ================= INTRO =================

  introRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    paddingHorizontal: 20,
    marginTop: 22,
    marginBottom: 13,
  },

  introText: {
    flex: 1,
    fontSize: 13,
    color: "#334155",
    lineHeight: 19,
    fontWeight: "600",
  },

  introAccent: {
    color: "#1857D8",
    fontWeight: "800",
  },

  // ================= VIDEO BUTTON =================

  videoButton: {
    marginHorizontal: 20,
    marginBottom: 18,
    minHeight: 68,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCE5F5",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    shadowColor: "#10234B",
    shadowOpacity: 0.07,
    shadowRadius: 7,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 2,
  },

  videoIconBox: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: "#1857D8",
    alignItems: "center",
    justifyContent: "center",
  },

  videoButtonText: {
    flex: 1,
    marginLeft: 12,
  },

  videoButtonTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#10234B",
    marginBottom: 3,
  },

  videoButtonSubtitle: {
    fontSize: 10.5,
    color: "#64748B",
    lineHeight: 15,
  },

  videoArrow: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#EAF0FF",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },

  // ================= FEATURE GRID =================

  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    gap: 12,
  },

  featureCard: {
    width: "47%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: "#E8EDF5",
    shadowColor: "#10234B",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 2,
  },

  featureIconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#1857D8",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  featureTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#10234B",
    marginBottom: 5,
    lineHeight: 17,
  },

  featureDescription: {
    fontSize: 11,
    color: "#64748B",
    lineHeight: 15,
  },

  // ================= CTA =================

  ctaBand: {
    backgroundColor: "#10234B",
    marginTop: 24,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },

  ctaHeadline: {
    fontSize: 17,
    fontWeight: "800",
    color: "#FFFFFF",
    lineHeight: 23,
    marginBottom: 14,
  },

  ctaHeadlineAccent: {
    color: "#FBBF24",
  },

  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FBBF24",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignSelf: "flex-start",
  },

  ctaButtonTextBold: {
    fontSize: 12,
    color: "#10234B",
    fontWeight: "800",
  },
});