import { connectToDb } from "@/lib/dbConnect"
import { User } from "@/lib/models"
import Credentials from "next-auth/providers/credentials"
import Github from "next-auth/providers/github"
import bcrypt from "bcryptjs"



export const options = {
  providers: [
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    Credentials({
      async authorize(credentials) {
        try {
          await connectToDb()
          const user = await User.findOne({ email: credentials.email })
          if (!user) {
            throw new Error("User not found");
          }

          const checkPassword = await bcrypt.compare(credentials.password, user.password)
          if (!checkPassword) {
            throw new Error("Incorrect password");
          }
          return user

        } catch (error) {
          throw new Error(error.message || "Something went wrong. Can't login.");
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        return {
          ...token,
          isAdmin: user.isAdmin
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        return {
          ...session.user,
          userId: token.sub,
          isAdmin: token.isAdmin
        }
      }
      return session
    },
    async signIn({ user, account }) {
      if (account.provider === 'github') {
        try {
          await connectToDb();
          const userExists = await User.findOne({ email: user.email });
          if (!userExists) {
            console.log("inside if ")
            try {
              const newUser = new User({
                username: user.name,
                email: user.email,
                img: user.image
              })
              await newUser.save();
              console.log("user saved")
            }
            catch (error) {
              console.log(error.message)
            }
          }
          return true
        } catch (error) {
          console.log(error.message)
          return false
        }
      }
      return true
    }
  }
}