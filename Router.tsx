import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Settings, Game } from "./screens";
import { NavigationContainer } from "@react-navigation/native";
import { MinimaxContextProvider } from "./MinimaxContextProvider";

type RootStackParamsList = {
  Settings: undefined;
  Game: {
    isPlayerFirst: boolean;
    gridSize: 3 | 4 | 5;
  };
};

const Stack = createStackNavigator<RootStackParamsList>();

function TicTacToeRouter() {
  return (
    <NavigationContainer>
      <MinimaxContextProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Game" component={Game} />
        </Stack.Navigator>
      </MinimaxContextProvider>
    </NavigationContainer>
  );
}

export { TicTacToeRouter, RootStackParamsList };
