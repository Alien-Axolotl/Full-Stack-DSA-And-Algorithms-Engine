import React, { useState, useEffect } from 'react';
import '../static/stack.css';
import '../static/style.css';
import { apiFetch } from '../api';

export default function Stack() {
    const [nodes, setNodes] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchNodes = async () => {
        try {
            const data = await apiFetch('/get-stack-nodes');
            setNodes(data.nodes);
        } catch (error) {
            console.error("Failed to fetch the nodes:", error);
        }
    };

    useEffect(() => {
        fetchNodes();
    }, []);

    const handleAddNode = async (e) => {
        e.preventDefault();
        if (inputValue === '') return;

        setLoading(true);
        try {
            const data = await apiFetch('/add-stack-node', {
                method: 'POST',
                body: JSON.stringify({ value: parseInt(inputValue, 10) }),
            });
            setNodes(data.nodes);
            setInputValue('');
        } catch (error) {
            console.error("Failed to add node:", error);
        } finally {
            setLoading(false);
        }
    };

    const popNode = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await apiFetch('/pop', { method: 'POST' });
            setNodes(data.nodes);
        } catch (error) {
            console.error("Failed to pop node:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleAddNode} className="control">
                <input
                    type="number"
                    id="node_value"
                    placeholder="Enter integer..."
                    className="node_input_value"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />

                <button id="node_button" className="add_node" type="submit">
                    Push
                </button>

                <button
                    id="pop_button"
                    className="add_node"
                    onClick={popNode}
                    disabled={loading}
                >
                    {loading ? "Popping" : "Pop Node"}
                </button>
            </form>

            {/*Visualization*/}
            <div id="canvas" className="stack_node_container">
                {nodes.length === 0 ? (
                    <p style={{ color: '#777' }}>Stack is empty. Add a node to get started!</p>
                ) : (
                    nodes.map((val, index) => (
                        <React.Fragment key={index}>
                            <div className="node-box">
                                {val}
                            </div>
                        </React.Fragment>
                    ))
                )}
            </div>
        </div>
    );
}
