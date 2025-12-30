import React from 'react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

const GuideDisplay = ({ guide, onReset }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel"
            style={{ textAlign: 'left', maxWidth: '900px', margin: '0 auto' }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
                <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--secondary-accent)' }}>Your Build Plan</h2>
                <button
                    onClick={onReset}
                    style={{
                        background: 'transparent',
                        border: '1px solid var(--glass-border)',
                        color: 'var(--text-muted)',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        cursor: 'pointer'
                    }}
                >
                    Start Over
                </button>
            </div>

            <div className="markdown-content">
                <ReactMarkdown
                    components={{
                        code({ node, inline, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline ? (
                                <div style={{ position: 'relative', margin: '1.5rem 0' }}>
                                    <div style={{
                                        background: '#1a1a1a',
                                        padding: '0.5rem 1rem',
                                        borderTopLeftRadius: '8px',
                                        borderTopRightRadius: '8px',
                                        color: '#888',
                                        fontSize: '0.8rem',
                                        borderBottom: '1px solid #333'
                                    }}>
                                        {match ? match[1] : 'code'}
                                    </div>
                                    <pre style={{
                                        background: '#0f0f0f',
                                        padding: '1.5rem',
                                        overflowX: 'auto',
                                        margin: 0,
                                        borderBottomLeftRadius: '8px',
                                        borderBottomRightRadius: '8px',
                                        border: '1px solid #333',
                                        borderTop: 'none'
                                    }}>
                                        <code className={className} {...props} style={{ fontFamily: 'Fira Code, monospace', color: '#e0e0e0' }}>
                                            {children}
                                        </code>
                                    </pre>
                                </div>
                            ) : (
                                <code className={className} {...props} style={{ background: 'rgba(255,255,255,0.1)', padding: '0.2em 0.4em', borderRadius: '4px' }}>
                                    {children}
                                </code>
                            )
                        },
                        h1: ({ node, ...props }) => <h3 style={{ color: 'var(--primary-accent)', marginTop: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }} {...props} />,
                        h2: ({ node, ...props }) => <h4 style={{ color: 'var(--secondary-accent)', marginTop: '1.5rem' }} {...props} />,
                        ul: ({ node, ...props }) => <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }} {...props} />,
                        li: ({ node, ...props }) => <li style={{ marginBottom: '0.5rem' }} {...props} />,
                    }}
                >
                    {guide}
                </ReactMarkdown>
            </div>
        </motion.div>
    );
};

export default GuideDisplay;
