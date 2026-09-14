import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
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
  blueDark: "#1748C7",
  blueLight: "#EAF1FF",
  white: "#FFFFFF",
  background: "#F5F8FF",
  text: "#071A3A",
  muted: "#687795",
  border: "#E2E8F5",
  red: "#E14747",
  green: "#20A66A",
  gold: "#E8C56A",
};

type NotificationIcon = React.ComponentProps<typeof Ionicons>["name"];

interface NotificationItem {
  id: string;
  icon: NotificationIcon;
  title: string;
  message: string;
  time: string;
  unread?: boolean;
  type: "event" | "success" | "certificate" | "program";
}

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "1",
    icon: "calendar-outline",
    title: "Event Reminder",
    message:
      "Alibaba Hackathon starts tomorrow at 5:00 PM at Expo Center Karachi.",
    time: "2h ago",
    unread: true,
    type: "event",
  },
  {
    id: "2",
    icon: "checkmark-circle-outline",
    title: "Registration Confirmed",
    message: "You're successfully registered for Blood Donation Camp.",
    time: "1d ago",
    unread: true,
    type: "success",
  },
  {
    id: "3",
    icon: "ribbon-outline",
    title: "Certificate Ready",
    message:
      "Your certificate for Tree Plantation Drive is ready to download.",
    time: "3d ago",
    type: "certificate",
  },
  {
    id: "4",
    icon: "people-outline",
    title: "New Program Added",
    message:
      "Islamic Microfinance / Mawakhat is now open for volunteers.",
    time: "1w ago",
    type: "program",
  },
];

const getIconColor = (type: NotificationItem["type"]) => {
  switch (type) {
    case "success":
      return COLORS.green;
    case "certificate":
      return COLORS.gold;
    case "program":
      return COLORS.blueDark;
    default:
      return COLORS.blue;
  }
};

export default function NotificationsScreen() {
  const router = useRouter();

  const unreadCount = NOTIFICATIONS.filter(
    (notification) => notification.unread
  ).length;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.75}
          >
            <Ionicons
              name="chevron-back"
              size={22}
              color={COLORS.navy}
            />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Notifications</Text>
            <Text style={styles.headerSubtitle}>
              Stay updated with your volunteer journey
            </Text>
          </View>

          <View style={styles.headerBadge}>
            <Ionicons
              name="notifications-outline"
              size={19}
              color={COLORS.blue}
            />
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Hero Card */}
          <View style={styles.heroCard}>
            <View style={styles.heroGlowOne} />
            <View style={styles.heroGlowTwo} />

            <View style={styles.heroTopRow}>
              <View style={styles.heroIcon}>
                <Ionicons
                  name="notifications"
                  size={25}
                  color={COLORS.white}
                />
              </View>

              <View style={styles.unreadBadge}>
                <View style={styles.unreadDot} />
                <Text style={styles.unreadText}>
                  {unreadCount} unread
                </Text>
              </View>
            </View>

            <Text style={styles.heroTitle}>
              Your volunteer updates
            </Text>

            <Text style={styles.heroDescription}>
              Important event reminders, registrations, certificates and
              new opportunities are waiting for you.
            </Text>
          </View>

          {/* Section Header */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Recent Updates</Text>
              <Text style={styles.sectionSubtitle}>
                Latest activity from your account
              </Text>
            </View>

            {unreadCount > 0 && (
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{unreadCount}</Text>
              </View>
            )}
          </View>

          {/* Notifications */}
          {NOTIFICATIONS.length > 0 ? (
            NOTIFICATIONS.map((item) => {
              const iconColor = getIconColor(item.type);

              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.85}
                  style={[
                    styles.card,
                    item.unread && styles.unreadCard,
                  ]}
                >
                  {/* Icon */}
                  <View
                    style={[
                      styles.iconContainer,
                      {
                        backgroundColor:
                          item.type === "certificate"
                            ? "#FFF8E7"
                            : item.type === "success"
                            ? "#E9F9F1"
                            : COLORS.blueLight,
                      },
                    ]}
                  >
                    <Ionicons
                      name={item.icon}
                      size={21}
                      color={iconColor}
                    />

                    {item.unread && <View style={styles.notificationDot} />}
                  </View>

                  {/* Content */}
                  <View style={styles.content}>
                    <View style={styles.titleRow}>
                      <Text style={styles.title} numberOfLines={1}>
                        {item.title}
                      </Text>

                      {item.unread && (
                        <View style={styles.newBadge}>
                          <Text style={styles.newBadgeText}>NEW</Text>
                        </View>
                      )}
                    </View>

                    <Text style={styles.message}>
                      {item.message}
                    </Text>

                    <View style={styles.timeRow}>
                      <Ionicons
                        name="time-outline"
                        size={13}
                        color="#A5B0C8"
                      />
                      <Text style={styles.time}>{item.time}</Text>
                    </View>
                  </View>

                  {/* Arrow */}
                  <Ionicons
                    name="chevron-forward"
                    size={17}
                    color="#B7C1D5"
                  />
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={styles.emptyState}>
              <View style={styles.emptyIcon}>
                <Ionicons
                  name="notifications-off-outline"
                  size={32}
                  color={COLORS.blue}
                />
              </View>

              <Text style={styles.emptyTitle}>
                No notifications yet
              </Text>

              <Text style={styles.emptyText}>
                We'll let you know when there is something important
                to share.
              </Text>
            </View>
          )}

          {/* Bottom Info */}
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color={COLORS.blue}
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>
                Stay connected
              </Text>
              <Text style={styles.infoText}>
                Keep notifications enabled so you don't miss volunteer
                opportunities and important event updates.
              </Text>
            </View>
          </View>
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
    maxWidth: 430,
    alignSelf: "center",
    paddingHorizontal: 18,
  },

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 15,
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
  },

  headerCenter: {
    flex: 1,
    marginLeft: 12,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.navy,
  },

  headerSubtitle: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 2,
  },

  headerBadge: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
  },

  scrollContent: {
    paddingBottom: 35,
  },

  /* Hero */
  heroCard: {
    minHeight: 190,
    borderRadius: 25,
    padding: 20,
    overflow: "hidden",
    backgroundColor: COLORS.navy,
    marginBottom: 22,
    position: "relative",
  },

  heroGlowOne: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: COLORS.blue,
    opacity: 0.18,
    right: -50,
    top: -55,
  },

  heroGlowTwo: {
    position: "absolute",
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: COLORS.gold,
    opacity: 0.1,
    left: -35,
    bottom: -50,
  },

  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  heroIcon: {
    width: 50,
    height: 50,
    borderRadius: 17,
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
  },

  unreadBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 20,
  },

  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#65D89B",
    marginRight: 6,
  },

  unreadText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.white,
  },

  heroTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.white,
    marginTop: 22,
  },

  heroDescription: {
    fontSize: 12,
    lineHeight: 18,
    color: "#B9C7E5",
    marginTop: 7,
    maxWidth: 340,
  },

  /* Section */
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: COLORS.navy,
  },

  sectionSubtitle: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 3,
  },

  countBadge: {
    minWidth: 30,
    height: 30,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
  },

  countText: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.blue,
  },

  /* Notification Card */
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 14,
    marginBottom: 11,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#071A3A",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },

  unreadCard: {
    borderColor: "#C9D9FF",
    backgroundColor: "#FCFDFF",
  },

  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
    position: "relative",
  },

  notificationDot: {
    position: "absolute",
    top: -3,
    right: -3,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.red,
    borderWidth: 2,
    borderColor: COLORS.white,
  },

  content: {
    flex: 1,
    marginRight: 5,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  title: {
    flex: 1,
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.text,
  },

  newBadge: {
    backgroundColor: COLORS.blueLight,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    marginLeft: 5,
  },

  newBadgeText: {
    fontSize: 8,
    fontWeight: "900",
    color: COLORS.blue,
  },

  message: {
    fontSize: 11.5,
    lineHeight: 17,
    color: COLORS.muted,
    marginBottom: 7,
  },

  timeRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  time: {
    fontSize: 10,
    color: "#A5B0C8",
    marginLeft: 4,
  },

  /* Info */
  infoCard: {
    flexDirection: "row",
    backgroundColor: COLORS.blueLight,
    borderRadius: 18,
    padding: 14,
    marginTop: 8,
  },

  infoIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.navy,
    marginBottom: 3,
  },

  infoText: {
    fontSize: 10.5,
    lineHeight: 16,
    color: COLORS.muted,
  },

  /* Empty */
  emptyState: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  emptyIcon: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.navy,
  },

  emptyText: {
    fontSize: 11,
    lineHeight: 17,
    textAlign: "center",
    color: COLORS.muted,
    marginTop: 6,
    maxWidth: 270,
  }})