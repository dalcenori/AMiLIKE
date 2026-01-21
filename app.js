// AMiLIKE® Demo Calculator (Birth Number from day-of-month)
// Replace the "profiles" + logic with your proprietary system later.

const $ = (id) => document.getElementById(id);

const profiles = {
  1: {
    vibe: "Initiator energy. Built to lead, build, and move first.",
    strengths: ["Decisive", "Independent", "Creates momentum fast"],
    watchouts: ["Can bulldoze", "Impatient with delays", "Struggles with delegation"],
    line: (name) => `${name} doesn’t wait for permission — ${name} quietly becomes the permission.`
  },
  2: {
    vibe: "Connector energy. Sensitive to people, harmony, and timing.",
    strengths: ["Diplomatic", "Intuitive", "Builds trust naturally"],
    watchouts: ["Over-accommodates", "Avoids conflict too long", "Takes things personally"],
    line: (name) => `${name} can feel the room before the room knows what it feels.`
  },
  3: {
    vibe: "Expression energy. Creative, social, magnetic communicator.",
    strengths: ["Charismatic", "Imaginative", "Brings levity and sparkle"],
    watchouts: ["Scatters focus", "Starts more than finishes", "Mood-driven output"],
    line: (name) => `${name} doesn’t just talk — ${name} turns air into electricity.`
  },
  4: {
    vibe: "Builder energy. Structure, order, discipline, and reliability.",
    strengths: ["Consistent", "Practical", "Turns chaos into systems"],
    watchouts: ["Rigid under pressure", "Overworks", "Resists change at first"],
    line: (name) => `${name} is what “solid ground” looks like when life starts shaking.`
  },
  5: {
    vibe: "Freedom energy. Adaptable, bold, and allergic to cages.",
    strengths: ["Versatile", "Quick learner", "Thrives in change"],
    watchouts: ["Restless", "Impulsive", "Commitment-phobic when bored"],
    line: (name) => `${name} doesn’t break rules — ${name} rewrites the whole operating system.`
  },
  6: {
    vibe: "Guardian energy. Responsibility, loyalty, and care-taking done right.",
    strengths: ["Protective", "Warm", "Creates home wherever they go"],
    watchouts: ["Over-responsible", "Control via “helping”", "Resentment if unappreciated"],
    line: (name) => `${name} is the person you call when you want life to feel safe again.`
  },
  7: {
    vibe: "Seeker energy. Analytical, spiritual, and privately intense.",
    strengths: ["Insightful", "Observant", "Deep thinker"],
    watchouts: ["Withdraws", "Overthinks", "Hard to read / hard to reach"],
    line: (name) => `${name} doesn’t chase noise — ${name} hunts truth.`
  },
  8: {
    vibe: "Power energy. Authority, results, and high standards.",
    strengths: ["Ambitious", "Strategic", "Built for big outcomes"],
    watchouts: ["Workaholic", "Controls outcomes", "Can forget softness"],
    line: (name) => `${name} doesn’t “want” success — ${name} expects it, then engineers it.`
  },
  9: {
    vibe: "Humanitarian energy. Big heart, big picture, big endings + new beginnings.",
    strengths: ["Compassionate", "Visionary", "Transforms pain into purpose"],
    watchouts: ["Savior tendencies", "Difficulty letting go", "Emotional overflow"],
    line: (name) => `${name} turns hard chapters into fuel — and hands the fire to others.`
  },
  11: {
    vibe: "Master 11: Signal energy. Intuition + inspiration with high-voltage sensitivity.",
    strengths: ["Visionary", "Electrifying presence", "Spiritual insight"],
    watchouts: ["Nervous system overload", "Doubt cycles", "Isolation when misunderstood"],
    line: (name) => `${name} doesn’t follow the light — ${name} is the light people notice first.`
  },
  22: {
    vibe: "Master 22: Architect energy. Builds legacy structures that outlive the moment.",
    strengths: ["Big builder", "Execution at scale", "Turns vision into infrastructure"],
    watchouts: ["Pressure cooker", "Over-control", "Fear of failure due to size"],
    line: (name) => `${name} doesn’t dream small — ${name} drafts blueprints for reality.`
  }
};

function reduceToBirthNumber(day) {
  // Preserve 11 and 22 if the day itself is 11 or 22.
  if (day === 11 || day === 22) return day;

  // Reduce day to a single digit (1-9).
  let n = day;
  while (n > 9) {
    n = String(n).split("").reduce((sum, d) => sum + Number(d), 0);
    // if reduction hits 11 or 22, keep it
    if (n === 11 || n === 22) return n;
  }
  return n;
}

function safeName(raw) {
  const s = (raw || "").trim();
  if (!s) return "You";
  // Title-case first word only (keeps it clean)
  const first = s.split(/\s+/)[0];
  return first.charAt(0).toUpperCase() + first.slice(1);
}

function formatDate(d) {
  // d is YYYY-MM-DD
  const [y, m, day] = d.split("-").map(Number);
  const date = new Date(y, (m - 1), day);
  return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

function buildList(el, items) {
  el.innerHTML = "";
  for (const it of items) {
    const li = document.createElement("li");
    li.textContent = it;
    el.appendChild(li);
  }
}

function buildPrintBox(name, dob, birthNumber, p) {
  const lines = [];
  lines.push(`AMiLIKE® Snapshot`);
  lines.push(`Name: ${name}`);
  lines.push(`Birthdate: ${formatDate(dob)}`);
  lines.push(`Birth Number: ${birthNumber}`);
  lines.push(``);
  lines.push(`Core Vibe:`);
  lines.push(`${p.vibe}`);
  lines.push(``);
  lines.push(`Strengths:`);
  for (const s of p.strengths) lines.push(`- ${s}`);
  lines.push(``);
  lines.push(`Watch-Outs:`);
  for (const w of p.watchouts) lines.push(`- ${w}`);
  lines.push(``);
  lines.push(`AMiLIKE Line:`);
  lines.push(`“${p.line(name)}”`);
  return lines.join("\n");
}

function setShareLink(name, dob) {
  const url = new URL(window.location.href);
  url.searchParams.set("n", encodeURIComponent(name));
  url.searchParams.set("d", dob);
  window.history.replaceState({}, "", url);
  $("copyLink").disabled = false;
}

function readShareLink() {
  const params = new URLSearchParams(window.location.search);
  const n = params.get("n");
  const d = params.get("d");
  if (!n || !d) return null;
  try {
    return { name: decodeURIComponent(n), dob: d };
  } catch {
    return { name: n, dob: d };
  }
}

function render(nameRaw, dob) {
  const name = safeName(nameRaw);
  const day = Number(dob.split("-")[2]);
  const birthNumber = reduceToBirthNumber(day);

  const p = profiles[birthNumber] || profiles[1];

  $("result").classList.remove("hidden");
  $("r_meta").textContent = `${name} • ${formatDate(dob)} • Birth Number from day-of-month`;
  $("r_number").textContent = birthNumber;

  $("r_vibe").textContent = p.vibe;
  buildList($("r_strengths"), p.strengths);
  buildList($("r_watchouts"), p.watchouts);

  const line = p.line(name);
  $("r_line").textContent = line;

  $("printBox").textContent = buildPrintBox(name, dob, birthNumber, p);

  setShareLink(name, dob);

  // copy line
  $("copyLine").onclick = async () => {
    try {
      await navigator.clipboard.writeText(line);
      $("copyLine").textContent = "Copied ✓";
      setTimeout(() => ($("copyLine").textContent = "Copy Line"), 1200);
    } catch {
      alert("Copy failed. Your browser may block clipboard access.");
    }
  };

  // download txt
  $("downloadTxt").onclick = () => {
    const content = buildPrintBox(name, dob, birthNumber, p);
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `AMiLIKE-${name}-BirthNumber-${birthNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(a.href);
  };

  $("print").onclick = () => window.print();
}

$("year").textContent = new Date().getFullYear();

$("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("name").value;
  const dob = $("dob").value;
  if (!dob) return;
  render(name, dob);
});

$("randomize").addEventListener("click", () => {
  const examples = [
    { name: "Rob", dob: "1980-01-11" },
    { name: "Avery", dob: "1994-06-22" },
    { name: "Jordan", dob: "2001-09-05" },
    { name: "Sam", dob: "1987-12-28" }
  ];
  const pick = examples[Math.floor(Math.random() * examples.length)];
  $("name").value = pick.name;
  $("dob").value = pick.dob;
  render(pick.name, pick.dob);
});

$("copyLink").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    $("copyLink").textContent = "Link Copied ✓";
    setTimeout(() => ($("copyLink").textContent = "Copy Share Link"), 1200);
  } catch {
    alert("Copy failed. Your browser may block clipboard access.");
  }
});

// Auto-render if page opened via share link
const shared = readShareLink();
if (shared) {
  $("name").value = shared.name;
  $("dob").value = shared.dob;
  render(shared.name, shared.dob);
}
