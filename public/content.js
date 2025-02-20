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

      let companyId = extractCompanyId();

      if (!companyId || isNaN(companyId)) {
          console.error("❌ Error: Could not extract valid companyId", companyId);
          badge.innerText = "Error: Company ID not found";
          return;
      }

      console.log("✅ Extracted companyId:", companyId);

      // ✅ Send companyId to background.js
      chrome.runtime.sendMessage(
          { action: "getWalkingScore", companyId: companyId },
          function (response) {
              if (chrome.runtime.lastError) {
                  console.error("❌ Chrome Runtime Error:", chrome.runtime.lastError.message);
                  badge.innerText = "Error fetching score";
              } else {
                  console.log("✅ Received response from background.js:", response);
                  badge.innerText = `Walking Score: ${response.score || "N/A"}`;
              }
          }
      );
  }
}

// ✅ Extracts the correct numeric companyId from LinkedIn's metadata
function extractCompanyId() {
  let companyId = null;

  // Method 1: Try to get it from LinkedIn's company URL
  if (window.location.href.includes("/company/")) {
      let match = window.location.href.match(/\/company\/(\d+)/);
      if (match) {
          companyId = match[1];
      }
  }

  // Method 2: Try getting company ID from search results link
  let searchLink = document.querySelector("a[href*='currentCompany']");
  if (!companyId && searchLink) {
      let match = searchLink.href.match(/currentCompany=%5B%22(\d+)%22%5D/);
      if (match) {
          companyId = match[1];
      }
  }

  console.log("🔍 Extracted companyId:", companyId);
  return companyId;
}


