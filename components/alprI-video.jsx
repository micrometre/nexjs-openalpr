export default function AlprVideo() {
  return (
    <>
      <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="flex p-4">
          <h2 className="font-semibold">
            <a
              href="http://localhost:3000/api/video"
              className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
              target="_blank"
              rel="noopener noreferrer"
            >
              <video width="320" height="240" controls>
                <source src='upload/alprVideo.mp4' type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </a>
          </h2>
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

    </>
  );
}

