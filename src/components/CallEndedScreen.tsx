import { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface CallEndedScreenProps {
  onReset: () => void;
}

export function CallEndedScreen({ onReset }: CallEndedScreenProps) {
  // Auto-reset to product selection after 10 seconds
  useEffect(() => {
    const resetTimer = setTimeout(() => {
      onReset();
    }, 10000);

    return () => clearTimeout(resetTimer);
  }, [onReset]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-8">
      <motion.div
        className="max-w-2xl w-full text-center space-y-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Icon */}
        <motion.div
          className="flex justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
        </motion.div>

        {/* Headline */}
        <div className="space-y-4">
          <h1 className="text-gray-900">
            통화가 종료되었습니다.
          </h1>
          <p className="text-gray-700 max-w-xl mx-auto">
            이제 '결제의 문턱'으로 이동하여 최종 결정을 내려주세요.
          </p>
        </div>

        {/* Arrow graphic */}
        <motion.div
          className="flex items-center justify-center gap-4 text-blue-600"
          animate={{
            x: [0, 20, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="text-gray-600">다음 스테이션으로</span>
          <div className="flex gap-2">
            <ArrowRight className="w-8 h-8" />
            <ArrowRight className="w-8 h-8" />
            <ArrowRight className="w-8 h-8" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
