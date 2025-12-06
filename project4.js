import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function CreateCommunity({ onCreate, onBack }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const handleCreate = () => {
    if (name.trim() && desc.trim()) {
      onCreate({
        id: Date.now(),
        name,
        desc,
        members: "1",
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.backBtn}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Create Community</Text>

      <View style={styles.imagePicker}>
        <Text style={styles.addPhotoText}>+ Add Photo</Text>
      </View>

      <Text style={styles.label}>Community Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter community name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Enter description"
        value={desc}
        onChangeText={setDesc}
        multiline
      />

      <TouchableOpacity style={styles.createBtn} onPress={handleCreate}>
        <Text style={styles.createText}>Create Community</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8fbfa" },
  backBtn: { fontSize: 26, color: "#333" },
  title: { fontSize: 20, fontWeight: "bold", color: "#1d9c8e", marginBottom: 20 },
  imagePicker: {
    width: 110,
    height: 110,
    borderRadius: 60,
    backgroundColor: "#e3f8f8",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
  },
  addPhotoText: { color: "#1d9c8e" },
  label: { marginBottom: 6, fontWeight: "bold", color: "#555" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "white",
  },
  createBtn: {
    backgroundColor: "#2acfcf",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  createText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
