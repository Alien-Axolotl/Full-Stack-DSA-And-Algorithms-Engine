import React, { useState } from 'react';
import Home from './pages/home';
import LinkedListPage from './pages/linkedlist';
import Stack from './pages/stack';
import Sort from './pages/sort';

const PAGES = {
  linkedlist: { title: 'Linked List', component: LinkedListPage, backTo: 'home' },
  stack: { title: 'Stack', component: Stack, backTo: 'home' },
  sort: { title: 'Sorting', component: Sort, backTo: 'home' },
};

export default function App() {
  const [currentView, setCurrentView] = useState('home');

  if (currentView === 'home') {
    return (
      <div className="app-container">
        <Home onSelectView={setCurrentView} />
      </div>
    );
  }

  const page = PAGES[currentView];
  if (!page) {
    setCurrentView('home');
    return null;
  }

  const PageComponent = page.component;

  return (
    <div className="app-container">
      <div className="page-wrapper">
        <button className="back-button" onClick={() => setCurrentView(page.backTo)}>
          ← Back
        </button>
        <PageComponent onSelectView={setCurrentView} />
      </div>
    </div>
  );
}
