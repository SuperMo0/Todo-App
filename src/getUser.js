


export function getUser() {
    let user = localStorage.getItem("user");
    if (user != null) return JSON.parse(user);
    return user;
}