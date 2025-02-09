import MoodButton from "./MoodButton";
import MoodSlider from "./MoodSlider";

function MoodForm() {
  return (
    <div className="mood-form">
      <div className="title">how are you feeling today?</div>
      <MoodSlider />
      <div>where are you located?</div>
      <input
        className="input location-input"
        type="text"
        placeholder="enter your location"
      />
      <div>describe your mood</div>
      <input
        className="input mood-input"
        type="text"
        placeholder="begin typing here"
      />
      <MoodButton />
    </div>
  );
}

export default MoodForm;
