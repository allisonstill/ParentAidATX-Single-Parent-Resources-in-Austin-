import React from "react";
import AboutCard from "../components/AboutCard";
import Developer from "../models/Developer";
import "./About.css";

const team = [
  new Developer(
    "Amna Ali", // Name
    "Frontend Developer", // Role
    "arikadou", // GitLab name
    "https://media.discordapp.net/attachments/684252855506567174/1340535280318283827/image.png?ex=67b2b644&is=67b164c4&hm=c0a6b2b917ae4949e9f8639636d98e9ba70430535b942e0e8dd0c342bc41c2b9&=&format=webp&quality=lossless&width=890&height=888",
    "This is amnas description", // Bio
    ["zeeshanahmad@outlook.com"] // Email
  ),
  new Developer(
    "Andrew Harvey",
    "Full Stack Developer",
    "aharvey502",
    "/andrew-headshot.jpg",
    "This is andrews description",
    ["andrewharvey504@gmail.com", "andrew@Andrews-MacBook-Pro.local"]
  ),
  new Developer(
    "Rubi Rojas",
    "Frontend Developer",
    "jperezopt",
    "https://media.discordapp.net/attachments/684252855506567174/1340733418497118298/j_cropped.jpg?ex=67b36ecc&is=67b21d4c&hm=fe050e52fc54b1e3595cabbc78aadfcf4f53b14cd74c05057cac0565b8841a62&=&format=webp&width=476&height=476",
    "This is rubis description",
    ["jperezopt@gmail.com"]
  ),
  new Developer(
    "Allison Still",
    "Frontend Developer",
    "NathanChase22",
    "https://media.discordapp.net/attachments/684252855506567174/1340529118374137917/image.png?ex=67b2b087&is=67b15f07&hm=2ac5071542e7829cc036e04c724c323809c2b879792aab43b6e6da897380ed7b&=&format=webp&quality=lossless&width=888&height=888",
    "This is allisons description",
    ["ntc477@utexas.edu"]
  ),
  new Developer(
    "Ethan Yu",
    "Backend Developer",
    "vintaing",
    "https://media.discordapp.net/attachments/684252855506567174/1340527248364666940/image.png?ex=67b2aec9&is=67b15d49&hm=98474bff4727f2f060622096e7eb8c708ef2bb0abd8b035b6132057843ad05c8&=&format=webp&quality=lossless&width=890&height=888",
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
      Support for Single Parents in Austin, Simplified.
      ParentAidATX helps single parents in Austin, Texas get 
      information on family-related government assistance, affordable nearby housing, 
      and childcare centers.
      </p>
      <p className="about-description">
        <span className="fw-bold">Tools used: </span> NodeJS, React, Bootstrap, AWS, GitLab
        Pipelines
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
      <p className="about-description mt-5 mb-5">
        More About description here
      </p>
    </div>
  );
}

export default About;
