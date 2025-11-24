
import React from "react";
import exampleImg from "../assets/example-bg.jpeg"; // placeholder image

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
    text: "Die Bar ist voll von zwielichtigen Gestalten. Du bemerkst eine seltsame Figur in der Ecke.",
    img: exampleImg,
    choices: [
      { text: "Ansprechen", next: "scene4", reward: [] },
      { text: "Ignorieren und gehen", next: "scene3", reward: [] }
    ]
  },
  scene3: {
    text: "Du gehst die dunkle Straße entlang und hörst plötzlich ein Geräusch hinter dir.",
    img: exampleImg,
    choices: [
      { text: "Schnell wegrennen", next: "scene4", reward: [] },
      { text: "Nachsehen", next: "scene4", reward: [] }
    ]
  }
};
  scene4: {
    text: "PROJEXT 42 - Guardian Angel me .",
    img: exampleImg,
    choices: [
      { text: "Schnell wegrennen", next: "scene5", reward: [] },
      { text: "Nachsehen", next: "scene4", reward: [] }
    ]
  }
};

export default function Scene({ sceneId, nextScene }) {
  const scene = scenes[sceneId];

  return (
    <div>
      {scene.img && <img src={scene.img} alt="scene" style={{width:"100%", borderRadius:"14px", marginBottom:"12px"}} />}
      <p>{scene.text}</p>
      <div style={{display:"flex", gap:"12px", flexWrap:"wrap"}}>
        {scene.choices.map((choice, i) => (
          <button key={i} onClick={() => nextScene(choice.next, choice.reward)}>
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
}
