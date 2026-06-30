import { BrowserRouter, Routes, Route } from 'react-router-dom';

import InputName from './pages/InputName';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import SelectProcedure from './pages/SelectProcedure';
import MissionEquipment from './pages/MissionEquipment';
import MissionSequence from './pages/MissionSequence';
import QuizPhase from './pages/QuizPhase';
import QuizScore from './pages/QuizScore';
import SimulationScore from './pages/SimulationScore';
import BackButton from './components/BackButton';
import BGMPlayer from './components/BGMPlayer';

function App() {
  return (
    <BrowserRouter>

      <div className="min-h-screen font-sans text-gray-800 font-medium">
        
        {/* Global Components */}
        <BGMPlayer />
        <BackButton />

        {/* 2. กำหนดเส้นทาง (Routes) */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/input-name" element={<InputName />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/select" element={<SelectProcedure />} />
          <Route path="/mission-equipment" element={<MissionEquipment />} />
          <Route path="/mission-sequence" element={<MissionSequence />} />
          <Route path="/quiz" element={<QuizPhase />} />
          <Route path="/quiz-score" element={<QuizScore />} />
          <Route path="/simulation-score" element={<SimulationScore />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;