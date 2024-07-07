// // // // // // // only for registered users
// // // // // // import { useEffect, useState } from "react";
// // // // // // import { useNavigate } from "react-router-dom";

// // // // // // import productServices from "../../services/productService";
// // // // // // import { usePurchase } from "../../utils/purchaseContext";

// // // // // // import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// // // // // // import { Button } from "@mui/material";
// // // // // // import dummyProductData from "../../data/data";
// // // // // // import { ResponsiveAppBarHomepage } from "../AppBar/ResponsiveAppBarHomepage";

// // // // // // function HomePage() {
// // // // // //   const purchase = usePurchase();
// // // // // //   const navigate = useNavigate();

// // // // // //   const [purchaseProduct, setPurchaseProduct] = useState({});
// // // // // //   const [products, setProducts] = useState([]);
// // // // // //   const [newReleasedProduct, setNewReleasedProduct] = useState({});
// // // // // //   const [hottestProduct, setHottestProduct] = useState({});
// // // // // //   const [userId, setUserId] = useState("");

// // // // // //   useEffect(() => {
// // // // // //     console.log(
// // // // // //       `Purchase context length from homepage is : ${purchase.purchase.length}`
// // // // // //     );

// // // // // //     // set the purchase product in the state by reading from the local storage
// // // // // //     setUserId(window.localStorage.getItem("userId"));

// // // // // //     setPurchaseProduct({
// // // // // //       items: purchase.purchase,
// // // // // //       // totalPrice: purchase.purchase.reduce((total, item) => total + (item.price * item.quantity), 0),
// // // // // //       payment: "pending",
// // // // // //     });

// // // // // //     // get the all products from the server
// // // // // //     productServices
// // // // // //       .getAllProudcts()
// // // // // //       .then((res) => {
// // // // // //         if (res.data.length === 0) {
// // // // // //           const dummyProduct = dummyProductData;
// // // // // //           // dummy data of product
// // // // // //           setProducts(dummyProduct);

// // // // // //           // set the first and last product in the state
// // // // // //           setNewReleasedProduct(dummyProduct[1]);
// // // // // //           setHottestProduct(dummyProduct[dummyProduct.length - 1]);
// // // // // //           return;
// // // // // //         }

// // // // // //         // set in the state
// // // // // //         setProducts(res.data);

// // // // // //         // iterate each product from the response
// // // // // //         res.data.forEach((product) => {
// // // // // //           console.log(`Product name from home: ${product.name}`);
// // // // // //         });

// // // // // //         // set the first and last product in the state
// // // // // //         setNewReleasedProduct(res.data[0]);
// // // // // //         setHottestProduct(res.data[res.data.length - 1]);
// // // // // //       })
// // // // // //       .catch((err) => window.alert(err.response.data.error));
// // // // // //   }, []);

// // // // // //   const clearPurchaseContext = () => {
// // // // // //     purchase.setPurchase([]); // empty the purchase context
// // // // // //     setPurchaseProduct({});
// // // // // //     console.log("Puchase context cleared");
// // // // // //   };

// // // // // //   // this works fine
// // // // // //   const handlePurchaseCancellation = (e) => {
// // // // // //     e.preventDefault();

// // // // // //     // if(purchase.purchase.length === 0) return window.alert('Please, add to cart first');

// // // // // //     const confirmation = window.confirm(
// // // // // //       "Are you sure you want to cancel the purchase?"
// // // // // //     );
// // // // // //     if (confirmation) {
// // // // // //       console.log("Purchase cancelled");
// // // // // //       clearPurchaseContext();
// // // // // //       console.log(
// // // // // //         `After cancellation, purchase context length from homepage is : ${purchase.purchase.length}`
// // // // // //       );
// // // // // //     }
// // // // // //   };

// // // // // //   // this works fine
// // // // // //   const handlePurchase = (e) => {
// // // // // //     e.preventDefault();

// // // // // //     if (purchase.purchase.length === 0) {
// // // // // //       window.alert("Please, add to cart first");
// // // // // //     } else {
// // // // // //       console.log(
// // // // // //         "Go to Khalti payement gateway. Then, only, POST to the server"
// // // // // //       );

// // // // // //       // assume payment is successful

// // // // // //       const finalPurchaseProduct = { ...purchaseProduct, payment: "success" };

// // // // // //       finalPurchaseProduct.items.map((item) => {
// // // // // //         console.log(`Purchase product name is : ${item.name}`);
// // // // // //         console.log(`Purchase product quantity is : ${item.quantity}`);
// // // // // //         console.log(`Purchase product price is : ${item.price}`);
// // // // // //         console.log("-----------------------------------");
// // // // // //       });

// // // // // //       // call API end point here

// // // // // //       // clear the purchase context after successfull payment
// // // // // //       clearPurchaseContext();
// // // // // //     }
// // // // // //   };

// // // // // //   const handleView = () => {};
// // // // // //   return (
// // // // // //     <div
// // // // // //     style={{
// // // // // //       backgroundColor: "#b2d5f5",
// // // // // //       color: "black",
// // // // // //       minHeight: "100vh",
// // // // // //       padding: "20px",
// // // // // //     }}
// // // // // //   >
// // // // // //       <ResponsiveAppBarHomepage
// // // // // //         purchaseProductLength={purchase.purchase.length}
// // // // // //       />

// // // // // //       <div className="carousel w-full h-90 carousel-section">
// // // // // //         <div id="item1" className="carousel-item w-full">
// // // // // //           <img src="/images/slider1.jpg" className="w-full" />
// // // // // //         </div>
// // // // // //         <div id="item2" className="carousel-item w-full">
// // // // // //           <img src="/images/slider2.jpg" className="w-full" />
// // // // // //         </div>
// // // // // //         <div id="item3" className="carousel-item w-full">
// // // // // //           <img src="/images/slider3.jpg" className="w-full" />
// // // // // //         </div>

// // // // // //       </div>
// // // // // //       <div className="flex justify-center w-full py-2 gap-2">
// // // // // //         <a href="#item1" className="btn btn-xs btn-secondary">
// // // // // //           1
// // // // // //         </a>
// // // // // //         <a href="#item2" className="btn btn-xs btn-secondary">
// // // // // //           2
// // // // // //         </a>
// // // // // //         <a href="#item3" className="btn btn-xs btn-secondary">
// // // // // //           3
// // // // // //         </a>

// // // // // //       </div>

// // // // // //       <div className="carousel carousel-end rounded-box row-carousel mt-4">
// // // // // //         {[...Array(1)].map((_, i) => {
// // // // // //           return products.map((product) => {
// // // // // //             return (
// // // // // //               <div className="carousel-item mr-5" key={product.id + i}>
// // // // // //                 {/* <img src={`https://localhost:3005/product/${product.picture}`} alt="Drink" /> */}
// // // // // //                 <img
// // // // // //                   src={`https://localhost:3005/product/${product.picture}`}
// // // // // //                   alt="Drink"
// // // // // //                 />
// // // // // //               </div>
// // // // // //             );
// // // // // //           });
// // // // // //         })}
// // // // // //       </div>

// // // // // //       <div className="card lg:card-side bg-base-100 shadow-xl single-row-card">
// // // // // //         {/* <figure><img src={`https://localhost:3005/product/${newReleasedProduct.picture}`} /></figure> */}
// // // // // //         <figure>
// // // // // //           <img
// // // // // //             src={`https://localhost:3005/product/${newReleasedProduct.picture}`}
// // // // // //           />
// // // // // //         </figure>

// // // // // //         <div className="card-body">
// // // // // //           <h2 className="card-title text-4xl font-bold mb-4">New released!</h2>
// // // // // //           <p className="justify-center">{newReleasedProduct.description}</p>
// // // // // //           <div className="card-actions justify-end">
// // // // // //             <Button
// // // // // //               onClick={() =>
// // // // // //                 navigate(`/singleProduct/${newReleasedProduct.id}`)
// // // // // //               }
// // // // // //               variant="contained"
// // // // // //               startIcon={<AddShoppingCartIcon />}
// // // // // //             >
// // // // // //               Add to cart
// // // // // //             </Button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       <h2 className="text-5xl font-bold m-4">All Products</h2>

// // // // // //       <div className="allProductsView">
// // // // // //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
// // // // // //           {[...Array(4)].map((_, i) => {
// // // // // //             return products.map((product) => (
// // // // // //               <div key={product.id} className="card bg-base-100 shadow-xl m-4">
// // // // // //                 <figure>
// // // // // //                   {/* <img className="mt-4" src={`https://localhost:3005/product/${product.picture}`} alt="Product" /> */}
// // // // // //                   <img
// // // // // //                     className="mt-4"
// // // // // //                     src={`https://localhost:3005/product/${product.picture}`}
// // // // // //                     alt="Product"
// // // // // //                   />
// // // // // //                 </figure>
// // // // // //                 <div className="card-body">
// // // // // //                   <h2>{product.name}</h2>
// // // // // //                   <p>{product.description.substring(0, 99)}...</p>
// // // // // //                   <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1">
// // // // // //                     {/* <Button className="mb-4" onClick={() => navigate(`/singleProduct/${product.id}`)} variant="contained" startIcon={<VisibilityIcon />}>
// // // // // //                                                 View
// // // // // //                                             </Button> */}

// // // // // //                     <br />

// // // // // //                     <Button
// // // // // //                       className="m-4"
// // // // // //                       onClick={() => navigate(`/singleProduct/${product.id}`)}
// // // // // //                       variant="contained"
// // // // // //                       startIcon={<AddShoppingCartIcon />}
// // // // // //                     >
// // // // // //                       Add to cart
// // // // // //                     </Button>
// // // // // //                   </div>
// // // // // //                   <div className="card-actions justify-end mt-2">
// // // // // //                     <div className="badge badge-outline badge-info">
// // // // // //                       {product.category}
// // // // // //                     </div>
// // // // // //                     <div className="badge badge-outline badge-info">
// // // // // //                       Available
// // // // // //                     </div>
// // // // // //                     <div className="badge badge-outline badge-info">
// // // // // //                       Rs {product.price}
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               </div>
// // // // // //             ));
// // // // // //           })}
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       <div className="hero bg-base-200 mb-8">
// // // // // //         <div className="hero-content flex-col lg:flex-row-reverse">
// // // // // //           {/* <img id="right-card" src={`https://localhost:3005/product/${hottestProduct.picture}`} className="max-w-sm rounded-lg shadow-2xl" /> */}
// // // // // //           <img
// // // // // //             id="right-card"
// // // // // //             src={`https://localhost:3005/product/${hottestProduct.picture}`}
// // // // // //             className="max-w-sm rounded-lg shadow-2xl"
// // // // // //           />

// // // // // //           <div className="single-card-right">
// // // // // //             <h1 className="text-4xl font-bold">Hottest!</h1>
// // // // // //             <p className="py-6">{hottestProduct.description}</p>
// // // // // //             <div className="card-actions justify-start">
// // // // // //               <Button
// // // // // //                 onClick={() => navigate(`/singleProduct/${hottestProduct.id}`)}
// // // // // //                 variant="contained"
// // // // // //                 startIcon={<AddShoppingCartIcon />}
// // // // // //               >
// // // // // //                 Add to cart
// // // // // //               </Button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // }

// // // // // // export default HomePage;

// // // // // import { useEffect, useState } from "react";
// // // // // import { useNavigate } from "react-router-dom";

// // // // // import productServices from "../../services/productService";
// // // // // import { usePurchase } from "../../utils/purchaseContext";

// // // // // import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// // // // // import { Button } from "@mui/material";
// // // // // import dummyProductData from "../../data/data";
// // // // // import { ResponsiveAppBarHomepage } from "../AppBar/ResponsiveAppBarHomepage";

// // // // // function HomePage() {
// // // // //   const purchase = usePurchase();
// // // // //   const navigate = useNavigate();

// // // // //   const [purchaseProduct, setPurchaseProduct] = useState({});
// // // // //   const [products, setProducts] = useState([]);
// // // // //   const [newReleasedProduct, setNewReleasedProduct] = useState({});
// // // // //   const [hottestProduct, setHottestProduct] = useState({});
// // // // //   const [userId, setUserId] = useState("");

// // // // //   useEffect(() => {
// // // // //     console.log(
// // // // //       `Purchase context length from homepage is : ${purchase.purchase.length}`
// // // // //     );

// // // // //     // set the purchase product in the state by reading from the local storage
// // // // //     setUserId(window.localStorage.getItem("userId"));

// // // // //     setPurchaseProduct({
// // // // //       items: purchase.purchase,
// // // // //       payment: "pending",
// // // // //     });

// // // // //     // get the all products from the server
// // // // //     productServices
// // // // //       .getAllProudcts()
// // // // //       .then((res) => {
// // // // //         if (res.data.length === 0) {
// // // // //           const dummyProduct = dummyProductData;
// // // // //           // dummy data of product
// // // // //           setProducts(dummyProduct);

// // // // //           // set the first and last product in the state
// // // // //           setNewReleasedProduct(dummyProduct[1]);
// // // // //           setHottestProduct(dummyProduct[dummyProduct.length - 1]);
// // // // //           return;
// // // // //         }

// // // // //         // set in the state
// // // // //         setProducts(res.data);

// // // // //         // iterate each product from the response
// // // // //         res.data.forEach((product) => {
// // // // //           console.log(`Product name from home: ${product.name}`);
// // // // //         });

// // // // //         // set the first and last product in the state
// // // // //         setNewReleasedProduct(res.data[0]);
// // // // //         setHottestProduct(res.data[res.data.length - 1]);
// // // // //       })
// // // // //       .catch((err) => window.alert(err.response.data.error));
// // // // //   }, []);

// // // // //   useEffect(() => {
// // // // //     const interval = setInterval(() => {
// // // // //       const activeItem = document.querySelector(
// // // // //         ".carousel .carousel-item.active"
// // // // //       );
// // // // //       if (activeItem) {
// // // // //         const nextItem =
// // // // //           activeItem.nextElementSibling ||
// // // // //           document.querySelector(".carousel .carousel-item:first-child");
// // // // //         activeItem.classList.remove("active");
// // // // //         nextItem.classList.add("active");
// // // // //       }
// // // // //     }, 5000); // Change slide every 5 seconds
// // // // //     return () => clearInterval(interval);
// // // // //   }, []);

// // // // //   const clearPurchaseContext = () => {
// // // // //     purchase.setPurchase([]); // empty the purchase context
// // // // //     setPurchaseProduct({});
// // // // //     console.log("Purchase context cleared");
// // // // //   };

// // // // //   const handlePurchaseCancellation = (e) => {
// // // // //     e.preventDefault();

// // // // //     const confirmation = window.confirm(
// // // // //       "Are you sure you want to cancel the purchase?"
// // // // //     );
// // // // //     if (confirmation) {
// // // // //       console.log("Purchase cancelled");
// // // // //       clearPurchaseContext();
// // // // //       console.log(
// // // // //         `After cancellation, purchase context length from homepage is : ${purchase.purchase.length}`
// // // // //       );
// // // // //     }
// // // // //   };

// // // // //   const handlePurchase = (e) => {
// // // // //     e.preventDefault();

// // // // //     if (purchase.purchase.length === 0) {
// // // // //       window.alert("Please, add to cart first");
// // // // //     } else {
// // // // //       console.log(
// // // // //         "Go to Khalti payment gateway. Then, only, POST to the server"
// // // // //       );

// // // // //       const finalPurchaseProduct = { ...purchaseProduct, payment: "success" };

// // // // //       finalPurchaseProduct.items.map((item) => {
// // // // //         console.log(`Purchase product name is : ${item.name}`);
// // // // //         console.log(`Purchase product quantity is : ${item.quantity}`);
// // // // //         console.log(`Purchase product price is : ${item.price}`);
// // // // //         console.log("-----------------------------------");
// // // // //       });

// // // // //       // call API end point here

// // // // //       // clear the purchase context after successful payment
// // // // //       clearPurchaseContext();
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div
// // // // //       style={{
// // // // //         backgroundColor: "#b2d5f5",
// // // // //         color: "black",
// // // // //         minHeight: "100vh",
// // // // //         padding: "20px",
// // // // //       }}
// // // // //     >
// // // // //       <ResponsiveAppBarHomepage
// // // // //         purchaseProductLength={purchase.purchase.length}
// // // // //       />
// // // // // <div
// // // // //         style={{
// // // // //           backgroundColor: "#b2d5f5",
// // // // //           minHeight: "100vh",
// // // // //           padding: "20px",
// // // // //         }}
// // // // //       >
// // // // //       <div className="carousel w-full h-90 carousel-section">
// // // // //         <div id="item1" className="carousel-item w-full active">
// // // // //           <img
// // // // //             src="/images/slider1.jpg"
// // // // //             className="w-full h-full object-contain rounded-lg"
// // // // //           />
// // // // //         </div>
// // // // //         <div id="item2" className="carousel-item w-full">
// // // // //           <img
// // // // //             src="/images/slider2.jpg"
// // // // //             className="w-full h-full object-contain rounded-lg"
// // // // //           />
// // // // //         </div>
// // // // //         <div id="item3" className="carousel-item w-full">
// // // // //           <img
// // // // //             src="/images/slider3.jpg"
// // // // //             className="w-full h-full object-contain rounded-lg"
// // // // //           />
// // // // //         </div>
// // // // //       </div>
// // // // //       <div className="flex justify-center w-full py-2 gap-2">
// // // // //         <a href="#item1" className="btn btn-xs btn-secondary">
// // // // //           1
// // // // //         </a>
// // // // //         <a href="#item2" className="btn btn-xs btn-secondary">
// // // // //           2
// // // // //         </a>
// // // // //         <a href="#item3" className="btn btn-xs btn-secondary">
// // // // //           3
// // // // //         </a>
// // // // //       </div>
// // // // //       </div>
// // // // //       <div className="carousel carousel-end rounded-box row-carousel mt-4">
// // // // //         {[...Array(1)].map((_, i) => {
// // // // //           return products.map((product) => {
// // // // //             return (
// // // // //               <div className="carousel-item mr-5" key={product.id + i}>
// // // // //                 <img
// // // // //                   src={`https://localhost:3005/product/${product.picture}`}
// // // // //                   alt="Drink"
// // // // //                   className="object-contain w-full h-full rounded-lg"
// // // // //                 />
// // // // //               </div>
// // // // //             );
// // // // //           });
// // // // //         })}
// // // // //       </div>

// // // // //       <div className="card lg:card-side bg-base-100 shadow-xl single-row-card mt-6">
// // // // //         <figure>
// // // // //           <img
// // // // //             src={`https://localhost:3005/product/${newReleasedProduct.picture}`}
// // // // //             className="object-contain rounded-lg"
// // // // //           />
// // // // //         </figure>
// // // // //         <div className="card-body">
// // // // //           <h2 className="card-title text-4xl font-bold mb-4">
// // // // //             New released!
// // // // //           </h2>
// // // // //           <p className="justify-center">{newReleasedProduct.description}</p>
// // // // //           <div className="card-actions justify-end">
// // // // //             <Button
// // // // //               onClick={() => navigate(`/singleProduct/${newReleasedProduct.id}`)}
// // // // //               variant="contained"
// // // // //               startIcon={<AddShoppingCartIcon />}
// // // // //             >
// // // // //               Add to cart
// // // // //             </Button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       <h2 className="text-5xl font-bold m-4">All Products</h2>

// // // // //       <div className="allProductsView">
// // // // //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
// // // // //           {[...Array(4)].map((_, i) => {
// // // // //             return products.map((product) => (
// // // // //               <div key={product.id} className="card bg-base-100 shadow-xl m-4">
// // // // //                 <figure>
// // // // //                   <img
// // // // //                     className="mt-4 object-contain w-full h-full rounded-lg"
// // // // //                     src={`https://localhost:3005/product/${product.picture}`}
// // // // //                     alt="Product"
// // // // //                   />
// // // // //                 </figure>
// // // // //                 <div className="card-body">
// // // // //                   <h2>{product.name}</h2>
// // // // //                   <p>{product.description.substring(0, 99)}...</p>
// // // // //                   <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1">
// // // // //                     <br />
// // // // //                     <Button
// // // // //                       className="m-4"
// // // // //                       onClick={() => navigate(`/singleProduct/${product.id}`)}
// // // // //                       variant="contained"
// // // // //                       startIcon={<AddShoppingCartIcon />}
// // // // //                     >
// // // // //                       Add to cart
// // // // //                     </Button>
// // // // //                   </div>
// // // // //                   <div className="card-actions justify-end mt-2">
// // // // //                     <div className="badge badge-outline badge-info">
// // // // //                       {product.category}
// // // // //                     </div>
// // // // //                     <div className="badge badge-outline badge-info">
// // // // //                       Available
// // // // //                     </div>
// // // // //                     <div className="badge badge-outline badge-info">
// // // // //                       Rs {product.price}
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>
// // // // //             ));
// // // // //           })}
// // // // //         </div>
// // // // //       </div>

// // // // //       <div className="hero bg-base-200 mb-8">
// // // // //         <div className="hero-content flex-col lg:flex-row-reverse">
// // // // //           <img
// // // // //             id="right-card"
// // // // //             src={`https://localhost:3005/product/${hottestProduct.picture}`}
// // // // //             className="max-w-sm rounded-lg shadow-2xl object-contain"
// // // // //           />
// // // // //           <div className="single-card-right">
// // // // //             <h1 className="text-4xl font-bold">Hottest!</h1>
// // // // //             <p className="py-6">{hottestProduct.description}</p>
// // // // //             <div className="card-actions justify-start">
// // // // //               <Button
// // // // //                 onClick={() => navigate(`/singleProduct/${hottestProduct.id}`)}
// // // // //                 variant="contained"
// // // // //                 startIcon={<AddShoppingCartIcon />}
// // // // //               >
// // // // //                 Add to cart
// // // // //               </Button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       <style jsx>{`
// // // // //         .carousel .carousel-item {
// // // // //           display: none;
// // // // //           opacity: 0;
// // // // //           transition: opacity 1s ease-in-out;
// // // // //         }

// // // // //         .carousel .carousel-item.active {
// // // // //           display: block;
// // // // //           opacity: 1;
// // // // //         }

// // // // //         .carousel-section img {
// // // // //           border-radius: 15px;
// // // // //         }

// // // // //         .single-row-card img {
// // // // //           border-radius: 15px;
// // // // //         }
// // // // //       `}</style>
// // // // //     </div>
// // // // //   );
// // // // // }

// // // // // export default HomePage;

// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import productServices from "../../services/productService";
// // import { usePurchase } from "../../utils/purchaseContext";
// // import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// // import { Button } from "@mui/material";
// // import dummyProductData from "../../data/data";
// // import { ResponsiveAppBarHomepage } from "../AppBar/ResponsiveAppBarHomepage";

// // function HomePage() {
// //   const purchase = usePurchase();
// //   const navigate = useNavigate();
// //   const [purchaseProduct, setPurchaseProduct] = useState({});
// //   const [products, setProducts] = useState([]);
// //   const [newReleasedProduct, setNewReleasedProduct] = useState({});
// //   const [hottestProduct, setHottestProduct] = useState({});
// //   const [userId, setUserId] = useState("");

// //   useEffect(() => {
// //     console.log(
// //       `Purchase context length from homepage is : ${purchase.purchase.length}`
// //     );

// //     setUserId(window.localStorage.getItem("userId"));

// //     setPurchaseProduct({
// //       items: purchase.purchase,
// //       payment: "pending",
// //     });

// //     productServices
// //       .getAllProudcts()
// //       .then((res) => {
// //         if (res.data.length === 0) {
// //           const dummyProduct = dummyProductData;
// //           setProducts(dummyProduct);
// //           setNewReleasedProduct(dummyProduct[1]);
// //           setHottestProduct(dummyProduct[dummyProduct.length - 1]);
// //           return;
// //         }

// //         setProducts(res.data);
// //         res.data.forEach((product) => {
// //           console.log(`Product name from home: ${product.name}`);
// //         });
// //         setNewReleasedProduct(res.data[0]);
// //         setHottestProduct(res.data[res.data.length - 1]);
// //       })
// //       .catch((err) => window.alert(err.response.data.error));
// //   }, []);

// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       const activeItem = document.querySelector(
// //         ".carousel .carousel-item.active"
// //       );
// //       if (activeItem) {
// //         const nextItem =
// //           activeItem.nextElementSibling ||
// //           document.querySelector(".carousel .carousel-item:first-child");
// //         activeItem.classList.remove("active");
// //         nextItem.classList.add("active");
// //       }
// //     }, 5000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   const clearPurchaseContext = () => {
// //     purchase.setPurchase([]);
// //     setPurchaseProduct({});
// //     console.log("Purchase context cleared");
// //   };

// //   const handlePurchaseCancellation = (e) => {
// //     e.preventDefault();
// //     const confirmation = window.confirm(
// //       "Are you sure you want to cancel the purchase?"
// //     );
// //     if (confirmation) {
// //       console.log("Purchase cancelled");
// //       clearPurchaseContext();
// //       console.log(
// //         `After cancellation, purchase context length from homepage is : ${purchase.purchase.length}`
// //       );
// //     }
// //   };

// //   const handlePurchase = (e) => {
// //     e.preventDefault();
// //     if (purchase.purchase.length === 0) {
// //       window.alert("Please, add to cart first");
// //     } else {
// //       console.log(
// //         "Go to Khalti payment gateway. Then, only, POST to the server"
// //       );

// //       const finalPurchaseProduct = { ...purchaseProduct, payment: "success" };
// //       finalPurchaseProduct.items.map((item) => {
// //         console.log(`Purchase product name is : ${item.name}`);
// //         console.log(`Purchase product quantity is : ${item.quantity}`);
// //         console.log(`Purchase product price is : ${item.price}`);
// //         console.log("-----------------------------------");
// //       });
// //       clearPurchaseContext();
// //     }
// //   };

// //   return (
// //     <div
// //       style={{
// //         backgroundColor: "#b2d5f5",
// //         color: "black",
// //         minHeight: "100vh",
// //         padding: "20px",
// //       }}
// //     >
// //       <ResponsiveAppBarHomepage
// //         purchaseProductLength={purchase.purchase.length}
// //       />
// //       <div
// //         style={{
// //           backgroundColor: "#b2d5f5",
// //           minHeight: "100vh",
// //           padding: "20px",
// //         }}
// //       >
// //         <div className="carousel w-full h-90 carousel-section">
// //           <div id="item1" className="carousel-item w-full active">
// //             <img
// //               src="/images/slider1.jpg"
// //               className="w-full h-full object-contain rounded-lg"
// //             />
// //           </div>
// //           <div id="item2" className="carousel-item w-full">
// //             <img
// //               src="/images/slider2.jpg"
// //               className="w-full h-full object-contain rounded-lg"
// //             />
// //           </div>
// //           <div id="item3" className="carousel-item w-full">
// //             <img
// //               src="/images/slider3.jpg"
// //               className="w-full h-full object-contain rounded-lg"
// //             />
// //           </div>
// //         </div>
// //         <div className="flex justify-center w-full py-2 gap-2">
// //           <a href="#item1" className="btn btn-xs btn-secondary">
// //             1
// //           </a>
// //           <a href="#item2" className="btn btn-xs btn-secondary">
// //             2
// //           </a>
// //           <a href="#item3" className="btn btn-xs btn-secondary">
// //             3
// //           </a>
// //         </div>
// //       </div>
// //       <div className="carousel carousel-end rounded-box row-carousel mt-4">
// //         {products.map((product) => (
// //           <div className="carousel-item mr-5" key={product.id}>
// //             <img
// //               src={`https://localhost:3005/product/${product.picture}`}
// //               alt="Product"
// //               className="object-contain w-full h-full rounded-lg"
// //             />
// //           </div>
// //         ))}
// //       </div>

// //       <div className="card lg:card-side bg-base-100 shadow-xl single-row-card mt-6">
// //         <figure>
// //           <img
// //             src={`https://localhost:3005/product/${newReleasedProduct.picture}`}
// //             className="object-contain rounded-lg"
// //           />
// //         </figure>
// //         <div className="card-body">
// //           <h2 className="card-title text-4xl font-bold mb-4">New released!</h2>
// //           <p className="justify-center">{newReleasedProduct.description}</p>
// //           <div className="card-actions justify-end">
// //             <Button
// //               onClick={() =>
// //                 navigate(`/singleProduct/${newReleasedProduct.id}`)
// //               }
// //               variant="contained"
// //               startIcon={<AddShoppingCartIcon />}
// //             >
// //               Add to cart
// //             </Button>
// //           </div>
// //         </div>
// //       </div>

// //       <h2 className="text-5xl font-bold m-4">All Products</h2>

// //       <div className="allProductsView">
// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
// //           {products.map((product) => (
// //             <div key={product.id} className="card bg-base-100 shadow-xl m-4">
// //               <figure>
// //                 <img
// //                   className="mt-4 object-contain w-full h-full rounded-lg"
// //                   src={`https://localhost:3005/product/${product.picture}`}
// //                   alt="Product"
// //                 />
// //               </figure>
// //               <div className="card-body">
// //                 <h2>{product.name}</h2>
// //                 <p>{product.description.substring(0, 99)}...</p>
// //                 <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1">
// //                   <br />
// //                   <Button
// //                     className="m-4"
// //                     onClick={() => navigate(`/singleProduct/${product.id}`)}
// //                     variant="contained"
// //                     startIcon={<AddShoppingCartIcon />}
// //                   >
// //                     Add to cart
// //                   </Button>
// //                 </div>
// //                 <div className="card-actions justify-end mt-2">
// //                   <div className="badge badge-outline badge-info">
// //                     {product.category}
// //                   </div>
// //                   <div className="badge badge-outline badge-info">Available</div>
// //                   <div className="badge badge-outline badge-info">
// //                     Rs {product.price}
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>

// //       <div className="hero bg-base-200 mb-8">
// //         <div className="hero-content flex-col lg:flex-row-reverse">
// //           <img
// //             id="right-card"
// //             src={`https://localhost:3005/product/${hottestProduct.picture}`}
// //             className="max-w-sm rounded-lg shadow-2xl object-contain"
// //           />
// //           <div className="single-card-right">
// //             <h1 className="text-4xl font-bold">Hottest!</h1>
// //             <p className="py-6">{hottestProduct.description}</p>
// //             <div className="card-actions justify-start">
// //               <Button
// //                 onClick={() => navigate(`/singleProduct/${hottestProduct.id}`)}
// //                 variant="contained"
// //                 startIcon={<AddShoppingCartIcon />}
// //               >
// //                 Add to cart
// //               </Button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <style jsx>{`
// //         .carousel .carousel-item {
// //           display: none;
// //           opacity: 0;
// //           transition: opacity 1s ease-in-out;
// //         }

// //         .carousel .carousel-item.active {
// //           display: block;
// //           opacity: 1;
// //         }

// //         .carousel-section img {
// //           border-radius: 15px;
// //         }

// //         .single-row-card img {
// //           border-radius: 15px;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // }

// // export default HomePage;

// // // import { useEffect, useState } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import productServices from "../../services/productService";
// // // import { usePurchase } from "../../utils/purchaseContext";
// // // import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// // // import { Button } from "@mui/material";
// // // import dummyProductData from "../../data/data";
// // // import { ResponsiveAppBarHomepage } from "../AppBar/ResponsiveAppBarHomepage";

// // // function HomePage() {
// // //   const purchase = usePurchase();
// // //   const navigate = useNavigate();
// // //   const [purchaseProduct, setPurchaseProduct] = useState({});
// // //   const [products, setProducts] = useState([]);
// // //   const [newReleasedProduct, setNewReleasedProduct] = useState({});
// // //   const [hottestProduct, setHottestProduct] = useState({});
// // //   const [userId, setUserId] = useState("");

// // //   useEffect(() => {
// // //     console.log(
// // //       `Purchase context length from homepage is : ${purchase.purchase.length}`
// // //     );

// // //     setUserId(window.localStorage.getItem("userId"));

// // //     setPurchaseProduct({
// // //       items: purchase.purchase,
// // //       payment: "pending",
// // //     });

// // //     productServices
// // //       .getAllProudcts()
// // //       .then((res) => {
// // //         if (res.data.length === 0) {
// // //           const dummyProduct = dummyProductData;
// // //           setProducts(dummyProduct);
// // //           setNewReleasedProduct(dummyProduct[1]);
// // //           setHottestProduct(dummyProduct[dummyProduct.length - 1]);
// // //           return;
// // //         }

// // //         setProducts(res.data);
// // //         res.data.forEach((product) => {
// // //           console.log(`Product name from home: ${product.name}`);
// // //         });
// // //         setNewReleasedProduct(res.data[0]);
// // //         setHottestProduct(res.data[res.data.length - 1]);
// // //       })
// // //       .catch((err) => window.alert(err.response.data.error));
// // //   }, []);

// // //   useEffect(() => {
// // //     const interval = setInterval(() => {
// // //       const activeItem = document.querySelector(
// // //         ".carousel .carousel-item.active"
// // //       );
// // //       if (activeItem) {
// // //         const nextItem =
// // //           activeItem.nextElementSibling ||
// // //           document.querySelector(".carousel .carousel-item:first-child");
// // //         activeItem.classList.remove("active");
// // //         nextItem.classList.add("active");
// // //       }
// // //     }, 5000);
// // //     return () => clearInterval(interval);
// // //   }, []);

// // //   const clearPurchaseContext = () => {
// // //     purchase.setPurchase([]);
// // //     setPurchaseProduct({});
// // //     console.log("Purchase context cleared");
// // //   };

// // //   const handlePurchaseCancellation = (e) => {
// // //     e.preventDefault();
// // //     const confirmation = window.confirm(
// // //       "Are you sure you want to cancel the purchase?"
// // //     );
// // //     if (confirmation) {
// // //       console.log("Purchase cancelled");
// // //       clearPurchaseContext();
// // //       console.log(
// // //         `After cancellation, purchase context length from homepage is : ${purchase.purchase.length}`
// // //       );
// // //     }
// // //   };

// // //   const handlePurchase = (e) => {
// // //     e.preventDefault();
// // //     if (purchase.purchase.length === 0) {
// // //       window.alert("Please, add to cart first");
// // //     } else {
// // //       console.log(
// // //         "Go to Khalti payment gateway. Then, only, POST to the server"
// // //       );

// // //       const finalPurchaseProduct = { ...purchaseProduct, payment: "success" };
// // //       finalPurchaseProduct.items.map((item) => {
// // //         console.log(`Purchase product name is : ${item.name}`);
// // //         console.log(`Purchase product quantity is : ${item.quantity}`);
// // //         console.log(`Purchase product price is : ${item.price}`);
// // //         console.log("-----------------------------------");
// // //       });
// // //       clearPurchaseContext();
// // //     }
// // //   };

// // //   const groupedProducts = products.reduce((groups, product) => {
// // //     const category = product.category || 'Others';
// // //     if (!groups[category]) {
// // //       groups[category] = [];
// // //     }
// // //     groups[category].push(product);
// // //     return groups;
// // //   }, {});

// // //   return (
// // //     <div
// // //       style={{
// // //         backgroundColor: "#b2d5f5",
// // //         color: "black",
// // //         minHeight: "100vh",
// // //         padding: "20px",
// // //       }}
// // //     >
// // //       <ResponsiveAppBarHomepage
// // //         purchaseProductLength={purchase.purchase.length}
// // //       />
// // //       <div
// // //         style={{
// // //           backgroundColor: "#b2d5f5",
// // //           minHeight: "100vh",
// // //           padding: "20px",
// // //         }}
// // //       >
// // //         <div className="carousel w-full h-90 carousel-section">
// // //           <div id="item1" className="carousel-item w-full active">
// // //             <img
// // //               src="/images/slider1.jpg"
// // //               className="w-full h-full object-contain rounded-lg"
// // //             />
// // //           </div>
// // //           <div id="item2" className="carousel-item w-full">
// // //             <img
// // //               src="/images/slider2.jpg"
// // //               className="w-full h-full object-contain rounded-lg"
// // //             />
// // //           </div>
// // //           <div id="item3" className="carousel-item w-full">
// // //             <img
// // //               src="/images/slider3.jpg"
// // //               className="w-full h-full object-contain rounded-lg"
// // //             />
// // //           </div>
// // //         </div>
// // //         <div className="flex justify-center w-full py-2 gap-2">
// // //           <a href="#item1" className="btn btn-xs btn-secondary">
// // //             1
// // //           </a>
// // //           <a href="#item2" className="btn btn-xs btn-secondary">
// // //             2
// // //           </a>
// // //           <a href="#item3" className="btn btn-xs btn-secondary">
// // //             3
// // //           </a>
// // //         </div>
// // //       </div>
// // //       <div className="carousel carousel-end rounded-box row-carousel mt-4">
// // //         {products.map((product) => (
// // //           <div className="carousel-item mr-5" key={product.id}>
// // //             <img
// // //               src={`https://localhost:3005/product/${product.picture}`}
// // //               alt="Product"
// // //               className="object-contain w-48 h-48 rounded-lg"
// // //             />
// // //           </div>
// // //         ))}
// // //       </div>

// // //       <div className="card lg:card-side bg-base-100 shadow-xl single-row-card mt-6">
// // //         <figure>
// // //           <img
// // //             src={`https://localhost:3005/product/${newReleasedProduct.picture}`}
// // //             className="object-contain rounded-lg w-48 h-48"
// // //           />
// // //         </figure>
// // //         <div className="card-body">
// // //           <h2 className="card-title text-4xl font-bold mb-4">New released!</h2>
// // //           <p className="justify-center">{newReleasedProduct.description}</p>
// // //           <div className="card-actions justify-end">
// // //             <Button
// // //               onClick={() =>
// // //                 navigate(`/singleProduct/${newReleasedProduct.id}`)
// // //               }
// // //               variant="contained"
// // //               startIcon={<AddShoppingCartIcon />}
// // //             >
// // //               Add to cart
// // //             </Button>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <h2 className="text-5xl font-bold m-4">All Products</h2>

// // //       <div className="allProductsView">
// // //         {Object.keys(groupedProducts).map((category) => (
// // //           <div key={category}>
// // //             <h3 className="text-3xl font-bold m-4">{category}</h3>
// // //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
// // //               {groupedProducts[category].map((product) => (
// // //                 <div key={product.id} className="card bg-base-100 shadow-xl m-4">
// // //                   <figure>
// // //                     <img
// // //                       className="mt-4 object-contain w-48 h-48 rounded-lg"
// // //                       src={`https://localhost:3005/product/${product.picture}`}
// // //                       alt="Product"
// // //                     />
// // //                   </figure>
// // //                   <div className="card-body">
// // //                     <h2>{product.name}</h2>
// // //                     <p>{product.description.substring(0, 99)}...</p>
// // //                     <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1">
// // //                       <br />
// // //                       <Button
// // //                         className="m-4"
// // //                         onClick={() => navigate(`/singleProduct/${product.id}`)}
// // //                         variant="contained"
// // //                         startIcon={<AddShoppingCartIcon />}
// // //                       >
// // //                         Add to cart
// // //                       </Button>
// // //                     </div>
// // //                     <div className="card-actions justify-end mt-2">
// // //                       <div className="badge badge-outline badge-info">
// // //                         {product.category}
// // //                       </div>
// // //                       <div className="badge badge-outline badge-info">Available</div>
// // //                       <div className="badge badge-outline badge-info">
// // //                         Rs {product.price}
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       <div className="hero bg-base-200 mb-8">
// // //         <div className="hero-content flex-col lg:flex-row-reverse">
// // //           <img
// // //             id="right-card"
// // //             src={`https://localhost:3005/product/${hottestProduct.picture}`}
// // //             className="max-w-sm rounded-lg shadow-2xl object-contain"
// // //           />
// // //           <div className="single-card-right">
// // //             <h1 className="text-4xl font-bold">Hottest!</h1>
// // //             <p className="py-6">{hottestProduct.description}</p>
// // //             <div className="card-actions justify-start">
// // //               <Button
// // //                 onClick={() => navigate(`/singleProduct/${hottestProduct.id}`)}
// // //                 variant="contained"
// // //                 startIcon={<AddShoppingCartIcon />}
// // //               >
// // //                 Add to cart
// // //               </Button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <style jsx>{`
// // //         .carousel .carousel-item {
// // //           display: none;
// // //           opacity: 0;
// // //           transition: opacity 1s ease-in-out;
// // //         }

// // //         .carousel .carousel-item.active {
// // //           display: block;
// // //           opacity: 1;
// // //         }

// // //         .carousel-section img {
// // //           border-radius: 15px;
// // //         }

// // //         .single-row-card img {
// // //           border-radius: 15px;
// // //         }

// // //         .carousel-item img {
// // //           max-width: 100%;
// // //           height: auto;
// // //           object-fit: contain;
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // }

// // // export default HomePage;

// // // import { useEffect, useState } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import productServices from "../../services/productService";
// // // import { usePurchase } from "../../utils/purchaseContext";
// // // import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// // // import { Button } from "@mui/material";
// // // import dummyProductData from "../../data/data";
// // // import { ResponsiveAppBarHomepage } from "../AppBar/ResponsiveAppBarHomepage";

// // // function HomePage() {
// // //   const purchase = usePurchase();
// // //   const navigate = useNavigate();
// // //   const [purchaseProduct, setPurchaseProduct] = useState({});
// // //   const [products, setProducts] = useState([]);
// // //   const [newReleasedProduct, setNewReleasedProduct] = useState({});
// // //   const [hottestProduct, setHottestProduct] = useState({});
// // //   const [userId, setUserId] = useState("");

// // //   useEffect(() => {
// // //     console.log(
// // //       `Purchase context length from homepage is : ${purchase.purchase.length}`
// // //     );

// // //     setUserId(window.localStorage.getItem("userId"));

// // //     setPurchaseProduct({
// // //       items: purchase.purchase,
// // //       payment: "pending",
// // //     });

// // //     productServices
// // //       .getAllProudcts()
// // //       .then((res) => {
// // //         if (res.data.length === 0) {
// // //           const dummyProduct = dummyProductData;
// // //           setProducts(dummyProduct);
// // //           setNewReleasedProduct(dummyProduct[1]);
// // //           setHottestProduct(dummyProduct[dummyProduct.length - 1]);
// // //           return;
// // //         }

// // //         setProducts(res.data);
// // //         res.data.forEach((product) => {
// // //           console.log(`Product name from home: ${product.name}`);
// // //         });
// // //         setNewReleasedProduct(res.data[0]);
// // //         setHottestProduct(res.data[res.data.length - 1]);
// // //       })
// // //       .catch((err) => window.alert(err.response.data.error));
// // //   }, []);

// // //   useEffect(() => {
// // //     const interval = setInterval(() => {
// // //       const activeItem = document.querySelector(
// // //         ".carousel .carousel-item.active"
// // //       );
// // //       if (activeItem) {
// // //         const nextItem =
// // //           activeItem.nextElementSibling ||
// // //           document.querySelector(".carousel .carousel-item:first-child");
// // //         activeItem.classList.remove("active");
// // //         nextItem.classList.add("active");
// // //       }
// // //     }, 5000);
// // //     return () => clearInterval(interval);
// // //   }, []);

// // //   const clearPurchaseContext = () => {
// // //     purchase.setPurchase([]);
// // //     setPurchaseProduct({});
// // //     console.log("Purchase context cleared");
// // //   };

// // //   const handlePurchaseCancellation = (e) => {
// // //     e.preventDefault();
// // //     const confirmation = window.confirm(
// // //       "Are you sure you want to cancel the purchase?"
// // //     );
// // //     if (confirmation) {
// // //       console.log("Purchase cancelled");
// // //       clearPurchaseContext();
// // //       console.log(
// // //         `After cancellation, purchase context length from homepage is : ${purchase.purchase.length}`
// // //       );
// // //     }
// // //   };

// // //   const handlePurchase = (e) => {
// // //     e.preventDefault();
// // //     if (purchase.purchase.length === 0) {
// // //       window.alert("Please, add to cart first");
// // //     } else {
// // //       console.log(
// // //         "Go to Khalti payment gateway. Then, only, POST to the server"
// // //       );

// // //       const finalPurchaseProduct = { ...purchaseProduct, payment: "success" };
// // //       finalPurchaseProduct.items.map((item) => {
// // //         console.log(`Purchase product name is : ${item.name}`);
// // //         console.log(`Purchase product quantity is : ${item.quantity}`);
// // //         console.log(`Purchase product price is : ${item.price}`);
// // //         console.log("-----------------------------------");
// // //       });
// // //       clearPurchaseContext();
// // //     }
// // //   };

// // //   const groupedProducts = products.reduce((groups, product) => {
// // //     const category = product.category || 'Others';
// // //     if (!groups[category]) {
// // //       groups[category] = [];
// // //     }
// // //     groups[category].push(product);
// // //     return groups;
// // //   }, {});

// // //   return (
// // //     <div
// // //       style={{
// // //         backgroundColor: "#b2d5f5",
// // //         color: "black",
// // //         minHeight: "100vh",
// // //         padding: "20px",
// // //       }}
// // //     >
// // //       <ResponsiveAppBarHomepage
// // //         purchaseProductLength={purchase.purchase.length}
// // //       />
// // //       <div
// // //         style={{
// // //           backgroundColor: "#b2d5f5",
// // //           minHeight: "100vh",
// // //           padding: "20px",
// // //         }}
// // //       >
// // //         <div className="carousel w-full h-90 carousel-section">
// // //           <div id="item1" className="carousel-item w-full active">
// // //             <img
// // //               src="/images/slider1.jpg"
// // //               className="w-full h-full object-contain rounded-lg"
// // //             />
// // //           </div>
// // //           <div id="item2" className="carousel-item w-full">
// // //             <img
// // //               src="/images/slider2.jpg"
// // //               className="w-full h-full object-contain rounded-lg"
// // //             />
// // //           </div>
// // //           <div id="item3" className="carousel-item w-full">
// // //             <img
// // //               src="/images/slider3.jpg"
// // //               className="w-full h-full object-contain rounded-lg"
// // //             />
// // //           </div>
// // //         </div>
// // //         <div className="flex justify-center w-full py-2 gap-2">
// // //           <a href="#item1" className="btn btn-xs btn-secondary">
// // //             1
// // //           </a>
// // //           <a href="#item2" className="btn btn-xs btn-secondary">
// // //             2
// // //           </a>
// // //           <a href="#item3" className="btn btn-xs btn-secondary">
// // //             3
// // //           </a>
// // //         </div>
// // //       </div>
// // //       <div className="carousel carousel-end rounded-box row-carousel mt-4">
// // //         {products.map((product) => (
// // //           <div className="carousel-item mr-5" key={product.id}>
// // //             <img
// // //               src={`https://localhost:3005/product/${product.picture}`}
// // //               alt="Product"
// // //               className="object-contain w-48 h-48 rounded-lg"
// // //             />
// // //           </div>
// // //         ))}
// // //       </div>

// // //       <div className="card lg:card-side bg-base-100 shadow-xl single-row-card mt-6">
// // //         <figure>
// // //           <img
// // //             src={`https://localhost:3005/product/${newReleasedProduct.picture}`}
// // //             className="object-contain rounded-lg w-48 h-48"
// // //           />
// // //         </figure>
// // //         <div className="card-body">
// // //           <h2 className="card-title text-4xl font-bold mb-4">New released!</h2>
// // //           <p className="justify-center">{newReleasedProduct.description}</p>
// // //           <div className="card-actions justify-end">
// // //             <Button
// // //               onClick={() =>
// // //                 navigate(`/singleProduct/${newReleasedProduct.id}`)
// // //               }
// // //               variant="contained"
// // //               startIcon={<AddShoppingCartIcon />}
// // //             >
// // //               Add to cart
// // //             </Button>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <h2 className="text-5xl font-bold m-4">All Products</h2>

// // //       <div className="allProductsView">
// // //         {Object.keys(groupedProducts).map((category) => (
// // //           <div key={category}>
// // //             <h3 className="text-3xl font-bold m-4">{category}</h3>
// // //             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
// // //               {groupedProducts[category].map((product) => (
// // //                 <div key={product.id} className="card bg-base-100 shadow-xl m-4">
// // //                   <figure>
// // //                     <img
// // //                       className="mt-4 object-contain w-48 h-48 rounded-lg"
// // //                       src={`https://localhost:3005/product/${product.picture}`}
// // //                       alt="Product"
// // //                     />
// // //                   </figure>
// // //                   <div className="card-body">
// // //                     <h2>{product.name}</h2>
// // //                     <p>{product.description.substring(0, 99)}...</p>
// // //                     <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1">
// // //                       <br />
// // //                       <Button
// // //                         className="m-4"
// // //                         onClick={() => navigate(`/singleProduct/${product.id}`)}
// // //                         variant="contained"
// // //                         startIcon={<AddShoppingCartIcon />}
// // //                       >
// // //                         Add to cart
// // //                       </Button>
// // //                     </div>
// // //                     <div className="card-actions justify-end mt-2">
// // //                       <div className="badge badge-outline badge-info">
// // //                         {product.category}
// // //                       </div>
// // //                       <div className="badge badge-outline badge-info">Available</div>
// // //                       <div className="badge badge-outline badge-info">
// // //                         Rs {product.price}
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       <div className="hero bg-base-200 mb-8">
// // //         <div className="hero-content flex-col lg:flex-row-reverse">
// // //           <img
// // //             id="right-card"
// // //             src={`https://localhost:3005/product/${hottestProduct.picture}`}
// // //             className="max-w-sm rounded-lg shadow-2xl object-contain"
// // //           />
// // //           <div className="single-card-right">
// // //             <h1 className="text-4xl font-bold">Hottest!</h1>
// // //             <p className="py-6">{hottestProduct.description}</p>
// // //             <div className="card-actions justify-start">
// // //               <Button
// // //                 onClick={() => navigate(`/singleProduct/${hottestProduct.id}`)}
// // //                 variant="contained"
// // //                 startIcon={<AddShoppingCartIcon />}
// // //               >
// // //                 Add to cart
// // //               </Button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <style jsx>{`
// // //         .carousel .carousel-item {
// // //           display: none;
// // //           opacity: 0;
// // //           transition: opacity 1s ease-in-out;
// // //         }

// // //         .carousel .carousel-item.active {
// // //           display: block;
// // //           opacity: 1;
// // //         }

// // //         .carousel-section img {
// // //           border-radius: 15px;
// // //         }

// // //         .single-row-card img {
// // //           border-radius: 15px;
// // //         }

// // //         .carousel-item img {
// // //           max-width: 100%;
// // //           height: auto;
// // //           object-fit: contain;
// // //         }
// // //       `}</style>
// // //     </div>
// // //   );
// // // }

// // // export default HomePage;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import productServices from "../../services/productService";
// import { usePurchase } from "../../utils/purchaseContext";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import { Button } from "@mui/material";
// import dummyProductData from "../../data/data";
// import { ResponsiveAppBarHomepage } from "../AppBar/ResponsiveAppBarHomepage";

// function HomePage() {
//   const purchase = usePurchase();
//   const navigate = useNavigate();
//   const [purchaseProduct, setPurchaseProduct] = useState({});
//   const [products, setProducts] = useState([]);
//   const [newReleasedProduct, setNewReleasedProduct] = useState({});
//   const [hottestProduct, setHottestProduct] = useState({});
//   const [userId, setUserId] = useState("");

//   useEffect(() => {
//     console.log(
//       `Purchase context length from homepage is : ${purchase.purchase.length}`
//     );

//     setUserId(window.localStorage.getItem("userId"));

//     setPurchaseProduct({
//       items: purchase.purchase,
//       payment: "pending",
//     });

//     productServices
//       .getAllProudcts()
//       .then((res) => {
//         if (res.data.length === 0) {
//           const dummyProduct = dummyProductData;
//           setProducts(dummyProduct);
//           setNewReleasedProduct(dummyProduct[1]);
//           setHottestProduct(dummyProduct[dummyProduct.length - 1]);
//           return;
//         }

//         setProducts(res.data);
//         res.data.forEach((product) => {
//           console.log(`Product name from home: ${product.name}`);
//         });
//         setNewReleasedProduct(res.data[0]);
//         setHottestProduct(res.data[res.data.length - 1]);
//       })
//       .catch((err) => window.alert(err.response.data.error));
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const activeItem = document.querySelector(
//         ".carousel .carousel-item.active"
//       );
//       if (activeItem) {
//         const nextItem =
//           activeItem.nextElementSibling ||
//           document.querySelector(".carousel .carousel-item:first-child");
//         activeItem.classList.remove("active");
//         nextItem.classList.add("active");
//       }
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const clearPurchaseContext = () => {
//     purchase.setPurchase([]);
//     setPurchaseProduct({});
//     console.log("Purchase context cleared");
//   };

//   const handlePurchaseCancellation = (e) => {
//     e.preventDefault();
//     const confirmation = window.confirm(
//       "Are you sure you want to cancel the purchase?"
//     );
//     if (confirmation) {
//       console.log("Purchase cancelled");
//       clearPurchaseContext();
//       console.log(
//         `After cancellation, purchase context length from homepage is : ${purchase.purchase.length}`
//       );
//     }
//   };

//   const handlePurchase = (e) => {
//     e.preventDefault();
//     if (purchase.purchase.length === 0) {
//       window.alert("Please, add to cart first");
//     } else {
//       console.log(
//         "Go to Khalti payment gateway. Then, only, POST to the server"
//       );

//       const finalPurchaseProduct = { ...purchaseProduct, payment: "success" };
//       finalPurchaseProduct.items.map((item) => {
//         console.log(`Purchase product name is : ${item.name}`);
//         console.log(`Purchase product quantity is : ${item.quantity}`);
//         console.log(`Purchase product price is : ${item.price}`);
//         console.log("-----------------------------------");
//       });
//       clearPurchaseContext();
//     }
//   };

//   const groupedProducts = products.reduce((groups, product) => {
//     const category = product.category || "Others";
//     if (!groups[category]) {
//       groups[category] = [];
//     }
//     groups[category].push(product);
//     return groups;
//   }, {});

//   return (
//     <div
//       style={{
//         backgroundColor: "#b2d5f5",
//         color: "black",
//         minHeight: "100vh",
//         padding: "20px",
//       }}
//     >
//       <ResponsiveAppBarHomepage
//         purchaseProductLength={purchase.purchase.length}
//       />
//       <div
//         style={{
//           backgroundColor: "#b2d5f5",
//           minHeight: "100vh",
//           padding: "20px",
//         }}
//       >
//         <div className="carousel w-full h-90 carousel-section">
//           <div id="item1" className="carousel-item w-full active">
//             <img
//               src="/images/slider1.jpg"
//               className="w-full h-full object-contain rounded-lg"
//             />
//           </div>
//           <div id="item2" className="carousel-item w-full">
//             <img
//               src="/images/slider2.jpg"
//               className="w-full h-full object-contain rounded-lg"
//             />
//           </div>
//           <div id="item3" className="carousel-item w-full">
//             <img
//               src="/images/slider3.jpg"
//               className="w-full h-full object-contain rounded-lg"
//             />
//           </div>
//         </div>
//       </div>
      
   
//       <h2 className="text-5xl font-bold m-4">All Products</h2>

//       <div className="allProductsView">
//         {Object.keys(groupedProducts).map((category) => (
//           <div key={category}>
//             <h3 className="text-3xl font-bold m-4">{category}</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
//               {groupedProducts[category].map((product) => (
//                 <div
//                   key={product.id}
//                   className="card bg-base-100 shadow-xl m-4"
//                 >
//                   <figure>
//                     <img
//                       className="mt-4 object-contain w-48 h-48 rounded-lg"
//                       src={`https://localhost:3005/product/${product.picture}`}
//                       alt="Product"
//                     />
//                   </figure>
//                   <div className="card-body">
//                     <h2 className="text-bold">{product.name}</h2>
//                     <p>{product.description.substring(0, 99)}...</p>
//                     <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1">
//                       <div className="card-actions justify-end mt-2">
//                         <div
//                           className="text"
//                           style={{ color: "green", fontWeight: "bold" }}
//                         >
//                           Rs {product.price}
//                         </div>
//                       </div>
//                       <br />

//                       <Button
//                         className="m-4"
//                         onClick={() => navigate(`/singleProduct/${product.id}`)}
//                         variant="contained"
//                         style={{backgroundColor:"b2d5f5"}}
//                       >
//                         Add to cart
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

  
//       <style jsx>{`
//         .carousel .carousel-item {
//           display: none;
//           opacity: 0;
//           transition: opacity 1s ease-in-out;
//         }

//         .carousel .carousel-item.active {
//           display: block;
//           opacity: 1;
//         }

//         .carousel-section img {
//           border-radius: 15px;
//         }

//         .single-row-card img {
//           border-radius: 15px;
//         }

//         .carousel-item img {
//           max-width: 100%;
//           height: auto;
//           object-fit: contain;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default HomePage;


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
                        style={{backgroundColor:"b2d5f5"}}
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

