


import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { jwtDecode } from "jwt-decode";
import KhaltiCheckout from "khalti-checkout-web";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import keys from "../../services/khaltiSecrets";
import productServices from "../../services/productService";
import { usePurchase } from "../../utils/purchaseContext";
import { ResponsiveAppBarHomepage } from "../AppBar/ResponsiveAppBarHomepage";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#003366",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const PurchaseCart = () => {
  const purchase = usePurchase();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        const response = await productServices.getCart(userId);
        setCartItems(response.data.cart);
        calculateTotalPrice(response.data.cart);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const handleKhaltiPayment = (e) => {
    e.preventDefault();

    let config = {
      publicKey: keys.publicTestKey,
      productIdentity: "1234567890",
      productName: "pawzzz",
      productUrl: "https://localhost:3005/",

      eventHandler: {
        onSuccess(payload) {
          console.log(payload);
          handlePayAndPurchase();
        },
        onError(error) {
          console.log(error);
          window.alert("Payment failed!");
        },
        onClose() {
          console.log("widget is closing");
        },
      },
      paymentPreference: [
        "KHALTI",
        "EBANKING",
        "MOBILE_BANKING",
        "CONNECT_IPS",
        "SCT",
      ],
    };

    let checkout = new KhaltiCheckout(config);
    checkout.show({ amount: 200 * 100 }); // Rs 200 is passed here for Khalti payment
  };

  const handleDeleteClick = (productId) => {
    setSelectedProductId(productId);
    setDialogOpen(true);
  };

  const handleDeleteFromCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      await productServices.deleteFromCart(userId, selectedProductId);
      const updatedCart = await productServices.getCart(userId);
      setCartItems(updatedCart.data.cart);
      calculateTotalPrice(updatedCart.data.cart);
      setDialogOpen(false);
    } catch (error) {
      console.error("Error deleting item from cart:", error);
      window.alert("Failed to remove item from cart");
    }
  };

  const handlePayAndPurchase = async () => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      // Fetch the cart and decrypt it
      const response = await productServices.getCart(userId);
      const cartItems = response.data.cart;

      // Ensure cart items have all the required fields
      const cartItemsWithDetails = cartItems.map((item) => {
        if (!item.product.name || !item.product.price) {
          throw new Error("Product name or price is missing");
        }
        return {
          product: item.product._id, // Store the product ID
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
        };
      });

      // Calculate total price again just to be sure
      const calculatedTotalPrice = cartItemsWithDetails.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const purchaseProduct = {
        items: cartItemsWithDetails,
        totalPrice: calculatedTotalPrice,
        payment: "success",
      };

      // Send the purchase data to the backend
      await productServices.purchaseProduct(purchaseProduct);

      // Clear the cart after a successful purchase
      await productServices.clearCart(userId);

      // Clear the frontend state
      purchase.setPurchase([]);
      setCartItems([]);
      setTotalPrice(0);

      setPurchaseDialogOpen(true); // Open the purchase confirmation dialog
    } catch (err) {
      window.alert(err.message || err.response.data.error);
    }
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
      <ResponsiveAppBarHomepage purchaseProductLength={cartItems.length} />
      <h1 className="text-3xl m-10 font-bold">Cart Items</h1>

      <TableContainer component={Paper} className="mt-6">
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Quantity</StyledTableCell>
              <StyledTableCell align="right">Price per piece</StyledTableCell>
              <StyledTableCell align="right">Total Price</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <StyledTableRow key={item.product._id}>
                <StyledTableCell component="th" scope="row">
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={`https://localhost:3005/product/${item.product.picture}`}
                          alt="Product"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.product.name}</div>
                    </div>
                  </div>
                </StyledTableCell>
                <StyledTableCell align="right">{item.quantity}</StyledTableCell>
                <StyledTableCell align="right">
                  {item.product.price}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {item.product.price * item.quantity}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton
                    onClick={() => handleDeleteClick(item.product._id)}
                    sx={{ color: "red" }}
                    aria-label="remove from cart"
                  >
                    <DeleteIcon />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <tfoot>
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell />
              <StyledTableCell align="right" className="text-2xl font-bold">
                Total Price: Rs {totalPrice}
              </StyledTableCell>
            </TableRow>
          </tfoot>
        </Table>
      </TableContainer>

      {cartItems.length > 0 ? (
        <>
          <div className="">
            Rs {totalPrice}/- is being treated as equivalent to Rs 200.
          </div>
          <Button
            className="w-wide"
            onClick={handleKhaltiPayment}
            variant="contained"
            startIcon={<ShoppingCartCheckoutIcon />}
            sx={{
              backgroundColor: "#000000",
              textTransform:"none",
              color: "white",
              "&:hover": { backgroundColor: "#002244" },
            }}
          >
            Buy Now
          </Button>
        </>
      ) : (
        <div className="text-bold mt-2">No product in the purchase</div>
      )}

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to remove this item from the cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            No
          </Button>
          <Button
            onClick={handleDeleteFromCart}
            color="primary"
            autoFocus
            sx={{ color: "red" }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

     

<Dialog
  open={purchaseDialogOpen}
  onClose={() => setPurchaseDialogOpen(false)}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
  PaperProps={{
    style: {
      backgroundColor: "#e6f7ff", // Soft blue background color
      color: "#004085", // Darker text color for contrast
      borderRadius: "20px", // Rounded corners for a smoother appearance
      padding: "30px", // Extra padding for a more spacious feel
    },
  }}
>
  <DialogTitle
    id="alert-dialog-title"
    sx={{
      fontSize: "1.2rem",
      fontWeight: "bold",
      textAlign: "center",
      color: "#004085", // Matching the dark text color
    }}
  >
    {"🎉 Purchase Successful!"}
  </DialogTitle>
  <DialogContent
    sx={{
      textAlign: "center", // Center-align the content
      padding: "10px 0", // Padding for the text
    }}
  >
    <DialogContentText
      id="alert-dialog-description"
      sx={{
        fontSize: "1rem",
        color: "#333333", // A neutral color for the text
      }}
    >
      Your purchase was successful! You will be redirected to the homepage.
    </DialogContentText>
   
  </DialogContent>
  <DialogActions sx={{ justifyContent: "center" }}>
    <Button
      onClick={() => {
        setPurchaseDialogOpen(false);
        navigate("/home");
      }}
      sx={{
        backgroundColor: "#28a745", // Green background color to signify success
        color: "#ffffff", // White text for contrast
        textTransform: "none",
        "&:hover": {
          backgroundColor: "#218838", // Darker green on hover
        },
        fontWeight: "bold",
        padding: "10px 30px", // Increase padding for a more prominent button
      }}
      autoFocus
    >
      OK
    </Button>
  </DialogActions>
</Dialog>

    </div>
  );
};
