"use client";

import React, { useEffect, useState } from "react";
import "quill/dist/quill.snow.css";
import { useEditor } from "./hook";

export default function QuillEditor() {
  const { uploadContent, uploading, error, quillRef, quill } = useEditor();

  return (
    <>
      <div className="flex flex-row gap-8 wrap content-wrap align-center justify-between items-center">
        <div className="flex flex-col gap-4 mb-8 w-full">
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2">
              <i className="material-icons" style={{ fontSize: "20px" }}>
                title
              </i>
              <p className="text-xl ">Title</p>
            </div>
            <input
              type="text"
              className="border-[1px] p-2 rounded-xl w-full"
            ></input>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2">
              <i className="material-icons" style={{ fontSize: "20px" }}>
                description
              </i>
              <p className="text-xl ">Description</p>
            </div>
            <input
              type="text"
              placeholder="Add a short description here..."
              className="border-[1px] p-2 rounded-xl w-full"
            ></input>
          </div>

          <div className="flex flex-col align-center">
            <div className="flex flex-row items-center gap-2">
              <i className="material-icons" style={{ fontSize: "20px" }}>
                image
              </i>
              <p className="text-xl ">Upload banner</p>
            </div>
            <label className="flex flex-col items-center justify-center border-[1px] border-dashed border-gray-400 py-2 rounded-lg cursor-pointer hover:bg-gray-100">
              <div className="flex flex-row items-center gap-2">
                <i className="material-icons" style={{ fontSize: "20px" }}>
                  add
                </i>
                <p className="text-lg font-bold">Add image</p>
              </div>
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <div ref={quillRef} style={{ height: 400 }} />
      </div>
      <button
        disabled={uploading || !quill}
        onClick={() => {
          uploadContent(quill);
        }}
        className={`py-2 px-4 rounded-xl w-full font-bold mt-4 border-[1px] transition duration-100
          ${
            uploading
              ? "bg-gray-400 cursor-not-allowed text-gray-700"
              : "bg-black text-white hover:cursor-pointer hover:bg-white hover:text-black hover:border-black"
          }`}
      >
        {uploading ? "Uploading..." : "Publish"}
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </>
  );
}
