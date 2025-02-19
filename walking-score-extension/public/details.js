document.addEventListener("DOMContentLoaded", async () => {
    let score = await chrome.runtime.sendMessage({ action: "getWalkingScore" });
    document.getElementById("score").innerText = `Walking Score: ${score}`;
  });
  