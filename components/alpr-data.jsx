"use client";
import { useEffect, useState } from "react";

export default function AlprData() {
  const [state, setState] = useState([]);
  useEffect(() => {
    const evtSource = new EventSource("/api/alpr");
    evtSource.addEventListener("alprEvent", (event) => {
      const PlatesEvent = JSON.parse(event.data);
      setState(PlatesEvent);
    });
    return () => {
      evtSource.close();
    };
  }, []);

  return (
    <>
      <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="flex p-4">
        <p className="font-semibold">
          {state.data}
          </p>
        </div>
      </div>
    </>
  );
}




