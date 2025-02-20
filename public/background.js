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


// Now, use it inside the listener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getWalkingScore") {
    
    // Call fetchWalkingScore asynchronously
    fetchWalkingScore(request.companyId)
      .then(score => sendResponse({ score })) // Send response if successful
      .catch(error => {
          console.error("Error fetching score:", error);
          sendResponse({ score: "Error" }); // Send "Error" if there's an issue
      });

    return true;  // Keeps the message channel open for async response
  }
});

