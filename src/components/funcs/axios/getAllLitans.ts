import axios from "axios";

export async function getAllLitans() {
  const response = await axios
    .get("http://localhost:8080/litans")
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}
