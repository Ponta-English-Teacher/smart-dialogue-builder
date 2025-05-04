'use client';

import React from 'react';

export default function TestPage() {
  console.log("⚡ TestPage mounted as client component");

  return (
    <div style={{ padding: '2rem', fontSize: '1.5rem' }}>
      <h1>✅ This is the Test Page</h1>
      <button onClick={() => console.log("🧪 Button clicked!")}>Click me</button>
    </div>
  );
}

