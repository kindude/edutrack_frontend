import { DayInfo } from "./DayInfo"

export interface UserMarks{
    id: string
    first_name: string
    last_name: string
    days: DayInfo[]
}
