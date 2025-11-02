import { AnalysisResult } from '../types';
import { TypewriterText } from './TypewriterText';
import { useState } from 'react';

interface ResultDisplayProps {
  result: AnalysisResult;
  onReset: () => void;
}

export function ResultDisplay({ result, onReset }: ResultDisplayProps) {
  const [showJudgment, setShowJudgment] = useState(false);

  return (
    <div className="text-center max-w-2xl mx-auto">
      {/* 流派展示 */}
      <div className="mb-8">
        <div className="text-sm text-amber-400 mb-2">【鉴定结果】</div>
        <div className="text-3xl font-bold text-amber-300 mb-4">
          <TypewriterText 
            text={`派别：${result.school}`}
            speed={100}
            onComplete={() => setShowJudgment(true)}
          />
        </div>
      </div>

      {/* 判语展示 */}
      {showJudgment && (
        <div className="mb-8">
          <div className="text-sm text-amber-400 mb-4">【江湖判语】</div>
          <div className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 
                         border border-amber-600/30 rounded-lg p-6 backdrop-blur-sm">
            <div className="text-lg text-amber-100 leading-relaxed">
              <TypewriterText 
                text={result.judgment}
                speed={60}
              />
            </div>
          </div>
        </div>
      )}

      {/* 操作按钮 */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={onReset}
          className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 
                     text-white font-semibold rounded-lg shadow-lg
                     hover:from-amber-500 hover:to-orange-500 
                     hover:shadow-xl hover:scale-105
                     transition-all duration-300"
        >
          再测一条
        </button>
      </div>

      {/* 置信度指示 */}
      <div className="mt-6 text-xs text-amber-500/70">
        鉴定可信度：{result.confidence}%
      </div>
    </div>
  );
}