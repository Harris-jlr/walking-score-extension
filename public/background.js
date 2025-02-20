async function fetchCredibilityScore(companyId) {
  try {
      let response = await fetch(`http://localhost:5000/score/${companyId}`);
      if (!response.ok) throw new Error("Network response was not ok");
      let data = await response.json();
      return data;
  } catch (error) {
      console.error("Error fetching Credibility Score:", error);
      return { score: "N/A", rating: "Error" };
  }
}


// Now, use it inside the listener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getWalkingScore") {
      fetchWalkingScore(request.companyId)
          .then(score => sendResponse({ score }))
          .catch(error => {
              console.error("Error fetching score:", error);
              sendResponse({ score: "Error" });
          });
      return true;  // Keeps the message channel open for async response
  }
});

