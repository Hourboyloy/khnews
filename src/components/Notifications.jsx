import React, { useState } from "react";
import { FaCommentAlt } from "react-icons/fa";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";

const Notification = () => {
  // Sample notification data
  const [notifications, setNotifications] = useState([
    {
      id: 0,
      type: "dislike",
      user: "John Doe",
      message: " បានលើកឡើងអំពីអ្នក និងអ្នកតាមដានផ្សេងទៀត​នៅក្នុង មតិ.",
      time: "Just now",
    },
    {
      id: 1,
      type: "comment",
      user: "John Doe",
      message: " បានលើកឡើងអំពីអ្នក និងអ្នកតាមដានផ្សេងទៀត​នៅក្នុង មតិ.",
      time: "Just now",
    },
    {
      id: 2,
      type: "like",
      user: "Jane Smith",
      message: "liked your post.",
      time: "2 minutes ago",
    },
    {
      id: 3,
      type: "comment",
      user: "Michael Lee",
      message: " បានលើកឡើងអំពីអ្នក និងអ្នកតាមដានផ្សេងទៀត​នៅក្នុង មតិ.",
      time: "5 minutes ago",
    },
    {
      id: 4,
      type: "like",
      user: "Sarah Connor",
      message: "liked your photo.",
      time: "10 minutes ago",
    },
    {
      id: 5,
      type: "comment",
      user: "Emily Clark",
      message: " បានលើកឡើងអំពីអ្នក និងអ្នកតាមដានផ្សេងទៀត​នៅក្នុង មតិ.",
      time: "15 minutes ago",
    },
    {
      id: 6,
      type: "comment",
      user: "Emily Clark",
      message: " បានលើកឡើងអំពីអ្នក និងអ្នកតាមដានផ្សេងទៀត​នៅក្នុង មតិ.",
      time: "15 minutes ago",
    },
    {
      id: 7,
      type: "comment",
      user: "Emily Clark",
      message: " បានលើកឡើងអំពីអ្នក និងអ្នកតាមដានផ្សេងទៀត​នៅក្នុង មតិ.",
      time: "15 minutes ago",
    },
  ]);

  // Get icon based on type
  const getIcon = (type) => {
    switch (type) {
      case "comment":
        return (
          <div className="p-3 bg-green-500 text-white rounded-full">
            <FaCommentAlt />
          </div>
        );
      case "like":
        return (
          <div className="p-3 bg-blue-500 text-white rounded-full">
            <BiSolidLike className="" />
          </div>
        );
      case "dislike":
        return (
          <div className="p-3 bg-red-500 text-white rounded-full">
            <BiSolidDislike className="" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full border shadow rounded max-w-sm mx-auto mt-6">
      <div className="p-4 bg-white rounded shadow-md">
        <h2 className="text-lg text-gray-800 mb-4">ការជូនដំណឹង</h2>
        <div className="h-[67vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center justify-between gap-4 p-3 hover:bg-gray-100 rounded-l-lg transition-all cursor-pointer"
              >
                <div className="flex items-center gap-4 w-[95%]">
                  {getIcon(notification.type)}
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {notification.user}{" "}
                      <span className="text-gray-600 font-normal">
                        {notification.message}
                      </span>
                    </p>
                    <p className="text-xs text-gray-400">{notification.time}</p>
                  </div>
                </div>
                <div className="w-[5%]">
                  <div className="bg-blue-500 rounded-full w-3 h-3"></div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No notifications available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
