const express = require("express");
const mongoose = require("mongoose");
const app = express();
const url = "mongodb://127.0.0.1:27017/music";   

async function connectDB() {
    try {
        await mongoose.connect(url);
        console.log("Successfully connected to database");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}
connectDB();

const musicSchema = new mongoose.Schema({
    Songname: String,
    Film: String,
    Music_director: String,
    Singer: String
});

const musicArt = mongoose.model("Song", musicSchema);

app.get("/addDocs", async (req, res) => {
    try {
        const result = await musicArt.insertMany([
            { Songname: "yeh janwani hai dewani", Film: "YJHD", Music_director: "Sonam kapoor", Singer: "armaan malik" },
            { Songname: "hum sath sath hai", Film: "hum sath sath hai", Music_director: "Sohali", Singer: "armaan malik" }
        ]);
        console.log(result);
        res.send("Added Successfully");
    } catch (error) {
        console.error("Error adding documents:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/totalcount", async (req, res) => {
    try {
        const totalcount = await musicArt.countDocuments();
        res.send(`Total count of documents: ${totalcount}`);
    } catch (error) {
        console.error("Error counting documents:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/listAll", async (req, res) => {
    try {
        const allDocuments = await musicArt.find();
        res.json(allDocuments);
    } catch (error) {
        console.error("Error listing all documents:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/removestudent", async (req, res) => {
    try {
        const filter = { Songname: "yeh janwani hai dewani" };
        const result = await musicArt.deleteOne(filter);
        if (result.deletedCount === 1) {
            res.send("Student document removed successfully");
        } else {
            res.send("No student document found with the specified criteria");
        }
    } catch (error) {
        console.error("Error removing document:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/display", async (req, res) => {
    try {
        const musics = await musicArt.find();

        let html = "<table border='1'><tr><th>MusicName</th><th>Film</th><th>Music_director</th><th>Singer</th></tr>";
        musics.forEach(music => {
            html += `<tr><td>${music.Songname}</td><td>${music.Film}</td><td>${music.Music_director}</td><td>${music.Singer}</td></tr>`;
        });
        html += "</table>";
        res.send(html);
    } catch (error) {
        console.error("Error displaying documents:", error);
        res.status(500).send("Internal Server Error");
    }
});

const PORT = 3800;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
