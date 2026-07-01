let currentTool = "";

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
    const response = await fetch("https://api-inference.huggingface.co/models/google/flan-t5-base", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: prompt
      })
    });

    const data = await response.json();

    let result = data[0]?.generated_text || "No response. Try again.";

    document.getElementById("output").innerText = result;

  } catch (error) {
    document.getElementById("output").innerText =
      "Error generating content. Try again later.";
  }
}

function buildPrompt(tool, input) {
  switch (tool) {
    case "YouTube Titles":
      return `Generate 5 viral YouTube titles for: ${input}`;

    case "Hook Generator":
      return `Write a powerful 3-second hook for a video about: ${input}`;

    case "Script Generator":
      return `Write a short engaging video script (30-60 sec) about: ${input}`;

    case "Captions":
      return `Write 5 Instagram captions for: ${input}`;

    case "Hashtags":
      return `Generate trending hashtags for: ${input}`;

    case "Ideas":
      return `Give 10 viral content ideas for: ${input}`;

    default:
      return input;
  }
}