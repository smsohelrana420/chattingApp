import { FaPlus } from "react-icons/fa";
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { auth } from "../firebase.config";

const FriendRequestlist = () => {
  const [requestList,setRequestList]=useState([])
  const db=getDatabase()
  useEffect(() => {
    const requestRef = ref(db, "friendrequestlist/");
    onValue(requestRef, (snapshot) => {
      const array=[]
     snapshot.forEach((item)=>{
      if (
        
        auth.currentUser.uid == item.val().reciverid
      )
        {
          array.push(item.val());
        }
     })
     setRequestList(array)
    });
  }, []);

  console.log(requestList)

  return (
    <>
      {/* component */}
      {/* This is an example component */}
      <div className="">
        <div className="p-4 max-w-md bg-white rounded-lg border border-gray-500/7 shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Friend Request List
            </h3>
            <a
              href="#"
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              View all
            </a>
          </div>
          <div className="flow-root">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700 h-[300px] overflow-y-scroll px-5"
            >
              {requestList.map((item) => (
                <li className="py-3 sm:py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
                        alt="Neil image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xl font-medium text-gray-900 truncate dark:text-white">
                        {item.sendername}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {item.reciveremail}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      <button className="bg-blue-500 text-white text-xl p-1 cursor-pointer">
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendRequestlist;
