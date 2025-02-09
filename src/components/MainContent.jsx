import MoodForm from "./MoodForm";
import {useState} from "react"
import Info from "./Info";
import "../MainContent.css";
import GeneratedContent from "./GeneratedContent";
function MainContent() {

  const [businesses, setBusinesses] = useState([]);
  const handleBusinessesUpdate = (newBusinesses) => {
    setBusinesses(newBusinesses);
  };

  return (
    <div className="container main-content">
      <div className="title-container">
        <h1>your companion for mood-boosting meals</h1>
        <p>find the best foods in your area based on your mood.</p>
      </div>
      <div className="">
        <div className="mood-form-container">
          <Info onBusinessesUpdate={handleBusinessesUpdate}/>
        </div>
        {businesses && <GeneratedContent businesses={businesses}/>}
      </div>
    </div>
  );
}

export default MainContent;
