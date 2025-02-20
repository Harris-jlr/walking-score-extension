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

      if (!companyId || isNaN(companyId)) {
          console.error("Error: Invalid companyId detected", companyId);
          badge.innerText = "Error: Company ID not found";
          return;
      }

      console.log("Sending companyId:", companyId);  // Debugging log

      // Send message to background.js
      chrome.runtime.sendMessage(
          { action: "getWalkingScore", companyId: companyId },
          function (response) {
              if (chrome.runtime.lastError) {
                  console.error("Chrome Runtime Error:", chrome.runtime.lastError.message);
                  badge.innerText = "Error fetching score";
              } else {
                  console.log("Received response:", response);
                  badge.innerText = `Walking Score: ${response.score || "N/A"}`;
              }
          }
      );
  }
}
