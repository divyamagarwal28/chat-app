import React from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";

export default function Explore({ user, joined, setJoined,onBack,goToMyCommunity,goToCreate }) {
  const communities = [
    { id: 1, name: "Admission FAQ", members: "30k", desc: "Share what you're working on." },
    { id: 2, name: "General Discussion", members: "21k", desc: "Share ideas and feedback." },
    { id: 3, name: "Entrepreneur's Club", members: "16k", desc: "Discuss startups & projects." },
    { id: 4, name: "Tech Talk", members: "25k", desc: "All about the latest in tech." },
    { id: 5, name: "Book Lovers", members: "12k", desc: "Discuss your favorite books." },
    { id: 6, name: "Fitness Enthusiasts", members: "18k", desc: "Share workout tips & routines." },
    { id: 7, name: "Travel Buddies", members: "14k", desc: "Plan trips and share experiences." },
    { id: 8, name: "Foodies Unite", members: "20k", desc: "Share recipes and restaurant reviews." },
    
  ];

  const initial = user.name ? user.name[0].toUpperCase() : "?";

   const joinCommunity = (c) => {
    if (!joined.find((x) => x.id === c.id)) {
      setJoined([...joined, c]);
    }
  };


    return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backBtn}>←</Text>
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Text style={styles.logoIcon}>💬</Text>
        </View>

        <TouchableOpacity style={styles.profileCircle} onPress={goToMyCommunity}>
          <Text style={styles.profileText}>{initial}</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity style={styles.tabActive}>
          <Text style={styles.tabActiveText}>Explore</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabInactive} onPress={goToMyCommunity}>
          <Text style={styles.tabInactiveText}>My Communities</Text>
        </TouchableOpacity>
      </View>

      <TextInput style={styles.search} placeholder="Search communities..." />

      {/* Community List */}
      <FlatList
        data={communities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.communityCard}>
            <View style={styles.avatar} />

            <View style={{ flex: 1 }}>
              <Text style={styles.communityName}>{item.name}</Text>
              <Text style={styles.communityDesc}>{item.desc}</Text>
              <Text style={styles.members}>{item.members} members</Text>
            </View>

            <TouchableOpacity
              style={styles.joinBtn}
              onPress={() => joinCommunity(item)}
            >
              <Text style={styles.joinText}>
                {joined.find((x) => x.id === item.id) ? "Joined" : "Join"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={goToCreate}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fbfa", padding: 15 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  backBtn: {
    fontSize: 28,
    color: "#333",
    padding: 5,
    fontWeight: "bold",
  },

  logoContainer: {
    backgroundColor: "#2acfcf",
    padding: 10,
    borderRadius: 10,
  },

  logoIcon: { fontSize: 22, color: "#fff" },

  profileCircle: {
    backgroundColor: "#1d9c8e",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  profileText: { color: "white", fontWeight: "bold", fontSize: 18 },

  tabs: {
    flexDirection: "row",
    marginBottom: 15,
  },

  tabActive: {
    flex: 1,
    backgroundColor: "#ffd54f",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  tabInactive: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 10,
  },

  tabActiveText: { fontWeight: "bold" },
  tabInactiveText: { color: "#666" },

  search: {
    backgroundColor: "#eef5f4",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },

  communityCard: {
    backgroundColor: "#fff",
    flexDirection: "row",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },

  avatar: {
    width: 45,
    height: 45,
    backgroundColor: "#ccc",
    borderRadius: 30,
    marginRight: 12,
  },

  communityName: { fontSize: 16, fontWeight: "bold" },
  communityDesc: { color: "#666", marginTop: 3 },
  members: { marginTop: 3, fontSize: 12, color: "#333" },

  joinBtn: {
    backgroundColor: "#ffd54f",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: "center",
  },

  joinText: { fontWeight: "bold" },

  fab: {
    position: "absolute",
    bottom: 25,
    right: 25,
    backgroundColor: "#ffd54f",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },

  fabText: { fontSize: 30, color: "#333" },
});
