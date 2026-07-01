import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

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

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="min-h-screen font-sans text-gray-800 font-medium">
        <BGMPlayer />
        <BackButton />
        <Outlet />
      </div>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "input-name", element: <InputName /> },
      { path: "dashboard", element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
      { path: "select", element: <ProtectedRoute><SelectProcedure /></ProtectedRoute> },
      { path: "mission-equipment", element: <ProtectedRoute><MissionEquipment /></ProtectedRoute> },
      { path: "mission-sequence", element: <ProtectedRoute><MissionSequence /></ProtectedRoute> },
      { path: "quiz", element: <ProtectedRoute><QuizPhase /></ProtectedRoute> },
      { path: "quiz-score", element: <ProtectedRoute><QuizScore /></ProtectedRoute> },
      { path: "simulation-score", element: <ProtectedRoute><SimulationScore /></ProtectedRoute> },
      { path: "*", element: <NotFound /> }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;