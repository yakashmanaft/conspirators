
export default defineEventHandler(async (event) => {


    const body = await readBody(event)

    const user = {
        id: body.id,
        login: body.login,
        // Пароль не показываем...
        // password: body.password,
        // surname: body.surname,
        // name: body.name,
        // middleName: body.middleName,
        // role: body.role,
        // accessModules: body.accessModules,
        // favorites: body.favorites
    }
    // const user = {
    //     event.context.body,
    //     // password: event.context.body.password
    // }

    await setUserSession(event, {
        user,
        loggedInAt: new Date(),
    })

    return user
})