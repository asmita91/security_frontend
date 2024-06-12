// // import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// // import Button from "@mui/material/Button";
// // import React, { useEffect, useState } from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// // import sound from "../../assets/sound.wav";
// // import productServices from "../../services/productService";
// // import userServices from "../../services/userService";
// // import { ResponsiveAppBarHomepage } from "../AppBar/ResponsiveAppBarHomepage";
// // import { MySnackbar } from "../MySnackbar";

// // export const EditProduct = () => {
// //   const { productId } = useParams();

// //   const [imageName, setImageName] = useState("productDefaultImage.png");
// //   const [file, setFile] = useState(null);
// //   const [user, setUser] = useState({});
// //   const [product, setProduct] = useState({});
// //   const navigate = useNavigate();

// //   // fields for products
// //   const [productName, setProductName] = useState("");
// //   const [productPrice, setProductPrice] = useState(0);
// //   const [productDescription, setProductDescription] = useState("");
// //   const [productCategory, setProductCategory] = useState("");
// //   const [productStock, setProductStock] = useState(0);

// //   useEffect(() => {
// //     // get product data from the server
// //     productServices
// //       .getSingleProductById(productId)
// //       .then((res) => {
// //         console.log(`Found product for editing : ${res.data}`);

// //         // store the product data in the product state
// //         setProduct(res.data);

// //         const response = res.data;
// //         setImageName(response.picture);

// //         // store the product data in the respective states
// //         setProductName(response.name);
// //         setProductPrice(response.price);
// //         setProductDescription(response.description);
// //         setProductCategory(response.category);
// //         setProductStock(response.totalStockNumber);
// //       })
// //       .catch((err) => window.alert(err.response.data.error));
// //   }, []);

// //   const [snack, setSnack] = useState({
// //     type: "",
// //     message: "",
// //   });
// //   // for open and close snackbar
// //   const [open, setOpen] = React.useState(false);

// //   // for closing snackbar
// //   const handleClose = (event, reason) => {
// //     if (reason === "clickaway") {
// //       return;
// //     }
// //     setOpen(false);
// //   };
// //   const play = () => new Audio(sound).play();

// //   const handleUpload = (e) => {
// //     e.preventDefault();

// //     if (!file) {
// //       play();
// //       setSnack({
// //         type: "error",
// //         message: "Please, select a file",
// //       });
// //       setOpen(true);
// //       return;
// //     }

// //     const confirmation = window.confirm(
// //       "Are you sure you want to change your profile picture?"
// //     );
// //     if (confirmation) {
// //       console.log(`File: ${file}`);
// //       userServices
// //         .uploadProductImage(file)
// //         .then((res) => {
// //           // update user picture
// //           setUser({ ...user, picture: res.data.filename });

// //           play();
// //           setSnack({
// //             type: "success",
// //             message: "Product picture added successfully",
// //           });
// //           setOpen(true);

// //           setFile(null);
// //         })
// //         .catch((err) => {
// //           play();
// //           setSnack({
// //             type: "error",
// //             message: err.response.data.error,
// //           });
// //           setOpen(true);
// //         });
// //     }
// //   };

// //   const handleEditProduct = (e) => {
// //     e.preventDefault();

// //     console.log(`Product name: ${productName}`);
// //     console.log(`Product price: ${productPrice}`);
// //     console.log(`Product description: ${productDescription}`);
// //     console.log(`Product category: ${productCategory}`);
// //     console.log(`Product stock: ${productStock}`);

// //     if (productPrice <= 0 || productStock <= 0) {
// //       play();
// //       setSnack({
// //         type: "error",
// //         message: "Price and stock must be greater than 0",
// //       });
// //       setOpen(true);
// //       return;
// //     } else if (
// //       productCategory === "" ||
// //       productDescription === "" ||
// //       productName === ""
// //     ) {
// //       play();
// //       setSnack({
// //         type: "error",
// //         message: "All fields are required",
// //       });
// //       setOpen(true);
// //       return;
// //     } else {
// //       const updatedProduct = {
// //         name: productName,
// //         price: productPrice,
// //         description: productDescription,
// //         category: productCategory,
// //         totalStockNumber: productStock,
// //       };
// //       console.log("-------------------");

// //       const confirmation = window.confirm(
// //         "Are you sure you want to edit this product?"
// //       );
// //       if (confirmation) {
// //         productServices
// //           .editProduct(productId, updatedProduct)
// //           .then((res) => {
// //             console.log(`Product updated successfully: ${res.data}`);

// //             play();
// //             setSnack({
// //               type: "success",
// //               message: "Product updated successfully",
// //             });
// //             setOpen(true);

// //             // reset the fields
// //             setProductName("");
// //             setProductPrice(0);
// //             setProductDescription("");
// //             setProductCategory("");
// //             setProductStock(0);

// //             // redirect to products page
// //             navigate("/viewAllProducts");
// //           })
// //           .catch((err) => {
// //             play();
// //             setSnack({
// //               type: "error",
// //               message: err.response.data.error,
// //             });
// //             setOpen(true);
// //           });
// //       }
// //     }
// //   };

// //   return (
// //     <div>
// //       <ResponsiveAppBarHomepage purchaseProductLength={0} />
// //       <div className="gb-darkzero w-screen m-10">
// //         <div className="w-[80] mx-auto" align="center">
// //           <div className="mx-auto pt-10">
// //             <div
// //               style={{
// //                 border: "1px solid green",
// //                 boxShadow: "0 0 50px rgb(26, 176, 23) ",
// //               }}
// //               className="rounded-lg mt-3 text-white bg-indigo-500 p-5 m-auto lg:w-[500px] md:w-[400px] sm:w-[300px]"
// //               align="center"
// //             >
// //               <div className="text-3xl font-bold">Edit Product</div>

// //               <div className="product-fields mt-5">
// //                 <form action="">
// //                   <div className="mt-5">
// //                     <div className="mt-3 mb-2" align="left">
// //                       Name:
// //                     </div>
// //                     <input
// //                       type="text"
// //                       placeholder="Enter product name here ..."
// //                       onChange={(e) => setProductName(e.target.value)}
// //                       value={productName}
// //                       className="input input-bordered input-accent w-full"
// //                       required
// //                     />
// //                   </div>
// //                   <div className="mt-5">
// //                     <div className="mt-3 mb-2" align="left">
// //                       Price:
// //                     </div>
// //                     <input
// //                       type="number"
// //                       placeholder="Enter product name here ..."
// //                       onChange={(e) => setProductPrice(e.target.value)}
// //                       value={productPrice}
// //                       className="input input-bordered input-accent w-full"
// //                       required
// //                     />
// //                   </div>
// //                   <div className="mt-5">
// //                     <div className="mt-3 mb-2" align="left">
// //                       Stock Quantity:
// //                     </div>
// //                     <input
// //                       type="number"
// //                       placeholder="Enter stock quantity here ..."
// //                       onChange={(e) => setProductStock(e.target.value)}
// //                       value={productStock}
// //                       className="input input-bordered input-accent w-full"
// //                       required
// //                     />
// //                   </div>
// //                   <div className="mt-5">
// //                     <div className="mt-3 mb-2" align="left">
// //                       Category:
// //                     </div>
// //                     <select
// //                       className="select w-full max-w-xs"
// //                       onChange={(e) => setProductCategory(e.target.value)}
// //                       value={productCategory}
// //                       required
// //                     >
// //                       <option disabled selected>
// //                         Choose product category
// //                       </option>
// //                       <option value="electronics">electronics</option>
// //                       <option value="clothes">clothes</option>
// //                       <option value="mobile">mobile</option>
// //                       <option value="book">book</option>
// //                       <option value="others">others</option>
// //                     </select>
// //                   </div>
// //                   <div className="mt-5">
// //                     <div className="mt-3 mb-2" align="left">
// //                       Description:
// //                     </div>
// //                     <textarea
// //                       className="textarea textarea-info  textarea-lg w-full"
// //                       placeholder="Write product description here ..."
// //                       onChange={(e) => setProductDescription(e.target.value)}
// //                       value={productDescription}
// //                       required
// //                     ></textarea>
// //                   </div>

// //                   <input
// //                     type="submit"
// //                     value="Edit Product"
// //                     className="btn btn-primary w-full mt-4 mb-4"
// //                     onClick={handleEditProduct}
// //                   />
// //                 </form>
// //               </div>

// //               <div className="avatar">
// //                 <div className="w-60 rounded m-10">
// //                   {/* <img src={`https://localhost:3005/product/${imageName}`} /> */}
// //                   <img src={`https://localhost:3005/product/${imageName}`} />
// //                 </div>
// //               </div>

// //               <div className="">
// //                 <form>
// //                   <input
// //                     disabled
// //                     type="file"
// //                     onChange={(e) => setFile(e.target.files[0])}
// //                     required
// //                   />

// //                   <Button
// //                     variant="contained"
// //                     style={{ color: "white" }}
// //                     disabled
// //                     onClick={handleUpload}
// //                     startIcon={<CloudUploadIcon style={{ color: "white" }} />}
// //                     className="btn btn-secondary"
// //                   >
// //                     Upload Product Pic
// //                   </Button>
// //                 </form>
// //               </div>

// //               <MySnackbar
// //                 open={open}
// //                 handleClose={handleClose}
// //                 type={snack.type}
// //                 message={snack.message}
// //               />
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import Button from "@mui/material/Button";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import DOMPurify from 'dompurify';
// import sound from "../../assets/sound.wav";
// import productServices from "../../services/productService";
// import userServices from "../../services/userService";
// import { AdminAppBar } from "../AppBar/AdminAppBar";
// import { MySnackbar } from "../MySnackbar";

// export const EditProduct = () => {
//   const { productId } = useParams();
//   const navigate = useNavigate();

//   const [imageName, setImageName] = useState("productDefaultImage.png");
//   const [file, setFile] = useState(null);
//   const [product, setProduct] = useState({});

//   const [productName, setProductName] = useState("");
//   const [productPrice, setProductPrice] = useState("");
//   const [productDescription, setProductDescription] = useState("");
//   const [productCategory, setProductCategory] = useState("");
//   const [productStock, setProductStock] = useState("");

//   useEffect(() => {
//     productServices
//       .getSingleProductById(productId)
//       .then((res) => {
//         setProduct(res.data);
//         setImageName(res.data.picture);
//         setProductName(res.data.name);
//         setProductPrice(res.data.price);
//         setProductDescription(res.data.description);
//         setProductCategory(res.data.category);
//         setProductStock(res.data.totalStockNumber);
//       })
//       .catch((err) => window.alert(err.response.data.error));
//   }, [productId]);

//   const [snack, setSnack] = useState({
//     type: "",
//     message: "",
//   });
//   const [open, setOpen] = React.useState(false);

//   const handleClose = (event, reason) => {
//     if (reason === "clickaway") {
//       return;
//     }
//     setOpen(false);
//   };

//   const play = () => new Audio(sound).play();

//   const handleUpload = (e) => {
//     e.preventDefault();

//     if (!file) {
//       play();
//       setSnack({
//         type: "error",
//         message: "Please, select a file",
//       });
//       setOpen(true);
//       return;
//     }

//     const confirmation = window.confirm(
//       "Are you sure you want to change your product picture?"
//     );
//     if (confirmation) {
//       userServices
//         .uploadProductImage(productId, file)
//         .then((res) => {
//           setImageName(res.data.filename);
//           play();
//           setSnack({
//             type: "success",
//             message: "Product picture updated successfully",
//           });
//           setOpen(true);
//           setFile(null);
//         })
//         .catch((err) => {
//           play();
//           setSnack({
//             type: "error",
//             message: err.response.data.error,
//           });
//           setOpen(true);
//         });
//     }
//   };

//   const handleEditProduct = (e) => {
//     e.preventDefault();

//     const sanitizedProductName = DOMPurify.sanitize(productName.trim());
//     const sanitizedProductDescription = DOMPurify.sanitize(productDescription.trim());
//     const sanitizedProductCategory = DOMPurify.sanitize(productCategory);

//     if (
//       sanitizedProductName === "" ||
//       sanitizedProductCategory === "" ||
//       sanitizedProductDescription === "" ||
//       isNaN(productPrice) ||
//       productPrice < 100 ||
//       isNaN(productStock) ||
//       productStock <= 0
//     ) {
//       play();
//       setSnack({
//         type: "error",
//         message: "All fields are required and must be valid. Price must be at least 100.",
//       });
//       setOpen(true);
//       return;
//     }

//     const updatedProduct = {
//       name: sanitizedProductName,
//       price: parseFloat(productPrice),
//       description: sanitizedProductDescription,
//       category: sanitizedProductCategory,
//       totalStockNumber: parseInt(productStock, 10),
//     };

//     const confirmation = window.confirm(
//       "Are you sure you want to edit this product?"
//     );
//     if (confirmation) {
//       productServices
//         .editProduct(productId, updatedProduct)
//         .then((res) => {
//           play();
//           setSnack({
//             type: "success",
//             message: "Product updated successfully",
//           });
//           setOpen(true);
//           navigate("/viewAllProducts");
//         })
//         .catch((err) => {
//           play();
//           setSnack({
//             type: "error",
//             message: err.response.data.error,
//           });
//           setOpen(true);
//         });
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFile(file);
//     if (file) {
//       setImageName(URL.createObjectURL(file));
//     }
//   };

//   return (
//     <div style={{ backgroundColor: "#b2d5f5", minHeight: "100vh", padding: "20px" }}>
//       <AdminAppBar />
//       <Button
//                 variant="contained"
//                 startIcon={<ArrowBackIcon />}
//                 onClick={() => navigate("/viewAllProducts")}
//                 sx={{ backgroundColor: '#003366', color: 'white', '&:hover': { backgroundColor: '#002244' }, marginBottom: "1rem" }}
//               >
//                 Back to Products
//               </Button>
//       <div className="flex justify-center items-center">
//         <div className="w-full max-w-[550px] bg-white p-10 rounded-lg">
//           <div className="mx-auto pt-10">
//             <div
//               style={{
//                 padding: "20px",
//                 borderRadius: "8px",
//                 backgroundColor: "white",
//                 color: "black",
//                 fontSize: "1rem",
//                 marginTop: "-2rem",
//               }}
//               align="center"
//             >
//               <div className="text-3xl font-bold" style={{ fontSize: "2rem" }}>Edit Product</div>

//               <div className="product-fields mt-2">
//                 <form onSubmit={handleEditProduct}>
//                   <div className="mt-1" style={{ marginBottom: "1rem" }}>
//                     <div className="mt-1 mb-1 text-left text-black">
//                       Name:
//                     </div>
//                     <input
//                       type="text"
//                       placeholder="Enter product name here ..."
//                       onChange={(e) => setProductName(e.target.value)}
//                       value={productName}
//                       className="input w-full"
//                       required
//                       style={{ fontSize: "1rem", color: "black", borderColor: "grey" }}
//                     />
//                   </div>
//                   <div className="mt-1" style={{ marginBottom: "1rem" }}>
//                     <div className="mt-1 mb-1 text-left text-black">
//                       Price:
//                     </div>
//                     <input
//                       type="number"
//                       placeholder="Enter product price here ..."
//                       onChange={(e) => setProductPrice(e.target.value)}
//                       value={productPrice}
//                       className="input input-bordered w-full"
//                       required
//                       style={{ fontSize: "1rem", color: "black", borderColor: "grey" }}
//                       min="100"
//                       step="0.01"
//                     />
//                   </div>
//                   <div className="mt-1">
//                     <div className="mt-1 mb-1 text-left text-black">
//                       Stock Quantity:
//                     </div>
//                     <input
//                       type="number"
//                       placeholder="Enter stock quantity here ..."
//                       onChange={(e) => setProductStock(e.target.value)}
//                       value={productStock}
//                       className="input input-bordered w-full"
//                       required
//                       style={{ fontSize: "1rem", color: "black", borderColor: "grey" }}
//                       min="0"
//                     />
//                   </div>
//                   <div className="mt-1" style={{ marginBottom: "1rem", borderColor: "grey", borderStyle: "solid", borderRadius: "4px" }}>
//                     <div className="mt-3 mb-2 text-left text-black">
//                       Category:
//                     </div>
//                     <select
//                       className="select w-full max-w-xs"
//                       onChange={(e) => setProductCategory(e.target.value)}
//                       value={productCategory}
//                       required
//                       style={{ fontSize: "1rem", color: "black", borderColor: "grey" }}
//                     >
//                       <option disabled value="" style={{ fontSize: "1rem", color: "black" }}>
//                         Choose product category
//                       </option>
//                       <option value="Toys" style={{ fontSize: "1rem", color: "black" }}>Toys</option>
//                       <option value="Clothes" style={{ fontSize: "1rem", color: "black" }}>Clothes</option>
//                       <option value="Food" style={{ fontSize: "1rem", color: "black" }}>Food</option>
//                       <option value="Others" style={{ fontSize: "1rem", color: "black" }}>Others</option>
//                     </select>
//                   </div>
//                   <div className="mt-1" style={{ marginBottom: "0rem" }}>
//                     <div className="mt-1 mb-2 text-left text-black">
//                       Description:
//                     </div>
//                     <textarea
//                       className="textarea textarea-lg w-full"
//                       placeholder="Write product description here ..."
//                       onChange={(e) => setProductDescription(e.target.value)}
//                       value={productDescription}
//                       required
//                       style={{ fontSize: "1rem", color: "black", borderColor: "grey" }}
//                     ></textarea>
//                   </div>

//                   <div className="mt-1" style={{ marginBottom: "1rem" }}>
//                     <div className="mt-1 mb-2 text-left text-black">
//                       Product Image:
//                     </div>
//                     <input
//                       type="file"
//                       onChange={handleFileChange}
//                       style={{ fontSize: "1rem", color: "black", borderColor: "blue" }}
//                     />
//                   </div>

//                   <Button
//                     type="submit"
//                     variant="contained"
//                     startIcon={<CloudUploadIcon />}
//                     sx={{ backgroundColor: '#003366', color: 'white', '&:hover': { backgroundColor: '#002244' } }}
//                     className="mb-4"
//                   >
//                     Edit Product
//                   </Button>
//                 </form>
//               </div>

//               {file && (
//                 <div className="avatar">
//                   <div className="w-60 rounded m-10">
//                     <img src={imageName} alt="Product" />
//                   </div>
//                 </div>
//               )}

//               <MySnackbar
//                 open={open}
//                 handleClose={handleClose}
//                 type={snack.type}
//                 message={snack.message}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import sound from "../../assets/sound.wav";
import productServices from "../../services/productService";
import userServices from "../../services/userService";
import { AdminAppBar } from "../AppBar/AdminAppBar";
import { MySnackbar } from "../MySnackbar";

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

  const handleUpload = (e) => {
    e.preventDefault();

    if (!file) {
      play();
      setSnack({
        type: "error",
        message: "Please, select a file",
      });
      setOpen(true);
      return;
    }

    const confirmation = window.confirm(
      "Are you sure you want to change your product picture?"
    );
    if (confirmation) {
      userServices
        .uploadProductImage(productId, file)
        .then((res) => {
          setImageName(res.data.filename);
          play();
          setSnack({
            type: "success",
            message: "Product picture updated successfully",
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
    }
  };

  const handleEditProduct = (e) => {
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

    const updatedProduct = {
      name: sanitizedProductName,
      price: parseFloat(productPrice),
      description: sanitizedProductDescription,
      category: sanitizedProductCategory,
      totalStockNumber: parseInt(productStock, 10),
    };

    const confirmation = window.confirm(
      "Are you sure you want to edit this product?"
    );
    if (confirmation) {
      productServices
        .editProduct(productId, updatedProduct)
        .then((res) => {
          play();
          setSnack({
            type: "success",
            message: "Product updated successfully",
          });
          setOpen(true);
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
    }
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
                Edit Product
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
                <form onSubmit={handleEditProduct}>
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
                      className="input input-bordered w-full"
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
    </div>
  );
};
