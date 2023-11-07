import { useState } from "react";
import { update, resetPassword, auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/auth";
import { Link } from "react-router-dom";

export default function UpdateProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [avatar, setAvatar] = useState(user.photoURL || "");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await update({
      displayName,
      photoURL: avatar,
    });
    dispatch(
      login({
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        photoURL: auth.currentUser.photoURL,
        uid: auth.currentUser.uid,
      })
    );
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    const result = await resetPassword(password);
    if (result) {
      setPassword("");
    }
  };

  return (
    <div className="profile grid gap-y-10">
      <form onSubmit={handleSubmit} className="grid gap-y-4">
        <h1 className="text-xl font-bold mb-4">Update Profile</h1>
        <div>
          <label className="block text-sm font-medium text-white">
            Name and Surname
          </label>
          <div className="mt-1">
            <input
              type="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="John Jones"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-white">
            Photo
          </label>
          <div className="mt-1">
            <input
              type="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
        </div>

        <div>
          <button
            className="bg-green-500 w-full disabled:opacity-50 cursor-pointer text-white px-4 py-2 mt-2 rounded-md"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>

      <form onSubmit={handleResetSubmit} className="grid gap-y-4">
        <div>
          <label className="block text-xl font-bold text-white">
            Update Password
          </label>
          <div className="mt-1">
            <input
              type="password"
              placeholder="*****"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-3 block w-full sm:text-sm border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          disabled={!password}
          className="bg-violet-500 font-bold w-full disabled:opacity-50 cursor-pointer text-white px-4 py-2 mt-2 rounded-md"
          type="submit"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
