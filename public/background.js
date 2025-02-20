chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("📩 Received request in background.js:", request);

  if (request.action === "getWalkingScore") {
      if (!request.companyId) {
          console.error("❌ Error: companyId is undefined in request:", request);
          sendResponse({ score: "Error" });
          return;
      }

      console.log("✅ Fetching Walking Score for companyId:", request.companyId);

      fetchWalkingScore(request.companyId)
          .then(score => {
              console.log("✅ Score fetched:", score);
              sendResponse({ score });
          })
          .catch(error => {
              console.error("❌ Error fetching score:", error);
              sendResponse({ score: "Error" });
          });

      return true;  // Keeps the message channel open for async response
  }
});

// ✅ Connect the extension to YOUR API
async function fetchWalkingScore(companyId) {
  try {
      console.log("🌍 Fetching walking score for companyId:", companyId);

      let response = await fetch(`https://walking-score-extension-api.onrender.com/score/${companyId}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          }
      });

      if (!response.ok) throw new Error("Network response was not ok");

      let data = await response.json();
      console.log("✅ API Response:", data);
      return data.score;
  } catch (error) {
      console.error("❌ Error fetching Walking Score:", error);
      return "Error";
  }
}
