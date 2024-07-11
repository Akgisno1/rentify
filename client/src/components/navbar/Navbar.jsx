import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  if (currentUser) fetch();

  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>RENTIFY</span>
        </a>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <a href="/chats" className="chatlogo">
              <img src="/chatlogo.png" alt="" />
              {number > 0 && <div className="notification">{number}</div>}
            </a>
            <Link to="/profile" className="profile">
              <img src={currentUser.avatar || "/noavatar.jpg"} alt="" />
              <span>{currentUser.username}</span>
            </Link>
          </div>
        ) : (
          <div className="signin">
            <a href="/login">Sign in</a>
            <a href="/register" className="register">
              Sign up
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
