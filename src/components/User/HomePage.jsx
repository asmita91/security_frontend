

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import productServices from "../../services/productService";
import { usePurchase } from "../../utils/purchaseContext";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Button } from "@mui/material";
import dummyProductData from "../../data/data";
import { ResponsiveAppBarHomepage } from "../AppBar/ResponsiveAppBarHomepage";

function HomePage() {
  const purchase = usePurchase();
  const navigate = useNavigate();
  const [purchaseProduct, setPurchaseProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [newReleasedProduct, setNewReleasedProduct] = useState({});
  const [hottestProduct, setHottestProduct] = useState({});
  const [userId, setUserId] = useState("");

  useEffect(() => {
    console.log(
      `Purchase context length from homepage is : ${purchase.purchase.length}`
    );

    setUserId(window.localStorage.getItem("userId"));

    setPurchaseProduct({
      items: purchase.purchase,
      payment: "pending",
    });

    productServices
      .getAllProudcts()
      .then((res) => {
        if (res.data.length === 0) {
          const dummyProduct = dummyProductData;
          setProducts(dummyProduct);
          setNewReleasedProduct(dummyProduct[1]);
          setHottestProduct(dummyProduct[dummyProduct.length - 1]);
          return;
        }

        setProducts(res.data);
        res.data.forEach((product) => {
          console.log(`Product name from home: ${product.name}`);
        });
        setNewReleasedProduct(res.data[0]);
        setHottestProduct(res.data[res.data.length - 1]);
      })
      .catch((err) => window.alert(err.response.data.error));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const activeItem = document.querySelector(
        ".carousel .carousel-item.active"
      );
      if (activeItem) {
        const nextItem =
          activeItem.nextElementSibling ||
          document.querySelector(".carousel .carousel-item:first-child");
        activeItem.classList.remove("active");
        nextItem.classList.add("active");
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const clearPurchaseContext = () => {
    purchase.setPurchase([]);
    setPurchaseProduct({});
    console.log("Purchase context cleared");
  };

  const handlePurchaseCancellation = (e) => {
    e.preventDefault();
    const confirmation = window.confirm(
      "Are you sure you want to cancel the purchase?"
    );
    if (confirmation) {
      console.log("Purchase cancelled");
      clearPurchaseContext();
      console.log(
        `After cancellation, purchase context length from homepage is : ${purchase.purchase.length}`
      );
    }
  };

  const handlePurchase = (e) => {
    e.preventDefault();
    if (purchase.purchase.length === 0) {
      window.alert("Please, add to cart first");
    } else {
      console.log(
        "Go to Khalti payment gateway. Then, only, POST to the server"
      );

      const finalPurchaseProduct = { ...purchaseProduct, payment: "success" };
      finalPurchaseProduct.items.map((item) => {
        console.log(`Purchase product name is : ${item.name}`);
        console.log(`Purchase product quantity is : ${item.quantity}`);
        console.log(`Purchase product price is : ${item.price}`);
        console.log("-----------------------------------");
      });
      clearPurchaseContext();
    }
  };

  const groupedProducts = products.reduce((groups, product) => {
    const category = product.category || "Others";
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(product);
    return groups;
  }, {});

  return (
    <div
      style={{
        backgroundColor: "#b2d5f5",
        color: "black",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <ResponsiveAppBarHomepage
        purchaseProductLength={purchase.purchase.length}
      />
      <div
        style={{
          backgroundColor: "#b2d5f5",
          minHeight: "80vh",
          padding: "20px",
        }}
      >
        <div className="carousel w-full h-full carousel-section">
          <div id="item1" className="carousel-item w-full active">
            <img
              src="/images/slider1.jpg"
              className="w-1/2 h-64 mx-auto object-contain rounded-lg"
            />
          </div>
          <div id="item2" className="carousel-item w-full">
            <img
              src="/images/slider2.jpg"
              className="w-1/2 h-64 mx-auto object-contain rounded-lg"
            />
          </div>
          <div id="item3" className="carousel-item w-full">
            <img
              src="/images/slider3.jpg"
              className="w-1/2 h-64 mx-auto object-contain rounded-lg"
            />
          </div>
        </div>
      </div>

      <h2 className="text-5xl font-bold m-1">All Products</h2>

      <div className="allProductsView">
        {Object.keys(groupedProducts).map((category) => (
          <div key={category}>
            <h3 className="text-3xl font-bold m-4">{category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
              {groupedProducts[category].map((product) => (
                <div
                  key={product.id}
                  className="card bg-base-100 shadow-xl m-4"
                >
                  <figure>
                    <img
                      className="mt-4 object-contain w-48 h-48 rounded-lg"
                      src={`https://localhost:3005/product/${product.picture}`}
                      alt="Product"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="text-bold">{product.name}</h2>
                    <p>{product.description.substring(0, 99)}...</p>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1">
                      <div className="card-actions justify-end mt-2">
                        <div
                          className="text"
                          style={{ color: "green", fontWeight: "bold" }}
                        >
                          Rs {product.price}
                        </div>
                      </div>
                      <br />

                      <Button
                        className="m-4"
                        onClick={() => navigate(`/singleProduct/${product.id}`)}
                        variant="contained"
                        style={{backgroundColor:"#000000", textTransform:"none"}}
                      >
                        Add to cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .carousel .carousel-item {
          display: none;
          opacity: 0;
          transition: opacity 1s ease-in-out;
        }

        .carousel .carousel-item.active {
          display: block;
          opacity: 1;
        }

        .carousel-section img {
          border-radius: 15px;
        }

        .carousel-item img {
          max-width: 100%;
          height: auto;
          object-fit: contain;
        }
      `}</style>
    </div>
  );
}

export default HomePage;

