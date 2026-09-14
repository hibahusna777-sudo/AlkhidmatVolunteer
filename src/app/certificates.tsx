import { Ionicons } from "@expo/vector-icons";
import * as Print from "expo-print";
import { useRouter } from "expo-router";
import * as Sharing from "expo-sharing";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const BRAND_BLUE = "#2F6BFF";
const DEEP_BLUE = "#071A3A";
const MID_BLUE = "#0D2B63";
const GOLD = "#E8C56A";
const BG = "#F5F7FB";
const TEXT_GRAY = "#64748B";
const BORDER = "#E4EAF3";

export default function CertificateScreen() {
  const router = useRouter();

  const [volunteerName, setVolunteerName] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const certificateId = `ALKH-VOL-${Date.now()
    .toString()
    .slice(-6)}`;

  const handleGeneratePreview = () => {
    if (
      !volunteerName.trim() ||
      !eventName.trim() ||
      !eventDate.trim()
    ) {
      Alert.alert(
        "Missing Information",
        "Please fill in your name, event name, and event date."
      );
      return;
    }

    setShowPreview(true);
  };

  const escapeHtml = (value: string) => {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const downloadCertificate = async () => {
    if (
      !volunteerName.trim() ||
      !eventName.trim() ||
      !eventDate.trim()
    ) {
      Alert.alert(
        "Missing Information",
        "Please fill in your name, event name, and event date first."
      );
      return;
    }

    setIsGenerating(true);

    try {
      const safeName = escapeHtml(volunteerName.trim());
      const safeEvent = escapeHtml(eventName.trim());
      const safeDate = escapeHtml(eventDate.trim());

      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />

            <style>
              * {
                box-sizing: border-box;
              }

              body {
                margin: 0;
                padding: 30px;
                background: #f5f7fb;
                font-family: Arial, Helvetica, sans-serif;
              }

              .certificate {
                position: relative;
                background: #ffffff;
                min-height: 650px;
                padding: 55px 45px;
                text-align: center;
                border: 12px solid #071a3a;
                outline: 2px solid #2f6bff;
                outline-offset: -22px;
              }

              .corner {
                position: absolute;
                width: 65px;
                height: 65px;
                border-color: #e8c56a;
                border-style: solid;
              }

              .top-left {
                top: 20px;
                left: 20px;
                border-width: 4px 0 0 4px;
              }

              .top-right {
                top: 20px;
                right: 20px;
                border-width: 4px 4px 0 0;
              }

              .bottom-left {
                bottom: 20px;
                left: 20px;
                border-width: 0 0 4px 4px;
              }

              .bottom-right {
                bottom: 20px;
                right: 20px;
                border-width: 0 4px 4px 0;
              }

              .brand {
                color: #2f6bff;
                font-size: 20px;
                font-weight: bold;
                letter-spacing: 3px;
                margin-top: 15px;
              }

              .small {
                color: #64748b;
                font-size: 11px;
                letter-spacing: 3px;
                margin-top: 8px;
              }

              .title {
                color: #071a3a;
                font-size: 44px;
                font-weight: bold;
                letter-spacing: 5px;
                margin-top: 38px;
              }

              .subtitle {
                color: #b88718;
                font-size: 15px;
                font-weight: bold;
                letter-spacing: 4px;
                margin-top: 8px;
              }

              .line {
                width: 100px;
                height: 3px;
                background: #2f6bff;
                margin: 25px auto;
              }

              .intro {
                color: #64748b;
                font-size: 15px;
                margin-top: 10px;
              }

              .name {
                color: #2f6bff;
                font-size: 32px;
                font-weight: bold;
                margin: 16px 0;
              }

              .body-text {
                color: #64748b;
                font-size: 15px;
                line-height: 24px;
              }

              .event {
                color: #071a3a;
                font-size: 23px;
                font-weight: bold;
                margin: 14px 0;
              }

              .date {
                color: #475569;
                font-size: 13px;
                margin-top: 15px;
              }

              .signatures {
                display: flex;
                justify-content: space-between;
                margin-top: 65px;
              }

              .signature {
                width: 38%;
                text-align: center;
              }

              .signature-line {
                border-top: 1px solid #94a3b8;
                margin-bottom: 8px;
              }

              .signature-text {
                color: #64748b;
                font-size: 10px;
              }

              .id {
                color: #94a3b8;
                font-size: 9px;
                margin-top: 35px;
              }
            </style>
          </head>

          <body>
            <div class="certificate">

              <div class="corner top-left"></div>
              <div class="corner top-right"></div>
              <div class="corner bottom-left"></div>
              <div class="corner bottom-right"></div>

              <div class="brand">
                ALKHIDMAT FOUNDATION
              </div>

              <div class="small">
                VOLUNTEER SERVICES
              </div>

              <div class="title">
                CERTIFICATE
              </div>

              <div class="subtitle">
                OF APPRECIATION
              </div>

              <div class="line"></div>

              <div class="intro">
                This certificate is proudly presented to
              </div>

              <div class="name">
                ${safeName}
              </div>

              <div class="body-text">
                in recognition of successful participation<br/>
                as a volunteer in
              </div>

              <div class="event">
                ${safeEvent}
              </div>

              <div class="date">
                Event Date: ${safeDate}
              </div>

              <div class="signatures">

                <div class="signature">
                  <div class="signature-line"></div>
                  <div class="signature-text">
                    Authorized Representative
                  </div>
                </div>

                <div class="signature">
                  <div class="signature-line"></div>
                  <div class="signature-text">
                    Alkhidmat Foundation
                  </div>
                </div>

              </div>

              <div class="id">
                Certificate ID: ${certificateId}
              </div>

            </div>
          </body>
        </html>
      `;

      const result = await Print.printToFileAsync({
        html,
      });

      const sharingAvailable =
        await Sharing.isAvailableAsync();

      if (sharingAvailable) {
        await Sharing.shareAsync(result.uri, {
          mimeType: "application/pdf",
          dialogTitle: "Share Certificate",
        });
      } else {
        Alert.alert(
          "Certificate Ready",
          "Your certificate PDF has been generated successfully."
        );
      }
    } catch (error) {
      console.log("Certificate error:", error);

      Alert.alert(
        "Generation Error",
        "Certificate could not be generated. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.page}>

        {/* =====================================
            HEADER
        ===================================== */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.75}
          >
            <Ionicons
              name="chevron-back"
              size={23}
              color={DEEP_BLUE}
            />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerSmall}>
              VOLUNTEER SERVICES
            </Text>

            <Text style={styles.headerTitle}>
              Certificates
            </Text>
          </View>

          <View style={styles.headerPlaceholder} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >

          {!showPreview ? (

            <>
              {/* =====================================
                  HERO INTRO
              ===================================== */}

              <View style={styles.heroCard}>

                <View style={styles.heroCircleOne} />
                <View style={styles.heroCircleTwo} />

                <View style={styles.heroIcon}>
                  <Ionicons
                    name="ribbon"
                    size={31}
                    color={GOLD}
                  />
                </View>

                <View style={styles.heroText}>
                  <Text style={styles.heroTitle}>
                    Celebrate Your Impact
                  </Text>

                  <Text style={styles.heroSubtitle}>
                    Create a professional volunteer certificate
                    for your completed Alkhidmat activities.
                  </Text>
                </View>

                <View style={styles.heroBadge}>
                  <Ionicons
                    name="sparkles"
                    size={13}
                    color="#FFFFFF"
                  />
                  <Text style={styles.heroBadgeText}>
                    YOUR ACHIEVEMENT
                  </Text>
                </View>

              </View>

              {/* =====================================
                  FORM CARD
              ===================================== */}

              <View style={styles.formCard}>

                <View style={styles.formHeader}>
                  <View>
                    <Text style={styles.formTitle}>
                      Certificate Details
                    </Text>

                    <Text style={styles.formSubtitle}>
                      Enter the information below
                    </Text>
                  </View>

                  <View style={styles.formIcon}>
                    <Ionicons
                      name="document-text-outline"
                      size={20}
                      color={BRAND_BLUE}
                    />
                  </View>
                </View>

                {/* NAME */}

                <Text style={styles.label}>
                  Full Name
                </Text>

                <View style={styles.inputWrap}>
                  <Ionicons
                    name="person-outline"
                    size={18}
                    color={BRAND_BLUE}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    placeholderTextColor="#9AA5B8"
                    value={volunteerName}
                    onChangeText={setVolunteerName}
                    autoCapitalize="words"
                  />
                </View>

                {/* EVENT */}

                <Text style={styles.label}>
                  Event Name
                </Text>

                <View style={styles.inputWrap}>
                  <Ionicons
                    name="calendar-outline"
                    size={18}
                    color={BRAND_BLUE}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="e.g. Tree Plantation Drive"
                    placeholderTextColor="#9AA5B8"
                    value={eventName}
                    onChangeText={setEventName}
                    autoCapitalize="words"
                  />
                </View>

                {/* DATE */}

                <Text style={styles.label}>
                  Event Date
                </Text>

                <View style={styles.inputWrap}>
                  <Ionicons
                    name="time-outline"
                    size={18}
                    color={BRAND_BLUE}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="e.g. 22 August 2026"
                    placeholderTextColor="#9AA5B8"
                    value={eventDate}
                    onChangeText={setEventDate}
                  />
                </View>

                {/* BUTTON */}

                <TouchableOpacity
                  style={styles.generateButton}
                  onPress={handleGeneratePreview}
                  activeOpacity={0.85}
                >
                  <View style={styles.buttonIcon}>
                    <Ionicons
                      name="sparkles"
                      size={17}
                      color={BRAND_BLUE}
                    />
                  </View>

                  <Text style={styles.generateText}>
                    Generate Certificate
                  </Text>

                  <Ionicons
                    name="arrow-forward"
                    size={18}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>

              </View>

              {/* =====================================
                  INFO CARD
              ===================================== */}

              <View style={styles.infoCard}>
                <View style={styles.infoIcon}>
                  <Ionicons
                    name="shield-checkmark-outline"
                    size={19}
                    color="#26965B"
                  />
                </View>

                <View style={styles.infoText}>
                  <Text style={styles.infoTitle}>
                    Volunteer Recognition
                  </Text>

                  <Text style={styles.infoSubtitle}>
                    Your certificate includes a unique
                    certificate ID for identification.
                  </Text>
                </View>
              </View>
            </>

          ) : (

            <>
              {/* =====================================
                  PREVIEW HEADER
              ===================================== */}

              <View style={styles.previewHeader}>
                <View>
                  <Text style={styles.previewSmall}>
                    PREVIEW
                  </Text>

                  <Text style={styles.previewTitle}>
                    Your Certificate
                  </Text>
                </View>

                <View style={styles.previewIcon}>
                  <Ionicons
                    name="checkmark-circle"
                    size={23}
                    color="#26965B"
                  />
                </View>
              </View>

              {/* =====================================
                  CERTIFICATE
              ===================================== */}

              <View style={styles.certificate}>

                <View style={styles.certificateTopShape} />
                <View style={styles.certificateBottomShape} />

                <View style={styles.cornerTopLeft} />
                <View style={styles.cornerTopRight} />
                <View style={styles.cornerBottomLeft} />
                <View style={styles.cornerBottomRight} />

                <View style={styles.certificateLogo}>
                  <Ionicons
                    name="ribbon"
                    size={25}
                    color={GOLD}
                  />
                </View>

                <Text style={styles.organization}>
                  ALKHIDMAT FOUNDATION
                </Text>

                <Text style={styles.volunteerServices}>
                  VOLUNTEER SERVICES
                </Text>

                <Text style={styles.certificateTitle}>
                  CERTIFICATE
                </Text>

                <Text style={styles.certificateSubtitle}>
                  OF APPRECIATION
                </Text>

                <View style={styles.blueLine} />

                <Text style={styles.certificateText}>
                  This certificate is proudly presented to
                </Text>

                <Text style={styles.certificateName}>
                  {volunteerName}
                </Text>

                <Text style={styles.certificateText}>
                  in recognition of successful participation
                  as a volunteer in
                </Text>

                <Text style={styles.certificateEvent}>
                  {eventName}
                </Text>

                <View style={styles.datePill}>
                  <Ionicons
                    name="calendar-outline"
                    size={13}
                    color={BRAND_BLUE}
                  />

                  <Text style={styles.datePillText}>
                    {eventDate}
                  </Text>
                </View>

                <View style={styles.signatureArea}>

                  <View style={styles.signature}>
                    <View style={styles.signatureLine} />
                    <Text style={styles.signatureText}>
                      Authorized Representative
                    </Text>
                  </View>

                  <View style={styles.signature}>
                    <View style={styles.signatureLine} />
                    <Text style={styles.signatureText}>
                      Alkhidmat Foundation
                    </Text>
                  </View>

                </View>

                <Text style={styles.certificateId}>
                  Certificate ID: {certificateId}
                </Text>

              </View>

              {/* =====================================
                  ACTIONS
              ===================================== */}

              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setShowPreview(false)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="create-outline"
                  size={18}
                  color={BRAND_BLUE}
                />

                <Text style={styles.editButtonText}>
                  Edit Details
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.downloadButton,
                  isGenerating && styles.downloadButtonDisabled,
                ]}
                onPress={downloadCertificate}
                activeOpacity={0.85}
                disabled={isGenerating}
              >
                <Ionicons
                  name="download-outline"
                  size={20}
                  color="#FFFFFF"
                />

                <Text style={styles.downloadText}>
                  {isGenerating
                    ? "Preparing Certificate..."
                    : "Download / Share Certificate"}
                </Text>
              </TouchableOpacity>

              <View style={styles.previewNote}>
                <Ionicons
                  name="information-circle-outline"
                  size={16}
                  color="#64748B"
                />

                <Text style={styles.previewNoteText}>
                  Your certificate will be generated as a PDF.
                </Text>
              </View>
            </>

          )}

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

/* ==================================================
   STYLES
================================================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
  },

  page: {
    flex: 1,
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    paddingHorizontal: 18,
    paddingTop: 9,
  },

  content: {
    paddingBottom: 35,
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
  },

  headerCenter: {
    alignItems: "center",
  },

  headerSmall: {
    fontSize: 8,
    fontWeight: "800",
    color: BRAND_BLUE,
    letterSpacing: 1.5,
    marginBottom: 2,
  },

  headerTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: DEEP_BLUE,
  },

  headerPlaceholder: {
    width: 42,
  },

  /* HERO */

  heroCard: {
    backgroundColor: DEEP_BLUE,
    borderRadius: 23,
    padding: 19,
    marginBottom: 18,
    minHeight: 160,
    overflow: "hidden",
  },

  heroCircleOne: {
    position: "absolute",
    width: 170,
    height: 170,
    borderRadius: 85,
    right: -80,
    top: -85,
    backgroundColor: MID_BLUE,
  },

  heroCircleTwo: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 45,
    right: 50,
    bottom: -55,
    backgroundColor: "#123A7A",
  },

  heroIcon: {
    width: 53,
    height: 53,
    borderRadius: 17,
    backgroundColor: "rgba(232,197,106,0.14)",
    borderWidth: 1,
    borderColor: "rgba(232,197,106,0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  heroText: {
    maxWidth: "90%",
  },

  heroTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  heroSubtitle: {
    fontSize: 11,
    color: "#AFC0E5",
    lineHeight: 17,
    marginTop: 5,
  },

  heroBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: BRAND_BLUE,
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 5,
    marginTop: 12,
  },

  heroBadgeText: {
    color: "#FFFFFF",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.7,
    marginLeft: 5,
  },

  /* FORM */

  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 21,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 18,
    marginBottom: 13,
  },

  formHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 3,
  },

  formTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: DEEP_BLUE,
  },

  formSubtitle: {
    fontSize: 10,
    color: TEXT_GRAY,
    marginTop: 3,
  },

  formIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: "#EAF1FF",
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    fontSize: 11,
    fontWeight: "800",
    color: "#344054",
    marginTop: 15,
    marginBottom: 6,
  },

  inputWrap: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 13,
    paddingHorizontal: 13,
  },

  input: {
    flex: 1,
    fontSize: 13,
    color: "#0F172A",
    paddingVertical: 11,
    marginLeft: 9,
  },

  generateButton: {
    height: 53,
    backgroundColor: BRAND_BLUE,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 7,
    marginTop: 21,
  },

  buttonIcon: {
    width: 39,
    height: 39,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  generateText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
    marginLeft: 10,
  },

  /* INFO */

  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 13,
  },

  infoIcon: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: "#EAF8F1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  infoText: {
    flex: 1,
  },

  infoTitle: {
    fontSize: 11,
    fontWeight: "800",
    color: DEEP_BLUE,
  },

  infoSubtitle: {
    fontSize: 9,
    color: TEXT_GRAY,
    lineHeight: 14,
    marginTop: 3,
  },

  /* PREVIEW */

  previewHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 13,
  },

  previewSmall: {
    fontSize: 8,
    fontWeight: "800",
    color: BRAND_BLUE,
    letterSpacing: 1.5,
  },

  previewTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: DEEP_BLUE,
    marginTop: 2,
  },

  previewIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#EAF8F1",
    alignItems: "center",
    justifyContent: "center",
  },

  /* CERTIFICATE */

  certificate: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: DEEP_BLUE,
    paddingHorizontal: 19,
    paddingVertical: 28,
    alignItems: "center",
    overflow: "hidden",
  },

  certificateTopShape: {
    position: "absolute",
    top: -55,
    right: -55,
    width: 125,
    height: 125,
    borderRadius: 63,
    backgroundColor: MID_BLUE,
  },

  certificateBottomShape: {
    position: "absolute",
    bottom: -65,
    left: -65,
    width: 135,
    height: 135,
    borderRadius: 68,
    backgroundColor: "#EAF1FF",
  },

  cornerTopLeft: {
    position: "absolute",
    top: 13,
    left: 13,
    width: 35,
    height: 35,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: GOLD,
  },

  cornerTopRight: {
    position: "absolute",
    top: 13,
    right: 13,
    width: 35,
    height: 35,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: GOLD,
  },

  cornerBottomLeft: {
    position: "absolute",
    bottom: 13,
    left: 13,
    width: 35,
    height: 35,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: GOLD,
  },

  cornerBottomRight: {
    position: "absolute",
    bottom: 13,
    right: 13,
    width: 35,
    height: 35,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: GOLD,
  },

  certificateLogo: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: DEEP_BLUE,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 9,
  },

  organization: {
    fontSize: 12,
    fontWeight: "900",
    color: BRAND_BLUE,
    letterSpacing: 1.8,
  },

  volunteerServices: {
    fontSize: 7,
    fontWeight: "800",
    color: "#94A3B8",
    letterSpacing: 1.5,
    marginTop: 4,
  },

  certificateTitle: {
    fontSize: 28,
    fontWeight: "900",
    color: DEEP_BLUE,
    letterSpacing: 2.5,
    marginTop: 24,
  },

  certificateSubtitle: {
    fontSize: 9,
    fontWeight: "800",
    color: "#B88718",
    letterSpacing: 2,
    marginTop: 4,
  },

  blueLine: {
    width: 52,
    height: 3,
    borderRadius: 3,
    backgroundColor: BRAND_BLUE,
    marginVertical: 18,
  },

  certificateText: {
    fontSize: 10,
    color: TEXT_GRAY,
    textAlign: "center",
    lineHeight: 16,
    maxWidth: "90%",
  },

  certificateName: {
    fontSize: 21,
    fontWeight: "900",
    color: BRAND_BLUE,
    textAlign: "center",
    marginVertical: 10,
  },

  certificateEvent: {
    fontSize: 14,
    fontWeight: "800",
    color: DEEP_BLUE,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 11,
  },

  datePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF1FF",
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 6,
  },

  datePillText: {
    fontSize: 9,
    fontWeight: "700",
    color: DEEP_BLUE,
    marginLeft: 5,
  },

  signatureArea: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 42,
  },

  signature: {
    width: "40%",
    alignItems: "center",
  },

  signatureLine: {
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#94A3B8",
    marginBottom: 6,
  },

  signatureText: {
    fontSize: 7,
    color: TEXT_GRAY,
    textAlign: "center",
  },

  certificateId: {
    fontSize: 7,
    color: "#94A3B8",
    marginTop: 25,
  },

  /* ACTION BUTTONS */

  editButton: {
    height: 47,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#C9D8FA",
    backgroundColor: "#F5F8FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },

  editButtonText: {
    fontSize: 12,
    fontWeight: "800",
    color: BRAND_BLUE,
    marginLeft: 7,
  },

  downloadButton: {
    height: 53,
    borderRadius: 14,
    backgroundColor: BRAND_BLUE,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  downloadButtonDisabled: {
    opacity: 0.65,
  },

  downloadText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
    marginLeft: 8,
  },

  previewNote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 13,
  },

  previewNoteText: {
    fontSize: 9,
    color: TEXT_GRAY,
    marginLeft: 5,
  },
});