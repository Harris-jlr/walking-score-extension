async function fetchWalkingScore(companyId) {
  try {
      let response = await fetch(`https://your-api.com/score/${companyId}`);
      if (!response.ok) throw new Error("Network response was not ok");
      let data = await response.json();
      return data.score;
  } catch (error) {
      console.error("Error fetching Walking Score:", error);
      return "Error";
  }
}

// Now, use it inside the listener
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === "getWalkingScore") {
      let score = await fetchWalkingScore(request.companyId);
      sendResponse({ score });
  }
});
