// import React, { useEffect, useState } from 'react'
// import userServices from '../../services/userService';
// import { ResponsiveAppBarHomepage } from '../AppBar/ResponsiveAppBarHomepage';
// import { usePurchase } from '../../utils/purchaseContext';

// export const PurchaseHistory = () => {
//     const purchase = usePurchase();
//     const [purchaseProducts, setPurchaseProducts] = useState([]);

//     useEffect(() => {
//         userServices.getAllPurchaseProducts()
//             .then(res => setPurchaseProducts(res.data))
//             .catch(err => window.alert(err.response.data.error));
//     }, []);

//     console.log(purchaseProducts.length);
//     console.log(purchaseProducts)
//     return (
//         <div>
//             <ResponsiveAppBarHomepage purchaseProductLength={purchase.purchase.length} />

//             <div className='m-12'>
//                 <h1 className='text-3xl m-10 font-bold'>Purchase History</h1>

//                 <div className="overflow-x-auto">
//                     <table className="table">
//                         {/* head */}
//                         <thead>
//                             <tr>

//                                 <th className='text-info text-2xl'>Name</th>
//                                 <th className='text-info text-2xl'>Purchase Date</th>
//                                 <th className='text-info text-2xl'>Quantity</th>
//                                 <th className='text-info text-2xl'>Price per piece</th>
//                                 <th className='text-info text-2xl'>Total Price</th>
//                             </tr>
//                         </thead>
//                         <tbody>

//                             {
//                                 purchaseProducts.map((item, index) => (
//                                     <tr key={item.id}>

//                                         <td>
//                                             <div className="flex items-center space-x-3">

//                                                 <div>
//                                                     <div className="font-bold" style={{ color: 'white' }}>{item.name}</div>
//                                                     {/* <div className="text-sm opacity-50">{item.category}</div> */}
//                                                 </div>
//                                             </div>
//                                         </td>
//                                         <td>{item.purchaseDate}</td>
//                                         <td>
//                                             {item.quantity}

//                                         </td>
//                                         <td>{item.price}</td>
//                                         <td>{item.totalPrice}</td>

//                                     </tr>
//                                 ))
//                             }

//                         </tbody>
//                         {/* foot */}
//                         <tfoot>
//                             <tr>
//                                 <th></th>
//                                 <th></th>
//                                 <th></th>
//                                 <th></th>

//                             </tr>
//                         </tfoot>

//                     </table>
//                 </div>

//             </div>
//         </div>
//     )
// }



import React, { useEffect, useState } from 'react';
import userServices from '../../services/userService';
import { ResponsiveAppBarHomepage } from '../AppBar/ResponsiveAppBarHomepage';
import { usePurchase } from '../../utils/purchaseContext';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#003366',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const PurchaseHistory = () => {
  const purchase = usePurchase();
  const [purchaseProducts, setPurchaseProducts] = useState([]);

  useEffect(() => {
    userServices.getAllPurchaseProducts()
      .then(res => setPurchaseProducts(res.data))
      .catch(err => window.alert(err.response.data.error));
  }, []);

  return (
    <div style={{ backgroundColor: "#b2d5f5", color: "black", minHeight: "100vh", padding: "20px" }}>
      <ResponsiveAppBarHomepage purchaseProductLength={purchase.purchase.length} />

      <div className="m-12">
        <h1 className="text-3xl font-bold">Purchase History</h1>

        <TableContainer component={Paper} className="mt-6">
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Purchase Date</StyledTableCell>
                <StyledTableCell align="right">Quantity</StyledTableCell>
                <StyledTableCell align="right">Price per piece</StyledTableCell>
                <StyledTableCell align="right">Total Price</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {purchaseProducts.map((item) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell component="th" scope="row">
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-bold">{item.name}</div>
                      </div>
                    </div>
                  </StyledTableCell>
                  <StyledTableCell align="right">{item.purchaseDate}</StyledTableCell>
                  <StyledTableCell align="right">{item.quantity}</StyledTableCell>
                  <StyledTableCell align="right">{item.price}</StyledTableCell>
                  <StyledTableCell align="right">{item.totalPrice}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
