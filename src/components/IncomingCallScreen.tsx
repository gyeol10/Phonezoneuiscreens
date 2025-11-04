import { motion } from 'motion/react';
import { Phone, PhoneOff, Droplet, Mountain, Package, TreePine } from 'lucide-react';
import { ResourceInfo } from '../App';

interface IncomingCallScreenProps {
  resourceInfo: ResourceInfo;
  onAccept: () => void;
  onDecline: () => void;
}

const iconMap = {
  water: Droplet,
  metal: Mountain,
  plastic: Package,
  tree: TreePine,
};

const colorMap = {
  water: 'from-blue-400 to-blue-600',
  metal: 'from-gray-500 to-gray-700',
  plastic: 'from-green-400 to-green-600',
  tree: 'from-amber-600 to-amber-800',
};

export function IncomingCallScreen({ resourceInfo, onAccept, onDecline }: IncomingCallScreenProps) {
  const Icon = iconMap[resourceInfo.icon];
  const colorClass = colorMap[resourceInfo.icon];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-between py-16 px-8">
      {/* Top section - Caller info */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        {/* Profile picture / Icon */}
        <motion.div
          className={`w-32 h-32 rounded-full bg-gradient-to-br ${colorClass} flex items-center justify-center shadow-2xl`}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Icon className="w-16 h-16 text-white" />
        </motion.div>

        {/* Caller ID */}
        <div className="text-center space-y-2">
          <h1 className="text-white">
            {resourceInfo.name}
          </h1>
          <motion.p
            className="text-gray-400"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            발신 중...
          </motion.p>
        </div>
      </div>

      {/* Bottom section - Action buttons */}
      <div className="w-full max-w-md flex justify-around items-center gap-8">
        {/* Decline button */}
        <button
          onClick={onDecline}
          className="flex flex-col items-center gap-3 group"
        >
          <div className="w-20 h-20 rounded-full bg-[#FF3B30] flex items-center justify-center shadow-lg group-hover:bg-red-700 transition-colors">
            <PhoneOff className="w-8 h-8 text-white" />
          </div>
          <span className="text-white text-sm">거절</span>
        </button>

        {/* Accept button */}
        <button
          onClick={onAccept}
          className="flex flex-col items-center gap-3 group"
        >
          <motion.div
            className="w-20 h-20 rounded-full bg-[#4CD964] flex items-center justify-center shadow-lg group-hover:bg-green-600 transition-colors"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Phone className="w-8 h-8 text-white" />
          </motion.div>
          <span className="text-white text-sm">통화</span>
        </button>
      </div>
    </div>
  );
}
