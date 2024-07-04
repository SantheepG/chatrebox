import React from "react";

const ChatSelf = ({data}) => {

  return (
    <div className="animate-view-content col-start-6 col-end-13 p-3 rounded-lg">
      <div className="flex items-center justify-start flex-row-reverse">
      <div className="relative w-10 h-10">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-200 flex-shrink-0">
              {data.name[0].toUpperCase()}
            </div>
            <span className="bottom-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
          </div>
        <div className="relative mr-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
          <div>
            {data.msg}
          </div>
          <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
            {data.time}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatSelf;
