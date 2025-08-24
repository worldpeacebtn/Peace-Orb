
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function CharacterCreator({ addCharacter }) {
  const [name, setName] = useState("");
  const [background, setBackground] = useState("");
  const [geschick, setGeschick] = useState(1);
  const [glueck, setGlueck] = useState(1);
  const [charm, setCharm] = useState(1);
  const [portrait, setPortrait] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newChar = {
      id: uuidv4(),
      name,
      background,
      stats: { Geschick: geschick, Glück: glueck, Charm: charm },
      skills: [],
      equipment: {},
      level: 1,
      xp: 0,
      trophies: [],
      portrait
    };
    addCharacter(newChar);
    setName(""); setBackground(""); setGeschick(1); setGlueck(1); setCharm(1); setPortrait(null);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if(file) setPortrait(URL.createObjectURL(file));
  };

  return (
    <form onSubmit={handleSubmit} className="character-creator">
      <input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required />
      <textarea placeholder="Background Story" value={background} onChange={(e)=>setBackground(e.target.value)} />
      <input type="number" min="1" max="6" value={geschick} onChange={(e)=>setGeschick(parseInt(e.target.value))} />
      <input type="number" min="1" max="6" value={glueck} onChange={(e)=>setGlueck(parseInt(e.target.value))} />
      <input type="number" min="1" max="6" value={charm} onChange={(e)=>setCharm(parseInt(e.target.value))} />
      <input type="file" accept="image/*" onChange={handleFile} />
      <button type="submit">Charakter erstellen</button>
    </form>
  );
}