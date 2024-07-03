
import { useEffect, useState, useRef } from "react";
import { io } from 'socket.io-client';
const socket = io('ws://localhost:5000');

const Chat = ({user}) => {
    const [id, setID] = useState(null);
    const [name, setName] = useState(user)
    const [msgs, setMsgs] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const chatboxRef = useRef(null);
    useEffect(()=>{
        socket.on('id', (data) => {
            // console.log('your id ' + data['id'] + '\nyour name ' + data['name'].slice(0,10));
          setID(data['id']);
          setName(data['name']);
          });
    }, [])
  
  useEffect(() => {
    socket.emit('change_name', user);
  },[user])
  
  useEffect(() => {
    socket.on('message', (data) => {
      // Check if the message is already in msgs
      if (data.id !== id && !msgs.find(msg => msg.id === data.id && msg.msg === data.msg)) {
        setMsgs(prevMsgs => [
          ...prevMsgs,
          { id: data.id, name: data.name, msg: data.msg }
        ]);
      }
    });

    return () => {
      socket.off('message');
    };
  }, [msgs, id, socket]);

  const sendToServer = () => {
    const newMsg = { id: id, name: name, msg: inputValue };
    setMsgs(prevMsgs => [
      ...prevMsgs,
      newMsg
    ]);
    socket.emit('message', newMsg);
    setInputValue("");
  };

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTo({
        top: chatboxRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [msgs]);

    return(
        <div className="flex flex-col flex-auto h-full p-6">
              <div
                className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4"
              >
                <div id="chatbox" className="flex flex-col h-full overflow-x-auto mb-4 smooth-scroll" ref={chatboxRef}>
                  <div className="flex flex-col h-full">
                    <div className="grid grid-cols-12 gap-y-2">
                      <div className="col-start-1 col-end-8 p-3 rounded-lg">
                        <div className="flex flex-row items-center">
                          <div
                            className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                          >
                            <div className="relative w-10 h-10">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                A
                                </div>
                                <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                            </div>
                          </div>
                         
                          <div
                            className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                          >
                            <div>Hey How are you today?</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-start-1 col-end-8 p-3 rounded-lg">
                        <div className="flex flex-row items-center">
                          <div
                            className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                          >
                            <div className="relative w-10 h-10">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                A
                                </div>
                                <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                            </div>
                          </div>                          
                         
                          <div
                            className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                          >
                            <div className="flex">
                              <span className="font-semibold">Name</span> <span className="px-2">•</span>
                              <span className=" text-gray-500 text-xs my-0.5">13:54</span>
                            </div>
                            <div>
                              Lorem ipsum dolor sit amet, consectetur adipisicing
                              elit. Vel ipsa commodi illum saepe numquam maxime
                              asperiores voluptate sit, minima perspiciatis.
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-start-6 col-end-13 p-3 rounded-lg">
                        <div className="flex items-center justify-start flex-row-reverse">
                          <div
                            className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                          >
                            A
                          </div>
                          <div
                            className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                          >
                            <div>I'm ok what about you?</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-start-6 col-end-13 p-3 rounded-lg">
                        <div className="flex items-center justify-start flex-row-reverse">
                          <div
                            className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                          >
                            A
                          </div>
                          <div
                            className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                          >
                            <div>
                              Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-start-1 col-end-8 p-3 rounded-lg">
                        <div className="flex flex-row items-center">
                          <div
                            className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                          >
                            A
                          </div>
                          <div
                            className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                          >
                            <div>Lorem ipsum dolor sit amet !</div>
                          </div>
                        </div>
                      </div>
                      <div className="col-start-6 col-end-13 p-3 rounded-lg">
                        <div className="flex items-center justify-start flex-row-reverse">
                          <div
                            className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                          >
                            A
                          </div>
                          <div
                            className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl"
                          >
                            <div>
                              Lorem ipsum dolor sit, amet consectetur adipisicing. ?
                            </div>
                            <div
                              className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500"
                            >
                              Seen
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-start-1 col-end-8 p-3 rounded-lg">
                        <div className="flex flex-row items-center">
                          <div
                            className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                          >
                            A
                          </div>
                          <div
                            className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                          >
                            <div>
                              Lorem ipsum dolor sit amet consectetur adipisicing elit.
                              Perspiciatis, in.
                            </div>
                          </div>
                        </div>
                      </div>
                      {
                        msgs.length > 0 && msgs.map((data, index)=> {
                          if(data.id===id){
                            return (
                              <div key={index} className="col-start-6 col-end-13 p-3 rounded-lg">
                                <div className="flex items-center justify-start flex-row-reverse">
                                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                    <div className="relative w-10 h-10">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                A
                                </div>
                                <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                            </div>
                                  </div>
                                  <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                    <div className="flex">
                                      <span className="font-semibold">{data.name.slice(0, 10)}</span>
                                      <span className="px-2">•</span>
                                      <span className=" text-gray-500 text-xs my-0.5">13:54</span>
                                    </div>
                                    <div>
                                      {data.msg}
                                    </div>
                                    {/* <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
                                      Seen
                                    </div> */}
                                  </div>
                                </div>
                              </div>
                            )
                            
                          }
                          else {
                           return ( <div key={data.id} className="col-start-1 col-end-8 p-3 rounded-lg">
                            <div className="flex flex-row items-center">
                              <div
                                className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                              >
                                <div className="relative w-10 h-10">
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                A
                                </div>
                                <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                            </div>
                              </div>
                              <div
                                className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                              >
                                 <div className="flex">
                                  <span className="font-semibold">{data.name.slice(0,10)}</span> <span className="px-2">•</span>
                                  <span className=" text-gray-500 text-xs my-0.5">13:54</span>
                                </div>
                                <div>
                                 {data.msg}
                                </div>
                              </div>
                            </div>
                          </div>)
                          }
                        })
                      }
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
                    <button
                      className="flex items-center justify-center text-gray-400 hover:text-gray-600"
                    >
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
                      <button
                        className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                      >
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
}
export default Chat;