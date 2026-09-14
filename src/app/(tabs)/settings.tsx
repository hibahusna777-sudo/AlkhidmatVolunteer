import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const COLORS = {
  navy: "#071A3A",
  navyLight: "#0D2B63",
  blue: "#2F6BFF",
  blueDark: "#1748C7",
  blueLight: "#EAF1FF",
  background: "#F5F8FF",
  white: "#FFFFFF",
  text: "#071A3A",
  muted: "#687795",
  border: "#E2E8F5",
  divider: "#EEF2F8",
  green: "#20A66A",
  gold: "#E8C56A",
};

export default function SettingsScreen() {
  const router = useRouter();

  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

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
            <Text style={styles.headerTitle}>Settings</Text>
            <Text style={styles.headerSubtitle}>
              Personalize your volunteer experience
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons
              name="settings-outline"
              size={20}
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
            <View style={styles.heroCircleOne} />
            <View style={styles.heroCircleTwo} />

            <View style={styles.heroTop}>
              <View style={styles.heroIcon}>
                <Ionicons
                  name="options-outline"
                  size={26}
                  color={COLORS.white}
                />
              </View>

              <View style={styles.statusBadge}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Account Active</Text>
              </View>
            </View>

            <Text style={styles.heroTitle}>
              Make the app yours
            </Text>

            <Text style={styles.heroDescription}>
              Manage notifications, appearance and account preferences
              from one place.
            </Text>
          </View>

          {/* Notifications */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Notifications</Text>
              <Text style={styles.sectionSubtitle}>
                Choose how you want to stay updated
              </Text>
            </View>

            <View style={styles.sectionIcon}>
              <Ionicons
                name="notifications-outline"
                size={18}
                color={COLORS.blue}
              />
            </View>
          </View>

          <View style={styles.card}>
            <SettingSwitchRow
              icon="notifications-outline"
              title="Push Notifications"
              description="Get instant event and volunteer updates"
              value={pushEnabled}
              onValueChange={setPushEnabled}
            />

            <View style={styles.divider} />

            <SettingSwitchRow
              icon="mail-outline"
              title="Email Updates"
              description="Receive important updates by email"
              value={emailEnabled}
              onValueChange={setEmailEnabled}
            />
          </View>

          {/* Appearance */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Appearance</Text>
              <Text style={styles.sectionSubtitle}>
                Customize how the app looks
              </Text>
            </View>

            <View style={styles.sectionIcon}>
              <Ionicons
                name="color-palette-outline"
                size={18}
                color={COLORS.blue}
              />
            </View>
          </View>

          <View style={styles.card}>
            <SettingSwitchRow
              icon="moon-outline"
              title="Dark Mode"
              description="Use a darker interface for the app"
              value={darkMode}
              onValueChange={setDarkMode}
            />
          </View>

          {/* Privacy & Security */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Privacy & Security
              </Text>
              <Text style={styles.sectionSubtitle}>
                Keep your account secure
              </Text>
            </View>

            <View style={styles.sectionIcon}>
              <Ionicons
                name="shield-checkmark-outline"
                size={18}
                color={COLORS.blue}
              />
            </View>
          </View>

          <View style={styles.card}>
            <TouchableOpacity
              style={styles.actionRow}
              activeOpacity={0.75}
            >
              <View style={styles.actionIcon}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={COLORS.blue}
                />
              </View>

              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>
                  Change Password
                </Text>
                <Text style={styles.actionDescription}>
                  Update your account password
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={18}
                color="#B3BED3"
              />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.actionRow}
              activeOpacity={0.75}
            >
              <View style={styles.actionIcon}>
                <Ionicons
                  name="shield-outline"
                  size={20}
                  color={COLORS.green}
                />
              </View>

              <View style={styles.actionContent}>
                <Text style={styles.actionTitle}>
                  Privacy
                </Text>
                <Text style={styles.actionDescription}>
                  Review your privacy preferences
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={18}
                color="#B3BED3"
              />
            </TouchableOpacity>
          </View>

          {/* App Information */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                App Information
              </Text>
              <Text style={styles.sectionSubtitle}>
                About your Alkhidmat Volunteer app
              </Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoLogo}>
              <Ionicons
                name="heart"
                size={23}
                color={COLORS.white}
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={styles.infoTitle}>
                Alkhidmat Volunteer
              </Text>

              <Text style={styles.infoText}>
                Empowering volunteers to serve communities and create
                meaningful impact.
              </Text>

              <View style={styles.versionBadge}>
                <Text style={styles.versionText}>
                  Version 1.0.0
                </Text>
              </View>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Ionicons
              name="heart-outline"
              size={14}
              color="#AAB5CC"
            />

            <Text style={styles.footerText}>
              Built for volunteers. Powered by service.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

/* --------------------------------
   Reusable Switch Row
--------------------------------- */

interface SettingSwitchRowProps {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

function SettingSwitchRow({
  icon,
  title,
  description,
  value,
  onValueChange,
}: SettingSwitchRowProps) {
  return (
    <View style={styles.settingRow}>
      <View style={styles.settingIcon}>
        <Ionicons
          name={icon}
          size={20}
          color={COLORS.blue}
        />
      </View>

      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>

        <Text style={styles.settingDescription}>
          {description}
        </Text>
      </View>

      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
          false: "#D8DFEC",
          true: COLORS.blue,
        }}
        thumbColor={COLORS.white}
        ios_backgroundColor="#D8DFEC"
      />
    </View>
  );
}

/* --------------------------------
   Styles
--------------------------------- */

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

  scrollContent: {
    paddingBottom: 35,
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

  headerIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
  },

  /* Hero */

  heroCard: {
    minHeight: 185,
    backgroundColor: COLORS.navy,
    borderRadius: 25,
    padding: 20,
    overflow: "hidden",
    marginBottom: 23,
    position: "relative",
  },

  heroCircleOne: {
    position: "absolute",
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: COLORS.blue,
    opacity: 0.18,
    right: -60,
    top: -65,
  },

  heroCircleTwo: {
    position: "absolute",
    width: 105,
    height: 105,
    borderRadius: 53,
    backgroundColor: COLORS.gold,
    opacity: 0.1,
    left: -40,
    bottom: -50,
  },

  heroTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  heroIcon: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#65D89B",
    marginRight: 6,
  },

  statusText: {
    fontSize: 10,
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
    maxWidth: 350,
  },

  /* Section */

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 2,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.navy,
  },

  sectionSubtitle: {
    fontSize: 10.5,
    color: COLORS.muted,
    marginTop: 3,
    marginBottom: 2,
  },

  sectionIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
  },

  /* Cards */

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 21,
    overflow: "hidden",
    shadowColor: COLORS.navy,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.035,
    shadowRadius: 10,
    elevation: 2,
  },

  divider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginLeft: 70,
  },

  /* Switch Row */

  settingRow: {
    minHeight: 78,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  settingIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  settingContent: {
    flex: 1,
    marginRight: 8,
  },

  settingTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.navy,
  },

  settingDescription: {
    fontSize: 10.5,
    color: COLORS.muted,
    marginTop: 3,
    lineHeight: 15,
  },

  /* Action Rows */

  actionRow: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  actionIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  actionContent: {
    flex: 1,
    marginRight: 8,
  },

  actionTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.navy,
  },

  actionDescription: {
    fontSize: 10.5,
    color: COLORS.muted,
    marginTop: 3,
  },

  /* App Info */

  infoCard: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 15,
    marginBottom: 18,
  },

  infoLogo: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.navy,
  },

  infoText: {
    fontSize: 10.5,
    lineHeight: 16,
    color: COLORS.muted,
    marginTop: 4,
  },

  versionBadge: {
    alignSelf: "flex-start",
    marginTop: 8,
    backgroundColor: COLORS.blueLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 7,
  },

  versionText: {
    fontSize: 9,
    fontWeight: "700",
    color: COLORS.blue,
  },

  /* Footer */

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },

  footerText: {
    fontSize: 10,
    color: "#AAB5CC",
    marginLeft: 5,
  },
});
