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

// ============================================
// STEP: Apni Anthropic API key yahan daalein.
// Free key: https://console.anthropic.com
// Console mein "Add funds" se kam az kam $5
// credits add karna na bhoolein, warna
// "insufficient credits" error aayega.
// ============================================
const ANTHROPIC_API_KEY = "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";

const SYSTEM_PROMPT =
  "You are a friendly AI assistant inside the Alkhidmat Foundation " +
  "volunteer app. Answer questions about joining volunteer events, " +
  "finding volunteering opportunities, registration, and getting " +
  "volunteer certificates. Keep every answer short (2-4 sentences), " +
  "clear, and encouraging. If you genuinely don't know something " +
  "specific to Alkhidmat, say so honestly and suggest contacting " +
  "Alkhidmat support directly.";

interface Message {
  id: string;
  text: string;
  sender: "bot" | "suggestion" | "user";
}

const INITIAL_MESSAGES: Message[] = [
  { id: "greeting", text: "Hello! How can I help you today?", sender: "bot" },
  { id: "s1", text: "How can I join an event?", sender: "suggestion" },
  { id: "s2", text: "Where can I volunteer?", sender: "suggestion" },
  { id: "s3", text: "How to get certificate?", sender: "suggestion" },
];

export default function AssistantScreen() {
  const router = useRouter();
  const flatListRef = useRef<FlatList<Message>>(null);

  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getAIResponse = async (userMessage: string): Promise<string> => {
    if (
      !ANTHROPIC_API_KEY ||
      ANTHROPIC_API_KEY === "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"
    ) {
      return "Setup needed: please add your Anthropic API key at the top of assistant.tsx.";
    }

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 300,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: userMessage }],
        }),
      });

      const data = await response.json();

      if (data?.error) {
        console.log("Anthropic API error:", data.error);
        if (data.error.type === "authentication_error") {
          return "Your API key looks invalid. Please double-check it in assistant.tsx.";
        }
        if (data.error.type === "insufficient_quota" || data.error.type === "billing_error") {
          return "Your account has no credits. Please add credits at console.anthropic.com.";
        }
        return "Something went wrong on the AI side. Please try again in a moment.";
      }

      if (data?.content?.[0]?.text) {
        return data.content[0].text.trim();
      }

      return "Sorry, I couldn't understand that. Please try again.";
    } catch (error) {
      console.log("Network error:", error);
      return "I'm having trouble connecting right now. Please check your internet connection and try again.";
    }
  };

  const scrollToEnd = () => {
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const sendMessage = async (text?: string) => {
    const messageText = (text ?? inputText).trim();
    if (!messageText || isLoading) return;

    const userMessage: Message = {
      id: `${Date.now()}-user`,
      text: messageText,
      sender: "user",
    };

    setMessages((current) => [...current, userMessage]);
    setInputText("");
    setIsLoading(true);
    scrollToEnd();

    const reply = await getAIResponse(messageText);

    const botMessage: Message = {
      id: `${Date.now()}-bot`,
      text: reply,
      sender: "bot",
    };

    setMessages((current) => [...current, botMessage]);
    setIsLoading(false);
    scrollToEnd();
  };

  const renderMessage = ({ item }: { item: Message }) => {
    if (item.sender === "user") {
      return (
        <View style={styles.userRow}>
          <View style={styles.userBubble}>
            <Text style={styles.userText}>{item.text}</Text>
          </View>
        </View>
      );
    }

    if (item.sender === "suggestion") {
      return (
        <TouchableOpacity
          style={styles.suggestionBubble}
          onPress={() => sendMessage(item.text)}
          activeOpacity={0.7}
          disabled={isLoading}
        >
          <Text style={styles.suggestionText}>{item.text}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.botRow}>
        <View style={styles.botBubble}>
          <Text style={styles.botText}>{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Assistant</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={90}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            isLoading ? (
              <View style={styles.botRow}>
                <View style={[styles.botBubble, styles.typingBubble]}>
                  <ActivityIndicator size="small" color="#2F6BFF" />
                </View>
              </View>
            ) : null
          }
        />

        {/* Input */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Type your question..."
            placeholderTextColor="#94A3B8"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={() => sendMessage()}
            returnKeyType="send"
            editable={!isLoading}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => sendMessage()}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            <Ionicons
              name={inputText.trim() ? "arrow-up" : "mic"}
              size={18}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  messagesList: {
    padding: 16,
    paddingBottom: 8,
  },
  botRow: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
  botBubble: {
    maxWidth: "80%",
    backgroundColor: "#DCE7FF",
    borderRadius: 16,
    borderBottomRightRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  typingBubble: {
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  botText: {
    fontSize: 14,
    color: "#1E3A8A",
    fontWeight: "600",
    lineHeight: 20,
  },
  suggestionBubble: {
    alignSelf: "flex-start",
    maxWidth: "85%",
    backgroundColor: "#EAF0FF",
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 10,
  },
  suggestionText: {
    fontSize: 14,
    color: "#1E3A8A",
    fontWeight: "600",
  },
  userRow: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
  userBubble: {
    maxWidth: "80%",
    backgroundColor: "#2F6BFF",
    borderRadius: 16,
    borderBottomRightRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userText: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "500",
    lineHeight: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    backgroundColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    backgroundColor: "#F1F5F9",
    borderRadius: 22,
    paddingHorizontal: 18,
    paddingVertical: 12,
    fontSize: 14,
    color: "#0F172A",
    marginRight: 10,
  },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#2F6BFF",
    alignItems: "center",
    justifyContent: "center",
  },
});