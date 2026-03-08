
import React from 'react';
import { Resource, VideoResource, Quiz } from './types';

export interface ChapterConfig {
  '1st': string[];
  '2nd': string[];
}

export const SUBJECT_CHAPTERS: Record<string, ChapterConfig | string[]> = {
  'Physics': {
    '1st': ['Vector', 'Dynamics', 'Work Energy Power', 'Gravity', 'Ideal Gas'],
    '2nd': ['Thermodynamics', 'Static Electricity', 'Current Electricity', 'Modern Physics', 'Atomic Physics']
  },
  'Chemistry': {
    '1st': ['Qualitative Chemistry', 'Periodic Properties', 'Chemical Change'],
    '2nd': ['Environmental Chemistry', 'Organic Chemistry', 'Quantitative Chemistry', 'Electrochemistry']
  },
  'Math': {
    '1st': ['Matrix & Determinant', 'Vector', 'Straight Line', 'Circle', 'Trigonometry', 'Differentiation', 'Integration'],
    '2nd': ['Complex Number', 'Polynomial', 'Statics', 'Dynamics', 'Conics']
  },
  'Biology': {
    '1st': ['Cell and its Structure', 'Cell Division', 'Botany'],
    '2nd': ['Zoology', 'Human Physiology', 'Genetics']
  },
  'ICT': ['Communication Systems', 'Number System', 'Digital Device', 'Web Design', 'C Programming', 'Database'],
  'Bangla': {
    '1st': ['Prose', 'Poetry', 'Drama'],
    '2nd': ['Grammar', 'Composition']
  },
  'English': {
    '1st': ['Unit 1', 'Unit 2', 'Unit 3', 'Unit 4'],
    '2nd': ['Grammar', 'Composition']
  }
};

export const RESOURCES: (Resource | VideoResource)[] = [
  // --- PHYSICS 1ST ---
  { id: 'p1c1', title: 'Vector All Formulas', description: 'Zoomer\'s Lit Lab: ভেক্টরের সামান্তরিক সূত্র, নদী-নৌকা ও বৃষ্টির সব সূত্র।', category: 'Physics', subCategory: 'Formula', chapter: 'Vector', paper: '1st', link: '#', tags: ['Physics', 'Vector'], dateAdded: '2024-03-24' },
  { id: 'p1c2', title: 'Dynamics Formulas', description: 'Zoomer\'s Lit Lab: গতিবিদ্যার প্রাস (Projectile) ও গতির সমীকরণ চার্ট।', category: 'Physics', subCategory: 'Formula', chapter: 'Dynamics', paper: '1st', link: '#', tags: ['Physics', 'Dynamics'], dateAdded: '2024-03-24' },
  { id: 'p1c3', title: 'Work, Energy & Power', description: 'Zoomer\'s Lit Lab: কাজ, শক্তি ও ক্ষমতার স্প্রিং এবং কর্মদক্ষতা সূত্র।', category: 'Physics', subCategory: 'Formula', chapter: 'Work Energy Power', paper: '1st', link: '#', tags: ['Physics', 'WEP'], dateAdded: '2024-03-24' },
  { id: 'p1c4', title: 'Gravity & Gravitation', description: 'Zoomer\'s Lit Lab: মুক্তিবেগ, অভিকর্ষজ ত্বরণ ও কেপলারের সূত্রের সংকলন।', category: 'Physics', subCategory: 'Formula', chapter: 'Gravity', paper: '1st', link: '#', tags: ['Physics', 'Gravity'], dateAdded: '2024-03-24' },
  { id: 'p1c5', title: 'Ideal Gas & Kinetic Theory', description: 'Zoomer\'s Lit Lab: আদর্শ গ্যাস ও গ্যাসের গতিতত্ত্বের সকল গাণিতিক রূপ।', category: 'Physics', subCategory: 'Formula', chapter: 'Ideal Gas', paper: '1st', link: '#', tags: ['Physics', 'Ideal Gas'], dateAdded: '2024-03-24' },

  // --- PHYSICS 2ND ---
  { id: 'p2c1', title: 'Thermodynamics Master Sheet', description: 'Zoomer\'s Lit Lab: এন্ট্রপি, কার্নো ইঞ্জিন ও তাপগতিবিদ্যার সূত্রাবলী।', category: 'Physics', subCategory: 'Formula', chapter: 'Thermodynamics', paper: '2nd', link: '#', tags: ['Physics', 'Thermodynamics'], dateAdded: '2024-03-24' },
  { id: 'p2c2', title: 'Static Electricity Formulas', description: 'Zoomer\'s Lit Lab: কুলম্বের সূত্র, বিভব ও ধারকের সূত্র এক নজরে।', category: 'Physics', subCategory: 'Formula', chapter: 'Static Electricity', paper: '2nd', link: '#', tags: ['Physics', 'Static'], dateAdded: '2024-03-24' },
  { id: 'p2c3', title: 'Current Electricity Guide', description: 'Zoomer\'s Lit Lab: ওহম, কার্শফ ও হুইটস্টোন ব্রিজের ম্যাথ সূত্র।', category: 'Physics', subCategory: 'Formula', chapter: 'Current Electricity', paper: '2nd', link: '#', tags: ['Physics', 'Current'], dateAdded: '2024-03-24' },
  { id: 'p2c4', title: 'Modern Physics Cheat Sheet', description: 'Zoomer\'s Lit Lab: আপেক্ষিকতা ও ফটো-তড়িৎ ক্রিয়ার সকল সূত্র।', category: 'Physics', subCategory: 'Formula', chapter: 'Modern Physics', paper: '2nd', link: '#', tags: ['Physics', 'Modern'], dateAdded: '2024-03-24' },
  { id: 'p2c5', title: 'Atomic Physics Formulas', description: 'Zoomer\'s Lit Lab: তেজস্ক্রিয়তা ও পরমাণু মডেলের গাণিতিক সূত্রাবলী।', category: 'Physics', subCategory: 'Formula', chapter: 'Atomic Physics', paper: '2nd', link: '#', tags: ['Physics', 'Atomic'], dateAdded: '2024-03-24' },

  // --- CHEMISTRY 1ST ---
  { id: 'c1c1', title: 'Qualitative Chemistry Formulas', description: 'Zoomer\'s Lit Lab: দ্রাব্যতা, কোয়ান্টাম সংখ্যা ও বর্ণালীর সূত্র।', category: 'Chemistry', subCategory: 'Formula', chapter: 'Qualitative Chemistry', paper: '1st', link: '#', tags: ['Chemistry', 'Qualitative'], dateAdded: '2024-03-24' },
  { id: 'c1c2', title: 'Periodic Properties Key Points', description: 'Zoomer\'s Lit Lab: মৌলের পর্যায়বৃত্ত ধর্মের ট্রেন্ড ও সংকরায়ণ সূত্র।', category: 'Chemistry', subCategory: 'Formula', chapter: 'Periodic Properties', paper: '1st', link: '#', tags: ['Chemistry', 'Periodic'], dateAdded: '2024-03-24' },
  { id: 'c1c3', title: 'Chemical Change Master Sheet', description: 'Zoomer\'s Lit Lab: Kc, Kp, pH ও বাফার দ্রবণ এর সকল সূত্রাবলী।', category: 'Chemistry', subCategory: 'Formula', chapter: 'Chemical Change', paper: '1st', link: '#', tags: ['Chemistry', 'Chemical Change'], dateAdded: '2024-03-24' },

  // --- CHEMISTRY 2ND ---
  { id: 'c2c1', title: 'Environmental Chemistry Formula', description: 'Zoomer\'s Lit Lab: গ্যাসের সূত্র ও RMS বেগের গাণিতিক রূপ।', category: 'Chemistry', subCategory: 'Formula', chapter: 'Environmental Chemistry', paper: '2nd', link: '#', tags: ['Chemistry', 'Environmental'], dateAdded: '2024-03-24' },
  { id: 'c2c2', title: 'Organic Chemistry Reactions', description: 'Zoomer\'s Lit Lab: জৈব রসায়নের নামধারী বিক্রিয়া ও শনাক্তকরণ সূত্র।', category: 'Chemistry', subCategory: 'Formula', chapter: 'Organic Chemistry', paper: '2nd', link: '#', tags: ['Chemistry', 'Organic'], dateAdded: '2024-03-24' },
  { id: 'c2c3', title: 'Quantitative Chemistry Cheat Sheet', description: 'Zoomer\'s Lit Lab: মোলারিটি, জারণ-বিজারণ ও টাইট্রেশন সূত্র।', category: 'Chemistry', subCategory: 'Formula', chapter: 'Quantitative Chemistry', paper: '2nd', link: '#', tags: ['Chemistry', 'Quantitative'], dateAdded: '2024-03-24' },
  { id: 'c2c4', title: 'Electrochemistry Formulas', description: 'Zoomer\'s Lit Lab: তড়িৎ কোষ, ফ্যারাডের সূত্র ও নার্নস্ট সমীকরণ।', category: 'Chemistry', subCategory: 'Formula', chapter: 'Electrochemistry', paper: '2nd', link: '#', tags: ['Chemistry', 'Electrochemistry'], dateAdded: '2024-03-24' },

  // --- MATH 1ST ---
  { id: 'm1c1', title: 'Matrix & Determinant Rules', description: 'Zoomer\'s Lit Lab: ম্যাট্রিক্সের ইনভার্স ও ক্রেমারের নিয়ম।', category: 'Math', subCategory: 'Formula', chapter: 'Matrix & Determinant', paper: '1st', link: '#', tags: ['Math', 'Matrix'], dateAdded: '2024-03-24' },
  { id: 'm1c2', title: 'Vector Math Formulas', description: 'Zoomer\'s Lit Lab: স্থানাংক জ্যামিতিতে ভেক্টরের সকল সূত্র।', category: 'Math', subCategory: 'Formula', chapter: 'Vector', paper: '1st', link: '#', tags: ['Math', 'Vector'], dateAdded: '2024-03-24' },
  { id: 'm1c3', title: 'Straight Line All Formulas', description: 'Zoomer\'s Lit Lab: ঢাল, সমান্তরাল ও লম্ব রেখার সকল সূত্র।', category: 'Math', subCategory: 'Formula', chapter: 'Straight Line', paper: '1st', link: '#', tags: ['Math', 'Line'], dateAdded: '2024-03-24' },
  { id: 'm1c4', title: 'Circle Formula Master', description: 'Zoomer\'s Lit Lab: বৃত্তের স্পর্শক ও জ্যা এর সকল প্রয়োজনীয় সূত্র।', category: 'Math', subCategory: 'Formula', chapter: 'Circle', paper: '1st', link: '#', tags: ['Math', 'Circle'], dateAdded: '2024-03-24' },
  { id: 'm1c5', title: 'Trigonometry Formula Sheet', description: 'Zoomer\'s Lit Lab: ত্রিকোণমিতিক সকল কোণের ও যোগফলের সূত্রাবলী।', category: 'Math', subCategory: 'Formula', chapter: 'Trigonometry', paper: '1st', link: '#', tags: ['Math', 'Trigonometry'], dateAdded: '2024-03-24' },
  { id: 'm1c6', title: 'Differentiation Quick List', description: 'Zoomer\'s Lit Lab: অন্তরীকরণের মূল ও শৃঙ্খল নিয়ম (Chain Rule)।', category: 'Math', subCategory: 'Formula', chapter: 'Differentiation', paper: '1st', link: '#', tags: ['Math', 'Differentiation'], dateAdded: '2024-03-24' },
  { id: 'm1c7', title: 'Integration All Formulas', description: 'Zoomer\'s Lit Lab: যোগজীকরণের অনির্দিষ্ট ও নির্দিষ্ট সমাকলন সূত্র।', category: 'Math', subCategory: 'Formula', chapter: 'Integration', paper: '1st', link: '#', tags: ['Math', 'Integration'], dateAdded: '2024-03-24' },

  // --- MATH 2ND ---
  { id: 'm2c1', title: 'Complex Number Formulas', description: 'Zoomer\'s Lit Lab: জটিল সংখ্যার মডুলাস ও আর্গুমেন্ট নির্ণয়।', category: 'Math', subCategory: 'Formula', chapter: 'Complex Number', paper: '2nd', link: '#', tags: ['Math', 'Complex'], dateAdded: '2024-03-24' },
  { id: 'm2c2', title: 'Polynomial Master Rules', description: 'Zoomer\'s Lit Lab: বহুপদী সমীকরণের মূলের সম্পর্ক ও প্রকৃতি।', category: 'Math', subCategory: 'Formula', chapter: 'Polynomial', paper: '2nd', link: '#', tags: ['Math', 'Polynomial'], dateAdded: '2024-03-24' },
  { id: 'm2c3', title: 'Statics Formula Sheet', description: 'Zoomer\'s Lit Lab: লামির উপপাদ্য ও বলের সামান্তরিক সূত্রের প্রয়োগ।', category: 'Math', subCategory: 'Formula', chapter: 'Statics', paper: '2nd', link: '#', tags: ['Math', 'Statics'], dateAdded: '2024-03-24' },
  { id: 'm2c4', title: 'Dynamics Math Formulas', description: 'Zoomer\'s Lit Lab: প্রাসের গতির পাল্লা ও উচ্চতার সকল ম্যাথ সূত্র।', category: 'Math', subCategory: 'Formula', chapter: 'Dynamics', paper: '2nd', link: '#', tags: ['Math', 'Dynamics'], dateAdded: '2024-03-24' },
  { id: 'm2c5', title: 'Conics (পরাবৃত্ত, উপবৃত্ত, অধিবৃত্ত)', description: 'Zoomer\'s Lit Lab: কনিকের উপকেন্দ্র ও উৎকেন্দ্রিকতা বের করার সূত্র।', category: 'Math', subCategory: 'Formula', chapter: 'Conics', paper: '2nd', link: '#', tags: ['Math', 'Conics'], dateAdded: '2024-03-24' },

  // --- BIOLOGY 1ST ---
  { id: 'b1c1', title: 'Cell Structure Key Facts', description: 'Zoomer\'s Lit Lab: কোষের সকল অঙ্গাণুর কাজ ও গঠন মনে রাখার চার্ট।', category: 'Biology', subCategory: 'Formula', chapter: 'Cell and its Structure', paper: '1st', link: '#', tags: ['Biology', 'Cell'], dateAdded: '2024-03-24' },
  { id: 'b1c2', title: 'Cell Division Cheat Sheet', description: 'Zoomer\'s Lit Lab: মাইটোসিস ও মিয়োসিস বিভাজনের পর্যায়সমূহ।', category: 'Biology', subCategory: 'Formula', chapter: 'Cell Division', paper: '1st', link: '#', tags: ['Biology', 'Division'], dateAdded: '2024-03-24' },
  { id: 'b1c3', title: 'Botany Master Summary', description: 'Zoomer\'s Lit Lab: উদ্ভিদবিজ্ঞান অধ্যায়ের গুরুত্বপূর্ণ শনাক্তকারী বৈশিষ্ট্য।', category: 'Biology', subCategory: 'Formula', chapter: 'Botany', paper: '1st', link: '#', tags: ['Biology', 'Botany'], dateAdded: '2024-03-24' },

  // --- BIOLOGY 2ND ---
  { id: 'b2c1', title: 'Zoology Classification Guide', description: 'Zoomer\'s Lit Lab: প্রাণিজগতের সকল পর্বের অনন্য বৈশিষ্ট্যসমূহ।', category: 'Biology', subCategory: 'Formula', chapter: 'Zoology', paper: '2nd', link: '#', tags: ['Biology', 'Zoology'], dateAdded: '2024-03-24' },
  { id: 'b2c2', title: 'Human Physiology Formulas', description: 'Zoomer\'s Lit Lab: মানুষের হৃদপিণ্ড, ফুসফুস ও বৃক্কের গাণিতিক পরিমাপ।', category: 'Biology', subCategory: 'Formula', chapter: 'Human Physiology', paper: '2nd', link: '#', tags: ['Biology', 'Physiology'], dateAdded: '2024-03-24' },
  { id: 'b2c3', title: 'Genetics Rules (Mendel)', description: 'Zoomer\'s Lit Lab: মেন্ডেলের সূত্র ও বংশগতির জটিল সব অনুপাত।', category: 'Biology', subCategory: 'Formula', chapter: 'Genetics', paper: '2nd', link: '#', tags: ['Biology', 'Genetics'], dateAdded: '2024-03-24' },

  // --- ICT ---
  { id: 'i1', title: 'Communication Systems Facts', description: 'Zoomer\'s Lit Lab: ব্যান্ডউইথ, মিডিয়া ও নেটওয়ার্ক টপোলজির চার্ট।', category: 'ICT', subCategory: 'Formula', chapter: 'Communication Systems', link: '#', tags: ['ICT', 'Network'], dateAdded: '2024-03-24' },
  { id: 'i2', title: 'Number System Conversion', description: 'Zoomer\'s Lit Lab: বাইনারি, অকটাল ও হেক্সাডেসিমাল রূপান্তরের শর্টকাট।', category: 'ICT', subCategory: 'Formula', chapter: 'Number System', link: '#', tags: ['ICT', 'Numbers'], dateAdded: '2024-03-24' },
  { id: 'i3', title: 'Digital Logic Gate Sheet', description: 'Zoomer\'s Lit Lab: বুলিয়ান অ্যালজেব্রা ও সকল গেটের ট্রুথ টেবিল।', category: 'ICT', subCategory: 'Formula', chapter: 'Digital Device', link: '#', tags: ['ICT', 'Logic'], dateAdded: '2024-03-24' },
  { id: 'i4', title: 'Web Design (HTML/CSS)', description: 'Zoomer\'s Lit Lab: এইচটিএমএল ট্যাগ ও সিএসএস কোড মনে রাখার ডায়েরি।', category: 'ICT', subCategory: 'Formula', chapter: 'Web Design', link: '#', tags: ['ICT', 'Web'], dateAdded: '2024-03-24' },
  { id: 'i5', title: 'C Programming Syntax', description: 'Zoomer\'s Lit Lab: সি-প্রোগ্রামিং এর ডেটা টাইপ, লুপ ও ফাংশন রুলস।', category: 'ICT', subCategory: 'Formula', chapter: 'C Programming', link: '#', tags: ['ICT', 'Code'], dateAdded: '2024-03-24' },
  { id: 'i6', title: 'Database (SQL) Formulas', description: 'Zoomer\'s Lit Lab: রিলেশনাল ডেটাবেজ ও এসকিউএল কোয়েরি টিপস।', category: 'ICT', subCategory: 'Formula', chapter: 'Database', link: '#', tags: ['ICT', 'SQL'], dateAdded: '2024-03-24' },

  // --- BANGLA ---
  { id: 'bn1', title: 'Bangla Grammar formulas', description: 'Zoomer\'s Lit Lab: সন্ধি, সমাস ও কারকের সকল টেকনিক ও সূত্র।', category: 'Bangla', subCategory: 'Formula', chapter: 'Grammar', paper: '2nd', link: '#', tags: ['Bangla', 'Grammar'], dateAdded: '2024-03-24' },
  
  // --- ENGLISH ---
  { id: 'en1', title: 'English Grammar Formulas', description: 'Zoomer\'s Lit Lab: Tense, Voice, Narration ও Right form of verbs।', category: 'English', subCategory: 'Formula', chapter: 'Grammar', paper: '2nd', link: '#', tags: ['English', 'Grammar'], dateAdded: '2024-03-24' }
];

export const QUIZZES: Quiz[] = [
  {
    id: 'q-hsc-ict',
    title: 'ICT - লজিক গেট মাস্টার কুইজ',
    description: 'AND, OR, NOT এবং ইউনিভার্সাল গেটগুলোর ওপর তোমার দক্ষতা যাচাই করো।',
    difficulty: 'Medium',
    subject: 'ICT',
    chapter: 'Digital Device',
    tags: ['ICT', 'HSC', 'LogicGates'],
    questions: [
      {
        id: 'q-ict-1',
        text: 'কোনটি ইউনিভার্সাল গেট?',
        options: ['AND', 'OR', 'NAND', 'XOR'],
        correctAnswer: 2,
        explanation: 'NAND এবং NOR গেট দিয়ে সব ধরনের গেট তৈরি করা যায় বলে এদের ইউনিভার্সাল গেট বলা হয়।'
      }
    ]
  },
  {
    id: 'q-hsc-phy',
    title: 'পদার্থবিজ্ঞান - তাপগতিবিদ্যা কুইজ',
    description: 'তাপগতিবিদ্যার ১ম ও ২য় সূত্রের ওপর বোর্ড স্ট্যান্ডার্ড প্রশ্ন।',
    difficulty: 'Hard',
    subject: 'Physics',
    chapter: 'Thermodynamics',
    paper: '2nd',
    tags: ['Physics', 'HSC', 'Thermodynamics'],
    questions: [
      {
        id: 'q-phy-1',
        text: 'কার্নো ইঞ্জিনের দক্ষতা কিসের ওপর নির্ভর করে?',
        options: ['উৎস ও গ্রাহকের তাপমাত্রা', 'কার্যকরী পদার্থ', 'ইঞ্জিনের আকার', 'গ্যাসের আয়তন'],
        correctAnswer: 0,
        explanation: 'কার্নো ইঞ্জিনের দক্ষতা শুধুমাত্র এর তাপ উৎস এবং তাপ গ্রাহকের তাপমাত্রার ওপর নির্ভর করে।'
      }
    ]
  }
];

export const SOCIAL_LINKS = [
  {
    platform: 'YouTube',
    url: 'https://youtube.com/@zoomers_lit_lab',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    )
  },
  {
    platform: 'Facebook',
    url: 'https://www.facebook.com/share/187WbfEzkx/',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  }
];
