import DragAndDrop from "./DragAndDrop.jsx"
import React from 'react';

const iconInfo = import.meta.env.BASE_URL + "images/icon-info.svg";

export default function Form({ handleFormCompleted }) {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [ghUsername, setGhUsername] = React.useState("");
    const [file, setFile] = React.useState(null);
    const [fileError, setFileError] = React.useState("");
    const [nameError, setNameError] = React.useState("");
    const [githubError, setGithubError] = React.useState("");
    const [emailError, setEmailError] = React.useState("");

    function handleValidateForm (event) {
        event.preventDefault();

        const hasFileError = file === null
        const hasNameError = name.trim() === "";
        const hasEmailError = !/\S+@\S+\.\S+/.test(email);
        const hasGithubError = ghUsername.trim() === "";

        setFileError(hasFileError ? "Please upload a file." : "");
        setNameError(hasNameError ? "Please enter your name." : "");
        setEmailError(hasEmailError ? "Please enter a valid email address." : "");
        setGithubError(hasGithubError ? "Please enter your GitHub username." : "");

        if (hasFileError || hasNameError || hasEmailError || hasGithubError) {
            return;
        }

        handleFormCompleted({
                "avatar": file,
                "name": name,
                "email": email,
                "ghUsername": ghUsername,
        })
    }

    function handleDrop (event) {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile.size > 500000) {
            setFileError("File size exceeds 500kb. Please choose a smaller file.");
            return;
        }

        if (!droppedFile.type.startsWith("image/")) {
            setFileError("Only image files (JPG or PNG) are allowed.");
            return;
        }

        setFileError("");
        setFile(droppedFile);
    }

    function handleClickUpload (event) {
        const uploadedFile = event.target.files[0];
        if (!uploadedFile){
            return;
        }
        if (uploadedFile.size > 500000) {
            setFileError("File size exceeds 500kb. Please choose a smaller file.");
            event.target.value = "";
            return;
        }

        if (!uploadedFile.type.startsWith("image/")) {
            setFileError("Only image files (JPG or PNG) are allowed.");
            event.target.value = "";
            return;
        }
        
        setFileError("");
        setFile(uploadedFile);
    }

    return (
        <section className="form"> 
            <h1>Your Journey to Coding Conf 2025 Starts Here!</h1>
            <p>Secure your spot at next year's biggest coding conference.</p>
            <form className="form-container" onSubmit={handleValidateForm} noValidate>
                <div className="file-upload-container">
                    <p>Upload Avatar</p>
                    <DragAndDrop handleDrop={handleDrop} handleClickUpload={handleClickUpload} fileError={fileError} file={file}/>
                    <p className="upload-info">
                        <img src={iconInfo} alt="Info Icon" className="icon-info"></img> 
                        <span {...(fileError ? { role: "alert" } : {})} id="file-error" className={fileError ? "error-message" : ""}>Upload your photo (JPG or PNG, max size: 500kb)</span>
                    </p>
                </div>
                <div className="input-name-container input-container">
                    <label htmlFor="input-name" className="input-name-label">Full Name</label>
                    <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="input-name input-bg" 
                    id="input-name" value={name} 
                    onChange={(event) => setName(event.target.value)}
                    aria-describedby={nameError ? "name-error" : null}
                    aria-invalid={nameError ? "true" : "false"}
                    required></input>
                    {nameError ? <p id="name-error" role="alert" className="error-message">{nameError}</p> : null}
                </div>
                <div className="input-email-container input-container">
                    <label htmlFor="input-email" className="input-email-label">Email Address</label>
                    <input 
                    type="email" 
                    placeholder="john.doe@example.com" 
                    className="input-email input-bg" 
                    id="input-email" value={email} 
                    onChange={(event) => setEmail(event.target.value)}
                    aria-describedby={emailError ? "email-error" : null}
                    aria-invalid={emailError ? "true" : "false"}
                    required></input>
                    {emailError ? <p id="email-error" role="alert" className="error-message">{emailError}</p> : null}
                </div>
                <div className="gh-username-container input-container">
                    <label htmlFor="gh-username" className="gh-username-label">GitHub Username</label>
                    <input 
                    type="text" 
                    placeholder="@johnDoe" 
                    className="gh-username input-bg" 
                    id="gh-username" value={ghUsername} 
                    onChange={(event) => setGhUsername(event.target.value)}
                    aria-describedby={githubError ? "github-error" : null}
                    aria-invalid={githubError ? "true" : "false"}
                    required></input>
                    {githubError ? <p id="github-error" role="alert" className="error-message">{githubError}</p> : null}
                </div>
                <button type="submit" className="submit-button">Generate My Ticket</button>
            </form>
        </section>
        
    )
}