
import React from "react";

export default function Inventory({ inventory }) {
  return (
    <div style={{
      position:"absolute",
      top:10, left:10,
      background:"rgba(255,255,255,0.08)",
      padding:"8px 12px",
      borderRadius:"12px",
      border:"1px solid rgba(255,255,255,0.18)",
      maxWidth:"200px"
    }}>
      <strong>Inventory</strong>
      <ul style={{paddingLeft:"18px"}}>
        {inventory.length === 0 ? <li>Leer</li> :
          inventory.map((item,i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  )
}