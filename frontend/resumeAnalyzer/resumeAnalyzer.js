import * as pdfjsLib from "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.min.mjs";

pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs";


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


resumeFile.addEventListener("change", async () => {

    if (resumeFile.files.length === 0) {
        return;
    }

    const file = resumeFile.files[0];

    // Show file name
    fileName.textContent = file.name;
    fileName.style.display = "block";
    noFile.style.display = "none";


    // Read PDF
    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer
    }).promise;


    // Get first page
    const page = await pdf.getPage(1);

    const viewport = page.getViewport({
        scale: 1
    });


    // Set canvas size
    pdfCanvas.width = viewport.width;
    pdfCanvas.height = viewport.height;


    // Render PDF page
    await page.render({
        canvasContext: pdfContext,
        viewport: viewport
    }).promise;


    // Change upload section to selected state
    uploadSection.classList.add("file-selected");

    // Hide upload instructions
    uploadText.style.display = "none";

    // Hide cloud icon
    uploadIcon.querySelector("i").style.display = "none";

    // Show PDF preview
    pdfCanvas.style.display = "block";

    // Show file information
    fileInfo.style.display = "flex";

});


analyzeBtn.addEventListener("click", () => {

    if (resumeFile.files.length === 0) {

        alert("Please upload a resume first");

        return;
    }

    analyzeBtn.textContent = "Analyzing...";
    analyzeBtn.disabled = true;

});