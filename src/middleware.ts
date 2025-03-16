import {auth} from "@/utils/auth";

export default auth((req) => {
	// All the pages inside app needs to be accessed with authentication
	if(!req.auth && req.nextUrl.pathname.split('/')[1] === 'app') {
		console.log('User is not authenticated');
		const newUrl = new URL("/auth/signin", req.nextUrl.origin);
		return Response.redirect(newUrl);
	}
});