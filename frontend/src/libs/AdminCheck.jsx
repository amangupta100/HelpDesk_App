export const AdminCheck = (data) => {
    const admin = [{
        email:"coderamang02@gmail.com",
        password:"amang5300"
    }]
    const user = admin.find((user) => user.email === data.email && user.password === data.password);
    return user ? true : false
}