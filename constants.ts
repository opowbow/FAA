import { Course, CourseType } from './types';

export const APP_NAME = "Future Architects Academy";

export const COURSES: Course[] = [
  {
    id: 'track-1-finance',
    title: 'The New Economy',
    subtitle: 'Finance, Crypto & Investing',
    description: 'Understand value, ownership, and wealth generation. Move beyond traditional banking into the world of DeFi and Blockchain.',
    price: 299,
    type: CourseType.LIVE_COHORT,
    image: 'https://picsum.photos/800/600?grayscale&blur=2',
    modules: [
      {
        title: '1.1 Evolution of Money',
        description: 'From Barter to Bitcoin. Understanding scarcity, portability, and the history of financial crises.',
        topics: ['Gold Standard vs Fiat', 'Inflation Dynamics', 'Blockchain as Digital Ledger']
      },
      {
        title: '1.2 Wall St. vs Blockchain',
        description: 'Centralized vs Decentralized Finance. Learning the mechanics of stocks, tokens, and compound interest.',
        topics: ['Stocks vs Tokens', 'Compound Interest', 'Portfolio Allocation Strategies']
      },
      {
        title: '1.3 Digital Ownership',
        description: 'Cyber-hygiene and security. "Not your keys, not your coins."',
        topics: ['Hot vs Cold Wallets', 'Seed Phrase Security', 'Smart Contracts']
      }
    ]
  },
  {
    id: 'track-2-cloud',
    title: 'The Invisible Engine',
    subtitle: 'Cloud Computing & IT',
    description: 'Learn how the internet actually works. Shift from buying computers to renting global computing power.',
    price: 249,
    type: CourseType.SELF_PACED,
    image: 'https://picsum.photos/801/600?grayscale&blur=2',
    modules: [
      {
        title: '2.1 Where Does the Internet Live?',
        description: 'Demystifying servers, data centers, and undersea cables.',
        topics: ['Client-Server Model', 'Load Balancing', 'Network Infrastructure']
      },
      {
        title: '2.2 The Cloud Revolution',
        description: 'Scaling from 1 user to 1 million instantly using AWS/Azure/GCP concepts.',
        topics: ['IaaS vs PaaS vs SaaS', 'Virtual Machines', 'Cloud Economics']
      }
    ]
  },
  {
    id: 'track-3-ai',
    title: 'The AI Revolution',
    subtitle: 'LLMs & Agents',
    description: 'Move beyond asking chatbots questions. Learn to build AI workflows and understand the math behind the magic.',
    price: 349,
    type: CourseType.LIVE_COHORT,
    image: 'https://picsum.photos/802/600?grayscale&blur=2',
    modules: [
      {
        title: '3.1 The Brain in the Box',
        description: 'Understanding Machine Learning, Generative AI, and LLMs.',
        topics: ['Prediction Models', 'Bias & Hallucinations', 'AI Guardrails']
      },
      {
        title: '3.2 Prompt Engineering',
        description: 'Advanced prompting techniques to control AI output quality.',
        topics: ['Zero-shot vs Few-shot', 'Chain of Thought', 'Persona Design']
      },
      {
        title: '3.3 The Rise of Agents',
        description: 'Building AI that takes action, not just generates text.',
        topics: ['Perception-Think-Act Loop', 'API Integration', 'Agent Workflows']
      }
    ]
  },
  {
    id: 'track-4-capstone',
    title: 'Startup Simulation',
    subtitle: 'The Capstone Project',
    description: 'The ultimate test. Form a team, pitch a product, and build an MVP using Cloud, AI, and Crypto concepts.',
    price: 399,
    type: CourseType.WORKSHOP,
    image: 'https://picsum.photos/803/600?grayscale&blur=2',
    modules: [
      {
        title: '4.1 The Pitch',
        description: 'Propose a tech product that integrates Cloud, AI, and Economic models.',
        topics: ['Ideation', 'Business Modeling', 'Feasibility']
      },
      {
        title: '4.2 The Build',
        description: 'Hackathon style MVP creation using no-code tools and Python.',
        topics: ['Rapid Prototyping', 'Integration', 'Deployment']
      },
      {
        title: '4.3 Demo Day',
        description: 'Present working prototypes to parents and instructors.',
        topics: ['Public Speaking', 'Product Demo', 'Investment Pitch']
      }
    ]
  }
];