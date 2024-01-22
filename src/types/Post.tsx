import Module from "./Module"
import User from "./User"

export interface Post{
    id: string
    title: string
    text: string
    date: Date
    author: User
    module: Module
}

