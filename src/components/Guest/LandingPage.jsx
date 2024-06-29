
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dummyProductData from "../../data/data";
import productServices from "../../services/productService";
import { ResponsiveAppBarLandingPage } from "../AppBar/ResponsiveAppBarLandingPage";

function LandingPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [newReleasedProduct, setNewReleasedProduct] = useState({});
  const [hottestProduct, setHottestProduct] = useState({});
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
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
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = () => {
    if (isLogin) {
      navigate("/singleProduct");
    } else {
      window.alert("Not authorized. Please, login!");
      navigate("/login");
    }
  };

  const addSaleBadge = () => {
    const saleProducts = new Set();
    while (saleProducts.size < Math.min(products.length, 5)) {
      const randomIndex = Math.floor(Math.random() * products.length);
      saleProducts.add(randomIndex);
    }
    return Array.from(saleProducts);
  };

  const saleProducts = addSaleBadge();

  const addNormalBadge = () => {
    const normalProducts = new Set();
    while (normalProducts.size < Math.min(products.length, 5)) {
      const randomIndex = Math.floor(Math.random() * products.length);
      normalProducts.add(randomIndex);
    }
    return Array.from(normalProducts);
  };

  const normalProducts = addNormalBadge();

  return (
    <div
      style={{
        backgroundColor: "#b2d5f5",
        color: "black",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <ResponsiveAppBarLandingPage />
      <div
        style={{
          backgroundColor: "#b2d5f5",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <div className="carousel w-full h-90 carousel-section">
          <div id="item1" className="carousel-item w-full active">
            <img
              src="/images/slider1.jpg"
              className="w-full h-full object-contain rounded-lg"
              alt="slider1"
            />
          </div>
          <div id="item2" className="carousel-item w-full">
            <img
              src="/images/slider2.jpg"
              className="w-full h-full object-contain rounded-lg"
              alt="slider2"
            />
          </div>
          <div id="item3" className="carousel-item w-full">
            <img
              src="/images/slider3.jpg"
              className="w-full h-full object-contain rounded-lg"
              alt="slider3"
            />
          </div>
        </div>
        <div className="flex justify-center w-full py-2 gap-2">
          <a href="#item1" className="btn btn-xs btn-secondary">
            1
          </a>
          <a href="#item2" className="btn btn-xs btn-secondary">
            2
          </a>
          <a href="#item3" className="btn btn-xs btn-secondary">
            3
          </a>
        </div>

  

        <div className="card lg:card-side bg-base-100 shadow-xl single-row-card mt-6">
          <figure>
            <img
              src={`https://localhost:3005/product/${newReleasedProduct.picture}`}
              className="object-contain rounded-lg h-150 ml-6"
              alt="New Released"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-4xl font-bold mb-4">
              Fresh Goods!!
            </h2>
            <p className="justify-center">{newReleasedProduct.description}</p>
            <div className="card-actions justify-end">
              <Button
                onClick={handleAddToCart}
                variant="contained"
                startIcon={<AddShoppingCartIcon />}
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>


        <div className="allProductsView">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="card bg-base-100 shadow-xl m-4 relative"
              >
                <figure className="relative">
                  <img
                    className="mt-4 object-cover w-full h-36 rounded-lg"
                    src={`https://localhost:3005/product/${product.picture}`}
                    alt="Product"
                  />
               
                
                </figure>
                <div className="card-body">
                  <h2 style={{fontWeight:"bold"}}>{product.name}</h2>
                  <p>{product.description.substring(0, 99)}...</p>
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1">
                    
                    <Button
                      className="m-2"
                      onClick={handleAddToCart}
                      variant="contained"
                      style={{ textTransform: 'none' }}
                    >
                      Add to cart
                    </Button>
                  </div>
                  <div className="card-actions justify-center mt-2">
                    <div className="badge badge-outline badge-info p-4 bg-blue-500 text-white">
                      {product.category}
                    </div>
                   
                    <div className="badge badge-outline badge-info p-4 bg-green-500 text-white">
                      Rs {product.price}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        
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

        .single-row-card img {
          border-radius: 15px;
        }
      `}</style>
    </div>
  );
}

export default LandingPage;
