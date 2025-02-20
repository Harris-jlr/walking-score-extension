document.addEventListener("DOMContentLoaded", async () => {
  chrome.runtime.sendMessage({ action: "getWalkingScore" }, (response) => {
      if (chrome.runtime.lastError) {
          console.error("Chrome Runtime Error:", chrome.runtime.lastError.message);
          document.getElementById("score").innerText = "Error fetching score";
      } else {
          document.getElementById("score").innerText = `Walking Score: ${response.score ?? "N/A"}`;
      }
  });
});
