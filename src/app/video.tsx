import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    Image,
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
  blueLight: "#EAF0FF",
  gold: "#E8C56A",
  white: "#FFFFFF",
  background: "#F8FAFC",
  text: "#111827",
  muted: "#64748B",
  border: "#E2E8F0",
};

const videos = [
  {
    id: "1",
    title: "Alkhidmat Foundation KP",
    subtitle: "Watch the latest Alkhidmat story",
    image: require("../../assets/images/videos/video-1.jpg"),
    url: "https://www.youtube.com/watch?v=UxgKpBs9q-g",
  },
  {
    id: "2",
    title: "Empowering Youth | Abbottabad",
    subtitle: "Bano Qabil KP | Alkhidmat Foundation KP",
    image: require("../../assets/images/videos/video-2.jpg"),
    url: "https://www.youtube.com/shorts/EQ7NWSBYl8s",
  },
  {
    id: "3",
    title: "Alkhidmat Foundation KP",
    subtitle: "Watch this inspiring short",
    image: require("../../assets/images/videos/video-3.jpg"),
    url: "https://www.youtube.com/shorts/_Ti20V7ZS6E",
  },
  {
    id: "4",
    title: "Alkhidmat Foundation KP",
    subtitle: "Community • Youth • Service",
    image: require("../../assets/images/videos/video-4.jpg"),
    url: "https://www.youtube.com/shorts/PYo8T5hmWKs",
  },
];

export default function VideoScreen() {
  const router = useRouter();

  const openVideo = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.log("Unable to open video:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollOuter}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.page}>
          {/* HERO */}
          <View style={styles.hero}>
            <View style={styles.heroCircleOne} />
            <View style={styles.heroCircleTwo} />

            <View style={styles.heroTop}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
                activeOpacity={0.8}
              >
                <Ionicons name="arrow-back" size={20} color={COLORS.navy} />
              </TouchableOpacity>

              <View style={styles.badge}>
                <View style={styles.badgeDot} />
                <Text style={styles.badgeText}>STORIES THAT INSPIRE</Text>
              </View>

              <View style={{ width: 40 }} />
            </View>

            {/* BRAND ROW, Alkhidmat logo */}
            <View style={styles.brandRow}>
              <View style={styles.logoBox}>
                <Image
                  source={require("../../assets/images/alkhidmat-logo.png")}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>

              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.brandName}>ALKHIDMAT</Text>
                <Text style={styles.brandSub}>Volunteer App</Text>
              </View>
            </View>

            <View style={styles.heroDivider} />

            <View style={styles.heroBody}>
              <View style={styles.youtubeIcon}>
                <Ionicons name="logo-youtube" size={26} color="#FFFFFF" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.heroTitle}>Alkhidmat Stories</Text>
                <Text style={styles.heroSubtitle}>
                  Inspiring stories, youth initiatives and community service.
                </Text>
              </View>
            </View>
          </View>

          {/* SECTION HEADER */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Videos</Text>
            <View style={styles.videoCountPill}>
              <Text style={styles.videoCount}>{videos.length} Videos</Text>
            </View>
          </View>

          {videos.map((video) => (
            <View key={video.id} style={styles.videoCard}>
              <TouchableOpacity activeOpacity={0.9} onPress={() => openVideo(video.url)}>
                <View style={styles.imageContainer}>
                  <Image source={video.image} style={styles.videoImage} resizeMode="cover" />

                  <View style={styles.playButton}>
                    <Ionicons name="play" size={22} color="#FFFFFF" style={{ marginLeft: 3 }} />
                  </View>

                  <View style={styles.youtubeBadge}>
                    <Ionicons name="logo-youtube" size={13} color="#FFFFFF" />
                    <Text style={styles.youtubeBadgeText}>YouTube</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <View style={styles.cardBody}>
                <Text style={styles.videoTitle}>{video.title}</Text>
                <Text style={styles.videoSubtitle}>{video.subtitle}</Text>

                <TouchableOpacity
                  style={styles.watchButton}
                  activeOpacity={0.85}
                  onPress={() => openVideo(video.url)}
                >
                  <Ionicons name="play-circle-outline" size={18} color="#FFFFFF" />
                  <Text style={styles.watchButtonText}>Watch Video</Text>
                  <Ionicons name="open-outline" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* FOOTER */}
          <View style={styles.footer}>
            <Ionicons name="heart-outline" size={16} color={COLORS.muted} />
            <Text style={styles.footerText}>
              Together we can serve, empower and transform communities.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  container: { flex: 1 },
  scrollOuter: { alignItems: "center", paddingBottom: 30 },

  page: {
    width: "100%",
    maxWidth: 430,
    paddingHorizontal: 18,
    paddingTop: 12,
  },

  /* HERO */
  hero: {
    backgroundColor: COLORS.navy,
    borderRadius: 24,
    padding: 18,
    overflow: "hidden",
    position: "relative",
    marginBottom: 22,
  },
  heroCircleOne: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    right: -60,
    top: -60,
    backgroundColor: "#16366F",
    opacity: 0.6,
  },
  heroCircleTwo: {
    position: "absolute",
    width: 110,
    height: 110,
    borderRadius: 55,
    left: -50,
    bottom: -40,
    backgroundColor: "#0E2A5B",
  },
  heroTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.10)",
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  badgeDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.gold, marginRight: 6 },
  badgeText: { color: COLORS.gold, fontSize: 8, fontWeight: "800", letterSpacing: 0.6 },

  /* BRAND ROW */
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  logoBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: { width: 30, height: 30 },
  brandName: { fontSize: 12, fontWeight: "900", color: "#FFFFFF", letterSpacing: 1 },
  brandSub: { fontSize: 9, color: "#AFC0E5", marginTop: 2, fontWeight: "600" },

  heroDivider: { height: 1, backgroundColor: "rgba(255,255,255,0.10)", marginBottom: 16 },

  heroBody: { flexDirection: "row", alignItems: "center" },
  youtubeIcon: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.10)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  heroTitle: { color: "#FFFFFF", fontSize: 18, fontWeight: "900", marginBottom: 4 },
  heroSubtitle: { color: "#C8D4ED", fontSize: 12, lineHeight: 17 },

  /* SECTION */
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 13,
  },
  sectionTitle: { fontSize: 18, fontWeight: "900", color: COLORS.navy },
  videoCountPill: {
    backgroundColor: COLORS.blueLight,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  videoCount: { fontSize: 11, color: COLORS.blue, fontWeight: "700" },

  /* VIDEO CARD */
  videoCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  imageContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#E2E8F0",
    position: "relative",
  },
  videoImage: { width: "100%", height: "100%" },

  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 52,
    height: 52,
    marginLeft: -26,
    marginTop: -26,
    borderRadius: 26,
    backgroundColor: "rgba(47,107,255,0.95)",
    alignItems: "center",
    justifyContent: "center",
  },

  youtubeBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.70)",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
  },
  youtubeBadgeText: { color: "#FFFFFF", fontSize: 10, fontWeight: "700", marginLeft: 4 },

  cardBody: { padding: 14 },
  videoTitle: { fontSize: 15, fontWeight: "800", color: COLORS.text, marginBottom: 4 },
  videoSubtitle: { fontSize: 12, lineHeight: 17, color: COLORS.muted, marginBottom: 12 },

  watchButton: {
    height: 42,
    borderRadius: 12,
    backgroundColor: COLORS.blue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  watchButtonText: { color: "#FFFFFF", fontSize: 13, fontWeight: "800" },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    gap: 6,
  },
  footerText: { flex: 1, textAlign: "center", color: COLORS.muted, fontSize: 11, lineHeight: 16 },
});