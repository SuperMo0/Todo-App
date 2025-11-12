
import { getFullDate } from "./utils";


export function reducerFunction(Data, action) {

    if (action.type == "create new task") {
        return { ...Data, taskList: [...Data.taskList, { id: crypto.randomUUID(), title: "", description: "", dueDate: "", dateCreated: getFullDate(), tag: "", priority: "yellow-card", status: "in progress" }] }
    }

    if (action.type == "edit task") {
        {
            return { ...Data };
        }
    }

    if (action.type == "new user") {

        return { name: action.name, avatar: action.avatar, taskList: [] };

    }

    if (action.type == "delete task") {
        return { ...Data, taskList: [...Data.taskList.filter((v) => v.id != action.task.id)] }
    }







}