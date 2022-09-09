import axios, { Method } from "axios";

const API_DOMAIN = "http://localhost:5000";

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "*/*",
  "Access-Control-Allow-Origin": "*",
};

export const getImage = async ({
  method,
  body,
  headers,
}: {
  method: Method;
  body?: object;
  headers?: object;
}) => {
  try {
    const apiResponse = await axios(`${API_DOMAIN}/image`, {
      data: body ? JSON.stringify(body) : undefined,
      headers: { ...defaultHeaders, ...headers },
    });
    return apiResponse;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const testApi = async ({
  method,
  body,
  headers,
}: {
  method: Method;
  body?: object;
  headers?: object;
}) => {
  try {
    const apiResponse = await axios(`${API_DOMAIN}/api`, {
      data: body ? JSON.stringify(body) : undefined,
      headers: { ...defaultHeaders, ...headers },
    });
    return apiResponse;
  } catch (error) {
    console.error(error);
    return error;
  }
};
