import React, { useState, useEffect } from 'react';
import '../static/linkedlist.css';
import '../static/style.css';
import { apiFetch } from '../api';

export default function LinkedList() {
    const [nodes, setNodes] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchNodes = async () => {
        try {
            const data = await apiFetch('/get-nodes');
            setNodes(data.nodes);
        } catch (error) {
            console.error("Failed to fetch the nodes:", error);
        }
    };

    useEffect(() => {
        fetchNodes();
    }, []);

    const removeList = async () => {
        setLoading(true);
        try {
            const data = await apiFetch('/remove-list', { method: 'POST' });
            setNodes(data.nodes);
        } catch (error) {
            console.error("Failed to clear the list:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSort = async () => {
        setLoading(true);
        try {
            const data = await apiFetch('/sort-list', { method: 'POST' });
            setNodes(data.nodes);
        } catch (error) {
            console.error("Failed to sort the list:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddNode = async (e) => {
        e.preventDefault();
        if (inputValue === '') return;

        setLoading(true);
        try {
            const data = await apiFetch('/add-node', {
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

    return (
        <>
            {/* Control Form */}
            <form onSubmit={handleAddNode} className="control">
                <input
                    type="number"
                    id="node_value"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter integer..."
                    className="node_input_value"
                />
                <button
                    type="submit"
                    id="node_button"
                    className="add_node"
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add A New Node'}
                </button>
            </form>

            <div className="sort-control">
                <button id="sort_button" onClick={handleSort} disabled={loading}>
                    {loading ? "Sorting..." : "Sort List"}
                </button>
            </div>

            <div className="list-remove-control">
                <button id="delete-button" onClick={removeList} disabled={loading}>
                    {loading ? "Deleting" : "Delete List"}
                </button>
            </div>

            {/* Visualizer */}
            <div id="canvas" className="node_container">
                {nodes.length === 0 ? (
                    <p style={{ color: '#777' }}>List is empty. Add a node to get started!</p>
                ) : (
                    nodes.map((val, index) => (
                        <React.Fragment key={index}>
                            <div className="node-box">
                                {val}
                            </div>
                            {index < nodes.length - 1 && (
                                <span className="node-arrow">→</span>
                            )}
                        </React.Fragment>
                    ))
                )}
            </div>
        </>
    );
}
