import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, Button, TextInput } from "react-native"
import { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { atom, useAtom } from "jotai"
import DateTimePicker from "@react-native-community/datetimepicker"
import { AppointmentProps } from "./agendaScreen"

type RootStackParamList = {
  "Novo Agendamento": { appointmentId?: string }
}

type AppointmentScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Novo Agendamento">
  route: RouteProp<RootStackParamList, "Novo Agendamento">
}

const clientNameAtom = atom("")
const dataAtom = atom<string>("")
const timeAtom = atom<string>("")
export const appointmentAtom = atom<AppointmentProps[]>([])

const AppointmentScreen: React.FC<AppointmentScreenProps> = ({ route, navigation }) => {
  const { appointmentId } = route.params

  const [clientName, setClientName] = useAtom(clientNameAtom)
  const [date, setDate] = useAtom(dataAtom)
  const [time, setTime] = useAtom(timeAtom)
  const [appointment, setAppointment] = useAtom(appointmentAtom)

  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)

  const handleSaveAppointment = () => {
    if (!appointmentId) return
    const newAppointment = [...appointment, { id: appointmentId, clientName: clientName, day: date, time: time }]
    setAppointment(newAppointment)
    navigation.goBack()
  }

  const onChangeDate = (event: any, selectedDate: string) => {
    const currentDate = selectedDate || date
    setShowDatePicker(false)
    setDate(currentDate)
    setDate(currentDate.toLocaleString())
  }

  const onChangeTime = (event: any, selectedTime: string) => {
    const currentTime = selectedTime || time
    setShowTimePicker(false)
    setTime(currentTime)
  }

  useEffect(() => {
    return () => {
      setClientName("")
      setDate("")
      setTime("")
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Agendamento</Text>
      <TextInput style={styles.input} placeholder="Nome do Cliente" value={clientName} onChangeText={setClientName} />
      {/* <Button title="Selecionar Data" onPress={() => setShowDatePicker(true)} /> */}
      <Text>{String(date) || "Nenhuma data selecionada"}</Text>
      <TextInput style={styles.input} placeholder="Data (DD/MM/AAAA)" value={date} onChangeText={setDate} />
      <TextInput style={styles.input} placeholder="Hora (HH:MM)" value={time} onChangeText={setTime} />

      {/* {showDatePicker && (
        <DateTimePicker value={new Date(date)} mode="date" display="default" onChange={onChangeDate} />
      )}
      <Button title="Selecionar Hora" onPress={() => setShowTimePicker(true)} />
      <Text>{time.toLocaleString()}</Text>
      {showTimePicker && (
        <DateTimePicker value={new Date(time)} mode="time" display="default" onChange={onChangeTime} />
      )} */}

      <Button title="Salvar Agendamento" onPress={handleSaveAppointment} />
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10
  }
})

export default AppointmentScreen
