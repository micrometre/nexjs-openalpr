"use client";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion'
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
        <motion.div className="thumbnail">
          <motion.div className="frame">
            <a href={state.data} target="_blank"
              rel="noopener noreferrer"
            >
              <motion.img
                src={state.data}
                alt="The " />
            </a>
          </motion.div>
        </motion.div>
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
