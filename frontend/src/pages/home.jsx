
export default function Home({ onSelectView }) {
    return (
        <div>
            {/*TOP BAR */}

            <div className = "top-bar">
                <h1 className = "top-title">DSA and Algorithms Engine</h1>
            </div>

            {/*DIVIDER*/}

            <hr className = "solid" />

            {/* DASHBOARDS*/}

            <div className = "dashboard-main">
                
            {/* DS */}
            
            <div className="dashboard-column">
                <h2>Data Structures</h2>
                <div className="dashboard-redirect"
                 onClick={(e) => {
                            e.preventDefault();
                            onSelectView('linkedlist');
                        }} >
                    <a href="/linkedlist">Linked List</a>
                </div>
                 <div className="dashboard-redirect"
                 onClick={(e) => {
                    e.preventDefault();
                    onSelectView('stack')
                 }} >
                    <a href="/stack">Stack</a>
                </div>
            </div>

            {/*ALGORITHMS*/}
            <div className="dashboard-column">
                <h2>Algorithms</h2>
                <div className="dashboard-redirect"
                    onClick={(e) => {
                        e.preventDefault();
                        onSelectView('sort');
                    }}>
                    <a href="/sort">Sorting</a>
                </div>
            </div>
        </div>  
            

            
            



        </div>
    );
}