import React from 'react';
import { Tabs } from 'expo-router';
import { GameProvider } from '@/context/GameContext';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <GameProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#1e1e2c',
            borderTopWidth: 0,
          },
          tabBarActiveTintColor: '#ffb300',
          tabBarInactiveTintColor: '#fff',
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
          },
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: 'Play',
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? 'play-circle' : 'play-circle-outline'}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="rules"
          options={{
            title: 'Rules',
            tabBarIcon: ({ focused, color, size }) => (
              <Ionicons
                name={focused ? 'list-circle' : 'list-circle-outline'}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </GameProvider>
  );
}