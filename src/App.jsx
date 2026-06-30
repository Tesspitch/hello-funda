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
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
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
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/select" element={<ProtectedRoute><SelectProcedure /></ProtectedRoute>} />
          <Route path="/mission-equipment" element={<ProtectedRoute><MissionEquipment /></ProtectedRoute>} />
          <Route path="/mission-sequence" element={<ProtectedRoute><MissionSequence /></ProtectedRoute>} />
          <Route path="/quiz" element={<ProtectedRoute><QuizPhase /></ProtectedRoute>} />
          <Route path="/quiz-score" element={<ProtectedRoute><QuizScore /></ProtectedRoute>} />
          <Route path="/simulation-score" element={<ProtectedRoute><SimulationScore /></ProtectedRoute>} />
          
          {/* Catch-all route สำหรับหน้าที่ไม่มีอยู่จริง (404 Not Found) */}
          <Route path="*" element={<NotFound />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;