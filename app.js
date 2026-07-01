let currentTool = "";

function openTool(tool) {
  currentTool = tool;
  document.getElementById("toolName").innerText = tool;
  document.getElementById("output").innerText = "";
}

function generate() {
  let input = document.getElementById("input").value;

  if (!input) {
    alert("Enter a topic first");
    return;
  }

  document.getElementById("output").innerText =
    `Generated ${currentTool} for: ${input}\n\n(Next step: we will connect real AI here)`;
}