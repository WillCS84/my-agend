import { RouteProp } from "@react-navigation/native"
import { StackScreenProps } from "@react-navigation/stack"

export type Appointment = {
  id: string
  clientName: string
  date: string
  time: string
}

export type ScheduleSettings = {
  days: {
    monday: boolean
    tuesday: boolean
    wednesday: boolean
    thursday: boolean
    friday: boolean
    saturday: boolean
    sunday: boolean
  }
  hours: {
    start: string
    end: string
  }
}

export type AppointmentScreenRouteProp = RouteProp<RootStackParamList, "Appointment">
export type AppointmentScreenNavigationProp = StackScreenProps<RootStackParamList, "Appointment">["navigation"]

export type AppointmentScreenProps = {
  route: AppointmentScreenRouteProp
  navigation: AppointmentScreenNavigationProp
}

type RootStackParamList = {
  Agenda: undefined
  "Novo Agendamento": { appointment?: Appointment }
  Appointment: { appointmentId: string; appointment?: Appointment }
}

export type AgendaScreenProps = StackScreenProps<RootStackParamList, "Agenda">

export type DaysOfWeek = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"

export type Schedule = {
  days: {
    [key in DaysOfWeek]: boolean
  }
  hours: { start: string; end: string }
}
