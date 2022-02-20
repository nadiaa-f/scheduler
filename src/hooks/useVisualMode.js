import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 

  const transition = (newMode, replace = false) => {
    setHistory(prevState => {
      if (!replace) {
        prevState.push(newMode);
      }
      setMode(newMode);
      return prevState;
    });
  };

  const back = () => {
    setHistory(prevState => {
      if (prevState.length >= 2) {
        prevState.pop();
        setMode(prevState[prevState.length - 1]);
      }
      return prevState;
    });
  };
return { mode, transition, back };
} 