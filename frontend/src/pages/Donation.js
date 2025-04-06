import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../AuthContext";
import L from "leaflet";
import axios from "axios";
import emailjs from "emailjs-com"; // <-- add this

const Donation = () => {
  const { loggedIn } = useContext(AuthContext);
  const form = useRef(); // <-- reference to form

  const [donationData, setDonationData] = useState({
    name: "",
    email: "",
    donationDate: new Date(),
    location: "",
    city: "",
    foodType: "", // <-- added dropdown
  });

  const [donationMessage, setDonationMessage] = useState("");

  const handleDonationSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.post(
        "http://localhost:5050/donate",
        donationData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // 👇 Send email via EmailJS
      await emailjs.sendForm(
        "service_bs1y99c",
        "template_y6i3mn5",
        form.current,
        "LfWk3Q_8035HZD_L_"
      );

      setDonationMessage("Donation Made Successfully");

      // 👇 Reset form fields
      setDonationData({
        name: "",
        email: "",
        donationDate: new Date(),
        location: "",
        city: "",
        foodType: "",
      });
    } catch (error) {
      if (error.response && error.response.data.error) {
        setDonationMessage(error.response.data.error);
      } else {
        setDonationMessage("Something went wrong");
      }
      console.error(error);
    }
  };

  useEffect(() => {
    const initializeMap = () => {
      const map = L.map("map").setView([40.7128, -74.006], 12);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "Map data &copy; OpenStreetMap contributors",
        maxZoom: 18,
      }).addTo(map);

      const marker = L.marker([40.7128, -74.006], { draggable: true }).addTo(
        map
      );

      marker.on("dragend", function (event) {
        const latlng = event.target.getLatLng();

        fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json`
        )
          .then((response) => response.json())
          .then((data) => {
            setDonationData((prevData) => ({
              ...prevData,
              location: data.display_name,
              city: data.address.city || "",
            }));
          });
      });
    };

    initializeMap();
  }, []);

  return (
    <div className="donation-body">
      <div className="donation-header">
        <h1>
          Donate Food with{" "}
          <span className="donation-site-name">KindBasket</span>
        </h1>
        <p style={{ color: "white", fontSize: "1.1rem", lineHeight: "1.6" }}>
          "Food donation is not just about filling empty stomachs; it's about
          nourishing hope,
          <br />
          feeding compassion, and cultivating a brighter future for all."
        </p>
      </div>
      <div className="donation-main">
        <div className="donation-form-wrapper">
          <h1>DONATE FOOD</h1>
          <form
            className="donation-form"
            ref={form}
            onSubmit={handleDonationSubmit}
          >
            <input
              type="text"
              name="name"
              placeholder="Name or Business Name"
              value={donationData.name}
              onChange={(e) =>
                setDonationData({ ...donationData, name: e.target.value })
              }
              required
            />
            <select
              name="email"
              value={donationData.email}
              onChange={(e) =>
                setDonationData({ ...donationData, email: e.target.value })
              }
              required
            >
              <option value="">Select Recipient Email</option>
              <option value="dakshsahu843@gmail.com">dakshsahu843@gmail.com</option>
              <option value="ajitpatel00nwd@gmail.com">ajitpatel00nwd@gmail.com</option>
              <option value="rspsurana@gmail.com">rspsurana@gmail.com</option>
            </select>
            <input
              type="text"
              name="location"
              placeholder="Address"
              value={donationData.location}
              onChange={(e) =>
                setDonationData({ ...donationData, location: e.target.value })
              }
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={donationData.city}
              onChange={(e) =>
                setDonationData({ ...donationData, city: e.target.value })
              }
              required
            />
            <input type="hidden" name="to_email" value={donationData.email} />

            {/* Dropdown Field */}
            <select
              name="foodType"
              value={donationData.foodType}
              onChange={(e) =>
                setDonationData({ ...donationData, foodType: e.target.value })
              }
              required
            >
              <option value="">Select Food Type</option>
              <option value="Cooked Food">Cooked Food</option>
              <option value="Raw Ingredients">Raw Ingredients</option>
              <option value="Packaged Food">Packaged Food</option>
            </select>

            {loggedIn ? (
              <button type="submit" className="donation-btn">
                DONATE
              </button>
            ) : (
              <button type="button" className="donation-btn" disabled>
                LOG IN TO DONATE
              </button>
            )}
          </form>

          {donationMessage && (
            <p
              className={`donation-message ${
                donationMessage === "Donation Made Successfully"
                  ? "donation-success"
                  : "donation-error"
              }`}
            >
              {donationMessage}
            </p>
          )}
        </div>

        <div
          className="donation-map"
          id="map"
          style={{ width: "50%", height: "510px" }}
        ></div>
      </div>
    </div>
  );
};

export default Donation;
