


export function getUser() {

    let user = localStorage.getItem("user");
    if (user != null) {
        let data = JSON.parse(user);

        data.taskList.forEach(e => {
            e.id = crypto.randomUUID();
        })
        return data;
    };
    return user;
}