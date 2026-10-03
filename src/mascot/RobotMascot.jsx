import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { boot, state } from "./store.js";
import "./mascot.css";

const Scene = lazy(() => import("./Scene.jsx"));

export default function RobotMascot() {
  const [ready, setReady] = useState(false);
  const interactionTimer = useRef(null);

  useEffect(() => {
    boot(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    state.phase = "crafting";
    state.craftIndex = 0;
    state.craftFromIndex = 0;
    state.craftTransition = 1;

    const closeChat = () => {
      state.thinking = false;
      window.clearTimeout(interactionTimer.current);
      document.querySelector(".tct-robo-chat-hit")?.classList.remove("is-chatting");
    };
    window.addEventListener("tct-robo-chat-close", closeChat);

    const showScene = window.setTimeout(() => setReady(true), 900);

    return () => {
      window.clearTimeout(showScene);
      window.clearTimeout(interactionTimer.current);
      window.removeEventListener("tct-robo-chat-close", closeChat);
    };
  }, []);

  const openChat = () => {
    window.clearTimeout(interactionTimer.current);
    state.thinking = true;
    document.querySelector(".tct-robo-chat-hit")?.classList.add("is-chatting");
    window.dispatchEvent(new Event("tct-robo-chat-open"));
    interactionTimer.current = window.setTimeout(() => {
      state.thinking = false;
      document.querySelector(".tct-robo-chat-hit")?.classList.remove("is-chatting");
    }, 2000);
  };

  return (
    <>
      {ready && (
        <div className="tct3d-wrap" aria-hidden="true">
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </div>
      )}
      <button
        type="button"
        className="tct-robo-chat-hit"
        onClick={openChat}
        aria-label="Chat with Robo, the TCT studio assistant"
        title="Chat with Robo"
      />
    </>
  );
}
