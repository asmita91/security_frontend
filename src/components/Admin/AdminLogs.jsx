
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import userServices from '../../services/userService';
import { AdminAppBar } from '../AppBar/AdminAppBar';
import IconButton from '@mui/material/IconButton';
import HttpsIcon from '@mui/icons-material/Https';
import { blue, green, red, orange, purple } from '@mui/material/colors';

// Style the table cells with a modern look
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#003366",
    color: theme.palette.common.white,
    fontWeight: 'bold',
    fontSize: '16px',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: '10px 16px', // Added padding for a more compact look
    borderBottom: '1px solid #ddd',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:hover": {
    backgroundColor: "#e0f7fa", // Hover effect for better interactivity
  },
  cursor: "pointer",
}));

const IconStyledTableCell = styled(StyledTableCell)(({ color }) => ({
  color: color || blue[500],
}));

// Define method colors
const getMethodColor = (method) => {
  switch (method) {
    case 'GET':
      return green[500];
    case 'POST':
      return blue[500];
    case 'PUT':
      return orange[500];
    case 'DELETE':
      return red[500];
    case 'PATCH':
      return purple[500];
    default:
      return blue[500];
  }
};

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const logsData = await userServices.getLogs();
        setLogs(logsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching logs:', error);
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "#f0f8ff", // Light background color
        color: "black",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <AdminAppBar />
      <div className="m-12">
        <h1 className="text-2xl font-bold mb-6">Track of activity log</h1>
        <TableContainer
          component={Paper}
          elevation={3}
          style={{ borderRadius: '12px', overflow: 'hidden' }} // Rounded corners and shadow
        >
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Username</StyledTableCell>
                <StyledTableCell align="center">Role</StyledTableCell>
                <StyledTableCell align="center">URL</StyledTableCell>
                <StyledTableCell align="center">Method</StyledTableCell>
                <StyledTableCell align="center">Time</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logs.map((log, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {log.username}
                  </StyledTableCell>
                  <StyledTableCell align="center">{log.role}</StyledTableCell>
                  <StyledTableCell align="center">{log.url}</StyledTableCell>
                  <IconStyledTableCell align="center" color={getMethodColor(log.method)}>
                    <IconButton size="small" sx={{ color: getMethodColor(log.method) }}>
                      <HttpsIcon />
                    </IconButton>
                    {log.method}
                  </IconStyledTableCell>
                  <StyledTableCell align="center">
                    {new Date(log.time).toLocaleString()}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default AdminLogs;
