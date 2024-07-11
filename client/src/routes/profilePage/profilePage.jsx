import List from "../../components/list/List";
import "./profilePage.scss";
import apiRequest from "../../lib/apiRequest";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { Suspense, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
  const data = useLoaderData();

  const { updateUser, currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="profilePage">
      <div className="details">
        <div className="top">
          <div className="user">
            <div className="title">
              <h1>USER INFO</h1>
            </div>
            <div className="info">
              <img src={currentUser.avatar || "noavatar.jpg"} alt="" />
              <div>
                <span>
                  Username : <b>{currentUser.username}</b>
                </span>
                <span>
                  E-mail : <b>{currentUser.email}</b>
                </span>
              </div>
            </div>
          </div>
          <div className="actions">
            <button onClick={handleLogout}>Logout</button>
            <a href="/profile/update">Update Profile</a>
            <a href="/add">Add New Property</a>
          </div>
        </div>
        <div className="bottom">
          <div className="props">
            <div className="title">
              <h1>My Properties</h1>
            </div>
            <div className="properties">
              <Suspense fallback={<p>Loading...</p>}>
                <Await
                  resolve={data.postResponse}
                  errorElement={<p>Error loading posts!</p>}
                >
                  {(postResponse) => (
                    <List posts={postResponse.data.userPosts} />
                  )}
                </Await>
              </Suspense>
            </div>
          </div>

          <div className="props">
            <div className="title">
              <h1>Saved Properties</h1>
            </div>
            <div className="properties">
              <Suspense fallback={<p>Loading...</p>}>
                <Await
                  resolve={data.postResponse}
                  errorElement={<p>Error loading posts!</p>}
                >
                  {(postResponse) => (
                    <List posts={postResponse.data.savedPosts} />
                  )}
                </Await>
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
