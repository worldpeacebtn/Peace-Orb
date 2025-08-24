
import React, { useState } from "react";
import CharacterCreator from "./components/CharacterCreator";
import CharacterCard from "./components/CharacterCard";
import StoryPanel from "./components/StoryPanel";
import charactersData from "./data/characters.json";

function App() {
  const [characters, setCharacters] = useState(charactersData.characters);
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);

  const addCharacter = (newChar) => {
    setCharacters([...characters, newChar]);
  };

  const selectedCharacter = characters.find(c => c.id === selectedCharacterId);

  return (
    <div className="app-container">
      <CharacterCreator addCharacter={addCharacter} />
      <div className="sidebar">
        {characters.map(char => (
          <CharacterCard
            key={char.id}
            character={char}
            onClick={() => setSelectedCharacterId(char.id)}
          />
        ))}
      </div>
      <div className="story-panel">
        {selectedCharacter ? (
          <StoryPanel character={selectedCharacter} />
        ) : (
          <p>Wähle einen Charakter, um seine Story zu sehen</p>
        )}
      </div>
    </div>
  );
}

export default App;