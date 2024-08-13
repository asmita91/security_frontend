
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { Button, IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import sound from "../../assets/sound.wav";
import productServices from "../../services/productService";
import { usePurchase } from "../../utils/purchaseContext";
import { AdminAppBar } from "../AppBar/AdminAppBar";
import { MySnackbar } from "../reusbles/snackbar";

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

export const ViewAllProducts = () => {
  const purchase = usePurchase();
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    productServices
      .getAllProudcts()
      .then((res) => setAllProducts(res.data))
      .catch((err) => window.alert(err.response.data.error));
  }, []);

  const handleProductDelete = (e, id) => {
    e.preventDefault();

    const confirm = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirm) {
      productServices
        .deleteProduct(id)
        .then((res) => {
          const otherProducts = allProducts.filter((item) => item.id !== id);
          setAllProducts(otherProducts);

          play();
          setSnack({
            type: "success",
            message: "Product deleted successfully.",
          });
          setOpen(true);
        })
        .catch((err) => {
          play();
          setSnack({
            type: "error",
            message: err.response.data.error,
          });
          setOpen(true);
        });
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
      <AdminAppBar />

      <div className="m-12">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">All Products List</h1>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "#003366",
              color: "white",
              "&:hover": { backgroundColor: "#002244" },
            }}
            onClick={() => navigate("/addProduct")}
          >
            Add Product
          </Button>
        </div>

        <TableContainer component={Paper} className="mt-6">
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Price</StyledTableCell>
                <StyledTableCell align="right">Category</StyledTableCell>
                <StyledTableCell align="right">Stock</StyledTableCell>
                <StyledTableCell align="right">Description</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allProducts.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell component="th" scope="row">
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={`https://localhost:3005/product/${item.picture}`}
                            alt="Product"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{item.name}</div>
                      </div>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="right">{item.price}</StyledTableCell>
                  <StyledTableCell align="right">
                    {item.category}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.totalStockNumber}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.description.length > 30
                      ? `${item.description.substring(0, 30)}...`
                      : item.description}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton
                      onClick={() => navigate(`/editProduct/${item.id}`)}
                      style={{ color: "blue" }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={(e) => handleProductDelete(e, item.id)}
                      style={{ color: "red" }}
                    >
                      <DeleteForeverIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <MySnackbar
        open={open}
        handleClose={handleClose}
        type={snack.type}
        message={snack.message}
      />
    </div>
  );
};
