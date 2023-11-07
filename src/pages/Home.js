import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, auth, emailVerification } from "../firebase";
import { logout as logoutHandle } from "../store/auth";
import UpdateProfile from "../components/UpdateProfile";


export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handelLogout = async () => {
    await logout();
    dispatch(logoutHandle());
    navigate("/", {
      replace: true,
      
    });
  };

  const handelVerification = async () => {
    await emailVerification();
  };

  if (user) {
    return (
      <div className="info mx-auto py-5">
        <h1 className="flex gap-x-4 text-white items-center justify-center">
          {auth.currentUser.photoURL && (
            <img
              src={auth.currentUser.photoURL}
              className="w-14 h-14 rounded-full  "
            />
          )}
          Your account is open ({user.email})
          <button
            onClick={handelLogout}
            className="bg-red-500 disabled:opacity-50 cursor-pointer text-white px-4 py-2 mt-2 rounded-md"
            type="submit"
          >
            Log out
          </button>
          {!user.emailVerified && (
            <button
              onClick={handelVerification}
              className="bg-sky-500 disabled:opacity-50 cursor-pointer text-white px-4 py-2 mt-2 rounded-md"
              type="submit"
            >
              Confirm email
            </button>
          )}
        </h1>
        <UpdateProfile />
      </div>
    );
  }

  return (
    <div className="home">
      <h1 className="text-center text-3xl text-white">Firebase - Authentication</h1>
      <div className="flex justify-around flex-row mt-4">
        <Link className="text-black bg-emerald-100 py-1 px-3 rounded-md" to="/register">Sign up</Link>
        <Link className="text-black bg-emerald-100 py-1 px-3 rounded-md" to="/login">Sign in</Link>
      </div>
    </div>
  );
}
