import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";

function HomePage() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">RENTIFY</h1>
          <p className="desc">
            Your Perfect Space just a few clicks away. Get started with the
            search for your right below.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>12+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>100+</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>10000+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
