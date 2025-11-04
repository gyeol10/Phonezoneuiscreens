import { motion } from 'motion/react';
import { Shirt, Smartphone, Sparkles, Disc3 } from 'lucide-react';
import { Product } from '../App';

interface ProductSelectionScreenProps {
  onSelect: (product: Product) => void;
}

const products = [
  { id: 'jeans' as Product, label: '청바지', icon: Shirt },
  { id: 'smartphone' as Product, label: '스마트폰', icon: Smartphone },
  { id: 'cosmetics' as Product, label: '화장품', icon: Sparkles },
  { id: 'album' as Product, label: 'K-Pop 앨범', icon: Disc3 },
];

export function ProductSelectionScreen({ onSelect }: ProductSelectionScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-12">
        {/* Headline */}
        <div className="text-center">
          <h2 className="text-gray-900">
            저울 위에 올렸던 상품을 선택해주세요.
          </h2>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-6 max-w-3xl mx-auto">
          {products.map((product, index) => (
            <motion.button
              key={product.id}
              onClick={() => onSelect(product.id)}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center gap-6 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Icon */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center group-hover:from-blue-500 group-hover:to-blue-700 transition-colors">
                <product.icon className="w-12 h-12 text-white" />
              </div>

              {/* Label */}
              <span className="text-gray-900">
                {product.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
