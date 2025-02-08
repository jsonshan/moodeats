function MoodForm() {
  return (
    <div className="mood-form">
      <div>where are you located?</div>
      <input
        className="input location-input"
        type="text"
        placeholder="enter your location"
      />
      <div>how are you feeling today?</div>
      <input
        className="input mood-input"
        type="text"
        placeholder="begin typing here"
      />
      <button className="button mood-submit">find food</button>
    </div>
  );
}

export default MoodForm;
