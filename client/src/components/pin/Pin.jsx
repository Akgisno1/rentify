import { Marker, Popup } from "react-leaflet";
import "./pin.scss";
import { Link } from "react-router-dom";
import L from "leaflet";

function Pin({ item }) {
  const customIcon = new L.Icon({
    iconUrl: "/mappin.png", // You can use a custom SVG or a URL to an image
    iconRetinaUrl: "/mappin.png",
    iconSize: [50, 41],
  });

  return (
    <Marker position={[item.latitude, item.longitude]} icon={customIcon}>
      <Popup>
        <div className="popupContainer">
          <img src={item.images[0]} alt="" />
          <div className="textContainer">
            <Link to={`/${item.id}`} className="title">
              {item.title}
            </Link>
            <span>{item.bedroom} bedroom</span>
            <b>₹ {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
