import { motion } from 'motion/react';
import { Phone } from 'lucide-react';

interface TriggerScreenProps {
  onCall: () => void;
}

export function TriggerScreen({ onCall }: TriggerScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center space-y-12">
        {/* Headline */}
        <div className="space-y-4">
          <h2 className="text-gray-900">
            저울이 맞지 않나요?
          </h2>
          <p className="text-gray-700 max-w-xl mx-auto">
            당신이 선택한 상품의 진짜 '무게'를 확인하려면, 아래 버튼을 눌러 자원의 목소리를 들어보세요.
          </p>
        </div>

        {/* Pulsating Call Button */}
        <motion.button
          onClick={onCall}
          className="relative w-64 h-64 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-2xl flex items-center justify-center cursor-pointer hover:from-blue-600 hover:to-blue-700 transition-colors"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Pulse rings */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-blue-400"
            animate={{
              scale: [1, 1.4, 1.4],
              opacity: [0.6, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-blue-400"
            animate={{
              scale: [1, 1.4, 1.4],
              opacity: [0.6, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.4
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-blue-400"
            animate={{
              scale: [1, 1.4, 1.4],
              opacity: [0.6, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.8
            }}
          />

          {/* Button content */}
          <div className="flex flex-col items-center gap-4 relative z-10">
            <Phone className="w-16 h-16" />
            <span className="px-6">
              자원과 통화하기
            </span>
          </div>
        </motion.button>
      </div>
    </div>
  );
}
