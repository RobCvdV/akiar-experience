import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

// no StrictMode: its double effect would start a second audio context
createRoot(rootElement).render(<App />);
