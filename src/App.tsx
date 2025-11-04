import { useState } from 'react';
import { ProductSelectionScreen } from './components/ProductSelectionScreen';
import { TriggerScreen } from './components/TriggerScreen';
import { IncomingCallScreen } from './components/IncomingCallScreen';
import { CallInProgressScreen } from './components/CallInProgressScreen';
import { CallEndedScreen } from './components/CallEndedScreen';

type Screen = 'productSelection' | 'trigger' | 'incoming' | 'inProgress' | 'ended';
export type Product = 'jeans' | 'smartphone' | 'cosmetics' | 'album';

// [수정됨] 'trash'를 'plastic'으로, 'plastic'을 'tree'로 변경하여
// 오디오 파일과 아이콘을 일치시켰습니다.
export interface ResourceInfo {
  name: string;
  icon: 'water' | 'metal' | 'plastic' | 'tree';
  audioFile: string;
}

// [수정됨] audioFile 경로를 실제 URL로 바꾸고,
// 'cosmetics'와 'album'의 정보를 스크립트와 일치시켰습니다.
const RESOURCE_MAP: Record<Product, ResourceInfo> = {
  jeans: {
    name: '물 8,000L',
    icon: 'water',
    audioFile: 'https://cdn.jsdelivr.net/gh/gyeol10/Phonezoneuiscreens/물2.mp3',
  },
  smartphone: {
    name: '금속 광석 34kg',
    icon: 'metal',
    audioFile: 'https://cdn.jsdelivr.net/gh/gyeol10/Phonezoneuiscreens/금속1.mp3',
  },
  cosmetics: {
    name: '플라스틱 (재활용 9%)', // 스크립트 내용 반영
    icon: 'plastic',
    audioFile: 'https://cdn.jsdelivr.net/gh/gyeol10/Phonezoneuiscreens/플라스틱1.mp3',
  },
  album: {
    name: '나무 916,991그루', // 스크립트 내용 반영
    icon: 'tree',
    audioFile: 'https://cdn.jsdelivr.net/gh/gyeol10/Phonezoneuiscreens/나무2.mp3',
  },
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('productSelection');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('trigger');
  };

  const resourceInfo = selectedProduct ? RESOURCE_MAP[selectedProduct] : RESOURCE_MAP.jeans;

  return (
    <div className="min-h-screen bg-black">
      {currentScreen === 'productSelection' && (
        <ProductSelectionScreen onSelect={handleProductSelect} />
      )}
      {currentScreen === 'trigger' && (
        <TriggerScreen onCall={() => setCurrentScreen('incoming')} />
      )}
      {currentScreen === 'incoming' && (
        <IncomingCallScreen
          resourceInfo={resourceInfo}
          onAccept={() => setCurrentScreen('inProgress')}
          onDecline={() => setCurrentScreen('productSelection')}
        />
      )}
      {currentScreen === 'inProgress' && (
        <CallInProgressScreen
          resourceInfo={resourceInfo}
          onEnd={() => setCurrentScreen('ended')}
        />
      )}
      {currentScreen === 'ended' && (
        <CallEndedScreen onReset={() => setCurrentScreen('productSelection')} />
      )}
    </div>
  );
}