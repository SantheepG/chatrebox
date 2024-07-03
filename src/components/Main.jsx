import React from "react";
import Dashboard from "./Dashboard/Dashboard";
import Chat from "./Chat/Chat";
const Main = ({ user }) => {
  console.log(user)
    return (   
      <div className="flex h-screen antialiased text-gray-800">
          <div className="flex flex-row h-full w-full overflow-x-hidden">
            <Dashboard/>
          <Chat user={ user} />
          </div>
        </div>
      
    );

  }
export default Main;