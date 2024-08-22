import Image from "next/image"
import { FaArrowRight } from "react-icons/fa";
import { GrContact } from "react-icons/gr";

const Hero = () => {
  return (
    <>
      <div className="flex gap-2 mt-5 px-4">


        <div className="h-[500px] flex-1">
          <p className="md:text-8xl text-6xl font-bold my-5 ">
            Creative Thoughts Agency.
          </p>
          <p className="font-medium text-xl my-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, autem ea? Cumque non aut ducimus ipsam magni.
          </p>
          <div className="flex gap-5">
            <button className="bg-blue-600 text-xs rounded-lg px-6 py-3 hover:-translate-y-1 flex gap-1 items-center group hover:shadow-lg hover:shadow-indigo-800 ">
              Learn More<FaArrowRight className="group-hover:translate-x-1 transition" />
            </button>
            <button className="bg-white text-black text-xs px-6 py-3  rounded-lg hover:-translate-y-1 group flex gap-1 items-center group hover:shadow-lg Creative hover:shadow-slate-400">
              Contact<GrContact className="group-hover:-translate-y-1 transition" />
            </button>
          </div>
          <div className="h-10 w-full m-5">
            <Image
              src="/brands.png"
              height={40}
              width={500}
              alt="Brands"
            />
          </div>

        </div>
        <div className="relative max-lg:hidden flex-1">
          <Image src="/hero.gif" alt="hero" fill className="object-contain" />
        </div>


      </div>


    </>
  )
}

export default Hero