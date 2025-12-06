import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function Project({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoIcon}>💬</Text>
        </View>
        <Text style={styles.title}>MyChat</Text>
        <Text style={styles.subtitle}>Connect with your communities</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Welcome back</Text>
        <Text style={styles.cardSubtitle}>Sign in to access your groups</Text>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.signInButton}
          onPress={() => {
            if (!name || !email || !password) {
              alert("Please fill all fields");
              return;
            }

            // Pass user data back to App.js
            onLogin({ name, email });
          }}
        >
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "#f8fbfa", 
    alignItems: "center", justifyContent: "center", 
    padding: 20 
  },
  header: {
    alignItems: "center", 
    marginBottom: 30 
  },
  logoContainer: { 
    backgroundColor: "#2acfcf", 
    borderRadius: 15, 
    padding: 15, 
    marginBottom: 10 
  },
  logoIcon: { 
    fontSize: 24, 
    color: "white" 
  },
  title: {
    fontSize: 24, 
    fontWeight: "bold", 
    color: "#1d9c8e" 
  },
  subtitle: { 
    fontSize: 14, 
    color: "#6b7b7a" 
  },
  card: {
    backgroundColor: "white", 
    width: "100%", 
    borderRadius: 15, 
    padding: 20, elevation: 4 
  },
  cardTitle: { 
    fontSize: 20, 
    fontWeight: "bold" 
  },
  cardSubtitle: {
    fontSize: 14, 
    color: "#777", 
    marginBottom: 20 
  },
  label: {
    fontWeight: "bold", 
    marginTop: 10 
  },
  input: { 
    borderWidth: 1, 
    borderColor: "#ddd", 
    borderRadius: 10, 
    padding: 10, 
    marginTop: 5, 
    marginBottom: 15 
  },
  signInButton: { 
    backgroundColor: "#2acfcf", 
    padding: 12, 
    borderRadius: 10, 
    alignItems: "center" 
  },
  signInText: { 
    color: "white", 
    fontWeight: "bold" 
  },
});


// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
// } from "react-native";

// export default function Project() {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");

//   return (
//     <View style={styles.container}>
      
//       <View style={styles.header}>
//         <View style={styles.logoContainer}>
//           <Text style={styles.logoIcon}>💬</Text>
//         </View>
//         <Text style={styles.title}>MyChat!</Text>
//         <Text style={styles.subtitle}>Connect with your communities</Text>
//       </View>

//       {/* Login Card */}
//       <View style={styles.card}>
//         <Text style={styles.cardTitle}>Welcome to MyChat!</Text>
//         <Text style={styles.cardSubtitle}>Sign in to access your groups</Text>
        
//         <Text style={styles.label}>Name</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter your name"
//           value={name}
//           onChangeText={setName}
//         />

//         <Text style={styles.label}>Email</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="you@example.com"
//           value={email}
//           onChangeText={setEmail}
//           keyboardType="email-address"
//         />

//         <Text style={styles.label}>Password</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="••••••••"
//           secureTextEntry={true}
//           value={password}
//           onChangeText={setPassword}
//         />

//         <TouchableOpacity style={styles.signInButton}>
//           <Text style={styles.signInText}>Sign In</Text>
//         </TouchableOpacity>

    
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8fbfa",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//   },
//   header: {
//     alignItems: "center",
//     marginBottom: 30,
//   },
//   logoContainer: {
//     backgroundColor: "#2acfcf",
//     borderRadius: 15,
//     padding: 15,
//     marginBottom: 10,
//   },
//   logoIcon: {
//     fontSize: 24,
//     color: "white",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#1d9c8e",
//   },
//   subtitle: {
//     fontSize: 14,
//     color: "#6b7b7a",
//   },
//   card: {
//     backgroundColor: "white",
//     width: "100%",
//     borderRadius: 15,
//     padding: 20,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   cardTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 4,
//   },
//   cardSubtitle: {
//     fontSize: 14,
//     color: "#777",
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 14,
//     fontWeight: "bold",
//     marginBottom: 6,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 10,
//     padding: 10,
//     marginBottom: 15,
//     fontSize: 14,
//   },
//   signInButton: {
//     backgroundColor: "#2acfcf",
//     paddingVertical: 12,
//     borderRadius: 10,
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   signInText: {
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   signUpText: {
//     textAlign: "center",
//     color: "#555",
//   },
//   signUpLink: {
//     color: "#2acfcf",
//     fontWeight: "bold",
//   },
// });
