import { financialSchools } from '../data/schools';
import { AnalysisResult } from '../types';

export function analyzeText(input: string): AnalysisResult {
  const text = input.toLowerCase();
  const schoolScores = financialSchools.map(school => {
    const matchCount = school.keywords.filter(keyword => 
      text.includes(keyword.toLowerCase())
    ).length;
    
    return {
      school: school.name,
      score: matchCount,
      judgments: school.judgments
    };
  });

  // 找到得分最高的流派
  const bestMatch = schoolScores.reduce((max, current) => 
    current.score > max.score ? current : max
  );

  // 如果没有匹配的关键词，随机选择一个流派
  const selectedSchool = bestMatch.score > 0 ? bestMatch : 
    schoolScores[Math.floor(Math.random() * schoolScores.length)];

  // 随机选择一个判语
  const randomJudgment = selectedSchool.judgments[
    Math.floor(Math.random() * selectedSchool.judgments.length)
  ];

  return {
    school: selectedSchool.school,
    judgment: randomJudgment,
    confidence: Math.min(selectedSchool.score * 20, 100)
  };
}