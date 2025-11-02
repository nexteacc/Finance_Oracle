import { useState } from 'react';
import { Send } from 'lucide-react';

interface InputFormProps {
  onSubmit: (text: string) => void;
  isLoading: boolean;
}

export function InputForm({ onSubmit, isLoading }: InputFormProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSubmit(input.trim());
    }
  };

  const examples = [
    "这支股票有内幕消息，明天必涨！",
    "技术指标显示MACD金叉，RSI超卖反弹",
    "庄家又在洗盘，散户都被套了",
    "价值投资者应该关注企业基本面",
    "今日财运不佳，不宜入市"
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="financial-text" className="block text-sm font-medium text-amber-300 mb-3">
            请输入待鉴定的财经话术：
          </label>
          <div className="relative">
            <textarea
              id="financial-text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="例如：这支股票马上要涨停了，我有内幕消息..."
              disabled={isLoading}
              className="w-full px-4 py-3 bg-gradient-to-br from-slate-800 to-slate-900 
                         border border-amber-600/30 rounded-lg text-amber-100 
                         placeholder-amber-500/50 focus:outline-none 
                         focus:ring-2 focus:ring-amber-500 focus:border-transparent
                         disabled:opacity-50 disabled:cursor-not-allowed
                         resize-none transition-all duration-300"
              rows={4}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute bottom-3 right-3 p-2 bg-gradient-to-r from-amber-600 to-orange-600 
                         text-white rounded-lg hover:from-amber-500 hover:to-orange-500 
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-300 hover:scale-105"
            >
              <Send size={20} />
            </button>
          </div>
        </div>

        {/* 示例 */}
        <div className="text-center">
          <div className="text-xs text-amber-500/70 mb-3">点击示例快速体验：</div>
          <div className="flex flex-wrap justify-center gap-2">
            {examples.map((example, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setInput(example)}
                disabled={isLoading}
                className="px-3 py-1 text-xs bg-amber-900/20 text-amber-300 
                           border border-amber-600/30 rounded-full
                           hover:bg-amber-800/30 hover:scale-105
                           transition-all duration-300 disabled:opacity-50"
              >
                {example.slice(0, 15)}...
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}