import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import style from './index.scss';
import classNames from 'classnames';

export function run(element: HTMLElement) {
  const root = createRoot(element);
  root.render(
    <StrictMode>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </StrictMode>,
  );
  return root;
}
const container = document.createElement('div');
container.className = classNames(style.main, style.w100, style.h100);
document.body.appendChild(container);
run(container);
