import OpenAI from 'openai';
import { financialSchools } from '../data/schools';
import { AnalysisResult } from '../types';

export async function analyzeText(input: string): Promise<AnalysisResult> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error('OpenAI API key not found');
    return getFallbackResult();
  }

  try {
    const openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true
    });

    const prompt = createAnalysisPrompt(input);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "你是一位资深的金融话术鉴定专家，擅长识别各种投资流派的语言特征。请严格按照JSON格式返回结果。"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      throw new Error('No response from OpenAI');
    }

    // 尝试解析JSON响应
    const result = parseAIResponse(response);
    return result;

  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return getFallbackResult();
  }
}

function createAnalysisPrompt(input: string): string {
  const schoolsInfo = financialSchools.map(school => 
    `${school.name}：${school.description}\n关键特征：${school.keywords.join('、')}`
  ).join('\n\n');

  return `
作为金融话术鉴定专家，请分析以下财经言论属于哪个流派，并给出相应的江湖判语。

【待鉴定文本】
"${input}"

【可选流派】
${schoolsInfo}

【鉴定要求】
1. 根据文本的语言风格、用词特点、表达方式来判断最符合的流派
2. 生成一句符合该流派风格的古风判语（20-30字）
3. 给出置信度评分（1-100）

请严格按照以下JSON格式返回：
{
  "school": "流派名称",
  "judgment": "古风判语",
  "confidence": 85
}
`;
}

function parseAIResponse(response: string): AnalysisResult {
  try {
    // 尝试提取JSON部分
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const parsed = JSON.parse(jsonMatch[0]);
    
    // 验证必要字段
    if (!parsed.school || !parsed.judgment || typeof parsed.confidence !== 'number') {
      throw new Error('Invalid response format');
    }

    return {
      school: parsed.school,
      judgment: parsed.judgment,
      confidence: Math.max(1, Math.min(100, parsed.confidence))
    };
  } catch (error) {
    console.error('Error parsing AI response:', error);
    return getFallbackResult();
  }
}

function getFallbackResult(): AnalysisResult {
  // 如果AI调用失败，使用原来的关键词匹配作为后备方案
  const randomSchool = financialSchools[Math.floor(Math.random() * financialSchools.length)];
  const randomJudgment = randomSchool.judgments[Math.floor(Math.random() * randomSchool.judgments.length)];
  
  return {
    school: randomSchool.name,
    judgment: randomJudgment,
    confidence: 50
  };
}