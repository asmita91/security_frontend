


import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import productServices from "../../services/productService";
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
  const [allProducts, setAllProducts] = useState([]);
  const [page, setPage] = useState(0); // For pagination
  const [rowsPerPage, setRowsPerPage] = useState(2); // Default rows per page
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

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

  useEffect(() => {
    productServices
      .getAllProudcts()
      .then((res) => setAllProducts(res.data))
      .catch((err) => window.alert(err.response.data.error));
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleProductDelete = (id) => {
    productServices
      .deleteProduct(id)
      .then((res) => {
        const otherProducts = allProducts.filter((item) => item.id !== id);
        setAllProducts(otherProducts);

        setSnack({
          type: "success",
          message: "Product deleted successfully.",
        });
        setOpen(true);
        setOpenDialog(false);
      })
      .catch((err) => {
        setSnack({
          type: "error",
          message: err.response.data.error,
        });
        setOpen(true);
        setOpenDialog(false);
      });
  };

  const handleClickOpenDialog = (id) => {
    setSelectedProductId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
        <h1 className="text-3xl font-bold">Pet Goods</h1>

        <TableContainer component={Paper} className="mt-6">
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Stock</StyledTableCell>
                <StyledTableCell align="right">Description</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allProducts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item) => (
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

                    <StyledTableCell align="right">
                      {item.totalStockNumber}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {item.description.length > 120
                        ? `${item.description.substring(0, 120)}...`
                        : item.description}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button
                        onClick={() => navigate(`/editProduct/${item.id}`)}
                        style={{ color: "blue", textTransform: "none" }}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleClickOpenDialog(item.id)}
                        style={{ color: "red", textTransform: "none" }}
                      >
                        Delete
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[2, 4, 10]}
          component="div"
          count={allProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this product? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleProductDelete(selectedProductId)}
            color="secondary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <MySnackbar
        open={open}
        handleClose={handleClose}
        type={snack.type}
        message={snack.message}
      />
    </div>
  );
};
