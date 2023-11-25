"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function AlprImages() {
  const [state, setState] = useState([]);
  useEffect(() => {
    const evtSource = new EventSource("/api/images");
    evtSource.addEventListener("alprImageEvent", (event) => {
      const myEvent = JSON.parse(event.data);
      setState(myEvent);
    });
    return () => {
      evtSource.close();
    };
  }, []);

  return (
    <>
      <main className="flex flex-col items-center justify-between" >
        <h2 className="font-semibold">
          {state.data}
        </h2>
        <div className="thumbnail">
          <div className="frame">
            <a href={state.data} target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={state.data}
                alt="The " 
                width={500}
                height={500}
                />
            </a>
          </div>
        </div>
        <style>
          {`
            .thumbnail {
                cursor: pointer;
            }

            .frame {
                overflow: hidden;
            }

            .thumbnail img {
                width: 55%;
                height: 55%;
            }
        `}
        </style>

      </main>

    </>
  );
}
