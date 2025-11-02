import { useState } from 'react';
import { InputForm } from './components/InputForm';
import { LoadingOracle } from './components/LoadingOracle';
import { ResultDisplay } from './components/ResultDisplay';
import { analyzeText } from './utils/analyzer';
import { AnalysisResult } from './types';
import { Scroll, TrendingUp } from 'lucide-react';

type AppState = 'input' | 'loading' | 'result';

function App() {
  const [state, setState] = useState<AppState>('input');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [currentInput, setCurrentInput] = useState<string>('');

  const handleAnalyze = (text: string) => {
    setCurrentInput(text);
    setState('loading');
  };

  const handleLoadingComplete = async () => {
    try {
      const analysisResult = await analyzeText(currentInput);
      setResult(analysisResult);
      setState('result');
    } catch (error) {
      console.error('Analysis failed:', error);
      // 如果分析失败，显示错误状态或回退到输入状态
      setState('input');
    }
  };

  const handleReset = () => {
    setState('input');
    setResult(null);
    setCurrentInput('');
    // 清空输入框
    const textarea = document.querySelector('textarea');
    if (textarea) textarea.value = '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900/20">
      {/* 装饰性背景 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 text-8xl">📜</div>
        <div className="absolute top-40 right-20 text-6xl">⚖️</div>
        <div className="absolute bottom-20 left-20 text-7xl">🏛️</div>
        <div className="absolute bottom-40 right-10 text-5xl">💰</div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* 头部标题 */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Scroll className="text-amber-400" size={40} />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-300 to-orange-300 
                           bg-clip-text text-transparent">
              金融鉴定司
            </h1>
            <TrendingUp className="text-amber-400" size={40} />
          </div>
          <p className="text-lg text-amber-200/80 max-w-2xl mx-auto">
            江湖财经话术鉴定所，一句话识破你的投资门第
          </p>
          <div className="text-sm text-amber-500/60 mt-2">
            ⚠️ 本工具仅供娱乐，不构成投资建议
          </div>
        </header>

        {/* 主要内容区域 */}
        <main className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 
                         backdrop-blur-sm border border-amber-600/20 
                         rounded-2xl p-8 shadow-2xl">
            
            {state === 'input' && (
              <InputForm 
                onSubmit={handleAnalyze} 
                isLoading={false}
              />
            )}

            {state === 'loading' && (
              <LoadingOracle onComplete={handleLoadingComplete} />
            )}

            {state === 'result' && result && (
              <ResultDisplay 
                result={result} 
                onReset={handleReset}
              />
            )}
          </div>
        </main>

        {/* 底部说明 */}
        <footer className="text-center mt-12 text-amber-500/50 text-sm">
          <p>基于语言修辞分析的娱乐化判定器 | Made with ❤️ for 金融江湖人</p>
        </footer>
      </div>
    </div>
  );
}

export default App;