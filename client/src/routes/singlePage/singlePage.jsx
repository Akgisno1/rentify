import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useNavigate, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    // AFTER REACT 19 UPDATE TO USEOPTIMISTIK HOOK
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };
  const handleSendMessage = async () => {
    if (!currentUser) {
      navigate("/login");
    }
    try {
      // Call your backend API to create a chat
      const response = await apiRequest.post("/chats", {
        receiverId: post.userId,
      });

      console.log("Chat created:", response.data);
      navigate("/chats");
      // Handle further actions like redirecting to the chat page, updating state, etc.
    } catch (error) {
      console.error("Failed to create chat:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <div className="top">
            <div className="user">
              <img src={post.user.avatar} alt="" />
              <span>{post.user.username}</span>
            </div>
            <div className="post">
              <h1>{post.title}</h1>
              <div className="address">
                <img src="/pin.png" alt="" />
                <span>{post.address}</span>
              </div>
              <div className="price">₹ {post.price}</div>
            </div>
          </div>

          <Slider images={post.images} />
          <div
            className="bottom"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.postDetail.desc),
            }}
          ></div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <div className="buttons">
            <button onClick={handleSendMessage}>
              <img src="/chat.png" alt="" />
              Message Owner
            </button>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? "#cd2727" : "white",
                color: saved ? "white" : "black",
              }}
            >
              <img src="/save.png" alt="" />
              {saved ? "Place Saved" : "Save the Place"}
            </button>
          </div>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>{post.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>

          <div className="listHorizontal">
            <div className="feature">
              <div className="featureText">
                <span>Utilities</span>
                {post.postDetail.utilities === "owner" ? (
                  <p>Owner is responsible</p>
                ) : (
                  <p>Tenant is responsible</p>
                )}
              </div>
            </div>
            <div className="feature">
              <div className="featureText">
                <span>Pet Policy</span>
                {post.postDetail.pet === "allowed" ? (
                  <p>Pets Allowed</p>
                ) : (
                  <p>Pets not Allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <div className="featureText">
                <span>Income Policy</span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>

          <div className="listHorizontal">
            <div className="feature">
              <div className="featureText">
                <span>School</span>
                <p>
                  {post.postDetail.school > 999
                    ? post.postDetail.school / 1000 + "km"
                    : post.postDetail.school + "m"}{" "}
                  away
                </p>
              </div>
            </div>
            <div className="feature">
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetail.bus}m away</p>
              </div>
            </div>
            <div className="feature">
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetail.restaurant}m away</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
