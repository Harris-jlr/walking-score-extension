document.addEventListener("DOMContentLoaded", function () {
    if (window.location.href.includes("linkedin.com/company/")) {
      insertWalkingScoreBadge();
    }
  });
  
  function insertWalkingScoreBadge() {
    let companyHeader = document.querySelector(".org-top-card-summary__title");
    if (companyHeader) {
      let badge = document.createElement("div");
      badge.id = "walking-score-badge";
      badge.innerText = "Walking Score: Loading...";
      badge.style.background = "#0073b1";  // LinkedIn blue
      badge.style.color = "white";
      badge.style.padding = "8px";
      badge.style.borderRadius = "5px";
      badge.style.fontSize = "14px";
      badge.style.cursor = "pointer";
      
      companyHeader.appendChild(badge);
      fetchWalkingScore().then(score => {
        badge.innerText = `Walking Score: ${score}`;
      });
    }
  }
  
  async function fetchWalkingScore() {
    let companyId = window.location.href.split("/company/")[1].split("/")[0];
    let response = await fetch(`https://api.linkedin.com/rest/dmaOrganizationalPageFollows?q=followee&followee=urn:li:organizationalPage:${companyId}`, {
      headers: { Authorization: `Bearer YOUR_ACCESS_TOKEN` }
    });
  
    let data = await response.json();
    let score = data.paging.total * 0.3;  // Example formula
    return score.toFixed(1);
  }
  