import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [updatePhone, setUpdatePhone] = useState("");
  const [editId, setEditID] = useState(-1);

  const [isValidEmail, setIsValidEmail] = useState(true);

  const itemsPerPage = 3; // Number of items per page for pagination
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    //Fetching a data from api
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  //Function to delete a User .
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

  //Function Of Api call to add data in database
  const postCall = async () => {
    await axios
      .post(`https://jsonplaceholder.typicode.com/users/`, {
        id: users[users.length - 1].id + 1,
        name: name,
        email: email,
        phone: phone,
      })
      .then((res) => alert("user created successfully"))
      .catch((e) => {
        alert("There some issue while Creating new User");
      });
  };

  const handleEmailChange = (e) =>{
    setEmail(e.target.value);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailPattern.test(email));

  }
  //Function to Add new User in UserList
  const handleSubmit = (e) => {
    e.preventDefault();

    // Email Validation

    if(isValidEmail){
      postCall();
      setUsers((prev) => [
        ...prev,
        {
          id: users[users.length - 1].id + 1,
          name: name,
          email: email,
          phone: phone,
        },
      ]);

      setName("");
      setEmail("");
      setPhone("");
    } else {
      alert("Please use correct email !");
    }
  };

  //Function to Handle edit input values
  const handleEdit = (id) => {
    const filter_single_data = users.filter((item) => item.id === id);
    const fullname = filter_single_data[0].name.split(" ");

    setUpdateName(fullname[0]);
    setLastName(fullname[1]);
    setUpdateEmail(filter_single_data[0].email);
    setUpdatePhone(filter_single_data[0].phone);

    setEditID(id);
  };
  console.log(editId);

  //Function to handle the Update functionality
  const handleUpdate = (id) => {
    let fullname = updateName + " " + lastName;
    axios
      .put(`https://jsonplaceholder.typicode.com/users/${editId}`, {
        id: editId,
        name: fullname,
        email: updateEmail,
        phone: updatePhone,
      })
      .then(alert("Added new user successfully"))
      .then(window.location.reload())
      .catch((e) => {
        alert("Error while adding a User");
      });
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id
          ? { ...user, name: updateName, email: updateEmail, phone: phone }
          : user
      )
    );
  };

  // Function to handle pagination
  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="p-5 bg-gray-100">
        <div className="flex items-center justify-center">
          <h1 className="text-xl mb-2 text-left font-bold">
            UserList Dashboard
          </h1>
        </div>

        {/* Add Functionality Code JSX */}
        <div className="border p-1 bg-slate-50 rounded-lg my-1">
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-between"
          >
            <div>
              <input
                type="text"
                required
                className="border rounded-md m-0.5"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                required
                className="border rounded-md m-0.5"
                placeholder="Email"
                name="email"
                value={email}
                onChange={handleEmailChange}
              />
              <input
                type="text"
                required
                className="border rounded-md m-0.5"
                placeholder="Company Name"
                name="cName"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <button alt="add">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="cursor-pointer border rounded-md w-7"
              >
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
              </svg>
            </button>
          </form>
        </div>

        {/* Desktop view Code */}
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
                  Phone
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* Looping through the array of objects to gererate table data*/}

              {paginatedUsers.map((user) =>
                user.id === editId ? (
                  // Conditionally rendering for editing the records

                  <tr key={user.id}>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {user.id}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <input
                        type="text"
                        value={updateName}
                        onChange={(e) => setUpdateName(e.target.value)}
                      />
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <input
                        type="text"
                        value={updateEmail}
                        onChange={(e) => setUpdateEmail(e.target.value)}
                      />
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <input
                        type="text"
                        value={updatePhone}
                        onChange={(e) => setUpdatePhone(e.target.value)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="text-indigo-600 hover:text-white border px-1 rounded-lg bg-green-300 mr-1"
                        onClick={() => handleUpdate(user.id)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ) : (
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
                    <td className="p-3 text-sm text-gray-500 whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="p-3 text-sm text-gray-500 whitespace-nowrap">
                      {user.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className="text-indigo-600 hover:text-white border px-1 rounded-lg bg-green-300 mr-1"
                        onClick={() => handleEdit(user.id)}
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
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile view Code */}

        <div className="grid grid-cols-1  sm:grid-cols-2 gap-4 md:hidden">
          {paginatedUsers.map((user) =>
            user.id === editId ? (
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
                  <div className="text-gray-500">{user.email}</div>
                  <div className="text-gray-500"> {user.phone}</div>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <button
                    className="text-indigo-600 hover:text-white border px-1 rounded-lg bg-green-300 mr-1"
                    onClick={() => handleUpdate(user.id)}
                  >
                    Update
                  </button>
                </div>
              </div>
            ) : (
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
                  <div className="text-gray-500">{user.email}</div>
                  <div className="text-gray-500"> {user.phone}</div>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <button
                    className="text-indigo-600 hover:text-white border px-1 rounded-lg bg-green-300 mr-1"
                    onClick={() => handleEdit(user.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-indigo-600 hover:text-white border px-1 rounded-lg bg-red-300 ml-1"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          )}
        </div>
        {/* Pagination component */}
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(users.length / itemsPerPage)}
          goToPage={goToPage}
        />
      </div>
    </>
  );
};

export default UserList;
