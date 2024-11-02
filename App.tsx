import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import AgendaScreen from "./src/screens/agendaScreen"
import AppointmentScreen from "./src/screens/settingsScreens"
import SettingsScreen from "./src/screens/appointmentScreen"

type SettingsType = {
  notificationsEnabled: boolean
  reminderTime: number
}

export type RootStackParamList = {
  Agenda: undefined
  "Novo Agendamento": { appointmentId?: string }
  "Configurações de Horário": { settings: SettingsType }
}

const Stack = createStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Agenda">
        <Stack.Screen name="Agenda" component={AgendaScreen} />
        <Stack.Screen name="Novo Agendamento" component={SettingsScreen} />
        <Stack.Screen name="Configurações de Horário" component={AppointmentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

