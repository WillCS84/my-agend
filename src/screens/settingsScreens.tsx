import React from "react"
import { View, Text, Switch, StyleSheet, Button } from "react-native"
import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"

type RootStackParamList = {
  "Configurações de Horário": { settings: SettingsType }
}

type SettingsType = {
  notificationsEnabled: boolean
  reminderTime: number
}

type SettingsScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Configurações de Horário">
  route: RouteProp<RootStackParamList, "Configurações de Horário">
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ route, navigation }) => {
  const { settings } = route.params

  const toggleNotifications = () => {
    console.log("Notificações Ativadas:", !settings.notificationsEnabled)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <View style={styles.setting}>
        <Text>Notificações Ativadas:</Text>
        <Switch value={settings.notificationsEnabled} onValueChange={toggleNotifications} />
      </View>
      <View style={styles.setting}>
        <Text>Tempo de Lembrete: {settings.reminderTime} minutos</Text>
      </View>
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15
  }
})

export default SettingsScreen
