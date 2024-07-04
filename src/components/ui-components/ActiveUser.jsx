const ActiveUser = ({ user }) => {
    
  return (
    <button className="animate-slide-in-from-left flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
      <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
        {user.name[0].toUpperCase()}
      </div>
          <div className="ml-2 text-sm font-semibold">{ user.name}</div>
    </button>
  );
};
export default ActiveUser;
