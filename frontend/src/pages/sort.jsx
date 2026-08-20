import React, { useState, useRef, useEffect } from 'react';
import '../static/sort.css';
import '../static/style.css';
import { apiFetch } from '../api';

const ALGORITHMS = [
    { value: 'bubble', label: 'Bubble Sort' },
    { value: 'insertion', label: 'Insertion Sort' },
    { value: 'selection', label: 'Selection Sort' },
];

function randomArray(size = 12) {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
}

export default function Sort() {
    const [array, setArray] = useState(randomArray());
    const [inputValue, setInputValue] = useState('');
    const [algorithm, setAlgorithm] = useState('bubble');
    const [steps, setSteps] = useState([]);
    const [stepIndex, setStepIndex] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [loading, setLoading] = useState(false);
    const intervalRef = useRef(null);

    const hasSteps = steps.length > 0;
    const current = hasSteps ? steps[stepIndex] : { array, comparing: [], swapped: false };
    const atEnd = hasSteps && stepIndex >= steps.length - 1;

    const pushArray = async (values) => {
        setLoading(true);
        try {
            await apiFetch('/sort/set-array', {
                method: 'POST',
                body: JSON.stringify({ values }),
            });
            setArray(values);
            setSteps([]);
            setStepIndex(0);
            setPlaying(false);
        } catch (error) {
            console.error("Failed to set array:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleShuffle = () => pushArray(randomArray());

    const handleAddValue = async (e) => {
        e.preventDefault();
        if (inputValue === '') return;
        await pushArray([...array, parseInt(inputValue, 10)]);
        setInputValue('');
    };

    const handleRun = async () => {
        setPlaying(false);
        setLoading(true);
        try {
            const data = await apiFetch('/sort/run', {
                method: 'POST',
                body: JSON.stringify({ algorithm }),
            });
            setSteps(data.steps);
            setStepIndex(0);
        } catch (error) {
            console.error("Failed to run sort:", error);
        } finally {
            setLoading(false);
        }
    };

    const stepForward = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1));
    const stepBack = () => setStepIndex((i) => Math.max(i - 1, 0));

    // AUtoplay
    useEffect(() => {
        if (playing && hasSteps) {
            intervalRef.current = setInterval(() => {
                setStepIndex((i) => {
                    if (i >= steps.length - 1) {
                        setPlaying(false);
                        return i;
                    }
                    return i + 1;
                });
            }, 220);
        }
        return () => clearInterval(intervalRef.current);
    }, [playing, hasSteps, steps.length]);

    const maxVal = Math.max(1, ...current.array);

    return (
        <div>
            <div className="control" style={{ flexWrap: 'wrap', gap: 12 }}>
                <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} className="node_input_value">
                    {ALGORITHMS.map((a) => (
                        <option key={a.value} value={a.value}>{a.label}</option>
                    ))}
                </select>

                <button className="add_node" type="button" onClick={handleRun} disabled={loading || array.length === 0}>
                    {loading ? '...' : 'Run'}
                </button>

                <button className="add_node" type="button" onClick={handleShuffle} disabled={loading}>
                    Shuffle New Array
                </button>
            </div>

            <form onSubmit={handleAddValue} className="control" style={{ marginTop: 12 }}>
                <input
                    type="number"
                    placeholder="Add a value..."
                    className="node_input_value"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button className="add_node" type="submit" disabled={loading}>Add</button>
            </form>

            {hasSteps && (
                <div className="control" style={{ marginTop: 12 }}>
                    <button className="add_node" type="button" onClick={stepBack} disabled={stepIndex === 0}>
                        ← Step Back
                    </button>
                    <button
                        className="add_node"
                        type="button"
                        onClick={() => setPlaying((p) => !p)}
                        disabled={atEnd && !playing}
                    >
                        {playing ? 'Pause' : 'Play'}
                    </button>
                    <button className="add_node" type="button" onClick={stepForward} disabled={atEnd}>
                        Step Forward →
                    </button>
                    <span style={{ alignSelf: 'center', color: '#93c5fd' }}>
                        Step {stepIndex + 1} / {steps.length}
                    </span>
                </div>
            )}

            {/*VIsualization*/}

            <div className="sort-canvas">
                {current.array.map((val, idx) => {
                    const isComparing = current.comparing?.includes(idx);
                    return (
                        <div
                            key={idx}
                            className={`sort-bar ${isComparing ? (current.swapped ? 'sort-bar-swapped' : 'sort-bar-comparing') : ''}`}
                            style={{ height: `${(val / maxVal) * 100}%` }}
                        >
                            <span className="sort-bar-label">{val}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
