import { Toaster, toast } from "react-hot-toast";
import { useEffect, useState, useRef } from "react";
import ChatSelf from "../ui-components/ChatSelf";
import ChatUser from "../ui-components/ChatUser";
import { io } from "socket.io-client";
// const socket = io("ws://localhost:5000");
const socket = io('https://santheepg.pythonanywhere.com/');

const Chat = ({ user, setUsers }) => {
  const [id, setID] = useState(null);
  const [name, setName] = useState(user);
  const [msgs, setMsgs] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const chatboxRef = useRef(null);

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    socket.on("id", (data) => {
      setID(data["id"]);
      setName(data["name"]);
      console.log(id)
    });

  }, [msgs, id, socket]);

  useEffect(() => {
    const handleJoinedUser = (name) => {
      if (name !== user) {
        toast.success(`${name} joined`, {
          position: "top-right",
          icon: "⬅️",
        });
      }
    };
    socket.on("joined_user", handleJoinedUser);
    return () => {
      socket.off("joined_user", handleJoinedUser);
    };
  }, []);

  useEffect(() => {
    const handleLeftUser = (name) => {
      if (name !== user) {
        toast.success(`${name} left`, {
          position: "top-right",
          icon: "↪️",
        });
      }
    };
    socket.on("left_user", handleLeftUser);
    return () => {
      socket.off("left_user", handleLeftUser);
    };
  }, []);

  useEffect(() => {
    const handleActiveUsers = (data) => {
      setUsers(data);
    };
    socket.on("active_users", handleActiveUsers);
    return () => {
      socket.off("active_users", handleActiveUsers);
    };
  }, []);

  useEffect(() => {
    socket.emit("change_name", user);
  }, [user]);

  useEffect(() => {
    socket.on("message", (data) => {
      // Check if the message is already in msgs
      console.log("recieved " + data.id);
      if (
        data.id !== id &&
        !msgs.find((msg) => msg.id === data.id && msg.msg === data.msg)
      ) {
        setMsgs((prevMsgs) => [
          ...prevMsgs,
          {
            id: data.id,
            name: data.name,
            msg: data.msg,
            time: getCurrentTime(),
          },
        ]);
      }
    });

    return () => {
      socket.off("message");
    };
  }, [msgs, id, socket]);

  const sendToServer = () => {
    const newMsg = { id: id, name: name, msg: inputValue };
    // console.log("sending " + newMsg);
    setMsgs((prevMsgs) => [
      ...prevMsgs,
      { id: id, name: name, msg: inputValue, time: getCurrentTime() },
    ]);
    socket.emit("message", newMsg);
    setInputValue("");
  };

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTo({
        top: chatboxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [msgs]);

  return (
    <div className="animate-view-content flex flex-col flex-auto h-full p-6">
      <Toaster className="notifier" />
      <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
        <div
          id="chatbox"
          className="flex flex-col h-full overflow-x-auto mb-4 smooth-scroll"
          ref={chatboxRef}
        >
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-12 gap-y-2">
              {msgs.length > 0 &&
                msgs.map((data, index) => {
                  if (data.id === id) {
                    return <ChatSelf key={index} data={data} />;
                  } else {
                    return <ChatUser key={index} data={data} />;
                  }
                })}
            </div>
          </div>
        </div>
        <form
          className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
          onSubmit={(e) => {
            sendToServer();
            e.preventDefault();
          }}
        >
          <div>
            <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex-grow ml-4">
            <div className="relative w-full">
              <input
                type="text"
                className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
              />
              <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="ml-4">
            <button
              className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
              type="submit"
            >
              <span>Send</span>
              <span className="ml-2">
                <svg
                  className="w-4 h-4 transform rotate-45 -mt-px"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  ></path>
                </svg>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Chat;
