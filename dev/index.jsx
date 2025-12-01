import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Yoomoney, YoomoneyModal, YoomoneyPanel } from '../src/index';

const root = createRoot(document.getElementById('root'));

const App = () => {
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    return (
        <div>

            <div style={{ marginBottom: '60px' }}>
                <h2>Базовый вид:</h2>
                <Yoomoney
                    receiver="4100111111111111"
                    label="Тестовый платеж"
                    defaultSum={100}
                    minSum={10}
                />
            </div>

            <div style={{ marginBottom: '60px' }}>
                <h2>Модальное окно:</h2>
                <YoomoneyModal
                    receiver="4100111111111111"
                    buttonText="Открыть модальное окно"
                    modalTitle="Пример наименования"
                    defaultSum={500}
                    minSum={100}
                />
            </div>

            <div style={{ marginBottom: '60px' }}>
                <h2>Панель справа:</h2>
                <button
                    onClick={() => setIsPanelOpen(true)}
                    style={{
                        padding: '12px 24px',
                        backgroundColor: '#702ff4',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        cursor: 'pointer'
                    }}
                >
                    Открыть панель
                </button>

                <YoomoneyPanel
                    receiver="4100111111111111"
                    isOpen={isPanelOpen}
                    onClose={() => setIsPanelOpen(false)}
                    panelTitle="Пример наименования"
                    defaultSum={1500}
                    minSum={100}
                />
            </div>
        </div>
    );
};

root.render(<App />);