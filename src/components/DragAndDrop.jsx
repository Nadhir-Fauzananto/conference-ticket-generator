import React from 'react';
const iconUpload = import.meta.env.BASE_URL + "images/icon-upload.svg";

export default function DragAndDrop({ handleDrop, handleClickUpload, fileError, file }) {
    function handleDragOver (event) {
        event.preventDefault();
    }

    return (
        <div className="drag-and-drop-area">
            <label 
            htmlFor="input-image" 
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            aria-label="Drag and drop an image file here or click to upload.">
                <div className="icon-upload-container">
                    <img src={iconUpload} alt="Upload Icon" className="icon-upload"></img>
                </div>
                <p aria-live="polite">{ file ? file.name :"Drag and drop or click to upload"}</p>
                <input 
                type="file" 
                accept="image/*" 
                className="input-image input-bg" 
                name="input-image" 
                id="input-image" 
                onChange={handleClickUpload}
                aria-required="true"></input>
            </label>
        </div>
    )
}