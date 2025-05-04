'use client';

import React, { useState } from 'react';

export default function Home() {
  const [level, setLevel] = useState('');
  const [places, setPlaces] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);

  const [selectedPlace, setSelectedPlace] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const [userVoice, setUserVoice] = useState('');
  const [partnerVoice, setPartnerVoice] = useState('');

  const isStartEnabled = level && selectedPlace && selectedGoal && selectedRole && userVoice && partnerVoice;

  const fetchOptions = async (lvl: string) => {
    setLevel(lvl);
    const res = await fetch('/api/setup-options', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level: lvl })
    });
    const data = await res.json();
    setPlaces(data.places || []);
    setGoals(data.goals || []);
    setRoles(data.roles || []);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h2>🗣️ 会話設定 / Conversation Setup</h2>

      <div style={{ marginBottom: 20 }}>
        <strong>📈 レベルを選んでください / Choose your level:</strong><br />
        {['初級', '中級', '上級'].map((lvl) => (
          <button key={lvl} onClick={() => fetchOptions(lvl)} style={{ margin: 4 }}>{lvl}</button>
        ))}
      </div>

      {places.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <strong>📍 場所を選んでください / Place:</strong><br />
          {places.map((p) => (
            <button key={p} onClick={() => setSelectedPlace(p)} style={{ margin: 4 }}>{p}</button>
          ))}
        </div>
      )}

      {goals.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <strong>🎯 目的を選んでください / Goal:</strong><br />
          {goals.map((g) => (
            <button key={g} onClick={() => setSelectedGoal(g)} style={{ margin: 4 }}>{g}</button>
          ))}
        </div>
      )}

      {roles.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <strong>👥 役割を選んでください / Role:</strong><br />
          {roles.map((r) => (
            <button key={r} onClick={() => setSelectedRole(r)} style={{ margin: 4 }}>{r}</button>
          ))}
        </div>
      )}

      <div style={{ marginBottom: 20 }}>
        <strong>🎤 あなたの声 / Your Voice:</strong><br />
        <button onClick={() => setUserVoice('女性')}>👩 女性</button>
        <button onClick={() => setUserVoice('男性')}>👨 男性</button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <strong>🎧 相手の声 / Partner's Voice:</strong><br />
        <button onClick={() => setPartnerVoice('女性')}>👩 女性</button>
        <button onClick={() => setPartnerVoice('男性')}>👨 男性</button>
      </div>

      <button disabled={!isStartEnabled} style={{ padding: '10px 20px', backgroundColor: isStartEnabled ? '#4CAF50' : '#ccc', color: 'white', border: 'none', cursor: isStartEnabled ? 'pointer' : 'not-allowed' }}>
        ➡️ スタート / Start
      </button>
    </div>
  );
}
