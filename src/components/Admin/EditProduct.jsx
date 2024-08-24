

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import UploadRounded from "@mui/icons-material/UploadRounded";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import sound from "../../assets/sound.wav";
import productServices from "../../services/productService";
import userServices from "../../services/userService";
import { AdminAppBar } from "../AppBar/AdminAppBar";
import { MySnackbar } from "../reusbles/snackbar";

export const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [imageName, setImageName] = useState("productDefaultImage.png");
  const [file, setFile] = useState(null);
  const [product, setProduct] = useState({});

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productStock, setProductStock] = useState("");

  const [nameError, setNameError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [stockError, setStockError] = useState("");
  const [fileError, setFileError] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false); // Dialog state
  const [snack, setSnack] = useState({
    type: "",
    message: "",
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    productServices
      .getSingleProductById(productId)
      .then((res) => {
        setProduct(res.data);
        setImageName(res.data.picture);
        setProductName(res.data.name);
        setProductPrice(res.data.price);
        setProductDescription(res.data.description);
        setProductCategory(res.data.category);
        setProductStock(res.data.totalStockNumber);
      })
      .catch((err) => window.alert(err.response.data.error));
  }, [productId]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const play = () => new Audio(sound).play();

  const handleNameChange = (e) => {
    const value = e.target.value;
    setProductName(value);
    if (value.trim() === "") {
      setNameError("Product name is required.");
    } else {
      setNameError("");
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setProductPrice(value);
    if (isNaN(value) || value < 100) {
      setPriceError("Price must be a number and at least 100.");
    } else {
      setPriceError("");
    }
  };

  const handleStockChange = (e) => {
    const value = e.target.value;
    setProductStock(value);
    if (isNaN(value) || value <= 0) {
      setStockError("Stock quantity must be a positive number.");
    } else {
      setStockError("");
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setProductCategory(value);
    if (value === "") {
      setCategoryError("Product category is required.");
    } else {
      setCategoryError("");
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setProductDescription(value);
    if (value.trim() === "") {
      setDescriptionError("Product description is required.");
    } else {
      setDescriptionError("");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && ["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      setFile(file);
      setImageName(URL.createObjectURL(file));
      setFileError(""); // Clear error if file is valid
    } else {
      setFileError("Please upload a valid image file (PNG, JPEG, or JPG).");
      setSnack({
        type: "error",
        message: "Invalid file type selected. Please choose a PNG, JPEG, or JPG image.",
      });
      setOpen(true);
    }
  };

  const handleDialogOpen = (e) => {
    e.preventDefault();

    // Validate before opening the confirmation dialog
    let isValid = true;

    if (productName.trim() === "") {
      setNameError("Product name is required.");
      isValid = false;
    }
    if (productCategory === "") {
      setCategoryError("Product category is required.");
      isValid = false;
    }
    if (productDescription.trim() === "") {
      setDescriptionError("Product description is required.");
      isValid = false;
    }
    if (isNaN(productPrice) || productPrice < 100) {
      setPriceError("Price must be a number and at least 100.");
      isValid = false;
    }
    if (isNaN(productStock) || productStock <= 0) {
      setStockError("Stock quantity must be a positive number.");
      isValid = false;
    }
    if (!file) {
      setFileError("Product image is required.");
      isValid = false;
    } else if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      setFileError("Please upload a valid image file (PNG, JPEG, or JPG).");
      isValid = false;
    }

    if (isValid) {
      setDialogOpen(true);
    } else {
      play();
    }
  };

  const handleEditProduct = () => {
    const sanitizedProductName = DOMPurify.sanitize(productName.trim());
    const sanitizedProductDescription = DOMPurify.sanitize(
      productDescription.trim()
    );
    const sanitizedProductCategory = DOMPurify.sanitize(productCategory);

    const updatedProduct = {
      name: sanitizedProductName,
      price: parseFloat(productPrice),
      description: sanitizedProductDescription,
      category: sanitizedProductCategory,
      totalStockNumber: parseInt(productStock, 10),
    };

    productServices
      .editProduct(productId, updatedProduct)
      .then((res) => {
        play();
        setSnack({
          type: "success",
          message: "Product updated successfully",
        });
        setOpen(true);
        setDialogOpen(false);
        navigate("/viewAllProducts");
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

  const handleDialogClose = () => {
    setDialogOpen(false);
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
              <div className="text-3xl font-bold " style={{ fontSize: "1.5rem" }}>
                Edit Product
              </div>

              <div className="product-fields mt-2">
                <form onSubmit={handleDialogOpen}>
                  <div className="mt-1">
                    <div className="mt-1 mb-1 text-left text-black">Name:</div>
                    <input
                      type="text"
                      placeholder="Enter product name here ..."
                      onChange={handleNameChange}
                      value={productName}
                      className="input w-full"
                      style={{
                        fontSize: "1rem",
                        color: "#1f2937",
                        backgroundColor: "#e5e7eb",
                        borderRadius: "12px",
                        padding: "12px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        border: "1px solid #cbd5e1",
                      }}
                    />
                    {nameError && (
                      <div style={{ color: "red" }}>{nameError}</div>
                    )}
                  </div>
                  <div className="mt-1">
                    <div className="mt-1 mb-1 text-left text-black">Price:</div>
                    <input
                      type="number"
                      placeholder="Enter product price here ..."
                      onChange={handlePriceChange}
                      value={productPrice}
                      className="input input-bordered w-full"
                      style={{
                        fontSize: "1rem",
                        color: "#1f2937",
                        backgroundColor: "#e5e7eb",
                        borderRadius: "12px",
                        padding: "12px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        border: "1px solid #cbd5e1",
                      }}
                      min="100"
                      step="0.01"
                    />
                    {priceError && (
                      <div style={{ color: "red" }}>{priceError}</div>
                    )}
                  </div>
                  <div className="mt-1">
                    <div className="mt-1 mb-1 text-left text-black">
                      Stock Quantity:
                    </div>
                    <input
                      type="number"
                      placeholder="Enter stock quantity here ..."
                      onChange={handleStockChange}
                      value={productStock}
                      className="input input-bordered w-full"
                      style={{
                        fontSize: "1rem",
                        color: "#1f2937",
                        backgroundColor: "#e5e7eb",
                        borderRadius: "12px",
                        padding: "12px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        border: "1px solid #cbd5e1",
                      }}
                      min="0"
                    />
                    {stockError && (
                      <div style={{ color: "red" }}>{stockError}</div>
                    )}
                  </div>
                  <div className="mt-3 mb-2 text-left text-black">
                    Category:
                  </div>
                  <select
                    className="select w-full"
                    onChange={handleCategoryChange}
                    value={productCategory}
                    style={{
                      fontSize: "1rem",
                      color: "#1f2937",
                      backgroundColor: "#e5e7eb",
                      borderRadius: "12px",
                      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      border: "1px solid #cbd5e1",
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
                  {categoryError && (
                    <div style={{ color: "red" }}>{categoryError}</div>
                  )}

                  <div className="mt-1" style={{ marginBottom: "0rem" }}>
                    <div className="mt-1 mb-2 text-left text-black">
                      Description:
                    </div>
                    <textarea
                      className="textarea textarea-lg w-full"
                      placeholder="Write product description here ..."
                      onChange={handleDescriptionChange}
                      value={productDescription}
                      style={{
                        fontSize: "1rem",
                        color: "#1f2937",
                        backgroundColor: "#e5e7eb",
                        borderRadius: "12px",
                        padding: "12px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        border: "1px solid #cbd5e1",
                      }}
                    ></textarea>
                    {descriptionError && (
                      <div style={{ color: "red" }}>{descriptionError}</div>
                    )}
                  </div>

                  <div className="mt-1" style={{ marginBottom: "1rem" }}>
                    <div className="mt-1 mb-2 text-left text-black">
                      Product Image:
                    </div>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept="*"
                      style={{
                        fontSize: "1rem",
                        color: "black",
                        borderColor: "blue",
                      }}
                    />
                    {fileError && (
                      <div style={{ color: "red" }}>{fileError}</div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    variant="contained"
                    textTransform="none"
                    startIcon={<UploadRounded />}
                    sx={{
                      backgroundColor: "#000000",
                      color: "white",
                      textTransform: "none",
                      "&:hover": { backgroundColor: "#002244" },
                    }}
                    className="mb-4"
                  >
                    Edit Product
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

      {/* Confirmation Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Edit"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to edit this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            No
          </Button>
          <Button
            onClick={handleEditProduct}
            color="primary"
            autoFocus
            sx={{ color: "red" }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
