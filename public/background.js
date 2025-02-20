chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getWalkingScore") {
      if (!request.companyId) {
          console.error("Error: companyId is undefined");
          sendResponse({ score: "Error" });
          return;
      }

      fetchWalkingScore(request.companyId)
          .then(score => sendResponse({ score }))
          .catch(error => {
              console.error("Error fetching score:", error);
              sendResponse({ score: "Error" });
          });

      return true; // Keeps the message channel open for async response
  }
});

// Function to fetch Walking Score from your API
async function fetchWalkingScore(companyId) {
  try {
      let response = await fetch(`https://walking-score-extension-api.onrender.com/score/${companyId}`);
      if (!response.ok) throw new Error("Network response was not ok");

      let data = await response.json();
      return data.score;
  } catch (error) {
      console.error("Error fetching Walking Score:", error);
      return "Error";
  }
}
