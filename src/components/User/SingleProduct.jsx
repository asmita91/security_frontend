

import { jwtDecode } from "jwt-decode";
import { Box, Card, CardContent, Typography, Avatar } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import { Alert, Button, IconButton, Input, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import sound from "../../assets/sound.wav";
import productServices from "../../services/productService";
import { useAuth } from "../../utils/authContext";
import { usePurchase } from "../../utils/purchaseContext";
import sanitizeInput from "../../utils/sanitizationInput";
import { useUser } from "../../utils/userContext";
import { ResponsiveAppBarHomepage } from "../AppBar/ResponsiveAppBarHomepage";
import { ResponsiveAppBarLandingPage } from "../AppBar/ResponsiveAppBarLandingPage";

function SingleProduct() {
  const purchase = usePurchase();
  const auth = useAuth();
  const navigate = useNavigate();
  const user = useUser();

  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);

  const [isUserLogin, setIsUserLogin] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [showReviewInput, setShowReviewInput] = useState(false);
  const [snack, setSnack] = useState({
    type: "",
    message: "",
  });
  const [userId, setUserId] = useState("");
  const [edit, setEdit] = useState({
    isEdit: false,
    reviewId: "",
    text: "",
  });

  const [open, setOpen] = React.useState(false);
  const [quantityError, setQuantityError] = useState(""); // State to track quantity error

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (window.localStorage.getItem("token") !== "" || auth.email) {
      setIsUserLogin(true);
      setUserId(user.user.id);
    }

    productServices
      .getSingleProductById(productId)
      .then((res) => {
        setProduct(res.data);
        productServices
          .getAllReviews(productId)
          .then((res) => {
            setReviews(res.data);
          })
          .catch((err) => window.alert(err.response.data.error));
      })
      .catch((err) => window.alert(err.response.data.error));
  }, []);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    if (quantity >= 8) setQuantity(8);
    if (quantityError) setQuantityError(""); // Clear error on valid quantity
  };

  const handleDecrement = () => {
    setQuantity(quantity - 1);
    if (quantity <= 0) setQuantity(0);
    if (quantityError) setQuantityError(""); // Clear error on valid quantity
  };

  const play = () => new Audio(sound).play();

  const handleAddToCart = async (e) => {
    e.preventDefault();

    if (quantity === 0) {
      setQuantityError("Please select a quantity."); // Set error message
      return;
    }

    try {
      // Decode the token to get the user ID
      const token = localStorage.getItem("token"); // or sessionStorage
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      // Add the product to the cart using the decoded user ID
      console.log("Adding product to cart:", {
        userId,
        productId: product.id,
        quantity,
      });
      const response = await productServices.addToCart({
        userId,
        productId: product.id,
        quantity,
      });
      console.log("Product added to cart response:", response);

      // Show success notification
      setSnack({
        type: "success",
        message: "This product added to the cart!",
      });
      play();
      setOpen(true);
      setQuantity(0);

      // Fetch the updated cart and update the purchase context
      const updatedCart = await productServices.getCart(userId);
      purchase.setPurchase(updatedCart);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      setSnack({
        type: "error",
        message: "Failed to add product to cart.",
      });
      setOpen(true);
    }
  };

  // const handleReview = (e) => {
  //   e.preventDefault();
  //   if (!isUserLogin) {
  //     play();
  //     setSnack({ type: "error", message: "Please, login to write a review!" });
  //     setOpen(true);
  //     return;
  //   }

  //   if (feedback === "") {
  //     play();
  //     setSnack({ type: "error", message: "Please, write a review!" });
  //     setOpen(true);
  //     return;
  //   }

  //   const sanitizedReviewInput = sanitizeInput(feedback);
  //   const addedReview = { text: sanitizedReviewInput };

  //   productServices
  //     .addReview(productId, addedReview)
  //     .then((res) => {
  //       play();
  //       setSnack({ type: "success", message: "Review added successfully!" });
  //       setOpen(true);
  //       setFeedback("");
  //       setShowReviewInput(false);

  //       // Fetch reviews again to refresh the list
  //       productServices
  //         .getAllReviews(productId)
  //         .then((res) => {
  //           setReviews(res.data);
  //         })
  //         .catch((err) => window.alert(err.response.data.error));
  //     })
  //     .catch((err) => {
  //       play();
  //       setSnack({
  //         type: "error",
  //         message: `${err.response.data.error} It does not support HTML tags.`,
  //       });
  //       setOpen(true);
  //     });
  // };


  const handleReview = (e) => {
    e.preventDefault();
    if (!isUserLogin) {
      play();
      setSnack({ type: "error", message: "Please, login to write a review!" });
      setOpen(true);
      return;
    }
  
    try {
      if (feedback === "") {
        throw new Error("Please, write a review!");
      }
  
      const sanitizedReviewInput = sanitizeInput(feedback);
      const addedReview = { text: sanitizedReviewInput };
  
      productServices
        .addReview(productId, addedReview)
        .then((res) => {
          play();
          setSnack({ type: "success", message: "Review added successfully!" });
          setOpen(true);
          setFeedback("");
          setShowReviewInput(false);
  
          // Fetch reviews again to refresh the list
          productServices
            .getAllReviews(productId)
            .then((res) => {
              setReviews(res.data);
            })
            .catch((err) => window.alert(err.response.data.error));
        })
        .catch((err) => {
          play();
          setSnack({
            type: "error",
            message: `${err.response.data.error} It does not support HTML tags.`,
          });
          setOpen(true);
        });
    } catch (err) {
      // Handle the error thrown by sanitizeInput
      play();
      setSnack({ type: "error", message: err.message });
      setOpen(true);
    }
  };
  
  const handleEdit = () => {
    const editedReview = { text: edit.text };

    productServices
      .updateReview(productId, edit.reviewId, editedReview)
      .then((res) => {
        play();
        setSnack({ type: "success", message: "Review updated successfully!" });
        setOpen(true);

        const updatedReview = reviews.map((review) =>
          review._id === edit.reviewId ? { ...review, text: edit.text } : review
        );
        setReviews(updatedReview);
        setEdit({ isEdit: false, reviewId: "", text: "" });
        setFeedback("");
      })
      .catch((err) => {
        play();
        setSnack({ type: "error", message: err.response.data.error });
        setOpen(true);
      });
  };

  const handleDelete = (reviewId) => {
    const confirmation = window.confirm("Are you sure to delete this review?");
    if (!confirmation) return;

    productServices
      .deleteReview(productId, reviewId)
      .then((res) => {
        play();
        setSnack({
          type: "success",
          message: "Review deleted successfully!",
        });
        setOpen(true);

        const updatedReview = reviews.filter(
          (review) => review._id !== reviewId
        );
        setReviews(updatedReview);
      })
      .catch((err) => {
        play();
        setSnack({ type: "error", message: err.response.data.error });
        setOpen(true);
      });
  };

  return (
    <div
      style={{
        backgroundColor: "#b2d5f5",
        color: "black",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {isUserLogin ? (
        <ResponsiveAppBarHomepage
          purchaseProductLength={purchase.purchase.length}
        />
      ) : (
        <ResponsiveAppBarLandingPage />
      )}

      <div className="hero min-h-screen" style={{ padding: "20px" }}>
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={`https://localhost:3005/product/${product.picture}`}
            className="max-w-sm rounded-lg shadow-2xl"
            alt={product.name}
          />
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="py-6">{product.description}</p>
            <p className="text-bold mb-3" style={{ color: "green" }}>
              Price: Rs {product.price}
            </p>
            {isUserLogin && (
              <>
                <button
                  onClick={handleDecrement}
                  className="btn btn-outline mr-4"
                >
                  -
                </button>
                Quantity: {quantity}
                <button
                  onClick={handleIncrement}
                  className="btn btn-outline ml-4"
                >
                  +
                </button>
                <br />
                {quantityError && (
                  <div className="text-sm mt-1 mb-2" style={{ color: "red" }}>
                    {quantityError}
                  </div>
                )}
                <button
                  className="btn mt-8 mb-8"
                  onClick={handleAddToCart}
                  style={{ backgroundColor: "#000000", color: "white" }}
                >
                  Add to Cart
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <hr />

      <div
        className="reviews-section m-10"
        style={{ color: "black", padding: "20px" }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: "bold",
            marginBottom: 3,
            textAlign: "center",
          }}
        >
          Customer Reviews
        </Typography>
        <div className="view-reviews">
          {reviews && reviews.length > 0 ? (
            reviews.map((review) => (
              <Card
                key={review._id}
                sx={{
                  marginBottom: 3,
                  boxShadow: 3,
                  borderRadius: 2,
                  backgroundColor: "#f9f9f9",
                  position: "relative",
                }}
              >
                <CardContent sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    alt={review.userName}
                    src={`https://localhost:3005/profile/${review.userPicture}`}
                    sx={{
                      width: 50,
                      height: 50,
                      marginRight: 2,
                      border: "2px solid #003366",
                    }}
                  />
                  <Box>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "bold", color: "#003366" }}
                    >
                      {review.userName}
                    </Typography>
                    <Typography variant="body2">{review.text}</Typography>
                  </Box>
                  {review.userId === userId && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        display: "flex",
                        gap: 1,
                      }}
                    >
                      <IconButton
                        onClick={() =>
                          setEdit({
                            isEdit: true,
                            reviewId: review._id,
                            text: review.text,
                          })
                        }
                      >
                        <EditIcon color="primary" />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(review._id)}>
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Box>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary" sx={{ textAlign: "center" }}>
              No Reviews
            </Typography>
          )}
        </div>
        <Button
        style={{backgroundColor:"black",   textTransform: "none",}}
          variant="contained"
          onClick={() => setShowReviewInput(!showReviewInput)}
        
        >
          {showReviewInput  ? "Cancel" : "Add comment"}
        </Button>
      
        {showReviewInput && (
          <div className="send-review-section mt-4" style={{ textAlign: "center" }}>
            <Input
              type="text"
              placeholder="Write a comment ..."
              onChange={
                edit.isEdit
                  ? (e) => setEdit({ ...edit, text: e.target.value })
                  : (e) => setFeedback(e.target.value)
              }
              value={edit.isEdit ? edit.text : feedback}
              className="input input-bordered text-2xl w-1/2"
              style={{ color: "black", marginBottom: "20px" }}
              endAdornment={
                edit.isEdit ? (
                  <span className="input-icon">
                    <IconButton onClick={handleEdit} style={{ color: "#003366" }}>
                      <EditIcon />
                    </IconButton>
                  </span>
                ) : (
                  <span className="input-icon">
                    <IconButton
                      onClick={handleReview}
                      style={{ color: "#003366" }}
                    >
                      <SendIcon />
                    </IconButton>
                  </span>
                )
              }
            />
          </div>
        )}
      </div>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={snack.type}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SingleProduct;