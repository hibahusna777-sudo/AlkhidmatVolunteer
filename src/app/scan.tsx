import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const COLORS = {
  navy: "#071A3A",
  navyLight: "#0D2B63",
  blue: "#2F6BFF",
  blueLight: "#E8EFFF",
  blueDark: "#1748C7",
  white: "#FFFFFF",
  background: "#F5F8FF",
  muted: "#A9B8DD",
  border: "rgba(255,255,255,0.12)",
  green: "#65D89B",
};

const FRAME_SIZE = 250;

export default function ScanScreen() {
  const router = useRouter();

  const [permission, requestPermission] = useCameraPermissions();
  const [torchOn, setTorchOn] = useState(false);
  const [scanned, setScanned] = useState(false);

  const handleScan = ({ data }: { data: string }) => {
    if (scanned) {
      return;
    }

    setScanned(true);

    Alert.alert(
      "Attendance Marked",
      `QR code detected:\n${data}`,
      [
        {
          text: "Scan Again",
          onPress: () => setScanned(false),
        },
        {
          text: "Done",
          style: "default",
          onPress: () => router.back(),
        },
      ]
    );
  };

  /* --------------------------------
     Loading Permission State
  --------------------------------- */

  if (!permission) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingIcon}>
          <Ionicons
            name="scan-outline"
            size={30}
            color={COLORS.blue}
          />
        </View>

        <Text style={styles.loadingText}>
          Preparing QR scanner...
        </Text>
      </View>
    );
  }

  /* --------------------------------
     Camera Permission Screen
  --------------------------------- */

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <View style={styles.permissionContent}>
          <View style={styles.permissionHero}>
            <View style={styles.permissionCircleOne} />
            <View style={styles.permissionCircleTwo} />

            <View style={styles.permissionIcon}>
              <Ionicons
                name="camera-outline"
                size={42}
                color={COLORS.white}
              />
            </View>

            <Text style={styles.permissionHeroTitle}>
              QR Attendance
            </Text>

            <Text style={styles.permissionHeroText}>
              Scan event QR codes quickly and securely to mark your
              volunteer attendance.
            </Text>
          </View>

          <View style={styles.permissionCard}>
            <View style={styles.permissionSmallIcon}>
              <Ionicons
                name="shield-checkmark-outline"
                size={23}
                color={COLORS.blue}
              />
            </View>

            <View style={styles.permissionInfo}>
              <Text style={styles.permissionTitle}>
                Camera access required
              </Text>

              <Text style={styles.permissionDescription}>
                Camera permission is needed to scan the QR code for
                your volunteer event attendance.
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.allowButton}
            onPress={requestPermission}
            activeOpacity={0.85}
          >
            <Ionicons
              name="camera"
              size={19}
              color={COLORS.white}
            />

            <Text style={styles.allowButtonText}>
              Allow Camera
            </Text>

            <Ionicons
              name="arrow-forward"
              size={18}
              color={COLORS.white}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelButtonText}>
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  /* --------------------------------
     Camera Scanner
  --------------------------------- */

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        enableTorch={torchOn}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={scanned ? undefined : handleScan}
      />

      {/* Dark Camera Overlay */}
      <View style={styles.cameraOverlay} pointerEvents="none" />

      {/* Top Header */}
      <SafeAreaView style={styles.topSafeArea}>
        <View style={styles.topHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Ionicons
              name="chevron-back"
              size={23}
              color={COLORS.white}
            />
          </TouchableOpacity>

          <View style={styles.topTitleContainer}>
            <Text style={styles.topTitle}>Scan QR Code</Text>
            <Text style={styles.topSubtitle}>
              Mark your event attendance
            </Text>
          </View>

          <View style={styles.topIcon}>
            <Ionicons
              name="scan-outline"
              size={21}
              color={COLORS.white}
            />
          </View>
        </View>
      </SafeAreaView>

      {/* Scanner Content */}
      <View style={styles.scannerContent}>
        {/* Scanner Status */}
        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />

          <Text style={styles.statusText}>
            Ready to scan
          </Text>
        </View>

        {/* QR Frame */}
        <View style={styles.frameWrapper}>
          <View style={styles.frame}>
            {/* Top Left */}
            <View style={[styles.corner, styles.cornerTL]} />

            {/* Top Right */}
            <View style={[styles.corner, styles.cornerTR]} />

            {/* Bottom Left */}
            <View style={[styles.corner, styles.cornerBL]} />

            {/* Bottom Right */}
            <View style={[styles.corner, styles.cornerBR]} />

            {/* Scanner Line */}
            {!scanned && <View style={styles.scanLine} />}
          </View>
        </View>

        {/* Instructions */}
        <Text style={styles.scanTitle}>
          Scan event QR code
        </Text>

        <Text style={styles.hintText}>
          Position the QR code inside the frame
        </Text>

        {/* Flash */}
        <TouchableOpacity
          style={[
            styles.flashButton,
            torchOn && styles.flashButtonActive,
          ]}
          onPress={() => setTorchOn((previous) => !previous)}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.flashIcon,
              torchOn && styles.flashIconActive,
            ]}
          >
            <Ionicons
              name={torchOn ? "flash" : "flash-outline"}
              size={18}
              color={torchOn ? COLORS.navy : COLORS.white}
            />
          </View>

          <View>
            <Text style={styles.flashTitle}>
              {torchOn ? "Flash On" : "Flash Off"}
            </Text>

            <Text style={styles.flashSubtitle}>
              {torchOn
                ? "Tap to turn off"
                : "Tap for better visibility"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Bottom Information Panel */}
      <View style={styles.bottomPanel}>
        <View style={styles.bottomHandle} />

        <View style={styles.bottomRow}>
          <View style={styles.bottomIcon}>
            <Ionicons
              name="shield-checkmark-outline"
              size={21}
              color={COLORS.green}
            />
          </View>

          <View style={styles.bottomContent}>
            <Text style={styles.bottomTitle}>
              Secure attendance
            </Text>

            <Text style={styles.bottomText}>
              Your QR scan helps confirm your participation in the
              selected volunteer event.
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

/* =================================
   STYLES
================================= */

const styles = StyleSheet.create({
  /* Loading */

  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingIcon: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  loadingText: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.navy,
  },

  /* Permission */

  permissionContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  permissionContent: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },

  permissionHero: {
    backgroundColor: COLORS.navy,
    borderRadius: 26,
    padding: 22,
    minHeight: 245,
    overflow: "hidden",
    position: "relative",
    marginBottom: 16,
  },

  permissionCircleOne: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: COLORS.blue,
    opacity: 0.17,
    right: -65,
    top: -70,
  },

  permissionCircleTwo: {
    position: "absolute",
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#E8C56A",
    opacity: 0.1,
    left: -45,
    bottom: -50,
  },

  permissionIcon: {
    width: 68,
    height: 68,
    borderRadius: 21,
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
  },

  permissionHeroTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "800",
    marginTop: 20,
  },

  permissionHeroText: {
    color: "#B9C7E5",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 7,
    maxWidth: 340,
  },

  permissionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F5",
    padding: 15,
    marginBottom: 15,
  },

  permissionSmallIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  permissionInfo: {
    flex: 1,
  },

  permissionTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.navy,
  },

  permissionDescription: {
    fontSize: 10.5,
    color: COLORS.muted,
    lineHeight: 16,
    marginTop: 3,
  },

  allowButton: {
    height: 52,
    borderRadius: 16,
    backgroundColor: COLORS.blue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },

  allowButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "800",
    marginHorizontal: 9,
  },

  cancelButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },

  cancelButtonText: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "700",
  },

  /* Camera */

  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  cameraOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.36)",
  },

  topSafeArea: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },

  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 8,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: "rgba(7,26,58,0.82)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    alignItems: "center",
    justifyContent: "center",
  },

  topTitleContainer: {
    flex: 1,
    marginLeft: 12,
  },

  topTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "800",
  },

  topSubtitle: {
    color: "#C1CCE3",
    fontSize: 10.5,
    marginTop: 2,
  },

  topIcon: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: "rgba(47,107,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
  },

  /* Scanner */

  scannerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(7,26,58,0.84)",
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.green,
    marginRight: 7,
  },

  statusText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "700",
  },

  frameWrapper: {
    width: FRAME_SIZE,
    height: FRAME_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },

  frame: {
    width: FRAME_SIZE,
    height: FRAME_SIZE,
    position: "relative",
  },

  corner: {
    position: "absolute",
    width: 38,
    height: 38,
    borderColor: COLORS.blue,
  },

  cornerTL: {
    top: 0,
    left: 0,
    borderLeftWidth: 4,
    borderTopWidth: 4,
    borderTopLeftRadius: 12,
  },

  cornerTR: {
    top: 0,
    right: 0,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderTopRightRadius: 12,
  },

  cornerBL: {
    bottom: 0,
    left: 0,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
    borderBottomLeftRadius: 12,
  },

  cornerBR: {
    bottom: 0,
    right: 0,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderBottomRightRadius: 12,
  },

  scanLine: {
    position: "absolute",
    left: 14,
    right: 14,
    top: FRAME_SIZE / 2,
    height: 2,
    backgroundColor: COLORS.blue,
    opacity: 0.9,
  },

  scanTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "800",
    marginTop: 25,
  },

  hintText: {
    color: "#CBD5EA",
    fontSize: 11.5,
    marginTop: 6,
  },

  /* Flash */

  flashButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(7,26,58,0.86)",
    borderRadius: 17,
    paddingVertical: 9,
    paddingHorizontal: 11,
    marginTop: 23,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.13)",
    minWidth: 170,
  },

  flashButtonActive: {
    backgroundColor: COLORS.white,
  },

  flashIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  flashIconActive: {
    backgroundColor: "#EAF1FF",
  },

  flashTitle: {
    color: COLORS.white,
    fontSize: 11.5,
    fontWeight: "800",
  },

  flashSubtitle: {
    color: "#AAB8D4",
    fontSize: 9,
    marginTop: 2,
  },

  /* Bottom Panel */

  bottomPanel: {
    backgroundColor: "rgba(7,26,58,0.96)",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 22,
  },

  bottomHandle: {
    width: 42,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignSelf: "center",
    marginBottom: 14,
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  bottomIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: "rgba(101,216,155,0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  bottomContent: {
    flex: 1,
  },

  bottomTitle: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "800",
  },

  bottomText: {
    color: "#AAB8D4",
    fontSize: 10,
    lineHeight: 15,
    marginTop: 3,
 }})