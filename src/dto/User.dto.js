export default class UserDTO {
    constructor(user) {
        this.name = `${user.first_name} ${user.last_name}`;
        this.email = user.email;
        this.role = user.role;
    }
    static getUserTokenFrom = (user) => {
        return {
            name: `${user.first_name} ${user.last_name}`,
            role: user.role,
            email: user.email,
        };
    };
}