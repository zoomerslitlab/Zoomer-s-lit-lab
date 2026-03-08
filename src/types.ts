
import React from 'react';

export type ResourceCategory = 'Physics' | 'Chemistry' | 'Biology' | 'Math' | 'Bangla' | 'English' | 'ICT' | 'Quizzes';

export type ResourceSubCategory = 'Quiz' | 'Formula' | 'Blog' | 'Lit hack';

export interface Resource {
  id: string;
  title: string;
  description: string;
  content?: string; // Detailed content (Markdown/Formulas)
  category: Exclude<ResourceCategory, 'Quizzes'>;
  subCategory: ResourceSubCategory;
  chapter?: string;
  paper?: '1st' | '2nd';
  link: string;
  thumbnail?: string;
  tags: string[];
  dateAdded: string;
}

export interface VideoResource extends Resource {
  youtubeId: string;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number; 
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  subject: ResourceCategory;
  chapter?: string;
  paper?: '1st' | '2nd';
  isMasterBank?: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}
