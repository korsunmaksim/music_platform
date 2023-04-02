import React, { useRef, MutableRefObject, LegacyRef } from "react";

interface IFileUploadProps {
  setFile: Function;
  accept: string;
  children: React.ReactNode;
}

export const FileUpload = ({ setFile, accept, children }: IFileUploadProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  return (
    <div onClick={() => ref.current?.click()}>
      <input
        type="file"
        accept={accept}
        style={{ display: "none" }}
        ref={ref}
        onChange={onChange}
      />
      {children}
    </div>
  );
};
