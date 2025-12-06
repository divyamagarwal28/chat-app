import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import io from "socket.io-client";

export default function ChatWindow({ community, user, onBack }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const socket = useRef(null);
  const flatListRef = useRef(null); 

  useEffect(() => {
    
    socket.current = io("https://chat-app-g7yp.onrender.com", {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 10,
    });

    socket.current.on("connect", () => {
      console.log("Connected to server:", socket.current.id);
      socket.current.emit("user-joined", user.name);
    });

    socket.current.on("receive", (data) => {
      setMessages((prev) => [
        ...prev,
        {
          ...data,
          type:
            data.name === "System"
              ? "system"
              : data.name === user.name
              ? "sent"
              : "received",
        },
      ]);
    });

    return () => socket.current.disconnect();
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    socket.current.emit("send", message);
    setMessage("");
  };

  const renderMessage = ({ item }) => {
    if (item.type === "system") {
      return (
        <View style={styles.systemMessage}>
          <Text style={styles.systemText}>{item.message}</Text>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.messageBubble,
          item.type === "sent" ? styles.sent : styles.received,
        ]}
      >
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.msgText}>{item.message}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{community.name}</Text>
        <View style={{ width: 30 }} />
      </View>

      
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderMessage}
        style={{ flex: 1 }}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
        onLayout={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />

  
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={message}
          placeholder="Type a message..."
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fbfa" },

  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    elevation: 4,
  },
  backBtn: { width: 30 },
  backText: { fontSize: 26, color: "#333", fontWeight: "bold" },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1d9c8e",
    flex: 1,
  },

  messageBubble: {
    maxWidth: "70%",
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  sent: {
    backgroundColor: "#d1ffe0",
    alignSelf: "flex-end",
    borderBottomRightRadius: 0,
  },
  received: {
    backgroundColor: "#e9e9e9",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 0,
  },
  msgText: { fontSize: 15 },
  nameText: { fontWeight: "bold", marginBottom: 2 },

  systemMessage: {
    alignSelf: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  systemText: { fontStyle: "italic", color: "#666" },

  inputRow: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  sendBtn: {
    backgroundColor: "#2acfcf",
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
    justifyContent: "center",
  },
  sendText: { color: "white", fontWeight: "bold" },
});
