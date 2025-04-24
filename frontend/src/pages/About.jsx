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
    "I am currently a junior double majoring in Computer Science and Exercise Science. Outside of class, I enjoy playing basketball, cooking, and spending time with my friends.",
    ["ethan.yu@utexas.edu"]
  ),
];

function About() {
  return (
    <div className="container mt-5">
      <h1 className="about-title">About Us</h1>
      <hr />
      <p className="about-description">
        <strong style={{ color: "#f68751", fontSize: "1.2em"}}>
        Support for Single Parents in Austin, Simplified.
        </strong> ParentAidATX helps
        single parents in Austin, Texas get information on family-related
        books, affordable nearby housing, and childcare centers.
      </p>
      <p className="about-description">
        <span className="fw-bold">Tools used: </span> NodeJS, React, Bootstrap,
        AWS Amplify, AWS EC2, Railway, GitLab Pipelines
      </p>
      <p className="about-description">
        <span className="fw-bold">Data sources: </span> GitLab API, Brightwheel, Google Books API, Google Maps API, Yelp API
      </p>
      <p className="about-description">
        <span className="fw-bold">API Documentation Link: </span> <a href="https://documenter.getpostman.com/view/42442568/2sAYdZstBv"> Documentation </a>
      </p>
      <p className="about-description">
        <span className="fw-bold">GitLab Link: </span> <a href="https://gitlab.com/aharvey502/cs373-spring-2025-group-17/"> Link </a>
      </p>
      <h3 className="about-subtitle mt-5 mb-3">Meet The Team</h3>

      <div className="d-flex flex-wrap justify-content-center gap-5">
        <AboutCard developer={team[0]} />
        <AboutCard developer={team[1]} />
        <AboutCard developer={team[2]} />
        <AboutCard developer={team[3]} />
        <AboutCard developer={team[4]} />
      </div>
      <p className="about-description mt-5 mb-5">This project was born out of the need to integrate disparate data sources, 
        making it easier for single parents to access support resources. With so much to juggle, navigating hundreds of
        housing options and childcare services can be overwhelming and time-consuming for single parents.
        We aim to simplify this process by consolidating the most useful resources into a single, accessible website.</p>
        <div className="self-critique-section mt-5 p-4 border-top">
        <h2 className="mb-10">Critique & Reflection</h2>
        <h4>Self Critique</h4>
        <div className="space-y-4">
            <div>
              <strong>What did we do well?</strong><br />
              We partook in frequent communication, collaboration, and delegation of tasks, which allowed us to have strong team synergy and complete the project efficiently.
            </div>

            <div>
              <strong>What did we learn?</strong><br />
              We learned a plethora of technical skills, including CI/CD workflows, React, APIs, Database Management, AWS, JavaScript, HTML, CSS, and Python. We also learned how to design, structure, and refactor a large code base so it scales and stays maintainable. Most importantly, we learned the importance of clear communication and organization.
            </div>

            <div>
              <strong>What did we teach each other?</strong><br />
              Each member brought unique strengths that improved everyone’s technical knowledge. We also taught each other best coding practices, like how to reuse code with React components, React props, database management, and safe API key management.
            </div>

            <div>
              <strong>What can we do better?</strong><br />
              Our website could have benefited from additional rounds of refactoring. As the semester progressed, we became more focused on implementing features and meeting deadlines, which occasionally came at the expense of writing clean, maintainable code. In retrospect, establishing a more consistent code structure and adhering to clear naming conventions from the beginning would have improved both readability and scalability.
            </div>

            <div>
              <strong>What effect did the peer reviews have?</strong><br />
              The peer reviews provided encouragement and constructive feedback for each team member, helping us build a culture of support.
            </div>

            <div>
              <strong>What puzzles us?</strong><br />
              We are still puzzled about the AWS infrastructure, especially with sharing an EC2 instance across multiple users/developers. Additionally, we ran into some issues refactoring our code, particularly when refactoring came at the expense of functional code.
            </div>
          </div>
        <h4 className="mt-16 d-flex align-items-center gap-3 justify-content-start">UTherapy Critique</h4>
        <div className="space-y-4">
          <div>
            <strong>What did they do well?</strong><br />
            The team did an excellent job implementing a wide range of filtering and sorting options, which made navigating the website efficient and user-friendly. Keeping the search bar consistently at the top of every page was a thoughtful and practical design choice. Additionally, the visual theme was well-aligned with the topic and enhanced the overall user experience. Their attention to design details demonstrated a clear commitment to creating a polished and professional product.
          </div>

          <div>
            <strong>How effective was their RESTful API?</strong><br />
            Their RESTful API was highly effective—clear, easy to navigate, and functionally sound. We experienced no technical difficulties while accessing data, and the structure made it intuitive to interact with.
          </div>

          <div>
            <strong>How well did they implement your user stories?</strong><br />
            They were proactive and responsive in implementing the user stories. Throughout the semester, they consistently contributed suggestions and maintained strong communication with us whenever questions or concerns arose. Their collaborative approach was much appreciated.
          </div>

          <div>
            <strong>What did we learn from their website?</strong><br />
            As fellow students, we gained valuable insight into the variety of mental health resources available. Additionally, the site reinforced the importance of thoughtful web design in engaging users and delivering information effectively.
          </div>

          <div>
            <strong>What can they do better?</strong><br />
            While the overall experience was impressive, we recommend limiting the number of related instances displayed on each instance page. In some cases, the pages felt overly long. Adjusting the size of the related instance cards could also improve visual balance and usability.
          </div>

          <div>
            <strong>What puzzles us about their website?</strong><br />
            We were curious about the rationale behind including so many related instances for certain clinics. It wasn’t always clear why those connections were emphasized, which made some sections feel cluttered or overwhelming.
          </div>
        </div>

      </div>
    </div>
      
  );
}

export default About;

