// justins fun price comp : )
import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import SearchBar from "./SearchBarProducts";
import Header from "./Header";
import Footer from "./Footer";
import withTokenExpirationCheck from "./withTokenExpirationCheck";
import "./PriceComparer.css";

const PriceComparer = ({ ItemToSearch }) => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [searchedItemName, setSearchedItemName] = useState("");
  const [isSearchResultEmpty, setIsSearchResultEmpty] = useState(false);

  const handleClearAll = () => {
    setSelectedItems([]);
  };

  const handleSearchResults = (searchResults, itemName) => {
    setSearchedItemName(itemName);
    const filteredItems = searchResults.filter(
      (item) => item.price && item.price[0] !== null
    );
    if (filteredItems.length === 0) {
      setIsSearchResultEmpty(true);
    } else {
      setIsSearchResultEmpty(false);
      setItems(filteredItems);
    }
  };

  const handleItemClick = (productId, event) => {
    if (event.target.tagName.toLowerCase() === "a") {
      return;
    }

    const selectedItem = items.find((item) => item.productId === productId);
    selectedItem.itemName = searchedItemName || "N/A";
    setSelectedItems([...selectedItems, selectedItem]);
  };

  const handleRemoveItem = (productId, event) => {
    if (event.target.tagName.toLowerCase() === "a") {
      return;
    }

    const updatedSelectedItems = selectedItems.filter(
      (item) => item.productId !== productId
    );
    setSelectedItems(updatedSelectedItems);
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
    let roundedTotalPrice = totalPrice.toFixed(2);

    pdf.text("Selected Items List", 20, 10);
    selectedItems.forEach((item, index) => {
      const yPosition = 20 + index * 40;
      pdf.text(`Item Name: ${item.itemName || "N/A"}`, 20, yPosition);
      pdf.text(`Brand: ${item.brand || "Kroger"}`, 20, yPosition + 10);
      pdf.text(`Regular Price: $${item.price[0].regular}`, 20, yPosition + 20);
      pdf.text(
        `Promo Price: $${
          item.price[0].promo !== 0 ? item.price[0].promo : "N/A"
        }`,
        20,
        yPosition + 30
      );
    });
    pdf.text(
      `Total Price: $${roundedTotalPrice}`,
      20,
      pdf.internal.pageSize.height - 20
    );
    pdf.save("selected_items.pdf");
  };

  useEffect(() => {
    const newTotalPrice = selectedItems.reduce((acc, item) => {
      const regularPrice = item.price && item.price[0].regular;
      const promoPrice =
        item.price && item.price[0].promo !== 0 ? item.price[0].promo : "N/A";
      const priceToAdd =
        regularPrice !== null && regularPrice !== undefined
          ? promoPrice !== "N/A"
            ? promoPrice
            : regularPrice
          : 0;
      return acc + priceToAdd;
    }, 0);

    setTotalPrice(newTotalPrice);
  }, [selectedItems]);

  return (
    <div style={{ backgroundColor: "tan" }}>
      <Header />
      <div>
        <h1>Price Comparer</h1>
        <SearchBar
          onSearchResults={handleSearchResults}
          itemFromRecipeGenerator={ItemToSearch}
        />
        <div className="search-section">
          <h2>Search Results</h2>
          <div>
            {isSearchResultEmpty && (
              <div className="text-bubble">
                <p>
                  Oops! That is not an item in our data base. Please try another
                  search term.
                </p>
              </div>
            )}
            {items.map((item) => (
              <div
                key={item.productId}
                onClick={(event) => handleItemClick(item.productId, event)}
                className="search-item"
              >
                <h2>
                  <a
                    href={`https://www.kroger.com/search?query=${item.productId}&searchType=default_search`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.brand || "Kroger"}
                  </a>
                </h2>
                {item.price && item.price[0] !== null && (
                  <>
                    <p>Regular Price: ${item.price[0].regular}</p>
                    <p>
                      Promo Price: $
                      {item.price[0].promo !== 0 ? item.price[0].promo : "N/A"}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="selected-section">
          <h2>Selected Items</h2>
          <div>
            {selectedItems.map((item) => (
              <div
                key={item.productId}
                onClick={(event) => handleRemoveItem(item.productId, event)}
                className="selected-item"
              >
                <h2>
                  <a
                    href={`https://www.kroger.com/search?query=${item.productId}&searchType=default_search`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.brand || "Kroger"}
                  </a>
                </h2>
                {item.price && item.price[0] !== null && (
                  <>
                    <p>Item Name: {item.itemName || "N/A"}</p>
                    <p>Regular Price: ${item.price[0].regular}</p>
                    <p>
                      Promo Price: $
                      {item.price[0].promo !== 0 ? item.price[0].promo : "N/A"}
                    </p>
                  </>
                )}
              </div>
            ))}
          </div>
          <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
          <button type="button" onClick={generatePDF}>
            Generate PDF
          </button>
          <button type="button" onClick={handleClearAll}>
            Clear All
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default withTokenExpirationCheck(PriceComparer);
