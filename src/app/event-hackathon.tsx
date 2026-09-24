import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const COLORS = {
  navy: "#071A3A",
  navy2: "#0D2B63",
  navy3: "#10234B",
  blue: "#2F6BFF",
  blueLight: "#EAF0FF",
  circleBlue: "#2A5CA8",
  circleBlueLight: "#3D72C4",
  gold: "#E8C56A",
  white: "#FFFFFF",
  background: "#F4F7FC",
  text: "#1E293B",
  muted: "#64748B",
  lightMuted: "#94A3B8",
  border: "#E2E8F0",
  success: "#16A34A",
  danger: "#E14747",
};

const EVENT_DATE = new Date("2026-09-29T17:00:00");

export default function EventHackathonScreen() {
  const router = useRouter();

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [eventCompleted, setEventCompleted] = useState(false);

  // --------------------------------------------------
  // EVENT STATUS
  // --------------------------------------------------
  useEffect(() => {
    const checkEventStatus = () => {
      setEventCompleted(new Date() >= EVENT_DATE);
    };

    checkEventStatus();

    const timer = setInterval(checkEventStatus, 60000);

    return () => clearInterval(timer);
  }, []);

  // --------------------------------------------------
  // GOOGLE MAPS
  // --------------------------------------------------
  const openMap = async () => {
    const query = encodeURIComponent("Expo Center Karachi");

    const googleMapsUrl =
      `https://www.google.com/maps/search/?api=1&query=${query}`;

    const fallbackUrl =
      `https://maps.google.com/?q=${query}`;

    if (Platform.OS === "web") {
      if (typeof window !== "undefined") {
        window.open(googleMapsUrl, "_blank");
      }
      return;
    }

    try {
      const supported = await Linking.canOpenURL(googleMapsUrl);

      if (supported) {
        await Linking.openURL(googleMapsUrl);
      } else {
        await Linking.openURL(fallbackUrl);
      }
    } catch (error) {
      console.log("Google Maps error:", error);

      try {
        await Linking.openURL(fallbackUrl);
      } catch (fallbackError) {
        console.log("Google Maps fallback error:", fallbackError);

        Alert.alert(
          "Could not open Maps",
          "Please try again."
        );
      }
    }
  };

  // --------------------------------------------------
  // REGISTER
  // --------------------------------------------------
  const handleRegister = () => {
    if (eventCompleted) {
      Alert.alert(
        "Event Completed",
        "This event has already taken place."
      );
      return;
    }

    setProfileMenuOpen(false);
    router.push("/register");
  };

  // --------------------------------------------------
  // PROFILE MENU
  // --------------------------------------------------
  const openProfile = () => {
    setProfileMenuOpen(false);
    router.push("/profile");
  };

  const openMyEvents = () => {
    setProfileMenuOpen(false);
    router.push("/my-events");
  };

  const openSettings = () => {
    setProfileMenuOpen(false);
    router.push("/settings" as any);
  };

  const openSeniorVolunteers = () => {
    setProfileMenuOpen(false);
    router.push("/senior-volunteers" as any);
  };

  const openHelpSupport = () => {
    setProfileMenuOpen(false);
    router.push("/help-support" as any);
  };

  const handleLogout = () => {
    setProfileMenuOpen(false);

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* ==================================================
            HEADER
        ================================================== */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Ionicons
              name="arrow-back"
              size={21}
              color={COLORS.navy}
            />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>
              Event Details
            </Text>
          </View>

          <View style={styles.headerPlaceholder} />
        </View>

        {/* ==================================================
            HERO BANNER
        ================================================== */}
        <View style={styles.hero}>
          {/* Decorative circles are now INSIDE clipped layer */}
          <View style={styles.decorativeLayer}>
            <View style={styles.heroCircleOne} />
            <View style={styles.heroCircleTwo} />

            <View style={styles.circuitDot1} />
            <View style={styles.circuitDot2} />
            <View style={styles.circuitLineH} />
            <View style={styles.circuitLineV} />
          </View>

          {/* ==================================================
              HERO TOP
          ================================================== */}
          <View style={styles.heroTop}>
            {/* LEFT EVENT ICON */}
            <View style={styles.heroIcon}>
              <Ionicons
                name="code-slash-outline"
                size={23}
                color={COLORS.gold}
              />
            </View>

            {/* RIGHT VOLUNTEER DROPDOWN */}
            <View style={styles.profileWrapper}>
              <TouchableOpacity
                style={styles.profileDropdown}
                onPress={() =>
                  setProfileMenuOpen(!profileMenuOpen)
                }
                activeOpacity={0.85}
              >
                <View style={styles.profileAvatar}>
                  <Ionicons
                    name="person"
                    size={16}
                    color={COLORS.navy}
                  />
                </View>

                <View style={styles.profileNameBox}>
                  <Text style={styles.profileSmall}>
                    Welcome
                  </Text>

                  <Text
                    style={styles.profileName}
                    numberOfLines={1}
                  >
                    Volunteer
                  </Text>
                </View>

                <Ionicons
                  name={
                    profileMenuOpen
                      ? "chevron-up"
                      : "chevron-down"
                  }
                  size={16}
                  color={COLORS.white}
                />
              </TouchableOpacity>

              {/* DROPDOWN */}
              {profileMenuOpen && (
                <View style={styles.dropdownMenu}>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={openProfile}
                    activeOpacity={0.7}
                  >
                    <View style={styles.dropdownIcon}>
                      <Ionicons
                        name="person-outline"
                        size={19}
                        color={COLORS.blue}
                      />
                    </View>

                    <Text style={styles.dropdownText}>
                      My Profile
                    </Text>

                    <Ionicons
                      name="chevron-forward"
                      size={15}
                      color={COLORS.lightMuted}
                    />
                  </TouchableOpacity>

                  <View style={styles.dropdownDivider} />

                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={openMyEvents}
                    activeOpacity={0.7}
                  >
                    <View style={styles.dropdownIcon}>
                      <Ionicons
                        name="calendar-outline"
                        size={19}
                        color={COLORS.blue}
                      />
                    </View>

                    <Text style={styles.dropdownText}>
                      My Events
                    </Text>

                    <Ionicons
                      name="chevron-forward"
                      size={15}
                      color={COLORS.lightMuted}
                    />
                  </TouchableOpacity>

                  <View style={styles.dropdownDivider} />

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

                    <Text style={styles.dropdownText}>
                      Settings
                    </Text>

                    <Ionicons
                      name="chevron-forward"
                      size={15}
                      color={COLORS.lightMuted}
                    />
                  </TouchableOpacity>

                  <View style={styles.dropdownDivider} />

                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={openSeniorVolunteers}
                    activeOpacity={0.7}
                  >
                    <View style={styles.dropdownIcon}>
                      <Ionicons
                        name="ribbon-outline"
                        size={19}
                        color={COLORS.blue}
                      />
                    </View>

                    <Text style={styles.dropdownText}>
                      Senior Volunteers
                    </Text>

                    <Ionicons
                      name="chevron-forward"
                      size={15}
                      color={COLORS.lightMuted}
                    />
                  </TouchableOpacity>

                  <View style={styles.dropdownDivider} />

                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={openHelpSupport}
                    activeOpacity={0.7}
                  >
                    <View style={styles.dropdownIcon}>
                      <Ionicons
                        name="help-circle-outline"
                        size={19}
                        color={COLORS.blue}
                      />
                    </View>

                    <Text style={styles.dropdownText}>
                      Help & Support
                    </Text>

                    <Ionicons
                      name="chevron-forward"
                      size={15}
                      color={COLORS.lightMuted}
                    />
                  </TouchableOpacity>

                  <View style={styles.dropdownDivider} />

                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={handleLogout}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.dropdownIcon,
                        styles.dropdownIconDanger,
                      ]}
                    >
                      <Ionicons
                        name="log-out-outline"
                        size={19}
                        color={COLORS.danger}
                      />
                    </View>

                    <Text
                      style={[
                        styles.dropdownText,
                        styles.dropdownTextDanger,
                      ]}
                    >
                      Logout
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          {/* ==================================================
              HERO CONTENT
          ================================================== */}
          <View style={styles.heroContent}>
            <View style={styles.eventBadge}>
              <View
                style={[
                  styles.statusDot,
                  eventCompleted &&
                    styles.statusDotCompleted,
                ]}
              />

              <Text style={styles.eventBadgeText}>
                {eventCompleted
                  ? "COMPLETED EVENT"
                  : "FLAGSHIP EVENT"}
              </Text>
            </View>

            <Text style={styles.heroTitle}>
              Alibaba Hackathon
            </Text>

            <Text style={styles.heroSubtitle}>
              Innovation • Technology • Youth
            </Text>

            <View style={styles.heroDivider} />

            <Text style={styles.heroDescription}>
              A special innovation event by Alkhidmat
              bringing young talent together with an
              inspiring internship ending ceremony.
            </Text>
          </View>

          {/* ==================================================
              HERO STATS
          ================================================== */}
          <View style={styles.heroStats}>
            <View style={styles.heroStat}>
              <Ionicons
                name="calendar-outline"
                size={17}
                color={COLORS.gold}
              />

              <Text style={styles.heroStatValue}>
                29 SEP
              </Text>

              <Text style={styles.heroStatLabel}>
                2026
              </Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.heroStat}>
              <Ionicons
                name="time-outline"
                size={17}
                color={COLORS.gold}
              />

              <Text style={styles.heroStatValue}>
                5:00 PM
              </Text>

              <Text style={styles.heroStatLabel}>
                Onward
              </Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.heroStat}>
              <Ionicons
                name="location-outline"
                size={17}
                color={COLORS.gold}
              />

              <Text style={styles.heroStatValue}>
                KARACHI
              </Text>

              <Text style={styles.heroStatLabel}>
                Expo Center
              </Text>
            </View>
          </View>
        </View>

        {/* ==================================================
            EVENT INFORMATION
        ================================================== */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Event Information
          </Text>

          <Text style={styles.sectionHint}>
            Official details
          </Text>
        </View>

        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Ionicons
                name="location-outline"
                size={21}
                color={COLORS.blue}
              />
            </View>

            <Text style={styles.infoLabel}>
              LOCATION
            </Text>

            <Text style={styles.infoValue}>
              Expo Center, Karachi
            </Text>

            <Text style={styles.infoSmall}>
              Karachi, Pakistan
            </Text>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Ionicons
                name="calendar-outline"
                size={21}
                color={COLORS.blue}
              />
            </View>

            <Text style={styles.infoLabel}>
              DATE
            </Text>

            <Text style={styles.infoValue}>
              29 Sep 2026
            </Text>

            <Text style={styles.infoSmall}>
              Tuesday
            </Text>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Ionicons
                name="time-outline"
                size={21}
                color={COLORS.blue}
              />
            </View>

            <Text style={styles.infoLabel}>
              TIME
            </Text>

            <Text style={styles.infoValue}>
              5:00 PM
            </Text>

            <Text style={styles.infoSmall}>
              Onward
            </Text>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Ionicons
                name="people-outline"
                size={21}
                color={COLORS.blue}
              />
            </View>

            <Text style={styles.infoLabel}>
              PARTICIPANTS
            </Text>

            <Text style={styles.infoValue}>
              Volunteers & Interns
            </Text>

            <Text style={styles.infoSmall}>
              Youth & young talent
            </Text>
          </View>
        </View>

        {/* ==================================================
            ABOUT
        ================================================== */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            About This Event
          </Text>
        </View>

        <View style={styles.aboutCard}>
          <View style={styles.aboutAccent} />

          <View style={styles.aboutContent}>
            <View style={styles.aboutHeadingRow}>
              <View style={styles.aboutIcon}>
                <Ionicons
                  name="bulb-outline"
                  size={21}
                  color={COLORS.gold}
                />
              </View>

              <Text style={styles.aboutHeading}>
                Innovation & Celebration
              </Text>
            </View>

            <Text style={styles.description}>
              Join Alkhidmat for a special evening at Expo
              Center Karachi. The Alibaba Hackathon provides
              an opportunity for young talent to explore
              technology, creativity and innovative ideas.
            </Text>

            <Text
              style={[
                styles.description,
                styles.descriptionGap,
              ]}
            >
              The event will also feature the ending ceremony
              of the Alkhidmat internship program, celebrating
              the achievements and journey of participating
              interns.
            </Text>
          </View>
        </View>

        {/* ==================================================
            ORGANIZER
        ================================================== */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Organizer
          </Text>
        </View>

        <View style={styles.organizerCard}>
          <View style={styles.organizerLogo}>
            <Ionicons
              name="business-outline"
              size={25}
              color={COLORS.blue}
            />
          </View>

          <View style={styles.organizerDetails}>
            <Text style={styles.organizerName}>
              Alkhidmat Foundation Pakistan
            </Text>

            <Text style={styles.organizerRole}>
              Official Event Organizer
            </Text>
          </View>

          <View style={styles.verifiedBadge}>
            <Ionicons
              name="checkmark-circle"
              size={19}
              color={COLORS.success}
            />
          </View>
        </View>

        {/* ==================================================
            GOOGLE MAPS
        ================================================== */}
        <TouchableOpacity
          style={styles.mapButton}
          onPress={openMap}
          activeOpacity={0.82}
        >
          <View style={styles.mapIcon}>
            <Ionicons
              name="navigate-outline"
              size={21}
              color={COLORS.blue}
            />
          </View>

          <View style={styles.mapTextContainer}>
            <Text style={styles.mapTitle}>
              Expo Center Karachi
            </Text>

            <Text style={styles.mapSubtitle}>
              Tap to open location in Google Maps
            </Text>
          </View>

          <View style={styles.mapArrow}>
            <Ionicons
              name="open-outline"
              size={18}
              color={COLORS.blue}
            />
          </View>
        </TouchableOpacity>

        {/* ==================================================
            REGISTER
        ================================================== */}
        <View style={styles.registerCard}>
          <View style={styles.registerTop}>
            <View style={styles.registerTextContainer}>
              <Text style={styles.registerTitle}>
                {eventCompleted
                  ? "Event Completed"
                  : "Ready to participate?"}
              </Text>

              <Text style={styles.registerSubtitle}>
                {eventCompleted
                  ? "This flagship event took place on 29 September 2026."
                  : "Secure your place in this flagship event."}
              </Text>
            </View>

            <View style={styles.registerIcon}>
              <Ionicons
                name={
                  eventCompleted
                    ? "checkmark-circle-outline"
                    : "rocket-outline"
                }
                size={23}
                color={COLORS.gold}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.registerButton,
              eventCompleted &&
                styles.registerButtonCompleted,
            ]}
            onPress={handleRegister}
            activeOpacity={eventCompleted ? 1 : 0.85}
          >
            <Text style={styles.registerText}>
              {eventCompleted
                ? "Event Completed"
                : "Register Now"}
            </Text>

            <Ionicons
              name={
                eventCompleted
                  ? "checkmark"
                  : "arrow-forward"
              }
              size={19}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>

        {/* ==================================================
            FOOTER
        ================================================== */}
        <View style={styles.footer}>
          <Ionicons
            name="shield-checkmark-outline"
            size={16}
            color={COLORS.lightMuted}
          />

          <Text style={styles.footerText}>
            Powered by Alkhidmat Volunteer Platform
          </Text>
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

  content: {
    paddingHorizontal: 18,
    paddingBottom: 45,
  },

  // ========================================================
  // HEADER
  // ========================================================

  header: {
    height: 66,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
  },

  headerCenter: {
    flex: 1,
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.navy,
  },

  headerPlaceholder: {
    width: 42,
  },

  // ========================================================
  // HERO
  // ========================================================

  hero: {
    minHeight: 385,
    borderRadius: 26,
    backgroundColor: COLORS.navy,
    padding: 20,
    position: "relative",
    overflow: "hidden",
    shadowColor: COLORS.navy,
    shadowOpacity: 0.20,
    shadowRadius: 14,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    elevation: 6,
  },

  // THIS LAYER CLIPS ALL CIRCLES
  decorativeLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden",
    borderRadius: 26,
  },

  // LIGHT BLUE HALF CIRCLE - TOP RIGHT
  heroCircleOne: {
    position: "absolute",
    width: 190,
    height: 190,
    borderRadius: 95,
    right: -95,
    top: -80,
    backgroundColor: COLORS.circleBlueLight,
    opacity: 0.30,
  },

  // LIGHT BLUE HALF CIRCLE - BOTTOM LEFT
  heroCircleTwo: {
    position: "absolute",
    width: 145,
    height: 145,
    borderRadius: 73,
    left: -75,
    bottom: -78,
    backgroundColor: COLORS.circleBlue,
    opacity: 0.32,
  },

  circuitDot1: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.gold,
    opacity: 0.7,
    right: 42,
    top: 120,
  },

  circuitDot2: {
    position: "absolute",
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: COLORS.gold,
    opacity: 0.5,
    right: 92,
    top: 148,
  },

  circuitLineH: {
    position: "absolute",
    width: 55,
    height: 1,
    backgroundColor: "rgba(232,197,106,0.30)",
    right: 42,
    top: 123,
  },

  circuitLineV: {
    position: "absolute",
    width: 1,
    height: 28,
    backgroundColor: "rgba(232,197,106,0.30)",
    right: 92,
    top: 123,
  },

  // ========================================================
  // HERO TOP
  // ========================================================

  heroTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    position: "relative",
    zIndex: 50,
  },

  // LEFT ICON
  heroIcon: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.10)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },

  // ========================================================
  // RIGHT VOLUNTEER DROPDOWN
  // ========================================================

  profileWrapper: {
    position: "relative",
    zIndex: 200,
    alignItems: "flex-end",
  },

  profileDropdown: {
    width: 145,
    height: 48,
    paddingHorizontal: 8,
    paddingRight: 10,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    flexDirection: "row",
    alignItems: "center",
  },

  profileAvatar: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: COLORS.gold,
    alignItems: "center",
    justifyContent: "center",
  },

  profileNameBox: {
    flex: 1,
    marginLeft: 8,
  },

  profileSmall: {
    fontSize: 8,
    color: "#AFC0DF",
    fontWeight: "600",
  },

  profileName: {
    marginTop: 1,
    fontSize: 12,
    color: COLORS.white,
    fontWeight: "800",
  },

  // DROPDOWN NOW OPENS TO THE LEFT
  dropdownMenu: {
    position: "absolute",
    top: 54,
    right: 0,
    width: 220,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    elevation: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    zIndex: 500,
  },

  dropdownItem: {
    minHeight: 49,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  dropdownIcon: {
    width: 37,
    height: 37,
    borderRadius: 11,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  dropdownIconDanger: {
    backgroundColor: "#FDEAEA",
  },

  dropdownText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.navy,
  },

  dropdownTextDanger: {
    color: COLORS.danger,
  },

  dropdownDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 10,
  },

  // ========================================================
  // HERO CONTENT
  // ========================================================

  heroContent: {
    marginTop: 20,
    position: "relative",
    zIndex: 10,
  },

  eventBadge: {
    alignSelf: "flex-start",
    height: 25,
    paddingHorizontal: 9,
    borderRadius: 20,
    backgroundColor: "rgba(232,197,106,0.12)",
    borderWidth: 1,
    borderColor: "rgba(232,197,106,0.25)",
    flexDirection: "row",
    alignItems: "center",
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.gold,
    marginRight: 6,
  },

  statusDotCompleted: {
    backgroundColor: COLORS.success,
  },

  eventBadgeText: {
    fontSize: 8,
    fontWeight: "800",
    color: COLORS.gold,
    letterSpacing: 0.5,
  },

  heroTitle: {
    marginTop: 11,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "900",
    color: COLORS.white,
    letterSpacing: -0.5,
  },

  heroSubtitle: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.gold,
  },

  heroDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.12)",
    marginVertical: 14,
  },

  heroDescription: {
    fontSize: 11,
    lineHeight: 18,
    color: "#C8D4ED",
    maxWidth: 340,
  },

  // ========================================================
  // HERO STATS
  // ========================================================

  heroStats: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.10)",
    position: "relative",
    zIndex: 10,
  },

  heroStat: {
    flex: 1,
    alignItems: "center",
  },

  heroStatValue: {
    marginTop: 5,
    fontSize: 10,
    fontWeight: "800",
    color: COLORS.white,
  },

  heroStatLabel: {
    marginTop: 2,
    fontSize: 9,
    color: "#9FB0D0",
  },

  statDivider: {
    width: 1,
    height: 35,
    backgroundColor: "rgba(255,255,255,0.12)",
  },

  // ========================================================
  // SECTIONS
  // ========================================================

  sectionHeader: {
    marginTop: 25,
    marginBottom: 11,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: COLORS.navy,
  },

  sectionHint: {
    fontSize: 10,
    fontWeight: "600",
    color: COLORS.lightMuted,
  },

  // ========================================================
  // INFO
  // ========================================================

  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  infoCard: {
    width: "48.3%",
    minHeight: 138,
    backgroundColor: COLORS.white,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    marginBottom: 11,
  },

  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  infoLabel: {
    fontSize: 9,
    fontWeight: "800",
    color: COLORS.lightMuted,
    letterSpacing: 0.5,
  },

  infoValue: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "700",
    color: COLORS.text,
  },

  infoSmall: {
    marginTop: 3,
    fontSize: 10,
    color: COLORS.muted,
  },

  // ========================================================
  // ABOUT
  // ========================================================

  aboutCard: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
  },

  aboutAccent: {
    width: 5,
    backgroundColor: COLORS.blue,
  },

  aboutContent: {
    flex: 1,
    padding: 16,
  },

  aboutHeadingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  aboutIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  aboutHeading: {
    flex: 1,
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.navy,
  },

  description: {
    fontSize: 12,
    lineHeight: 20,
    color: COLORS.muted,
  },

  descriptionGap: {
    marginTop: 10,
  },

  // ========================================================
  // ORGANIZER
  // ========================================================

  organizerCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  organizerLogo: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
  },

  organizerDetails: {
    flex: 1,
    marginLeft: 12,
  },

  organizerName: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.navy,
  },

  organizerRole: {
    marginTop: 4,
    fontSize: 10,
    color: COLORS.muted,
  },

  verifiedBadge: {
    marginLeft: 8,
  },

  // ========================================================
  // MAP
  // ========================================================

  mapButton: {
    marginTop: 13,
    minHeight: 72,
    backgroundColor: COLORS.white,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
  },

  mapIcon: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
  },

  mapTextContainer: {
    flex: 1,
    marginLeft: 11,
  },

  mapTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.navy,
  },

  mapSubtitle: {
    marginTop: 4,
    fontSize: 9,
    color: COLORS.muted,
  },

  mapArrow: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
  },

  // ========================================================
  // REGISTER
  // ========================================================

  registerCard: {
    marginTop: 20,
    borderRadius: 21,
    backgroundColor: COLORS.navy,
    padding: 17,
    overflow: "hidden",
  },

  registerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  registerTextContainer: {
    flex: 1,
    paddingRight: 10,
  },

  registerTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: COLORS.white,
  },

  registerSubtitle: {
    marginTop: 4,
    fontSize: 10,
    lineHeight: 15,
    color: "#AFC0DF",
  },

  registerIcon: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: "rgba(232,197,106,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },

  registerButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: COLORS.blue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  registerButtonCompleted: {
    backgroundColor: COLORS.navy3,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
  },

  registerText: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.white,
    marginRight: 9,
  },

  // ========================================================
  // FOOTER
  // ========================================================

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 22,
  },

  footerText: {
    marginLeft: 6,
    fontSize: 9,
    color: COLORS.lightMuted,
  },
});