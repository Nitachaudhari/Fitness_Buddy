import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import fit from "/Images/fit.png";
import "./Home.css";

const Home = () => {
  const [isSliding, setIsSliding] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const texts = [
    "This workout is designed to get you that greek god bod. This 4 week program focuses on 3 days a week of upper body workouts with lower body supplementation to maintain balance. Remember to select weights that will have your muscles burning by the end of each set. Don't forget to get your LISS cardio in to burn more fat and tone those muscles up.",
    "A strong core isn't only essential for a better workout, but can also help reduce the potential of developing lower back and hip issues. This 2 week program focuses intensely on developing your core. Remember to focus on controlling the movement, don't rush through each exercise. A strong core means slow and controlled movement.",
    "Tired of hearing people ask if you skipped leg day? This 2 week program is designed to build your lower body muscles. Each week includes 3 strength training workouts. Remember to actively think about the muscles you are trying to engage to really get that burn and see those results. Add our core power workout to increase your overall strength!",
  ];

  const images = [
    "/Images/man-body.webp",
    "/Images/woman.webp",
    "/Images/manfb.png",
  ];

  const heading = [
    "BODYBUILDING PROGRAM",
    "BELLY FAT SHREDDER",
    "LOWER BODY BOOTCAMP",
  ];

  const handleNextImg = () => {
    setIsSliding(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImg = () => {
    setIsSliding(true);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleTransitionEnd = () => {
    setIsSliding(false);
  };

  return (
    <>
      <div className="home-container">
        <div className="text-container">
          <div className="headline">
            <span>Have a personal trainer </span>
            <br />
            <span>in your pocket</span>
          </div>
          <div className="subheadline">
            <span>Get the results you want with exercises</span>
            <br />
            <span>for home, gym, or studio workouts.</span>
          </div>
        </div>

        <div className="video-container">
          <video className="fullscreen-video" autoPlay muted loop>
            <source
              src="https://uploads-ssl.webflow.com/60859f044717017d27fe442d/60dbb21322effbb9ece33f65_shutterstock_1058961749-transcode.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
      <div className="featured">
        <div className="featured-in">
          <h2 className="featured-in-title">FEATURED IN</h2>
          <div className="featured-in-logos">
            <div className="featured-in-logo">
              <img src="/Images/Tribune.jpg" alt="Chicago Tribune" />
              <p className="featured-in-quote">
                "It's like having a personal trainer in your house without
                having to hire one."
              </p>
            </div>
            <div className="featured-in-logo">
              <img src="/Images/Gizmodo.jpg" alt="Gizmodo" />
              <p className="featured-in-quote">
                "chieve your fitness goals with personalized workouts and expert
                guidance."
              </p>
            </div>
            <div className="featured-in-logo">
              <img src="/Images/Lifehacker.jpg" alt="Lifehacker" />
              <p className="featured-in-quote">
                "This app is worth checking out."
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <img
          className="iphone-image"
          src="https://fitnessbuddy.com/wp-content/uploads/2024/07/iphones-new-full-2-740x1024.webp"
          alt="Fitness Buddy App Screenshots"
        />
        <div className="text-content">
          <h2>A whole new way to work out and get fit</h2>
          <div className="features">
            <div className="feature">
              <span className="icon">◎</span>
              <h3>Personalized workout plans</h3>
              <p>
                Fitness Buddy is designed for your goals, whether you're looking
                to get stronger, build muscle or lose weight.
              </p>
            </div>
            <div className="feature">
              <span className="icon">📝</span>
              <h3>Never get bored with our 2000+ exercise library</h3>
              <p>
                Our app has thousands of exercises, workout routines, and
                training guides from expert trainers and fitness experts.
              </p>
            </div>
            <div className="feature">
              <span className="icon heart-icon">
                <img
                  src="https://fitnessbuddy.com/wp-content/uploads/2024/07/heart.png"
                  alt="heart"
                />
              </span>

              <h3>Guaranteed to find a workout you'll love</h3>
              <p>
                Find 500+ workouts targeting specific body parts, for different
                levels, recovery, yoga, and more! Our workouts are carefully
                crafted by expert trainers and updated frequently.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="fitness-page">
        {/* First Section */}
        <section className="hero-section">
          <div className="content">
            <h2>View your lifting progress</h2>
            <p>Your workouts will sync to Apple Health and Google Fit.</p>
          </div>
        </section>
        <section className="tracking-section">
          <div className="tracking-content">
            <img
              src="/Images/iphone-track.webp"
              alt="Bodybuilding Program"
              className="tracking-image"
            />
            <div className="tracking-text">
              <h3 className="tracking-title">
                Track your progress and get stronger faster
              </h3>
              <p className="tracking-description">
                View your lifting progress with easy-to-understand charts and
                history views.
              </p>
              <p className="tracking-description">
                Your workouts will sync to Apple Health and Google Fit.
              </p>
              <p className="tracking-description">
                Simple journal design to easily log your weights, reps, and
                notes.
              </p>
            </div>
          </div>
        </section>

        {/* Bodybuilding Program Section */}
        <section className="fitness-section">
          <div className="content-wrapper">
            <div className="program-info">
              <h2 className="slider-heading">{heading[currentIndex]}</h2>
              <div className="program-tags">
                <span className="tag tag-gray">GYM</span>
                <span className="tag tag-red">BUILD MUSCLE</span>
              </div>
              <p className="program-description">{texts[currentIndex]}</p>
              <div className="program-stats">
                <div className="rating">
                  <span className="rating-number">4.7</span>
                  <span className="rating-text">out of 5</span>
                  <div className="stars">{"★".repeat(5)}</div>
                </div>
                <p className="active-users">
                  <span className="user-count">10,547</span> people are doing
                  this plan right now
                </p>
              </div>
            </div>

            <div className="slider-section">
              <div className="slider-content">
                <div className="slider-container">
                  <div className="image-wrapper">
                    <img
                      src={images[currentIndex]}
                      alt={heading[currentIndex]}
                      className={`slider-image ${isSliding ? "sliding" : ""}`}
                      onTransitionEnd={handleTransitionEnd}
                    />
                  </div>
                  <button className="nav-button prev" onClick={handlePrevImg}>
                    <ChevronLeft />
                  </button>
                  <button className="nav-button next" onClick={handleNextImg}>
                    <ChevronRight />
                  </button>
                  <div className="dots-container">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        className={`dot ${index === currentIndex ? "active" : ""
                          }`}
                        onClick={() => setCurrentIndex(index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meal Plan Section */}
        <section className="meal-section">
          <div className="meal-content">
            <img
              src="/Images/plate-fu.webp"
              alt="Meal Plan"
              className="meal-image"
            />
            <div className="text-content">
              <h3 className="goal">Find a meal plan that matches your goals</h3>
              <p>
                Simple journal design to easily log your weights, reps, and
                notes.
              </p>
              <p>
                View your lifting progress with easy to understand charts and
                history views.
              </p>
              <p>Your workouts will sync to Apple Health and Google Fit.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
