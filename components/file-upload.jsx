import { useState } from "react";

import {
  VideoCameraIcon,

} from '@heroicons/react/24/outline';

export default function FileUpload(props) {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("file", image);
    const response = await fetch("/api/upload", {
      method: "POST",
      body
    });
  };

  return (
    <div>
      <p
        className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"

      >
        <input type="file" name="myImage" onChange={uploadToClient} />
      </p>
      <button
        type="submit"
        onClick={uploadToServer}
        className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
      >
        <VideoCameraIcon />

        <p

        >

          Send Video file to server
        </p>
      </button>
    </div>
  );
}
