/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect, useRef } from "react";

const Manager = () => {
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
    if (ref.current.src.includes("freeeye.png")) {
      ref.current.src = "closed.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "freeeye.png";
      passwordRef.current.type = "text";
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = () => {
    const updatedArray = [...passwordArray, form];
    setPasswordArray(updatedArray);
    localStorage.setItem("passwords", JSON.stringify(updatedArray));
  };

  const deletePassword = (id) => {
    const confirmDelete = confirm("Do you really want to delete this password?");
    if (confirmDelete) {
      const filtered = passwordArray.filter((item, index) => index !== id);
      setPasswordArray(filtered);
      localStorage.setItem("passwords", JSON.stringify(filtered));
    }
  };

  return (
    <>
      <div className="absolute inset-0 -z-50 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="max-w-3xl px-4 mx-auto my-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-green-500">
            &lt;<span className="text-black">Pass</span><span className="text-green-500">Saver</span>&gt;
          </h1>
          <p className="text-green-900">Save all your passwords in one place</p>
        </div>

        {/* Card: Input Form */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col gap-4">
            <input
              value={form.site}
              onChange={handleChange}
              name="site"
              type="text"
              placeholder="Enter website URL"
              className="w-full p-2 border border-green-400 rounded-md focus:outline-none"
            />
            <input
              value={form.username}
              onChange={handleChange}
              name="username"
              type="text"
              placeholder="Enter username"
              className="w-full p-2 border border-green-400 rounded-md focus:outline-none"
            />
            <div className="relative flex items-center gap-2">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Enter password"
                className="w-full p-2 border border-green-400 rounded-md focus:outline-none"
              />
              <img
                ref={ref}
                onClick={showPassword}
                src="freeeye.png"
                alt="toggle password"
                width={40}
                className="cursor-pointer"
              />
            </div>
            <button
              onClick={savePassword}
              className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
            >
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
              ></lord-icon>
              Add Password
            </button>
          </div>
        </div>

        {/* Card: Password Table */}
        <div className="bg-white rounded-xl shadow-md p-6">
  <h2 className="text-2xl font-bold mb-4">Your Passwords</h2>

  {passwordArray.length === 0 ? (
    <p className="text-gray-500">No passwords to show.</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left rounded-md">
        <thead className="bg-green-700 text-white">
          <tr>
            <th className="py-2 px-3">Site</th>
            <th className="py-2 px-3">Username</th>
            <th className="py-2 px-3">Password</th>
            <th className="py-2 px-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-green-50 text-gray-800">
          {passwordArray.map((item, index) => (
            <tr key={index} className="border-t border-green-200">
              {/* Site */}
              <td className="py-2 px-3">
                <div className="flex items-center justify-between gap-2">
                  <a
                    href={item.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {item.site}
                  </a>
                  <div
                    onClick={() => copyText(item.site)}
                    className="cursor-pointer"
                    title="Copy site"
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/iykgtsbt.json"
                      trigger="hover"
                      style={{ width: "20px", height: "20px" }}
                    ></lord-icon>
                  </div>
                </div>
              </td>

              {/* Username */}
              <td className="py-2 px-3">
                <div className="flex items-center justify-between gap-2">
                  <span>{item.username}</span>
                  <div
                    onClick={() => copyText(item.username)}
                    className="cursor-pointer"
                    title="Copy username"
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/iykgtsbt.json"
                      trigger="hover"
                      style={{ width: "20px", height: "20px" }}
                    ></lord-icon>
                  </div>
                </div>
              </td>

              {/* Password */}
              <td className="py-2 px-3">
                <div className="flex items-center justify-between gap-2">
                  <span>{item.password}</span>
                  <div
                    onClick={() => copyText(item.password)}
                    className="cursor-pointer"
                    title="Copy password"
                  >
                    <lord-icon
                      src="https://cdn.lordicon.com/iykgtsbt.json"
                      trigger="hover"
                      style={{ width: "20px", height: "20px" }}
                    ></lord-icon>
                  </div>
                </div>
              </td>

              {/* Actions */}
              <td className="py-2 px-3 text-center">
                <div
                  onClick={() => deletePassword(index)}
                  className="inline-block cursor-pointer"
                  title="Delete"
                >
                  <lord-icon
                    src="https://cdn.lordicon.com/skkahier.json"
                    trigger="hover"
                    style={{ width: "24px", height: "24px" }}
                  ></lord-icon>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

      </div>
    </>
  );
};

export default Manager;
