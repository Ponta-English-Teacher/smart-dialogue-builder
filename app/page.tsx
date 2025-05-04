'use client';

import React, { useState, useCallback } from 'react';
import './page.css';

export default function Home() {
  const [selections, setSelections] = useState({
    level: '',
    place: '',
    goal: '',
    role: '',
    userVoice: '',
    partnerVoice: ''
  });

  const [options, setOptions] = useState({
    goals: [] as string[],
    places: [] as string[],
    roles: [] as string[],
  });

  const isStartEnabled = Object.values(selections).every(Boolean);

const handleSelect = useCallback(async (type: string, value: string) => {
  console.log(`📍 Selected ${type}: ${value}`);

  setSelections(prev => ({ ...prev, [type]: value }));

  if (type === 'level') {
    try {
      const res = await fetch('/api/setup-options', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level: value }),
      });
      const data = await res.json();
      console.log("🎯 Fetched from ChatGPT:", data);

      setOptions({
        goals: data.goals || [],
        places: data.places || [],
        roles: data.roles || [],
      });
    } catch (err) {
      console.error("❌ Failed to fetch setup options:", err);
    }
  }
}, []);
  const handleInput = (type: string, event: React.FocusEvent<HTMLInputElement>) => {
    const value = event.target.value.trim();
    if (value) handleSelect(type, value);
  };

  const startDialogue = () => {
    alert("🚀 Moving to the main part...");
    // TODO: implement navigation to dialogue interface
  };

  return (
    <div className="container">
      <div className="instruction-box">
        <strong>📘 英語での会話練習を始めましょう。</strong><br />
        必要な情報を順番に選んでください。<br />
        🗣️ Let’s get ready for your English conversation.<br />
        Please go through the steps below to set your preferences.
      </div>

      <details className="accordion" open>
        <summary>あなたの英語レベルは？ / Your English Level</summary>
        <div className="options">
          {['🔰 初級', '🔄 中下級', '🔁 中上級', '🧠 上級', '🎲 その他'].map(level => (
            <button
              key={level}
              className={`option-button ${selections.level === level ? 'selected' : ''}`}
              onClick={() => {
  console.log('🧪 Button clicked:', level);  // ← TEMP LOG
  handleSelect('level', level);
}}
            >{level}</button>
          ))}
          <input className="other-input" type="text" placeholder="レベルを入力 / Enter your level" onBlur={(e) => handleInput('level', e)} />
        </div>
      </details>

      <details className="accordion">
        <summary>会話をしたい場所は？ / Where will the conversation happen?</summary>
        <div className="options">
          {(options.places.length ? options.places : ['🍽️ レストラン', '🏨 ホテル', '🏪 コンビニ', '🏥 病院', '✈️ 空港', '🚉 その他']).map(place => (
            <button
              key={place}
              className={`option-button ${selections.place === place ? 'selected' : ''}`}
              onClick={() => handleSelect('place', place)}
            >{place}</button>
          ))}
          <input className="other-input" type="text" placeholder="場所を入力 / Enter place" onBlur={(e) => handleInput('place', e)} />
        </div>
      </details>

      <details className="accordion">
        <summary>何をしたいですか？ / What do you want to do?</summary>
        <div className="options">
          {(options.goals.length ? options.goals : ['📅 予約をしたい', '🍽️ 食事をしたい', '📖 メニューを見せてほしい', '💬 おすすめを聞きたい', '🎲 その他']).map(goal => (
            <button
              key={goal}
              className={`option-button ${selections.goal === goal ? 'selected' : ''}`}
              onClick={() => handleSelect('goal', goal)}
            >{goal}</button>
          ))}
          <input className="other-input" type="text" placeholder="目的を入力 / Enter your goal" onBlur={(e) => handleInput('goal', e)} />
        </div>
      </details>

      <details className="accordion">
        <summary>あなたの役割は？ / Your Role</summary>
        <div className="options">
          {(options.roles.length ? options.roles : ['🙋 客として話す', '🧑‍🍳 店員として話す', '👨‍⚕️ 医者として話す', '👤 観光客として話す', '🎲 その他']).map(role => (
            <button
              key={role}
              className={`option-button ${selections.role === role ? 'selected' : ''}`}
              onClick={() => handleSelect('role', role)}
            >{role}</button>
          ))}
          <input className="other-input" type="text" placeholder="役割を入力 / Enter your role" onBlur={(e) => handleInput('role', e)} />
        </div>
      </details>

      <button
        className="start-button"
        onClick={startDialogue}
        disabled={!isStartEnabled}
      >
        🚀 会話を始める / Start Dialogue
      </button>
    </div>
  );
}
‍💼 店員として話す', '🎭 その他'].map(role => (
            <button
              key={role}
              className={`option-button ${selections.role === role ? 'selected' : ''}`}
              onClick={() => handleSelect('role', role)}
            >{role}</button>
          ))}
          <input className="other-input" type="text" placeholder="役割を入力 / Enter your role" onBlur={(e) => handleInput('role', e)} />
        </div>
      </details>

      <details className="accordion">
        <summary>声の性別を選んでください / Choose the voice gender</summary>
        <div className="options">
          <div style={{ width: '100%', fontWeight: 'bold' }}>👤 あなたの声 / Your Voice:</div>
          {['👩 女性', '👨 男性'].map(v => (
            <button
              key={v + 'user'}
              className={`option-button ${selections.userVoice === v ? 'selected' : ''}`}
              onClick={() => handleSelect('userVoice', v)}
            >{v}</button>
          ))}
          <div style={{ width: '100%', fontWeight: 'bold', marginTop: 10 }}>🎧 相手の声 / Partner's Voice:</div>
          {['👩 女性', '👨 男性'].map(v => (
            <button
              key={v + 'partner'}
              className={`option-button ${selections.partnerVoice === v ? 'selected' : ''}`}
              onClick={() => handleSelect('partnerVoice', v)}
            >{v}</button>
          ))}
        </div>
      </details>

      <div className="start-section">
        <button
          className="start-button"
          onClick={startDialogue}
          disabled={!isStartEnabled}
        >➡️ スタート / Start</button>
      </div>
    </div>
  );
}

