let currentTool = "";

// Load history once
let history = JSON.parse(localStorage.getItem("vmonix_history")) || [];

function openTool(tool) {
  currentTool = tool;
  document.getElementById("toolName").innerText = tool;
  document.getElementById("output").innerText = "";
}

async function generate() {
  let input = document.getElementById("input").value;

  if (!input) {
    alert("Enter a topic first");
    return;
  }

  document.getElementById("output").innerText = "Generating...";

  let prompt = buildPrompt(currentTool, input);

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-base",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: prompt
        })
      }
    );

    const data = await response.json();

    let result = data[0]?.generated_text || "No response. Try again.";

    document.getElementById("output").innerText = result;

    saveResult(result);

  } catch (error) {
    document.getElementById("output").innerText =
      "Error generating content. Try again later.";
  }
}

function saveResult(result) {
  history.push({
    tool: currentTool,
    input: document.getElementById("input").value,
    output: result,
    time: new Date().toISOString()
  });

  localStorage.setItem("vmonix_history", JSON.stringify(history));
}

function copyText() {
  let text = document.getElementById("output").innerText;

  if (!text) {
    alert("Nothing to copy");
    return;
  }

  navigator.clipboard.writeText(text);
  alert("Copied to clipboard");
}

function buildPrompt(tool, input) {
  const baseStyle =
    "You are an expert content strategist who writes viral, high-engagement social media content.";

  switch (tool) {

    case "YouTube Titles":
      return `${baseStyle}
Generate 5 viral YouTube titles for: "${input}"`;

    case "Hooks":
      return `${baseStyle}
Generate 5 viral hooks for: "${input}"`;

    case "Scripts":
      return `${baseStyle}
Write a short video script for: "${input}"`;

    case "Captions":
      return `${baseStyle}
Generate Instagram captions for: "${input}"`;

    case "Hashtags":
      return `${baseStyle}
Generate trending hashtags for: "${input}"`;

    case "Ideas":
      return `${baseStyle}
Give 10 content ideas for: "${input}"`;

    default:
      return input;
  }
}
let favorites = JSON.parse(localStorage.getItem("vmonix_favorites")) || [];

function saveFavorite() {
  const data = {
    tool: currentTool,
    input: document.getElementById("input").value,
    output: document.getElementById("output").innerText,
    time: new Date().toISOString()
  };

  favorites.push(data);
  localStorage.setItem("vmonix_favorites", JSON.stringify(favorites));

  alert("Saved to favorites");
}
function shareResult() {
  let text = document.getElementById("output").innerText;

  if (!text) return alert("Nothing to share");

  const shareText = `Generated using Vmonix AI:\n\n${text}`;

  if (navigator.share) {
    navigator.share({
      title: "Vmonix AI Result",
      text: shareText
    });
  } else {
    navigator.clipboard.writeText(shareText);
    alert("Copied for sharing");
  }
}
let generateCount = 0;

function trackAds() {
  generateCount++;

  if (generateCount % 3 === 0) {
    console.log("Show interstitial ad here");
    // AdMob / AdSense interstitial trigger later
  }
}
function getHistory() {
  return JSON.parse(localStorage.getItem("vmonix_history")) || [];
}