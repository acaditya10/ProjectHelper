import React, { useState } from 'react';
import { motion } from 'framer-motion';

const InputSection = ({ onSubmit, isLoading }) => {
    const [projectName, setProjectName] = useState('');
    const [projectIdea, setProjectIdea] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(projectName, projectIdea);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="glass-panel"
            style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}
        >
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 5, repeatDelay: 3 }}
                    style={{ fontSize: '4rem', marginBottom: '1rem', display: 'inline-block' }}
                >
                    🚀
                </motion.div>
                <h1 style={{ fontSize: '2.5rem' }}>Project Guide AI</h1>
                <p>Turn your spark of an idea into a fully-fledged build plan.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                        Project Name
                    </label>
                    <input
                        type="text"
                        className="input-premium"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="e.g. My Awesome App"
                        required
                        autoFocus
                    />
                </div>

                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                        What do you want to build?
                    </label>
                    <textarea
                        className="input-premium"
                        value={projectIdea}
                        onChange={(e) => setProjectIdea(e.target.value)}
                        placeholder="e.g. A personal finance tracker with visualized charts..."
                        rows={4}
                        required
                        style={{ resize: 'vertical' }}
                    />
                </div>

                <div style={{ textAlign: 'center' }}>
                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={isLoading || !projectIdea || !projectName}
                        style={{ opacity: isLoading ? 0.7 : 1 }}
                    >
                        {isLoading ? (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span className="spinner">✨</span> Generative Magic...
                            </span>
                        ) : (
                            'Generate Guide'
                        )}
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default InputSection;
