import { CLEAR_CART, CLEAR_ORDER, CREATE_ORDER, FETCH_ORDERS, DELETE_ORDER } from "../types"

export const createOrder = (order) => (dispatch) => {
    fetch("/api/orders", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(order),
    }).then (res => res.json())
    .then(data => {
        dispatch ({
            type: CREATE_ORDER,
            payload: data,
        });
        localStorage.clear("cartItems");
        dispatch ({
            type: CLEAR_CART
        })
    })
}

export const clearOrder = () => dispatch => {
    dispatch ({
        type: CLEAR_ORDER
    })
}

export const fetchOrders = () => dispatch => {
    fetch ('/api/orders')
    .then((res) => res.json())
    .then((data) => {
        dispatch ({
            type: FETCH_ORDERS,
            payload: data,
        })
    })
}

// export const removeFromOrders = (orders, order) => (dispatch) => {
//     fetch (`/api/orders/${order._id}`, {
//         method: "DELETE"
//     })
//     .then((res) => res.json())
//     .then((data) => {
//         const orderAfterDeleted = orders.filter(o => data._id !== o._id );
//         dispatch ({
//             type: DELETE_ORDER,
//             payload: orderAfterDeleted,
//         })
//     })
// }
export const removeFromOrders = (orders, order) => async (dispatch) => {
    const res = await fetch (`/api/orders/${order._id}`, {
                                method: "DELETE"
                            });
    const data = await res.json();
    const orderAfterDeleted = orders.filter(o => data._id !== o._id );
    dispatch ({
        type: DELETE_ORDER,
        payload: orderAfterDeleted,
    });
}