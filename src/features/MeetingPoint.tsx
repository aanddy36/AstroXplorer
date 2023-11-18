import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { FaPhone, FaLocationDot, FaClock } from "react-icons/fa6";
import marker from "../images/marker/location-pin.png";
import markerShadow from "../images/marker/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export const MeetingPoint = () => {
  var greenIcon = L.icon({
    iconUrl: marker,
    shadowUrl: markerShadow,

    iconSize: [38, 38], // size of the icon
    shadowSize: [50, 64], // size of the shadow
    iconAnchor: [20, 32], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [0, -46], // point from which the popup should open relative to the iconAnchor
  });
  return (
    <div className="my-12">
      <div className="grid full:grid-cols-2 full:mb-20 mb-10">
        <div className="flex flex-col p-5 gap-4">
          <h3 className="text-lg text-yellow-500">Houston, TX, USA</h3>
          <h1 className="text-4xl tablet:text-5xl font-bold">
            NASA Mission Control Center
          </h1>
        </div>

        <span className="p-5 grid place-content-center text-white/60 font-ligh gap-4">
          AstroXplorer, in association with the National Aeronautics and Space
          Administration (NASA), has provided the Christopher C. Kraft, Jr.
          Mission Control Center at NASA’s Johnson Space Center in Houston for
          our interplanetary tours. Both departure and arrival take place in
          here.
        </span>
      </div>
      <MapContainer
        center={[29.557, -95.089]}
        zoom={9}
        scrollWheelZoom={false}
        style={{ width: "100%" }}
        className="h-[600px] full:h-[400px] relative z-[1]"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://api.maptiler.com/maps/dataviz-dark/256/{z}/{x}/{y}.png?key=LwOQqecOmbpsAob5UxA1"
        />
        <Marker position={[29.557, -95.089]} icon={greenIcon}>
          <Popup className="bg-black">
            <p className="">NASA Johnson Space Center</p>
          </Popup>
        </Marker>
      </MapContainer>
      <ul className=" mt-10 flex items-start gap-y-14 gap-10 laptop:gap-20 flex-wrap justify-between laptop:justify-start">
        <li className="flex flex-col gap-4">
          <div className=" font-semibold flex items-center gap-3 tracking-widest">
            <FaLocationDot /> ADDRESS
          </div>
          <div className="flex flex-col font-light text-white/60">
            <span>2101 NASA Pkwy</span>
            <span>Houston, TX 77058</span>
          </div>
        </li>
        <li className="flex flex-col gap-4">
          <div className=" font-semibold flex items-center gap-3 tracking-widest">
            <FaPhone /> CONTACT INFORMATION
          </div>
          <div className="flex flex-col font-light text-white/60">
            <div className="flex items-center gap-6 w-[180px] laptop:w-[200px] justify-between">
              <span>Phone:</span>
              <span>123-456-7890</span>
            </div>
            <div className="flex items-center gap-6 w-[180px] laptop:w-[200px] justify-between">
              <span>Fax:</span>
              <span>123-456-7890</span>
            </div>
          </div>
        </li>
        <li className="flex flex-col gap-4">
          <div className=" font-semibold flex items-center gap-3 tracking-widest">
            <FaClock /> HOURS OF OPERATION
          </div>
          <span className="flex flex-col font-light text-white/60">
            5:00 AM - 10:00 PM
          </span>
        </li>
      </ul>
    </div>
  );
};
