/* eslint-disable react-hooks/rules-of-hooks */
// import React from "react";
// import Maincard from "./maincard";
import { useState, useEffect } from "react";
import { useRef } from "react";

const manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
  };

  const [form, setform] = useState({ site: "", username: "", password: "" });

  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("freeeye.png")) {
      passwordRef.current.type = "password";
      ref.current.src = "closed.png";
    } else {
      ref.current.src = "freeeye.png";
      passwordRef.current.type = "text";
    }
  };
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value }); //yeh ... form wala smjh nhi aya
  };

  const savePassword = () => {
    console.log(form);
    setPasswordArray([...passwordArray, form]);
    console.log(passwordArray);
    localStorage.setItem("password", JSON.stringify([...passwordArray, form]));
  };

  const deletePassword = (id) => {
    console.log("Deleting password with id ", id);
    let c = confirm("Do you really want to delete this password?");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
    }
  };


  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
      <div className="flex flex-col px-2 mx-2 md:px-0 bg-slate-300 md:mycontainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-700">&lt;</span>
          <span>Pass</span>
          <span className="text-green-700">Saver&gt;</span>
        </h1>
        <p className="text-lg text-center text-green-900">
          Save all you Passwords at one Place
        </p>
        <div className="flex flex-col items-center gap-4 p-4 text-black">
          <input
            value={form.site}
            onChange={handleChange}
            className="w-full p-2 py-1 border-green-500 rounded-full"
            type="text"
            name="site"
            placeholder="Enter the website URL"
          />
          <div className="flex items-center justify-center w-full gap-2">
            <input
              value={form.username}
              onChange={handleChange}
              className="w-full p-2 py-1 border-green-500 rounded-full"
              type="text"
              name="username"
              placeholder="Enter Username"
            />
            <input
              ref={passwordRef}
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 py-1 border-green-500 rounded-full"
              type="password"
              name="password"
              placeholder="Enter Password"
            />
            <span className="relative cursor-pointer" onClick={showPassword}>
              <img ref={ref} width={50} src="freeeye.png" alt="" />
            </span>
          </div>
          <button
            onClick={savePassword}
            className="flex items-center justify-center gap-1 px-5 py-1 bg-green-500 border-2 border-green-600 rounded-full w-fit"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>

        <div className="passwords">
          <h2 className="py-4 text-2xl font-bold">Your Passwords</h2>
          {passwordArray.length === 0 && <div> No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="w-full mb-10 overflow-hidden rounded-md table-auto">
              <thead className="text-white bg-green-800">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 text-center border border-white">
                        <div className="flex items-center justify-center ">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="cursor-pointer lordiconcopy size-7"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 text-center border border-white">
                        <div className="flex items-center justify-center ">
                          <span>{item.username}</span>
                          <div
                            className="cursor-pointer lordiconcopy size-7"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 text-center border border-white">
                        <div className="flex items-center justify-center ">
                          <span>{item.password}</span>
                          <div
                            className="cursor-pointer lordiconcopy size-7"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="justify-center py-2 text-center border border-white">
                        <span
                          className="mx-1 cursor-pointer"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
export default manager;
