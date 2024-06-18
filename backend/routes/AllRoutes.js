const express = require("express");
const { User, Pdf, Video } = require("../Models/AllSchema");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const PDFParser = require("pdf-parse");
const bcrypt = require("bcrypt");
const ffmpeg = require("fluent-ffmpeg");
const axios = require("axios");
const FormData = require("form-data");

const allroutes = express.Router();

allroutes.use(express.json());
allroutes.use("/files", express.static("files"));
allroutes.use("/videos", express.static("videos"));




///////// Login route////////////////////
allroutes.post("/login", async (req, res) => {
    console.log("reached login");
    const { username, password } = req.body;
    console.log(username, password);
    try {
        const user = await User.findOne({ username });
        console.log(user);
        if (!user) {
            console.log("invalid username");
            return res.status(400).json({ message: "Invalid username or password" });
        }
        console.log("check password: ", password, user.password);
        if (password !== user.password) {
            console.log("invalid password");
            return res.status(400).json({ message: "Invalid username or password" });
        }
        console.log("login is successful");
        console.log(username, password);
        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});




//////////ffmpeg connection///////////////////////////////////////////////////////
ffmpeg.setFfmpegPath('C:/ffmpeg/ffmpeg-master-latest-win64-gpl/ffmpeg-master-latest-win64-gpl/bin/ffmpeg.exe'); // Adjust the path as needed

////////////pdf to text converion////////////////////////////////////
const convertPdfToText = async (pdfPath) => {
    try {
        const dataBuffer = fs.readFileSync(pdfPath);
        const pdf = await PDFParser(dataBuffer);
        const text = pdf.text;
        return text;
    } catch (error) {
        console.error("Error converting PDF to text:", error);
        throw error;
    }
};

const writeFile = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, "utf8", (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};




//////////// PDF upload and retrieval routes///////////////////////////////
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./files");
        console.log("u reached backend file");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
        console.log("you reached backend file");
    },
});

const upload = multer({ storage: storage });

allroutes.post("/uploadfiles", upload.single("file"), async (req, res) => {
    console.log(req.file);
    const title = req.body.title;
    const fileName = req.file.filename;
    try {
        await Pdf.create({
            title: title,
            pdf: fileName,
        });

        const pdfPath = path.join(__dirname, "..", "files", fileName);
        const outputTextFileName = fileName.replace(".pdf", ".txt");
        const outputTextFilePath = path.join(__dirname, "..", "files", outputTextFileName);
        const text = await convertPdfToText(pdfPath);
        await writeFile(outputTextFilePath, text);

        res.json({ status: "ok" });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ status: "error", message: "Failed to upload file" });
    }
});

allroutes.get("/getfiles", async (req, res) => {
    try {
        Pdf.find({}).then((data) => {
            res.send({ status: "ok", data: data });
        });
    } catch (error) {
        console.error("Error retrieving files:", error);
        res.status(500).json({ status: "error", message: "Failed to retrieve files" });
    }
});


////////////video to text conversion /////////
const convertVideoToAudio = (inputVideo, outputAudio) => {
    return new Promise((resolve, reject) => {
        ffmpeg(inputVideo)
            .noVideo()
            .audioCodec("libmp3lame")
            .save(outputAudio)
            .on("end", () => {
                console.log("Conversion complete");
                resolve(outputAudio);
            })
            .on("error", (err) => {
                console.error("Error converting video to audio:", err);
                reject(err);
            });
    });
};

const uploadAudioToAssemblyAI = async (filePath) => {
    const formData = new FormData();
    formData.append("audio", fs.createReadStream(filePath));
    const Keys = " 4f1b7c3dc56140459d05a750e1e2563a";
    try {
        const response = await axios.post("https://api.assemblyai.com/v2/upload", formData, {
            headers: {
                "authorization": Keys,
                ...formData.getHeaders(),
            },
        });
        return response.data.upload_url;
    } catch (error) {
        console.error("Error uploading audio to AssemblyAI:", error);
        throw error;
    }
};

const transcribeAudioToText = async (audioUrl) => {
    const config = { audio_url: audioUrl };
    const Keys = " 4f1b7c3dc56140459d05a750e1e2563a";

    try {
        const response = await axios.post("https://api.assemblyai.com/v2/transcript", config, {
            headers: {
                "authorization": Keys,
            },
        });
        const transcriptId = response.data.id;

        let transcript;
        while (true) {
            const transcriptResponse = await axios.get(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
                headers: {
                    "authorization": Keys,
                },
            });
            transcript = transcriptResponse.data;

            if (transcript.status === "completed") {
                break;
            } else if (transcript.status === "failed") {
                throw new Error("Transcription failed");
            }

            await new Promise((resolve) => setTimeout(resolve, 5000));
        }

        return transcript.text;
    } catch (error) {
        console.error("Error transcribing audio to text:", error);
        throw error;
    }
};

allroutes.get("/", (req, res) => {
    console.log("reached root");
    res.send("welcome to dune lms");
});



// Video upload and retrieval routes///////////////////////////////////
const uploadStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./videos");
        console.log("u reached backend video file");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
        console.log("you reached backend video file");
    },
});

const uploadVideo = multer({ storage: uploadStorage });

allroutes.post("/uploadvideos", uploadVideo.single("file"), async (req, res) => {
    console.log(req.file);
    const title = req.body.title;
    const fileName = req.file.filename;
    try {
        await Video.create({
            title: title,
            video: fileName,
        });

        const videoPath = path.join(__dirname, "..", "videos", fileName);
        const outputAudioPath = videoPath.replace(".mp4", ".mp3");
        await convertVideoToAudio(videoPath, outputAudioPath);

        const audioUrl = await uploadAudioToAssemblyAI(outputAudioPath);
        const transcribedText = await transcribeAudioToText(audioUrl);

        const outputTextFileName = fileName.replace(".mp4", ".txt");
        const outputTextFilePath = path.join(__dirname, "..", "videos", outputTextFileName);
        await writeFile(outputTextFilePath, transcribedText);

        res.json({ status: "ok" });
    } catch (error) {
        console.error("Error uploading video:", error);
        res.status(500).json({ status: "error", message: "Failed to upload video" });
    }
});

allroutes.get("/getvideos", async (req, res) => {
    try {
        Video.find({}).then((data) => {
            res.send({ status: "ok", data: data });
        });
    } catch (error) {
        console.error("Error retrieving videos:", error);
        res.status(500).json({ status: "error", message: "Failed to retrieve videos" });
    }
});

module.exports = allroutes;