import Image from "next/image"

export const metadata = {
  title: "About"
}

const AboutPage = () => {
  return (
    <>
      <div className="flex gap-5 px-4 flex-wrap h-fit max-sm:text-center" >

        <div className="my-5 flex-1 flex flex-col gap-5">
          <h1 className="font-bold text-xl text-blue-600">About Agency</h1>
          <p className="font-semibold text-5xl text-left max-md:text-4xl">
            We create digital ideas which are bigger, bolder, braver and better.
          </p>
          <p className="text-left text-base">
            We create digital ideas which are bigger, bolder, braver and better.We belive in good ideas flexibility and precission.We're worlds Our SpecialTeam best consulting and finance solution provider.Wide range of web and software development services
          </p>
          <div className="flex max-sm:flex-col gap-5 ">
            <div>
              <h1 className="text-blue-600 text-2xl font-bold">
                10 +
              </h1>
              <h2 className="text-sm">
                Years of experience
              </h2>
            </div>
            <div>
              <h1 className="text-blue-600 text-2xl font-bold">
                270 K+
              </h1>
              <h2 className="text-sm">
                People Reached
              </h2>
            </div>
            <div>
              <h1 className="text-blue-600 text-2xl font-bold">
                5 K+
              </h1>
              <h2 className="text-sm">
                Services and plugins
              </h2>
            </div>

          </div>
        </div>

        <div className="h-[500px] w-[500px] relative max-lg:hidden flex-1">
          <Image src="/about.png" fill alt="" />
        </div>


      </div>
    </>
  )
}

export default AboutPage