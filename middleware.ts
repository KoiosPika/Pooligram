import { authMiddleware } from "@clerk/nextjs";
 

export default authMiddleware({
    publicRoutes:[
      '/',
      '/poll/:id',
      '/api/webhook/clerk',
      '/api/uploadthing'
    ]
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};