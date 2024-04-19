import React, { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const deleteUser = (userId) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => {
        // Update the user list after successful deletion
        setUsers(users.filter((user) => user.id !== userId));
        alert("deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  return (
    <>
      <div className="p-5 bg-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-xl mb-2 text-left font-bold">
            UserList Dashboard
          </span>
          <span className="text-xl mb-2 text-end font-bold">Add</span>
        </div>

        <div className="overflow-auto rounded-lg shadow hidden md:block bg-white">
          <table className="w-full">
            <thead className="bg-grey-200 border-b-2 border-grey-200">
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">
                  ID
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">
                  First Name
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">
                  Last Name
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">
                  Email
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">
                  Company Name
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {user.id}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {user.name.split(" ")[0]}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {user.name.split(" ")[1]}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {user.email}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {user.company.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="text-indigo-600 hover:text-white border px-1 rounded-lg bg-green-300 mr-1"
                      onClick={() => console.log(user.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-indigo-600 hover:text-white border px-1 rounded-lg bg-red-300 ml-1"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1  sm:grid-cols-2 gap-4 md:hidden">
          {users.map((user) => (
            <div
              className="bg-white overflow-auto p-4 rounded-lg space-y-3 roun-lg shadow"
              key={user.id}
            >
              <div className="flex items-center space-x-2 text-sm whitespace-nowrap">
                <div>ID : {user.id}</div>
              </div>
              <div className="flex items-center space-x-2 text-sm whitespace-nowrap">
                <div>{user.name.split(" ")[0]}</div>
                <div>{user.name.split(" ")[1]}</div>
              </div>
              <div className="flex items-center space-x-2 text-sm whitespace-nowrap">
                <div className="text-gray-300">{user.email}</div>
                <div className="text-gray-300"> {user.company.name}</div>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <button
                  className="text-indigo-600 hover:text-white border px-1 rounded-lg bg-green-300 mr-1"
                  onClick={() => console.log("user.id")}
                >
                  Edit
                </button>
                <button
                  className="text-indigo-600 hover:text-white border px-1 rounded-lg bg-red-300 ml-1"
                  onClick={() => deleteUser("user.id")}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserList;
