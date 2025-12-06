import React, { useState } from 'react';
import { SafeAreaView, Text, useColorScheme } from 'react-native';

import Practice from './practice1.js';
import SignIn from './project1.js';
import Explore from "./project2.js";
import MyCommunity from "./project3.js";
import CreateCommunity from "./project4.js";
import ChatWindow from "./project5.js";

const showPractice = false;

export default function App() {
  const colorScheme = useColorScheme();

  const [currentScreen, setCurrentScreen] = useState("signin");
  const [user, setUser] = useState({ name: "", email: "" });
  const [joined, setJoined] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  const openChat = (community) => {
    setSelectedCommunity(community);
    setCurrentScreen("chat");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colorScheme === "dark" ? "#000" : "#fff" }}>
      {showPractice && <Practice />}

      {!showPractice && currentScreen === "signin" && (
        <SignIn
          onLogin={(userData) => {
            setUser(userData);
            setCurrentScreen("explore");
          }}
        />
      )}

      {currentScreen === "explore" && (
        <Explore
          user={user}
          joined={joined}
          setJoined={setJoined}
          goToMyCommunity={() => setCurrentScreen("myCommunity")}
          goToCreate={() => setCurrentScreen("create")}
          onBack={() => setCurrentScreen("signin")}
        />
      )}

      {currentScreen === "myCommunity" && (
        <MyCommunity
          user={user}
          joined={joined}
          onBack={() => setCurrentScreen("explore")}
          onOpenChat={openChat}
        />
      )}

      {currentScreen === "create" && (
        <CreateCommunity
          onCreate={(newCommunity) => {
            setJoined([...joined, newCommunity]);
            setCurrentScreen("myCommunity");
          }}
          onBack={() => setCurrentScreen("explore")}
        />
      )}

      {currentScreen === "chat" && (
        <ChatWindow
          community={selectedCommunity}
          user={user}
          onBack={() => setCurrentScreen("myCommunity")}
        />
      )}
    </SafeAreaView>
  );
}
