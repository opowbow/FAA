import { Course, CourseType } from './types';

export const APP_NAME = "Tuigim - The Technology Learning Place";

export const COURSES: Course[] = [
  {
    id: 'track-1-finance',
    title: 'The Digital Economy',
    subtitle: 'Finance, Crypto and Investing',
    description: 'In a world where digital assets and global markets shift in the blink of an eye, financial literacy is no longer just a "bonus" skill—it is a survival requirement. This course bridges the gap between traditional banking and the decentralized future, turning tech-savvy students into informed wealth builders.\n\nWhy This Course Matters Today\nThe financial landscape has changed more in the last decade than in the previous century. For today’s teens, "money" isn\'t just paper in a wallet; it’s code, community, and compound interest. We move beyond boring lectures to show students how to navigate inflation, digital ownership, and market volatility with confidence.',
    price: 299,
    type: CourseType.LIVE_COHORT,
    image: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&w=800&q=80',
    modules: [
      {
        title: '1. The Evolution of Money',
        description: 'Concept: Understanding scarcity and the hidden "tax" of inflation.',
        image: 'https://images.unsplash.com/photo-1518458084748-6334538a3e3d?auto=format&fit=crop&w=600&q=80',
        topics: [
          'Key Topics: Gold standards, the birth of Bitcoin, and digital ledgers.',
          'Activity: "The Inflation Game" – A high-energy simulation where students experience firsthand how printing more money devalues their hard-earned "classroom cash".'
        ]
      },
      {
        title: '2. Wall Street vs. The Blockchain',
        description: 'Concept: Comparing the power of centralized banks vs. decentralized networks.',
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80',
        topics: [
          'Key Topics: Stocks (company ownership), Tokens (network ownership), and the "8th Wonder of the World"—Compound Interest.',
          'Activity: "The $100k Challenge" – Students use the Investopedia Simulator to manage a 50/50 portfolio of stocks and crypto, tracking real market moves in real-time.'
        ]
      },
      {
        title: '3. Digital Ownership & Security',
        description: 'Concept: "Not your keys, not your coins." Learning the laws of the digital frontier.',
        image: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?auto=format&fit=crop&w=600&q=80',
        topics: [
          'Key Topics: Hot vs. Cold storage, Seed Phrases, and Smart Contracts.',
          'Activity: "The Wallet Setup" – Students create non-custodial wallets and practice sending "TestNet" tokens, mastering cyber-hygiene before they ever touch a real dollar.'
        ]
      },
      {
        title: 'The Grand Finale: "The Portfolio Manager" Capstone',
        description: 'Students don\'t just leave with a certificate; they leave with a strategy.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
        topics: [
          'Project: Present $100k portfolio results, defending investment choices and outlining security protocols.',
          'To the Parents: Give your child the edge that traditional schools don\'t.',
          'To the Students: Stop watching the economy from the sidelines—start building your own.'
        ]
      }
    ]
  },
  {
    id: 'track-2-cloud',
    title: 'Cloud Computing',
    subtitle: 'The Invisible Engine; How does it work?',
    description: 'Learn how the internet actually works. Shift from buying computers to renting global computing power.',
    price: 249,
    type: CourseType.SELF_PACED,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    modules: [
      {
        title: '1. Where Does the Internet Live?',
        description: 'Demystifying servers, data centers, and undersea cables.',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&w=600&q=80',
        topics: ['Client-Server Model', 'Load Balancing', 'Network Infrastructure']
      },
      {
        title: '2. The Cloud Revolution',
        description: 'Scaling from 1 user to 1 million instantly using AWS/Azure/GCP concepts.',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
        topics: ['IaaS vs PaaS vs SaaS', 'Virtual Machines', 'Cloud Economics']
      }
    ]
  },
  {
    id: 'track-3-ai',
    title: 'Embracing the AI Revolution',
    subtitle: 'Behind the AI curtain',
    description: 'Move beyond asking chatbots questions. Learn to build AI workflows and understand the math behind the magic.',
    price: 349,
    type: CourseType.LIVE_COHORT,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
    modules: [
      {
        title: '1. The Brain in the Box',
        description: 'Understanding Machine Learning, Generative AI, and LLMs.',
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80',
        topics: ['Prediction Models', 'Bias & Hallucinations', 'AI Guardrails']
      },
      {
        title: '2. Prompt Engineering',
        description: 'Advanced prompting techniques to control AI output quality.',
        image: 'https://images.unsplash.com/photo-1676299081847-824916de030a?auto=format&fit=crop&w=600&q=80',
        topics: ['Zero-shot vs Few-shot', 'Chain of Thought', 'Persona Design']
      },
      {
        title: '3. The Rise of Agents',
        description: 'Building AI that takes action, not just generates text.',
        image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd05a?auto=format&fit=crop&w=600&q=80',
        topics: ['Perception-Think-Act Loop', 'API Integration', 'Agent Workflows']
      }
    ]
  },
  {
    id: 'track-4-maths',
    title: 'Real Life Maths',
    subtitle: 'Its everywhere and in Everything',
    description: 'Demonstrating the practical application of mathematical concepts in daily life, from sports and cooking to architecture and probability.',
    price: 399,
    type: CourseType.WORKSHOP,
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
    modules: [
      {
        title: '1. The Architect’s Blueprint (Geometry & Measurement)',
        description: 'Math is the language of physical space. If the math is wrong, the building falls down.',
        image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80',
        topics: ['Scale and Proportion', 'Angles and Stability', 'Volume and Area', 'Activity: The Tiny Home Challenge']
      },
      {
        title: '2. The Master Chef’s Ratio (Fractions & Conversions)',
        description: 'Cooking is chemistry, and chemistry is math.',
        image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80',
        topics: ['Scaling Recipes', 'Unit Conversions', 'Temperature and Time', 'Activity: The Great Bake-Off Simulation']
      },
      {
        title: '3. The Probability of Winning (Statistics & Logic)',
        description: 'Life is a series of bets. Math helps you pick the winning side.',
        image: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=600&q=80',
        topics: ['Probability & The Gambler’s Fallacy', 'Sports Analytics', 'Risk Assessment', 'Activity: The Fantasy League Draft']
      },
      {
        title: '4. The Secret Language of Nature (The Fibonacci Sequence & Pi)',
        description: 'Math isn\'t just man-made; it’s the code the universe is written in.',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80',
        topics: ['The Golden Ratio', 'Pi in the Real World', 'Fractals', 'Activity: Nature Scavenger Hunt']
      },
      {
        title: 'Capstone: The Budget for Life',
        description: 'Use all math tracks to plan a "Life Simulation".',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80',
        topics: ['Calculate take-home pay', 'Rent an apartment (Geometry)', 'Meal budget (Ratios)', 'Investment decisions (Probability)']
      }
    ]
  }
];