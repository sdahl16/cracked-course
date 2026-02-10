import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, Sparkles } from 'lucide-react';

const MISSIONS = {
  '1.1': {
    title: 'Precision Control',
    level: 1,
    instructions: {
      scenario: "You're a copywriter for a SaaS company launching 'TaskFlow', an AI-powered project management tool. Write a prompt that makes Claude generate a product description meeting these EXACT specifications:",
      requirements: [
        "Exactly 150 words (not 149, not 151)",
        "Must mention these 3 features: AI task prioritization, team collaboration dashboard, automated reporting",
        "Written in complete sentences (not bullet points or fragments)",
        "Must end with clear call-to-action",
        "No pricing or technical specifications",
        "",
        "📤 SUBMIT: Paste Claude's product description (not your prompt) in the output box below"
      ],
      goal: "Master output control through constraints. Learn how explicit constraints control AI outputs precisely."
    },
    criteria: [
      { id: 'wordcount', label: 'Exactly 150 words', auto: true },
      { id: 'features', label: 'All 3 features mentioned', auto: true },
      { id: 'sentences', label: 'Complete sentences (not bullets)', auto: true },
      { id: 'cta', label: 'Clear call-to-action at end', auto: true },
      { id: 'nospecs', label: 'No pricing or technical specs', auto: true }
    ]
  },
  '1.2': {
    title: 'Structure Enforcement (XML)',
    level: 1,
    instructions: {
      scenario: "You're consulting for a restaurant chain considering delivery robots. Write a prompt that makes Claude analyze this decision and format the output in XML structure.",
      xmlContext: `📘 What is XML?

XML uses "tags" to organize information - like folders for different types of content.

Opening tag: <analysis>
Content goes here
Closing tag: </analysis>

Think of it like labeled boxes:
- <risks> holds all the risks
- <opportunities> holds all the opportunities
- Each box keeps related info together

You don't need to write XML yourself - you just tell Claude to use this structure!`,
      template: `<analysis>
  Market context
</analysis>

<risks>
  3+ risks with mitigation
</risks>

<opportunities>
  3+ opportunities with strategies
</opportunities>

<recommendation>
  Clear decision with justification
</recommendation>`,
      example: `💡 HOW TO STRUCTURE YOUR PROMPT:

Start with context: "A restaurant chain is considering delivery robots..."

Then say: "Format your response using these XML tags:"

Copy the template above and paste it into your prompt.

Add: "For each risk, include a mitigation strategy. For each opportunity, include how to exploit it."

That's it! Claude will fill in the template with actual analysis.`,
      requirements: [
        "Tell Claude to use the XML structure shown in the template",
        "All 4 XML tags must be present and properly closed (<tag> and </tag>)",
        "Content should appear ONLY within tags (not outside)",
        "Each risk should include a mitigation strategy",
        "Each opportunity should include an exploitation strategy",
        "Recommendation should be actionable",
        "",
        "📤 SUBMIT: Paste Claude's XML analysis (not your prompt) below"
      ],
      goal: "Master structured output with XML tags. This skill is critical for API integrations and automated systems - it teaches Claude to organize information in predictable formats."
    },
    criteria: [
      { id: 'tags', label: 'All 4 XML tags present and closed', auto: true },
      { id: 'nocontent', label: 'No content outside tags', auto: true },
      { id: 'mitigation', label: 'Each risk has mitigation', auto: true },
      { id: 'exploitation', label: 'Each opportunity has strategy', auto: true },
      { id: 'actionable', label: 'Recommendation is specific', auto: true }
    ]
  },
  '1.3': {
    title: 'Context Efficiency',
    level: 1,
    instructions: {
      scenario: "You're building a chatbot that needs company info in its system prompt. You have a 2000-token context limit, and you've already used 1800 tokens. Write a prompt that asks Claude to compress this company data to fit in the remaining 200 tokens (~150 words).",
      data: `TechCorp - Founded 2010, 450 employees, $89M revenue, sells cloud storage solutions
DataFlow - Founded 2016, 230 employees, $34M revenue, sells data analytics platforms
CloudNine - Founded 2013, 680 employees, $156M revenue, sells enterprise collaboration software
SecureNet - Founded 2018, 125 employees, $18M revenue, sells cybersecurity tools
AILabs - Founded 2015, 340 employees, $67M revenue, sells machine learning APIs`,
      requirements: [
        "Write a prompt asking Claude to compress the company data above",
        "Your prompt should result in under 200 words total",
        "Must include all 5 companies with their key data (year, employees, revenue, product)",
        "Efficient formatting allowed (tables, bullets, abbreviations)",
        "Bonus: Get under 150 words while keeping all essential info",
        "",
        "📤 SUBMIT: Paste Claude's compressed output (not your prompt) below"
      ],
      why: "💡 Why This Matters: Context limits are real constraints. Claude charges $3 per million input tokens. Inefficient prompts = 10x higher costs at scale + hitting context limits breaks applications.",
      goal: "Learn strategic compression - identifying what's ESSENTIAL vs. what's redundant. Critical for production systems."
    },
    criteria: [
      { id: 'wordcount', label: 'Under 200 words', auto: true },
      { id: 'companies', label: 'All 5 companies mentioned', auto: true },
      { id: 'years', label: 'All founding years included', auto: true },
      { id: 'complete', label: 'Revenue and employee data present', auto: true },
      { id: 'bonus', label: 'Bonus: Under 150 words', auto: true }
    ]
  },
  '1.4': {
    title: 'Few-Shot Learning',
    level: 1,
    instructions: {
      scenario: "You're building a product name generator for a tech startup incubator. Write a prompt that teaches Claude to generate creative product names through examples.",
      data: `Example Format (use these as your 5 examples):
1. AI-powered fitness tracker → "PulsePro" - Combines health (pulse) with professional
2. Cloud-based team chat → "SlackFlow" - Evokes smooth communication flow  
3. Photo editing app → "SnapEdit" - Quick action implied by "snap"
4. Recipe meal planner → "ChefMate" - Friendly helper connotation
5. Budget tracking tool → "CoinTrack" - Direct but catchy`,
      requirements: [
        "Include 5 high-quality examples showing: description → name → brief rationale",
        "Examples should demonstrate variety (different industries, name styles)",
        "Ask Claude to generate 10 NEW product names following the pattern",
        "",
        "📤 SUBMIT: Paste Claude's 10 generated names (not your prompt) below",
        "Names must be: memorable, 1-2 words, creative (not generic)"
      ],
      goal: "Master few-shot prompting - teaching AI through examples rather than explicit rules. Often more effective than lengthy instructions."
    },
    criteria: [
      { id: 'examples', label: '5 clear examples provided', auto: true },
      { id: 'structure', label: 'Examples show consistent structure', auto: true },
      { id: 'variety', label: 'Examples cover different types', auto: true },
      { id: 'names', label: 'Generated 10+ product names', auto: true },
      { id: 'format', label: 'Names are 1-2 words each', auto: true }
    ]
  },
  '1.5': {
    title: 'Chain-of-Thought Reasoning',
    level: 1,
    instructions: {
      scenario: "Write a prompt that makes Claude solve complex math word problems accurately by forcing step-by-step reasoning.",
      data: `Test Problem:
A store sells apples for $2 each. They offer 20% off for purchases of 10+ apples, plus an additional $5 off the total if you spend over $50. How much do 30 apples cost?

Correct Answer: $43
(30 apples × $2 = $60, minus 20% = $48, minus $5 additional = $43)`,
      requirements: [
        "Instruct Claude to show all reasoning steps explicitly",
        "Require Claude to identify key information first",
        "Demand intermediate calculations be shown (using =, ×, or math)",
        "Specify final answer format: 'FINAL ANSWER: $[number]'",
        "Test your prompt on the problem above",
        "",
        "📤 SUBMIT: Paste Claude's solution (not your prompt) below"
      ],
      goal: "Learn Chain-of-Thought prompting - forcing explicit reasoning dramatically improves accuracy on complex tasks."
    },
    criteria: [
      { id: 'steps', label: 'Shows clear reasoning steps', auto: true },
      { id: 'identifies', label: 'Identifies key information first', auto: true },
      { id: 'intermediate', label: 'Shows intermediate calculations', auto: true },
      { id: 'format', label: 'Uses FINAL ANSWER format', auto: true },
      { id: 'correct', label: 'Gets correct answer ($43)', auto: true }
    ]
  },
  '1.6': {
    title: 'Role Assignment',
    level: 1,
    instructions: {
      scenario: "You want advice on starting a YouTube channel for your small business. Instead of asking Claude generic questions, assign it a specific expert role to get much better advice.",
      example: "Compare: 'How do I start a YouTube channel?' (generic) vs 'You are a YouTube growth strategist who has helped 50+ small businesses grow from 0 to 10,000 subscribers. I'm starting a channel for my bakery. What equipment do I need, what should my first 10 videos be about, and how do I get my first 1,000 subscribers?' (specific expert)",
      xmlContext: `💡 HOW TO BUILD YOUR PROMPT:

Step 1: Assign the expert role
"You are a YouTube growth strategist who..."

Step 2: Add credentials
"...has helped 50+ small businesses grow from 0 to 10,000 subscribers."

Step 3: Set the context
"I'm starting a channel for my [bakery/gym/consulting firm/etc.]."

Step 4: Ask your questions
"What equipment do I need?"
"What should my first 10 videos be about?"
"How do I get my first 1,000 subscribers?"

Put it all together in one prompt! The more specific your expert, the better the advice.`,
      requirements: [
        "Assign a specific expert role (e.g., 'You are a YouTube growth strategist who...')",
        "Give the expert credentials (years of experience, specific achievements, specialization)",
        "Ask for advice on: equipment needs, content ideas, and growth strategy",
        "Make it specific to YOUR situation (pick any small business type: bakery, gym, consulting, etc.)",
        "",
        "📤 SUBMIT: Paste Claude's YouTube advice (not your prompt) below"
      ],
      goal: "Learn that assigning Claude a specific expert role produces WAY better advice than generic questions. This is one of the most powerful prompting techniques."
    },
    criteria: [
      { id: 'role', label: 'Assigns specific expert role (not just "expert")', auto: true },
      { id: 'credentials', label: 'Gives expert credentials/achievements', auto: true },
      { id: 'equipment', label: 'Asks about equipment', auto: true },
      { id: 'content', label: 'Asks about content ideas', auto: true },
      { id: 'growth', label: 'Asks about growth strategy', auto: true }
    ]
  },
  '1.7': {
    title: 'Structured Data (JSON)',
    level: 1,
    instructions: {
      scenario: "You're making a simple product catalog for your website. You need the product data in a format that your website's code can read (called JSON). Make Claude output ONLY the data - no extra explanation text.",
      xmlContext: `📘 WHAT IS JSON?

JSON (JavaScript Object Notation) is a way to organize data that computers can easily read. Think of it like a structured form with labeled fields.

Everyday example: A contact card
- Name: "John Smith"
- Phone: "555-1234"
- Email: "john@email.com"

Same information in JSON:
{
  "name": "John Smith",
  "phone": "555-1234",
  "email": "john@email.com"
}

Key JSON rules:
• Curly braces { } wrap everything
• Each piece of data has a "label": value format
• Text goes in "quotes"
• Numbers don't use quotes
• Commas separate items
• true/false are special (no quotes)

Why it matters: JSON is how websites, apps, and automation tools share data. When you see "API" or "data integration," it's usually JSON behind the scenes.

You don't need to memorize this - just know that JSON is structured data computers can understand!`,
      data: `Sample Products to Use:

Product 1:
- Name: Wireless Bluetooth Headphones
- Price: 79.99
- Category: Electronics
- In Stock: Yes

Product 2:
- Name: Organic Cotton T-Shirt
- Price: 24.50
- Category: Clothing
- In Stock: Yes

Product 3:
- Name: Stainless Steel Water Bottle
- Price: 18.99
- Category: Home & Kitchen
- In Stock: No

Feel free to use these or make up your own!`,
      example: `What you want:
{
  "products": [
    {"id": 1, "name": "Blue T-Shirt", "price": 19.99, "in_stock": true, "category": "Clothing"}
  ]
}

What you DON'T want:
"Here's your product data:
{
  "products": [...]
}
Hope this helps!"`,
      requirements: [
        "Tell Claude to output ONLY JSON (no explanation before or after)",
        "Specify the exact fields you need: id (number), name (text), price (number), in_stock (yes/no), category (text)",
        "Use the 3 sample products provided above (or create your own)",
        "The output should start with { and end with } - nothing else",
        "",
        "💡 TIP: Say 'Output ONLY valid JSON with no additional text' in your prompt",
        "",
        "⚠️ COMMON ISSUE: If Claude wraps JSON in ```json...``` markdown fences, just remove those lines and paste only the {...} part",
        "",
        "📤 SUBMIT: Paste Claude's JSON output (not your prompt) below"
      ],
      goal: "Learn to get structured data from Claude that other programs can use. JSON is how computers share data - you'll use this constantly for automation."
    },
    criteria: [
      { id: 'onlyjson', label: 'Output is ONLY JSON (no explanation text)', auto: true },
      { id: 'valid', label: 'Looks like valid JSON (has {}, quotes)', auto: true },
      { id: 'fields', label: 'Has all required fields (id, name, price, in_stock, category)', auto: true },
      { id: 'three', label: 'Has 3 products', auto: true },
      { id: 'numbers', label: 'Numbers are not in quotes', auto: true }
    ]
  },

  // LEVEL 2: COMPOUND WORKFLOWS
  '2.1': {
    title: 'Sequential Chains',
    level: 2,
    instructions: {
      scenario: "A mid-size retail company (RetailCo) wants to expand into e-commerce. Create a prompt that guides Claude through this 5-step analysis where each step must build on the previous:",
      data: `Company Context:
- RetailCo: 50 physical stores, $120M annual revenue
- Currently: 100% in-store sales, no online presence
- Target: Launch e-commerce within 12 months
- Challenge: Limited tech team, traditional customer base`,
      requirements: [
        "Step 1: Market Research → Analyze current e-commerce landscape",
        "Step 2: Competitor Analysis → Using market insights, identify key competitors",
        "Step 3: Gap Analysis → Based on competitor findings, identify opportunities",
        "Step 4: Strategic Recommendation → Using gaps, recommend specific approach",
        "Step 5: Implementation Plan → Create 90-day action plan based on strategy",
        "",
        "📤 SUBMIT: Paste Claude's 5-step analysis (not your prompt) below"
      ],
      goal: "Master multi-step reasoning chains. Each step must genuinely depend on the previous - test by removing step 3!"
    },
    criteria: [
      { id: 'references', label: 'Each step references previous findings', auto: true },
      { id: 'complete', label: 'All 5 steps present', auto: true },
      { id: 'specific', label: 'Has dates/names/metrics', auto: true },
      { id: 'dependent', label: 'Steps show clear dependencies', auto: true }
    ]
  },
  '2.2': {
    title: 'Feedback Loops',
    level: 2,
    instructions: {
      scenario: "Create a prompt that generates a blog post, checks it against quality criteria, and iterates until all criteria pass - maximum 3 iterations.",
      data: `Quality Criteria Your Prompt Must Check:
1. Word count: 300-350 words
2. Has clear introduction and conclusion
3. Includes at least 2 specific examples
4. Professional tone (no casual language)
5. Has actionable takeaway for reader`,
      requirements: [
        "Define the 5 quality criteria above in your prompt",
        "Instruct Claude to verify each criterion after generation",
        "Give permission to iterate ('keep trying until', 'retry if fails')",
        "Limit to maximum 3 iterations",
        "Test on topic: 'Benefits of remote work'",
        "",
        "📤 SUBMIT: Paste Claude's final blog post (not your prompt) below"
      ],
      goal: "Build feedback loops into prompts. The formula: clear success criteria + verification method + permission to iterate."
    },
    criteria: [
      { id: 'criteria', label: 'Lists 5 quality criteria', auto: true },
      { id: 'verify', label: 'Instructions to verify each criterion', auto: true },
      { id: 'iterate', label: 'Permission to iterate/retry', auto: true },
      { id: 'limit', label: 'Mentions 3-iteration limit', auto: true },
      { id: 'quality', label: 'Final output meets all 5 criteria', auto: true }
    ]
  },
  '2.3': {
    title: 'Error Recovery',
    level: 2,
    instructions: {
      scenario: "Create a prompt that generates a professional product comparison article, then automatically checks for errors and fixes them - no human intervention needed.",
      data: `Sample Product Category to Compare:

Task Management Tools:
1. Asana - $10.99/user/month, timeline view, custom fields, automation
2. Trello - $5/user/month, kanban boards, power-ups, calendar view
3. Monday.com - $8/user/month, customizable workflows, time tracking, visual boards

Feel free to use these or pick your own category (email tools, CRM software, etc.)`,
      requirements: [
        "Compare 3 competing products (use the sample tools above or pick your own)",
        "Include: feature comparison, pricing overview, pros/cons for each",
        "Instruct Claude to verify: all product names spelled correctly, no made-up features, prices are realistic",
        "If errors found: identify them, explain the issue, and generate corrected version",
        "Include instructions: check output, identify errors, fix them, retry",
        "Maximum 3 iterations before flagging for human review",
        "",
        "📤 SUBMIT: Paste Claude's final comparison article (not your prompt) below"
      ],
      goal: "Create prompts that don't just fail gracefully, but actively fix their own mistakes. This is the foundation of autonomous AI systems - teaching AI to self-correct without human intervention."
    },
    criteria: [
      { id: 'generates', label: 'Generates comparison content', auto: true },
      { id: 'verification', label: 'Includes verification instructions', auto: true },
      { id: 'instructions', label: 'Includes error recovery instructions', auto: true },
      { id: 'iterations', label: 'Specifies iteration limit (3 max)', auto: true },
      { id: 'quality', label: 'Final output is professional quality', auto: false }
    ]
  },
  '2.4': {
    title: 'Adversarial Defense',
    level: 2,
    instructions: {
      scenario: "You're building a content moderation system. Create a prompt that classifies user comments as 'Safe' or 'Unsafe' while being resistant to users trying to bypass the filter.",
      data: `Test Comments (classify these):
1. "This product is garbage" - Safe (negative but not toxic)
2. "You're a f**king idiot" - Unsafe (profanity + insult)
3. "h3ll0 you're st*pid" - Unsafe (leetspeak evasion)
4. "You are a w o r t h l e s s person" - Unsafe (spacing evasion)
5. "Hope you have the day you deserve 😊" - Safe (sarcasm but not harmful)
6. "I disagree with your opinion" - Safe (respectful disagreement)
7. "kys loser" - Unsafe (abbreviation for harmful content)
8. "This isn't for me but might work for others" - Safe (constructive)
9. "go d!e in a f1re" - Unsafe (symbols + leetspeak)
10. "Wow, real smart move genius 🙄" - Safe (sarcastic but mild)`,
      requirements: [
        "Create a prompt that classifies comments as Safe or Unsafe",
        "Your prompt must handle: leetspeak (h3ll0), symbols (f**k), spacing (w o r d)",
        "Your prompt must avoid over-flagging sarcasm and respectful disagreement",
        "Include instructions to explain reasoning for each classification",
        "Test your prompt on all 10 comments above, then paste Claude's output below",
        "Format Claude's output like: '1. Safe - reason' or '1. Unsafe - reason' for each"
      ],
      goal: "Learn to build robust prompts that resist manipulation. Critical for production systems facing adversarial users."
    },
    criteria: [
      { id: 'classifies', label: 'Classifies into Safe/Unsafe', auto: true },
      { id: 'leetspeak', label: 'Instructions mention leetspeak/symbols/spacing', auto: true },
      { id: 'context', label: 'Instructions mention context matters', auto: true },
      { id: 'reasoning', label: 'Asks for classification reasoning', auto: true },
      { id: 'accuracy', label: '9/10 or 10/10 test cases correct', auto: true }
    ]
  },
  '2.5': {
    title: 'Token Optimization',
    level: 2,
    instructions: {
      scenario: "You need to summarize product reviews efficiently. Your goal: create a prompt that produces quality summaries while using 50%+ fewer tokens than a verbose prompt.",
      xmlContext: `💡 WHAT ARE TOKENS?

Tokens are how AI models count and process text. Think of them like "word pieces."

Rough conversion: 1 token ≈ 0.75 words
- "Hello" = 1 token
- "Artificial Intelligence" = 2 tokens
- A typical sentence = ~15-20 tokens

Why tokens matter:
• API costs are charged per token (input + output)
• Fewer tokens = faster responses
• Context window has token limits (you want room for responses!)
• Efficient prompts cost less and run faster

Example:
❌ Verbose: "I would like you to please provide me with a comprehensive summary..." (13 tokens)
✅ Optimized: "Summarize comprehensively:" (3 tokens)

Same meaning, 77% fewer tokens!`,
      data: `Sample Review to Summarize:
"I've been using the UltraClean Robot Vacuum for three months now and I'm genuinely impressed. The setup was incredibly easy - just downloaded the app, connected to WiFi, and it was ready to go within 5 minutes. The suction power is remarkable; it picks up everything from fine dust to larger debris like cereal pieces. I have two dogs and the vacuum handles pet hair exceptionally well. The battery life is solid - it runs for about 90 minutes before needing to recharge, which is plenty for my 1,500 sq ft apartment. The app integration is smooth and I love being able to schedule cleanings remotely. My only minor complaint is that it occasionally gets stuck under my couch, but that's more a furniture issue than a product issue. The price point of $399 felt steep initially, but after three months of use, I'd say it's worth every penny. It's cut my cleaning time in half and my floors have never looked better. Would definitely recommend to anyone considering a robot vacuum."`,
      requirements: [
        "Create Version 1: A comprehensive summarization prompt (don't optimize yet)",
        "Create Version 2: An optimized prompt achieving same quality with 50%+ fewer tokens",
        "Paste BOTH prompts in the output box, clearly labeled 'VERSION 1:' and 'VERSION 2:'",
        "Include brief explanation of what you optimized (removed redundancy, condensed instructions, etc.)",
        "Test both on the sample review - verify summaries capture key points",
        "",
        "📤 SUBMIT: Paste BOTH prompt versions with explanation (not Claude's summaries) below"
      ],
      goal: "Master token efficiency - critical for API costs and context window management. Learn what's truly necessary vs. redundant."
    },
    criteria: [
      { id: 'version1', label: 'Version 1 exists and labeled', auto: true },
      { id: 'version2', label: 'Version 2 exists and labeled', auto: true },
      { id: 'reduction', label: '50%+ token reduction achieved', auto: true },
      { id: 'explanation', label: 'Includes optimization explanation', auto: true },
      { id: 'complete', label: 'Both versions are complete prompts', auto: true }
    ]
  },

  // LEVEL 3: REAL-WORLD APPLICATIONS
  '3.1': {
    title: 'Content Pipeline',
    level: 3,
    instructions: {
      scenario: "Build a complete content production system that takes a topic and produces publication-ready blog posts at scale.",
      requirements: [
        "Step 1: Research topic using web search (10+ sources)",
        "Step 2: Generate SEO-optimized outline with clear sections",
        "Step 3: Produce 1500+ word draft",
        "Step 4: Self-edit for clarity, grammar, and flow",
        "Step 5: Optimize for target keyword (5-7 natural mentions)",
        "Step 6: Final polish - output should need only minor editor tweaks",
        "",
        "📤 SUBMIT: Paste Claude's final blog post (not your prompt) below"
      ],
      portfolio: "Demonstrates you can reduce content production time by 70%+ while maintaining quality. Directly applicable to marketing, journalism, and content strategy roles.",
      goal: "Show you can automate professional content creation end-to-end."
    },
    criteria: [
      { id: 'research', label: 'Uses web search for research', auto: false },
      { id: 'outline', label: 'SEO-optimized outline', auto: true },
      { id: 'length', label: '1500+ words', auto: true },
      { id: 'structure', label: 'Has introduction and conclusion', auto: true },
      { id: 'seo', label: 'Mentions topic keyword 5-7 times', auto: true },
      { id: 'actionable', label: 'Includes actionable advice', auto: true }
    ]
  },
  '3.2': {
    title: 'Data Analysis',
    level: 3,
    instructions: {
      scenario: "Build a system that transforms raw CSV data into actionable business insights with visualizations and recommendations.",
      requirements: [
        "Ingest and validate CSV data",
        "Handle missing values and malformed data appropriately",
        "Identify key trends, patterns, and outliers",
        "Create 3+ relevant visualizations (charts/graphs)",
        "Generate executive summary with specific, actionable recommendations",
        "Entire process must be reproducible on new data",
        "",
        "📤 SUBMIT: Paste Claude's analysis code and summary (not your prompt) below"
      ],
      portfolio: "Shows you can automate analyst work. Valuable for business intelligence, operations, and strategy roles.",
      goal: "Demonstrate you can turn data into decisions automatically."
    },
    criteria: [
      { id: 'handles', label: 'Handles missing/bad data', auto: false },
      { id: 'trends', label: 'Identifies trends and outliers', auto: false },
      { id: 'viz', label: 'Creates 3+ visualizations', auto: false },
      { id: 'summary', label: 'Executive summary with recommendations', auto: true },
      { id: 'reproducible', label: 'Process is reproducible', auto: false }
    ]
  },
  '3.3': {
    title: 'Customer Support Triage System',
    level: 3,
    instructions: {
      scenario: "Build a system that reads customer support emails and automatically: (1) categorizes them, (2) determines urgency, (3) drafts an initial response, and (4) decides if a human should handle it.",
      example: `Input email: "I can't log into my account. I've tried resetting my password 3 times but the email never arrives. This is urgent - I have a client presentation in 2 hours!"

Your system should output:
- Category: Account Access
- Urgency: High (deadline mentioned)
- Response: [Helpful troubleshooting steps]
- Escalate: Yes (time-sensitive, multiple attempts failed)`,
      requirements: [
        "Categorize into: Billing, Account Access, Bug Report, Feature Request, How-To Question",
        "Determine urgency: Low, Medium, High, Critical (based on keywords, deadlines, business impact)",
        "Generate a helpful initial response (2-3 paragraphs, professional, actionable)",
        "Decide whether to escalate to human (escalate if: angry customer, mentions canceling, complex technical issue, VIP customer)",
        "Test your system with 5 different example support emails (you create the examples)",
        "Show all 5 results: category, urgency, response, escalation decision",
        "",
        "📤 SUBMIT: Paste your system's output for all 5 test emails (not your prompt) below"
      ],
      portfolio: "Shows you can automate support ticket triage - companies pay $50k-100k/year for this capability. Reduces support team workload by 40%+.",
      goal: "Demonstrate you can build practical automation that handles real business workflows with multiple decision points."
    },
    criteria: [
      { id: 'categorizes', label: 'Categorizes all 5 emails correctly', auto: false },
      { id: 'urgency', label: 'Assigns appropriate urgency levels', auto: false },
      { id: 'responses', label: 'Generates helpful responses', auto: true },
      { id: 'escalation', label: 'Escalation logic makes sense', auto: false },
      { id: 'professional', label: 'Responses are professional and empathetic', auto: true }
    ]
  },
  '3.4': {
    title: 'AI-Powered Code Generation',
    level: 3,
    instructions: {
      scenario: "You've built prompting skills - now use them to generate working code WITHOUT learning to code yourself. Write a prompt that makes Claude create a complete, tested solution from a simple specification.",
      codeContext: `💡 Why This Matters (Even for Non-Coders):

You don't need to WRITE code to USE code. Many workflows need automation:
- Analyze 1000 survey responses → Need a script
- Process weekly sales data → Need automation
- Scrape competitor prices → Need a tool

Instead of hiring a developer or learning Python, you can:
1. Describe what you need in plain English
2. Have Claude write the code
3. Run it and get results

This mission teaches you to be a "prompt-powered developer" - you specify, Claude codes.`,
      requirements: [
        "Pick a real problem you have (data analysis, file processing, web scraping, etc.)",
        "Write a specification in plain English: what should it do? what inputs? what outputs?",
        "Prompt Claude to generate: working code, instructions to run it, example usage",
        "Test: Can you use Claude's code to solve your problem? (You don't need to understand the code)",
        "Bonus: Ask Claude to add error handling and user-friendly messages",
        "",
        "📤 SUBMIT: Paste Claude's code solution with instructions (not your prompt) below"
      ],
      portfolio: "Shows you can solve technical problems without technical skills. Valuable for operations, analysis, and automation roles where you need results, not coding ability.",
      goal: "Master using AI as your personal developer. You provide business logic, Claude provides technical implementation. This is the future of work - domain expertise + AI coding."
    },
    criteria: [
      { id: 'specification', label: 'Clear problem specification included', auto: true },
      { id: 'functional', label: 'Code appears functional (has imports, functions, logic)', auto: true },
      { id: 'instructions', label: 'Includes how-to-run instructions', auto: true },
      { id: 'example', label: 'Includes example usage', auto: true },
      { id: 'practical', label: 'Solves a real problem (not toy example)', auto: false }
    ]
  },

  // LEVEL 4: IMPRESSIVE CAPSTONES
  '4.1': {
    title: 'Multi-Agent System',
    level: 4,
    instructions: {
      scenario: "Design a system with 3+ specialized AI 'agents' that coordinate to solve complex problems that no single prompt could handle.",
      example: "Example: Researcher Agent → Analyst Agent → Writer Agent → Editor Agent",
      requirements: [
        "Define 3+ agents with distinct, specialized roles",
        "Each agent has specific capabilities and focus area",
        "Agents pass work between each other intelligently",
        "Coordination logic is clear and well-documented",
        "System solves problems no single agent could handle alone",
        "System is reliable and reproducible",
        "",
        "📤 SUBMIT: Paste your multi-agent system design and demo (not your prompt) below"
      ],
      portfolio: "Multi-agent systems are cutting-edge. This shows you understand advanced AI architectures. Few prompt engineers can do this.",
      goal: "Demonstrate mastery of complex AI system design."
    },
    criteria: [
      { id: 'specialized', label: 'Each agent has specialized role', auto: false },
      { id: 'coordination', label: 'Agents coordinate intelligently', auto: false },
      { id: 'complex', label: 'Solves problems no single agent could', auto: false },
      { id: 'documented', label: 'Coordination logic documented', auto: true },
      { id: 'reliable', label: 'System is reliable and reproducible', auto: false }
    ]
  },
  '4.2': {
    title: 'Domain Expertise',
    level: 4,
    instructions: {
      scenario: "Choose a domain (legal, medical, finance, or technical) and build a comprehensive suite of specialized tools that outperform generic approaches.",
      requirements: [
        "Demonstrate deep domain knowledge (validated by domain expert)",
        "Use correct domain-specific terminology and conventions",
        "Handle domain-specific edge cases and complexities",
        "Measurably better than baseline/generic prompts (quantify improvement)",
        "Outputs are professional-grade (domain expert would approve)",
        "System could be deployed in real professional setting",
        "",
        "📤 SUBMIT: Paste your domain-specialized system and results (not your prompt) below"
      ],
      portfolio: "Shows you can become an expert in complex domains. Companies pay premium rates for legal AI, medical AI, fintech AI specialists.",
      goal: "Position yourself as a domain-specialized prompt engineer."
    },
    criteria: [
      { id: 'knowledge', label: 'Deep domain knowledge (expert validated)', auto: false },
      { id: 'terminology', label: 'Correct domain terminology', auto: true },
      { id: 'edgecases', label: 'Handles domain edge cases', auto: false },
      { id: 'better', label: 'Measurably better than generic', auto: false },
      { id: 'deployable', label: 'Could deploy in professional setting', auto: false }
    ]
  },
  '4.3': {
    title: 'Innovation Project',
    level: 4,
    instructions: {
      scenario: "Create something genuinely novel that advances the field of prompt engineering.",
      examples: [
        "A new prompting pattern that improves accuracy by 25%+",
        "A framework for systematically testing prompt reliability",
        "A tool that automates prompt optimization",
        "A methodology for debugging complex prompt failures",
        "A technique for reducing hallucinations in specific domains"
      ],
      requirements: [
        "Original work (not just combining existing techniques)",
        "Solves a real problem that doesn't have a good solution",
        "Thoroughly documented (others can understand and use it)",
        "Measurably better than existing alternatives (include comparison data)",
        "Validated with real testing (not just theoretical)",
        "Ready to share publicly (GitHub repo, blog post, or paper)",
        "",
        "📤 SUBMIT: Paste your innovation documentation and results (not your prompt) below"
      ],
      portfolio: "This positions you as a thought leader. Companies want people who push the field forward.",
      goal: "Create your signature 'wow' piece that makes you memorable."
    },
    criteria: [
      { id: 'original', label: 'Original work (not just combining)', auto: false },
      { id: 'documented', label: 'Thoroughly documented', auto: true },
      { id: 'better', label: 'Measurably better than alternatives', auto: false },
      { id: 'validated', label: 'Validated with real testing', auto: false },
      { id: 'shareable', label: 'Ready to share (GitHub/blog/paper)', auto: false }
    ]
  }
};

const runAutoChecks = (missionId, text) => {
  const results = {};
  const words = text.trim().split(/\s+/).length;
  
  if (missionId === '1.1') {
    results.wordcount = words === 150;
    
    // Feature detection - must mention all 3
    const hasFeature1 = /(?:ai|artificial intelligence).*?(?:priorit|task)|(?:priorit|task).*?(?:ai|artificial intelligence)/i.test(text);
    const hasFeature2 = /(?:team|collaborat).*?dashboard|dashboard.*?(?:team|collaborat)/i.test(text);
    const hasFeature3 = /automat.*?report|report.*?automat/i.test(text);
    results.features = hasFeature1 && hasFeature2 && hasFeature3;
    
    // Check it's written in sentences, not bullets
    const isBulletList = (text.match(/^[-•*]\s/gm) || []).length >= 3;
    const hasMultipleSentences = text.split(/[.!?]/).filter(s => s.trim().length > 10).length >= 3;
    results.sentences = !isBulletList && hasMultipleSentences;
    
    // CTA check - must be in last 100 chars
    const lastSection = text.slice(-100);
    const ctaWords = ['start', 'try', 'join', 'get started', 'sign up', 'learn more', 'discover', 'explore', 'begin', 'today'];
    results.cta = ctaWords.some(word => lastSection.toLowerCase().includes(word));
    
    // No pricing/specs
    const specsWords = ['$', 'price', 'pricing', 'cost', 'api', 'system requirements', 'technical specs'];
    results.nospecs = !specsWords.some(word => text.toLowerCase().includes(word));
  }
  
  if (missionId === '1.2') {
    const requiredTags = ['analysis', 'risks', 'opportunities', 'recommendation'];
    results.tags = requiredTags.every(tag => 
      text.includes(`<${tag}>`) && text.includes(`</${tag}>`)
    );
    
    const beforeFirst = text.split('<analysis>')[0]?.trim() || '';
    const afterLast = text.split('</recommendation>')[1]?.trim() || '';
    results.nocontent = beforeFirst.length === 0 && afterLast.length === 0;
    
    const mitigationWords = ['mitigate', 'mitigation', 'address', 'counter'];
    results.mitigation = mitigationWords.some(w => text.toLowerCase().includes(w));
    
    const strategyWords = ['strategy', 'leverage', 'capitalize', 'exploit'];
    results.exploitation = strategyWords.some(w => text.toLowerCase().includes(w));
    
    results.actionable = /\d/.test(text) || /\b(yes|no|proceed|recommend)\b/i.test(text);
  }
  
  if (missionId === '1.3') {
    const lowerText = text.toLowerCase();
    
    results.wordcount = words < 200;
    results.bonus = words < 150;
    
    // Check if all 5 companies are mentioned
    const companies = ['techcorp', 'dataflow', 'cloudnine', 'securenet', 'ailabs'];
    const companiesFound = companies.filter(c => lowerText.includes(c)).length;
    results.companies = companiesFound === 5;
    
    // Check if all founding years are included (2010, 2013, 2015, 2016, 2018)
    const years = ['2010', '2013', '2015', '2016', '2018'];
    const yearsFound = years.filter(y => text.includes(y)).length;
    results.years = yearsFound === 5;
    
    // Check for revenue/employee indicators ($, M, employees, revenue)
    const hasRevenue = text.includes('$') || lowerText.includes('revenue') || lowerText.includes('m');
    const hasEmployees = lowerText.includes('employee') || lowerText.includes('emp') || /\d+\s*(?:employees|staff|people)/.test(lowerText);
    results.complete = hasRevenue && hasEmployees;
  }
  
  if (missionId === '1.4') {
    // Check for examples (looking for pattern like "Example 1:" or "1." or "Example:")
    const examplePatterns = [
      (text.match(/example\s+\d+:/gi) || []).length,
      (text.match(/^\d+\./gm) || []).length,
      (text.match(/example:/gi) || []).length
    ];
    const exampleCount = Math.max(...examplePatterns);
    results.examples = exampleCount >= 5;
    
    // Check for consistent structure (arrow, dash, or colon patterns)
    const hasArrows = (text.match(/→|->|-->/g) || []).length >= 5;
    const hasColons = (text.match(/:/g) || []).length >= 10;
    const hasDashes = (text.match(/\s-\s/g) || []).length >= 5;
    results.structure = hasArrows || hasColons || hasDashes;
    
    // Check for variety indicators (different words suggesting different industries/types)
    const varietyWords = ['tech', 'food', 'health', 'finance', 'fitness', 'education', 'retail', 'b2b', 'saas', 'app'];
    const varietyFound = varietyWords.filter(w => text.toLowerCase().includes(w)).length;
    results.variety = varietyFound >= 3;
    
    // Check for generated names (looking for capitalized words that could be product names)
    const nameMatches = text.match(/\b[A-Z][a-z]+(?:\s[A-Z][a-z]+)?\b/g) || [];
    results.names = nameMatches.length >= 10;
    
    // Check for 1-2 word names
    const shortNames = nameMatches.filter(name => name.split(/\s+/).length <= 2);
    results.format = shortNames.length >= 10;
  }
  
  if (missionId === '1.5') {
    // Check for step-by-step indicators
    const stepWords = ['step', 'first', 'next', 'then', 'finally', 'therefore'];
    const hasSteps = stepWords.filter(w => text.toLowerCase().includes(w)).length >= 3;
    results.steps = hasSteps;
    
    // Check for identification of key info
    const identifyWords = ['given', 'we know', 'information', 'key facts', 'the problem'];
    results.identifies = identifyWords.some(w => text.toLowerCase().includes(w));
    
    // Check for intermediate calculations
    const hasCalculations = text.includes('=') || text.includes('×') || text.includes('*') || /\d+\s*[\+\-\*\/]\s*\d+/.test(text);
    results.intermediate = hasCalculations;
    
    // Check for FINAL ANSWER format
    results.format = /FINAL ANSWER:/i.test(text);
    
    // Check if answer is correct ($43)
    const finalAnswerMatch = text.match(/FINAL ANSWER:\s*\$?(\d+)/i);
    const hasFortyThree = /\$43\b|43\s*dollars|\bforty[- ]three/i.test(text);
    results.correct = (finalAnswerMatch && finalAnswerMatch[1] === '43') || hasFortyThree;
  }
  
  if (missionId === '1.6') {
    // Check for proper role assignment (not just "you are" but actual role with context)
    const rolePattern = /you are (?:a|an) [\w\s]{10,}(?:with|who has|having)/i;
    const simpleRole = /you are (?:a|an) [\w\s]+/i.test(text);
    results.role = rolePattern.test(text) || (simpleRole && text.toLowerCase().includes('experience'));
    
    // Check for expertise details - must have years AND specific achievements/specializations
    const hasYearsExperience = /\d+\s*(?:years?|yrs?)(?:\s+of)?\s+experience/i.test(text);
    const hasSpecialization = /speciali[zs]ed?|expert|produced|launched|worked on/i.test(text);
    results.details = hasYearsExperience && hasSpecialization;
    
    // Check for all 4 topics - more specific patterns
    const hasEquipment = /equipment|microphone|mic\b|audio interface|recorder|preamp/i.test(text);
    const hasSetup = /(?:recording )?(?:setup|space|studio|room|acoustic|environment)/i.test(text);
    const hasWorkflow = /(?:edit|post[-\s]?production|workflow|daw|software|process)/i.test(text);
    const hasDistribution = /(?:distribut|publish|platform|rss|host|spotify|apple|podcast host)/i.test(text);
    results.topics = hasEquipment && hasSetup && hasWorkflow && hasDistribution;
    
    // Check for request for specific/detailed advice
    const specificWords = ['specific', 'detailed', 'exact', 'concrete', 'actionable', 'step-by-step', 'comprehensive'];
    results.specific = specificWords.some(w => text.toLowerCase().includes(w));
    
    // Check for industry terminology - should mention at least 2 technical terms
    const podcastTerms = ['daw', 'audio interface', 'condenser', 'dynamic', 'rss', 'hosting', 'post-production', 'xlr', 'preamp', 'gain'];
    const termsFound = podcastTerms.filter(term => text.toLowerCase().includes(term)).length;
    results.terminology = termsFound >= 2;
  }
  
  if (missionId === '1.7') {
    // Check for JSON schema specification
    results.schema = text.includes('product_id') && text.includes('in_stock') && text.includes('tags');
    
    // Check if output looks like valid JSON
    const jsonPattern = /\{[\s\S]*"product_id"[\s\S]*\}/;
    results.valid = jsonPattern.test(text);
    
    // Check for no extra text (common mistakes: markdown backticks, explanatory text)
    const hasMarkdown = text.includes('```');
    const trimmed = text.trim();
    const startsWithBrace = trimmed.startsWith('{') || trimmed.startsWith('[');
    const endsWithBrace = trimmed.endsWith('}') || trimmed.endsWith(']');
    results.noextra = !hasMarkdown && startsWithBrace && endsWithBrace;
    
    // Check for all required fields
    const hasAllFields = ['product_id', 'name', 'price', 'in_stock', 'tags'].every(field => 
      text.includes(`"${field}"`)
    );
    results.fields = hasAllFields;
    
    // Check for proper JSON syntax (braces, quotes, colons)
    const hasBraces = text.includes('{') && text.includes('}');
    const hasQuotes = (text.match(/"/g) || []).length >= 10;
    const hasColons = (text.match(/:/g) || []).length >= 5;
    results.structure = hasBraces && hasQuotes && hasColons;
  }
  
  // LEVEL 2: COMPOUND WORKFLOWS
  if (missionId === '2.1') {
    // Check for step references - looking for explicit cross-references
    const stepReferences = text.match(/(?:step \d+|from (?:the |our )?(?:previous|above|earlier)|based on (?:the |our |this )?(?:analysis|findings?|research|data)|using (?:the |our |this )?(?:insights?|information|data|results?))/gi) || [];
    results.references = stepReferences.length >= 3;
    
    // Check all 5 steps are present
    const stepMatches = text.match(/step\s*[1-5]/gi) || [];
    const uniqueSteps = new Set(stepMatches.map(s => s.match(/\d/)[0]));
    results.complete = uniqueSteps.size >= 5;
    
    // Check for dates and metrics
    const hasDatePattern = /\d{1,2}\/\d{1,2}\/\d{2,4}|\d{4}-\d{2}-\d{2}|january|february|march|april|may|june|july|august|september|october|november|december|\d+\s+(?:days?|weeks?|months?|quarters?)|q[1-4]\s+\d{4}|90[- ]day/i.test(text);
    const hasMetrics = /\d+%|\$\d+|\d+\s+percent|\d+[km]\b|\d+\s+stores?|\d+\s+months?/i.test(text);
    results.specific = hasDatePattern && hasMetrics;
    
    // Check for dependency words between steps
    const dependencyWords = text.match(/based on|according to|as (?:mentioned|shown|identified)|from (?:the|this)|building on|leveraging|using (?:the|these)/gi) || [];
    results.dependent = dependencyWords.length >= 3;
  }
  
  if (missionId === '2.2') {
    const criteriaWords = ['criteria', 'requirement', 'must', 'should', 'quality standard', 'check'];
    results.criteria = criteriaWords.some(w => text.toLowerCase().includes(w));
    
    const verifyWords = ['verify', 'check', 'ensure', 'validate', 'confirm', 'review'];
    results.verify = verifyWords.some(w => text.toLowerCase().includes(w));
    
    const iterateWords = ['iterate', 'retry', 'repeat', 'until', 'keep trying', 'try again', 'revision'];
    results.iterate = iterateWords.some(w => text.toLowerCase().includes(w));
    
    const limitWords = ['maximum 3', 'max 3', '3 iterations', 'three iterations', 'limit 3'];
    results.limit = limitWords.some(w => text.toLowerCase().includes(w));
    
    // Validate the 5 quality criteria
    const wordCount = text.trim().split(/\s+/).length;
    const hasWordCount = wordCount >= 300 && wordCount <= 350;
    
    const hasIntro = /introduction|intro|begin|start|first|opening/.test(text.toLowerCase());
    const hasConclusion = /conclusion|conclud|summary|finally|in closing|to sum up/.test(text.toLowerCase());
    
    const exampleMatches = text.match(/for example|for instance|such as|like when|consider|imagine/gi) || [];
    const hasExamples = exampleMatches.length >= 2;
    
    const casualWords = ['hey', 'gonna', 'kinda', 'stuff', 'yeah', 'cool'];
    const hasCasual = casualWords.some(w => text.toLowerCase().includes(w));
    const isProfessional = !hasCasual;
    
    const takeawayWords = ['takeaway', 'action', 'can', 'should', 'consider', 'try', 'implement', 'start'];
    const hasTakeaway = takeawayWords.some(w => text.toLowerCase().includes(w));
    
    results.quality = hasWordCount && (hasIntro || hasConclusion) && hasExamples && isProfessional && hasTakeaway;
  }
  
  if (missionId === '2.3') {
    // Check for comparison content
    const hasComparison = /compar|versus|vs\.|better|worse|difference/i.test(text);
    results.generates = hasComparison;
    
    // Check for verification instructions
    const verifyWords = ['verify', 'check', 'validate', 'ensure', 'confirm', 'review', 'accurate'];
    results.verification = verifyWords.filter(w => text.toLowerCase().includes(w)).length >= 2;
    
    // Check for error recovery instructions
    const errorWords = ['error', 'mistake', 'incorrect', 'fix', 'correct', 'revise', 'retry', 'iterate'];
    results.instructions = errorWords.filter(w => text.toLowerCase().includes(w)).length >= 2;
    
    // Check for iteration limit
    const hasIterationLimit = /maximum 3|max 3|3 iterations|three iterations|limit.*3/i.test(text);
    results.iterations = hasIterationLimit;
  }
  
  if (missionId === '2.4') {
    // Check for Safe/Unsafe classification
    const hasSafe = /\bsafe\b/i.test(text);
    const hasUnsafe = /\bunsafe\b/i.test(text);
    results.classifies = hasSafe && hasUnsafe;
    
    // Check for evasion technique mentions
    const evasionWords = ['leetspeak', 'leet speak', 'l33t', 'symbol', 'spacing', 'space', 'asterisk', 'misspell'];
    results.leetspeak = evasionWords.some(w => text.toLowerCase().includes(w));
    
    // Check for context awareness
    const contextWords = ['context', 'sarcasm', 'intent', 'tone', 'disagree', 'opinion'];
    results.context = contextWords.some(w => text.toLowerCase().includes(w));
    
    // Check for reasoning request
    const reasoningWords = ['explain', 'reason', 'why', 'because', 'rationale', 'justif'];
    results.reasoning = reasoningWords.some(w => text.toLowerCase().includes(w));
    
    // VALIDATE ACTUAL CLASSIFICATIONS
    // Correct answers: Safe, Unsafe, Unsafe, Unsafe, Safe, Safe, Unsafe, Safe, Unsafe, Safe
    const correctAnswers = [
      { num: 1, answer: 'safe' },
      { num: 2, answer: 'unsafe' },
      { num: 3, answer: 'unsafe' },
      { num: 4, answer: 'unsafe' },
      { num: 5, answer: 'safe' },
      { num: 6, answer: 'safe' },
      { num: 7, answer: 'unsafe' },
      { num: 8, answer: 'safe' },
      { num: 9, answer: 'unsafe' },
      { num: 10, answer: 'safe' }
    ];
    
    let correctCount = 0;
    const lowerText = text.toLowerCase();
    
    // Try to find classifications in the output
    for (const {num, answer} of correctAnswers) {
      // Look for patterns like "1. safe" or "Comment 1: Unsafe" or "1 - Safe"
      const patterns = [
        new RegExp(`${num}[.:\\-)]?\\s*(?:comment)?\\s*[-:]?\\s*(safe|unsafe)`, 'i'),
        new RegExp(`comment\\s*${num}[.:\\-)]?\\s*(safe|unsafe)`, 'i'),
        new RegExp(`${num}\\s*[-:]\\s*["']?[^"']*["']?\\s*[-:]?\\s*(safe|unsafe)`, 'i')
      ];
      
      for (const pattern of patterns) {
        const match = lowerText.match(pattern);
        if (match && match[1].toLowerCase() === answer) {
          correctCount++;
          break;
        }
      }
    }
    
    results.accuracy = correctCount >= 9; // 9 or 10 out of 10
  }
  
  if (missionId === '2.5') {
    // Check for both versions labeled
    const hasVersion1 = /version\s*1\s*:/i.test(text);
    const hasVersion2 = /version\s*2\s*:/i.test(text);
    
    results.version1 = hasVersion1;
    results.version2 = hasVersion2;
    
    // Try to extract and compare token counts between versions
    if (hasVersion1 && hasVersion2) {
      const version1Match = text.match(/version\s*1\s*:([\s\S]*?)(?=version\s*2\s*:|$)/i);
      const version2Match = text.match(/version\s*2\s*:([\s\S]*?)(?=explanation|optimization|what|$)/i);
      
      if (version1Match && version2Match) {
        const v1Text = version1Match[1].trim();
        const v2Text = version2Match[1].trim();
        
        // Rough token estimation: words * 1.3
        const v1Tokens = v1Text.split(/\s+/).length * 1.3;
        const v2Tokens = v2Text.split(/\s+/).length * 1.3;
        
        const reduction = ((v1Tokens - v2Tokens) / v1Tokens) * 100;
        results.reduction = reduction >= 50;
        
        // Check both are actual prompts (have instruction words)
        const instructionWords = ['summarize', 'analyze', 'review', 'provide', 'include', 'write', 'create'];
        const v1HasInstructions = instructionWords.some(w => v1Text.toLowerCase().includes(w));
        const v2HasInstructions = instructionWords.some(w => v2Text.toLowerCase().includes(w));
        results.complete = v1HasInstructions && v2HasInstructions;
      } else {
        results.reduction = false;
        results.complete = false;
      }
    } else {
      results.reduction = false;
      results.complete = false;
    }
    
    // Check for explanation/documentation
    const explainWords = ['removed', 'changed', 'optimized', 'shortened', 'eliminated', 'reduced', 'because', 'explanation', 'condensed'];
    results.explanation = explainWords.filter(w => text.toLowerCase().includes(w)).length >= 2;
  }
  
  // LEVEL 3: REAL-WORLD APPLICATIONS
  if (missionId === '3.1') {
    const hasHeadings = /^#{1,3}\s|\*\*.*\*\*/m.test(text) || /<h[1-3]>/i.test(text) || /\n[A-Z][^.!?\n]+\n/.test(text);
    results.outline = hasHeadings;
    
    const wordCount = text.trim().split(/\s+/).length;
    results.length = wordCount >= 1500;
    
    // Check for intro and conclusion
    const hasIntro = /introduction|intro|begin|start|first|opening|overview/i.test(text);
    const hasConclusion = /conclusion|conclud|summary|finally|in closing|to sum up|takeaway/i.test(text);
    results.structure = hasIntro && hasConclusion;
    
    // Count keyword mentions (we'll look for the most repeated significant word)
    const words = text.toLowerCase().split(/\s+/);
    const wordFreq = {};
    words.forEach(w => {
      if (w.length > 4) { // Only significant words
        wordFreq[w] = (wordFreq[w] || 0) + 1;
      }
    });
    const maxFreq = Math.max(...Object.values(wordFreq));
    results.seo = maxFreq >= 5 && maxFreq <= 15; // 5-7 is ideal, allow up to 15
    
    // Check for actionable advice
    const actionWords = ['should', 'can', 'try', 'consider', 'start', 'avoid', 'use', 'implement', 'tips', 'steps'];
    results.actionable = actionWords.filter(w => text.toLowerCase().includes(w)).length >= 3;
  }
  
  if (missionId === '3.2') {
    const summaryWords = ['summary', 'conclusion', 'recommend', 'key findings', 'insights', 'executive summary'];
    results.summary = summaryWords.some(w => text.toLowerCase().includes(w));
  }
  
  if (missionId === '3.3') {
    const toneIndicators = ['thank you', 'appreciate', 'happy to help', 'please', 'we understand', 'sincerely'];
    const casual = ['hey', 'gonna', 'stuff', 'yeah', 'cool'];
    const professional = toneIndicators.some(p => text.toLowerCase().includes(p));
    const notCasual = !casual.some(c => text.toLowerCase().includes(c));
    results.tone = professional && notCasual;
  }
  
  if (missionId === '3.4') {
    // Check for problem specification
    const specWords = ['problem', 'need', 'goal', 'requirement', 'should', 'task', 'automate'];
    results.specification = specWords.filter(w => text.toLowerCase().includes(w)).length >= 2;
    
    // Check for functional code patterns (imports, functions, basic structure)
    const codePatterns = /import |def |function |class |from |require\(|const |let |var /i;
    const hasCodeStructure = codePatterns.test(text);
    results.functional = hasCodeStructure;
    
    // Check for instructions
    const instructionWords = ['run', 'execute', 'install', 'usage', 'how to', 'step', 'first'];
    results.instructions = instructionWords.filter(w => text.toLowerCase().includes(w)).length >= 2;
    
    // Check for example usage
    const exampleWords = ['example', 'sample', 'usage', 'try', 'test with'];
    results.example = exampleWords.some(w => text.toLowerCase().includes(w));
    
    // Path-specific checks
    // Business path: Check for campaign elements
    const campaignWords = ['email', 'social', 'blog', 'campaign', 'strategy', 'audience'];
    const hasCampaignElements = campaignWords.filter(w => text.toLowerCase().includes(w)).length >= 3;
    if (hasCampaignElements) {
      results.strategy = /strategy|strateg|plan|approach|goal/i.test(text);
      results.email = /email|subject line|sequence/i.test(text);
      results.social = text.toLowerCase().includes('social') || /twitter|linkedin|instagram|facebook/i.test(text);
      results.blog = /blog|article|post|content/i.test(text);
    }
    
    // Hybrid path: Check for workflow elements
    const workflowWords = ['workflow', 'step', 'process', 'automat', 'quality'];
    const hasWorkflowElements = workflowWords.filter(w => text.toLowerCase().includes(w)).length >= 2;
    if (hasWorkflowElements) {
      results.workflow = /workflow|process|steps?/i.test(text);
      results.automated = /automat|connect|build/i.test(text);
      results.quality = /quality|check|verif|validat/i.test(text);
      results.documented = /document|instruction|how to/i.test(text);
    }
  }
  
  // Path-specific Mission 3.2 checks
  if (missionId === '3.2') {
    // Business path: Market research checks
    const researchWords = ['research', 'market', 'competitor', 'trend', 'customer', 'persona'];
    const hasResearchElements = researchWords.filter(w => text.toLowerCase().includes(w)).length >= 3;
    if (hasResearchElements) {
      results.competitors = /competitor|compet|rival|player/i.test(text);
      results.trends = /trend|pattern|shift|chang|opportunit/i.test(text);
      results.personas = /persona|customer|audience|segment/i.test(text);
      results.recommendations = /recommend|suggest|should|strategy|action/i.test(text);
    }
    
    // Hybrid path: Report generation checks  
    const reportWords = ['report', 'summary', 'executive', 'insight', 'recommendation'];
    const hasReportElements = reportWords.filter(w => text.toLowerCase().includes(w)).length >= 2;
    if (hasReportElements) {
      results.analyzes = /analy|metric|trend|data|insight/i.test(text);
      results.summary = /summary|overview|executive/i.test(text);
      results.visualizations = /chart|graph|visual|plot|diagram/i.test(text);
      results.recommendations = /recommend|suggest|action|next step/i.test(text);
    }
  }
  
  // LEVEL 4: IMPRESSIVE CAPSTONES
  if (missionId === '4.1') {
    const coordWords = ['agent', 'coordinate', 'workflow', 'step', 'handoff', 'pass to', 'delegate'];
    const hasCoordination = coordWords.filter(w => text.toLowerCase().includes(w)).length >= 4;
    results.documented = hasCoordination;
  }
  
  if (missionId === '4.2') {
    // Check for technical/specialized language (longer average word length)
    const words = text.split(/\s+/);
    const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / words.length;
    results.terminology = avgWordLength > 5.5;
  }
  
  if (missionId === '4.3') {
    const docIndicators = ['methodology', 'approach', 'framework', 'implementation', 'results', 'comparison', 'evaluation', 'testing'];
    const hasStructure = docIndicators.filter(w => text.toLowerCase().includes(w)).length >= 4;
    results.documented = hasStructure;
  }
  
  return results;
};

// Path-specific missions for Level 3
const PATH_MISSIONS = {
  business: {
    '3.2': {
      title: 'Market Research Automation',
      level: 3,
      instructions: {
        scenario: "Build a system that conducts comprehensive market research and produces actionable insights without manual data gathering.",
        requirements: [
          "Research a market/industry using web search (gather 10+ data points)",
          "Analyze competitor landscape (identify key players, positioning)",
          "Identify market trends and opportunities",
          "Generate customer persona profiles based on research",
          "Create executive summary with strategic recommendations",
          "Include data sources and confidence levels for claims",
          "",
          "📤 SUBMIT: Paste Claude's market research report (not your prompt) below"
        ],
        portfolio: "Shows you can automate research work. Valuable for strategy, business development, and competitive intelligence roles.",
        goal: "Demonstrate you can use AI to gather, synthesize, and analyze market intelligence at scale."
      },
      criteria: [
        { id: 'research', label: 'Conducts web research (10+ sources)', auto: false },
        { id: 'competitors', label: 'Identifies key competitors', auto: true },
        { id: 'trends', label: 'Identifies market trends', auto: true },
        { id: 'personas', label: 'Creates customer personas', auto: true },
        { id: 'recommendations', label: 'Provides strategic recommendations', auto: true }
      ]
    },
    '3.4': {
      title: 'Multi-Channel Campaign Generator',
      level: 3,
      instructions: {
        scenario: "Build a system that creates complete, cohesive marketing campaigns across multiple channels from a single product brief.",
        requirements: [
          "Generate campaign strategy (target audience, key messages, goals)",
          "Create email sequence (3+ emails with subject lines)",
          "Write social media posts (LinkedIn, Twitter/X, Instagram - 5+ posts each)",
          "Produce blog post outline with SEO keywords",
          "Design ad copy variations (3+ headline/body combinations)",
          "Ensure consistent brand voice and messaging across all channels",
          "",
          "📤 SUBMIT: Paste Claude's multi-channel campaign (not your prompt) below"
        ],
        portfolio: "Shows you can automate campaign creation end-to-end. Valuable for marketing, growth, and content strategy roles.",
        goal: "Demonstrate you can orchestrate AI to produce cohesive, multi-channel campaigns at scale."
      },
      criteria: [
        { id: 'strategy', label: 'Includes campaign strategy', auto: true },
        { id: 'email', label: 'Email sequence (3+ emails)', auto: true },
        { id: 'social', label: 'Social posts for 3+ platforms', auto: true },
        { id: 'blog', label: 'Blog outline with SEO', auto: true },
        { id: 'consistency', label: 'Consistent voice across channels', auto: false }
      ]
    },
    
    // Level 4: Business Path Capstones
    '4.1': {
      title: 'Product Launch Campaign Orchestrator',
      level: 4,
      instructions: {
        scenario: "Design a comprehensive AI-powered system that manages an entire product launch from market positioning to go-to-market execution across all channels.",
        requirements: [
          "Create market positioning strategy (target segments, competitive differentiation, value proposition)",
          "Generate complete messaging framework (elevator pitch, key messages, objection handling)",
          "Build multi-phase launch timeline (pre-launch, launch day, post-launch, 90-day plan)",
          "Produce launch assets: press release, landing page copy, email sequences, social media calendar (30 days), sales enablement materials",
          "Create measurement framework (KPIs, success metrics, tracking plan)",
          "Include contingency plans for 3 potential launch risks",
          "",
          "📤 SUBMIT: Paste your complete launch campaign system (not your prompt) below"
        ],
        portfolio: "Product launch orchestration is CMO-level work. Shows you can manage complex, multi-stakeholder initiatives. Demonstrates strategic thinking + execution planning. Immediately valuable for product marketing, growth, brand roles.",
        goal: "Master coordinating AI to execute enterprise-scale marketing initiatives."
      },
      criteria: [
        { id: 'positioning', label: 'Complete market positioning strategy', auto: false },
        { id: 'messaging', label: 'Comprehensive messaging framework', auto: true },
        { id: 'timeline', label: 'Multi-phase launch timeline', auto: true },
        { id: 'assets', label: 'Full suite of launch assets', auto: false },
        { id: 'measurement', label: 'KPIs and tracking plan', auto: true }
      ]
    },
    '4.2': {
      title: 'Customer Journey Intelligence System',
      level: 4,
      instructions: {
        scenario: "Build a system that analyzes customer data to map complete customer journeys, identify friction points, predict churn, and generate personalized retention strategies.",
        requirements: [
          "Define customer journey stages (5+ stages from awareness to advocacy)",
          "Map touchpoints and key actions at each stage",
          "Analyze sample customer data to identify patterns and segments",
          "Calculate health scores and churn risk for different customer segments",
          "Identify top 5 friction points causing drop-off or churn",
          "Generate personalized retention playbooks for high-risk segments",
          "Create executive dashboard showing: journey health, churn risks, ROI of interventions",
          "",
          "📤 SUBMIT: Paste your customer journey intelligence report (not your prompt) below"
        ],
        portfolio: "Customer lifecycle optimization is incredibly valuable - retention is cheaper than acquisition. Shows you understand growth loops + data-driven decision making. Directly applicable to customer success, growth, product, marketing roles.",
        goal: "Demonstrate mastery of AI-powered customer intelligence and retention systems."
      },
      criteria: [
        { id: 'journey', label: '5+ journey stages with touchpoints', auto: false },
        { id: 'segments', label: 'Identifies customer segments and patterns', auto: true },
        { id: 'churn', label: 'Churn risk scoring present', auto: true },
        { id: 'friction', label: 'Top 5 friction points identified', auto: true },
        { id: 'playbooks', label: 'Personalized retention playbooks', auto: true }
      ]
    },
    '4.3': {
      title: 'Competitive Intelligence Monitoring System',
      level: 4,
      instructions: {
        scenario: "Create an automated system that continuously monitors competitors, analyzes their strategies, identifies market opportunities, and generates strategic recommendations.",
        requirements: [
          "Select 3-5 competitors to monitor in a real market",
          "Define monitoring framework: what to track (pricing, features, messaging, partnerships, hiring, funding, customer sentiment)",
          "Analyze competitors across 8+ dimensions with scoring rubric",
          "Identify each competitor's strategy pattern (e.g., price leader, feature innovator, niche specialist)",
          "Generate SWOT analysis for your position vs. each competitor",
          "Identify 3+ market opportunities based on competitive gaps",
          "Create strategic recommendations with specific action items",
          "",
          "📤 SUBMIT: Paste your competitive intelligence report (not your prompt) below"
        ],
        portfolio: "Competitive intelligence is strategy-level work. Companies pay $100k+ for this analysis. Shows you can automate strategic research that informs C-level decisions. Valuable for strategy, product, business development, sales roles.",
        goal: "Master building AI-powered competitive intelligence systems that inform strategic decisions."
      },
      criteria: [
        { id: 'framework', label: 'Comprehensive monitoring framework', auto: false },
        { id: 'analysis', label: 'Multi-dimensional competitor analysis', auto: false },
        { id: 'strategy', label: 'Identifies competitor strategy patterns', auto: true },
        { id: 'swot', label: 'SWOT analysis for each competitor', auto: true },
        { id: 'opportunities', label: '3+ market opportunities identified', auto: true }
      ]
    }
  },
  
  technical: {
    '3.2': {
      title: 'Data Analysis & Visualization',
      level: 3,
      instructions: {
        scenario: "Build a system that transforms raw CSV data into actionable business insights with visualizations and recommendations.",
        requirements: [
          "Ingest and validate CSV data",
          "Handle missing values and malformed data appropriately",
          "Identify key trends, patterns, and outliers",
          "Create 3+ relevant visualizations (charts/graphs code)",
          "Generate executive summary with specific, actionable recommendations",
          "Entire process must be reproducible on new data",
          "",
          "📤 SUBMIT: Paste Claude's analysis code and summary (not your prompt) below"
        ],
        portfolio: "Shows you can automate analyst work. Valuable for business intelligence, operations, and strategy roles.",
        goal: "Demonstrate you can turn data into decisions automatically using AI-generated code."
      },
      criteria: [
        { id: 'handles', label: 'Handles missing/bad data', auto: false },
        { id: 'trends', label: 'Identifies trends and outliers', auto: false },
        { id: 'viz', label: 'Creates 3+ visualizations', auto: false },
        { id: 'summary', label: 'Executive summary with recommendations', auto: true },
        { id: 'reproducible', label: 'Process is reproducible', auto: false }
      ]
    },
    '3.4': {
      title: 'AI-Powered Code Generation',
      level: 3,
      instructions: {
        scenario: "You've built prompting skills - now use them to generate working code WITHOUT learning to code yourself. Write a prompt that makes Claude create a complete, tested solution from a simple specification.",
        codeContext: `💡 Why This Matters (Even for Non-Coders):

You don't need to WRITE code to USE code. Many workflows need automation:
- Analyze 1000 survey responses → Need a script
- Process weekly sales data → Need automation
- Scrape competitor prices → Need a tool

Instead of hiring a developer or learning Python, you can:
1. Describe what you need in plain English
2. Have Claude write the code
3. Run it and get results

This mission teaches you to be a "prompt-powered developer" - you specify, Claude codes.`,
        requirements: [
          "Pick a real problem you have (data analysis, file processing, web scraping, etc.)",
          "Write a specification in plain English: what should it do? what inputs? what outputs?",
          "Prompt Claude to generate: working code, instructions to run it, example usage",
          "Test: Can you use Claude's code to solve your problem? (You don't need to understand the code)",
          "Bonus: Ask Claude to add error handling and user-friendly messages",
          "",
          "📤 SUBMIT: Paste Claude's code solution with instructions (not your prompt) below"
        ],
        portfolio: "Shows you can solve technical problems without technical skills. Valuable for operations, analysis, and automation roles where you need results, not coding ability.",
        goal: "Master using AI as your personal developer. You provide business logic, Claude provides technical implementation."
      },
      criteria: [
        { id: 'specification', label: 'Clear problem specification included', auto: true },
        { id: 'functional', label: 'Code appears functional (has imports, functions, logic)', auto: true },
        { id: 'instructions', label: 'Includes how-to-run instructions', auto: true },
        { id: 'example', label: 'Includes example usage', auto: true },
        { id: 'practical', label: 'Solves a real problem (not toy example)', auto: false }
      ]
    },
    
    // Level 4: Technical Path Capstones
    '4.1': {
      title: 'Production-Grade API Integration System',
      level: 4,
      instructions: {
        scenario: "Build a robust system that integrates multiple APIs, handles authentication, implements rate limiting and retries, processes data transformations, and includes comprehensive error handling.",
        requirements: [
          "Integrate 2+ real APIs (examples: GitHub, Stripe, Airtable, Notion, Slack, Google APIs, weather, financial data)",
          "Implement proper authentication (API keys, OAuth, tokens)",
          "Add rate limiting logic to avoid hitting API limits",
          "Include exponential backoff retry logic for failed requests",
          "Transform and combine data from multiple sources",
          "Implement comprehensive error handling (network errors, auth failures, rate limits, invalid responses)",
          "Generate working code with clear documentation, example usage, and edge case handling",
          "",
          "📤 SUBMIT: Paste your API integration system code and docs (not your prompt) below"
        ],
        portfolio: "Production-grade API integrations are core infrastructure. Shows you can build reliable, enterprise-ready systems. Demonstrates understanding of distributed systems, error handling, and production concerns. Valuable for backend, DevOps, platform engineering roles.",
        goal: "Master building production-quality systems that handle real-world complexity."
      },
      criteria: [
        { id: 'apis', label: 'Integrates 2+ real APIs', auto: false },
        { id: 'auth', label: 'Proper authentication implemented', auto: false },
        { id: 'ratelimit', label: 'Rate limiting logic present', auto: true },
        { id: 'retry', label: 'Retry logic with backoff', auto: true },
        { id: 'errors', label: 'Comprehensive error handling', auto: false }
      ]
    },
    '4.2': {
      title: 'Machine Learning Pipeline Builder',
      level: 4,
      instructions: {
        scenario: "Create an end-to-end ML pipeline that processes data, trains models, evaluates performance, and generates predictions - all automated through AI-generated code.",
        requirements: [
          "Choose a real ML problem (classification, regression, clustering, or forecasting)",
          "Build data preprocessing pipeline (cleaning, feature engineering, splitting)",
          "Train 3+ different models (e.g., Random Forest, XGBoost, Neural Network)",
          "Implement proper train/validation/test splits with cross-validation",
          "Generate evaluation metrics (accuracy, precision, recall, F1, confusion matrix, etc.)",
          "Create visualizations: feature importance, learning curves, prediction distributions",
          "Implement prediction function with confidence scores",
          "Include model comparison table and recommendation for production use",
          "",
          "📤 SUBMIT: Paste your ML pipeline code and results (not your prompt) below"
        ],
        portfolio: "ML pipelines are advanced data science. Shows you can automate the entire model development process. Demonstrates understanding of ML concepts, evaluation, and production readiness. Directly valuable for data science, ML engineering, analytics roles.",
        goal: "Demonstrate mastery of AI-powered machine learning automation."
      },
      criteria: [
        { id: 'preprocessing', label: 'Data preprocessing pipeline', auto: false },
        { id: 'models', label: 'Trains 3+ different models', auto: false },
        { id: 'validation', label: 'Proper train/val/test splits', auto: true },
        { id: 'evaluation', label: 'Comprehensive evaluation metrics', auto: true },
        { id: 'comparison', label: 'Model comparison and recommendation', auto: true }
      ]
    },
    '4.3': {
      title: 'Infrastructure-as-Code Deployment System',
      level: 4,
      instructions: {
        scenario: "Design a complete infrastructure deployment system using Infrastructure-as-Code that provisions cloud resources, configures services, implements security best practices, and includes monitoring.",
        requirements: [
          "Choose a deployment scenario (web app, API service, data pipeline, microservices)",
          "Generate IaC code (Terraform, CloudFormation, or similar) for cloud infrastructure",
          "Include: compute (containers/serverless), database, networking, load balancing, storage",
          "Implement security: IAM roles, security groups, encryption, secrets management",
          "Add monitoring and logging configuration (CloudWatch, Datadog, etc.)",
          "Create CI/CD pipeline configuration (GitHub Actions, GitLab CI, etc.)",
          "Include deployment documentation: prerequisites, deployment steps, rollback procedure",
          "Add cost estimation and optimization recommendations",
          "",
          "📤 SUBMIT: Paste your IaC code and deployment docs (not your prompt) below"
        ],
        portfolio: "Infrastructure-as-Code is DevOps/SRE core competency. Shows you can automate cloud deployments at scale. Demonstrates understanding of cloud architecture, security, and operational concerns. Highly valuable for DevOps, SRE, platform, cloud engineering roles.",
        goal: "Master automating cloud infrastructure provisioning and deployment."
      },
      criteria: [
        { id: 'infrastructure', label: 'Complete infrastructure defined', auto: false },
        { id: 'security', label: 'Security best practices implemented', auto: false },
        { id: 'monitoring', label: 'Monitoring and logging configured', auto: true },
        { id: 'cicd', label: 'CI/CD pipeline included', auto: true },
        { id: 'documentation', label: 'Deployment docs with rollback', auto: true }
      ]
    }
  },
  
  hybrid: {
    '3.2': {
      title: 'Automated Report Generation',
      level: 3,
      instructions: {
        scenario: "Build a system that takes raw data and produces polished, executive-ready reports with insights, visualizations, and recommendations.",
        requirements: [
          "Accept data input (CSV, spreadsheet, or structured text)",
          "Analyze data for key metrics and trends",
          "Generate executive summary (2-3 paragraphs)",
          "Create 2-3 data visualizations with descriptions",
          "Provide specific, actionable recommendations",
          "Format as professional report (clear sections, professional tone)",
          "",
          "📤 SUBMIT: Paste Claude's generated report (not your prompt) below"
        ],
        portfolio: "Shows you can automate reporting workflows. Valuable for operations, analytics, and management roles.",
        goal: "Demonstrate you can transform data into decision-ready insights automatically."
      },
      criteria: [
        { id: 'analyzes', label: 'Analyzes data for key metrics', auto: true },
        { id: 'summary', label: 'Executive summary present', auto: true },
        { id: 'visualizations', label: 'Includes 2-3 visualizations', auto: true },
        { id: 'recommendations', label: 'Actionable recommendations', auto: true },
        { id: 'professional', label: 'Professional report format', auto: false }
      ]
    },
    '3.4': {
      title: 'Workflow Automation Builder',
      level: 3,
      instructions: {
        scenario: "Build a system that automates a repetitive multi-step workflow from start to finish without human intervention.",
        requirements: [
          "Choose a real workflow you do repeatedly (weekly reports, data processing, content publishing, etc.)",
          "Break down into clear steps (input → process → output)",
          "Create prompts for each step that build on previous results",
          "Add quality checks between steps",
          "Test the full workflow end-to-end",
          "Document: what it does, what inputs needed, what outputs produced",
          "",
          "📤 SUBMIT: Paste Claude's workflow documentation and sample output (not your prompt) below"
        ],
        portfolio: "Shows you can design and implement process automation. Valuable for operations, project management, and efficiency roles.",
        goal: "Demonstrate you can orchestrate AI to handle complex, multi-step processes autonomously."
      },
      criteria: [
        { id: 'workflow', label: 'Clear workflow with multiple steps', auto: true },
        { id: 'automated', label: 'Steps connect and build on each other', auto: true },
        { id: 'quality', label: 'Includes quality checks', auto: true },
        { id: 'documented', label: 'Well documented', auto: true },
        { id: 'practical', label: 'Solves real workflow problem', auto: false }
      ]
    }
  },
  
  hybrid: {
    '3.2': {
      title: 'Automated Report Generation',
      level: 3,
      instructions: {
        scenario: "Build a system that takes raw data and produces polished, executive-ready reports with insights, visualizations, and recommendations.",
        requirements: [
          "Accept data input (CSV, spreadsheet, or structured text)",
          "Analyze data for key metrics and trends",
          "Generate executive summary (2-3 paragraphs)",
          "Create 2-3 data visualizations with descriptions",
          "Provide specific, actionable recommendations",
          "Format as professional report (clear sections, professional tone)",
          "",
          "📤 SUBMIT: Paste Claude's generated report (not your prompt) below"
        ],
        portfolio: "Shows you can automate reporting workflows. Valuable for operations, analytics, and management roles.",
        goal: "Demonstrate you can transform data into decision-ready insights automatically."
      },
      criteria: [
        { id: 'analyzes', label: 'Analyzes data for key metrics', auto: true },
        { id: 'summary', label: 'Executive summary present', auto: true },
        { id: 'visualizations', label: 'Includes 2-3 visualizations', auto: true },
        { id: 'recommendations', label: 'Actionable recommendations', auto: true },
        { id: 'professional', label: 'Professional report format', auto: false }
      ]
    },
    '3.4': {
      title: 'Workflow Automation Builder',
      level: 3,
      instructions: {
        scenario: "Build a system that automates a repetitive multi-step workflow from start to finish without human intervention.",
        requirements: [
          "Choose a real workflow you do repeatedly (weekly reports, data processing, content publishing, etc.)",
          "Break down into clear steps (input → process → output)",
          "Create prompts for each step that build on previous results",
          "Add quality checks between steps",
          "Test the full workflow end-to-end",
          "Document: what it does, what inputs needed, what outputs produced",
          "",
          "📤 SUBMIT: Paste Claude's workflow documentation and sample output (not your prompt) below"
        ],
        portfolio: "Shows you can design and implement process automation. Valuable for operations, project management, and efficiency roles.",
        goal: "Demonstrate you can orchestrate AI to handle complex, multi-step processes autonomously."
      },
      criteria: [
        { id: 'workflow', label: 'Clear workflow with multiple steps', auto: true },
        { id: 'automated', label: 'Steps connect and build on each other', auto: true },
        { id: 'quality', label: 'Includes quality checks', auto: true },
        { id: 'documented', label: 'Well documented', auto: true },
        { id: 'practical', label: 'Solves real workflow problem', auto: false }
      ]
    },
    
    // Level 4: Hybrid Path Capstones
    '4.1': {
      title: 'Business Intelligence Dashboard Builder',
      level: 4,
      instructions: {
        scenario: "Design an AI system that transforms raw business data into an interactive insights dashboard with KPIs, trends, forecasts, and strategic recommendations.",
        requirements: [
          "Accept multiple data sources (sales, marketing, operations, etc.)",
          "Calculate 5+ key performance indicators (KPIs) automatically",
          "Identify trends, patterns, and anomalies in the data",
          "Generate 3-month forecast with confidence intervals",
          "Create strategic recommendations based on insights",
          "Output as structured dashboard with sections: Executive Summary, KPI Cards, Trend Analysis, Forecasts, Action Items",
          "Include data quality checks and validation",
          "",
          "📤 SUBMIT: Paste your dashboard output with sample data (not your prompt) below"
        ],
        portfolio: "Business intelligence automation is highly valued. Shows you can replace expensive BI tools with AI-powered analysis. Demonstrates strategic thinking + technical execution.",
        goal: "Master creating decision-support systems that executives actually use."
      },
      criteria: [
        { id: 'kpis', label: 'Calculates 5+ meaningful KPIs', auto: false },
        { id: 'trends', label: 'Identifies trends and anomalies', auto: false },
        { id: 'forecast', label: 'Includes 3-month forecast', auto: false },
        { id: 'recommendations', label: 'Strategic recommendations present', auto: true },
        { id: 'dashboard', label: 'Structured as professional dashboard', auto: false }
      ]
    },
    '4.2': {
      title: 'Regulatory Compliance Analyzer',
      level: 4,
      instructions: {
        scenario: "Build a system that reviews business processes, documents, or contracts against regulatory requirements and flags compliance risks with remediation steps.",
        requirements: [
          "Choose a regulatory domain (GDPR, SOC 2, HIPAA, financial regulations, employment law, etc.)",
          "Define 10+ specific compliance requirements from the regulation",
          "Create a review checklist that maps requirements to evidence",
          "Analyze a sample document/process and flag gaps",
          "Classify findings by severity (Critical, High, Medium, Low)",
          "Provide specific remediation steps for each finding",
          "Generate compliance scorecard with percentage completion",
          "",
          "📤 SUBMIT: Paste your compliance analysis report (not your prompt) below"
        ],
        portfolio: "Compliance automation is incredibly valuable - companies pay $200k+ for this. Shows domain expertise + process thinking. Immediately applicable to legal, finance, healthcare, security roles.",
        goal: "Demonstrate ability to automate complex regulatory analysis that requires deep domain knowledge."
      },
      criteria: [
        { id: 'requirements', label: '10+ specific requirements defined', auto: false },
        { id: 'findings', label: 'Identifies compliance gaps', auto: true },
        { id: 'severity', label: 'Classifies findings by severity', auto: true },
        { id: 'remediation', label: 'Specific remediation steps', auto: true },
        { id: 'scorecard', label: 'Compliance scorecard included', auto: true }
      ]
    },
    '4.3': {
      title: 'Strategic Decision Analyzer',
      level: 4,
      instructions: {
        scenario: "Create a system that helps executives make strategic decisions by analyzing options across multiple dimensions, running scenario analysis, and providing data-driven recommendations.",
        requirements: [
          "Define a real strategic decision (market expansion, product launch, M&A, pricing strategy, org restructuring, etc.)",
          "Identify 3-5 decision options to evaluate",
          "Create evaluation framework with 6+ criteria (financial impact, risk, time to execute, competitive advantage, etc.)",
          "Score each option against each criterion with justification",
          "Run best-case, base-case, worst-case scenarios for top 2 options",
          "Identify key assumptions and risks for each option",
          "Provide final recommendation with implementation roadmap",
          "",
          "📤 SUBMIT: Paste your strategic decision analysis (not your prompt) below"
        ],
        portfolio: "Strategic decision support at executive level. This is consulting-level work. Shows you can handle ambiguous, high-stakes problems. Valuable for strategy, ops, consulting, leadership roles.",
        goal: "Master building decision-support systems for complex, multi-stakeholder strategic choices."
      },
      criteria: [
        { id: 'framework', label: 'Robust evaluation framework (6+ criteria)', auto: false },
        { id: 'scoring', label: 'Each option scored with justification', auto: false },
        { id: 'scenarios', label: 'Best/base/worst case scenarios', auto: true },
        { id: 'risks', label: 'Key assumptions and risks identified', auto: true },
        { id: 'recommendation', label: 'Clear recommendation with roadmap', auto: true }
      ]
    }
  }
};

// Helper function to get mission based on selected path
const getMissionForPath = (missionId, selectedPath) => {
  // Level 3-4 missions can be path-specific
  if ((missionId.startsWith('3.') || missionId.startsWith('4.')) && selectedPath) {
    if (PATH_MISSIONS[selectedPath] && PATH_MISSIONS[selectedPath][missionId]) {
      return PATH_MISSIONS[selectedPath][missionId];
    }
  }
  
  // All other missions use default
  return MISSIONS[missionId];
};

// Load saved progress from localStorage
const loadSavedProgress = () => {
  try {
    const saved = localStorage.getItem('cracked-course-progress');
    if (saved) {
      const data = JSON.parse(saved);
      
      // Validate data structure
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid data structure');
      }
      
      // Validate arrays exist
      const validateArray = (val) => Array.isArray(val) ? val : [];
      
      return {
        completedMissions: new Set(validateArray(data.completedMissions)),
        selectedPath: data.selectedPath || null,
        pathProgress: {
          business: new Set(validateArray(data.pathProgress?.business)),
          technical: new Set(validateArray(data.pathProgress?.technical)),
          hybrid: new Set(validateArray(data.pathProgress?.hybrid))
        },
        pathBadges: data.pathBadges || {
          business: [],
          technical: [],
          hybrid: []
        },
        certificatePaths: validateArray(data.certificatePaths),
        lastMission: data.lastMission || 'intro',
        showCapstoneIntro: data.showCapstoneIntro !== false // default true unless explicitly false
      };
    }
  } catch (error) {
    console.error('Error loading saved progress:', error);
    // If data is corrupted, clear it and start fresh
    try {
      localStorage.removeItem('cracked-course-progress');
    } catch (clearError) {
      console.error('Could not clear corrupted data:', clearError);
    }
  }
  return null;
};

export default function MissionEvaluator() {
  const savedState = loadSavedProgress();
  
  const [selectedMission, setSelectedMission] = useState(savedState?.lastMission || 'intro');
  const [output, setOutput] = useState('');
  const [checks, setChecks] = useState({});
  const [completedMissions, setCompletedMissions] = useState(savedState?.completedMissions || new Set());
  const [selectedPath, setSelectedPath] = useState(savedState?.selectedPath || null);

  const mission = selectedMission === 'intro' ? null : getMissionForPath(selectedMission, selectedPath);
  const levelNames = ['', 'Atomic Prompts', 'Compound Workflows', 'Real-World Applications', 'Impressive Capstones'];
  const levelName = mission ? levelNames[mission.level] : '';
  
  // Auto-navigate away from intro if user has progress
  useEffect(() => {
    if (selectedMission === 'intro' && completedMissions.size > 0 && savedState?.lastMission && savedState.lastMission !== 'intro') {
      setSelectedMission(savedState.lastMission);
    }
  }, []);
  
  // Reset sample data collapsed state when mission changes
  useEffect(() => {
    setSampleDataExpanded(false);
  }, [selectedMission]);
  
  // Calculate progress
  const totalMissions = Object.keys(MISSIONS).length;
  const progressPercentage = Math.round((completedMissions.size / totalMissions) * 100);
  
  // Check if user has completed Level 2 (missions 2.1-2.5)
  const level2Missions = ['2.1', '2.2', '2.3', '2.4', '2.5'];
  const level2Complete = level2Missions.every(m => completedMissions.has(m));
  
  // Check if user has completed Level 3 (missions 3.1-3.4)
  const level3Missions = ['3.1', '3.2', '3.3', '3.4'];
  const level3Complete = level3Missions.every(m => completedMissions.has(m));
  const [showCapstoneIntro, setShowCapstoneIntro] = useState(savedState?.showCapstoneIntro ?? true);
  const [pathJustSelected, setPathJustSelected] = useState(false);
  const [sampleDataExpanded, setSampleDataExpanded] = useState(false);
  const [saveErrorShown, setSaveErrorShown] = useState(false);
  
  // Handle path selection with confirmation
  const handlePathSelection = (path) => {
    setSelectedPath(path);
    setPathJustSelected(true);
  };
  
  // Complex path system state
  const [pathProgress, setPathProgress] = useState(savedState?.pathProgress || {
    business: new Set(),
    technical: new Set(),
    hybrid: new Set()
  });
  const [pathBadges, setPathBadges] = useState(savedState?.pathBadges || {
    business: [],
    technical: [],
    hybrid: []
  });
  const [showPathSwitcher, setShowPathSwitcher] = useState(false);
  const [pendingPathSwitch, setPendingPathSwitch] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificatePaths, setCertificatePaths] = useState(savedState?.certificatePaths || []);
  const [currentCertificateIndex, setCurrentCertificateIndex] = useState(0);
  
  // Path-specific progress calculations
  const getPathProgress = (path) => {
    const pathMissions = pathProgress[path];
    const level3Missions = Array.from(pathMissions).filter(m => m.startsWith('3.'));
    const level4Missions = Array.from(pathMissions).filter(m => m.startsWith('4.'));
    return {
      level3: level3Missions.length,
      level4: level4Missions.length,
      total: pathMissions.size,
      percentage: Math.round((pathMissions.size / 7) * 100) // 7 total path missions (3.1-3.4 + 4.1-4.3)
    };
  };
  
  // Path recommendation based on Level 1-2 performance
  const getRecommendedPath = () => {
    const hasCompletedContentMissions = completedMissions.has('1.1') && completedMissions.has('1.4');
    const hasCompletedTechnicalMissions = completedMissions.has('1.2') && completedMissions.has('1.7');
    
    if (hasCompletedContentMissions && !hasCompletedTechnicalMissions) return 'business';
    if (hasCompletedTechnicalMissions && !hasCompletedContentMissions) return 'technical';
    return 'hybrid';
  };
  
  // Handle path switching
  const requestPathSwitch = (newPath) => {
    setPendingPathSwitch(newPath);
    setShowPathSwitcher(true);
  };
  
  const confirmPathSwitch = () => {
    if (pendingPathSwitch) {
      setSelectedPath(pendingPathSwitch);
      setPendingPathSwitch(null);
      setShowPathSwitcher(false);
      setSelectedMission('3.1');
    }
  };
  
  const cancelPathSwitch = () => {
    setPendingPathSwitch(null);
    setShowPathSwitcher(false);
  };
  
  // Award badges based on achievements
  const checkAndAwardBadges = (path, missionId) => {
    const progress = getPathProgress(path);
    const newBadges = [];
    
    // Level 3 completion badge
    if (progress.level3 === 4 && !pathBadges[path].includes('level3-complete')) {
      newBadges.push('level3-complete');
    }
    
    // Level 4 completion badge
    if (progress.level4 === 3 && !pathBadges[path].includes('level4-complete')) {
      newBadges.push('level4-complete');
    }
    
    // Path mastery badge
    if (progress.total === 7 && !pathBadges[path].includes('path-master')) {
      newBadges.push('path-master');
    }
    
    if (newBadges.length > 0) {
      setPathBadges(prev => ({
        ...prev,
        [path]: [...prev[path], ...newBadges]
      }));
    }
    
    // Show certificate if path completed and not already awarded
    if (progress.total === 7 && !certificatePaths.includes(path)) {
      setCertificatePaths(prev => [...prev, path]);
      setCurrentCertificateIndex(certificatePaths.length); // Show the newly added one
      setShowCertificate(true);
    }
  };

  const handleCheck = (criteriaId) => {
    setChecks(prev => ({
      ...prev,
      [criteriaId]: !prev[criteriaId]
    }));
  };

  const runChecks = () => {
    const autoResults = runAutoChecks(selectedMission, output);
    setChecks(prev => ({
      ...prev,
      ...autoResults
    }));
  };

  const passed = mission ? mission.criteria.filter(c => checks[c.id]).length : 0;
  const required = mission ? mission.criteria.filter(c => !c.id.includes('bonus')).length : 0;
  const allPassed = passed >= required;
  
  // Mark mission as complete when all required criteria pass
  useEffect(() => {
    if (mission && allPassed && selectedMission !== 'intro') {
      setCompletedMissions(prev => new Set([...prev, selectedMission]));
      
      // Track path-specific progress for Level 3-4 missions
      if (selectedPath && (selectedMission.startsWith('3.') || selectedMission.startsWith('4.'))) {
        setPathProgress(prev => ({
          ...prev,
          [selectedPath]: new Set([...prev[selectedPath], selectedMission])
        }));
        
        // Check and award badges
        setTimeout(() => checkAndAwardBadges(selectedPath, selectedMission), 500);
      }
    }
  }, [allPassed, selectedMission, mission, selectedPath]);

  // Save progress to localStorage whenever key state changes
  useEffect(() => {
    try {
      const progressData = {
        completedMissions: Array.from(completedMissions),
        selectedPath,
        pathProgress: {
          business: Array.from(pathProgress.business),
          technical: Array.from(pathProgress.technical),
          hybrid: Array.from(pathProgress.hybrid)
        },
        pathBadges,
        certificatePaths,
        lastMission: selectedMission,
        showCapstoneIntro
      };
      localStorage.setItem('cracked-course-progress', JSON.stringify(progressData));
    } catch (error) {
      console.error('Error saving progress:', error);
      
      // Only show alert once to avoid spam
      if (!saveErrorShown) {
        setSaveErrorShown(true);
        
        // User-friendly error message
        if (error.name === 'QuotaExceededError') {
          alert('⚠️ Unable to save progress: Storage is full. Please clear some browser data and try again.');
        } else {
          // Generic localStorage error (incognito mode, disabled storage, etc.)
          alert('⚠️ Unable to save progress. You may be in incognito/private mode, or localStorage is disabled. Your progress will be lost when you close this tab.');
        }
      }
    }
  }, [completedMissions, selectedPath, pathProgress, pathBadges, certificatePaths, selectedMission, showCapstoneIntro, saveErrorShown]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem 1rem'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ marginBottom: '2rem', textAlign: 'center', position: 'relative' }}>
          
          {/* Progress Bar - Top Left */}
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '0.5rem'
          }}>
            <div style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: 'rgba(255,255,255,0.9)',
              letterSpacing: '0.5px'
            }}>
              {completedMissions.size}/{totalMissions} COMPLETE
            </div>
            <div style={{
              width: '200px',
              height: '10px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '10px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.3)',
              display: 'flex'
            }}>
              {/* Level 1: 7 missions - Blue */}
              <div style={{
                width: '36.84%', // 7/19
                height: '100%',
                background: completedMissions.size >= 1 ? 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)' : 'transparent',
                position: 'relative',
                opacity: (() => {
                  const level1Complete = Array.from(completedMissions).filter(m => m.startsWith('1.')).length;
                  return level1Complete > 0 ? Math.min(level1Complete / 7, 1) : 0;
                })(),
                transition: 'opacity 0.5s ease'
              }} />
              
              {/* Level 2: 5 missions - Purple */}
              <div style={{
                width: '26.32%', // 5/19
                height: '100%',
                background: 'linear-gradient(90deg, #8b5cf6 0%, #a78bfa 100%)',
                position: 'relative',
                opacity: (() => {
                  const level2Complete = Array.from(completedMissions).filter(m => m.startsWith('2.')).length;
                  return level2Complete > 0 ? Math.min(level2Complete / 5, 1) : 0;
                })(),
                transition: 'opacity 0.5s ease',
                borderLeft: '1px solid rgba(255,255,255,0.3)'
              }} />
              
              {/* Level 3: 4 missions - Green */}
              <div style={{
                width: '21.05%', // 4/19
                height: '100%',
                background: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)',
                position: 'relative',
                opacity: (() => {
                  const level3Complete = Array.from(completedMissions).filter(m => m.startsWith('3.')).length;
                  return level3Complete > 0 ? Math.min(level3Complete / 4, 1) : 0;
                })(),
                transition: 'opacity 0.5s ease',
                borderLeft: '1px solid rgba(255,255,255,0.3)'
              }} />
              
              {/* Level 4: 3 missions - Gold */}
              <div style={{
                width: '15.79%', // 3/19
                height: '100%',
                background: 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)',
                position: 'relative',
                opacity: (() => {
                  const level4Complete = Array.from(completedMissions).filter(m => m.startsWith('4.')).length;
                  return level4Complete > 0 ? Math.min(level4Complete / 4, 1) : 0;
                })(),
                transition: 'opacity 0.5s ease',
                borderLeft: '1px solid rgba(255,255,255,0.3)'
              }} />
            </div>
          </div>
          
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '800',
            color: 'white',
            marginBottom: '0.5rem',
            letterSpacing: '-0.03em'
          }}>
            CRACKED
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}>
            Mission Evaluator
          </p>
          
          {/* Path Indicator */}
          {selectedPath && (
            <div style={{
              marginTop: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              flexWrap: 'wrap'
            }}>
              <div style={{
                display: 'inline-block',
                padding: '0.375rem 0.875rem',
                background: selectedPath === 'business' ? '#3b82f6' : selectedPath === 'technical' ? '#8b5cf6' : '#10b981',
                borderRadius: '20px',
                fontSize: '0.8125rem',
                fontWeight: '600',
                color: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
              }}>
                {selectedPath === 'business' ? '📊 Business Path' : 
                 selectedPath === 'technical' ? '⚙️ Technical Path' : 
                 '🔄 Hybrid Path'}
                {' '}
                ({getPathProgress(selectedPath).total}/7)
              </div>
              
              {/* View Certificates Button */}
              {certificatePaths.length > 0 && (
                <button
                  onClick={() => {
                    setShowCertificate(true);
                    setCurrentCertificateIndex(certificatePaths.length - 1);
                  }}
                  style={{
                    padding: '0.375rem 0.875rem',
                    fontSize: '0.8125rem',
                    fontWeight: '600',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(245, 158, 11, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
                  }}
                >
                  📜 {certificatePaths.length} Certificate{certificatePaths.length > 1 ? 's' : ''}
                </button>
              )}
              
              {/* Path Switcher Dropdown */}
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <select
                  value={selectedPath}
                  onChange={(e) => {
                    if (e.target.value !== selectedPath) {
                      requestPathSwitch(e.target.value);
                    }
                  }}
                  style={{
                    padding: '0.375rem 0.625rem',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    background: 'rgba(255,255,255,0.25)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.4)',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  <option value={selectedPath} style={{ color: '#1f2937' }}>Current Path</option>
                  <option value="business" style={{ color: '#1f2937' }}>📊 Business ({getPathProgress('business').total}/7)</option>
                  <option value="technical" style={{ color: '#1f2937' }}>⚙️ Technical ({getPathProgress('technical').total}/7)</option>
                  <option value="hybrid" style={{ color: '#1f2937' }}>🔄 Hybrid ({getPathProgress('hybrid').total}/7)</option>
                </select>
              </div>
            </div>
          )}
          
          {/* Help Widget */}
          <div style={{
            position: 'absolute',
            top: '0',
            right: '0',
            cursor: 'help'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              border: '2px solid rgba(255,255,255,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'white',
              transition: 'all 0.2s',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
              e.currentTarget.style.transform = 'scale(1.1)';
              const tooltip = e.currentTarget.querySelector('.help-tooltip');
              if (tooltip) tooltip.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
              e.currentTarget.style.transform = 'scale(1)';
              const tooltip = e.currentTarget.querySelector('.help-tooltip');
              if (tooltip) tooltip.style.opacity = '0';
            }}
            >
              ?
              {/* Tooltip */}
              <div 
                className="help-tooltip"
                style={{
                  position: 'absolute',
                  top: '50px',
                  right: '0',
                  width: '340px',
                  background: 'white',
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                  padding: '1.25rem',
                  opacity: '0',
                  pointerEvents: 'none',
                  transition: 'opacity 0.2s',
                  zIndex: '1000',
                  textAlign: 'left'
                }}
              >
                <div style={{ fontSize: '0.875rem', fontWeight: '700', color: '#5b21b6', marginBottom: '0.75rem' }}>
                  📖 Quick Reminder
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#1f2937', lineHeight: '1.5' }}>
                  <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>How it works:</div>
                  <ol style={{ margin: '0 0 0.75rem 0', paddingLeft: '1.25rem', color: '#4b5563' }}>
                    <li style={{ marginBottom: '0.25rem' }}>Read the mission challenge</li>
                    <li style={{ marginBottom: '0.25rem' }}>Write a prompt for Claude</li>
                    <li style={{ marginBottom: '0.25rem' }}>Test at <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" style={{ color: '#7c3aed', fontWeight: '600', textDecoration: 'underline' }}>claude.ai</a></li>
                    <li style={{ marginBottom: '0.25rem' }}>Paste <strong>Claude's output</strong> below</li>
                    <li>Click "Run Smart Checks"</li>
                  </ol>
                  <div style={{ 
                    padding: '0.625rem', 
                    background: '#fef3c7', 
                    borderRadius: '6px', 
                    fontSize: '0.75rem', 
                    color: '#92400e',
                    border: '1px solid #fcd34d'
                  }}>
                    ⚠️ Submit Claude's <strong>output</strong>, not your prompt!
                  </div>
                  
                  {/* Reset Progress Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('⚠️ Reset all progress? This will delete all completed missions, badges, and certificates. This cannot be undone!')) {
                        localStorage.removeItem('cracked-course-progress');
                        window.location.reload();
                      }
                    }}
                    style={{
                      marginTop: '0.75rem',
                      padding: '0.5rem',
                      width: '100%',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      color: '#dc2626',
                      background: 'white',
                      border: '1px solid #fca5a5',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    🔄 Reset Progress
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Path Selection Screen - Shows after Level 2 completion */}
        {level2Complete && (!selectedPath || pathJustSelected) ? (
          <div style={{
            background: 'white',
            padding: '2.5rem',
            borderRadius: '16px',
            marginBottom: '1.5rem',
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)'
          }}>
            {!pathJustSelected ? (
              <>
                <h2 style={{
                  fontSize: '1.75rem',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '1rem',
                  textAlign: 'center'
                }}>
                  🎉 Congratulations! Level 2 Complete!
                </h2>
                
                <p style={{
                  fontSize: '1rem',
                  color: '#4b5563',
                  textAlign: 'center',
                  marginBottom: '2rem',
                  lineHeight: '1.6'
                }}>
                  You've mastered the fundamentals. Now choose your specialization for Level 3:
                </p>
                
                {/* Path Recommendation */}
                {(() => {
                  const recommended = getRecommendedPath();
                  const pathNames = {
                    business: 'Business & Marketing',
                    technical: 'Technical & Development',
                    hybrid: 'Hybrid & Analysis'
                  };
                  const pathIcons = {
                    business: '📊',
                    technical: '⚙️',
                    hybrid: '🔄'
                  };
                  const pathColors = {
                    business: '#3b82f6',
                    technical: '#8b5cf6',
                    hybrid: '#10b981'
                  };
                  
                  return (
                    <div style={{
                      padding: '1rem',
                      background: `linear-gradient(135deg, ${pathColors[recommended]}15 0%, ${pathColors[recommended]}25 100%)`,
                      border: `2px solid ${pathColors[recommended]}`,
                      borderRadius: '10px',
                      marginBottom: '1.5rem',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: '600', color: pathColors[recommended], marginBottom: '0.25rem' }}>
                        ⭐ Recommended for you
                      </div>
                      <div style={{ fontSize: '1rem', fontWeight: '700', color: '#1f2937' }}>
                        {pathIcons[recommended]} {pathNames[recommended]}
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: '0.25rem' }}>
                        Based on your Level 1-2 performance
                      </div>
                    </div>
                  );
                })()}

                <div style={{
                  display: 'grid',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  {/* Business Path */}
                  <div 
                    onClick={() => handlePathSelection('business')}
                    style={{
                      padding: '1.5rem',
                      border: '3px solid #3b82f6',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: '#1e40af',
                      marginBottom: '0.5rem'
                    }}>
                      Business & Marketing
                    </h3>
                    <p style={{
                      fontSize: '0.9375rem',
                      color: '#1e3a8a',
                      marginBottom: '0.75rem',
                      lineHeight: '1.5'
                    }}>
                      Content creation, campaigns, market research, customer automation
                    </p>
                    <p style={{
                      fontSize: '0.8125rem',
                      color: '#3b82f6',
                      fontWeight: '600'
                    }}>
                      → For: Marketers, Content Creators, Operations, Customer Success
                    </p>
                  </div>

                  {/* Technical Path */}
                  <div 
                    onClick={() => handlePathSelection('technical')}
                    style={{
                      padding: '1.5rem',
                      border: '3px solid #8b5cf6',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚙️</div>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: '#6b21a8',
                      marginBottom: '0.5rem'
                    }}>
                      Technical & Development
                    </h3>
                    <p style={{
                      fontSize: '0.9375rem',
                      color: '#5b21b6',
                      marginBottom: '0.75rem',
                      lineHeight: '1.5'
                    }}>
                      Code generation, data analysis, automation scripts, technical workflows
                    </p>
                    <p style={{
                      fontSize: '0.8125rem',
                      color: '#8b5cf6',
                      fontWeight: '600'
                    }}>
                      → For: Developers, Technical PMs, Data Analysts, Engineers
                    </p>
                  </div>

                  {/* Hybrid Path */}
                  <div 
                    onClick={() => handlePathSelection('hybrid')}
                    style={{
                      padding: '1.5rem',
                      border: '3px solid #10b981',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔄</div>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: '#065f46',
                      marginBottom: '0.5rem'
                    }}>
                      Hybrid & Analysis
                    </h3>
                    <p style={{
                      fontSize: '0.9375rem',
                      color: '#064e3b',
                      marginBottom: '0.75rem',
                      lineHeight: '1.5'
                    }}>
                      Report generation, data insights, workflow automation, process optimization
                    </p>
                    <p style={{
                      fontSize: '0.8125rem',
                      color: '#10b981',
                      fontWeight: '600'
                    }}>
                      → For: Business Analysts, Product Managers, Operations, Strategy
                    </p>
                  </div>
                </div>

                <div style={{
                  padding: '1rem',
                  background: '#fef3c7',
                  borderRadius: '8px',
                  border: '1px solid #fcd34d',
                  fontSize: '0.875rem',
                  color: '#92400e',
                  textAlign: 'center'
                }}>
                  💡 Don't worry - all paths teach valuable skills. Choose the one that fits your role best!
                </div>
              </>
            ) : (
              <>
                {/* Confirmation Screen */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
                  <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: '800',
                    color: '#1f2937',
                    marginBottom: '1rem'
                  }}>
                    Path Selected!
                  </h2>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: selectedPath === 'business' ? '#3b82f6' : selectedPath === 'technical' ? '#8b5cf6' : '#10b981',
                    marginBottom: '1.5rem'
                  }}>
                    {selectedPath === 'business' ? '📊 Business & Marketing' : 
                     selectedPath === 'technical' ? '⚙️ Technical & Development' : 
                     '🔄 Hybrid & Analysis'}
                  </div>
                  <p style={{
                    fontSize: '1rem',
                    color: '#6b7280',
                    marginBottom: '2rem',
                    lineHeight: '1.6'
                  }}>
                    Level 3 missions will now focus on {selectedPath === 'business' ? 'marketing campaigns, content creation, and market research' : 
                    selectedPath === 'technical' ? 'code generation, data analysis, and technical automation' : 
                    'report generation, workflow automation, and data insights'}.
                  </p>
                  <button
                    onClick={() => {
                      setPathJustSelected(false);
                      setSelectedMission('3.1');
                    }}
                    style={{
                      padding: '1rem 2.5rem',
                      fontSize: '1.125rem',
                      fontWeight: '700',
                      color: 'white',
                      background: `linear-gradient(135deg, ${selectedPath === 'business' ? '#3b82f6' : selectedPath === 'technical' ? '#8b5cf6' : '#10b981'} 0%, ${selectedPath === 'business' ? '#2563eb' : selectedPath === 'technical' ? '#7c3aed' : '#059669'} 100%)`,
                      border: 'none',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                    }}
                  >
                    Begin Level 3 →
                  </button>
                </div>
              </>
            )}
          </div>
        ) : null}

        {/* Capstone Introduction Screen - Shows after Level 3 completion */}
        {level3Complete && showCapstoneIntro && selectedPath ? (
          <div style={{
            background: 'white',
            padding: '2.5rem',
            borderRadius: '16px',
            marginBottom: '1.5rem',
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
            border: '3px solid #f59e0b'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏆</div>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.5rem'
              }}>
                Level 4: Portfolio Capstones
              </h2>
              <p style={{
                fontSize: '1.125rem',
                color: '#78350f',
                fontWeight: '600',
                marginBottom: '0.5rem'
              }}>
                You've mastered the fundamentals. Now prove it.
              </p>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
              padding: '1.5rem',
              borderRadius: '12px',
              marginBottom: '2rem',
              border: '2px solid #fbbf24'
            }}>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '700',
                color: '#92400e',
                marginBottom: '1rem'
              }}>
                What Makes These Different:
              </h3>
              <div style={{ fontSize: '0.9375rem', color: '#78350f', lineHeight: '1.7' }}>
                <p style={{ marginBottom: '0.75rem' }}>
                  <strong>✨ These aren't just missions</strong> - they're portfolio-worthy projects that demonstrate mastery.
                </p>
                <p style={{ marginBottom: '0.75rem' }}>
                  <strong>🎯 More complex</strong> - Expect to spend 30-60 minutes per capstone, iterating and refining.
                </p>
                <p style={{ marginBottom: '0.75rem' }}>
                  <strong>💼 Career impact</strong> - These projects belong in your resume, portfolio, or LinkedIn.
                </p>
                <p style={{ marginBottom: '0' }}>
                  <strong>🔥 Impressive</strong> - Completing all 3 puts you in the top 5% of prompt engineers.
                </p>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              {selectedPath === 'business' ? (
                <>
                  <div style={{
                    padding: '1.25rem',
                    background: 'white',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px'
                  }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🚀</div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
                      4.1: Product Launch Orchestrator
                    </h4>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                      Manage entire product launch from positioning to 90-day execution
                    </p>
                  </div>

                  <div style={{
                    padding: '1.25rem',
                    background: 'white',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px'
                  }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔄</div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
                      4.2: Customer Journey Intelligence
                    </h4>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                      Map journeys, predict churn, generate retention strategies
                    </p>
                  </div>

                  <div style={{
                    padding: '1.25rem',
                    background: 'white',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px'
                  }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔍</div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
                      4.3: Competitive Intelligence System
                    </h4>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                      Automated competitor tracking and strategy analysis
                    </p>
                  </div>
                </>
              ) : selectedPath === 'technical' ? (
                <>
                  <div style={{
                    padding: '1.25rem',
                    background: 'white',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px'
                  }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🔌</div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
                      4.1: API Integration System
                    </h4>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                      Production-grade multi-API integration with reliability
                    </p>
                  </div>

                  <div style={{
                    padding: '1.25rem',
                    background: 'white',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px'
                  }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🤖</div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
                      4.2: ML Pipeline Builder
                    </h4>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                      End-to-end machine learning automation from data to predictions
                    </p>
                  </div>

                  <div style={{
                    padding: '1.25rem',
                    background: 'white',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px'
                  }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>☁️</div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
                      4.3: Infrastructure-as-Code
                    </h4>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                      Automated cloud deployment with security and monitoring
                    </p>
                  </div>
                </>
              ) : selectedPath === 'hybrid' ? (
                <>
                  <div style={{
                    padding: '1.25rem',
                    background: 'white',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px'
                  }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📊</div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
                      4.1: BI Dashboard Builder
                    </h4>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                      Transform raw data into interactive insights dashboard
                    </p>
                  </div>

                  <div style={{
                    padding: '1.25rem',
                    background: 'white',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px'
                  }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>⚖️</div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
                      4.2: Compliance Analyzer
                    </h4>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                      Automated regulatory compliance review and risk assessment
                    </p>
                  </div>

                  <div style={{
                    padding: '1.25rem',
                    background: 'white',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px'
                  }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎯</div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
                      4.3: Strategic Decision Analyzer
                    </h4>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                      Executive decision support with scenario analysis
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div style={{
                    padding: '1.25rem',
                    background: 'white',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px'
                  }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎓</div>
                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem' }}>
                      Portfolio Capstones
                    </h4>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
                      Choose your path in Level 3 to see your specialized capstone projects
                    </p>
                  </div>
                </>
              )}
            </div>

            <div style={{
              background: '#fef3c7',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid #fcd34d',
              fontSize: '0.875rem',
              color: '#92400e',
              textAlign: 'center',
              marginBottom: '1.5rem'
            }}>
              💡 <strong>Pro Tip:</strong> These projects take more time and iteration. Set aside focused work sessions.
            </div>

            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => setShowCapstoneIntro(false)}
                style={{
                  padding: '1rem 2.5rem',
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  color: 'white',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(245, 158, 11, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(245, 158, 11, 0.4)';
                }}
              >
                Begin Capstone Projects →
              </button>
            </div>
          </div>
        ) : null}

        {/* Path Switcher Warning Modal */}
        {showPathSwitcher && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem'
          }}
          onClick={cancelPathSwitch}
          >
            <div 
              style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '16px',
                maxWidth: '500px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}>⚠️</div>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '800',
                color: '#1f2937',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                Switch Learning Path?
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#4b5563',
                lineHeight: '1.6',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}>
                Switching from <strong>{selectedPath === 'business' ? '📊 Business' : selectedPath === 'technical' ? '⚙️ Technical' : '🔄 Hybrid'}</strong> to <strong>{pendingPathSwitch === 'business' ? '📊 Business' : pendingPathSwitch === 'technical' ? '⚙️ Technical' : '🔄 Hybrid'}</strong> path will:
              </p>
              <ul style={{
                fontSize: '0.9375rem',
                color: '#6b7280',
                lineHeight: '1.7',
                marginBottom: '1.5rem',
                paddingLeft: '1.5rem'
              }}>
                <li>Reset you to Mission 3.1</li>
                <li>Change missions 3.2 and 3.4 to the new path</li>
                <li>Keep your current path progress (you can come back)</li>
              </ul>
              <div style={{
                padding: '1rem',
                background: '#f0fdf4',
                border: '1px solid #86efac',
                borderRadius: '8px',
                fontSize: '0.875rem',
                color: '#065f46',
                marginBottom: '1.5rem'
              }}>
                ✅ <strong>Good news:</strong> You can complete multiple paths! Your progress in each path is saved separately.
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={cancelPathSwitch}
                  style={{
                    flex: 1,
                    padding: '0.875rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#6b7280',
                    background: 'white',
                    border: '2px solid #e5e7eb',
                    borderRadius: '10px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmPathSwitch}
                  style={{
                    flex: 1,
                    padding: '0.875rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: 'white',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer'
                  }}
                >
                  Switch Path
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Certificate Modal */}
        {showCertificate && certificatePaths.length > 0 && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem'
          }}
          onClick={() => setShowCertificate(false)}
          >
            {(() => {
              const certificatePath = certificatePaths[currentCertificateIndex];
              return (
            <div 
              style={{
                background: 'white',
                padding: '3rem',
                borderRadius: '20px',
                maxWidth: '600px',
                width: '100%',
                boxShadow: '0 25px 80px rgba(0,0,0,0.4)',
                border: '5px solid',
                borderImage: 'linear-gradient(135deg, #f59e0b, #ef4444, #8b5cf6, #3b82f6) 1',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Certificate Navigation */}
              {certificatePaths.length > 1 && (
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  fontSize: '0.875rem',
                  color: '#6b7280',
                  fontWeight: '600'
                }}>
                  Certificate {currentCertificateIndex + 1} of {certificatePaths.length}
                </div>
              )}
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏆</div>
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #8b5cf6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.5rem'
                }}>
                  Certificate of Completion
                </h2>
                <div style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '2rem'
                }}>
                  CRACKED - {certificatePath === 'business' ? '📊 Business & Marketing' : 
                            certificatePath === 'technical' ? '⚙️ Technical & Development' : 
                            '🔄 Hybrid & Analysis'} Path
                </div>
                
                <div style={{
                  padding: '1.5rem',
                  background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
                  borderRadius: '12px',
                  marginBottom: '2rem'
                }}>
                  <p style={{ fontSize: '1rem', color: '#4b5563', lineHeight: '1.7', marginBottom: '1rem' }}>
                    You've successfully completed all {certificatePath === 'business' ? 'business & marketing' : 
                    certificatePath === 'technical' ? 'technical & development' : 
                    'hybrid & analysis'} missions, demonstrating mastery of:
                  </p>
                  <ul style={{
                    fontSize: '0.9375rem',
                    color: '#6b7280',
                    lineHeight: '1.6',
                    textAlign: 'left',
                    paddingLeft: '1.5rem'
                  }}>
                    {certificatePath === 'business' && (
                      <>
                        <li>Market research automation</li>
                        <li>Multi-channel campaign generation</li>
                        <li>Content pipeline design</li>
                        <li>Advanced portfolio projects</li>
                      </>
                    )}
                    {certificatePath === 'technical' && (
                      <>
                        <li>AI-powered code generation</li>
                        <li>Data analysis & visualization</li>
                        <li>Technical automation</li>
                        <li>Advanced portfolio projects</li>
                      </>
                    )}
                    {certificatePath === 'hybrid' && (
                      <>
                        <li>Automated report generation</li>
                        <li>Workflow automation</li>
                        <li>Process optimization</li>
                        <li>Advanced portfolio projects</li>
                      </>
                    )}
                  </ul>
                </div>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.75rem',
                  marginBottom: '2rem'
                }}>
                  {pathBadges[certificatePath].includes('level3-complete') && (
                    <div style={{
                      padding: '0.75rem',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}>
                      ⭐ Level 3 Master
                    </div>
                  )}
                  {pathBadges[certificatePath].includes('level4-complete') && (
                    <div style={{
                      padding: '0.75rem',
                      background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '0.875rem',
                      fontWeight: '600'
                    }}>
                      🏆 Capstone Complete
                    </div>
                  )}
                  {pathBadges[certificatePath].includes('path-master') && (
                    <div style={{
                      padding: '0.75rem',
                      background: 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
                      borderRadius: '8px',
                      color: 'white',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      gridColumn: pathBadges[certificatePath].length === 3 ? 'auto' : '1 / -1'
                    }}>
                      💎 Path Master
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => setShowCertificate(false)}
                  style={{
                    padding: '1rem 2.5rem',
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: 'white',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                  }}
                >
                  {certificatePaths.length > 1 ? 'View All Paths →' : 'Continue Learning →'}
                </button>
                
                {/* Navigation between certificates */}
                {certificatePaths.length > 1 && (
                  <div style={{
                    marginTop: '1.5rem',
                    display: 'flex',
                    gap: '0.75rem',
                    justifyContent: 'center'
                  }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentCertificateIndex((prev) => Math.max(0, prev - 1));
                      }}
                      disabled={currentCertificateIndex === 0}
                      style={{
                        padding: '0.5rem 1rem',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: currentCertificateIndex === 0 ? '#9ca3af' : '#4b5563',
                        background: 'white',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        cursor: currentCertificateIndex === 0 ? 'not-allowed' : 'pointer'
                      }}
                    >
                      ← Previous
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentCertificateIndex((prev) => Math.min(certificatePaths.length - 1, prev + 1));
                      }}
                      disabled={currentCertificateIndex === certificatePaths.length - 1}
                      style={{
                        padding: '0.5rem 1rem',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: currentCertificateIndex === certificatePaths.length - 1 ? '#9ca3af' : '#4b5563',
                        background: 'white',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        cursor: currentCertificateIndex === certificatePaths.length - 1 ? 'not-allowed' : 'pointer'
                      }}
                    >
                      Next →
                    </button>
                  </div>
                )}
              </div>
            </div>
              );
            })()}
          </div>
        )}

        {/* Mission Selector */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '16px',
          marginBottom: '1.5rem',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)'
        }}>
          <select
            value={selectedMission}
            onChange={(e) => {
              setSelectedMission(e.target.value);
              setChecks({});
              setOutput('');
            }}
            style={{
              width: '100%',
              padding: '1rem',
              fontSize: '1rem',
              fontWeight: '600',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              background: 'white',
              cursor: 'pointer'
            }}
          >
            <option value="intro">📘 Welcome - Start Here!</option>
            <optgroup label="Level 1: Atomic Prompts">
              <option value="1.1">1.1: Precision Control</option>
              <option value="1.4">1.2: Few-Shot Learning</option>
              <option value="1.5">1.3: Chain-of-Thought Reasoning</option>
              <option value="1.6">1.4: Role Assignment</option>
              <option value="1.3">1.5: Context Efficiency</option>
              <option value="1.2">1.6: Structure Enforcement (XML)</option>
              <option value="1.7">1.7: Structured Output (JSON)</option>
            </optgroup>
            <optgroup label="Level 2: Compound Workflows">
              <option value="2.1">2.1: Sequential Chains</option>
              <option value="2.2">2.2: Feedback Loops</option>
              <option value="2.3">2.3: Error Recovery</option>
              <option value="2.4">2.4: Adversarial Defense</option>
              <option value="2.5">2.5: Token Optimization</option>
            </optgroup>
            <optgroup label="Level 3: Real-World Applications">
              <option value="3.1">3.1: Content Pipeline</option>
              {selectedPath === 'business' ? (
                <option value="3.2">3.2: Market Research Automation</option>
              ) : selectedPath === 'technical' ? (
                <option value="3.2">3.2: Data Analysis & Visualization</option>
              ) : selectedPath === 'hybrid' ? (
                <option value="3.2">3.2: Automated Report Generation</option>
              ) : (
                <option value="3.2">3.2: Choose your path first</option>
              )}
              <option value="3.3">3.3: Support Automation</option>
              {selectedPath === 'business' ? (
                <option value="3.4">3.4: Multi-Channel Campaign Generator</option>
              ) : selectedPath === 'technical' ? (
                <option value="3.4">3.4: AI-Powered Code Generation</option>
              ) : selectedPath === 'hybrid' ? (
                <option value="3.4">3.4: Workflow Automation Builder</option>
              ) : (
                <option value="3.4">3.4: Choose your path first</option>
              )}
            </optgroup>
            <optgroup label="🏆 Level 4: Portfolio Capstones">
              {selectedPath === 'business' ? (
                <>
                  <option value="4.1">4.1: Product Launch Orchestrator</option>
                  <option value="4.2">4.2: Customer Journey Intelligence</option>
                  <option value="4.3">4.3: Competitive Intelligence System</option>
                </>
              ) : selectedPath === 'technical' ? (
                <>
                  <option value="4.1">4.1: API Integration System</option>
                  <option value="4.2">4.2: ML Pipeline Builder</option>
                  <option value="4.3">4.3: Infrastructure-as-Code</option>
                </>
              ) : selectedPath === 'hybrid' ? (
                <>
                  <option value="4.1">4.1: BI Dashboard Builder</option>
                  <option value="4.2">4.2: Compliance Analyzer</option>
                  <option value="4.3">4.3: Strategic Decision Analyzer</option>
                </>
              ) : (
                <>
                  <option value="4.1">4.1: Portfolio Capstone (choose path first)</option>
                  <option value="4.2">4.2: Portfolio Capstone (choose path first)</option>
                  <option value="4.3">4.3: Portfolio Capstone (choose path first)</option>
                </>
              )}
            </optgroup>
          </select>
          {mission && (
            <div style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: '#6b7280' }}>
              Level {mission.level}: {levelName}
            </div>
          )}
        </div>

        {/* Intro Page or Mission Instructions */}
        {selectedMission === 'intro' ? (
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '16px',
            marginBottom: '1.5rem',
            boxShadow: '0 10px 40px rgba(0,0,0,0.15)'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem'
            }}>
              Welcome to CRACKED 🚀
            </h2>

            <p style={{ fontSize: '1.125rem', lineHeight: '1.7', color: '#4b5563', marginBottom: '2rem' }}>
              Learn <strong>prompt engineering</strong> through hands-on practice. Master writing instructions that make AI do exactly what you want.
            </p>

            <div style={{
              background: '#f0f9ff',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '2px solid #3b82f6',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '700',
                color: '#1e40af',
                marginBottom: '1rem'
              }}>
                📖 How It Works
              </h3>
              <ol style={{
                margin: 0,
                paddingLeft: '1.5rem',
                color: '#1e3a8a',
                fontSize: '0.9375rem'
              }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  Read the mission challenge
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  Write a prompt for Claude AI
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  Test at <a href="https://claude.ai" target="_blank" style={{ color: '#2563eb', fontWeight: '600' }}>claude.ai</a> (free account)
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  Paste Claude's output below
                </li>
                <li style={{ marginBottom: '0' }}>
                  Get instant feedback
                </li>
              </ol>
            </div>

            <div style={{
              background: '#fef3c7',
              padding: '1.25rem',
              borderRadius: '12px',
              border: '2px solid #f59e0b',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{
                fontSize: '1rem',
                fontWeight: '700',
                color: '#92400e',
                marginBottom: '0.5rem'
              }}>
                ⚠️ Important
              </h3>
              <p style={{ margin: 0, color: '#78350f', fontSize: '0.9375rem', lineHeight: '1.5' }}>
                Submit <strong>Claude's output</strong> (what Claude wrote), not your prompt. The evaluator checks Claude's response quality.
              </p>
            </div>

            <div style={{
              background: '#f0fdf4',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '2px solid #10b981',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '700',
                color: '#065f46',
                marginBottom: '1rem'
              }}>
                🎯 Your Learning Path
              </h3>
              <div style={{ color: '#064e3b', fontSize: '0.9375rem', lineHeight: '1.6' }}>
                <p style={{ marginBottom: '0.75rem' }}>
                  <strong>Level 1-2:</strong> Master fundamentals (12 missions) — everyone takes these
                </p>
                <p style={{ marginBottom: '0.75rem' }}>
                  <strong>Level 3:</strong> Choose your path — Business, Technical, or Hybrid (4 missions)
                </p>
                <p style={{ marginBottom: '0' }}>
                  <strong>🏆 Level 4:</strong> Complete capstone projects — earn certificates & badges (3 missions)
                </p>
              </div>
            </div>

            <div style={{
              background: '#ede9fe',
              padding: '1.25rem',
              borderRadius: '12px',
              border: '2px solid #a78bfa',
              marginBottom: '2rem'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '1rem',
                textAlign: 'center'
              }}>
                <div>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>📊</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#5b21b6' }}>Business Path</div>
                  <div style={{ fontSize: '0.6875rem', color: '#7c3aed' }}>Marketing & Content</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>⚙️</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#5b21b6' }}>Technical Path</div>
                  <div style={{ fontSize: '0.6875rem', color: '#7c3aed' }}>Code & Data</div>
                </div>
                <div>
                  <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🔄</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: '600', color: '#5b21b6' }}>Hybrid Path</div>
                  <div style={{ fontSize: '0.6875rem', color: '#7c3aed' }}>Analysis & Process</div>
                </div>
              </div>
              <p style={{
                margin: '1rem 0 0 0',
                fontSize: '0.8125rem',
                color: '#6b21a8',
                textAlign: 'center',
                fontStyle: 'italic'
              }}>
                💡 Complete 1, 2, or all 3 paths — earn certificates for each!
              </p>
            </div>

            <div style={{
              textAlign: 'center'
            }}>
              <button
                onClick={() => setSelectedMission('1.1')}
                style={{
                  padding: '1rem 2.5rem',
                  fontSize: '1.125rem',
                  fontWeight: '700',
                  color: 'white',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                }}
              >
                Start Mission 1.1 →
              </button>
              <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                ~2 hours for Level 1 • No coding required
              </p>
            </div>
          </div>
        ) : (
          <>
        {/* Instructions */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '16px',
          marginBottom: '1.5rem',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
          border: '2px solid #ddd6fe'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '700',
            color: '#5b21b6',
            marginBottom: '1rem'
          }}>
            📋 Mission Instructions
          </h3>
          
          {/* Claude.ai Quick Link */}
          <div style={{ marginBottom: '1rem' }}>
            <a 
              href="https://claude.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '0.5rem 1rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                fontWeight: '600',
                fontSize: '0.875rem',
                borderRadius: '8px',
                textDecoration: 'none',
                boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.3)';
              }}
            >
              🔗 Open Claude.ai to Test Your Prompt
            </a>
          </div>
          
          <div style={{ fontSize: '0.9375rem', color: '#1f2937', lineHeight: '1.6', marginBottom: '1rem' }}>
            {mission.instructions.scenario}
          </div>

          {mission.instructions.xmlContext && (
            <div style={{
              background: '#eff6ff',
              padding: '1rem',
              borderRadius: '8px',
              border: '2px solid #3b82f6',
              marginBottom: '1rem'
            }}>
              <div style={{ 
                fontSize: '0.875rem', 
                color: '#1e40af', 
                lineHeight: '1.6',
                whiteSpace: 'pre-line'
              }}>
                {mission.instructions.xmlContext}
              </div>
            </div>
          )}

          {mission.instructions.codeContext && (
            <div style={{
              background: '#f0fdf4',
              padding: '1rem',
              borderRadius: '8px',
              border: '2px solid #10b981',
              marginBottom: '1rem'
            }}>
              <div style={{ 
                fontSize: '0.875rem', 
                color: '#065f46', 
                lineHeight: '1.6',
                whiteSpace: 'pre-line'
              }}>
                {mission.instructions.codeContext}
              </div>
            </div>
          )}

          {mission.instructions.data && (
            <div style={{ marginBottom: '1rem' }}>
              {/* Collapsible Header */}
              <div 
                onClick={() => setSampleDataExpanded(!sampleDataExpanded)}
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  padding: '0.75rem 1rem',
                  background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                  border: '2px solid #d1d5db',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  userSelect: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)';
                }}
              >
                <div style={{ 
                  fontSize: '0.875rem', 
                  fontWeight: '700', 
                  color: '#374151',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{ 
                    fontSize: '1rem',
                    transition: 'transform 0.2s',
                    transform: sampleDataExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                    display: 'inline-block'
                  }}>
                    ▶
                  </span>
                  📋 Sample Data
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: '#6b7280'
                }}>
                  {sampleDataExpanded ? 'Click to collapse' : 'Click to expand'}
                </div>
              </div>

              {/* Collapsible Content */}
              {sampleDataExpanded && (
                <div style={{
                  marginTop: '0.5rem',
                  animation: 'slideDown 0.2s ease-out'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    marginBottom: '0.5rem'
                  }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigator.clipboard.writeText(mission.instructions.data);
                      }}
                      style={{
                        padding: '0.375rem 0.75rem',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: '#5b21b6',
                        background: '#f3f4f6',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#e5e7eb';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#f3f4f6';
                      }}
                    >
                      📋 Copy Data
                    </button>
                  </div>
                  <pre style={{ 
                    fontSize: '0.8125rem', 
                    color: '#374151', 
                    background: '#f9fafb',
                    padding: '0.875rem',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    overflow: 'auto',
                    marginBottom: '0',
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'monospace'
                  }}>
                    {mission.instructions.data}
                  </pre>
                </div>
              )}
            </div>
          )}

          {mission.instructions.questions && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: '700', color: '#6b7280', marginBottom: '0.5rem' }}>
                ❓ Questions to Test (Claude must answer all 5 correctly):
              </div>
              <ol style={{ 
                margin: '0',
                paddingLeft: '1.5rem',
                listStyleType: 'decimal'
              }}>
                {mission.instructions.questions.map((q, idx) => (
                  <li key={idx} style={{
                    fontSize: '0.875rem',
                    color: '#374151',
                    lineHeight: '1.6',
                    marginBottom: '0.25rem'
                  }}>
                    {q}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {mission.instructions.template && (
            <pre style={{ 
              fontSize: '0.8125rem', 
              color: '#374151', 
              background: '#f9fafb',
              padding: '0.875rem',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              overflow: 'auto',
              marginBottom: '1rem',
              whiteSpace: 'pre-wrap'
            }}>
              {mission.instructions.template}
            </pre>
          )}

          {mission.instructions.requirements && (
            <ul style={{ 
              margin: '0 0 1rem 0',
              paddingLeft: '1.5rem',
              listStyleType: 'disc'
            }}>
              {mission.instructions.requirements.map((req, idx) => (
                <li key={idx} style={{
                  fontSize: '0.9375rem',
                  color: '#1f2937',
                  lineHeight: '1.8',
                  marginBottom: '0.375rem'
                }}>
                  {req}
                </li>
              ))}
            </ul>
          )}

          {mission.instructions.why && (
            <div style={{ 
              padding: '0.875rem',
              background: '#fef3c7',
              borderRadius: '8px',
              border: '1px solid #fbbf24',
              marginBottom: '1rem'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#78350f', lineHeight: '1.5' }}>
                {mission.instructions.why}
              </div>
            </div>
          )}

          {mission.instructions.example && (
            <div style={{ 
              fontSize: '0.875rem', 
              color: '#6b7280', 
              fontStyle: 'italic', 
              marginBottom: '1rem',
              padding: '0.75rem',
              background: '#f9fafb',
              borderRadius: '8px',
              borderLeft: '3px solid #9ca3af'
            }}>
              {mission.instructions.example}
            </div>
          )}

          {mission.instructions.examples && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: '700', color: '#6b7280', marginBottom: '0.5rem' }}>
                Examples:
              </div>
              <ul style={{ 
                margin: '0',
                paddingLeft: '1.5rem',
                listStyleType: 'disc'
              }}>
                {mission.instructions.examples.map((ex, idx) => (
                  <li key={idx} style={{
                    fontSize: '0.875rem',
                    color: '#4b5563',
                    lineHeight: '1.6',
                    marginBottom: '0.25rem'
                  }}>
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {mission.instructions.goal && (
            <div style={{ 
              padding: '0.875rem',
              background: '#f0fdf4',
              borderRadius: '8px',
              border: '1px solid #86efac',
              marginBottom: mission.instructions.portfolio ? '0.75rem' : '0'
            }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: '700', color: '#15803d', marginBottom: '0.25rem' }}>
                🎯 What You'll Learn
              </div>
              <div style={{ fontSize: '0.875rem', color: '#166534', lineHeight: '1.5' }}>
                {mission.instructions.goal}
              </div>
            </div>
          )}

          {mission.instructions.portfolio && (
            <div style={{ 
              padding: '0.875rem',
              background: '#dbeafe',
              borderRadius: '8px',
              border: '1px solid #60a5fa'
            }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: '700', color: '#1e3a8a', marginBottom: '0.25rem' }}>
                📁 Portfolio Value
              </div>
              <div style={{ fontSize: '0.875rem', color: '#1e40af', lineHeight: '1.5' }}>
                {mission.instructions.portfolio}
              </div>
            </div>
          )}
        </div>

        {/* Output Input */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '16px',
          marginBottom: '1.5rem',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)'
        }}>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '700',
            color: '#374151',
            marginBottom: '0.75rem'
          }}>
            Paste Your Output
          </label>
          <textarea
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            placeholder="Paste Claude's output here... (Tip: Open https://claude.ai in a new tab)"
            style={{
              width: '100%',
              minHeight: '250px',
              padding: '0.875rem',
              fontSize: '0.9375rem',
              lineHeight: '1.6',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              fontFamily: 'monospace',
              resize: 'vertical'
            }}
          />
          <button
            onClick={runChecks}
            style={{
              marginTop: '1rem',
              padding: '0.875rem 1.75rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '0.9375rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Sparkles size={18} />
            Run Smart Checks
          </button>
        </div>

        {/* Criteria */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '16px',
          marginBottom: '1.5rem',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#111827', margin: 0 }}>
              Success Criteria
            </h3>
            <div style={{ 
              fontSize: '0.875rem', 
              fontWeight: '600',
              color: allPassed ? '#059669' : '#6b7280',
              padding: '0.375rem 0.875rem',
              background: allPassed ? '#d1fae5' : '#f3f4f6',
              borderRadius: '9999px'
            }}>
              {passed}/{required} passed
            </div>
          </div>

          {/* Manual Criteria Explanation */}
          {mission.criteria.some(c => !c.auto) && (
            <div style={{
              padding: '0.75rem',
              background: '#fef3c7',
              borderRadius: '8px',
              fontSize: '0.8125rem',
              color: '#92400e',
              marginBottom: '0.75rem',
              border: '1px solid #fcd34d'
            }}>
              💡 <strong>Manual checks:</strong> Some criteria can't be auto-checked. Review your output and check the box if you believe you met the requirement. Be honest - you're only cheating yourself!
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {mission.criteria.map(criterion => (
              <div
                key={criterion.id}
                onClick={() => !criterion.auto && handleCheck(criterion.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem',
                  background: checks[criterion.id] ? '#ecfdf5' : '#f9fafb',
                  border: `2px solid ${checks[criterion.id] ? '#10b981' : '#e5e7eb'}`,
                  borderRadius: '12px',
                  cursor: criterion.auto ? 'default' : 'pointer'
                }}
              >
                {checks[criterion.id] ? (
                  <CheckCircle size={22} style={{ color: '#10b981' }} />
                ) : (
                  <Circle size={22} style={{ color: '#d1d5db' }} />
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.9375rem', color: '#111827', fontWeight: '500' }}>
                    {criterion.label}
                  </div>
                  {criterion.auto && (
                    <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: '0.25rem' }}>
                      Auto-verified
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '16px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.15)'
        }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#111827', marginBottom: '1rem' }}>
            {allPassed ? '✅ Success!' : '⚠️ Keep Iterating'}
          </h3>
          
          <div style={{
            padding: '1.25rem',
            background: allPassed ? '#dbeafe' : '#fef3c7',
            borderRadius: '12px',
            border: `2px solid ${allPassed ? '#93c5fd' : '#fcd34d'}`
          }}>
            <div style={{ fontSize: '0.9375rem', color: '#1f2937', lineHeight: '1.6' }}>
              {allPassed 
                ? '🎉 All required criteria passed! Ready to move to next mission.' 
                : '⚠️ Review the failed criteria and iterate on your prompt.'}
            </div>
          </div>
        </div>
        </>
        )}

      </div>
    </div>
  );
}

