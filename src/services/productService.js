

import axios from "axios";
// const baseUrl = 'https://localhost:3005/products';
const baseUrl = 'https://localhost:3005/products';
const cartUrl = 'https://localhost:3005/cart';  // Assuming your cart routes are prefixed with /cart


const getToken = () => `bearer ${window.localStorage.getItem('token')}`;

const getAllProudcts = () => {
    return axios.get(`${baseUrl}`);
};


const getSingleProductById = (id) => {
    return axios.get(`${baseUrl}/${id}`);
}

const getAllReviews = (id) => {
    return axios.get(`${baseUrl}/reviews/${id}`);

}

const addReview = (productId, review) => {
    return axios.post(`${baseUrl}/reviews/${productId}`, review, {
        headers: {
            Authorization: getToken()
        }
    });
};

const deleteReview = (productId, reviewId) => {
    // return axios.delete(`https://localhost:3005/${productId}/${reviewId}`, {
        return axios.delete(`https://localhost:3005/${productId}/${reviewId}`, {

        headers: {
            Authorization: getToken()
        }
    })
};

const updateReview = (productId, reviewId, updatedReview) => {
    // return axios.put(`https://localhost:3005/${productId}/${reviewId}`, updatedReview, {
        return axios.put(`https://localhost:3005/${productId}/${reviewId}`, updatedReview, {

        headers: { Authorization: getToken() }
    })
};

const purchaseProduct = (products) => {
    // return axios.post('https://localhost:3005/purchase', products, {
        return axios.post('https://localhost:3005/purchase', products, {

        headers: {
            Authorization: getToken()
        }

    });
};

// add product by admin only
const addProduct = (product) => {
    // return axios.post(`https://localhost:3005/admin/product`, product, {
        return axios.post(`https://localhost:3005/admin/product`, product, {

        headers: {
            Authorization: getToken()
        }
    });
};

const editProduct = (productId, updatedProduct) => {
    // return axios.put(`https://localhost:3005/admin/product/${productId}`, updatedProduct, {
        return axios.put(`https://localhost:3005/admin/product/${productId}`, updatedProduct, {

        headers: { Authorization: getToken() }
    })
};

const deleteProduct = (productId) => {
    // return axios.delete(`https://localhost:3005/admin/product/${productId}`, {
        return axios.delete(`https://localhost:3005/admin/product/${productId}`, {

        headers: {
            Authorization: getToken()
        }
    })
};

const addToCart = ({ userId, productId, quantity }) => {
    return axios.post(`${cartUrl}/saveCart`, { userId, productId, quantity }, {
        headers: {
            Authorization: getToken()
        }
    });
};

// Get the cart for a specific user
const getCart = (userId) => {
    return axios.get(`${cartUrl}/getCart/${userId}`, {
        headers: {
            Authorization: getToken()
        }
    });
};

const deleteFromCart = (userId, productId) => {
    return axios.delete(`${cartUrl}/deleteItem/${userId}/${productId}`, {
        headers: {
            Authorization: getToken(),
        },
    });
};

const clearCart = (userId) => {
    return axios.delete(`${cartUrl}/clearCart/${userId}`, {
      headers: {
        Authorization: getToken()
      }
    });
  };
const productServices = {
    getAllProudcts,
    getSingleProductById,
    getAllReviews,
    purchaseProduct,
    addReview,
    updateReview,
    deleteReview,
    addProduct,
    editProduct,
    deleteProduct,
    addToCart,
    getCart,
    deleteFromCart, clearCart
}

export default productServices;