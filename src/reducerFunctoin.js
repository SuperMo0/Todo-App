import { getFullDate } from "./utils"

export function reducerFunction(state, action) {
    switch (action.type) {
        case "add task":
            return {
                ...state,
                taskList: [...state.taskList, action.task]
            }

        case "edit task":
            return {
                ...state,
                taskList: state.taskList.map((task) =>
                    task.id === action.task.id ? action.task : task
                )
            }

        case "new user":
            return {
                name: action.name,
                avatar: action.avatar,
                // FIX: Use the list passed from App.jsx, don't hardcode []
                taskList: action.taskList || []
            }

        case "delete task":
            return {
                ...state,
                taskList: state.taskList.filter((task) => task.id !== action.task.id)
            }

        case "create new task":
            return {
                ...state,
                taskList: [
                    ...state.taskList,
                    {
                        id: crypto.randomUUID(),
                        title: "New Task",
                        description: "",
                        dueDate: "",
                        dateCreated: getFullDate(),
                        tag: "General",
                        priority: "yellow-card",
                        status: "in progress"
                    }
                ]
            }

        default:
            return state
    }
}