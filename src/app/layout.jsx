import "./globals.css"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import SessionWraper from "./components/SessionWraper"

export const metadata = {
  title: {
    default: " Lama Tutorial",
    template: "%s | Lama Blog Dev"
  }
}
export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <SessionWraper>
        <body className="text-white lg:mx-28 md:mx-16 my-6 flex flex-col justify-between h-screen">
          <Navbar />

          {children}
          <Footer />
        </body>

      </SessionWraper>
    </html>
  )
}