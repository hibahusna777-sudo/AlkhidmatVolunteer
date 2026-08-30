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

export default function CertificateScreen() {
  const router = useRouter();

  // User fills these in themselves — nothing hardcoded
  const [volunteerName, setVolunteerName] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");

  const [showPreview, setShowPreview] = useState(false);

  const certificateId = `ALKH-VOL-${Date.now().toString().slice(-6)}`;

  const handleGeneratePreview = () => {
    if (!volunteerName.trim() || !eventName.trim() || !eventDate.trim()) {
      Alert.alert(
        "Missing Information",
        "Please fill in your name, event name, and event date."
      );
      return;
    }
    setShowPreview(true);
  };

  const downloadCertificate = async () => {
    if (!volunteerName.trim() || !eventName.trim() || !eventDate.trim()) {
      Alert.alert(
        "Missing Information",
        "Please fill in your name, event name, and event date first."
      );
      return;
    }

    try {
      const html = `
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <style>
              body {
                margin: 0;
                padding: 40px;
                font-family: Arial, sans-serif;
                background: #ffffff;
                text-align: center;
              }
              .certificate {
                border: 8px solid #2F6BFF;
                padding: 50px 30px;
                min-height: 600px;
              }
              .organization {
                color: #2F6BFF;
                font-size: 18px;
                font-weight: bold;
                letter-spacing: 2px;
              }
              .title {
                color: #071A3A;
                font-size: 38px;
                margin-top: 40px;
                margin-bottom: 5px;
              }
              .subtitle {
                color: #7B88A8;
                font-size: 16px;
                letter-spacing: 3px;
                margin-bottom: 50px;
              }
              .text {
                color: #5A6B8C;
                font-size: 16px;
              }
              .name {
                color: #2F6BFF;
                font-size: 30px;
                font-weight: bold;
                margin: 15px 0 25px;
              }
              .event {
                color: #071A3A;
                font-size: 22px;
                font-weight: bold;
                margin: 15px 0;
              }
              .date {
                color: #5A6B8C;
                font-size: 14px;
                margin-top: 20px;
              }
              .id {
                color: #94A3B8;
                font-size: 11px;
                margin-top: 60px;
              }
            </style>
          </head>
          <body>
            <div class="certificate">
              <div class="organization">ALKHIDMAT FOUNDATION</div>
              <div class="title">CERTIFICATE</div>
              <div class="subtitle">OF APPRECIATION</div>
              <div class="text">This is to certify that</div>
              <div class="name">${volunteerName}</div>
              <div class="text">has successfully participated as a volunteer in</div>
              <div class="event">${eventName}</div>
              <div class="date">Event Date: ${eventDate}</div>
              <div class="id">Certificate ID: ${certificateId}</div>
            </div>
          </body>
        </html>
      `;

      const result = await Print.printToFileAsync({ html });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(result.uri, {
          mimeType: "application/pdf",
          dialogTitle: "Share Certificate",
        });
      } else {
        Alert.alert(
          "Certificate Ready",
          "The certificate PDF has been generated successfully."
        );
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        "Certificate could not be generated. Please try again."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={25} color="#071A3A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Certificate</Text>
          <View style={{ width: 25 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {!showPreview ? (
            // ===== FORM =====
            <View style={styles.formCard}>
              <Text style={styles.formTitle}>Enter Your Details</Text>
              <Text style={styles.formSubtitle}>
                Fill this in to generate your personal certificate
              </Text>

              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor="#94A3B8"
                value={volunteerName}
                onChangeText={setVolunteerName}
              />

              <Text style={styles.label}>Event Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Tree Plantation Drive"
                placeholderTextColor="#94A3B8"
                value={eventName}
                onChangeText={setEventName}
              />

              <Text style={styles.label}>Event Date</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 22 August 2026"
                placeholderTextColor="#94A3B8"
                value={eventDate}
                onChangeText={setEventDate}
              />

              <TouchableOpacity
                style={styles.previewButton}
                onPress={handleGeneratePreview}
                activeOpacity={0.8}
              >
                <Text style={styles.previewButtonText}>
                  Generate Certificate
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            // ===== CERTIFICATE PREVIEW =====
            <>
              <View style={styles.certificate}>
                <View style={styles.topDecoration} />

                <Text style={styles.organization}>ALKHIDMAT FOUNDATION</Text>
                <Text style={styles.title}>CERTIFICATE</Text>
                <Text style={styles.subtitle}>OF APPRECIATION</Text>

                <View style={styles.divider} />

                <Text style={styles.text}>This is to certify that</Text>
                <Text style={styles.name}>{volunteerName}</Text>
                <Text style={styles.text}>
                  has successfully participated as a volunteer in
                </Text>
                <Text style={styles.event}>{eventName}</Text>
                <Text style={styles.date}>Event Date: {eventDate}</Text>

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

              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setShowPreview(false)}
                activeOpacity={0.7}
              >
                <Ionicons name="pencil-outline" size={16} color="#2F6BFF" />
                <Text style={styles.editButtonText}>Edit Details</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.downloadButton}
                onPress={downloadCertificate}
                activeOpacity={0.8}
              >
                <Ionicons name="download-outline" size={20} color="#FFFFFF" />
                <Text style={styles.downloadText}>Download / Print</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  page: {
    flex: 1,
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerTitle: { fontSize: 17, fontWeight: "800", color: "#071A3A" },
  content: { paddingBottom: 30 },

  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5EAF3",
    padding: 20,
  },
  formTitle: { fontSize: 18, fontWeight: "800", color: "#071A3A" },
  formSubtitle: { fontSize: 12, color: "#64748B", marginTop: 4, marginBottom: 16 },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#0F172A",
  },
  previewButton: {
    backgroundColor: "#2F6BFF",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 22,
  },
  previewButtonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "700" },

  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    paddingVertical: 8,
  },
  editButtonText: {
    color: "#2F6BFF",
    fontSize: 13,
    fontWeight: "700",
    marginLeft: 6,
  },

  certificate: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#DCE4F5",
    borderRadius: 18,
    paddingHorizontal: 25,
    paddingVertical: 40,
    alignItems: "center",
    overflow: "hidden",
  },
  topDecoration: {
    position: "absolute",
    top: -45,
    left: -45,
    width: 100,
    height: 100,
    backgroundColor: "#2F6BFF",
    transform: [{ rotate: "45deg" }],
  },
  organization: {
    fontSize: 11,
    fontWeight: "800",
    color: "#2F6BFF",
    letterSpacing: 2,
    marginBottom: 25,
  },
  title: { fontSize: 27, fontWeight: "900", color: "#071A3A", letterSpacing: 2 },
  subtitle: {
    fontSize: 10,
    fontWeight: "700",
    color: "#8A96B5",
    letterSpacing: 2,
    marginTop: 5,
    marginBottom: 20,
  },
  divider: { width: 55, height: 2, backgroundColor: "#2F6BFF", marginBottom: 25 },
  text: { fontSize: 12, color: "#5A6B8C", textAlign: "center", lineHeight: 19 },
  name: {
    fontSize: 22,
    fontWeight: "800",
    color: "#2F6BFF",
    marginVertical: 12,
    textAlign: "center",
  },
  event: {
    fontSize: 16,
    fontWeight: "700",
    color: "#071A3A",
    marginTop: 10,
    marginBottom: 15,
    textAlign: "center",
  },
  date: { fontSize: 12, color: "#5A6B8C", marginBottom: 40 },
  signatureArea: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  signature: { width: "42%", alignItems: "center" },
  signatureLine: {
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#94A3B8",
    marginBottom: 7,
  },
  signatureText: { fontSize: 8, color: "#5A6B8C", textAlign: "center" },
  certificateId: { fontSize: 8, color: "#94A3B8", marginTop: 30 },

  downloadButton: {
    height: 52,
    borderRadius: 12,
    backgroundColor: "#2F6BFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },
  downloadText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 8,
  },
});