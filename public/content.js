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
      badge.style.background = "#0073b1"; // LinkedIn blue
      badge.style.color = "white";
      badge.style.padding = "8px";
      badge.style.borderRadius = "5px";
      badge.style.fontSize = "14px";
      badge.style.cursor = "pointer";

      companyHeader.appendChild(badge);

      // Extract companyId
      let companyId = window.location.href.split("/company/")[1]?.split("/")[0];

      if (!companyId) {
          badge.innerText = "Error: Company ID not found";
          return;
      }

      // Send message to background.js to fetch Walking Score
      chrome.runtime.sendMessage(
          { action: "getWalkingScore", companyId: companyId },
          function (response) {
              if (chrome.runtime.lastError) {
                  console.error("Error:", chrome.runtime.lastError.message);
                  badge.innerText = "Error fetching score";
              } else {
                  badge.innerText = `Walking Score: ${response.score || "N/A"}`;
              }
          }
      );
  }
}
