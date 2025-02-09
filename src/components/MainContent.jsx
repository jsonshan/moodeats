import MoodForm from "./MoodForm";

function MainContent() {
  return (
    <div className="container main-content">
      <div className="title-container">
        <h1>your companion for mood-boosting meals</h1>
        <p>find the best foods in your area based on your mood.</p>
      </div>
      <div className="mood-form-container">
        <MoodForm />
      </div>
    </div>
  );
}

export default MainContent;
