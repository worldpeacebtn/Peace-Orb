
// src/data/characters.js
import rolloffImg from "../assets/Rolloff.jpeg";
import miraImg from "../assets/Mira.jpeg";

const charactersData = [
  {
    id: "char1",
    name: "Rolloff",
    portrait: rolloffImg, // <- imported module
    background: "Straßenkind aus Hamburg",
    stats: { Geschick: 2, Glück: 1, Charm: 1 },
    skills: ["Schleichen", "Hacking"],
    equipment: { Kopf: null, Körper: null, Waffe: "Messer", Accessoire: "Handschuhe" },
    level: 1,
    xp: 0,
    trophies: []
  },
  {
    id: "char2",
    name: "Mira",
    portrait: miraImg,
    background: "Technikgenie",
    stats: { Geschick: 1, Glück: 2, Charm: 1 },
    skills: ["Hacking", "Logik"],
    equipment: { Kopf: "VR-Helmet", Körper: null, Waffe: null, Accessoire: null },
    level: 1,
    xp: 0,
    trophies: []
  }
];

export default charactersData;