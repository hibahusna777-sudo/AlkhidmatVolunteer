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

type EventStatus = "upcoming" | "completed";

type IoniconName = keyof typeof Ionicons.glyphMap;

interface EventItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  location: string;
  icon: IoniconName;
  iconColor: string;
  iconBackground: string;
  status: EventStatus;
  officialUrl: string;
}

const EVENTS: EventItem[] = [
  {
    id: "1",
    title: "Volunteer Management Department",
    subtitle:
      "Volunteer programs, training, field activities and community campaigns.",
    category: "Volunteer Management",
    location: "Pakistan",
    icon: "people-outline",
    iconColor: "#2457D6",
    iconBackground: "#EAF1FF",
    status: "upcoming",
    officialUrl: "https://volunteer.alkhidmat.org/public/about-us",
  },
  {
    id: "2",
    title: "Community Services",
    subtitle:
      "Serving communities through food packages, welfare support and humanitarian services.",
    category: "Community Services",
    location: "Pakistan",
    icon: "heart-outline",
    iconColor: "#159A78",
    iconBackground: "#E8F8F3",
    status: "upcoming",
    officialUrl:
      "https://alkhidmat.org/donations/area-of-work/community-services",
  },
  {
    id: "3",
    title: "Islamic Microfinance / Mawakhat",
    subtitle:
      "Interest-free financial support designed to help deserving families become self-reliant.",
    category: "Islamic Microfinance",
    location: "Pakistan",
    icon: "cash-outline",
    iconColor: "#7550C9",
    iconBackground: "#F1EBFF",
    status: "upcoming",
    officialUrl:
      "https://alkhidmat.org/donations/area-of-work/islamic-microfinance",
  },
  {
    id: "4",
    title: "Blood Donation",
    subtitle:
      "Support safe blood availability for patients, trauma victims and communities in need.",
    category: "Health Services",
    location: "Pakistan",
    icon: "water-outline",
    iconColor: "#D84A4A",
    iconBackground: "#FFF0F0",
    status: "upcoming",
    officialUrl:
      "https://alkhidmat.org/donations/area-of-work/health/blood-bank",
  },
  {
    id: "5",
    title: "Clean Water Awareness",
    subtitle:
      "Promoting access to safe water, sanitation and hygiene for communities in need.",
    category: "WASH Program",
    location: "Pakistan",
    icon: "water-outline",
    iconColor: "#1689C7",
    iconBackground: "#E8F6FD",
    status: "upcoming",
    officialUrl:
      "https://alkhidmat.org/donations/area-of-work/clean-water",
  },
  {
    id: "6",
    title: "Food Distribution",
    subtitle:
      "Food packages and ration support for deserving and underserved families.",
    category: "Food Package / Ration",
    location: "Pakistan",
    icon: "basket-outline",
    iconColor: "#D58A18",
    iconBackground: "#FFF6E6",
    status: "upcoming",
    officialUrl:
      "https://alkhidmat.org/donations/area-of-work/community-services/food-package-ration",
  },
];

const BRAND_BLUE = "#1857D8";
const DARK_BLUE = "#10234B";
const MUTED = "#71809C";

export default function MyEventsScreen() {
  const router = useRouter();

  const [activeTab, setActiveTab] =
    useState<EventStatus>("upcoming");

  const displayedEvents =
    activeTab === "upcoming"
      ? EVENTS.filter((event) => event.status === "upcoming")
      : EVENTS.filter((event) => event.status === "completed");

  const openOfficialProgram = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.log(
        "Unable to open official program:",
        error
      );
    }
  };

  const navigateTo = (route: string) => {
    try {
      router.push(route as any);
    } catch (error) {
      console.log("Navigation error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>
            My Events
          </Text>

          <Text style={styles.headerSubtitle}>
            Manage your volunteering activities
          </Text>
        </View>

        <View style={styles.countCard}>
          <View style={styles.countIcon}>
            <Ionicons
              name="calendar-outline"
              size={19}
              color={BRAND_BLUE}
            />
          </View>

          <View>
            <Text style={styles.countLabel}>
              My Programs
            </Text>

            <Text style={styles.countNumber}>
              {EVENTS.length}
            </Text>
          </View>
        </View>
      </View>

      {/* INTRO */}
      <View style={styles.introCard}>
        <View style={styles.introIcon}>
          <Ionicons
            name="hand-left-outline"
            size={24}
            color={BRAND_BLUE}
          />
        </View>

        <View style={styles.introContent}>
          <Text style={styles.introTitle}>
            Serve Humanity
          </Text>

          <Text style={styles.introText}>
            Explore Alkhidmat programs and contribute to
            meaningful community service.
          </Text>
        </View>
      </View>

      {/* TABS */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "upcoming" &&
              styles.activeTab,
          ]}
          onPress={() => setActiveTab("upcoming")}
          activeOpacity={0.85}
        >
          <Ionicons
            name="calendar-outline"
            size={16}
            color={
              activeTab === "upcoming"
                ? "#FFFFFF"
                : BRAND_BLUE
            }
          />

          <Text
            style={[
              styles.tabText,
              activeTab === "upcoming" &&
                styles.activeTabText,
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "completed" &&
              styles.activeTab,
          ]}
          onPress={() => setActiveTab("completed")}
          activeOpacity={0.85}
        >
          <Ionicons
            name="checkmark-circle-outline"
            size={16}
            color={
              activeTab === "completed"
                ? "#FFFFFF"
                : BRAND_BLUE
            }
          />

          <Text
            style={[
              styles.tabText,
              activeTab === "completed" &&
                styles.activeTabText,
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {/* PROGRAM LIST */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {displayedEvents.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons
                name="checkmark-done-outline"
                size={38}
                color={BRAND_BLUE}
              />
            </View>

            <Text style={styles.emptyTitle}>
              No completed events
            </Text>

            <Text style={styles.emptyText}>
              Your completed volunteering activities will
              appear here.
            </Text>
          </View>
        ) : (
          displayedEvents.map((event, index) => (
            <TouchableOpacity
              key={event.id}
              style={styles.eventCard}
              activeOpacity={0.88}
              onPress={() =>
                openOfficialProgram(event.officialUrl)
              }
            >
              {/* LEFT COLOR LINE */}
              <View
                style={[
                  styles.leftLine,
                  {
                    backgroundColor: event.iconColor,
                  },
                ]}
              />

              {/* PROGRAM ICON */}
              <View
                style={[
                  styles.eventIcon,
                  {
                    backgroundColor:
                      event.iconBackground,
                  },
                ]}
              >
                <Ionicons
                  name={event.icon}
                  size={31}
                  color={event.iconColor}
                />
              </View>

              {/* INFORMATION */}
              <View style={styles.eventInfo}>
                <View style={styles.titleRow}>
                  <Text
                    style={styles.eventTitle}
                    numberOfLines={2}
                  >
                    {event.title}
                  </Text>

                  {index === 0 && (
                    <View
                      style={styles.featuredBadge}
                    >
                      <Ionicons
                        name="star-outline"
                        size={10}
                        color={BRAND_BLUE}
                      />

                      <Text
                        style={styles.featuredText}
                      >
                        Featured
                      </Text>
                    </View>
                  )}
                </View>

                <Text
                  style={styles.description}
                  numberOfLines={2}
                >
                  {event.subtitle}
                </Text>

                <View style={styles.detailsRow}>
                  <View style={styles.detail}>
                    <Ionicons
                      name="pricetag-outline"
                      size={13}
                      color={MUTED}
                    />

                    <Text
                      style={styles.detailText}
                    >
                      {event.category}
                    </Text>
                  </View>

                  <View style={styles.detail}>
                    <Ionicons
                      name="location-outline"
                      size={13}
                      color={MUTED}
                    />

                    <Text
                      style={styles.detailText}
                    >
                      {event.location}
                    </Text>
                  </View>
                </View>

                <View style={styles.bottomRow}>
                  <View
                    style={styles.availableBadge}
                  >
                    <Ionicons
                      name="checkmark-circle"
                      size={13}
                      color="#16803C"
                    />

                    <Text
                      style={styles.availableText}
                    >
                      Available
                    </Text>
                  </View>

                  <Text style={styles.viewProgram}>
                    View Program
                  </Text>
                </View>
              </View>

              {/* ARROW */}
              <View style={styles.arrowBox}>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={BRAND_BLUE}
                />
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* BOTTOM NAVIGATION */}
      <View style={styles.bottomNav}>
        {/* HOME */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigateTo("/home")}
          activeOpacity={0.75}
        >
          <Ionicons
            name="home-outline"
            size={21}
            color="#7B879C"
          />

          <Text style={styles.navText}>
            Home
          </Text>
        </TouchableOpacity>

        {/* PROGRAMS */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() =>
            navigateTo("/flagship-program")
          }
          activeOpacity={0.75}
        >
          <Ionicons
            name="flag-outline"
            size={21}
            color="#7B879C"
          />

          <Text style={styles.navText}>
            Programs
          </Text>
        </TouchableOpacity>

        {/* MY EVENTS */}
        <TouchableOpacity
          style={styles.navItem}
          activeOpacity={0.75}
        >
          <View style={styles.activeNavIcon}>
            <Ionicons
              name="calendar"
              size={20}
              color={BRAND_BLUE}
            />
          </View>

          <Text style={styles.activeNavText}>
            My Events
          </Text>
        </TouchableOpacity>

        {/* NEARBY */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigateTo("/nearby")}
          activeOpacity={0.75}
        >
          <Ionicons
            name="location-outline"
            size={21}
            color="#7B879C"
          />

          <Text style={styles.navText}>
            Nearby
          </Text>
        </TouchableOpacity>

        {/* CERTIFICATES */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() =>
            navigateTo("/certificates")
          }
          activeOpacity={0.75}
        >
          <Ionicons
            name="ribbon-outline"
            size={21}
            color="#7B879C"
          />

          <Text style={styles.navText}>
            Certificates
          </Text>
        </TouchableOpacity>

        {/* PROFILE */}
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigateTo("/profile")}
          activeOpacity={0.75}
        >
          <Ionicons
            name="person-outline"
            size={21}
            color="#7B879C"
          />

          <Text style={styles.navText}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFE",
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerLeft: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 27,
    fontWeight: "800",
    color: DARK_BLUE,
  },

  headerSubtitle: {
    fontSize: 12,
    color: MUTED,
    marginTop: 4,
  },

  countCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF4FF",
    borderWidth: 1,
    borderColor: "#DCE7FC",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginLeft: 8,
  },

  countIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 7,
  },

  countLabel: {
    fontSize: 8,
    color: MUTED,
    fontWeight: "600",
  },

  countNumber: {
    fontSize: 16,
    fontWeight: "800",
    color: BRAND_BLUE,
    marginTop: 1,
  },

  introCard: {
    marginHorizontal: 20,
    marginBottom: 13,
    padding: 13,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E4EAF4",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#163A73",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 2,
  },

  introIcon: {
    width: 47,
    height: 47,
    borderRadius: 14,
    backgroundColor: "#EAF1FF",
    alignItems: "center",
    justifyContent: "center",
  },

  introContent: {
    flex: 1,
    marginLeft: 11,
  },

  introTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: DARK_BLUE,
  },

  introText: {
    fontSize: 10.5,
    color: MUTED,
    marginTop: 3,
    lineHeight: 15,
  },

  tabs: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginBottom: 13,
    padding: 4,
    borderRadius: 14,
    backgroundColor: "#EEF3FA",
    borderWidth: 1,
    borderColor: "#DDE6F2",
  },

  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 9,
    borderRadius: 10,
  },

  activeTab: {
    backgroundColor: BRAND_BLUE,
  },

  tabText: {
    fontSize: 13,
    fontWeight: "700",
    color: BRAND_BLUE,
    marginLeft: 5,
  },

  activeTabText: {
    color: "#FFFFFF",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  eventCard: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    marginBottom: 11,
    paddingVertical: 12,
    paddingLeft: 12,
    paddingRight: 9,
    borderWidth: 1,
    borderColor: "#E2E8F2",
    shadowColor: "#163A73",
    shadowOpacity: 0.045,
    shadowRadius: 9,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 2,
  },

  leftLine: {
    position: "absolute",
    left: 0,
    top: 12,
    bottom: 12,
    width: 3,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },

  eventIcon: {
    width: 62,
    height: 62,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    marginRight: 11,
  },

  eventInfo: {
    flex: 1,
    minWidth: 0,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  eventTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "800",
    color: DARK_BLUE,
  },

  featuredBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF4FF",
    borderRadius: 6,
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginLeft: 5,
  },

  featuredText: {
    fontSize: 7.5,
    fontWeight: "800",
    color: BRAND_BLUE,
    marginLeft: 2,
  },

  description: {
    fontSize: 10.5,
    color: MUTED,
    lineHeight: 15,
    marginTop: 4,
  },

  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 6,
  },

  detail: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    marginBottom: 2,
  },

  detailText: {
    fontSize: 9,
    color: MUTED,
    marginLeft: 3,
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },

  availableBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF8EF",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },

  availableText: {
    fontSize: 8.5,
    fontWeight: "800",
    color: "#16803C",
    marginLeft: 3,
  },

  viewProgram: {
    fontSize: 9,
    fontWeight: "800",
    color: BRAND_BLUE,
  },

  arrowBox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#EDF3FF",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 6,
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 65,
    paddingHorizontal: 30,
  },

  emptyIcon: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#EAF1FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 13,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: DARK_BLUE,
  },

  emptyText: {
    fontSize: 12,
    color: MUTED,
    textAlign: "center",
    marginTop: 5,
    lineHeight: 18,
  },

  bottomNav: {
    minHeight: 67,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5EAF2",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 2,
    paddingBottom: 3,
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    elevation: 8,
  },

  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
  },

  navText: {
    fontSize: 8.5,
    fontWeight: "600",
    color: "#7B879C",
    marginTop: 3,
  },

  activeNavIcon: {
    width: 36,
    height: 29,
    borderRadius: 9,
    backgroundColor: "#EAF1FF",
    alignItems: "center",
    justifyContent: "center",
  },

  activeNavText: {
    fontSize: 8.5,
    fontWeight: "800",
    color: BRAND_BLUE,
    marginTop: 3,
  },
});
