export function getUser() {
    try {
        let user = localStorage.getItem("user");
        if (user != null) {
            return JSON.parse(user);
        }
        return null;
    } catch (error) {
        return null;
    }
}