export function buildPrompt(config) {
  const { direction, socialBattery, position, time, mood, mystery } = config;

  const directionLabel = direction === 'raus' ? 'Draußen / Outdoor' : 'Drinnen / Indoor';
  const batteryLabels = ['komplett leer – will absolut niemanden sehen', 'niedrig – ein bisschen Gesellschaft geht', 'okay – normale Sozialdosis', 'voll geladen – bring die Leute her!'];
  const batteryLabel = batteryLabels[socialBattery] || batteryLabels[0];

  const positionLabels = {
    stehen: 'Stehen – aufrecht und bereit',
    liegen: 'Liegen – maximal horizontal',
    sitzen: 'Sitzen – gemütlich platziert',
    gehen: 'Gehen – in Bewegung',
    kopfstand: 'Kopfstand – alles auf den Kopf stellen',
    fliegen: 'Fliegen – grenzenlos und frei'
  };
  const positionLabel = positionLabels[position] || position;

  const moodDescriptions = mood.map(({ label, value }) => {
    const pct = Math.round(value * 100);
    return `${label[0]} ←${100 - pct}%→ ${label[1]} ${pct}%`;
  }).join('\n');

  return `Du bist ein kreativer, humorvoller Freizeitberater mit dem Charme einer charmanten Couch-Potato. 
Deine Aufgabe: Schlage eine konkrete, kreative Freizeitaktivität vor, basierend auf der aktuellen Stimmung und Situation der Person.

WICHTIG:
- Antworte ausschließlich im folgenden JSON-Format
- Keine Markdown-Formatierung, kein Codeblock, nur reines JSON
- Die Aktivität muss realistisch machbar sein
- Sei kreativ und spezifisch, NICHT generisch
- Die Sprache ist Deutsch
${mystery ? '- ÜBERRASCHUNGSMODUS AKTIV: Sei ungewöhnlicher, füge absurde aber machbare Elemente hinzu (z.B. "dabei ein Cape tragen", "rückwärts gehen", "nur in Reimen sprechen")' : ''}

Aktuelle Konfiguration der Person:
- Grundrichtung: ${directionLabel}
- Social Battery: ${batteryLabel}
- Bevorzugte Körperposition: ${positionLabel}
- Verfügbare Zeit: ${time}
- Stimmung:
${moodDescriptions}

Antworte NUR mit diesem JSON-Format (kein Markdown, kein Codeblock):
{
  "activity": "Konkrete Aktivitätsbeschreibung in 1-2 Sätzen, direkt und persönlich formuliert",
  "reason": "Warum diese Aktivität perfekt zur aktuellen Stimmung passt (1-2 Sätze)",
  "moodTag": "Ein kreatives Mood-Tag-Wort (z.B. 'Sofaexplorer', 'Küchenphilosoph')",
  "duration": "Geschätzte Dauer als Text (z.B. '45 Minuten', '2 Stunden')",
  "energyLevel": "niedrig/mittel/hoch",
  "location": "indoor/outdoor",
  "social": "solo/duo/gruppe",
  "alternatives": [
    {
      "activity": "Alternative 1 kurz beschrieben",
      "moodTag": "Tag"
    },
    {
      "activity": "Alternative 2 kurz beschrieben",
      "moodTag": "Tag"
    }
  ]
}`;
}

export async function generateActivity(apiKey, config) {
  const prompt = buildPrompt(config);

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': window.location.origin,
      'X-Title': 'Couch Potato'
    },
    body: JSON.stringify({
      model: 'anthropic/claude-sonnet-4.6',
      messages: [
        { role: 'user', content: prompt }
      ],
      temperature: 0.85,
      max_tokens: 1000
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`API Error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) throw new Error('Keine Antwort vom LLM erhalten');

  // Try to parse JSON from the response, handling possible markdown wrapping
  let jsonStr = content.trim();
  // Strip markdown code blocks if present
  if (jsonStr.startsWith('```')) {
    jsonStr = jsonStr.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '');
  }

  try {
    return JSON.parse(jsonStr);
  } catch {
    throw new Error('Konnte LLM-Antwort nicht parsen: ' + content.slice(0, 200));
  }
}
