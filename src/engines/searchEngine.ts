import axios from "axios";

const RESPONSE_SIZE = 1;

export const searchW3schools = (term = "") => {
  return axios
    .get(
      `https://you.com/api/generic?source=w3schools&fields=frontend_code_snippet&version=4&query=${term}&size=${RESPONSE_SIZE}&service=generic_code&filters=%5B%5D`
    )
    .then((res) => {
      console.log(res.data);
      return res.data;
    });
};

export const searchStackOverflow = (term = "") => {
  return axios
    .get(
      `https://you.com/api/generic?source=stackoverflow&version=2&query=${term}&size=${RESPONSE_SIZE}&service=generic_stackoverflow&filters=%5B%5D`
    )
    .then((res) => {
      console.log(res.data);
      return res.data;
    });
};
export const searchGeeksForGeeks = (term = "") => {
  return axios
    .get(
      `https://you.com/api/generic?source=geeksforgeeks&fields=frontend_code_snippet&version=8&query=${term}&size=${RESPONSE_SIZE}&service=generic_code&filters=%5B%5D`
    )
    .then((res) => {
      console.log(res.data);
      return res.data;
    });
};
