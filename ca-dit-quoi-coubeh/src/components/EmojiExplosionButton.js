// EmojiExplosionButton.js
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { motion, AnimatePresence } from "framer-motion";

// const emojiList = ["🎉", "🥳", "🎊", "✨", "🤩", "🔥", "🚀", "💯", "💖", "🎈", "🎁", "😄"]; 

export default function EmojiExplosionButton({ href, children, emojiList ,...props }) {
  const [explosions, setExplosions] = useState([]);

  const handleButtonClick = (e) => {
    const buttonRect = e.target.getBoundingClientRect();
    const explosionCount = Math.random() * 20 + 20; // Increased number of emojis

    setExplosions((prevExplosions) => [
      ...prevExplosions,
      ...Array.from({ length: explosionCount }, (_, i) => ({
        id: Date.now() + i,
        x: window.outerWidth/2 - buttonRect.x, // Random X within button width
        y: window.outerHeight - buttonRect.y, // Start at the bottom edge
        emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
      })),
    ]);
  };

  return (
    <>
      <Button onClick={handleButtonClick} href={href} {...props}>
        {children}
      </Button>

      <AnimatePresence>
        {explosions.map((explosion) => (
          <motion.span
            key={explosion.id}
            initial={{ opacity: 1, x: explosion.x, y: explosion.y, scale: 0 }}
            animate={{
              opacity: 0,
              x: [explosion.x - (Math.random() - 0.5) * 300, explosion.x + (Math.random() - 0.5) * 600], // Adjust outward movement
              y: [explosion.y, explosion.y - 150 + (Math.random() - 0.5) * 500], // Adjust upward movement
              scale: [1, 2, 0],
              rotate: (Math.random() - 0.5) * 360,
            }}
            transition={{ duration: 2, ease: "easeOut" }} // Adjust duration for slower animation
            style={{ position: "absolute", fontSize: 24 }}
          >
            {explosion.emoji}
          </motion.span>
        ))}
      </AnimatePresence>
    </>
  );
}
