import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
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

const CURRENT_USER_KEY = "@alkhidmat_current_user";
const PROFILE_KEY = "@alkhidmat_profile";

const ROYAL_BLUE = "#1857D8";
const DEEP_BLUE = "#071A3A";
const MID_BLUE = "#0D2B63";
const GOLD = "#E8C56A";
const BG = "#F5F7FB";

type User = {
  fullName?: string;
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
};

type FAQItem = {
  question: string;
  answer: string;
};

const FAQS: FAQItem[] = [
  {
    question: "How can I register for an opportunity?",
    answer:
      "Open an opportunity from the app, review its details and tap the Register button. Your registration will be saved in your account.",
  },
  {
    question: "How can I view my registered events?",
    answer:
      "Open My Events from the account menu or navigation area to see your upcoming and completed volunteer activities.",
  },
  {
    question: "How do I update my profile?",
    answer:
      "Open My Profile from the account menu. You can update your available profile information there.",
  },
  {
    question: "How does attendance scanning work?",
    answer:
      "Open the Scan section and use the event QR code when attendance scanning is available for your event.",
  },
  {
    question: "How can I get my certificate?",
    answer:
      "After completing an eligible activity, open Certificates to create or view your volunteer certificate.",
  },
];

function getInitials(name: string) {
  const cleanName = name.trim();

  if (!cleanName) {
    return "V";
  }

  const parts = cleanName.split(/\s+/);

  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }

  return (
    parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
  ).toUpperCase();
}

export default function HelpSupportScreen() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem(CURRENT_USER_KEY);

      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
      }
    } catch (error) {
      console.log("User loading error:", error);
    }
  };

  const displayName =
    user?.fullName?.trim() ||
    user?.name?.trim() ||
    "Volunteer";

  const initials = getInitials(displayName);

  const toggleFAQ = (index: number) => {
    setOpenFAQ((current) => (current === index ? null : index));
  };

  const openEmail = async () => {
    try {
      const url = "mailto:support@alkhidmat.org";

      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(
          "Email Support",
          "Please email support@alkhidmat.org from your email app."
        );
      }
    } catch {
      Alert.alert(
        "Email Support",
        "Unable to open your email application."
      );
    }
  };

  const openPhone = async () => {
    try {
      const url = "tel:+922135830009";

      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(
          "Phone Support",
          "Please call +92 21 3583 0009."
        );
      }
    } catch {
      Alert.alert(
        "Phone Support",
        "Unable to open the phone application."
      );
    }
  };

  const goProfile = () => {
    setMenuVisible(false);
    router.push("/profile");
  };

  const goSeniorVolunteers = () => {
    setMenuVisible(false);
    router.push("/senior-volunteers");
  };

  const goHome = () => {
    setMenuVisible(false);
    router.replace("/home");
  };

  const goMyEvents = () => {
    setMenuVisible(false);
    router.push("/my-events");
  };

  const showSettings = () => {
    setMenuVisible(false);

    setTimeout(() => {
      Alert.alert(
        "Settings",
        "Account and app settings are available here."
      );
    }, 150);
  };

  const logout = () => {
    setMenuVisible(false);

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
                await AsyncStorage.multiRemove([
                  CURRENT_USER_KEY,
                  PROFILE_KEY,
                ]);

                router.replace("/login");
              } catch (error) {
                console.log("Logout error:", error);

                Alert.alert(
                  "Logout Error",
                  "Unable to logout. Please try again."
                );
              }
            },
          },
        ]
      );
    }, 150);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.replace("/home")}
            activeOpacity={0.8}
          >
            <Ionicons
              name="arrow-back"
              size={23}
              color={DEEP_BLUE}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Help & Support
          </Text>

          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => setMenuVisible(true)}
            activeOpacity={0.85}
          >
            <Text style={styles.profileInitials}>
              {initials}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >

          {/* HERO */}
          <View style={styles.hero}>
            <View style={styles.heroGlowOne} />
            <View style={styles.heroGlowTwo} />

            <View style={styles.heroTopRow}>
              <View style={styles.heroIcon}>
                <Ionicons
                  name="headset"
                  size={28}
                  color={GOLD}
                />
              </View>

              <View style={styles.heroBadge}>
                <View style={styles.goldDot} />
                <Text style={styles.heroBadgeText}>
                  VOLUNTEER SUPPORT
                </Text>
              </View>
            </View>

            <Text style={styles.heroTitle}>
              Need some help?
            </Text>

            <Text style={styles.heroText}>
              We are here to help you with your volunteer
              journey, events, profile and app experience.
            </Text>

            <View style={styles.heroBottom}>
              <View>
                <Text style={styles.heroWelcome}>
                  Welcome back
                </Text>
                <Text style={styles.heroName}>
                  {displayName}
                </Text>
              </View>

              <Ionicons
                name="arrow-forward"
                size={25}
                color={GOLD}
              />
            </View>
          </View>

          {/* CONTACT */}
          <Text style={styles.sectionTitle}>
            Contact Support
          </Text>

          <View style={styles.contactRow}>

            <TouchableOpacity
              style={styles.contactCard}
              onPress={openEmail}
              activeOpacity={0.85}
            >
              <View style={styles.contactIcon}>
                <Ionicons
                  name="mail"
                  size={23}
                  color={ROYAL_BLUE}
                />
              </View>

              <Text style={styles.contactTitle}>
                Email Us
              </Text>

              <Text style={styles.contactValue}>
                support@alkhidmat.org
              </Text>

              <View style={styles.contactArrow}>
                <Ionicons
                  name="arrow-forward"
                  size={16}
                  color={ROYAL_BLUE}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactCard}
              onPress={openPhone}
              activeOpacity={0.85}
            >
              <View style={styles.contactIcon}>
                <Ionicons
                  name="call"
                  size={23}
                  color={ROYAL_BLUE}
                />
              </View>

              <Text style={styles.contactTitle}>
                Call Us
              </Text>

              <Text style={styles.contactValue}>
                +92 21 3583 0009
              </Text>

              <View style={styles.contactArrow}>
                <Ionicons
                  name="arrow-forward"
                  size={16}
                  color={ROYAL_BLUE}
                />
              </View>
            </TouchableOpacity>

          </View>

          {/* FAQ */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Frequently Asked
              </Text>
              <Text style={styles.sectionSubtitle}>
                Quick answers to common questions
              </Text>
            </View>

            <Ionicons
              name="help-circle"
              size={27}
              color={ROYAL_BLUE}
            />
          </View>

          <View style={styles.faqContainer}>
            {FAQS.map((item, index) => {
              const isOpen = openFAQ === index;

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.faqCard,
                    isOpen && styles.faqCardOpen,
                  ]}
                  onPress={() => toggleFAQ(index)}
                  activeOpacity={0.9}
                >
                  <View style={styles.faqTop}>
                    <View style={styles.faqNumber}>
                      <Text style={styles.faqNumberText}>
                        {String(index + 1).padStart(2, "0")}
                      </Text>
                    </View>

                    <Text style={styles.faqQuestion}>
                      {item.question}
                    </Text>

                    <Ionicons
                      name={
                        isOpen
                          ? "chevron-up"
                          : "chevron-down"
                      }
                      size={20}
                      color={DEEP_BLUE}
                    />
                  </View>

                  {isOpen && (
                    <View style={styles.answerContainer}>
                      <View style={styles.answerLine} />

                      <Text style={styles.faqAnswer}>
                        {item.answer}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* BOTTOM SUPPORT */}
          <View style={styles.bottomSupport}>
            <View style={styles.bottomIcon}>
              <Ionicons
                name="chatbubbles"
                size={25}
                color={GOLD}
              />
            </View>

            <View style={styles.bottomTextWrap}>
              <Text style={styles.bottomTitle}>
                Still need help?
              </Text>

              <Text style={styles.bottomText}>
                Our support team is ready to assist you.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.bottomButton}
              onPress={openEmail}
              activeOpacity={0.85}
            >
              <Ionicons
                name="mail-outline"
                size={18}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.footer}>
            Alkhidmat Volunteer • Help & Support
          </Text>

          <View style={{ height: 30 }} />
        </ScrollView>

        {/* ACCOUNT MENU */}
        <Modal
          visible={menuVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setMenuVisible(false)}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setMenuVisible(false)}
          >
            <Pressable
              style={styles.menuCard}
              onPress={(event) => event.stopPropagation()}
            >

              <View style={styles.menuHeader}>
                <View style={styles.menuAvatar}>
                  <Text style={styles.menuAvatarText}>
                    {initials}
                  </Text>
                </View>

                <View style={styles.menuUserInfo}>
                  <Text
                    style={styles.menuUserName}
                    numberOfLines={1}
                  >
                    {displayName}
                  </Text>

                  <Text
                    style={styles.menuUserEmail}
                    numberOfLines={1}
                  >
                    {user?.email || "Volunteer Account"}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => setMenuVisible(false)}
                >
                  <Ionicons
                    name="close"
                    size={22}
                    color="#667085"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.menuDivider} />

              <TouchableOpacity
                style={styles.menuItem}
                onPress={goHome}
              >
                <View style={styles.menuIcon}>
                  <Ionicons
                    name="home-outline"
                    size={20}
                    color={ROYAL_BLUE}
                  />
                </View>

                <Text style={styles.menuText}>
                  Home
                </Text>

                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color="#A0A8B8"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={goProfile}
              >
                <View style={styles.menuIcon}>
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color={ROYAL_BLUE}
                  />
                </View>

                <Text style={styles.menuText}>
                  My Profile
                </Text>

                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color="#A0A8B8"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={goMyEvents}
              >
                <View style={styles.menuIcon}>
                  <Ionicons
                    name="calendar-outline"
                    size={20}
                    color={ROYAL_BLUE}
                  />
                </View>

                <Text style={styles.menuText}>
                  My Events
                </Text>

                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color="#A0A8B8"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={goSeniorVolunteers}
              >
                <View style={styles.menuIcon}>
                  <Ionicons
                    name="people-outline"
                    size={20}
                    color={ROYAL_BLUE}
                  />
                </View>

                <Text style={styles.menuText}>
                  Senior Volunteers
                </Text>

                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color="#A0A8B8"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={showSettings}
              >
                <View style={styles.menuIcon}>
                  <Ionicons
                    name="settings-outline"
                    size={20}
                    color={ROYAL_BLUE}
                  />
                </View>

                <Text style={styles.menuText}>
                  Settings
                </Text>

                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color="#A0A8B8"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => setMenuVisible(false)}
              >
                <View style={styles.menuIcon}>
                  <Ionicons
                    name="help-circle-outline"
                    size={20}
                    color={ROYAL_BLUE}
                  />
                </View>

                <Text style={styles.menuText}>
                  Help & Support
                </Text>

                <Ionicons
                  name="checkmark"
                  size={19}
                  color={GOLD}
                />
              </TouchableOpacity>

              <View style={styles.menuDivider} />

              <TouchableOpacity
                style={styles.logoutButton}
                onPress={logout}
              >
                <Ionicons
                  name="log-out-outline"
                  size={21}
                  color="#D92D20"
                />

                <Text style={styles.logoutText}>
                  Logout
                </Text>
              </TouchableOpacity>

            </Pressable>
          </Pressable>
        </Modal>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG,
  },

  container: {
    flex: 1,
    backgroundColor: BG,
  },

  header: {
    height: 72,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#E8ECF3",
  },

  backButton: {
    width: 43,
    height: 43,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F5FA",
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 19,
    fontWeight: "800",
    color: DEEP_BLUE,
    marginHorizontal: 10,
  },

  profileButton: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: ROYAL_BLUE,
    alignItems: "center",
    justifyContent: "center",
  },

  profileInitials: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "900",
  },

  scrollContent: {
    padding: 18,
  },

  hero: {
    backgroundColor: DEEP_BLUE,
    borderRadius: 28,
    padding: 22,
    overflow: "hidden",
    minHeight: 255,
    marginBottom: 25,
  },

  heroGlowOne: {
    position: "absolute",
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: "#123B85",
    right: -70,
    top: -75,
    opacity: 0.65,
  },

  heroGlowTwo: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#1857D8",
    left: -65,
    bottom: -55,
    opacity: 0.28,
  },

  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  heroIcon: {
    width: 55,
    height: 55,
    borderRadius: 17,
    backgroundColor: "#102B5E",
    borderWidth: 1,
    borderColor: "#2C4B82",
    alignItems: "center",
    justifyContent: "center",
  },

  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 20,
  },

  goldDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: GOLD,
    marginRight: 7,
  },

  heroBadgeText: {
    color: GOLD,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
  },

  heroTitle: {
    color: "#FFFFFF",
    fontSize: 29,
    fontWeight: "900",
    marginTop: 23,
  },

  heroText: {
    color: "#C8D4EC",
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
    maxWidth: 330,
  },

  heroBottom: {
    marginTop: 22,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.12)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  heroWelcome: {
    color: "#A9B8D8",
    fontSize: 11,
    fontWeight: "600",
  },

  heroName: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 2,
  },

  sectionTitle: {
    color: DEEP_BLUE,
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 13,
  },

  sectionSubtitle: {
    color: "#7A8498",
    fontSize: 12,
    marginTop: -8,
    marginBottom: 15,
  },

  contactRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 28,
  },

  contactCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 15,
    minHeight: 158,
    borderWidth: 1,
    borderColor: "#E6EAF1",
    shadowColor: "#071A3A",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.07,
    shadowRadius: 12,
    elevation: 3,
  },

  contactIcon: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: "#EDF3FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 13,
  },

  contactTitle: {
    color: DEEP_BLUE,
    fontSize: 14,
    fontWeight: "900",
  },

  contactValue: {
    color: "#687386",
    fontSize: 10,
    lineHeight: 15,
    marginTop: 5,
  },

  contactArrow: {
    position: "absolute",
    right: 13,
    bottom: 13,
    width: 27,
    height: 27,
    borderRadius: 9,
    backgroundColor: "#EDF3FF",
    alignItems: "center",
    justifyContent: "center",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  faqContainer: {
    gap: 10,
  },

  faqCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E6EAF1",
    padding: 15,
  },

  faqCardOpen: {
    borderColor: "#BFD1FA",
  },

  faqTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  faqNumber: {
    width: 37,
    height: 37,
    borderRadius: 11,
    backgroundColor: "#EDF3FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  faqNumberText: {
    color: ROYAL_BLUE,
    fontSize: 11,
    fontWeight: "900",
  },

  faqQuestion: {
    flex: 1,
    color: DEEP_BLUE,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "800",
    marginRight: 7,
  },

  answerContainer: {
    flexDirection: "row",
    marginTop: 13,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: "#EEF1F5",
  },

  answerLine: {
    width: 3,
    borderRadius: 2,
    backgroundColor: GOLD,
    marginRight: 12,
  },

  faqAnswer: {
    flex: 1,
    color: "#687386",
    fontSize: 12,
    lineHeight: 19,
  },

  bottomSupport: {
    backgroundColor: MID_BLUE,
    borderRadius: 22,
    padding: 16,
    marginTop: 28,
    flexDirection: "row",
    alignItems: "center",
  },

  bottomIcon: {
    width: 47,
    height: 47,
    borderRadius: 15,
    backgroundColor: "#163A78",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  bottomTextWrap: {
    flex: 1,
  },

  bottomTitle: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },

  bottomText: {
    color: "#B8C8E6",
    fontSize: 11,
    lineHeight: 16,
    marginTop: 3,
  },

  bottomButton: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: ROYAL_BLUE,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },

  footer: {
    textAlign: "center",
    color: "#9AA4B5",
    fontSize: 10,
    marginTop: 22,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.38)",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    paddingTop: 82,
    paddingRight: 14,
    paddingLeft: 28,
  },

  menuCard: {
    width: 330,
    maxWidth: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 14,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },

  menuHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
  },

  menuAvatar: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: ROYAL_BLUE,
    alignItems: "center",
    justifyContent: "center",
  },

  menuAvatarText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "900",
  },

  menuUserInfo: {
    flex: 1,
    marginLeft: 11,
    marginRight: 8,
  },

  menuUserName: {
    color: DEEP_BLUE,
    fontSize: 15,
    fontWeight: "900",
  },

  menuUserEmail: {
    color: "#8992A3",
    fontSize: 10,
    marginTop: 3,
  },

  menuDivider: {
    height: 1,
    backgroundColor: "#EDF0F4",
    marginVertical: 9,
  },

  menuItem: {
    minHeight: 49,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
  },

  menuIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: "#F0F4FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  menuText: {
    flex: 1,
    color: "#26334D",
    fontSize: 13,
    fontWeight: "700",
  },

  logoutButton: {
    height: 48,
    borderRadius: 13,
    backgroundColor: "#FFF2F1",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
  },

  logoutText: {
    color: "#D92D20",
    fontSize: 13,
    fontWeight: "800",
    marginLeft: 11,
  },
});