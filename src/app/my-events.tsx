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

  featured?: boolean;

}


/* =========================================================

   ALKHIDMAT PROGRAMS

   \========================================================= */


const EVENTS: EventItem[] = [

  {

    id: "1",

    title: "Islamic Microfinance / Mawakhat",

    subtitle:

      "Interest-free financial support helping deserving families build stable and self-reliant lives.",

    category: "Islamic Microfinance",

    location: "Pakistan",

    icon: "cash-outline",

    iconColor: "#D5A52B",

    iconBackground: "#FFF8E5",

    status: "upcoming",

    featured: true,

    officialUrl:

      "https://alkhidmat.org/donations/area-of-work/islamic-microfinance",

  },

  {

    id: "2",

    title: "Community Services",

    subtitle:

      "Community welfare, food support, humanitarian assistance and services for people in need.",

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

    title: "Volunteer Management Department",

    subtitle:

      "Volunteer programs, training, field activities and meaningful community campaigns.",

    category: "Volunteer Management",

    location: "Pakistan",

    icon: "people-outline",

    iconColor: "#2F6BFF",

    iconBackground: "#EAF1FF",

    status: "upcoming",

    officialUrl:

      "https://volunteer.alkhidmat.org/public/about-us",

  },

  {

    id: "4",

    title: "Blood Donation",

    subtitle:

      "Supporting safe blood availability for patients and communities through organized donation activities.",

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

      "Promoting safe water, sanitation and hygiene awareness for communities in need.",

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


const ALKHIDMAT_LOGO = require("../../assets/images/alkhidmat-logo.png");

const COLORS = {

  navy: "#071A3A",

  navy2: "#0D2B63",

  blue: "#2F6BFF",

  blueLight: "#EAF1FF",

  white: "#FFFFFF",

  background: "#F5F8FD",

  text: "#10234B",

  muted: "#71809C",

  border: "#E1E8F3",

  green: "#16803C",

  greenLight: "#EAF8EF",

};




export default function MyEventsScreen() {

  const router = useRouter();


  const [activeTab, setActiveTab] =

    useState<EventStatus>("upcoming");


  const [menuOpen, setMenuOpen] = useState(false);


  const displayedEvents = EVENTS.filter(

    (event) => event.status === activeTab

  );


  /* =========================================================

     OFFICIAL PROGRAM

     \========================================================= */


  const openOfficialProgram = async (url: string) => {

    try {

      const supported = await Linking.canOpenURL(url);


      if (supported) {

        await Linking.openURL(url);

      } else {

        Alert.alert(

          "Unable to Open",

          "The official program page could not be opened."

        );

      }

    } catch {

      Alert.alert(

        "Unable to Open",

        "Something went wrong while opening the official program."

      );

    }

  };


  /* =========================================================

     NAVIGATION

     \========================================================= */


  const navigateTo = (route: string) => {

    setMenuOpen(false);


    try {

      router.push(route as any);

    } catch (error) {

      console.log("Navigation error:", error);

    }

  };


  /* =========================================================

     PROFILE MENU

     \========================================================= */


  const openProfile = () => {

    setMenuOpen(false);

    router.push("/profile" as any);

  };


  const openSettings = () => {

    setMenuOpen(false);

    router.push("/settings" as any);

  };


  const openSeniorVolunteers = () => {

    setMenuOpen(false);

    router.push("/senior-volunteers" as any);

  };


  const openHelp = () => {

    setMenuOpen(false);

    router.push("/help-support" as any);

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

            onPress: () => {

              router.replace("/login" as any);

            },

          },

        ]

      );

    }, 200);

  };


  /* =========================================================

     PROFILE DROPDOWN ITEMS

     \========================================================= */


  const menuItems = [

    {

      key: "profile",

      icon: "person-outline" as const,

      label: "My Profile",

      onPress: openProfile,

      highlighted: false,

    },

    {

      key: "settings",

      icon: "settings-outline" as const,

      label: "Settings",

      onPress: openSettings,

      highlighted: false,

    },

    {

      key: "senior",

      icon: "people-circle-outline" as const,

      label: "Senior Volunteers",

      onPress: openSeniorVolunteers,

      highlighted: true,

    },

    {

      key: "help",

      icon: "help-circle-outline" as const,

      label: "Help & Support",

      onPress: openHelp,

      highlighted: false,

    },

  ];


  return (

    <SafeAreaView style={styles.container}>

      <ScrollView

        showsVerticalScrollIndicator={false}

        contentContainerStyle={styles.pageContent}

      >

        {/* =================================================

            HERO HEADER

            \================================================= */}


        <View style={styles.hero}>

          {/* Decorative circles */}


          <View style={styles.heroCircleOne} />

          <View style={styles.heroCircleTwo} />


          {/* HERO TOP ROW */}


          <View style={styles.heroTopRow}>

            {/* BACK BUTTON */}


            <TouchableOpacity

              style={styles.backButton}

              onPress={() => router.back()}

              activeOpacity={0.8}

            >

              <Ionicons

                name="arrow-back"

                size={20}

                color={COLORS.white}

              />

            </TouchableOpacity>


            {/* PROFILE DROPDOWN */}


            <TouchableOpacity

              style={styles.profileChip}

              onPress={() => setMenuOpen(true)}

              activeOpacity={0.85}

            >

              <View style={styles.profileAvatar}>

                <Text style={styles.profileAvatarText}>

                  <Ionicons name="person" size={19} color={COLORS.blue} />

                </Text>

              </View>


              <View style={styles.profileTextArea}>

                <Text style={styles.profileName}>

                  Volunteer

                </Text>


                <Text style={styles.profileRole}>

                  Alkhidmat Volunteer

                </Text>

              </View>


              <Ionicons

                name="chevron-down"

                size={15}

                color={COLORS.white}

              />

            </TouchableOpacity>

          </View>


          {/* HERO BADGE */}


          <View style={styles.heroBadge}>

            <View style={styles.onlineDot} />


            <Text style={styles.heroBadgeText}>

              VOLUNTEER HUB

            </Text>

          </View>


          {/* HERO ICON */}


          <View style={styles.heroIcon}>
            <Image
              source={ALKHIDMAT_LOGO}
              style={styles.heroLogo}
              resizeMode="contain"
              accessibilityLabel="Alkhidmat Foundation logo"
            />
          </View>


          <Text style={styles.heroTitle}>

            My Events

          </Text>


          <Text style={styles.heroSubtitle}>

            Discover programs, serve communities

            {"\n"}

            and make a meaningful difference.

          </Text>


          {/* HERO STATS */}


          <View style={styles.heroStats}>

            <View style={styles.heroStat}>

              <Text style={styles.heroStatNumber}>

                {EVENTS.length}

              </Text>


              <Text style={styles.heroStatLabel}>

                Programs

              </Text>

            </View>


            <View style={styles.statDivider} />


            <View style={styles.heroStat}>

              <Text style={styles.heroStatNumber}>

                {

                  EVENTS.filter(

                    (event) => event.status === "upcoming"

                  ).length

                }

              </Text>


              <Text style={styles.heroStatLabel}>

                Available

              </Text>

            </View>


            <View style={styles.statDivider} />


            <View style={styles.heroStat}>

              <Ionicons

                name="globe-outline"

                size={22}

                color={COLORS.white}

              />


              <Text style={styles.heroStatLabel}>

                Pakistan

              </Text>

            </View>

          </View>

        </View>


        {/* =================================================

            SECTION INTRO

            \================================================= */}


        <View style={styles.sectionHeader}>

          <View>

            <Text style={styles.sectionEyebrow}>

              EXPLORE OPPORTUNITIES

            </Text>


            <Text style={styles.sectionTitle}>

              Programs for Impact

            </Text>

          </View>


          <View style={styles.programCount}>

            <Text style={styles.programCountText}>

              {displayedEvents.length}

            </Text>

          </View>

        </View>


        {/* =================================================

            TABS

            \================================================= */}


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

              name="sparkles-outline"

              size={16}

              color={

                activeTab === "upcoming"

                  ? COLORS.white

                  : COLORS.blue

              }

            />


            <Text

              style={[

                styles.tabText,

                activeTab === "upcoming" &&

                  styles.activeTabText,

              ]}

            >

              Available

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

                  ? COLORS.white

                  : COLORS.blue

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


        {/* =================================================

            PROGRAM CARDS

            \================================================= */}


        {displayedEvents.length === 0 ? (

          <View style={styles.emptyState}>

            <View style={styles.emptyIcon}>

              <Ionicons

                name="checkmark-done-outline"

                size={38}

                color={COLORS.blue}

              />

            </View>


            <Text style={styles.emptyTitle}>

              No completed events yet

            </Text>


            <Text style={styles.emptyText}>

              Your completed volunteering activities

              will appear here.

            </Text>


            <TouchableOpacity

              style={styles.emptyButton}

              onPress={() => setActiveTab("upcoming")}

              activeOpacity={0.85}

            >

              <Text style={styles.emptyButtonText}>

                Explore Programs

              </Text>


              <Ionicons

                name="arrow-forward"

                size={16}

                color={COLORS.white}

              />

            </TouchableOpacity>

          </View>

        ) : (

          displayedEvents.map((event) => (

            <TouchableOpacity

              key={event.id}

              style={[

                styles.eventCard,

                event.featured && styles.featuredCard,

              ]}

              activeOpacity={0.9}

              onPress={() =>

                openOfficialProgram(event.officialUrl)

              }

            >

              {/* FEATURED */}


              {event.featured && (

                <View style={styles.featuredTop}>

                  <Ionicons

                    name="star"

                    size={11}

                    color="#C38D12"

                  />


                  <Text style={styles.featuredTopText}>

                    PRIORITY PROGRAM

                  </Text>

                </View>

              )}


              <View style={styles.cardMainRow}>

                {/* ICON */}


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

                    size={29}

                    color={event.iconColor}

                  />

                </View>


                {/* CONTENT */}


                <View style={styles.eventInfo}>

                  <View style={styles.titleRow}>

                    <Text

                      style={styles.eventTitle}

                      numberOfLines={2}

                    >

                      {event.title}

                    </Text>


                    <View style={styles.arrowBox}>

                      <Ionicons

                        name="chevron-forward"

                        size={16}

                        color={COLORS.blue}

                      />

                    </View>

                  </View>


                  <Text

                    style={styles.description}

                    numberOfLines={3}

                  >

                    {event.subtitle}

                  </Text>


                  {/* DETAILS */}


                  <View style={styles.detailsRow}>

                    <View style={styles.detailChip}>

                      <Ionicons

                        name="pricetag-outline"

                        size={12}

                        color={COLORS.muted}

                      />


                      <Text

                        style={styles.detailText}

                        numberOfLines={1}

                      >

                        {event.category}

                      </Text>

                    </View>


                    <View style={styles.detailChip}>

                      <Ionicons

                        name="location-outline"

                        size={12}

                        color={COLORS.muted}

                      />


                      <Text style={styles.detailText}>

                        {event.location}

                      </Text>

                    </View>

                  </View>

                </View>

              </View>


              {/* CARD FOOTER */}


              <View style={styles.cardFooter}>

                <View style={styles.availableBadge}>

                  <View style={styles.availableDot} />


                  <Text style={styles.availableText}>

                    Open for Volunteers

                  </Text>

                </View>


                <Text style={styles.viewProgram}>

                  Official Program

                </Text>


                <Ionicons

                  name="chevron-forward"

                  size={15}

                  color={COLORS.blue}

                />

              </View>

            </TouchableOpacity>

          ))

        )}


        {/* =================================================

            MOTIVATION CARD

            \================================================= */}


        <View style={styles.motivationCard}>

          <View style={styles.motivationIcon}>

            <Ionicons

              name="hand-left-outline"

              size={24}

              color={COLORS.white}

            />

          </View>


          <View style={styles.motivationContent}>

            <Text style={styles.motivationTitle}>

              Serve With Purpose

            </Text>


            <Text style={styles.motivationText}>

              Every volunteer action can become a

              positive change in someone's life.

            </Text>

          </View>


          <Ionicons

            name="arrow-forward-circle-outline"

            size={25}

            color="#8DAFFF"

          />

        </View>


        <Text style={styles.footerText}>

          Alkhidmat Volunteer Network

        </Text>

      </ScrollView>


      {/* =================================================

          PROFILE DROPDOWN

          \================================================= */}


      <Modal

        visible={menuOpen}

        transparent

        animationType="fade"

        onRequestClose={() => setMenuOpen(false)}

      >

        <View style={styles.modalContainer}>

          {/* BACKDROP */}


          <Pressable

            style={styles.modalBackdrop}

            onPress={() => setMenuOpen(false)}

          />


          {/* DROPDOWN */}


          <View style={styles.dropdown}>

            {/* USER HEADER */}


            <View style={styles.dropdownHeader}>

              <View style={styles.dropdownAvatar}>

                <Text style={styles.dropdownAvatarText}>

                  <Ionicons name="person" size={21} color={COLORS.blue} />

                </Text>

              </View>


              <View style={styles.dropdownUserInfo}>

                <Text style={styles.dropdownName}>

                  Volunteer

                </Text>


                <Text style={styles.dropdownRole}>

                  Alkhidmat Volunteer

                </Text>

              </View>


              <TouchableOpacity

                style={styles.closeButton}

                onPress={() => setMenuOpen(false)}

                activeOpacity={0.7}

              >

                <Ionicons

                  name="close"

                  size={17}

                  color="#64748B"

                />

              </TouchableOpacity>

            </View>


            <View style={styles.dropdownDivider} />


            {/* MENU ITEMS */}


            {menuItems.map((item) => (

              <TouchableOpacity

                key={item.key}

                style={[

                  styles.dropdownItem,

                  item.highlighted &&

                    styles.dropdownItemActive,

                ]}

                onPress={item.onPress}

                activeOpacity={0.75}

              >

                <View

                  style={[

                    styles.menuIconBox,

                    item.highlighted &&

                      styles.menuIconBoxActive,

                  ]}

                >

                  <Ionicons

                    name={item.icon}

                    size={18}

                    color={

                      item.highlighted

                        ? COLORS.blue

                        : "#475569"

                    }

                  />

                </View>


                <Text

                  style={[

                    styles.dropdownItemText,

                    item.highlighted &&

                      styles.dropdownItemTextActive,

                  ]}

                >

                  {item.label}

                </Text>


                <Ionicons

                  name="chevron-forward"

                  size={14}

                  color={

                    item.highlighted

                      ? COLORS.blue

                      : "#94A3B8"

                  }

                />

              </TouchableOpacity>

            ))}


            <View style={styles.dropdownDivider} />


            {/* LOGOUT */}


            <TouchableOpacity

              style={styles.dropdownItem}

              onPress={handleLogout}

              activeOpacity={0.75}

            >

              <View style={styles.menuIconBoxLogout}>

                <Ionicons

                  name="log-out-outline"

                  size={18}

                  color="#EF4444"

                />

              </View>


              <Text style={styles.logoutText}>

                Logout

              </Text>

            </TouchableOpacity>

          </View>

        </View>

      </Modal>


      {/* =================================================

          BOTTOM NAVIGATION

          \================================================= */}


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

            navigateTo("/event-hackathon")

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

              color={COLORS.blue}

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


/* =========================================================

   STYLES

   \========================================================= */


const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor: COLORS.background,

  },


  pageContent: {

    paddingBottom: 24,

  },


  /* ================= HERO ================= */


  hero: {

    marginHorizontal: 16,

    marginTop: 8,

    borderRadius: 28,

    padding: 20,

    minHeight: 255,

    backgroundColor: COLORS.navy,

    overflow: "hidden",

  },


  heroCircleOne: {

    position: "absolute",

    width: 190,

    height: 190,

    borderRadius: 95,

    right: -70,

    top: -75,

    backgroundColor: "#163A78",

    opacity: 0.7,

  },


  heroCircleTwo: {

    position: "absolute",

    width: 150,

    height: 150,

    borderRadius: 75,

    left: -90,

    bottom: -80,

    backgroundColor: "#12305F",

    opacity: 0.7,

  },


  heroTopRow: {

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

  },


  backButton: {

    width: 40,

    height: 40,

    borderRadius: 13,

    backgroundColor: "rgba(255,255,255,0.10)",

    alignItems: "center",

    justifyContent: "center",

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.12)",

  },


  /* ================= PROFILE CHIP ================= */


  profileChip: {

    flexDirection: "row",

    alignItems: "center",

    minWidth: 135,

    paddingLeft: 5,

    paddingRight: 10,

    paddingVertical: 5,

    borderRadius: 22,

    backgroundColor: "rgba(255,255,255,0.12)",

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.14)",

  },


  profileAvatar: {

    width: 32,

    height: 32,

    borderRadius: 16,

    backgroundColor: COLORS.white,

    alignItems: "center",

    justifyContent: "center",

  },


  profileAvatarText: {

    fontSize: 14,

    fontWeight: "900",

    color: COLORS.blue,

  },


  profileTextArea: {

    flex: 1,

    marginLeft: 7,

  },


  profileName: {

    fontSize: 12,

    fontWeight: "900",

    color: COLORS.white,

  },


  profileRole: {

    fontSize: 8,

    fontWeight: "600",

    color: "#C8D5EE",

    marginTop: 1,

  },


  /* ================= HERO BADGE ================= */


  heroBadge: {

    flexDirection: "row",

    alignItems: "center",

    alignSelf: "flex-end",

    marginTop: 12,

    paddingHorizontal: 10,

    paddingVertical: 7,

    borderRadius: 20,

    backgroundColor: "rgba(255,255,255,0.10)",

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.12)",

  },


  onlineDot: {

    width: 7,

    height: 7,

    borderRadius: 4,

    backgroundColor: "#61E294",

    marginRight: 6,

  },


  heroBadgeText: {

    fontSize: 8,

    fontWeight: "900",

    letterSpacing: 1,

    color: "#DCE7FF",

  },


  heroIcon: {

    width: 55,

    height: 55,

    borderRadius: 18,

    backgroundColor: COLORS.blue,

    alignItems: "center",

    justifyContent: "center",

    marginTop: 15,

    shadowColor: "#2F6BFF",

    shadowOpacity: 0.35,

    shadowRadius: 12,

    shadowOffset: {

      width: 0,

      height: 5,

    },

    elevation: 5,

  },



  heroLogo: {
    width: 40,
    height: 40,
  },

  heroTitle: {

    fontSize: 30,

    fontWeight: "900",

    color: COLORS.white,

    marginTop: 12,

    letterSpacing: -0.5,

  },


  heroSubtitle: {

    fontSize: 12,

    lineHeight: 18,

    color: "#B9C8E8",

    marginTop: 5,

  },


  heroStats: {

    flexDirection: "row",

    alignItems: "center",

    marginTop: 18,

    paddingTop: 13,

    borderTopWidth: 1,

    borderTopColor: "rgba(255,255,255,0.10)",

  },


  heroStat: {

    flex: 1,

    alignItems: "center",

  },


  heroStatNumber: {

    fontSize: 18,

    fontWeight: "900",

    color: COLORS.white,

  },


  heroStatLabel: {

    fontSize: 8,

    fontWeight: "700",

    color: "#91A5CE",

    marginTop: 2,

  },


  statDivider: {

    width: 1,

    height: 28,

    backgroundColor: "rgba(255,255,255,0.12)",

  },


  /* ================= SECTION ================= */


  sectionHeader: {

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    paddingHorizontal: 20,

    marginTop: 23,

    marginBottom: 11,

  },


  sectionEyebrow: {

    fontSize: 8,

    fontWeight: "900",

    letterSpacing: 1.1,

    color: COLORS.blue,

  },


  sectionTitle: {

    fontSize: 20,

    fontWeight: "900",

    color: COLORS.text,

    marginTop: 3,

  },


  programCount: {

    width: 34,

    height: 34,

    borderRadius: 12,

    backgroundColor: COLORS.blueLight,

    alignItems: "center",

    justifyContent: "center",

  },


  programCountText: {

    fontSize: 13,

    fontWeight: "900",

    color: COLORS.blue,

  },


  /* ================= TABS ================= */


  tabs: {

    flexDirection: "row",

    marginHorizontal: 20,

    padding: 4,

    marginBottom: 14,

    borderRadius: 15,

    backgroundColor: "#EAF0F8",

    borderWidth: 1,

    borderColor: "#DDE5F1",

  },


  tab: {

    flex: 1,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    paddingVertical: 10,

    borderRadius: 11,

  },


  activeTab: {

    backgroundColor: COLORS.blue,

    shadowColor: COLORS.blue,

    shadowOpacity: 0.22,

    shadowRadius: 7,

    shadowOffset: {

      width: 0,

      height: 3,

    },

    elevation: 3,

  },


  tabText: {

    fontSize: 12,

    fontWeight: "800",

    color: COLORS.blue,

    marginLeft: 5,

  },


  activeTabText: {

    color: COLORS.white,

  },


  /* ================= EVENT CARD ================= */


  eventCard: {

    marginHorizontal: 20,

    marginBottom: 13,

    padding: 14,

    borderRadius: 20,

    backgroundColor: COLORS.white,

    borderWidth: 1,

    borderColor: COLORS.border,

    shadowColor: "#163A73",

    shadowOpacity: 0.055,

    shadowRadius: 12,

    shadowOffset: {

      width: 0,

      height: 5,

    },

    elevation: 3,

  },


  featuredCard: {

    borderColor: "#E9D69B",

    backgroundColor: "#FFFDF7",

  },


  featuredTop: {

    flexDirection: "row",

    alignItems: "center",

    alignSelf: "flex-start",

    paddingHorizontal: 8,

    paddingVertical: 4,

    borderRadius: 8,

    backgroundColor: "#FFF4CF",

    marginBottom: 10,

  },


  featuredTopText: {

    fontSize: 7.5,

    fontWeight: "900",

    letterSpacing: 0.7,

    color: "#9A7413",

    marginLeft: 4,

  },


  cardMainRow: {

    flexDirection: "row",

    alignItems: "flex-start",

  },


  eventIcon: {

    width: 62,

    height: 62,

    borderRadius: 18,

    alignItems: "center",

    justifyContent: "center",

    marginRight: 12,

  },


  eventInfo: {

    flex: 1,

    minWidth: 0,

  },


  titleRow: {

    flexDirection: "row",

    alignItems: "flex-start",

  },


  eventTitle: {

    flex: 1,

    fontSize: 14.5,

    lineHeight: 19,

    fontWeight: "900",

    color: COLORS.text,

    paddingRight: 6,

  },


  arrowBox: {

    width: 29,

    height: 29,

    borderRadius: 10,

    backgroundColor: COLORS.blueLight,

    alignItems: "center",

    justifyContent: "center",

  },


  description: {

    fontSize: 10.5,

    lineHeight: 15.5,

    color: COLORS.muted,

    marginTop: 5,

  },


  detailsRow: {

    flexDirection: "row",

    alignItems: "center",

    flexWrap: "wrap",

    marginTop: 8,

  },


  detailChip: {

    flexDirection: "row",

    alignItems: "center",

    backgroundColor: "#F5F7FB",

    borderRadius: 7,

    paddingHorizontal: 6,

    paddingVertical: 4,

    marginRight: 6,

    marginBottom: 3,

    maxWidth: "75%",

  },


  detailText: {

    fontSize: 8,

    color: COLORS.muted,

    fontWeight: "700",

    marginLeft: 3,

  },


  cardFooter: {

    flexDirection: "row",

    alignItems: "center",

    marginTop: 13,

    paddingTop: 10,

    borderTopWidth: 1,

    borderTopColor: "#EDF1F6",

  },


  availableBadge: {

    flexDirection: "row",

    alignItems: "center",

    backgroundColor: COLORS.greenLight,

    borderRadius: 7,

    paddingHorizontal: 7,

    paddingVertical: 4,

  },


  availableDot: {

    width: 6,

    height: 6,

    borderRadius: 3,

    backgroundColor: COLORS.green,

    marginRight: 4,

  },


  availableText: {

    fontSize: 7.5,

    fontWeight: "900",

    color: COLORS.green,

  },


  viewProgram: {

    flex: 1,

    textAlign: "right",

    fontSize: 8.5,

    fontWeight: "900",

    color: COLORS.blue,

    marginRight: 4,

  },


  /* ================= EMPTY ================= */


  emptyState: {

    marginHorizontal: 20,

    marginTop: 25,

    paddingVertical: 35,

    paddingHorizontal: 25,

    borderRadius: 22,

    backgroundColor: COLORS.white,

    borderWidth: 1,

    borderColor: COLORS.border,

    alignItems: "center",

  },


  emptyIcon: {

    width: 76,

    height: 76,

    borderRadius: 38,

    backgroundColor: COLORS.blueLight,

    alignItems: "center",

    justifyContent: "center",

    marginBottom: 13,

  },


  emptyTitle: {

    fontSize: 18,

    fontWeight: "900",

    color: COLORS.text,

  },


  emptyText: {

    fontSize: 11,

    lineHeight: 17,

    color: COLORS.muted,

    textAlign: "center",

    marginTop: 5,

  },


  emptyButton: {

    flexDirection: "row",

    alignItems: "center",

    backgroundColor: COLORS.blue,

    borderRadius: 12,

    paddingHorizontal: 15,

    paddingVertical: 10,

    marginTop: 16,

  },


  emptyButtonText: {

    fontSize: 10,

    fontWeight: "900",

    color: COLORS.white,

    marginRight: 7,

  },


  /* ================= MOTIVATION ================= */


  motivationCard: {

    marginHorizontal: 20,

    marginTop: 8,

    padding: 14,

    borderRadius: 19,

    backgroundColor: COLORS.navy2,

    flexDirection: "row",

    alignItems: "center",

    overflow: "hidden",

  },


  motivationIcon: {

    width: 44,

    height: 44,

    borderRadius: 14,

    backgroundColor: COLORS.blue,

    alignItems: "center",

    justifyContent: "center",

    marginRight: 11,

  },


  motivationContent: {

    flex: 1,

  },


  motivationTitle: {

    fontSize: 13,

    fontWeight: "900",

    color: COLORS.white,

  },


  motivationText: {

    fontSize: 9.5,

    lineHeight: 14,

    color: "#AFC0E4",

    marginTop: 3,

    paddingRight: 5,

  },


  footerText: {

    textAlign: "center",

    fontSize: 8,

    fontWeight: "700",

    color: "#9AA8BD",

    marginTop: 15,

  },


  /* ================= PROFILE MODAL ================= */


  modalContainer: {

    flex: 1,

  },


  modalBackdrop: {

    ...StyleSheet.absoluteFill,

    backgroundColor: "rgba(6, 20, 46, 0.35)",

  },


  dropdown: {

    position: "absolute",

    top: 72,

    right: 18,

    width: 245,

    backgroundColor: COLORS.white,

    borderRadius: 18,

    paddingVertical: 8,

    borderWidth: 1,

    borderColor: "#E7ECF4",

    shadowColor: "#0F172A",

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

    paddingVertical: 11,

  },


  dropdownAvatar: {

    width: 42,

    height: 42,

    borderRadius: 21,

    backgroundColor: COLORS.blueLight,

    alignItems: "center",

    justifyContent: "center",

  },


  dropdownAvatarText: {

    fontSize: 17,

    fontWeight: "900",

    color: COLORS.blue,

  },


  dropdownUserInfo: {

    flex: 1,

    marginLeft: 10,

  },


  dropdownName: {

    fontSize: 15,

    fontWeight: "900",

    color: COLORS.text,

  },


  dropdownRole: {

    fontSize: 10,

    color: COLORS.muted,

    fontWeight: "600",

    marginTop: 2,

  },


  closeButton: {

    width: 30,

    height: 30,

    borderRadius: 10,

    backgroundColor: "#F5F7FB",

    alignItems: "center",

    justifyContent: "center",

  },


  dropdownDivider: {

    height: 1,

    backgroundColor: "#EDF1F6",

    marginVertical: 6,

  },


  dropdownItem: {

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 12,

    paddingVertical: 9,

    marginHorizontal: 6,

    borderRadius: 12,

  },


  dropdownItemActive: {

    backgroundColor: COLORS.blueLight,

  },


  menuIconBox: {

    width: 34,

    height: 34,

    borderRadius: 10,

    backgroundColor: "#F5F7FB",

    alignItems: "center",

    justifyContent: "center",

  },


  menuIconBoxActive: {

    backgroundColor: "#DCE7FF",

  },


  menuIconBoxLogout: {

    width: 34,

    height: 34,

    borderRadius: 10,

    backgroundColor: "#FFF0F0",

    alignItems: "center",

    justifyContent: "center",

  },


  dropdownItemText: {

    flex: 1,

    fontSize: 12.5,

    fontWeight: "700",

    color: "#334155",

    marginLeft: 10,

  },


  dropdownItemTextActive: {

    color: COLORS.blue,

    fontWeight: "900",

  },


  logoutText: {

    flex: 1,

    fontSize: 12.5,

    fontWeight: "800",

    color: "#EF4444",

    marginLeft: 10,

  },


  /* ================= BOTTOM NAV ================= */


  bottomNav: {

    minHeight: 67,

    backgroundColor: COLORS.white,

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

    backgroundColor: COLORS.blueLight,

    alignItems: "center",

    justifyContent: "center",

  },


  activeNavText: {

    fontSize: 8.5,

    fontWeight: "800",

    color: COLORS.blue,

    marginTop: 3,

  },

});