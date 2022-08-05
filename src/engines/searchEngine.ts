import axios from "axios";

export const searchW3schools = (term = "") => {
  return axios
    .get(
      `https://you.com/api/generic?source=w3schools&fields=frontend_code_snippet&version=4&query=${term}&size=15&service=generic_code&filters=%5B%5D`
    )
    .then((res) => {
      console.log(res.data);
      return res.data;
    });
};

export const searchStackOverflow = (term = "") => {
  return axios
    .get(
      `https://you.com/api/generic?source=stackoverflow&version=2&query=${term}&size=15&service=generic_stackoverflow&filters=%5B%5D`
    )
    .then((res) => {
      console.log(res.data);
      return res.data;
    });
};
