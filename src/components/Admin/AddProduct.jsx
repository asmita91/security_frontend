

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import DOMPurify from "dompurify";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import sound from "../../assets/sound.wav";
import productServices from "../../services/productService";
import userServices from "../../services/userService";
import { AdminAppBar } from "../AppBar/AdminAppBar";
import { MySnackbar } from "../reusbles/snackbar";

export const AddProduct = () => {
  const navigate = useNavigate();

  const [imageName, setImageName] = useState("productDefaultImage.png");
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({});
  const [productId, setProductId] = useState("");

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productStock, setProductStock] = useState("");

  const [snack, setSnack] = useState({
    type: "",
    message: "",
  });
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const play = () => new Audio(sound).play();

  const handleUpload = (productId) => {
    if (!file) {
      play();
      setSnack({
        type: "error",
        message: "Please, select a file",
      });
      setOpen(true);
      return;
    }

    userServices
      .uploadProductImage(productId, file)
      .then((res) => {
        setUser({ ...user, picture: res.data.filename });

        play();
        setSnack({
          type: "success",
          message: "Product picture added successfully",
        });
        setOpen(true);

        setFile(null);
      })
      .catch((err) => {
        play();
        setSnack({
          type: "error",
          message: err.response.data.error,
        });
        setOpen(true);
      });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    const sanitizedProductName = DOMPurify.sanitize(productName.trim());
    const sanitizedProductDescription = DOMPurify.sanitize(
      productDescription.trim()
    );
    const sanitizedProductCategory = DOMPurify.sanitize(productCategory);

    if (
      sanitizedProductName === "" ||
      sanitizedProductCategory === "" ||
      sanitizedProductDescription === "" ||
      isNaN(productPrice) ||
      productPrice < 100 ||
      isNaN(productStock) ||
      productStock <= 0
    ) {
      play();
      setSnack({
        type: "error",
        message:
          "All fields are required and must be valid. Price must be at least 100.",
      });
      setOpen(true);
      return;
    }

    const product = {
      name: sanitizedProductName,
      price: parseFloat(productPrice),
      description: sanitizedProductDescription,
      category: sanitizedProductCategory,
      totalStockNumber: parseInt(productStock, 10),
    };

    productServices
      .addProduct(product)
      .then((res) => {
        const newProductId = res.data.id;
        setProductId(newProductId);

        play();
        setSnack({
          type: "success",
          message: "Product added successfully",
        });
        setOpen(true);

        handleUpload(newProductId);

        setTimeout(() => {
          navigate("/viewAllProducts");
        }, 2000);

        setProductName("");
        setProductPrice("");
        setProductDescription("");
        setProductCategory("");
        setProductStock("");
      })
      .catch((err) => {
        play();
        setSnack({
          type: "error",
          message: err.response.data.error,
        });
        setOpen(true);
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      setImageName(URL.createObjectURL(file));
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#b2d5f5",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <AdminAppBar />
      <div className="flex justify-center items-center">
        <div className="w-full max-w-[550px] bg-white p-10 rounded-lg">
          <div className="mx-auto pt-10">
            <div
              style={{
                padding: "20px",
                borderRadius: "8px",
                backgroundColor: "white",
                color: "black",
                fontSize: "1rem",
                marginTop: "-2rem",
              }}
              align="center"
            >
              <div className="text-3xl font-bold" style={{ fontSize: "2rem" }}>
                Add Product
              </div>
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate("/viewAllProducts")}
                sx={{
                  color: "#003366",
                  "&:hover": { color: "#002244" },
                  marginBottom: "0rem",
                  justifyContent: "flex-start",
                }}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  textTransform: "none",
                  paddingLeft: "0",
                }}
              >
                Back to Products
              </Button>
              <div className="product-fields mt-2">
                <form onSubmit={handleAddProduct}>
                  <div className="mt-1" style={{ marginBottom: "1rem" }}>
                    <div className="mt-1 mb-1 text-left text-black">Name:</div>
                    <input
                      type="text"
                      placeholder="Enter product name here ..."
                      onChange={(e) => setProductName(e.target.value)}
                      value={productName}
                      className="input w-full"
                      required
                      style={{
                        fontSize: "1rem",
                        color: "black",
                        borderColor: "grey",
                      }}
                    />
                  </div>
                  <div className="mt-1" style={{ marginBottom: "1rem" }}>
                    <div className="mt-1 mb-1 text-left text-black">Price:</div>
                    <input
                      type="number"
                      placeholder="Enter product price here ..."
                      onChange={(e) => setProductPrice(e.target.value)}
                      value={productPrice}
                      className="input input-bordered  w-full"
                      required
                      style={{
                        fontSize: "1rem",
                        color: "black",
                        borderColor: "grey",
                      }}
                      min="100"
                      step="0.01"
                    />
                  </div>
                  <div className="mt-1">
                    <div className="mt-1 mb-1 text-left text-black">
                      Stock Quantity:
                    </div>
                    <input
                      type="number"
                      placeholder="Enter stock quantity here ..."
                      onChange={(e) => setProductStock(e.target.value)}
                      value={productStock}
                      className="input input-bordered w-full"
                      required
                      style={{
                        fontSize: "1rem",
                        color: "black",
                        borderColor: "grey",
                      }}
                      min="0"
                    />
                  </div>
                  <div
                    className="mt-1"
                    style={{
                      marginBottom: "1rem",
                      borderColor: "grey",
                      borderStyle: "solid",
                      borderRadius: "4px",
                    }}
                  >
                    <div className="mt-3 mb-2 text-left text-black">
                      Category:
                    </div>
                    <select
                      className="select w-full max-w-xs"
                      onChange={(e) => setProductCategory(e.target.value)}
                      value={productCategory}
                      required
                      style={{
                        fontSize: "1rem",
                        color: "black",
                        borderColor: "grey",
                      }}
                    >
                      <option
                        disabled
                        value=""
                        style={{ fontSize: "1rem", color: "black" }}
                      >
                        Choose product category
                      </option>
                      <option
                        value="Toys"
                        style={{ fontSize: "1rem", color: "black" }}
                      >
                        Toys
                      </option>
                      <option
                        value="Clothes"
                        style={{ fontSize: "1rem", color: "black" }}
                      >
                        Clothes
                      </option>
                      <option
                        value="Food"
                        style={{ fontSize: "1rem", color: "black" }}
                      >
                        Food
                      </option>
                      <option
                        value="Others"
                        style={{ fontSize: "1rem", color: "black" }}
                      >
                        Others
                      </option>
                    </select>
                  </div>
                  <div className="mt-1" style={{ marginBottom: "0rem" }}>
                    <div className="mt-1 mb-2 text-left text-black">
                      Description:
                    </div>
                    <textarea
                      className="textarea textarea-lg w-full"
                      placeholder="Write product description here ..."
                      onChange={(e) => setProductDescription(e.target.value)}
                      value={productDescription}
                      required
                      style={{
                        fontSize: "1rem",
                        color: "black",
                        borderColor: "grey",
                      }}
                    ></textarea>
                  </div>

                  <div className="mt-1" style={{ marginBottom: "1rem" }}>
                    <div className="mt-1 mb-2 text-left text-black">
                      Product Image:
                    </div>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      required
                      style={{
                        fontSize: "1rem",
                        color: "black",
                        borderColor: "blue",
                      }}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    sx={{
                      backgroundColor: "#003366",
                      color: "white",
                      "&:hover": { backgroundColor: "#002244" },
                    }}
                    className="mb-4"
                  >
                    Add Product
                  </Button>
                </form>
              </div>

              {file && (
                <div className="avatar">
                  <div className="w-60 rounded m-10">
                    <img src={imageName} alt="Product" />
                  </div>
                </div>
              )}

              <MySnackbar
                open={open}
                handleClose={handleClose}
                type={snack.type}
                message={snack.message}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
