
import React from "react";
import exampleImg from "../assets/example-bg.jpeg"; // placeholder image

import React, { useState, useEffect } from "react";
import exampleImg from "../assets/example-bg.jpeg";

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
  },

  scene4: {
    text: "PROJEXT 42 – Guardian Angel active.",
    img: exampleImg,
    choices: [
      { text: "Schnell wegrennen", next: "scene5", reward: [] },
      { text: "Nachsehen", next: "scene4", reward: [] }
    ]
  },

  scene5: {
    text: "X42 – Signal routed. Surveillance mesh engaged.",
    img: exampleImg,
    choices: [
      { text: "Weiter", next: "scene1", reward: [] },
      { text: "Abbrechen", next: "scene1", reward: [] }
    ]
  }
};

export default function Scene({ sceneId, nextScene }) {
  const scene = scenes[sceneId];
  const [displayText, setDisplayText] = useState("");
  const [rewardPopup, setRewardPopup] = useState("");

  // Typing effect
  useEffect(() => {
    setDisplayText("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) => prev + scene.text.charAt(i));
      i++;
      if (i >= scene.text.length) clearInterval(interval);
    }, 25);

    return () => clearInterval(interval);
  }, [sceneId]);

  // Reward animation
  const triggerReward = (rewardList) => {
    if (!rewardList || rewardList.length === 0) return;
    const text = rewardList.join(", ");
    setRewardPopup(`+ ${text}`);
    setTimeout(() => setRewardPopup(""), 2000);
  };

  return (
    <div className="holo-scene-panel">

      {/* Reward popup */}
      {rewardPopup && (
        <div className="reward-popup">
          {rewardPopup}
        </div>
      )}

      {/* Scene Image */}
      {scene.img && (
        <img
          src={scene.img}
          alt="scene"
          className="holo-scene-img"
        />
      )}

      {/* Typing Text */}
      <p className="holo-scene-text">{displayText}</p>

      {/* Choices */}
      <div className="holo-choice-grid">
        {scene.choices.map((choice, i) => (
          <button
            key={i}
            className="holo-choice-btn"
            onClick={() => {
              triggerReward(choice.reward);
              nextScene(choice.next, choice.reward);
            }}
          >
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
}

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
