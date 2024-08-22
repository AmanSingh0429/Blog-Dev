"use client"

import { useState } from "react";

const page = () => {
  const [style, setStyle] = useState("h-40 w-40 text-black font-extrabold text-3xl bg-slate-200 rounded-lg border")
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let selected = [];

  const clrArr = () => {
    selected.forEach((num) => {
      selected.pop(num);
      setStyle("h-40 w-40 text-black font-extrabold text-3xl bg-green-200 rounded-lg border");
    }
    )
  };
  const handleClick = (num) => {
    if (selected.length == 9) {
      console.log("selected full", selected)
      clrArr();
    }
    else {
      if (selected.includes(num)) {
        return alert("already selected");
      }
      selected.push(num)
    }
  }

  return (
    <>

      <div className=" w-[50%] h-screen grid grid-cols-3 transition">

        < div className={style}
          onClick={() => {
            handleClick(1)
          }
          }
        >
          1
        </div>
        < div className={style}
          onClick={() => {
            handleClick(2)
          }
          }
        >
          2
        </div>
        < div className={style}
          onClick={() => {
            handleClick(3)
          }
          }
        >
          3
        </div>
        < div className={style}
          onClick={() => {
            handleClick(4)
          }
          }
        >
          4
        </div>
        < div className={style}
          onClick={() => {
            handleClick(5)
          }
          }
        >
          5
        </div>
        < div className={style}
          onClick={() => {
            handleClick(6)
          }
          }
        >
          6
        </div>
        < div className={style}
          onClick={() => {
            handleClick(7)
          }
          }
        >
          7
        </div>
        < div className={style}
          onClick={() => {
            handleClick(8)
          }
          }
        >
          8
        </div>
        < div className={style}
          onClick={() => {
            handleClick(9)
          }
          }
        >
          9
        </div>




      </div >
    </>
  )
}

export default page