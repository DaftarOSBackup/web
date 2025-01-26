export interface ProgramData {
  program_name: string;
  program_description: string;
  location: string;
  community: string;
  gender: string;
  age_min: number;
  age_max: number;
  stage: string;
  sector: string;
  last_day_to_apply: string;
  program_launch_date: string;
}
export interface FounderDaftarData {
  daftar_name: string; // Retained
  country: string;     // Retained
  status: string;      // Added status field
  city: string;        // Retained
}

export interface InvestorDaftarData {
  daftar_name: string;
  country: string;
  state: string;
  city: string;
  investment_type: string;
  daftar_picture: string;
}

export interface TeamMemberData {
  daftar_id: string;
  email: string;
  first_name: string;
  last_name: string;
  investor_id: string;
}

export interface PitchData {
  founder_id: string;
  daftar_id: string;
  program_id: string;
  pitch_name: string;
  pitch_location: string;
  demo_link: string;
  sector: string;
  stage: string;
  founder_ask: string;
}

export interface FounderProfileData {
  first_name: string;
  last_name: string;
  founder_email: string;
  date_of_birth: string;
  gender: string;
  phone_number: string;
  profile_picture?: string | null;
}

export interface InvestorProfileData {
  first_name: string;
  last_name: string;
  phone_number: string;
  gender: string;
  age: number;
  date_of_birth: string;
  language: string;
  profile_picture: string;
}

export interface PitchVideoData {
  question_id: string;
  video_language: string;
  video_url: File;
}

export interface PitchReviewData {
  pitch_id: number;
  believe: string;
  message: string;
}

export interface CollaborationData {
  program_id: number;
  daftar_id: number;
}

export interface DeleteRequestData {
  daftar_id: string;
  action_type: string;
}

export interface QuestionListData {
  program_id: number;
  list_name: string;
}

export interface QuestionData {
  question_list_id: number;
  question: string;
}

export interface FAQData {
  program_id: number;
  question: string;
  answer: string;
} 