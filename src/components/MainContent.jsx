import MoodForm from "./MoodForm";

function MainContent() {
  return (
    <div className="container main-content">
      <div className="title">
        <h1>
          your favorite companion for mood-boosting meals and healthy choices
        </h1>
        <p>find the best restaurants in your area based on your mood.</p>
      </div>
      <div className="mood-form-container">
        <MoodForm />
      </div>
    </div>
  );
}

export default MainContent;
