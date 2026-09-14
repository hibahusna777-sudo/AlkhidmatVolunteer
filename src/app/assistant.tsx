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
  text: "#071A3A",
  body: "#1E293B",
  muted: "#687795",
  border: "#E2E8F5",
  divider: "#EEF2F8",
  green: "#65D89B",
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
    text: "Assalam o Alaikum! 👋 How can I help you with your volunteer journey today?",
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

const SYSTEM_PROMPT =
  "You are a friendly AI assistant inside the Alkhidmat Foundation " +
  "volunteer app. Answer questions about joining volunteer events, " +
  "finding volunteering opportunities, registration, and getting " +
  "volunteer certificates. Keep every answer short, clear, and " +
  "encouraging. If you genuinely don't know something specific to " +
  "Alkhidmat, say so honestly and suggest contacting Alkhidmat support.";

/*
 * IMPORTANT SECURITY:
 *
 * Do NOT put your Anthropic API key inside this React Native app.
 * A client-side key can be extracted from the published application.
 *
 * For now this screen works safely without exposing a secret.
 * When you connect your backend, replace getAIResponse() with a
 * request to your own backend endpoint.
 */

const getAIResponse = async (userMessage: string): Promise<string> => {
  try {
    /*
     * BACKEND CONNECTION GOES HERE.
     *
     * Example:
     *
     * const response = await fetch("YOUR_BACKEND_URL/assistant", {
     *   method: "POST",
     *   headers: {
     *     "Content-Type": "application/json",
     *   },
     *   body: JSON.stringify({
     *     message: userMessage,
     *   }),
     * });
     *
     * const data = await response.json();
     * return data.reply;
     */

    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes("join") ||
      lowerMessage.includes("event") ||
      lowerMessage.includes("register")
    ) {
      return (
        "You can join a volunteer event by opening My Events, " +
        "selecting an available event, and tapping Register Now. " +
        "After registration, you'll receive the event details."
      );
    }

    if (
      lowerMessage.includes("certificate") ||
      lowerMessage.includes("certificates")
    ) {
      return (
        "After completing an eligible volunteer activity, your " +
        "certificate can appear in the Certificates section. " +
        "Open Certificates from the app menu to check your available certificates."
      );
    }

    if (
      lowerMessage.includes("where") ||
      lowerMessage.includes("volunteer") ||
      lowerMessage.includes("opportunity")
    ) {
      return (
        "You can explore available volunteer opportunities through " +
        "My Events and the programs section. Look for programs that " +
        "match your interests and register for an available opportunity."
      );
    }

    if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi") ||
      lowerMessage.includes("salam") ||
      lowerMessage.includes("assalam")
    ) {
      return (
        "Wa Alaikum Assalam! 👋 I'm here to help you with events, " +
        "volunteer opportunities, registrations, and certificates."
      );
    }

    return (
      "I'd be happy to help with volunteer events, registrations, " +
      "opportunities, or certificates. Please tell me what you'd like to know."
    );
  } catch (error) {
    console.log("Assistant error:", error);

    return (
      "I'm having trouble responding right now. Please try again " +
      "in a moment."
    );
  }
};

export default function AssistantScreen() {
  const router = useRouter();
  const flatListRef = useRef<FlatList<Message>>(null);

  const [messages, setMessages] =
    useState<Message[]>(INITIAL_MESSAGES);

  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scrollToEnd = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({
        animated: true,
      });
    }, 100);
  };

  const sendMessage = async (text?: string) => {
    const messageText = (text ?? inputText).trim();

    if (!messageText || isLoading) {
      return;
    }

    const userMessage: Message = {
      id: `${Date.now()}-user`,
      text: messageText,
      sender: "user",
    };

    setMessages((current) => [
      ...current.filter((item) => item.sender !== "suggestion"),
      userMessage,
    ]);

    setInputText("");
    setIsLoading(true);

    scrollToEnd();

    const reply = await getAIResponse(messageText);

    const botMessage: Message = {
      id: `${Date.now()}-bot`,
      text: reply,
      sender: "bot",
    };

    setMessages((current) => [
      ...current,
      botMessage,
    ]);

    setIsLoading(false);

    scrollToEnd();
  };

  const renderMessage = ({
    item,
  }: {
    item: Message;
  }) => {
    /* User message */

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

    /* Suggestion */

    if (item.sender === "suggestion") {
      return (
        <TouchableOpacity
          style={styles.suggestionCard}
          onPress={() => sendMessage(item.text)}
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

          <Text style={styles.suggestionText}>
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

    /* Bot message */

    return (
      <View style={styles.botRow}>
        <View style={styles.botAvatar}>
          <Ionicons
            name="sparkles"
            size={16}
            color={COLORS.white}
          />
        </View>

        <View style={styles.botMessageContainer}>
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
      {/* =================================
          HEADER
      ================================= */}

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

            <View style={styles.onlineDot} />
          </View>

          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>
              AI Assistant
            </Text>

            <View style={styles.onlineRow}>
              <View style={styles.onlineSmallDot} />

              <Text style={styles.headerSubtitle}>
                Online • Ready to help
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.headerAction}
          activeOpacity={0.75}
        >
          <Ionicons
            name="information-circle-outline"
            size={20}
            color={COLORS.blue}
          />
        </TouchableOpacity>
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
          contentContainerStyle={styles.messagesList}
          ListHeaderComponent={
            <View style={styles.heroCard}>
              <View style={styles.heroCircleOne} />
              <View style={styles.heroCircleTwo} />

              <View style={styles.heroTopRow}>
                <View style={styles.heroIcon}>
                  <Ionicons
                    name="sparkles"
                    size={26}
                    color={COLORS.white}
                  />
                </View>

                <View style={styles.heroBadge}>
                  <View style={styles.heroOnlineDot} />
                  <Text style={styles.heroBadgeText}>
                    AI ACTIVE
                  </Text>
                </View>
              </View>

              <Text style={styles.heroTitle}>
                Your volunteer companion
              </Text>

              <Text style={styles.heroDescription}>
                Ask me about events, registrations, volunteer
                opportunities, or certificates.
              </Text>
            </View>
          }
          ListFooterComponent={
            isLoading ? (
              <View style={styles.botRow}>
                <View style={styles.botAvatar}>
                  <Ionicons
                    name="sparkles"
                    size={16}
                    color={COLORS.white}
                  />
                </View>

                <View style={styles.botMessageContainer}>
                  <Text style={styles.botName}>
                    Alkhidmat AI
                  </Text>

                  <View
                    style={[
                      styles.botBubble,
                      styles.typingBubble,
                    ]}
                  >
                    <View style={styles.typingContent}>
                      <ActivityIndicator
                        size="small"
                        color={COLORS.blue}
                      />

                      <Text style={styles.typingText}>
                        Thinking...
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ) : null
          }
        />

        {/* =================================
            INPUT
        ================================= */}

        <View style={styles.inputArea}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Ask about volunteering..."
              placeholderTextColor="#94A3B8"
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={() => sendMessage()}
              returnKeyType="send"
              editable={!isLoading}
              multiline
              maxLength={500}
            />

            <TouchableOpacity
              style={[
                styles.sendButton,
                (!inputText.trim() || isLoading) &&
                  styles.sendButtonDisabled,
              ]}
              onPress={() => sendMessage()}
              activeOpacity={0.8}
              disabled={
                !inputText.trim() || isLoading
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
            AI responses may not always be perfect
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* =================================
   STYLES
================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  /* Header */

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

  headerAction: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: COLORS.blueLight,
    alignItems: "center",
    justifyContent: "center",
  },

  /* Keyboard */

  keyboardContainer: {
    flex: 1,
  },

  /* Messages */

  messagesList: {
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 10,
  },

  /* Hero */

  heroCard: {
    minHeight: 190,
    backgroundColor: COLORS.navy,
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
    overflow: "hidden",
    position: "relative",
  },

  heroCircleOne: {
    position: "absolute",
    width: 175,
    height: 175,
    borderRadius: 88,
    backgroundColor: COLORS.blue,
    opacity: 0.18,
    right: -65,
    top: -70,
  },

  heroCircleTwo: {
    position: "absolute",
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#E8C56A",
    opacity: 0.1,
    left: -40,
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

  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
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
    marginTop: 21,
  },

  heroDescription: {
    fontSize: 11.5,
    lineHeight: 18,
    color: "#B9C7E5",
    marginTop: 7,
    maxWidth: 345,
  },

  /* Bot */

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

  /* User */

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

  /* Suggestions */

  suggestionCard: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    width: "86%",
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

  /* Typing */

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

  /* Input */

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
  }})

