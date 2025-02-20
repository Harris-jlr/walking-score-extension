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
  let metaTag = document.querySelector("meta[property='lnkd:organization']");

  if (metaTag) {
      let companyId = metaTag.getAttribute("content");
      console.log("✅ Meta Tag companyId:", companyId);
      return companyId;
  }

  console.error("❌ Company ID meta tag not found.");
  return null;
}
