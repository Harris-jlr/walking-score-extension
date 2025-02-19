chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.action === "getWalkingScore") {
      let score = await fetchWalkingScore(request.companyId);
      sendResponse({ score });
    }
  });
  