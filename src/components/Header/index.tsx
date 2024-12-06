import style from "./style.module.css";
import { useEffect } from "react";
export const Header = () => {
  const savedGameCount = localStorage.getItem("gameCount");

  useEffect(() => {
    if (savedGameCount) {
      localStorage.setItem("gameCount", String(Number(savedGameCount) + 1));
    } else {
      localStorage.setItem("gameCount", "1");
    }
  }, [savedGameCount]);
  return (
    <div className={style.header}>
      <div className={style.title}>Tic Tac Toe</div>
      <div className={style.links}>
        <div className={style.play_count}>Played: {savedGameCount} times</div>
        <a
          href="https://github.com/your-repo"
          target="_blank"
          rel="noopener noreferrer"
          className={style.github_link}
        >
          <svg
            className={style.github}
            style={{ fill: "#fff" }}
            height="30px"
            width="30px"
            id="Layer_1"
            version="1.1"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path d="M256,32C132.3,32,32,134.8,32,261.7c0,101.5,64.2,187.5,153.2,217.9c11.2,2.1,15.3-5,15.3-11.1   c0-5.5-0.2-19.9-0.3-39.1c-62.3,13.9-75.5-30.8-75.5-30.8c-10.2-26.5-24.9-33.6-24.9-33.6c-20.3-14.3,1.5-14,1.5-14   c22.5,1.6,34.3,23.7,34.3,23.7c20,35.1,52.4,25,65.2,19.1c2-14.8,7.8-25,14.2-30.7c-49.7-5.8-102-25.5-102-113.5   c0-25.1,8.7-45.6,23-61.6c-2.3-5.8-10-29.2,2.2-60.8c0,0,18.8-6.2,61.6,23.5c17.9-5.1,37-7.6,56.1-7.7c19,0.1,38.2,2.6,56.1,7.7   c42.8-29.7,61.5-23.5,61.5-23.5c12.2,31.6,4.5,55,2.2,60.8c14.3,16.1,23,36.6,23,61.6c0,88.2-52.4,107.6-102.3,113.3   c8,7.1,15.2,21.1,15.2,42.5c0,30.7-0.3,55.5-0.3,63c0,6.1,4,13.3,15.4,11C415.9,449.1,480,363.1,480,261.7   C480,134.8,379.7,32,256,32z" />
            </g>
          </svg>
        </a>
      </div>
    </div>
  );
};
