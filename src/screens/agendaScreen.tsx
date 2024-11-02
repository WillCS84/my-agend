import React, { useState } from "react"
import { View, Button, FlatList, Text, StyleSheet } from "react-native"
import { StackNavigationProp } from "@react-navigation/stack"
import { RootStackParamList } from "../../App"
import { v4 as uuidv4 } from "uuid"
import { atom, useAtom } from "jotai"
import { appointmentAtom } from "./appointmentScreen"

export type AppointmentProps = {
  id: string
  day: string
  time: string
  clientName: string
}

type AgendaScreenNavigationProp = StackNavigationProp<RootStackParamList, "Agenda">

interface AgendaScreenProps {
  navigation: AgendaScreenNavigationProp
}

const idAtom = atom("")

const AgendaScreen = ({ navigation }: AgendaScreenProps) => {
  const [appointments, setAppointments] = useAtom(appointmentAtom)
  const [idAppointments, setIdAppointment] = useAtom(idAtom)

  const renderAppointment = ({ item }: { item: AppointmentProps }) => (
    <View style={styles.appointmentItem}>
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <label style={{ width: "40%" }}>Nome</label>
        <label style={{ width: "19%" }}>Dia</label>
        <label style={{ width: "19%" }}>Hora</label>
      </div>
      <div style={styles.list}>
        <Text style={styles.client}>{`${item.clientName}`}</Text>
        <Text style={styles.date}>{`${item.day}`}</Text>
        <Text style={styles.date}>{`${item.time}`}</Text>
      </div>
      <Button
        title="Remover"
        onPress={() => {
          setAppointments(appointments.filter((app) => app.id !== item.id))
        }}
        color="red"
      />
    </View>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agenda</Text>
      <FlatList data={appointments} renderItem={renderAppointment} keyExtractor={(item) => item.id} />
      <Button
        title="Novo Agendamento"
        onPress={() => {
          const newId = uuidv4()
          setIdAppointment(newId)
          navigation.navigate("Novo Agendamento", { appointmentId: newId })
        }}
      />
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
  appointmentItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
  },
  list: {
    display: "flex",
    justifyContent: "space-between",
    height: 28,
    gap: 4,
    width: "100%",
    backgroundColor: "#93df93",
    borderWidth: 1,
    borderRadius: 2,
    marginBottom: 4,
    alignItems: "center"
  },
  client: {
    borderRightColor: "#434346",
    borderRightWidth: 1,
    height: 28,
    color: "#0a0aea",
    fontSize: 20,
    width: "40%",
    alignItems: "center"
  },
  date: {
    borderRightWidth: 1,
    height: 28,
    color: "#0a0aea",
    fontSize: 14,
    width: "19%"
  }
})

export default AgendaScreen
