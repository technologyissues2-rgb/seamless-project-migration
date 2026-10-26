/**
 * Research content shared across the homepage and the research content pages.
 * Written in respectful, non-stigmatizing language. Effects are described as
 * varying between individuals and circumstances.
 */

export const researchBackground = `Substance use among young people remains a pressing public-health concern worldwide. The World Health Organization and the UN Office on Drugs and Drugs and Crime both report that a substantial share of people who develop substance-use disorders begin using substances during adolescence and early adulthood — a period when the brain, education trajectories, and social relationships are still developing. In many communities, rising availability, social pressure, and limited youth-friendly support services compound the problem.`;

export const problemStatement = `Although the general harms of substance abuse are widely acknowledged, communities and policymakers often lack localized, structured evidence about how substance use specifically affects young people's health, education, family life, employment, and finances. Without such evidence, prevention programmes and support services risk being poorly targeted, underfunded, or disconnected from the realities young people face.`;

export const mainObjective = `To examine the socio-economic and health-related effects of substance abuse among youths (aged 18 and above) in order to inform prevention, treatment, and policy responses.`;

export const specificObjectives = [
  "To assess young people's awareness and perceptions of substance abuse and its effects.",
  "To examine perceived effects of substance abuse on physical and mental health among youths.",
  "To examine perceived effects on education, employment, family relationships, and household finances.",
  "To identify barriers that prevent young people from seeking prevention and treatment services.",
  "To generate evidence that can guide youth-focused prevention strategies and community support programmes.",
];

export const researchQuestions = [
  "How aware are young people of the health and socio-economic effects of substance abuse?",
  "What effects do respondents perceive substance abuse to have on physical and mental health?",
  "What effects do respondents perceive on education, employment, family relationships, and finances?",
  "What barriers limit young people's access to prevention and treatment services?",
  "What measures do respondents believe would best support young people?",
];

export const significance = `The study gives young people, families, educators, health workers, and policymakers a clearer, evidence-based picture of how substance abuse shapes youth wellbeing. Findings can support the design of prevention curricula, youth-friendly counselling and treatment services, family support programmes, and community awareness campaigns — and provide a baseline for future monitoring.`;

export interface EffectSection {
  title: string;
  body: string;
  points: string[];
}

export const healthEffectsSections: EffectSection[] = [
  {
    title: "Physical health",
    body: "Substances affect nearly every organ system, and the risk of harm grows with the amount, frequency, and duration of use. Young bodies are still developing, which can make some harms appear earlier and hit harder.",
    points: [
      "Damage to the liver, heart, lungs, and other organs over time",
      "Higher risk of injuries, accidents, and violence while intoxicated",
      "Risk of overdose, which can be fatal even with first-time use",
      "Weakened immune function and, with some routes of use, infection risks",
      "Disrupted sleep, appetite, and physical development",
    ],
  },
  {
    title: "Mental health and wellbeing",
    body: "Substance use and mental health are closely intertwined. Each can worsen the other, and the relationship varies from person to person — use does not affect everyone in the same way.",
    points: [
      "Strong associations with anxiety, depression, and emotional distress",
      "Elevated risk of psychosis, particularly with high-potency cannabis use in young people",
      "Substances used to cope with distress can deepen it over time",
      "Strained self-esteem, motivation, and sense of identity",
      "Increased risk of self-harm and suicide among heavily affected young people",
    ],
  },
  {
    title: "Addiction and dependence",
    body: "The brain continues developing into the mid-twenties. The earlier substance use begins, the greater the likelihood of developing a substance-use disorder — a treatable medical condition, not a moral failing.",
    points: [
      "Tolerance and withdrawal symptoms with regular use",
      "Escalating use despite clear harm to health, studies, or relationships",
      "Difficulty stopping without structured support",
      "Earlier onset of use is strongly linked with later dependence",
      "Recovery is achievable, and many young people do recover with treatment and support",
    ],
  },
  {
    title: "Education and learning",
    body: "Health harms reach into the classroom. Concentration, memory, and attendance are often the first casualties, and falling behind compounds stress and disengagement.",
    points: [
      "Reduced concentration, memory, and learning capacity",
      "Missed classes, incomplete coursework, and declining grades",
      "Higher rates of dropout and delayed graduation",
      "Loss of scholarships, placements, and academic opportunities",
    ],
  },
  {
    title: "Access to treatment",
    body: "Many young people who need help never reach it. Stigma, cost, distance, and services that are not designed for youth all stand in the way — and early access makes recovery far more likely.",
    points: [
      "Stigma and fear of judgement deter young people from seeking help",
      "Limited availability of youth-friendly counselling and treatment",
      "Cost and distance barriers, especially outside major cities",
      "Low awareness of where and how to seek support",
      "Confidential, low-threshold services improve early engagement",
    ],
  },
];

export const socioEffectsSections: EffectSection[] = [
  {
    title: "Family relationships",
    body: "Substance abuse strains the people closest to the affected young person. Trust erodes, conflict rises, and family members often carry emotional and financial burdens of their own.",
    points: [
      "Breakdown of trust and communication within the household",
      "Conflict, domestic tension, and in some cases violence or neglect",
      "Parents and siblings experiencing stress, shame, and exhaustion",
      "Family resources diverted to crises, debts, or treatment costs",
    ],
  },
  {
    title: "Education",
    body: "Disrupted schooling narrows a young person's options for decades. The effects reach beyond the individual to classrooms and schools that absorb disengagement and dropout.",
    points: [
      "Declining academic performance and school completion",
      "Truancy, disciplinary action, and exclusion",
      "Loss of confidence and narrowed ambitions",
      "Ripple effects on classmates and school climate",
    ],
  },
  {
    title: "Employment and productivity",
    body: "Substance abuse undermines the foundations of early working life — reliability, health, and skills — precisely when young people are trying to establish themselves.",
    points: [
      "Absenteeism, lateness, and lost jobs",
      "Reduced productivity and workplace accidents",
      "Difficulty completing training, apprenticeships, and probation periods",
      "Scars on résumés that follow young workers for years",
    ],
  },
  {
    title: "Household finances",
    body: "Substances are expensive, and their cost multiplies through lost income, debt, and crisis spending. Households with limited margins feel this most sharply.",
    points: [
      "Direct spending on substances crowding out essentials",
      "Debt, borrowing, and in some cases illicit income pathways",
      "Lost household earnings from lost jobs and impaired work",
      "Money diverted to treatment, legal costs, and crisis response",
    ],
  },
  {
    title: "Community safety",
    body: "Concentrated substance abuse problems affect whole neighbourhoods, shaping how safe people feel and how much they trust local institutions.",
    points: [
      "Increased petty crime and public disorder around use hotspots",
      "Young people recruited into drug supply networks",
      "Weakened community cohesion and public trust",
      "Higher policing, health, and social-service costs",
    ],
  },
  {
    title: "Social stigma",
    body: "Stigma is itself a socio-economic harm. It silences young people who need help, isolates families, and pushes problems underground where they grow worse.",
    points: [
      "Shame and labelling that discourage help-seeking",
      "Exclusion from peer groups, school activities, and employment",
      "Families hiding problems and delaying support",
      "Stigma-aware, compassionate messaging reduces these harms",
    ],
  },
];

export const researchLimitations = [
  "The survey is anonymous and self-reported; perceptions of effects may differ from clinically measured outcomes.",
  "Respondents are aged 18 and above; experiences of minors are outside this study's scope pending ethics approval.",
  "Samples collected online may over-represent young people with internet access.",
  "Cross-sectional responses describe perceptions at one point in time and cannot by themselves establish causation.",
  "Results should be read as community perception data, not diagnostic or clinical data.",
];

export interface Reference {
  title: string;
  organization: string;
  url: string;
  note: string;
}

export const references: Reference[] = [
  {
    title: "Substance abuse — health topic overview",
    organization: "World Health Organization (WHO)",
    url: "https://www.who.int/health-topics/substance-abuse",
    note: "WHO's overview of substance abuse: health impacts, prevention, and treatment. Verify current link and publication details at who.int.",
  },
  {
    title: "Mental health — health topic overview",
    organization: "World Health Organization (WHO)",
    url: "https://www.who.int/health-topics/mental-health",
    note: "WHO fact sheets and resources on mental health, including links between substance use and mental disorders.",
  },
  {
    title: "Alcohol — health topic overview",
    organization: "World Health Organization (WHO)",
    url: "https://www.who.int/health-topics/alcohol",
    note: "WHO resources on alcohol consumption, harms, and the global strategy to reduce harmful use.",
  },
  {
    title: "Drugs and drug policy",
    organization: "United Nations Office on Drugs and Crime (UNODC)",
    url: "https://www.unodc.org/unodc/en/drugs/index.html",
    note: "UNODC's portal on world drug problems, prevention, and treatment standards.",
  },
  {
    title: "World Drug Report",
    organization: "United Nations Office on Drugs and Crime (UNODC)",
    url: "https://www.unodc.org/unodc/en/data-and-analysis/world-drug-report.html",
    note: "UNODC's annual flagship report on global drug markets and use patterns. Consult the latest edition for current figures.",
  },
  {
    title: "International Standards on Drug Use Prevention",
    organization: "UNODC and WHO",
    url: "https://www.unodc.org/unodc/en/drug-prevention-and-treatment/international-standards-on-drug-use-prevention.html",
    note: "Evidence-based standards for effective drug-use prevention programming.",
  },
  {
    title: "Adolescent health",
    organization: "UNICEF",
    url: "https://www.unicef.org/health/adolescent-health",
    note: "UNICEF resources on adolescent health and development, including risk behaviours.",
  },
  {
    title: "Youth risk behaviour surveillance",
    organization: "Centers for Disease Control and Prevention (CDC)",
    url: "https://www.cdc.gov/healthyyouth/index.html",
    note: "CDC school-based surveillance of health behaviours among young people.",
  },
];

export const preventionStrategies: EffectSection[] = [
  {
    title: "Prevention that starts early",
    body: "The most effective prevention reaches young people before harmful patterns form — through schools, families, and communities, not through fear alone.",
    points: [
      "Life-skills and social-emotional learning programmes in schools",
      "Evidence-based family skills programmes",
      "Accurate, non-judgemental drug education from credible sources",
      "Restricting availability and marketing targeting young people",
    ],
  },
  {
    title: "Support for young people",
    body: "Young people need low-threshold, confidential places to turn — before a crisis, not only after one.",
    points: [
      "Youth-friendly counselling and peer-support groups",
      "Confidential helplines and online self-help resources",
      "Recreational, sports, and livelihood programmes that build belonging",
      "Clear, respectful pathways into treatment when needed",
    ],
  },
  {
    title: "Guidance for families",
    body: "Families respond best with calm, informed support rather than confrontation or shame.",
    points: [
      "Open, non-judgemental conversations early",
      "Learning the signs of harmful use and where local help is available",
      "Setting supportive boundaries while staying connected",
      "Seeking family counselling; carers need support too",
    ],
  },
  {
    title: "Treatment and recovery",
    body: "Substance-use disorders are treatable medical conditions. Recovery is more likely when care is early, integrated, and sustained.",
    points: [
      "Screening and brief intervention in schools and primary care",
      "Psychosocial support (counselling, CBT, contingency management)",
      "Medically supervised treatment and, where indicated, medication",
      "Aftercare, education re-entry, and employment support for sustained recovery",
    ],
  },
];
