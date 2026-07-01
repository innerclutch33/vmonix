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
  let history = [];

function saveResult(result) {
  history.push({
    tool: currentTool,
    input: document.getElementById("input").value,
    output: result,
    time: new Date().toISOString()
  });

  localStorage.setItem("vmonix_history", JSON.stringify(history));
}

  document.getElementById("output").innerText = result;
saveResult(result);

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
  const baseStyle =
    "You are an expert content strategist who writes viral, high-engagement social media content. Keep outputs practical, structured, and ready to use.";

  switch (tool) {

    case "YouTube Titles":
      return `${baseStyle}
Create 5 HIGH CTR YouTube titles for the topic: "${input}"
Rules:
- Make them curiosity-driven
- Avoid generic wording
- Use power words
- Keep under 60 characters each
Format as a numbered list.`;

    case "Hook Generator":
      return `${baseStyle}
Write 5 viral video hooks (first 3 seconds) for: "${input}"
Rules:
- Must create curiosity or shock
- Short and punchy
- 1–2 lines max each
Format as numbered list.`;

    case "Script Generator":
      return `${baseStyle}
Write a 45–60 second short-form video script about: "${input}"
Rules:
- Hook → Problem → Value → Ending line
- Natural speaking tone
- Easy to read aloud
Format clearly with sections.`;

    case "Captions":
      return `${baseStyle}
Generate 10 Instagram captions for: "${input}"
Rules:
- Mix emotional + engaging + minimal captions
- Add emojis where natural
- No boring generic lines
Format as list.`;

    case "Hashtags":
      return `${baseStyle}
Generate 25 trending hashtags for: "${input}"
Rules:
- Mix niche + broad hashtags
- No repetition
- No explanation, only hashtags`;

    case "Ideas":
      return `${baseStyle}
Give 10 viral content ideas for: "${input}"
Rules:
- Must be unique and practical
- Focus on trending short-form content
- No generic ideas
Format as numbered list.`;

    default:
      return input;
  }
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