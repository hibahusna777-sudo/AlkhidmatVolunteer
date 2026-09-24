import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const COLORS = {
  navy: "#071A3A",
  navy2: "#0C234F",
  blue: "#2F6BFF",
  blueDark: "#1746C7",
  blueLight: "#EAF1FF",
  gold: "#E8C56A",
  white: "#FFFFFF",
  background: "#F4F7FC",
  text: "#10244A",
  muted: "#71809D",
  border: "#DFE6F2",
  input: "#F9FBFF",
  green: "#16A06A",
  red: "#D64545",
};

const PROFILE_KEY = "@alkhidmat_profile";
const CURRENT_USER_KEY = "@alkhidmat_current_user";
const REGISTERED_USERS_KEY = "@alkhidmat_registered_users";

type ProfileData = {
  name: string;
  email: string;
  phone: string;
  city: string;
};

type VolunteerUser = {
  id?: string;
  fullName?: string;
  name?: string;
  email: string;
  phone?: string;
  city?: string;
  password?: string;
  role?: "volunteer" | "organizer";
  createdAt?: string;
};

const DEFAULT_PROFILE: ProfileData = {
  name: "",
  email: "",
  phone: "",
  city: "",
};

export default function EditProfileScreen() {
  const router = useRouter();

  const [name, setName] = useState(DEFAULT_PROFILE.name);
  const [email, setEmail] = useState(DEFAULT_PROFILE.email);
  const [phone, setPhone] = useState(DEFAULT_PROFILE.phone);
  const [city, setCity] = useState(DEFAULT_PROFILE.city);

  const [focusedField, setFocusedField] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // =========================================================
  // LOAD CURRENT USER + PROFILE
  // =========================================================

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const currentUserRaw = await AsyncStorage.getItem(
          CURRENT_USER_KEY
        );

        const savedProfileRaw = await AsyncStorage.getItem(
          PROFILE_KEY
        );

        let currentUser: VolunteerUser | null = null;
        let savedProfile: ProfileData | null = null;

        if (currentUserRaw) {
          try {
            currentUser = JSON.parse(currentUserRaw);
          } catch {
            currentUser = null;
          }
        }

        if (savedProfileRaw) {
          try {
            savedProfile = JSON.parse(savedProfileRaw);
          } catch {
            savedProfile = null;
          }
        }

        const userName =
          currentUser?.fullName ||
          currentUser?.name ||
          "";

        const userEmail =
          currentUser?.email ||
          "";

        const userPhone =
          currentUser?.phone ||
          "";

        const userCity =
          currentUser?.city ||
          "";

        setName(
          savedProfile?.name ||
            userName ||
            ""
        );

        setEmail(
          savedProfile?.email ||
            userEmail ||
            ""
        );

        setPhone(
          savedProfile?.phone ||
            userPhone ||
            ""
        );

        setCity(
          savedProfile?.city ||
            userCity ||
            ""
        );
      } catch (error) {
        console.log("Profile load error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  // =========================================================
  // INITIALS
  // =========================================================

  const initials = useMemo(() => {
    const cleanName = name.trim();

    if (!cleanName) {
      return "AK";
    }

    const words = cleanName.split(/\s+/);

    if (words.length >= 2) {
      return `${words[0].charAt(0)}${words[1].charAt(
        0
      )}`.toUpperCase();
    }

    return cleanName
      .slice(0, 2)
      .toUpperCase();
  }, [name]);

  // =========================================================
  // PROFILE COMPLETION
  // =========================================================

  const completion = useMemo(() => {
    const fields = [
      name.trim(),
      email.trim(),
      phone.trim(),
      city.trim(),
    ];

    const completed = fields.filter(Boolean).length;

    return Math.round(
      (completed / fields.length) * 100
    );
  }, [name, email, phone, city]);

  // =========================================================
  // BACK
  // =========================================================

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/profile" as any);
    }
  };

  // =========================================================
  // SAVE PROFILE
  // =========================================================

  const handleSave = async () => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.trim();
    const cleanCity = city.trim();

    if (!cleanName) {
      Alert.alert(
        "Name Required",
        "Please enter your full name before saving."
      );
      return;
    }

    if (!cleanEmail) {
      Alert.alert(
        "Email Required",
        "Please enter your email address before saving."
      );
      return;
    }

    const emailIsValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        cleanEmail
      );

    if (!emailIsValid) {
      Alert.alert(
        "Invalid Email",
        "Please enter a valid email address."
      );
      return;
    }

    try {
      setSaving(true);

      const profileData: ProfileData = {
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        city: cleanCity,
      };

      // Save profile
      await AsyncStorage.setItem(
        PROFILE_KEY,
        JSON.stringify(profileData)
      );

      // Update current logged-in user
      const currentUserRaw =
        await AsyncStorage.getItem(
          CURRENT_USER_KEY
        );

      if (currentUserRaw) {
        try {
          const currentUser: VolunteerUser =
            JSON.parse(currentUserRaw);

          const updatedCurrentUser: VolunteerUser = {
            ...currentUser,
            fullName: cleanName,
            name: cleanName,
            email: cleanEmail,
            phone: cleanPhone,
            city: cleanCity,
          };

          await AsyncStorage.setItem(
            CURRENT_USER_KEY,
            JSON.stringify(updatedCurrentUser)
          );
        } catch (error) {
          console.log(
            "Current user update error:",
            error
          );
        }
      }

      // Update registered users list
      const registeredUsersRaw =
        await AsyncStorage.getItem(
          REGISTERED_USERS_KEY
        );

      if (registeredUsersRaw) {
        try {
          const registeredUsers: VolunteerUser[] =
            JSON.parse(registeredUsersRaw);

          const updatedUsers =
            registeredUsers.map((user) => {
              if (
                user.email.trim().toLowerCase() ===
                cleanEmail
              ) {
                return {
                  ...user,
                  fullName: cleanName,
                  name: cleanName,
                  phone: cleanPhone,
                  city: cleanCity,
                };
              }

              return user;
            });

          await AsyncStorage.setItem(
            REGISTERED_USERS_KEY,
            JSON.stringify(updatedUsers)
          );
        } catch (error) {
          console.log(
            "Registered users update error:",
            error
          );
        }
      }

      setSaving(false);

      Alert.alert(
        "Profile Updated",
        "Your volunteer profile has been saved successfully.",
        [
          {
            text: "Continue",
            onPress: () => {
              router.replace("/profile" as any);
            },
          },
        ]
      );
    } catch (error) {
      setSaving(false);

      console.log(
        "Profile save error:",
        error
      );

      Alert.alert(
        "Save Failed",
        "Your changes could not be saved. Please try again."
      );
    }
  };

  // =========================================================
  // INPUT STYLE
  // =========================================================

  const inputStyle = (field: string) => [
    styles.inputContainer,
    focusedField === field &&
      styles.inputContainerFocused,
  ];

  // =========================================================
  // ICON COLOR
  // =========================================================

  const iconColor = (field: string) => {
    return focusedField === field
      ? COLORS.blue
      : COLORS.muted;
  };

  // =========================================================
  // LOGOUT
  // =========================================================

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
            onPress: async () => {
              try {
                await AsyncStorage.removeItem(
                  CURRENT_USER_KEY
                );

                await AsyncStorage.removeItem(
                  PROFILE_KEY
                );

                router.replace("/login" as any);
              } catch (error) {
                console.log(
                  "Logout error:",
                  error
                );

                router.replace("/login" as any);
              }
            },
          },
        ]
      );
    }, 100);
  };

  // =========================================================
  // LOADING SCREEN
  // =========================================================

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingScreen}>
          <View style={styles.loadingLogo}>
            <Ionicons
              name="people"
              size={30}
              color={COLORS.white}
            />
          </View>

          <ActivityIndicator
            size="small"
            color={COLORS.blue}
          />

          <Text style={styles.loadingText}>
            Loading your profile...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboard}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <View style={styles.screen}>

          {/* =================================================
              HEADER
          ================================================= */}

          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBack}
              activeOpacity={0.8}
              disabled={saving}
            >
              <Ionicons
                name="chevron-back"
                size={23}
                color={COLORS.navy}
              />
            </TouchableOpacity>

            <View style={styles.headerTitleArea}>
              <Text style={styles.headerTitle}>
                Edit Profile
              </Text>

              <Text style={styles.headerSubtitle}>
                Volunteer account
              </Text>
            </View>

            {/* ACCOUNT DROPDOWN BUTTON */}

            <TouchableOpacity
              style={styles.accountButton}
              onPress={() => setMenuOpen(true)}
              activeOpacity={0.8}
              disabled={saving}
            >
              <View style={styles.accountAvatar}>
                <Ionicons
                  name="person"
                  size={17}
                  color={COLORS.blue}
                />
              </View>

              <View style={styles.accountText}>
                <Text
                  style={styles.accountName}
                  numberOfLines={1}
                >
                  {name.trim() || "Volunteer"}
                </Text>

                <Text style={styles.accountRole}>
                  Volunteer
                </Text>
              </View>

              <Ionicons
                name="chevron-down"
                size={15}
                color={COLORS.navy}
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.content}
          >

            {/* =================================================
                HERO — ORIGINAL DESIGN KEPT
            ================================================= */}

            <View style={styles.hero}>
              <View style={styles.heroCircleOne} />
              <View style={styles.heroCircleTwo} />
              <View style={styles.heroCircleThree} />

              <View style={styles.heroTopRow}>
                <View>
                  <Text style={styles.heroEyebrow}>
                    ALKHIDMAT FOUNDATION
                  </Text>

                  <Text style={styles.heroHeading}>
                    Volunteer Profile
                  </Text>
                </View>

                <View style={styles.heroStar}>
                  <Ionicons
                    name="star"
                    size={17}
                    color={COLORS.gold}
                  />
                </View>
              </View>

              {/* AVATAR */}

              <View style={styles.avatarArea}>
                <View style={styles.avatarGlow}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {initials}
                    </Text>
                  </View>
                </View>

                <View style={styles.verifiedIcon}>
                  <Ionicons
                    name="checkmark"
                    size={13}
                    color={COLORS.navy}
                  />
                </View>
              </View>

              <Text style={styles.heroName}>
                {name.trim() || "Complete Your Profile"}
              </Text>

              <View style={styles.verifiedBadge}>
                <View style={styles.verifiedDot} />

                <Text style={styles.verifiedText}>
                  VOLUNTEER PROFILE
                </Text>
              </View>

              <Text style={styles.heroDescription}>
                Make your profile complete to discover
                better volunteer opportunities.
              </Text>

              {/* HERO STATS */}

              <View style={styles.heroStats}>
                <View style={styles.heroStat}>
                  <Ionicons
                    name="person-circle-outline"
                    size={17}
                    color={COLORS.gold}
                  />

                  <Text style={styles.heroStatText}>
                    Member
                  </Text>
                </View>

                <View style={styles.heroDivider} />

                <View style={styles.heroStat}>
                  <Ionicons
                    name="heart-outline"
                    size={17}
                    color={COLORS.gold}
                  />

                  <Text style={styles.heroStatText}>
                    Volunteer
                  </Text>
                </View>

                <View style={styles.heroDivider} />

                <View style={styles.heroStat}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={17}
                    color={COLORS.gold}
                  />

                  <Text style={styles.heroStatText}>
                    Active
                  </Text>
                </View>
              </View>
            </View>

            {/* =================================================
                COMPLETION CARD
            ================================================= */}

            <View style={styles.completionCard}>
              <View style={styles.completionIcon}>
                <Ionicons
                  name="sparkles"
                  size={19}
                  color={COLORS.blue}
                />
              </View>

              <View style={styles.completionBody}>
                <View style={styles.completionHeader}>
                  <View>
                    <Text style={styles.completionTitle}>
                      Profile strength
                    </Text>

                    <Text style={styles.completionSubtitle}>
                      {completion === 100
                        ? "Your profile is complete"
                        : "Complete your details"}
                    </Text>
                  </View>

                  <Text style={styles.completionPercent}>
                    {completion}%
                  </Text>
                </View>

                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${completion}%`,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>

            {/* =================================================
                SECTION
            ================================================= */}

            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon}>
                <Ionicons
                  name="person-outline"
                  size={18}
                  color={COLORS.blue}
                />
              </View>

              <View>
                <Text style={styles.sectionTitle}>
                  Personal Information
                </Text>

                <Text style={styles.sectionSubtitle}>
                  Keep your volunteer details updated
                </Text>
              </View>
            </View>

            {/* =================================================
                FULL NAME
            ================================================= */}

            <View style={styles.field}>
              <Text style={styles.label}>
                FULL NAME
              </Text>

              <View style={inputStyle("name")}>
                <View
                  style={[
                    styles.fieldIcon,
                    focusedField === "name" &&
                      styles.fieldIconActive,
                  ]}
                >
                  <Ionicons
                    name="person-outline"
                    size={19}
                    color={iconColor("name")}
                  />
                </View>

                <View style={styles.inputArea}>
                  <Text style={styles.inputMiniLabel}>
                    Your name
                  </Text>

                  <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your full name"
                    placeholderTextColor="#A6B1C4"
                    autoCapitalize="words"
                    onFocus={() =>
                      setFocusedField("name")
                    }
                    onBlur={() =>
                      setFocusedField("")
                    }
                  />
                </View>
              </View>
            </View>

            {/* =================================================
                EMAIL
            ================================================= */}

            <View style={styles.field}>
              <Text style={styles.label}>
                EMAIL ADDRESS
              </Text>

              <View style={inputStyle("email")}>
                <View
                  style={[
                    styles.fieldIcon,
                    focusedField === "email" &&
                      styles.fieldIconActive,
                  ]}
                >
                  <Ionicons
                    name="mail-outline"
                    size={19}
                    color={iconColor("email")}
                  />
                </View>

                <View style={styles.inputArea}>
                  <Text style={styles.inputMiniLabel}>
                    Email
                  </Text>

                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    placeholderTextColor="#A6B1C4"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onFocus={() =>
                      setFocusedField("email")
                    }
                    onBlur={() =>
                      setFocusedField("")
                    }
                  />
                </View>

                {email.includes("@") && (
                  <View style={styles.validIcon}>
                    <Ionicons
                      name="checkmark-circle"
                      size={19}
                      color={COLORS.green}
                    />
                  </View>
                )}
              </View>
            </View>

            {/* =================================================
                PHONE
            ================================================= */}

            <View style={styles.field}>
              <Text style={styles.label}>
                PHONE NUMBER
              </Text>

              <View style={inputStyle("phone")}>
                <View
                  style={[
                    styles.fieldIcon,
                    focusedField === "phone" &&
                      styles.fieldIconActive,
                  ]}
                >
                  <Ionicons
                    name="call-outline"
                    size={19}
                    color={iconColor("phone")}
                  />
                </View>

                <View style={styles.inputArea}>
                  <Text style={styles.inputMiniLabel}>
                    Mobile number
                  </Text>

                  <TextInput
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="03XX-XXXXXXX"
                    placeholderTextColor="#A6B1C4"
                    keyboardType="phone-pad"
                    onFocus={() =>
                      setFocusedField("phone")
                    }
                    onBlur={() =>
                      setFocusedField("")
                    }
                  />
                </View>
              </View>
            </View>

            {/* =================================================
                CITY
            ================================================= */}

            <View style={styles.field}>
              <Text style={styles.label}>
                CITY
              </Text>

              <View style={inputStyle("city")}>
                <View
                  style={[
                    styles.fieldIcon,
                    focusedField === "city" &&
                      styles.fieldIconActive,
                  ]}
                >
                  <Ionicons
                    name="location-outline"
                    size={19}
                    color={iconColor("city")}
                  />
                </View>

                <View style={styles.inputArea}>
                  <Text style={styles.inputMiniLabel}>
                    Location
                  </Text>

                  <TextInput
                    style={styles.input}
                    value={city}
                    onChangeText={setCity}
                    placeholder="e.g. Karachi"
                    placeholderTextColor="#A6B1C4"
                    autoCapitalize="words"
                    onFocus={() =>
                      setFocusedField("city")
                    }
                    onBlur={() =>
                      setFocusedField("")
                    }
                  />
                </View>
              </View>
            </View>

            {/* =================================================
                INFO CARD
            ================================================= */}

            <View style={styles.infoCard}>
              <View style={styles.infoIcon}>
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color={COLORS.blue}
                />
              </View>

              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>
                  Your profile is secure
                </Text>

                <Text style={styles.infoText}>
                  Your information is stored locally on
                  this device for your volunteer experience.
                </Text>
              </View>
            </View>

            {/* =================================================
                SAVE BUTTON
            ================================================= */}

            <TouchableOpacity
              style={[
                styles.saveButton,
                saving &&
                  styles.saveButtonDisabled,
              ]}
              onPress={handleSave}
              activeOpacity={0.85}
              disabled={saving}
            >
              {saving ? (
                <>
                  <ActivityIndicator
                    size="small"
                    color={COLORS.white}
                  />

                  <Text style={styles.saveText}>
                    Saving profile...
                  </Text>
                </>
              ) : (
                <>
                  <View style={styles.saveButtonIcon}>
                    <Ionicons
                      name="checkmark"
                      size={19}
                      color={COLORS.white}
                    />
                  </View>

                  <Text style={styles.saveText}>
                    Save Changes
                  </Text>

                  <Ionicons
                    name="arrow-forward"
                    size={19}
                    color={COLORS.white}
                  />
                </>
              )}
            </TouchableOpacity>

            {/* =================================================
                CANCEL
            ================================================= */}

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleBack}
              activeOpacity={0.7}
              disabled={saving}
            >
              <Text style={styles.cancelText}>
                Cancel
              </Text>
            </TouchableOpacity>

            {/* =================================================
                FOOTER
            ================================================= */}

            <View style={styles.footer}>
              <View style={styles.footerLine} />

              <View style={styles.footerCenter}>
                <Ionicons
                  name="heart"
                  size={12}
                  color={COLORS.blue}
                />

                <Text style={styles.footerText}>
                  Alkhidmat Volunteer
                </Text>
              </View>

              <View style={styles.footerLine} />
            </View>
          </ScrollView>
        </View>

        {/* =====================================================
            ACCOUNT DROPDOWN
        ===================================================== */}

        <Modal
          visible={menuOpen}
          transparent
          animationType="fade"
          onRequestClose={() =>
            setMenuOpen(false)
          }
        >
          <Pressable
            style={styles.modalBackdrop}
            onPress={() =>
              setMenuOpen(false)
            }
          >
            <Pressable
              style={styles.accountDropdown}
              onPress={(event) =>
                event.stopPropagation()
              }
            >
              {/* ACCOUNT HEADER */}

              <View style={styles.dropdownHeader}>
                <View style={styles.dropdownAvatar}>
                  <Ionicons
                    name="person"
                    size={21}
                    color={COLORS.blue}
                  />
                </View>

                <View
                  style={styles.dropdownHeaderText}
                >
                  <Text
                    style={styles.dropdownName}
                    numberOfLines={1}
                  >
                    {name.trim() ||
                      "Volunteer"}
                  </Text>

                  <Text style={styles.dropdownRole}>
                    Alkhidmat Volunteer
                  </Text>
                </View>
              </View>

              <View style={styles.dropdownDivider} />

              {/* MY PROFILE */}

              <TouchableOpacity
                style={styles.dropdownItem}
                activeOpacity={0.7}
                onPress={() => {
                  setMenuOpen(false);
                  router.replace(
                    "/profile" as any
                  );
                }}
              >
                <Ionicons
                  name="person-circle-outline"
                  size={19}
                  color={COLORS.blue}
                />

                <Text
                  style={styles.dropdownItemText}
                >
                  My Profile
                </Text>
              </TouchableOpacity>

              {/* SENIOR VOLUNTEERS */}

              <TouchableOpacity
                style={styles.dropdownItem}
                activeOpacity={0.7}
                onPress={() => {
                  setMenuOpen(false);
                  router.push(
                    "/senior-volunteers" as any
                  );
                }}
              >
                <Ionicons
                  name="people-circle-outline"
                  size={19}
                  color={COLORS.blue}
                />

                <Text
                  style={styles.dropdownItemText}
                >
                  Senior Volunteers
                </Text>
              </TouchableOpacity>

              {/* LOGOUT */}

              <View style={styles.dropdownDivider} />

              <TouchableOpacity
                style={styles.dropdownItem}
                activeOpacity={0.7}
                onPress={handleLogout}
              >
                <Ionicons
                  name="log-out-outline"
                  size={19}
                  color={COLORS.red}
                />

                <Text
                  style={[
                    styles.dropdownItemText,
                    {
                      color: COLORS.red,
                    },
                  ]}
                >
                  Logout
                </Text>
              </TouchableOpacity>
            </Pressable>
          </Pressable>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// =============================================================
// STYLES
// =============================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  keyboard: {
    flex: 1,
  },

  screen: {
    flex: 1,
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
  },

  // ===========================================================
  // HEADER
  // ===========================================================

  header: {
    height: 76,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  backButton: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: "#F2F5FA",
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitleArea: {
    flex: 1,
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: COLORS.navy,
  },

  headerSubtitle: {
    fontSize: 10,
    color: COLORS.muted,
    marginTop: 3,
    fontWeight: "500",
  },

  // ===========================================================
  // ACCOUNT BUTTON
  // ===========================================================

  accountButton: {
    minWidth: 105,
    maxWidth: 155,
    height: 43,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
  },

  accountAvatar: {
    width: 32,
    height: 32,
    borderRadius: 11,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
  },

  accountText: {
    flex: 1,
    marginLeft: 7,
    marginRight: 4,
  },

  accountName: {
    fontSize: 10,
    fontWeight: "800",
    color: COLORS.navy,
  },

  accountRole: {
    fontSize: 7,
    color: COLORS.muted,
    marginTop: 2,
    fontWeight: "600",
  },

  // ===========================================================
  // CONTENT
  // ===========================================================

  content: {
    padding: 18,
    paddingBottom: 40,
  },

  // ===========================================================
  // HERO
  // ===========================================================

  hero: {
    minHeight: 345,
    borderRadius: 28,
    backgroundColor: COLORS.navy,
    padding: 20,
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
    marginBottom: 15,
  },

  heroCircleOne: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: COLORS.blueDark,
    opacity: 0.55,
    right: -95,
    top: -105,
  },

  heroCircleTwo: {
    position: "absolute",
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 20,
    borderColor: COLORS.blue,
    opacity: 0.13,
    left: -65,
    bottom: -65,
  },

  heroCircleThree: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: COLORS.gold,
    opacity: 0.08,
    right: 45,
    bottom: 70,
  },

  heroTopRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  heroEyebrow: {
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.5,
    color: COLORS.gold,
    marginBottom: 4,
  },

  heroHeading: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.white,
  },

  heroStar: {
    width: 35,
    height: 35,
    borderRadius: 12,
    backgroundColor:
      "rgba(255,255,255,0.10)",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarArea: {
    position: "relative",
    marginTop: 5,
    marginBottom: 12,
  },

  avatarGlow: {
    width: 105,
    height: 105,
    borderRadius: 53,
    backgroundColor:
      "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },

  avatar: {
    width: 87,
    height: 87,
    borderRadius: 44,
    backgroundColor: COLORS.blue,
    borderWidth: 3,
    borderColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: COLORS.white,
    fontSize: 27,
    fontWeight: "900",
    letterSpacing: 1,
  },

  verifiedIcon: {
    position: "absolute",
    right: -1,
    bottom: 1,
    width: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: COLORS.gold,
    borderWidth: 3,
    borderColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
  },

  heroName: {
    fontSize: 22,
    fontWeight: "900",
    color: COLORS.white,
    marginBottom: 8,
  },

  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor:
      "rgba(255,255,255,0.10)",
    marginBottom: 9,
  },

  verifiedDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.gold,
    marginRight: 7,
  },

  verifiedText: {
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.1,
    color: COLORS.gold,
  },

  heroDescription: {
    maxWidth: 290,
    textAlign: "center",
    fontSize: 10,
    lineHeight: 16,
    color: "#C3CDE0",
    marginBottom: 17,
  },

  heroStats: {
    width: "100%",
    height: 51,
    borderRadius: 16,
    backgroundColor:
      "rgba(255,255,255,0.08)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  heroStat: {
    flexDirection: "row",
    alignItems: "center",
  },

  heroStatText: {
    fontSize: 9,
    color: "#D4DCEC",
    fontWeight: "700",
    marginLeft: 5,
  },

  heroDivider: {
    width: 1,
    height: 20,
    backgroundColor:
      "rgba(255,255,255,0.14)",
  },

  // ===========================================================
  // COMPLETION
  // ===========================================================

  completionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 26,
  },

  completionIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  completionBody: {
    flex: 1,
  },

  completionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  completionTitle: {
    fontSize: 12,
    fontWeight: "800",
    color: COLORS.navy,
  },

  completionSubtitle: {
    fontSize: 9,
    color: COLORS.muted,
    marginTop: 2,
  },

  completionPercent: {
    fontSize: 13,
    fontWeight: "900",
    color: COLORS.blue,
  },

  progressTrack: {
    width: "100%",
    height: 6,
    borderRadius: 4,
    backgroundColor: "#E8EDF6",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: COLORS.blue,
    borderRadius: 4,
  },

  // ===========================================================
  // SECTION
  // ===========================================================

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  sectionIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.navy,
  },

  sectionSubtitle: {
    fontSize: 9,
    color: COLORS.muted,
    marginTop: 3,
  },

  // ===========================================================
  // FIELDS
  // ===========================================================

  field: {
    marginBottom: 16,
  },

  label: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.1,
    color: "#53627A",
    marginLeft: 3,
    marginBottom: 8,
  },

  inputContainer: {
    minHeight: 66,
    backgroundColor: COLORS.white,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  inputContainerFocused: {
    borderColor: COLORS.blue,
    backgroundColor: "#FCFDFF",
  },

  fieldIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: "#F2F5FA",
    alignItems: "center",
    justifyContent: "center",
  },

  fieldIconActive: {
    backgroundColor: COLORS.blueLight,
  },

  inputArea: {
    flex: 1,
    marginLeft: 11,
  },

  inputMiniLabel: {
    fontSize: 8,
    color: COLORS.muted,
    fontWeight: "600",
    marginBottom: 1,
  },

  input: {
    height: 27,
    padding: 0,
    fontSize: 14,
    color: COLORS.navy,
    fontWeight: "600",
  },

  validIcon: {
    marginRight: 5,
  },

  // ===========================================================
  // INFO
  // ===========================================================

  infoCard: {
    backgroundColor: "#EEF3FF",
    borderRadius: 18,
    padding: 14,
    flexDirection: "row",
    marginTop: 2,
    marginBottom: 21,
  },

  infoIcon: {
    width: 39,
    height: 39,
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
    fontSize: 11,
    fontWeight: "800",
    color: COLORS.navy,
    marginBottom: 4,
  },

  infoText: {
    fontSize: 9,
    lineHeight: 15,
    color: COLORS.muted,
  },

  // ===========================================================
  // SAVE
  // ===========================================================

  saveButton: {
    minHeight: 59,
    borderRadius: 17,
    backgroundColor: COLORS.blue,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
    elevation: 4,
  },

  saveButtonDisabled: {
    opacity: 0.72,
  },

  saveButtonIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor:
      "rgba(255,255,255,0.16)",
    alignItems: "center",
    justifyContent: "center",
  },

  saveText: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "900",
    color: COLORS.white,
  },

  cancelButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 17,
  },

  cancelText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.muted,
  },

  // ===========================================================
  // FOOTER
  // ===========================================================

  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    marginBottom: 10,
  },

  footerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },

  footerCenter: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  footerText: {
    fontSize: 9,
    color: "#9AA8BF",
    fontWeight: "600",
    marginLeft: 5,
  },

  // ===========================================================
  // LOADING
  // ===========================================================

  loadingScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.background,
  },

  loadingLogo: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: COLORS.navy,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  loadingText: {
    fontSize: 11,
    color: COLORS.muted,
    marginTop: 10,
  },

  // ===========================================================
  // DROPDOWN
  // ===========================================================

  modalBackdrop: {
    flex: 1,
    backgroundColor:
      "rgba(7,26,58,0.25)",
    alignItems: "flex-end",
    paddingTop: 82,
    paddingRight: 18,
  },

  accountDropdown: {
    width: 245,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.navy,
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
    paddingVertical: 13,
  },

  dropdownAvatar: {
    width: 43,
    height: 43,
    borderRadius: 15,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
  },

  dropdownHeaderText: {
    flex: 1,
    marginLeft: 11,
  },

  dropdownName: {
    fontSize: 15,
    fontWeight: "900",
    color: COLORS.navy,
  },

  dropdownRole: {
    fontSize: 10,
    color: COLORS.blue,
    fontWeight: "700",
    marginTop: 3,
  },

  dropdownDivider: {
    height: 1,
    backgroundColor: "#EEF2F7",
    marginVertical: 6,
  },

  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
  },

  dropdownItemText: {
    marginLeft: 12,
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
  },
});