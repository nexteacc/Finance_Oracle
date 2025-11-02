export interface School {
  name: string;
  description: string;
  keywords: string[];
  judgments: string[];
}

export interface AnalysisResult {
  school: string;
  judgment: string;
  confidence: number;
}