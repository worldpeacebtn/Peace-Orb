
import React, { useState } from "react";

export default function StoryPanel({ character }) {
  const [xp, setXp] = useState(character.xp);
  const [trophies, setTrophies] = useState(character.trophies || []);

  const rollDice = (numDice = 1) => {
    let total = 0;
    for (let i = 0; i < numDice; i++) total += Math.floor(Math.random() * 6) + 1;
    return total;
  };

  const handleAction = (action) => {
    const diceCount = action.diceCount || 1;
    const result = rollDice(diceCount);
    const success = result >= (action.successThreshold || 4);

    alert(`Würfelergebnis: ${result} → ${success ? "Erfolg!" : "Misserfolg!"}`);

    if (success) {
      setXp(prev => prev + (action.xpReward || 5));
      if (action.trophy) setTrophies(prev => [...prev, action.trophy]);
    }
  };

  return (
    <div className="story-panel-content">
      <h2>{character.name}</h2>
      <p>{character.background}</p>
      <p>Level: {character.level} | XP: {xp}</p>
      <p>Stats: Geschick {character.stats.Geschick}, Glück {character.stats.Glück}, Charm {character.stats.Charm}</p>
      {character.portrait && <img src={character.portrait} alt={character.name} style={{width: "100px"}} />}

      <h3>Actions</h3>
      <button onClick={() => handleAction({ diceCount: 1, successThreshold: 4, xpReward: 5 })}>
        Test: Geschick
      </button>
      <button onClick={() => handleAction({ diceCount: 2, successThreshold: 7, xpReward: 10, trophy: "Shadow Tracker" })}>
        Spezial-Aktion
      </button>

      <h4>Trophies:</h4>
      <ul>
        {trophies.map((t, i) => <li key={i}>{t}</li>)}
      </ul>
    </div>
  );
}