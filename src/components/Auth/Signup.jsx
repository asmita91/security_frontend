

// import CheckIcon from '@mui/icons-material/Check';
// import ClearIcon from '@mui/icons-material/Clear';
// import MailLockIcon from '@mui/icons-material/MailLock';
// import PasswordIcon from '@mui/icons-material/Password';
// import PersonIcon from '@mui/icons-material/Person';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import { Box, Button, Grid, IconButton, InputAdornment, Modal, OutlinedInput, Typography } from '@mui/material';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import sound from '../../assets/sound.wav';
// import { allLetter, isEmail } from '../../lib/input-validation';
// import userServices from '../../services/userService';
// import { ResponsiveAppBarLandingPage } from '../AppBar/ResponsiveAppBarLandingPage';
// import { MySnackbar } from '../MySnackbar';

// const Signup = () => {

//     const navigate = useNavigate();

//     const [snack, setSnack] = useState({
//         type: '',
//         message: '',
//     });
//     // for open and close snackbar
//     const [open, setOpen] = React.useState(false);
//     const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
//     const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
//     const [isPasswordValid, setIsPasswordValid] = useState({
//         isLengthValid: false,
//         isUppercaseValid: false,
//         isLowercaseValid: false,
//         isSpecialCharValid: false,
//         isNumberValid: false,
//     });

//     const [email, setEmail] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [fullName, setFullName] = useState('');

//     // Modal state
//     const [modalOpen, setModalOpen] = useState(false);

//     // for closing snackbar
//     const handleClose = (event, reason) => {
//         if (reason === 'clickaway') {
//             return;
//         }
//         setOpen(false);
//     };
//     const play = () => new Audio(sound).play();

//     const handleSignup = (e) => {
//         e.preventDefault();

//         if (!validatePassword(newPassword).isLengthValid ||
//             !validatePassword(newPassword).isLowercaseValid ||
//             !validatePassword(newPassword).isUppercaseValid ||
//             !validatePassword(newPassword).isNumberValid ||
//             !validatePassword(newPassword).isSpecialCharValid) {
//             play();
//             setSnack({
//                 type: 'error',
//                 message: 'Please, follow password guidelines.',
//             });
//             setOpen(true);
//             return;
//         }
//         else if (!allLetter(fullName)) {
//             play();
//             setSnack({
//                 type: 'error',
//                 message: 'Please, enter valid name.Length must be greater than 5 and less than 25',
//             });
//             setOpen(true);
//             return;
//         }

//         else if (!isEmail(email)) {
//             play();
//             setSnack({
//                 type: 'error',
//                 message: 'Please, enter valid email.',
//             });
//             setOpen(true);
//             return;
//         }

//         else if (newPassword !== confirmPassword) {
//             play();
//             setSnack({
//                 type: 'error',
//                 message: 'Password and confirm password must be same',
//             });
//             setOpen(true);
//             return;
//         }
//         else {

//             // new user data
//             const newUser = {
//                 fullName: fullName,
//                 email: email,
//                 password: newPassword,
//             }

//             userServices.register(newUser)
//                 .then(res => {
//                     console.log(res.data);
//                     play();
//                     setSnack({
//                         type: 'success',
//                         message: 'Signup successfully.',
//                     });
//                     setOpen(true);

//                     // reset all fields
//                     setFullName('');
//                     setEmail('');
//                     setNewPassword('');
//                     setConfirmPassword('');
                    
//                     navigate('/login');

//                 })
//                 .catch(err => {
//                     console.log(err);
//                     play();
//                     setSnack({
//                         type: 'error',
//                         message: err.response.data.error,
//                     });
//                     setOpen(true);
//                 })
//         }
//     };

//     const validatePassword = (password) => {
//         const isLengthValid = password.length >= 8;
//         const isUppercaseValid = /[A-Z]/.test(password);
//         const isLowercaseValid = /[a-z]/.test(password);
//         const isNumberValid = /\d/.test(password);
//         const isSpecialCharValid = /[!@#$%^&*()_+[\]{};':"<>?~]/.test(password);

//         return {
//             isLengthValid,
//             isUppercaseValid,
//             isLowercaseValid,
//             isNumberValid,
//             isSpecialCharValid,
//         };
//     };

//     const handlePasswordChange = (e) => {
//         const password = e.target.value;
//         const passwordValidations = validatePassword(password);
//         setNewPassword(password);
//         setIsPasswordValid(passwordValidations);
//     };

//     const modalStyle = {
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         width: 400,
//         bgcolor: 'background.paper',
//         borderRadius: '12px',
//         boxShadow: 24,
//         p: 4,
//         outline: 'none',
//     };


//     return (
//         <div style={{ backgroundColor: '#b2d5f5', color: 'black', minHeight: '100vh', padding: '20px' }}>
//             <ResponsiveAppBarLandingPage />
//             <div className="container mx-auto p-4 lg:p-12">
//                 <div className="form-container mx-auto" align="center">
//                     <Grid container spacing={2} justifyContent="center">
//                         <Grid item xs={12} sm={6}>
//                             <div className='mx-auto pt-10'>
//                                 <div className="form-box rounded-lg mt-3 p-5 m-auto">
//                                     <div className="title text-3xl font-bold">
//                                         Create your account
//                                     </div>

//                                     <div className="mt-5">
//                                         <form onSubmit={handleSignup}>
//                                             <div>
//                                                 <div className="input-label mb-1" align="left">
//                                                     Full Name:
//                                                 </div>
//                                                 <OutlinedInput
//                                                     placeholder='Enter full name...'
//                                                     className='input input-bordered w-full mb-2'
//                                                     onChange={(e) => setFullName(e.target.value)}
//                                                     startAdornment={<InputAdornment position="start"><PersonIcon /></InputAdornment>}
//                                                     type="text"
//                                                     variant="outlined"
//                                                     required
//                                                     style={{ color: 'black' }}
//                                                 />
//                                             </div>
//                                             <div>
//                                                 <div className="input-label mb-1" align="left">
//                                                     Email:
//                                                 </div>
//                                                 <OutlinedInput
//                                                     placeholder='Enter email...'
//                                                     className='input input-bordered w-full mb-2'
//                                                     onChange={(e) => setEmail(e.target.value)}
//                                                     startAdornment={<InputAdornment position="start"><MailLockIcon /></InputAdornment>}
//                                                     type="email"
//                                                     variant="outlined"
//                                                     required
//                                                     style={{ color: 'black' }}
//                                                 />
//                                             </div>

//                                             <div className="">
//                                                 <div className="input-label mb-1" align="left">
//                                                     New Password:
//                                                 </div>
//                                                 <OutlinedInput
//                                                     placeholder='Enter new password...'
//                                                     className='input input-bordered w-full mb-2'
//                                                     onChange={handlePasswordChange}
//                                                     startAdornment={<InputAdornment position="start"><PasswordIcon /></InputAdornment>}
//                                                     type={isNewPasswordVisible ? 'text' : 'password'}
//                                                     endAdornment={
//                                                         <IconButton onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}>
//                                                             {isNewPasswordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
//                                                         </IconButton>
//                                                     }
//                                                     variant="outlined"
//                                                     required
//                                                     style={{ color: 'black' }}
//                                                 />
//                                             </div>
// <div>
// {
//                                                     validatePassword(newPassword).isLengthValid &&
//                                                     validatePassword(newPassword).isLowercaseValid &&
//                                                     validatePassword(newPassword).isUppercaseValid &&
//                                                     validatePassword(newPassword).isNumberValid &&
//                                                     validatePassword(newPassword).isSpecialCharValid
//                                                     ? <h4 className='text-success font-bold'>Strong Password!</h4> : <h4 style={{ color: 'red' }} className=' font-bold'>Weak Password, consider changing!</h4>
//                                                 }
// </div>
//                                             <div className="">
//                                                 <div className="input-label mb-1" align="left">
//                                                     Confirm Password:
//                                                 </div>
//                                                 <OutlinedInput 
//                                                     placeholder='Enter password again...'
//                                                     className='input input-bordered w-full mb-2'
//                                                     onChange={(e) => setConfirmPassword(e.target.value)}
//                                                     startAdornment={<InputAdornment position="start"><PasswordIcon /></InputAdornment>}
//                                                     type={isConfirmPasswordVisible ? 'text' : 'password'}
//                                                     endAdornment={
//                                                         <IconButton onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
//                                                             {isConfirmPasswordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
//                                                         </IconButton>
//                                                     }
//                                                     variant="outlined"
//                                                     required
//                                                     style={{ color: 'black' }}
//                                                 />

//                                                 <div className="mt-2 mb-2">
//                                                     <Button onClick={() => setModalOpen(true)} variant="outlined">Password Guidelines</Button>
//                                                 </div>

                                               

//                                                 <input
//   type="submit"
//   value="Signup"
//   className="mt-1 btn btn-primary custom-btn"
//   style={{
//     backgroundColor: '#000000',
//     color: 'white',
//     border: 'none', // Remove the default border
//     marginLeft: '3rem',
//     marginRight: '3rem',
//   }}
// />

//                                             </div>
//                                         </form>

//                                             <label htmlFor="" className=' p-4'>
//     Already have an account? 
//     <span 
//         onClick={() => navigate('/login')} 
//         style={{ cursor: 'pointer', color: '#b2d5f5', textDecoration: 'underline', marginLeft: '5px' }}
//     >
//         Login
//     </span>
// </label>
//                                         <MySnackbar open={open} handleClose={handleClose} type={snack.type} message={snack.message} />
//                                     </div>
//                                 </div>
//                             </div>
//                         </Grid>
//                     </Grid>
//                 </div>
//             </div>

//             <Modal
//                 open={modalOpen}
//                 onClose={() => setModalOpen(false)}
//                 aria-labelledby="modal-modal-title"
//                 aria-describedby="modal-modal-description"
//             >
//                 <Box sx={modalStyle}>
                   
//                     <Typography id="modal-modal-description" sx={{ mt: 0 }}>
//                         <label htmlFor="passwordLength">
//                             {
//                                 isPasswordValid.isLengthValid ? <CheckIcon style={{ color: 'green' }} /> : <ClearIcon style={{ color: 'red' }} />
//                             }
//                             Password must be at least 8 characters.
//                         </label>
//                         <br />

//                         <label htmlFor="containsUpperCase">
//                             {
//                                 isPasswordValid.isUppercaseValid ? <CheckIcon style={{ color: 'green' }} /> : <ClearIcon style={{ color: 'red' }} />
//                             }
//                             Password must contain at least one uppercase letter.
//                         </label>
//                         <br />
//                         <label htmlFor="containsLowerCase">
//                             {
//                                 isPasswordValid.isLowercaseValid ? <CheckIcon style={{ color: 'green' }} /> : <ClearIcon style={{ color: 'red' }} />
//                             }
//                             Password must contain at least one lowercase letter.
//                         </label>
//                         <br />
//                         <label htmlFor="containsNumber">
//                             {
//                                 isPasswordValid.isNumberValid ? <CheckIcon style={{ color: 'green' }} /> : <ClearIcon style={{ color: 'red' }} />
//                             }
//                             Password must contain at least one number.
//                         </label>
//                         <br />
//                         <label htmlFor="containsSpecialCharacter">
//                             {
//                                 isPasswordValid.isSpecialCharValid ? <CheckIcon style={{ color: 'green' }} /> : <ClearIcon style={{ color: 'red' }} />
//                             }
//                             Password must contain at least one special character.
//                         </label>
//                     </Typography>
//                 </Box>
//             </Modal>
//             <style jsx>{`.form-container {
//     max-width: 850px;
//     margin-top: -7%;
//     margin-bottom: -1%;
// }

// .form-box {
//     border: 1px solid #b2d5f5;
//     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//     background-color: white;
// }

// .title {
//     font-size: 2rem;
// }

// .input-label, .input {
//     font-size: 1rem;
// }

// .text-success {
//     color: green;
// }

// .text-warning {
//     color: orange;
// }

// .custom-btn {
//   background-color: #b2d5f5;
//   color: white;
//   border: none; /* Remove the default border */
//   margin-left: 3rem;
//   margin-right: 3rem;
//   transition: background-color 0.3s ease;
// }

// .custom-btn:hover {
//   background-color: blue; /* Darker blue color for hover */
// }

// `}</style>
//         </div>
//     )
// }

// export default Signup;

import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import MailLockIcon from '@mui/icons-material/MailLock';
import PasswordIcon from '@mui/icons-material/Password';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Button, Grid, IconButton, InputAdornment, Modal, OutlinedInput, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sound from '../../assets/sound.wav';
import { allLetter, isEmail } from '../../lib/input-validation';
import userServices from '../../services/userService';
import { ResponsiveAppBarLandingPage } from '../AppBar/ResponsiveAppBarLandingPage';
import { MySnackbar } from '../MySnackbar';

const Signup = () => {

    const navigate = useNavigate();

    const [snack, setSnack] = useState({
        type: '',
        message: '',
    });
    // for open and close snackbar
    const [open, setOpen] = React.useState(false);
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState({
        isLengthValid: false,
        isUppercaseValid: false,
        isLowercaseValid: false,
        isSpecialCharValid: false,
        isNumberValid: false,
    });

    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');

    const [emailError, setEmailError] = useState('');
    const [fullNameError, setFullNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);

    // for closing snackbar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const play = () => new Audio(sound).play();

    const handleSignup = (e) => {
        e.preventDefault();

        let hasError = false;

        if (!validatePassword(newPassword).isLengthValid ||
            !validatePassword(newPassword).isLowercaseValid ||
            !validatePassword(newPassword).isUppercaseValid ||
            !validatePassword(newPassword).isNumberValid ||
            !validatePassword(newPassword).isSpecialCharValid) {
            setPasswordError('Please, follow password guidelines.');
            hasError = true;
        } else {
            setPasswordError('');
        }

        if (!allLetter(fullName)) {
            setFullNameError('Please, enter a valid name. Length must be greater than 5 and less than 25.');
            hasError = true;
        } else {
            setFullNameError('');
        }

        if (!isEmail(email)) {
            setEmailError('Please, enter a valid email.');
            hasError = true;
        } else {
            setEmailError('');
        }

        if (newPassword !== confirmPassword) {
            setConfirmPasswordError('Password and confirm password must be the same.');
            hasError = true;
        } else {
            setConfirmPasswordError('');
        }

        if (hasError) {
            play();
            return;
        }

        const newUser = {
            fullName: fullName,
            email: email,
            password: newPassword,
        }

        userServices.register(newUser)
            .then(res => {
                console.log(res.data);
                play();
                setSnack({
                    type: 'success',
                    message: 'Signup successfully.',
                });
                setOpen(true);

                // reset all fields
                setFullName('');
                setEmail('');
                setNewPassword('');
                setConfirmPassword('');

                navigate('/login');

            })
            .catch(err => {
                console.log(err);
                play();
                setSnack({
                    type: 'error',
                    message: err.response.data.error,
                });
                setOpen(true);
            });
    };

    const validatePassword = (password) => {
        const isLengthValid = password.length >= 8;
        const isUppercaseValid = /[A-Z]/.test(password);
        const isLowercaseValid = /[a-z]/.test(password);
        const isNumberValid = /\d/.test(password);
        const isSpecialCharValid = /[!@#$%^&*()_+[\]{};':"<>?~]/.test(password);

        return {
            isLengthValid,
            isUppercaseValid,
            isLowercaseValid,
            isNumberValid,
            isSpecialCharValid,
        };
    };

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        const passwordValidations = validatePassword(password);
        setNewPassword(password);
        setIsPasswordValid(passwordValidations);
        setPasswordError(''); // Clear password error when typing
    };

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: '12px',
        boxShadow: 24,
        p: 4,
        outline: 'none',
    };

    return (
        <div style={{ backgroundColor: '#b2d5f5', color: 'black', minHeight: '100vh', padding: '20px' }}>
            <ResponsiveAppBarLandingPage />
            <div className="container mx-auto p-4 lg:p-12">
                <div className="form-container mx-auto" align="center">
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} sm={6}>
                            <div className='mx-auto pt-10'>
                                <div className="form-box rounded-lg mt-3 p-5 m-auto">
                                    <div className="title text-3xl font-bold">
                                        Create your account
                                    </div>

                                    <div className="mt-5">
                                        <form onSubmit={handleSignup}>
                                            <div>
                                                <div className="input-label mb-1" align="left">
                                                    Full Name:
                                                </div>
                                                <OutlinedInput
                                                    placeholder='Enter full name...'
                                                    className='input input-bordered w-full mb-2'
                                                    value={fullName}
                                                    onChange={(e) => {
                                                        setFullName(e.target.value);
                                                        setFullNameError('');
                                                    }}
                                                    startAdornment={<InputAdornment position="start"><PersonIcon /></InputAdornment>}
                                                    type="text"
                                                    variant="outlined"
                                                    required
                                                    style={{ color: 'black' }}
                                                />
                                                {fullNameError && <div style={{ color: 'red' }}>{fullNameError}</div>}
                                            </div>
                                            <div>
                                                <div className="input-label mb-1" align="left">
                                                    Email:
                                                </div>
                                                <OutlinedInput
                                                    placeholder='Enter email...'
                                                    className='input input-bordered w-full mb-2'
                                                    value={email}
                                                    onChange={(e) => {
                                                        setEmail(e.target.value);
                                                        setEmailError('');
                                                    }}
                                                    startAdornment={<InputAdornment position="start"><MailLockIcon /></InputAdornment>}
                                                    type="email"
                                                    variant="outlined"
                                                    required
                                                    style={{ color: 'black' }}
                                                />
                                                {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
                                            </div>

                                            <div className="">
                                                <div className="input-label mb-1" align="left">
                                                    New Password:
                                                </div>
                                                <OutlinedInput
                                                    placeholder='Enter new password...'
                                                    className='input input-bordered w-full mb-2'
                                                    value={newPassword}
                                                    onChange={handlePasswordChange}
                                                    startAdornment={<InputAdornment position="start"><PasswordIcon /></InputAdornment>}
                                                    type={isNewPasswordVisible ? 'text' : 'password'}
                                                    endAdornment={
                                                        <IconButton onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}>
                                                            {isNewPasswordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                        </IconButton>
                                                    }
                                                    variant="outlined"
                                                    required
                                                    style={{ color: 'black' }}
                                                />
                                                {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
                                            </div>
                                             <div>
{
                                                    validatePassword(newPassword).isLengthValid &&
                                                    validatePassword(newPassword).isLowercaseValid &&
                                                    validatePassword(newPassword).isUppercaseValid &&
                                                    validatePassword(newPassword).isNumberValid &&
                                                    validatePassword(newPassword).isSpecialCharValid
                                                    ? <h4 className='text-success font-bold'>Strong Password!</h4> : <h4 style={{ color: 'red' }} className=' font-bold'>Weak Password, consider changing!</h4>
                                                }
</div>

                                            <div className="">
                                                <div className="input-label mb-1" align="left">
                                                    Confirm Password:
                                                </div>
                                                <OutlinedInput 
                                                    placeholder='Enter password again...'
                                                    className='input input-bordered w-full mb-2'
                                                    value={confirmPassword}
                                                    onChange={(e) => {
                                                        setConfirmPassword(e.target.value);
                                                        setConfirmPasswordError('');
                                                    }}
                                                    startAdornment={<InputAdornment position="start"><PasswordIcon /></InputAdornment>}
                                                    type={isConfirmPasswordVisible ? 'text' : 'password'}
                                                    endAdornment={
                                                        <IconButton onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
                                                            {isConfirmPasswordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                        </IconButton>
                                                    }
                                                    variant="outlined"
                                                    required
                                                    style={{ color: 'black' }}
                                                />
                                                {confirmPasswordError && <div style={{ color: 'red' }}>{confirmPasswordError}</div>}
                                            </div>

                                            <div className="mt-2 mb-2">
                                                <Button onClick={() => setModalOpen(true)} variant="outlined">Password Guidelines</Button>
                                            </div>

                                            <input
                                                type="submit"
                                                value="Signup"
                                                className="mt-1 btn btn-primary custom-btn"
                                                style={{
                                                    backgroundColor: '#000000',
                                                    color: 'white',
                                                    border: 'none', 
                                                    marginLeft: '3rem',
                                                    marginRight: '3rem',
                                                }}
                                            />

                                        </form>

                                        <label htmlFor="" className=' p-4'>
                                            Already have an account? 
                                            <span 
                                                onClick={() => navigate('/login')} 
                                                style={{ cursor: 'pointer', color: '#b2d5f5', textDecoration: 'underline', marginLeft: '5px' }}
                                            >
                                                Login
                                            </span>
                                        </label>
                                        <MySnackbar open={open} handleClose={handleClose} type={snack.type} message={snack.message} />
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>

            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-description" sx={{ mt: 0 }}>
                        <label htmlFor="passwordLength">
                            {
                                isPasswordValid.isLengthValid ? <CheckIcon style={{ color: 'green' }} /> : <ClearIcon style={{ color: 'red' }} />
                            }
                            Password must be at least 8 characters.
                        </label>
                        <br />

                        <label htmlFor="containsUpperCase">
                            {
                                isPasswordValid.isUppercaseValid ? <CheckIcon style={{ color: 'green' }} /> : <ClearIcon style={{ color: 'red' }} />
                            }
                            Password must contain at least one uppercase letter.
                        </label>
                        <br />
                        <label htmlFor="containsLowerCase">
                            {
                                isPasswordValid.isLowercaseValid ? <CheckIcon style={{ color: 'green' }} /> : <ClearIcon style={{ color: 'red' }} />
                            }
                            Password must contain at least one lowercase letter.
                        </label>
                        <br />
                        <label htmlFor="containsNumber">
                            {
                                isPasswordValid.isNumberValid ? <CheckIcon style={{ color: 'green' }} /> : <ClearIcon style={{ color: 'red' }} />
                            }
                            Password must contain at least one number.
                        </label>
                        <br />
                        <label htmlFor="containsSpecialCharacter">
                            {
                                isPasswordValid.isSpecialCharValid ? <CheckIcon style={{ color: 'green' }} /> : <ClearIcon style={{ color: 'red' }} />
                            }
                            Password must contain at least one special character.
                        </label>
                    </Typography>
                </Box>
            </Modal>
            <style jsx>{`.form-container {
                max-width: 850px;
                margin-top: -7%;
                margin-bottom: -1%;
            }

            .form-box {
                border: 1px solid #b2d5f5;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                background-color: white;
            }

            .title {
                font-size: 2rem;
            }

            .input-label, .input {
                font-size: 1rem;
            }

            .text-success {
                color: green;
            }

            .text-warning {
                color: orange;
            }

            .custom-btn {
                background-color: #b2d5f5;
                color: white;
                border: none; 
                margin-left: 3rem;
                margin-right: 3rem;
                transition: background-color 0.3s ease;
            }

            .custom-btn:hover {
                background-color: blue; 
            }

            `}</style>
        </div>
    )
}

export default Signup;
