import React from "react";
import AboutCard from "../components/AboutCard";
import Developer from "../models/Developer";
import "./About.css";

const team = [
  new Developer(
    "Amna Ali", // Name
    "Frontend Developer", // Role
    "a-amna-a", // GitLab name
    "/amna-headshot.jpg",
    "I'm a junior studying Computer Science at UT Austin. My expertise is in Java and web development. I like playing video games and reading in my free time!", // Bio
    ["httpamna@gmail.com", "64616392+a-amna-a@users.noreply.github.com"] // Email
  ),
  new Developer(
    "Andrew Harvey",
    "Full Stack Developer",
    "aharvey502",
    "/andrew-headshot.jpg",
    "I’m a junior computer science major at UT Austin. I've always been passionate about using technology for meaningful real-world applications. In my free time, I like to play video games, do astrophotography, and watch movies!",
    ["andrewharvey504@gmail.com", "andrew@Andrews-MacBook-Pro.local"]
  ),
  new Developer(
    "Rubi Rojas",
    "Frontend Developer",
    "rubirojas",
    "/rubiHeadshot.png",
    "I’m a senior majoring in Computer Science with a minor in Business. Outside of class, I love to run, explore new coffee shops, and spend time with my friends.",
    ["rubirojas@utexas.edu", "rubirojas@Rubis-Laptop.local"]
  ),
  new Developer(
    "Allison Still",
    "Frontend Developer",
    "allisonstill",
    "/allison-2-headshot.jpeg",
    "My name is Allison Still, and I am a junior studying Computer Science. In my free time, I like watching movies, trying new restaurants, and hanging out with my friends.",
    ["allisonstill@utexas.edu", "allistill12@gmail.com"]
  ),
  new Developer(
    "Ethan Yu",
    "Backend Developer",
    "ethany04",
    "/ethan_headshot.JPG",
    "This is ethans description",
    ["ethan.yu@utexas.edu"]
  ),
];

function About() {
  return (
    <div className="container mt-5">
      <h1 className="about-title">About Us</h1>
      <hr />
      <p className="about-description">
        <strong style={{ color: "#2E8B57", fontSize: "1.2em"}}>
        Support for Single Parents in Austin, Simplified.
        </strong> ParentAidATX helps
        single parents in Austin, Texas get information on family-related
        government assistance, affordable nearby housing, and childcare centers.
      </p>
      <p className="about-description">
        <span className="fw-bold">Tools used: </span> NodeJS, React, Bootstrap,
        AWS, GitLab Pipelines
      </p>
      <p className="about-description">
        <span className="fw-bold">Data sources: </span> GitLab API (not using
        other data sources for phase 1)
      </p>
      <h3 className="about-subtitle mt-5 mb-3">Meet The Team</h3>

      <div className="d-flex flex-wrap justify-content-center gap-5">
        <AboutCard developer={team[0]} />
        <AboutCard developer={team[1]} />
        <AboutCard developer={team[2]} />
        <AboutCard developer={team[3]} />
        <AboutCard developer={team[4]} />
      </div>
      <p className="about-description mt-5 mb-5">More About description here</p>
    </div>
  );
}

export default About;
