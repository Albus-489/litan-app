import React, { useState } from "react";
import { IBook } from "./models/interfaces/IBook";

interface IFile {
  name: string;
  content: string;
}

type UploadFileProps = {
  books: IBook[];
  setBooks: React.Dispatch<React.SetStateAction<IBook[]>>;
};

const UploadFile: React.FC<UploadFileProps> = ({ books, setBooks }) => {
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedFile(event.target.files![0]);
  };

  const handleUploadFile = () => {
    const fileReader = new FileReader();
    fileReader.readAsText(selectedFile!);
    fileReader.onload = () => {
      const content = fileReader.result as string;
      localStorage.setItem("tstContent", content);
      setBooks(JSON.parse(content));
      console.log(JSON.parse(localStorage.getItem("tstContent")!));
    };
  };

  return (
    <div>
      <h1>Upload File</h1>
      <input type="file" onChange={handleFileInputChange} />
      <button onClick={handleUploadFile}>Upload</button>
      {/* {books && (
        <div>
          <h2>Uploaded file:</h2>
          <p>Filename: {books[0].name}</p>
        </div>
      )} */}
    </div>
  );
};

export default UploadFile;
