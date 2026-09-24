import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
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
  body: "#1E293B",
  muted: "#687795",
  border: "#E2E8F5",
  divider: "#EEF2F8",
  green: "#65D89B",
  gold: "#E8C56A",
};

type MessageSender = "bot" | "suggestion" | "user";

interface Message {
  id: string;
  text: string;
  sender: MessageSender;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "greeting",
    text:
      "Assalam o Alaikum! 👋 How can I help you with your volunteer journey today?",
    sender: "bot",
  },

  {
    id: "s1",
    text: "How can I join an event?",
    sender: "suggestion",
  },

  {
    id: "s2",
    text: "Where can I volunteer?",
    sender: "suggestion",
  },

  {
    id: "s3",
    text: "How to get certificate?",
    sender: "suggestion",
  },
];

const getAIResponse = async (
  userMessage: string
): Promise<string> => {
  const lowerMessage = userMessage.toLowerCase();

  await new Promise((resolve) =>
    setTimeout(resolve, 500)
  );

  // EVENTS / REGISTRATION
  if (
    lowerMessage.includes("join") ||
    lowerMessage.includes("event") ||
    lowerMessage.includes("register") ||
    lowerMessage.includes("registration")
  ) {
    return (
      "You can join a volunteer event by opening My Events, " +
      "selecting an available event, and tapping Register Now. " +
      "After registration, you'll receive the event details."
    );
  }

  // CERTIFICATES
  if (
    lowerMessage.includes("certificate") ||
    lowerMessage.includes("certificates") ||
    lowerMessage.includes("certification")
  ) {
    return (
      "After completing an eligible volunteer activity, your " +
      "certificate can appear in the Certificates section. " +
      "Open Certificates from the app menu to check your available certificates."
    );
  }

  // OPPORTUNITIES
  if (
    lowerMessage.includes("where") ||
    lowerMessage.includes("volunteer") ||
    lowerMessage.includes("opportunity") ||
    lowerMessage.includes("opportunities") ||
    lowerMessage.includes("program")
  ) {
    return (
      "You can explore available volunteer opportunities through " +
      "My Events and the programs section. Look for programs that " +
      "match your interests and register for an available opportunity."
    );
  }

  // GREETING
  if (
    lowerMessage.includes("hello") ||
    lowerMessage.includes("hi") ||
    lowerMessage.includes("salam") ||
    lowerMessage.includes("assalam") ||
    lowerMessage.includes("aoa")
  ) {
    return (
      "Wa Alaikum Assalam! 👋 I'm here to help you with events, " +
      "volunteer opportunities, registrations, and certificates."
    );
  }

  // HELP
  if (
    lowerMessage.includes("help") ||
    lowerMessage.includes("what can you do")
  ) {
    return (
      "I can help you with volunteer events, registrations, " +
      "opportunities, certificates, and general questions " +
      "about your volunteer journey."
    );
  }

  // THANK YOU
  if (
    lowerMessage.includes("thank") ||
    lowerMessage.includes("thanks")
  ) {
    return (
      "You're very welcome! 😊 I'm always here to help with your volunteer journey."
    );
  }

  // GENERAL ANSWER
  return (
    "I'd be happy to help with your volunteer journey. " +
    "You can ask me about events, registrations, volunteer " +
    "opportunities, certificates, or how to use the app."
  );
};

export default function AssistantScreen() {
  const router = useRouter();

  const flatListRef =
    useRef<FlatList<Message>>(null);

  const [messages, setMessages] =
    useState<Message[]>(INITIAL_MESSAGES);

  const [inputText, setInputText] =
    useState("");

  const [isLoading, setIsLoading] =
    useState(false);

  const scrollToEnd = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({
        animated: true,
      });
    }, 150);
  };

  const sendMessage = async (
    text?: string
  ) => {
    const messageText =
      (text ?? inputText).trim();

    if (!messageText || isLoading) {
      return;
    }

    // USER MESSAGE
    const userMessage: Message = {
      id: `${Date.now()}-user`,
      text: messageText,
      sender: "user",
    };

    // Remove old suggestion cards while processing
    setMessages((current) => [
      ...current.filter(
        (item) => item.sender !== "suggestion"
      ),
      userMessage,
    ]);

    setInputText("");
    setIsLoading(true);

    scrollToEnd();

    // GET ANSWER
    const reply =
      await getAIResponse(messageText);

    const botMessage: Message = {
      id: `${Date.now()}-bot`,
      text: reply,
      sender: "bot",
    };

    // ADD ANSWER + NEW QUESTIONS
    setMessages((current) => [
      ...current,
      botMessage,

      {
        id: `${Date.now()}-next1`,
        text: "How can I register for an event?",
        sender: "suggestion",
      },

      {
        id: `${Date.now()}-next2`,
        text: "Where can I find volunteer opportunities?",
        sender: "suggestion",
      },

      {
        id: `${Date.now()}-next3`,
        text: "How do I get my certificate?",
        sender: "suggestion",
      },
    ]);

    setIsLoading(false);

    scrollToEnd();
  };

  const renderMessage = ({
    item,
  }: {
    item: Message;
  }) => {
    // =========================
    // USER MESSAGE
    // =========================

    if (item.sender === "user") {
      return (
        <View style={styles.userRow}>
          <View style={styles.userBubble}>
            <Text style={styles.userText}>
              {item.text}
            </Text>
          </View>
        </View>
      );
    }

    // =========================
    // SUGGESTION
    // =========================

    if (item.sender === "suggestion") {
      return (
        <TouchableOpacity
          style={styles.suggestionCard}
          onPress={() =>
            sendMessage(item.text)
          }
          activeOpacity={0.8}
          disabled={isLoading}
        >
          <View style={styles.suggestionIcon}>
            <Ionicons
              name="sparkles"
              size={15}
              color={COLORS.blue}
            />
          </View>

          <Text
            style={styles.suggestionText}
            numberOfLines={2}
          >
            {item.text}
          </Text>

          <Ionicons
            name="arrow-forward"
            size={15}
            color="#9AA8C2"
          />
        </TouchableOpacity>
      );
    }

    // =========================
    // BOT MESSAGE
    // =========================

    return (
      <View style={styles.botRow}>
        <View style={styles.botAvatar}>
          <Ionicons
            name="sparkles"
            size={16}
            color={COLORS.white}
          />
        </View>

        <View
          style={styles.botMessageContainer}
        >
          <Text style={styles.botName}>
            Alkhidmat AI
          </Text>

          <View style={styles.botBubble}>
            <Text style={styles.botText}>
              {item.text}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* =====================================
          TOP HEADER
      ====================================== */}

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

          <View style={styles.headerAvatar}>
            <Ionicons
              name="sparkles"
              size={17}
              color={COLORS.white}
            />

            <View
              style={styles.onlineDot}
            />
          </View>

          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>
              AI Assistant
            </Text>

            <View style={styles.onlineRow}>
              <View
                style={styles.onlineSmallDot}
              />

              <Text
                style={styles.headerSubtitle}
              >
                Online • Ready to help
              </Text>
            </View>
          </View>

        </View>

      </View>

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
        keyboardVerticalOffset={80}
      >

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.messagesList
          }

          /* =====================================
             HERO BANNER
          ====================================== */

          ListHeaderComponent={
            <View style={styles.heroCard}>

              <View
                style={styles.heroCircleOne}
              />

              <View
                style={styles.heroCircleTwo}
              />

              {/* TOP ROW */}

              <View
                style={styles.heroTopRow}
              >

                {/* AI ICON */}

                <View style={styles.heroIcon}>
                  <Ionicons
                    name="sparkles"
                    size={26}
                    color={COLORS.white}
                  />
                </View>

                {/* VOLUNTEER DROPDOWN
                    INSIDE BANNER */}

                <TouchableOpacity
                  style={styles.profileChip}
                  activeOpacity={0.85}
                  onPress={() =>
                    router.push("/home")
                  }
                >

                  <View
                    style={styles.profileAvatar}
                  >
                    <Ionicons
                      name="person"
                      size={15}
                      color={COLORS.blue}
                    />
                  </View>

                  <View
                    style={styles.profileText}
                  >
                    <Text
                      style={styles.profileName}
                    >
                      Volunteer
                    </Text>

                    <Text
                      style={styles.profileRole}
                    >
                      Alkhidmat Volunteer
                    </Text>
                  </View>

                  <Ionicons
                    name="chevron-down"
                    size={14}
                    color={COLORS.white}
                  />

                </TouchableOpacity>

              </View>

              {/* AI ACTIVE BADGE */}

              <View
                style={styles.heroBadge}
              >

                <View
                  style={styles.heroOnlineDot}
                />

                <Text
                  style={styles.heroBadgeText}
                >
                  AI ACTIVE
                </Text>

              </View>

              <Text style={styles.heroTitle}>
                Your volunteer companion
              </Text>

              <Text
                style={styles.heroDescription}
              >
                Ask me about events, registrations,
                volunteer opportunities, or certificates.
              </Text>

            </View>
          }

          /* =====================================
             THINKING INDICATOR
          ====================================== */

          ListFooterComponent={
            isLoading ? (
              <View style={styles.botRow}>

                <View
                  style={styles.botAvatar}
                >
                  <Ionicons
                    name="sparkles"
                    size={16}
                    color={COLORS.white}
                  />
                </View>

                <View
                  style={
                    styles.botMessageContainer
                  }
                >

                  <Text style={styles.botName}>
                    Alkhidmat AI
                  </Text>

                  <View
                    style={[
                      styles.botBubble,
                      styles.typingBubble,
                    ]}
                  >

                    <View
                      style={
                        styles.typingContent
                      }
                    >

                      <ActivityIndicator
                        size="small"
                        color={COLORS.blue}
                      />

                      <Text
                        style={styles.typingText}
                      >
                        Thinking...
                      </Text>

                    </View>

                  </View>

                </View>

              </View>
            ) : null
          }
        />

        {/* =====================================
            QUESTION INPUT
        ====================================== */}

        <View style={styles.inputArea}>

          <View
            style={styles.inputContainer}
          >

            <TextInput
              style={styles.input}
              placeholder="Ask another question..."
              placeholderTextColor="#94A3B8"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={() =>
                sendMessage()
              }
              returnKeyType="send"
              editable={!isLoading}
              multiline
              maxLength={500}
            />

            <TouchableOpacity
              style={[
                styles.sendButton,
                (!inputText.trim() ||
                  isLoading) &&
                  styles.sendButtonDisabled,
              ]}
              onPress={() =>
                sendMessage()
              }
              activeOpacity={0.8}
              disabled={
                !inputText.trim() ||
                isLoading
              }
            >
              <Ionicons
                name="arrow-up"
                size={19}
                color={COLORS.white}
              />
            </TouchableOpacity>

          </View>

          <Text style={styles.inputHint}>
            Ask another question anytime
          </Text>

        </View>

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}

/* ============================================
   STYLES
============================================ */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  /* HEADER */

  header: {
    height: 68,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 17,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#F7F9FD",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  headerCenter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 11,
  },

  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  onlineDot: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: COLORS.green,
    borderWidth: 2,
    borderColor: COLORS.white,
  },

  headerText: {
    marginLeft: 10,
  },

  headerTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.navy,
  },

  onlineRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },

  onlineSmallDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.green,
    marginRight: 5,
  },

  headerSubtitle: {
    fontSize: 9.5,
    color: COLORS.muted,
  },

  /* =====================================
     MAIN AREA
  ====================================== */

  keyboardContainer: {
    flex: 1,
  },

  messagesList: {
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 10,
  },

  /* =====================================
     HERO BANNER
  ====================================== */

  heroCard: {
    minHeight: 245,
    backgroundColor: COLORS.navy,
    borderRadius: 25,
    padding: 19,
    marginBottom: 20,
    overflow: "hidden",
    position: "relative",
  },

  heroCircleOne: {
    position: "absolute",
    width: 190,
    height: 190,
    borderRadius: 95,
    backgroundColor: COLORS.blue,
    opacity: 0.18,
    right: -70,
    top: -75,
  },

  heroCircleTwo: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.gold,
    opacity: 0.1,
    left: -45,
    bottom: -55,
  },

  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  heroIcon: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
  },

  /* =====================================
     VOLUNTEER CHIP INSIDE BANNER
  ====================================== */

  profileChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.13)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    borderRadius: 15,
    paddingHorizontal: 7,
    paddingVertical: 6,
    maxWidth: 155,
  },

  profileAvatar: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },

  profileText: {
    flex: 1,
    justifyContent: "center",
    marginRight: 5,
  },

  profileName: {
    fontSize: 9.5,
    fontWeight: "800",
    color: COLORS.white,
  },

  profileRole: {
    fontSize: 7,
    fontWeight: "600",
    color: "#C9D6F1",
    marginTop: 1,
  },

  /* =====================================
     AI ACTIVE
  ====================================== */

  heroBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
    marginTop: 16,
  },

  heroOnlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: COLORS.green,
    marginRight: 6,
  },

  heroBadgeText: {
    fontSize: 9,
    fontWeight: "900",
    color: COLORS.white,
  },

  heroTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.white,
    marginTop: 18,
  },

  heroDescription: {
    fontSize: 11.5,
    lineHeight: 18,
    color: "#B9C7E5",
    marginTop: 7,
    maxWidth: 345,
  },

  /* =====================================
     BOT
  ====================================== */

  botRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 13,
  },

  botAvatar: {
    width: 29,
    height: 29,
    borderRadius: 11,
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    marginBottom: 2,
  },

  botMessageContainer: {
    flex: 1,
    maxWidth: "84%",
  },

  botName: {
    fontSize: 9.5,
    fontWeight: "800",
    color: COLORS.muted,
    marginBottom: 4,
    marginLeft: 3,
  },

  botBubble: {
    backgroundColor: COLORS.white,
    borderRadius: 17,
    borderBottomLeftRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.navy,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },

  botText: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.body,
  },

  /* =====================================
     USER
  ====================================== */

  userRow: {
    alignItems: "flex-end",
    marginBottom: 13,
  },

  userBubble: {
    maxWidth: "82%",
    backgroundColor: COLORS.blue,
    borderRadius: 17,
    borderBottomRightRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },

  userText: {
    fontSize: 13,
    lineHeight: 19,
    color: COLORS.white,
  },

  /* =====================================
     SUGGESTIONS
  ====================================== */

  suggestionCard: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    width: "90%",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: "#D7E2FA",
    borderRadius: 15,
    paddingHorizontal: 11,
    paddingVertical: 10,
    marginLeft: 37,
    marginBottom: 9,
  },

  suggestionIcon: {
    width: 31,
    height: 31,
    borderRadius: 10,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  suggestionText: {
    flex: 1,
    fontSize: 11.5,
    fontWeight: "700",
    color: COLORS.navy,
  },

  /* =====================================
     TYPING
  ====================================== */

  typingBubble: {
    paddingVertical: 10,
  },

  typingContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  typingText: {
    fontSize: 10.5,
    color: COLORS.muted,
    marginLeft: 8,
  },

  /* =====================================
     INPUT
  ====================================== */

  inputArea: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 9,
  },

  inputContainer: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F6FB",
    borderRadius: 17,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingLeft: 15,
    paddingRight: 5,
  },

  input: {
    flex: 1,
    minHeight: 42,
    maxHeight: 90,
    fontSize: 12.5,
    color: COLORS.body,
    paddingTop: 10,
    paddingBottom: 10,
  },

  sendButton: {
    width: 39,
    height: 39,
    borderRadius: 13,
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
  },

  sendButtonDisabled: {
    opacity: 0.4,
  },

  inputHint: {
    fontSize: 8.5,
    color: "#A5B0C5",
    textAlign: "center",
    marginTop: 6,
  },
});