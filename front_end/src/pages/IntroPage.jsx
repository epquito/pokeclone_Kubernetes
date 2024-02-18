import { useOutletContext, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Sound from "react-audio-player";
import starterPageMusic from "/src/assets/BackgroundMusic/nature-sounds-quiet-environment.mp3";
import cowbells from "/src/assets/BackgroundMusic/cowbells-in-the-alps.wav"

const IntroPage = () => {
  const { pokeTeam, user, isLoggedIn } = useOutletContext();

  const navigate = useNavigate();

  console.log("poke team check:", pokeTeam);

  const handleClick = () => {
    navigate("/main");
  };

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/landing");
    }
  }, []);

  return (
    <div className="full_page_div" onClick={handleClick}>
      <audio
        autoPlay
        src={starterPageMusic}
        loop
        type="audio/wav"
        volume="0.2"
      ></audio>
      <audio
        autoPlay
        src={cowbells}
        loop
        type="audio/wav"
        volume="0.2"
      ></audio>

      <div id="intro_div">
        <div id="intro_block1">
          <h2>Your journey begins, {user.User}</h2>
        </div>
        <div id="intro_block2">
          <h2>Battle and collect more pokemon to defeat the gym leader!</h2>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
