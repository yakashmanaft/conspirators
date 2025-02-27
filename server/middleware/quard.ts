export default defineEventHandler(async (event) => {
    // get the url being called
    const url = getRequestURL(event)
    // get the pathname from the url
    const { pathname } = new URL(url)


    // create a list of endpoints that we want to protect
    const protectedRoutes = [
        // '/api/usersList/users',
        // '/api/profile/profile',
        '/api/warehouse/item',
        '/api/warehouse',
        '/api/banks',
        // 
        '/api/projects/projects',
        '/api/projectGuarded/projects',
        // 
        '/api/locations/locations',
        '/api/locations/organizations',
        '/api/landingGuarded/landing',
        '/api/leadGuarded/lead',
        //
        '/api/partnerGurded/partner',
        '/api/band/band',
        '/api/taskGuarded/task',
        '/api/loan/loan',
        '/api/funds/brokerage'
    ];

    // check if th pathname is in the list of protected routes
    for (let i = 0; i < protectedRoutes.length; i++) {
        const r = protectedRoutes[i]

        // if the pathname is in the list of protected routes
        if (pathname === r) {

            // ensure user is logged in before getting a response
            await requireUserSession(event)

        }
    }


})