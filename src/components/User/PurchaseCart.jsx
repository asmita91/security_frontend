
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Button, IconButton } from "@mui/material";
import KhaltiCheckout from "khalti-checkout-web";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import keys from "../../services/khaltiSecrets";
import productServices from "../../services/productService";
import { usePurchase } from "../../utils/purchaseContext";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ResponsiveAppBarHomepage } from "../AppBar/ResponsiveAppBarHomepage";
import {jwtDecode} from "jwt-decode"; 
import DeleteIcon from "@mui/icons-material/Delete";

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

  const handleDeleteFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      await productServices.deleteFromCart(userId, productId);
      const updatedCart = await productServices.getCart(userId);
      setCartItems(updatedCart.data.cart);
      calculateTotalPrice(updatedCart.data.cart);
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
      const cartItemsWithDetails = cartItems.map(item => {
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
      window.alert("Purchase successfully!");
  
      // Clear the cart after a successful purchase
      await productServices.clearCart(userId);
  
      // Clear the frontend state
      purchase.setPurchase([]);
      setCartItems([]);
      setTotalPrice(0);
      navigate("/home");
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
                <StyledTableCell align="right">{item.product.price}</StyledTableCell>
                <StyledTableCell align="right">
                  {item.product.price * item.quantity}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton
                    onClick={() => handleDeleteFromCart(item.product._id)}
                    color="secondary"
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
          <div className="text-info">
            Note: Rs {totalPrice}/- is equivalent to Rs 200 because of Khalti
            test-mode payment limitation.
          </div>
          <Button
            className="w-wide"
            onClick={handleKhaltiPayment}
            variant="contained"
            startIcon={<ShoppingCartCheckoutIcon />}
            sx={{
              backgroundColor: "#003366",
              color: "white",
              "&:hover": { backgroundColor: "#002244" },
            }}
          >
            Pay and Purchase Now
          </Button>
        </>
      ) : (
        <div className="text-bold mt-2">No product in the purchase</div>
      )}
    </div>
  );
};
