import React from "react";
import exampleImg from "../assets/example-bg.jpeg"; // placeholder image

// =====================
// SCENE DATA
// =====================
const scenes = {
  scene1: {
    text: "Du stehst in den Straßen von Hamburg. Es ist Nacht, Lichter flackern. Was willst du tun?",
    img: exampleImg,
    choices: [
      { text: "In die Bar gehen", next: "scene2", reward: ["Münze"] },
      { text: "Straße entlang schleichen", next: "scene3", reward: [] }
    ]
  },

  scene2: {
    text: "Die Bar ist voll von zwielichtigen Gestalten. In der Ecke sitzt eine Figur, deren Augen im Neonlicht kurz aufleuchten.",
    img: exampleImg,
    choices: [
      { text: "Ansprechen", next: "scene4", reward: [] },
      { text: "Ignorieren und gehen", next: "scene3", reward: [] }
    ]
  },

  scene3: {
    text: "Du gehst die dunkle Straße entlang. Ein metallischer Klang hinter dir lässt die Luft gefrieren.",
    img: exampleImg,
    choices: [
      { text: "Schnell wegrennen", next: "scene4", reward: [] },
      { text: "Nachsehen", next: "scene4", reward: [] }
    ]
  },

  scene4: {
    text: "PROJECT 42 NETWORK – Guardian Angel Protokoll aktiviert. Eine unbekannte Präsenz verschlüsselt deinen Pfad.",
    img: exampleImg,
    choices: [
      { text: "Fortsetzen", next: "scene5", reward: [] },
      { text: "System prüfen", next: "scene3", reward: [] }
    ]
  },

  scene5: {
    text: "X42 – G.A.me Instance #1: Du bist nun Teil der Operation. Dies ist erst der Anfang.",
    img: exampleImg,
    choices: [
      { text: "Weiter", next: "scene1", reward: [] },
      { text: "Beenden", next: "scene1", reward: [] }
    ]
  }
};


// =====================
// COMPONENT
// =====================
export default function Scene({ sceneId, nextScene }) {
  const scene = scenes[sceneId];

  if (!scene) {
    return <p style={{ color: "#f44" }}>Scene not found: {sceneId}</p>;
  }

  return (
    <div
      style={{
        padding: "16px",
        background: "rgba(0, 0, 0, 0.45)",
        border: "1px solid rgba(0,255,255,0.25)",
        borderRadius: "14px",
        boxShadow: "0 0 24px rgba(0,255,255,0.35)",
        backdropFilter: "blur(12px)",
        color: "#0ff"
      }}
    >
      {scene.img && (
        <img
          src={scene.img}
          alt="scene"
          style={{
            width: "100%",
            borderRadius: "14px",
            marginBottom: "12px",
            boxShadow: "0 0 20px rgba(0,255,255,0.25)"
          }}
        />
      )}

      <p style={{ fontSize: "1.1rem", marginBottom: "18px", color: "#aff" }}>
        {scene.text}
      </p>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {scene.choices.map((choice, i) => (
          <button
            key={i}
            onClick={() => nextScene(choice.next, choice.reward)}
            style={{
              padding: "10px 16px",
              borderRadius: "10px",
              border: "1px solid #0ff",
              background: "rgba(0, 20, 30, 0.7)",
              color: "#0ff",
              cursor: "pointer",
              fontWeight: "bold",
              textShadow: "0 0 6px #0ff",
              boxShadow: "0 0 10px rgba(0,255,255,0.3)",
              transition: "0.2s"
            }}
            onMouseOver={(e) => {
              e.target.style.background = "rgba(0, 40, 60, 0.9)";
              e.target.style.boxShadow = "0 0 20px rgba(0,255,255,0.6)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "rgba(0, 20, 30, 0.7)";
              e.target.style.boxShadow = "0 0 10px rgba(0,255,255,0.3)";
            }}
          >
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
}
