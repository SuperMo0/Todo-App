



export function reducerFunction(Data, action) {

    if (action.type == "create new task") {
        return { ...Data, taskList: [...Data.taskList, { id: crypto.randomUUID, title: "", description: "", dueDate: "", dateCreated: "Today", tag: "", priority: "", status: "in progress" }] }
    }

    if (action.type == "edit task") {
        {
            return { ...Data };
        }
    }

    if (action.type == "new user") {

        return { name: action.name, avatar: action.avatar, taskList: [] };

    }







}