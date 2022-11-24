"use client";
import { CSSProperties } from "react";
import { motion, MotionStyle } from "framer-motion";

const containerStyle: React.CSSProperties = {
  position: "relative",
  width: "3rem",
  height: "3rem",
  boxSizing: "border-box",
};

const circleStyle: MotionStyle = {
  display: "block",
  width: "3rem",
  height: "3rem",
  border: "0.5rem solid #e9e9e9",
  borderTop: "0.5rem solid #3498db",
  borderRadius: "50%",
  position: "absolute",
  boxSizing: "border-box",
  top: 0,
  left: 0,
};

const spinTransition = {
  loop: Infinity,
  ease: "linear",
  duration: 1,
};
const span = {
  hidden: { rotate: 0, circleStyle },
  visible: {
    rotate: 360,
    transition: spinTransition,
    circleStyle,
  },
};

export default function Loading() {
  return (
    <div style={containerStyle}>
      <motion.span
        style={circleStyle}
        initial="hidden"
        animate="visible"
        variants={span}
      />
    </div>
  );
}
