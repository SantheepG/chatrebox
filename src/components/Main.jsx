import React, { useState } from "react";
import Dashboard from "./Dashboard/Dashboard";
import Chat from "./Chat/Chat";

const Main = ({ user }) => {
  const [users, setUsers] = useState({})
  
  return (   
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <Dashboard user={user} users={users} />
        <Chat user={ user} setUsers={(e)=>setUsers(e)} />
      </div>
    </div>
    );
  }

export default Main;