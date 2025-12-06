import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from "react-native";

export default function MyCommunity({ user, joined, onBack, onOpenChat }) {
    const initial = user.name ? user.name[0].toUpperCase() : "?";

    return (
        <View style={styles.container}>

            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={onBack}>
                    <Text style={styles.backBtn}>←</Text>
                </TouchableOpacity>

                <View style={styles.logoContainer}>
                    <Text style={styles.logoIcon}>💬</Text>
                </View>

                <View style={styles.profileCircle}>
                    <Text style={styles.profileText}>{initial}</Text>
                </View>

            </View>

            
            <Text style={styles.mainTitle}>My Communities</Text>

            
            {joined.length === 0 ? (
                <View style={styles.emptyBox}>
                    <Text style={styles.emptyText}>You haven’t joined any communities yet.</Text>
                    <Text style={styles.emptySubText}>Go to Explore and join your first group!</Text>
                </View>
            ) : (
                <FlatList
                    data={joined}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => onOpenChat(item)}
                            style={styles.communityCard}
                        >
                            <View style={styles.avatar} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.communityName}>{item.name}</Text>
                                <Text style={styles.communityDesc}>{item.desc}</Text>
                                <Text style={styles.members}>{item.members} members</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />

            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8fbfa",
        padding: 20,
    },

   
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    backBtn: {
        fontSize: 24,
        color: "#333",
        fontWeight: "bold",
    },
    logoContainer: {
        backgroundColor: "#2acfcf",
        padding: 10,
        borderRadius: 12,
    },
    logoIcon: {
        fontSize: 22,
        color: "white",
    },
    profileCircle: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: "#1d9c8e",
        alignItems: "center",
        justifyContent: "center",
    },
    profileText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },

    
    mainTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#1d9c8e",
        marginBottom: 15,
    },

 
    emptyBox: {
        marginTop: 50,
        alignItems: "center",
    },
    emptyText: {
        fontSize: 16,
        color: "#555",
        fontWeight: "bold",
    },
    emptySubText: {
        fontSize: 14,
        color: "#777",
        marginTop: 5,
    },

   
    communityCard: {
        flexDirection: "row",
        backgroundColor: "white",
        padding: 15,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 3,
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: "#2acfcf",
        marginRight: 15,
    },
    communityName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    communityDesc: {
        fontSize: 13,
        color: "#666",
        marginVertical: 3,
    },
    members: {
        fontSize: 12,
        color: "#888",
    },
});
