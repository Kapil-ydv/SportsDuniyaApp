import { Tabs } from "expo-router";
import { Radio, BarChart3 } from "lucide-react-native";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1a1a2e',
          borderTopColor: '#333',
        },
        tabBarActiveTintColor: '#4ecdc4',
        tabBarInactiveTintColor: '#a0a0a0',
      }}
    >
      <Tabs.Screen
        name="live"
        options={{
          title: "Live Commentary",
          tabBarIcon: ({ color }) => <Radio color={color} />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: "Match Stats",
          tabBarIcon: ({ color }) => <BarChart3 color={color} />,
        }}
      />
    </Tabs>
  );
}