import React, { useState, useEffect } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import Header from "./Header";
import Footer from "./Footer";
import withTokenExpirationCheck from "./withTokenExpirationCheck";
import "./DietaryRestrictions.css";

const DietaryRestrictions = () => {
  const [healthLabels, setHealthLabels] = useState([]);
  const [selectedRestrictions, setSelectedRestrictions] = useState([]);
  const [userHealthLabels, setUserHealthLabels] = useState([]);

  useEffect(() => {
    // Fetch health labels from the server
    Axios.get(
      "https://whattocook2-4e261a72626f.herokuapp.com/users/healthlabels"
    )
      .then((response) => {
        const filteredLabels = response.data.labels.filter(
          (label) => label !== "DASH"
        );
        setHealthLabels(filteredLabels);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCheckboxChange = (label) => {
    // Toggle the selected status of the label
    setSelectedRestrictions((prevSelected) => {
      if (prevSelected.includes(label)) {
        return prevSelected.filter((selected) => selected !== label);
      } else {
        return [...prevSelected, label];
      }
    });
  };

  const handleSaveRestrictions = async () => {
    try {
      const authToken = Cookies.get("userToken");

      // Fetch the healthLabel_ids corresponding to the selected health labels
      const response = await Axios.get(
        "https://whattocook2-4e261a72626f.herokuapp.com/users/healthlabels_ids",
        {
          params: { selectedRestrictions: selectedRestrictions.join(",") },
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const healthLabelIds = response.data.healthLabelIds;

      console.log(healthLabelIds);

      await Axios.post(
        "https://whattocook2-4e261a72626f.herokuapp.com/users/dietary_restrictions",
        { selectedRestrictions: healthLabelIds },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Dietary restrictions saved successfully!");
      setUserHealthLabels(selectedRestrictions);
    } catch (error) {
      console.error("Error saving dietary restrictions:", error);
    }
  };

  useEffect(() => {
    // Fetch user's saved dietary restrictions
    Axios.get(
      "https://whattocook2-4e261a72626f.herokuapp.com/users/user_healthlabels",
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      }
    )
      .then((response) => {
        // console.log('Response from server:', response)
        const savedRestrictions = response.data.userHealthLabels || [];
        setUserHealthLabels(savedRestrictions);
        setSelectedRestrictions(savedRestrictions);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleNoneButtonClick = () => {
    setSelectedRestrictions([]);
  };

  return (
    <div style={{ backgroundColor: "tan" }}>
      <Header />
      <h1>Dietary Restrictions</h1>
      <h3 className="select-allergy">Select your allergy:</h3>
      <div className="container">
        {healthLabels.map((label) => (
          <div
            key={label}
            className={`label-container ${
              label === "EggFree" ? "egg-background" : ""
            } ${label === "Mediterranean" ? "mediterranean-background" : ""} ${
              label === "DairyFree" ? "dairy-background" : ""
            } ${label === "GlutenFree" ? "gluten-background" : ""} ${
              label === "WheatFree" ? "wheat-background" : ""
            } ${label === "PeanutFree" ? "peanut-background" : ""} ${
              label === "TreeNutFree" ? "treenut-background" : ""
            } ${label === "FishFree" ? "fish-background" : ""} ${
              label === "SoyFree" ? "soy-background" : ""
            } ${label === "ShellfishFree" ? "shellfish-background" : ""} ${
              label === "PorkFree" ? "pork-background" : ""
            } ${label === "RedMeatFree" ? "redmeat-background" : ""} ${
              label === "CrustaceanFree" ? "crustacean-background" : ""
            } ${label === "CeleryFree" ? "celery-background" : ""} ${
              label === "MustardFree" ? "mustard-background" : ""
            } ${label === "SesameFree" ? "sesame-background" : ""} ${
              label === "LupineFree" ? "lupine-background" : ""
            } ${label === "MolluskFree" ? "mollusk-background" : ""} ${
              label === "Kosher" ? "kosher-background" : ""
            } ${
              label === "SugarConscious" ? "sugarconscious-background" : ""
            } ${label === "AlcoholFree" ? "alcohol-background" : ""} ${
              label === "SulfiteFree" ? "sulfite-background" : ""
            } ${label === "KetoFriendly" ? "ketofriendly-background" : ""} ${
              label === "Paleo" ? "paleo-background" : ""
            } ${label === "No oil added" ? "nooil-background" : ""} ${
              label === "FODMAPFree" ? "fodmap-background" : ""
            } ${label === "KidneyFriendly" ? "kidney-background" : ""} ${
              label === "ImmunoSupportive" ? "immunosupportive-background" : ""
            } ${label === "Low Potassium" ? "lowpotassium-background" : ""} ${
              label === "Low Sugar" ? "lowsugar-background" : ""
            } ${label === "Pescatarian" ? "pescatarian-background" : ""} ${
              label === "Vegan" ? "vegan-background" : ""
            } ${label === "Vegetarian" ? "vegetarian-background" : ""}`}
          >
            <label>
              <input
                type="checkbox"
                className="checkbox"
                checked={selectedRestrictions.includes(label)}
                onChange={() => handleCheckboxChange(label)}
              />
              <span role="img" aria-label="star">
                ★
              </span>{" "}
              {label}
            </label>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={handleSaveRestrictions}
        className="save-button"
      >
        Save Dietary Restrictions
      </button>
      <button
        type="button"
        onClick={handleNoneButtonClick}
        className="none-button"
      >
        Uncheck all
      </button>
      <div className="saved-restrictions">
        <h2>Your Saved Restrictions</h2>
        <ul>
          {userHealthLabels.map((savedLabel) => (
            <li key={savedLabel}>{savedLabel}</li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default withTokenExpirationCheck(DietaryRestrictions);
