import { useRoutes } from 'react-router-dom';
import './App.css'
import AgoraPlayer from './components/AgoraPlayer';
import StreamList from './components/StreamList';

export default function SuperliveApp() {

  const routes = [
    { path: "/", element: <StreamList /> },
    { path: "/:id", element: <AgoraPlayer /> }
  ]

  return useRoutes(routes)
}
