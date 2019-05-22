import {
  LOAD_ORDERS_REQUEST,
  LOAD_ORDERS_SUCCESS,
  LOAD_ORDERS_FAILURE,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILURE,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAILURE,
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAILURE,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAILURE,
  NEW_ORDER_REQUEST
} from "./actionTypes";

// Order actions

export function loadOrders(filters) {
  return {
      endpoint: "orders?_expand=customer",
      orders: [],
      filters: filters,
      types: [LOAD_ORDERS_REQUEST, LOAD_ORDERS_SUCCESS, LOAD_ORDERS_FAILURE]
  };
}

export function getOrder(id) {
  return {
      endpoint: `orders/${id}?_expand=customer`,
      order: {},
      types: [GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILURE]
  };
}

export function updateOrder(order) {
  return {
      endpoint: `orders/${order.id}`,
      data: order,
      method: "PUT",
      authenticated: true,
      updateSuccess: false,
      types: [UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_FAILURE]
  };
}

export function addOrder(order) {
  return {
      endpoint: `orders/`,
      data: order,
      method: "POST",
      authenticated: true,
      addSuccess: false,
      types: [ADD_ORDER_REQUEST, ADD_ORDER_SUCCESS, ADD_ORDER_FAILURE]
  };
}

export function newOrder() {
  return {
    type: NEW_ORDER_REQUEST
  };
}

export function deleteOrder(id) {
  return {
      endpoint: `orders/${id}`,
      method: "DELETE",
      authenticated: true,
      types: [DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELETE_ORDER_FAILURE]
  };
}
