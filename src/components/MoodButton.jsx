function MoodButton() {
  function handleClick() {
    const location = document.querySelector(".location-input").value;
    const mood = document.querySelector(".mood-input").value;
    const slider = document.querySelector(".slider").value;
    console.log(location);
    console.log(mood);
    console.log(slider);
  }

  return (
    <button onClick={handleClick} className="button mood-submit">
      find food
    </button>
  );
}

export default MoodButton;
