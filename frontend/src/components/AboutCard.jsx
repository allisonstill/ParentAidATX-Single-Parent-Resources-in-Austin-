/**
 * A component to hold information for every "about me" card
 */

import React, { useState, useEffect } from "react";
import "./AboutCard.css";

function handleGitLabFetch(
  developer,
  setCommitCount,
  setIssueCount,
  setUnitCount
) {
  const PROJECT_ID = 67142605;

  // Grab every issue
  const fetchIssues = async () => {
    let page = 1;
    let numIssues = 0;
    // Gitlab only gives us 100 issues max per request, so we have to look at every page
    while (true) {
      const response = await fetch(
        `https://gitlab.com/api/v4/projects/${PROJECT_ID}/issues?per_page=100&page=${page}`
      );
      const data = await response.json();
      if (data.length === 0) {
        // Finished looking through all issues
        break;
      }
      for (let i = 0; i < data.length; i++) {
        if (data[i].closed_by === null) {
          continue;
        }
        let issueClosedBy = data[i].closed_by.username;
        //let issueUsername = data[i].assignee.username;
        let issueState = data[i].state;
        if (issueClosedBy === developer.username && issueState === "closed") {
          numIssues++;
        }
      }
      page++;
    }
    setIssueCount(numIssues);
  };
  fetchIssues().catch((error) =>
    console.error("Error fetching commits:", error)
  );

  // Grab every commit and populate issues
  const fetchCommits = async () => {
    let allCommits = [];
    let page = 1;
    let numCommits = 0;
    // Gitlab only gives us 100 commits max per request, so we have to look at every page
    while (true) {
      const response = await fetch(
        `https://gitlab.com/api/v4/projects/${PROJECT_ID}/repository/commits?per_page=100&page=${page}`
      );
      const data = await response.json();
      if (data.length === 0) {
        // Finished looking through all commits
        break;
      }
      for (let i = 0; i < data.length; i++) {
        const author = data[i].author_email;
        for (let j = 0; j < developer.emails.length; j++) {
          if (author === developer.emails[j]) {
            numCommits++;
            break;
          }
        }
      }
      allCommits = allCommits.concat(data);

      page++;
    }
    setCommitCount(numCommits);

    let numUnitTests = 0;
    allCommits.forEach((commit) => {
      const author = commit.author_email;
      const message = commit.message;
      developer.emails.forEach((email) => {
        if (author === email && message.includes("unit tests")) {
          try {
            const endIndex = message.indexOf("unit tests") - 2;
            let startIndex = endIndex;
            while (
              startIndex >= 0 &&
              message.charAt(startIndex) >= "0" &&
              message.charAt(startIndex) <= "9"
            ) {
              startIndex--;
            }
            const num = message.substring(startIndex + 1, endIndex + 1);
            const numInt = parseInt(num);
            numUnitTests += numInt;
          } catch (err) {
            // Just move on to the next email
          }
        }
      });
    });
    setUnitCount(numUnitTests);
  };
  fetchCommits().catch((error) =>
    console.error("Error fetching commits:", error)
  );
}

function AboutCard({ developer }) {
  const [commitCount, setCommitCount] = useState(0); // Num Commits
  const [issueCount, setIssueCount] = useState(0); // Num Issues
  const [unitCount, setUnitCount] = useState(0); // Num Unit Tests

  useEffect(
    () =>
      handleGitLabFetch(developer, setCommitCount, setIssueCount, setUnitCount),
    [developer.username, developer]
  );
  return (
    <div className="card drop-shadow border-0" style={{ width: "18rem" }}>
      <img src={developer.image} className="card-img-top" alt="About Us" />
      <div className="card-body">
        <h5 className="card-title center-text mb-0">{developer.name}</h5>
        <p className="card-subtitle center-text mt-0">{developer.role}</p>
        <hr />
        <p className="card-text">{developer.bio}</p>
        <p className="card-text right-text">
          <span className="gitlab-number">{commitCount}</span>{" "}
          <span className="fw-bold">Commits</span>
        </p>
        <p className="card-text right-text">
          <span className="gitlab-number">{issueCount}</span>{" "}
          <span className="fw-bold">Issues Closed</span>
        </p>
        <p className="card-text right-text">
          <span className="gitlab-number">{unitCount}</span>{" "}
          <span className="fw-bold">Unit Tests</span>
        </p>
      </div>
      <div className="drop-shadow"></div>
    </div>
  );
}

AboutCard.defaultProps = {
  name: "Mahoraga",
  role: "Frontend Developer",
  image:
    "https://www.sunnyskyz.com/uploads/2022/04/ug5so-cat-mayor-of-hell-michigan-2.jpg",
  username: "obl2t",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque est enim, venenatis eu",
  emails: ["idk"],
};

export default AboutCard;
