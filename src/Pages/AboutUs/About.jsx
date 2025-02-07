import React from "react";
import "./About.css";
import { useNavigate } from "react-router-dom";


const About = () => {
  
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/register"); 
  };
  return (
    <div className="about-container">
      <h1 className="title">Fitness Buddy</h1>

      {/* Who We Are */}
      <section className="section">
        <img src="/Images/Fitness.jpg" alt="Fitness" className="about-img" />
        <div className="text-content">
          <h2>Who We Are</h2>
          <p>
            Fitness Buddy is your ultimate companion on your fitness journey. Whether you're a beginner or a seasoned athlete, our app helps you track workouts, set goals, and stay motivated.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="section reverse">
        <div className="text-content">
          <h2>Our Mission</h2>
          <p>
            We aim to make fitness accessible and enjoyable for everyone by providing easy-to-use tools, personalized workout plans, and progress tracking features.
          </p>
        </div>
        <img src="/Images/mission.jpg" alt="Mission" className="about-img" />
      </section>

      {/* What We Offer */}
      <section className="offer-section">
        <h2>What We Offer</h2>
        <div className="offer-list">
          <div className="offer-item">
            <img src="/Images/workout.jpg" alt="Workout" />
            <p><strong>Personalized Workout Plans</strong> – Tailored exercises based on your goals.</p>
          </div>
          <div className="offer-item">
            <img src="/Images/diet.jpg" alt="Diet" />
            <p><strong>Diet & Nutrition Tips</strong> – Healthy meal suggestions to complement your fitness journey.</p>
          </div>
          <div className="offer-item">
            <img src="/Images/tracking.jpg" alt="Tracking" />
            <p><strong>Activity Tracking</strong> – Log workouts, track calories, and monitor progress.</p>
          </div>
          <div className="offer-item">
            <img src="/Images/community.jpg" alt="Community" />
            <p><strong>Community Support</strong> – Connect with like-minded fitness enthusiasts.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Fitness Buddy? */}
      <section className="section">
        <h2>Why Choose Fitness Buddy?</h2>
        <ul className="why-list">
          <li>Simple and user-friendly interface</li>
          <li>Customized plans for all fitness levels</li>
          <li>Regular updates with new workouts and tips</li>
          <li>Motivation through goal tracking and achievements</li>
        </ul>
      </section>

      {/* Join Us Today */}
      <section className="join-section">
        <h2>Join Us Today!</h2>
        <p>Start your fitness journey with Fitness Buddy and achieve your health goals effectively.</p>
        <button onClick={handleGetStarted} className="join-btn">Get Started</button>
      </section>
    </div>
  );
};

export default About;
