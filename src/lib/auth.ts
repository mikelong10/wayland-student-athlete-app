import { NextAuthOptions } from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(db as any),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
    }),
    //   EmailProvider({
    //     from: process.env.SMTP_FROM,
    //     sendVerificationRequest: async ({ identifier, url, provider }) => {
    //       const user = await db.user.findUnique({
    //         where: {
    //           email: identifier,
    //         },
    //         select: {
    //           emailVerified: true,
    //         },
    //       })

    //       const templateId = user?.emailVerified
    //         ? process.env.POSTMARK_SIGN_IN_TEMPLATE
    //         : process.env.POSTMARK_ACTIVATION_TEMPLATE
    //       if (!templateId) {
    //         throw new Error("Missing template id")
    //       }

    //       const result = await postmarkClient.sendEmailWithTemplate({
    //         TemplateId: parseInt(templateId),
    //         To: identifier,
    //         From: provider.from as string,
    //         TemplateModel: {
    //           action_url: url,
    //           product_name: siteConfig.name,
    //         },
    //         Headers: [
    //           {
    //             // Set this to prevent Gmail from threading emails.
    //             // See https://stackoverflow.com/questions/23434110/force-emails-not-to-be-grouped-into-conversations/25435722.
    //             Name: "X-Entity-Ref-ID",
    //             Value: new Date().getTime() + "",
    //           },
    //         ],
    //       })

    //       if (result.ErrorCode) {
    //         throw new Error(result.Message)
    //       }
    //     },
    //   }),
  ],
  // callbacks: {
  //   async session({ token, session }) {
  //     if (token) {
  //       session.user.id = token.id
  //       session.user.name = token.name
  //       session.user.email = token.email
  //       session.user.image = token.picture
  //     }

  //     return session
  //   },
  //   async jwt({ token, user }) {
  //     const dbUser = await db.user.findFirst({
  //       where: {
  //         email: token.email,
  //       },
  //     })

  //     if (!dbUser) {
  //       if (user) {
  //         token.id = user?.id
  //       }
  //       return token
  //     }

  //     return {
  //       id: dbUser.id,
  //       name: dbUser.name,
  //       email: dbUser.email,
  //       picture: dbUser.image,
  //     }
  //   },
  // },
};
