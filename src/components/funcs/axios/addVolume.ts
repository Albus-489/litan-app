import axios from "axios";

export default async function addVolumeName(id: string, volumeName: string) {
  try {
    if (!volumeName) {
      alert("Please enter a volume name");
    }
    const res = await axios.patch(
      `http://localhost:8080/litans/${id}/add-volume`,
      { name: volumeName }
    );

    console.log(res.data.volumes);
  } catch (error) {
    console.log(error);
  }
}
