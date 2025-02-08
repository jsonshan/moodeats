import { FaRegFrown, FaRegMeh, FaRegSmile } from "react-icons/fa";

function MoodSlider() {
  return (
    <div className="mood-slider">
      <input type="range" min="0" max="99" className="slider" />
      <div className="mood-slider-icons">
        <div className="mood-slider-icon">
          <FaRegFrown />
          <p>bad</p>
        </div>
        <div className="mood-slider-icon">
          <FaRegMeh />
          <p>okay</p>
        </div>
        <div className="mood-slider-icon">
          <FaRegSmile />
          <p>good</p>
        </div>
      </div>
    </div>
  );
}

export default MoodSlider;
