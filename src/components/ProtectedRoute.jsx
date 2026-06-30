import { Navigate } from 'react-router-dom';
import { useGameStore } from '../store/useGameStore';

export default function ProtectedRoute({ children }) {
    const player = useGameStore((state) => state.player);

    // ถ้าไม่มีข้อมูล player.id ให้เด้งกลับไปที่หน้ากรอกชื่อ/รหัส
    if (!player || !player.id) {
        return <Navigate to="/input-name" replace />;
    }

    return children;
}
