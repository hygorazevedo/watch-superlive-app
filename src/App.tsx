import { Route, Routes } from 'react-router-dom';
import './App.css'
import AgoraPlayer from './components/AgoraPlayer';
import StreamList from './components/StreamList';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StreamList />} />
        <Route path=":id" element={<AgoraPlayer />} />
      </Routes>
    </>
  );
}
