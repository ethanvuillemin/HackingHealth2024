import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "@mui/material/Slider";

const badEmojis = ["💩", "🤮", "🤢", "🤧", "🤒"];
const goodEmojis = ["🔥", "✨", "💯", "🚀", "🤩"];

export default function EmojiSlider() {
  const [value, setValue] = useState(0);
  const [explosions, setExplosions] = useState([]);
  const sliderRef = useRef(null); 

  const handleChange = (event, newValue) => {
    setValue(newValue);

    // Get the bounding rectangle of the slider's thumb
    const sliderRect = sliderRef.current.children[0].getBoundingClientRect(); // Access the thumb element

    const emojiType = newValue < 4 ? badEmojis : goodEmojis;

    setExplosions((prevExplosions) => [
      ...prevExplosions,
      {
        id: Date.now(),
        x: -(sliderRect.width/newValue),
        y: 0,
        emoji: emojiType[Math.floor(Math.random() * emojiType.length)],
      },
    ]);
  };

  return (
    <div style={{ position: "relative", width: 300, margin: "50px auto" }}>
      <Slider
        ref={sliderRef} // Attach the ref to the Slider
        value={value}
        onChange={handleChange}
        min={1}
        max={7}
        aria-labelledby="emoji-slider"
      />

      <AnimatePresence>
        {explosions.map((explosion) => (
          <motion.span
            key={explosion.id}
            initial={{ opacity: 1, x: explosion.x, y: explosion.y, scale: 0 }}
            animate={{
              opacity: 0,
              x: [
                explosion.x,
                explosion.x + (Math.random() - 0.5) * 80,
              ], 
              y: [explosion.y, explosion.y - 80 + (Math.random() - 0.5) * 40], 
              scale: [1, 1.3, 0],
              rotate: (Math.random() - 0.5) * 360,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ position: "absolute", fontSize: 24 }}
          >
            {explosion.emoji}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}