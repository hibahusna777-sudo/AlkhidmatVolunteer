import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const COLORS = {
  navy: "#071A3A",
  blue: "#2F6BFF",
  blueDark: "#1746C7",
  blueLight: "#EAF1FF",
  white: "#FFFFFF",
  background: "#F5F8FF",
  text: "#10244A",
  muted: "#71809D",
  border: "#E2E8F5",
  gold: "#E8C56A",
};

const FAQS = [
  {
    q: "How do I register for an event?",
    a: "Open Nearby Opportunities or My Events, select the event you want to join, tap Register Now, and complete your details.",
  },
  {
    q: "How do I get my certificate?",
    a: "After successfully completing a volunteer program, open Certificates from the app menu to view your available certificates.",
  },
  {
    q: "How do I mark my attendance?",
    a: "Open Scan QR from the Home screen and scan the event QR code at the event location to mark your attendance.",
  },
  {
    q: "Where can I find volunteer opportunities?",
    a: "Open Nearby Opportunities or My Events to explore available programs, campaigns, and volunteer activities.",
  },
  {
    q: "What should I do if I have a problem?",
    a: "You can contact our support team through email or phone. Our team will guide you with your issue.",
  },
];

export default function HelpSupportScreen() {
  const router = useRouter();
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const openEmail = () => {
    Linking.openURL("mailto:support@alkhidmat.org");
  };

  const openPhone = () => {
    Linking.openURL("tel:+922135830009");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.page}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Ionicons
              name="chevron-back"
              size={22}
              color={COLORS.navy}
            />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>
              Help & Support
            </Text>

            <Text style={styles.headerSubtitle}>
              We're here to help
            </Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >

          {/* HERO CARD */}
          <View style={styles.heroCard}>
            <View style={styles.heroGlow} />

            <View style={styles.heroIcon}>
              <Ionicons
                name="headset-outline"
                size={30}
                color={COLORS.white}
              />
            </View>

            <View style={styles.heroText}>
              <Text style={styles.heroSmall}>
                VOLUNTEER SUPPORT
              </Text>

              <Text style={styles.heroTitle}>
                Need some help?
              </Text>

              <Text style={styles.heroDescription}>
                Find quick answers or contact our support team.
              </Text>
            </View>

            <View style={styles.goldDot} />
          </View>

          {/* CONTACT SECTION */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Contact Support
              </Text>

              <Text style={styles.sectionSubtitle}>
                Choose how you want to reach us
              </Text>
            </View>

            <View style={styles.sectionIcon}>
              <Ionicons
                name="chatbubbles-outline"
                size={19}
                color={COLORS.blue}
              />
            </View>
          </View>

          {/* EMAIL */}
          <TouchableOpacity
            style={styles.contactCard}
            onPress={openEmail}
            activeOpacity={0.85}
          >
            <View style={styles.contactIconBlue}>
              <Ionicons
                name="mail-outline"
                size={22}
                color={COLORS.blue}
              />
            </View>

            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>
                EMAIL SUPPORT
              </Text>

              <Text style={styles.contactTitle}>
                Send us an email
              </Text>

              <Text style={styles.contactValue}>
                support@alkhidmat.org
              </Text>
            </View>

            <View style={styles.arrowCircle}>
              <Ionicons
                name="arrow-forward"
                size={16}
                color={COLORS.blue}
              />
            </View>
          </TouchableOpacity>

          {/* PHONE */}
          <TouchableOpacity
            style={styles.contactCard}
            onPress={openPhone}
            activeOpacity={0.85}
          >
            <View style={styles.contactIconGreen}>
              <Ionicons
                name="call-outline"
                size={22}
                color="#16865B"
              />
            </View>

            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>
                PHONE SUPPORT
              </Text>

              <Text style={styles.contactTitle}>
                Talk to our team
              </Text>

              <Text style={styles.contactValue}>
                +92 21 3583 0009
              </Text>
            </View>

            <View style={styles.arrowCircle}>
              <Ionicons
                name="arrow-forward"
                size={16}
                color={COLORS.blue}
              />
            </View>
          </TouchableOpacity>

          {/* FAQ HEADER */}
          <View
            style={[
              styles.sectionHeader,
              { marginTop: 28 },
            ]}
          >
            <View>
              <Text style={styles.sectionTitle}>
                Frequently Asked Questions
              </Text>

              <Text style={styles.sectionSubtitle}>
                Quick answers for volunteers
              </Text>
            </View>

            <View style={styles.sectionIcon}>
              <Ionicons
                name="help-circle-outline"
                size={20}
                color={COLORS.blue}
              />
            </View>
          </View>

          {/* FAQ LIST */}
          <View style={styles.faqContainer}>
            {FAQS.map((item, index) => {
              const isOpen = openFAQ === index;

              return (
                <TouchableOpacity
                  key={item.q}
                  style={[
                    styles.faqCard,
                    isOpen && styles.faqCardOpen,
                  ]}
                  onPress={() => toggleFAQ(index)}
                  activeOpacity={0.9}
                >
                  <View style={styles.faqTop}>

                    <View
                      style={[
                        styles.faqNumber,
                        isOpen && styles.faqNumberOpen,
                      ]}
                    >
                      <Text
                        style={[
                          styles.faqNumberText,
                          isOpen &&
                            styles.faqNumberTextOpen,
                        ]}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </Text>
                    </View>

                    <Text style={styles.faqQuestion}>
                      {item.q}
                    </Text>

                    <View
                      style={[
                        styles.faqArrow,
                        isOpen && styles.faqArrowOpen,
                      ]}
                    >
                      <Ionicons
                        name={
                          isOpen
                            ? "chevron-up"
                            : "chevron-down"
                        }
                        size={16}
                        color={
                          isOpen
                            ? COLORS.white
                            : COLORS.muted
                        }
                      />
                    </View>
                  </View>

                  {isOpen && (
                    <View style={styles.answerContainer}>
                      <View style={styles.answerLine} />

                      <Text style={styles.faqAnswer}>
                        {item.a}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* BOTTOM SUPPORT CARD */}
          <View style={styles.bottomCard}>
            <View style={styles.bottomIcon}>
              <Ionicons
                name="heart-outline"
                size={22}
                color={COLORS.blue}
              />
            </View>

            <View style={styles.bottomText}>
              <Text style={styles.bottomTitle}>
                Still need help?
              </Text>

              <Text style={styles.bottomDescription}>
                Our support team is ready to assist you.
              </Text>
            </View>

            <TouchableOpacity
              style={styles.contactButton}
              onPress={openEmail}
              activeOpacity={0.85}
            >
              <Text style={styles.contactButtonText}>
                Contact
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footerText}>
            Alkhidmat Volunteer App • Help & Support
          </Text>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  page: {
    flex: 1,
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
  },

  header: {
    height: 76,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },

  headerCenter: {
    flex: 1,
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: COLORS.navy,
  },

  headerSubtitle: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 2,
    fontWeight: "500",
  },

  headerSpacer: {
    width: 42,
  },

  scrollContent: {
    padding: 18,
    paddingBottom: 35,
  },

  heroCard: {
    minHeight: 150,
    borderRadius: 25,
    padding: 22,
    overflow: "hidden",
    backgroundColor: COLORS.navy,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    position: "relative",
  },

  heroGlow: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    right: -65,
    top: -65,
    backgroundColor: COLORS.blueDark,
    opacity: 0.8,
  },

  goldDot: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 5,
    right: 28,
    bottom: 22,
    backgroundColor: COLORS.gold,
  },

  heroIcon: {
    width: 62,
    height: 62,
    borderRadius: 20,
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 17,
  },

  heroText: {
    flex: 1,
  },

  heroSmall: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.3,
    color: COLORS.gold,
    marginBottom: 5,
  },

  heroTitle: {
    fontSize: 25,
    fontWeight: "900",
    color: COLORS.white,
    marginBottom: 5,
  },

  heroDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: "#C8D5F0",
    maxWidth: 230,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.navy,
  },

  sectionSubtitle: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 3,
  },

  sectionIcon: {
    width: 38,
    height: 38,
    borderRadius: 13,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
  },

  contactCard: {
    minHeight: 88,
    backgroundColor: COLORS.white,
    borderRadius: 19,
    padding: 14,
    marginBottom: 11,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  contactIconBlue: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  contactIconGreen: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: "#E7F7F0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  contactInfo: {
    flex: 1,
  },

  contactLabel: {
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1,
    color: COLORS.blue,
    marginBottom: 3,
  },

  contactTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.text,
  },

  contactValue: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 2,
  },

  arrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },

  faqContainer: {
    gap: 10,
  },

  faqCard: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  faqCardOpen: {
    borderColor: "#BFD0FF",
    backgroundColor: "#FBFCFF",
  },

  faqTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  faqNumber: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  faqNumberOpen: {
    backgroundColor: COLORS.blue,
  },

  faqNumberText: {
    fontSize: 10,
    fontWeight: "900",
    color: COLORS.muted,
  },

  faqNumberTextOpen: {
    color: COLORS.white,
  },

  faqQuestion: {
    flex: 1,
    fontSize: 13,
    lineHeight: 19,

    // FIXED: valid React Native fontWeight
    fontWeight: "700",

    color: COLORS.text,
    paddingRight: 8,
  },

  faqArrow: {
    width: 31,
    height: 31,
    borderRadius: 15.5,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },

  faqArrowOpen: {
    backgroundColor: COLORS.blue,
  },

  answerContainer: {
    flexDirection: "row",
    marginTop: 13,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },

  answerLine: {
    width: 3,
    borderRadius: 2,
    backgroundColor: COLORS.blue,
    marginRight: 11,
  },

  faqAnswer: {
    flex: 1,
    fontSize: 12,
    lineHeight: 19,
    color: COLORS.muted,
  },

  bottomCard: {
    marginTop: 25,
    padding: 15,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
  },

  bottomIcon: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  bottomText: {
    flex: 1,
  },

  bottomTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.navy,
  },

  bottomDescription: {
    fontSize: 10,
    color: COLORS.muted,
    marginTop: 3,
  },

  contactButton: {
    backgroundColor: COLORS.blue,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
  },

  contactButtonText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "800",
  },

  footerText: {
    textAlign: "center",
    fontSize: 9,
    color: "#A2AEC4",
    marginTop: 22,
  },
});