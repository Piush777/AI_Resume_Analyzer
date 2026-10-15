import * as pdfjsLib from "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs";

// DOM elements
const resumeFile = document.getElementById("resumeFile");
const fileName = document.getElementById("file-name");
const analyzeBtn = document.getElementById("analyzeBtn");

const uploadSection = document.getElementById("upload-section");
const uploadIcon = document.getElementById("upload-icon");
const pdfCanvas = document.getElementById("pdf-canvas");
const pdfContext = pdfCanvas.getContext("2d");

const uploadText = document.getElementById("upload-text");
const fileInfo = document.getElementById("file-info");
const noFile = document.getElementById("no-file");
const removePdfBtn = document.getElementById("remove-pdf-btn");

let selectedPdf = null;

// Reset the preview to its initial state
function resetPreview() {
    selectedPdf = null;

    // Clear the selected file
    resumeFile.value = "";

    // Remove the selected state
    uploadSection.classList.remove("file-selected");

    // Clear and hide the PDF canvas
    pdfCanvas.style.display = "none";
    pdfCanvas.width = 0;
    pdfCanvas.height = 0;

    // Reset file name
    fileName.textContent = "No file chosen";
    fileName.style.display = "none";

    // Restore upload text
    uploadText.style.display = "block";

    // Restore cloud upload icon
    const cloudIcon = uploadIcon.querySelector("i");

    if (cloudIcon) {
        cloudIcon.style.display = "block";
    }

    // Hide file information
    fileInfo.style.display = "none";

    // Restore file selection text
    noFile.textContent = "No file chosen";
    noFile.style.display = "inline";

    // Reset button text but keep the button clickable
    analyzeBtn.textContent = "Analyze Resume";
}

// Remove the selected PDF
removePdfBtn.addEventListener("click", () => {
    resetPreview();
});

// Handle PDF selection and preview
resumeFile.addEventListener("change", async () => {
    const file = resumeFile.files[0];

    if (!file) return;

    // Reset the previous preview without clearing the new selection
    selectedPdf = null;
    uploadSection.classList.remove("file-selected");

    pdfCanvas.style.display = "none";
    pdfCanvas.width = 0;
    pdfCanvas.height = 0;

    fileName.textContent = "No file chosen";
    fileName.style.display = "none";

    uploadText.style.display = "block";
    fileInfo.style.display = "none";
    noFile.style.display = "inline";

    const cloudIcon = uploadIcon.querySelector("i");

    if (cloudIcon) {
        cloudIcon.style.display = "block";
    }

    if (
        file.type !== "application/pdf" &&
        !file.name.toLowerCase().endsWith(".pdf")
    ) {
        alert("Please select a PDF file.");
        resumeFile.value = "";
        return;
    }

    try {
        console.log("Selected PDF:", file.name);

        const arrayBuffer = await file.arrayBuffer();

        const pdf = await pdfjsLib.getDocument({
            data: arrayBuffer
        }).promise;

        console.log("PDF loaded. Pages:", pdf.numPages);

        // Render the first page
        const page = await pdf.getPage(1);

        // Calculate a preview that fits the available width
        const baseViewport = page.getViewport({ scale: 1 });
        const previewWidth = 120;
        const scale = previewWidth / baseViewport.width;
        const viewport = page.getViewport({ scale });

        // Set actual canvas resolution
        pdfCanvas.width = Math.ceil(viewport.width);
        pdfCanvas.height = Math.ceil(viewport.height);

        // Set displayed size
        pdfCanvas.style.width = `${Math.ceil(viewport.width)}px`;
        pdfCanvas.style.height = "auto";
        pdfCanvas.style.maxWidth = "100%";
        pdfCanvas.style.maxHeight = "350px";

        await page.render({
            canvasContext: pdfContext,
            viewport
        }).promise;

        // Update UI after successful rendering
        selectedPdf = file;

        fileName.textContent = file.name;
        fileName.style.display = "block";
        noFile.style.display = "none";

        uploadSection.classList.add("file-selected");
        uploadText.style.display = "none";

        if (cloudIcon) {
            cloudIcon.style.display = "none";
        }

        fileInfo.style.display = "flex";
        pdfCanvas.style.display = "block";

        console.log("PDF preview rendered successfully.");

    } catch (error) {
        console.error("PDF preview failed:", error);

        resetPreview();

        alert(
            "Could not preview this PDF. Please try another PDF file. " +
            "Check the browser console (F12) for details."
        );
    }
});

// Analyze button
analyzeBtn.addEventListener("click", () => {
    if (!selectedPdf) {
        alert("Please select a PDF file before analyzing your resume.");
        return;
    }

    console.log("Ready for analysis:", selectedPdf.name);

    alert(
        "PDF preview is working. Resume analysis is not connected yet."
    );
});
