
import React, { useState } from "react";
import CharacterCreator from "./components/CharacterCreator";
import CharacterCard from "./components/CharacterCard";
import charactersData from "./data/characters"; // your existing characters.js/json
import "./styles/App.css";
import Scene from "./components/Scene";
import Inventory from "./components/Inventory";
export default function App() {
  const [characters, setCharacters] = useState(charactersData);
  const [selectedChar, setSelectedChar] = useState(characters[0]);
  const [currentScene, setCurrentScene] = useState("scene1");
  const [inventory, setInventory] = useState([]);

  const addCharacter = (newChar) => {
    setCharacters([...characters, newChar]);
  };

  const nextScene = (sceneId, addItems = []) => {
    setCurrentScene(sceneId);
    setInventory([...inventory, ...addItems]);
  };

  return (
    <div className="app-container">
      {/* Sidebar characters */}
      <div className="sidebar">
        {characters.map((char) => (
          <CharacterCard
            key={char.id}
            character={char}
            onClick={() => setSelectedChar(char)}
          />
        ))}
      </div>

      {/* Main story panel */}
      <div className="story-panel">
        <Scene
          sceneId={currentScene}
          nextScene={nextScene}
        />
        <Inventory inventory={inventory} />
      </div>

      {/* Selected character big bottom-right */}
      {selectedChar && (
        <div className="selected-character">
          <CharacterCard character={selectedChar} onClick={()=>{}} />
        </div>
      )}

      {/* Character Creator */}
      <CharacterCreator addCharacter={addCharacter} />
    </div>
  );
}