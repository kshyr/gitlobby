"use client";
import { motion, MotionStyle } from "framer-motion";

const circleStyle: MotionStyle = {
  display: "block",
  width: "3rem",
  height: "3rem",
  border: "0.5rem solid #e9e9e9",
  borderTop: "0.5rem solid #000000",
  borderRadius: "50%",
  position: "relative",
  boxSizing: "border-box",
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
    <div className="h-full bg-black">
      <div className="fixed left-0 top-[60px] flex h-[calc(100vh-100px)] w-screen items-center justify-center before:fixed before:left-0 before:top-0 before:h-screen before:w-screen before:bg-black before:bg-opacity-40">
        <motion.span
          style={circleStyle}
          initial="hidden"
          animate="visible"
          variants={span}
        />
      </div>
    </div>
  );
}
