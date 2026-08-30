import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type EventStatus = "upcoming" | "completed";

type EventIconName = React.ComponentProps<typeof Ionicons>["name"];

interface EventItem {
  id: string;
  title: string;
  dateTime: string;
  location: string;
  status: EventStatus;
  icon: EventIconName;
}

const EVENTS: EventItem[] = [
  {
    id: "1",
    title: "Tree Plantation Drive",
    dateTime: "22 Aug 2026 - 08:00 AM",
    location: "Gulshan-e-Iqbal, Karachi",
    status: "upcoming",
    icon: "leaf-outline",
  },
  {
    id: "2",
    title: "Food Distribution",
    dateTime: "24 Aug 2026 - 09:00 AM",
    location: "Orangi Town, Karachi",
    status: "upcoming",
    icon: "fast-food-outline",
  },
  {
    id: "3",
    title: "Blood Donation Camp",
    dateTime: "26 Aug 2026 - 11:00 AM",
    location: "Liaquatabad, Karachi",
    status: "upcoming",
    icon: "water-outline",
  },
  {
    id: "4",
    title: "Vocal Mania Voice",
    dateTime: "29 Aug 2026 - 05:00 PM",
    location: "Alkhidmat Hall, Karachi",
    status: "upcoming",
    icon: "mic-outline",
  },
  {
    id: "5",
    title: "Podcast Stories",
    dateTime: "31 Aug 2026 - 04:00 PM",
    location: "Alkhidmat Media Center, Karachi",
    status: "upcoming",
    icon: "mic-outline",
  },
  {
    id: "6",
    title: "E-Gaming Arena",
    dateTime: "02 Sep 2026 - 06:00 PM",
    location: "Expo Center, Karachi",
    status: "upcoming",
    icon: "game-controller-outline",
  },
];

const BRAND_BLUE = "#2F6BFF";

export default function MyEventsScreen() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<EventStatus>("upcoming");

  const filteredEvents = EVENTS.filter(
    (event) => event.status === activeTab
  );

  const handleEventPress = (event: EventItem) => {
    if (event.id === "6") {
      router.push("/event-hackathon" as any);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Events</Text>
        <Text style={styles.headerSubtitle}>
          Manage your volunteering activities
        </Text>
      </View>

      {/* TABS */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "upcoming" && styles.activeTab]}
          onPress={() => setActiveTab("upcoming")}
          activeOpacity={0.8}
        >
          <Ionicons
            name="calendar-outline"
            size={17}
            color={activeTab === "upcoming" ? "#FFFFFF" : BRAND_BLUE}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "upcoming" && styles.activeTabText,
            ]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === "completed" && styles.activeTab]}
          onPress={() => setActiveTab("completed")}
          activeOpacity={0.8}
        >
          <Ionicons
            name="checkmark-circle-outline"
            size={17}
            color={activeTab === "completed" ? "#FFFFFF" : BRAND_BLUE}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "completed" && styles.activeTabText,
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {/* EVENTS */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredEvents.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Ionicons name="calendar-outline" size={40} color={BRAND_BLUE} />
            </View>
            <Text style={styles.emptyTitle}>No {activeTab} events</Text>
            <Text style={styles.emptyText}>
              Your volunteering events will appear here.
            </Text>
          </View>
        ) : (
          filteredEvents.map((event) => (
            <TouchableOpacity
              key={event.id}
              style={styles.eventCard}
              activeOpacity={0.85}
              onPress={() => handleEventPress(event)}
            >
              <View style={styles.iconBox}>
                <Ionicons name={event.icon} size={27} color={BRAND_BLUE} />
              </View>

              <View style={styles.eventInfo}>
                <Text style={styles.eventTitle}>{event.title}</Text>

                <View style={styles.infoRow}>
                  <Ionicons
                    name="calendar-outline"
                    size={13}
                    color={BRAND_BLUE}
                  />
                  <Text style={styles.infoText}>{event.dateTime}</Text>
                </View>

                <View style={styles.infoRow}>
                  <Ionicons
                    name="location-outline"
                    size={13}
                    color={BRAND_BLUE}
                  />
                  <Text style={styles.infoText}>{event.location}</Text>
                </View>

                <View style={styles.registered}>
                  <Ionicons
                    name="checkmark-circle"
                    size={13}
                    color="#16803C"
                  />
                  <Text style={styles.registeredText}>Registered</Text>
                </View>
              </View>

              <View style={styles.arrowBox}>
                <Ionicons name="chevron-forward" size={18} color={BRAND_BLUE} />
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#071A3A",
  },

  headerSubtitle: {
    fontSize: 13,
    color: "#5A6B8C",
    marginTop: 4,
  },

  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 14,
    marginBottom: 16,
    padding: 4,
    borderRadius: 14,
    backgroundColor: "#F1F6FC",
    borderWidth: 1,
    borderColor: "#DCE8F5",
  },

  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 11,
    borderRadius: 10,
  },

  activeTab: {
    backgroundColor: BRAND_BLUE,
  },

  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: BRAND_BLUE,
    marginLeft: 6,
  },

  activeTabText: {
    color: "#FFFFFF",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  eventCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E3E7F2",
    borderRadius: 16,
    padding: 13,
    marginBottom: 14,
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  iconBox: {
    width: 58,
    height: 58,
    borderRadius: 14,
    backgroundColor: "#EAF1FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  eventInfo: {
    flex: 1,
  },

  eventTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#071A3A",
    marginBottom: 6,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  infoText: {
    fontSize: 12,
    color: "#5A6B8C",
    marginLeft: 5,
    flex: 1,
  },

  registered: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF8EF",
    borderRadius: 7,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 2,
  },

  registeredText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#16803C",
    marginLeft: 4,
  },

  arrowBox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#EAF1FF",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
    paddingHorizontal: 30,
  },

  emptyIcon: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#EAF1FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#071A3A",
  },

  emptyText: {
    fontSize: 13,
    color: "#5A6B8C",
    textAlign: "center",
    marginTop: 6,
    lineHeight: 19,
  },
});