import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const AccessibleComponent = () => {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [isChecked, setChecked] = useState(false);
    const [sliderValue, setSliderValue] = useState(50);

    const [timer, setTimer] = useState(30);

    // Simulate countdown
    setTimeout(() => {
        setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return (
        <div className="container mt-4">
            {/* LANDMARK ROLES */}
            <header role="banner" className="bg-primary text-white p-3">
                <h1>My Accessible Website</h1>
            </header>

            <nav role="navigation" className="mt-3">
                <ul role="menu" className="nav">
                    <li role="menuitem" className="nav-item">
                        <a href="#" className="nav-link">
                            Home
                        </a>
                    </li>
                    <li role="menuitem" className="nav-item">
                        <a href="#" className="nav-link">
                            About
                        </a>
                    </li>
                </ul>
            </nav>

            <main role="main" className="mt-4">
                {/* DOCUMENT STRUCTURE ROLES */}
                <div role='article' className="card p-3">
                    <div className="fw-bold">
                        Welcome to Our Blog
                    </div>
                    <p>This is a sample article demonstrating ARIA roles.</p>
                </div>

                <ul role="list" className="list-group mt-3">
                    <li role="listitem" className="list-group-item">
                        Item 1
                    </li>
                    <li role="listitem" className="list-group-item">
                        Item 2
                    </li>
                </ul>

                <table>
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>John</td>
                            <td>30</td>
                        </tr>
                        <tr>
                            <td>Jane</td>
                            <td>28</td>
                        </tr>
                    </tbody>
                </table>

                {/* WIDGET ROLES */}
                <div className="mt-4">
                    <div
                        role="button"
                        tabIndex={0}
                        className="btn btn-primary"
                        onClick={() => alert("Button clicked!")}
                    >
                        Click Me
                    </div>

                    <div className="form-check mt-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            checked={isChecked}
                            onChange={() => setChecked(!isChecked)}
                            id="customCheckbox"
                        />
                        <label className="form-check-label" htmlFor="customCheckbox">
                            Checkbox
                        </label>
                    </div>


                    <div

                        className="mt-3"
                    >
                        <label htmlFor="z">range</label>
                        <input
                            id='z'
                            type="range"
                            className="form-range"
                            min="0"
                            max="100"
                            value={sliderValue}
                            onChange={(e) => setSliderValue(Number(e.target.value))}
                        />
                        Slider: {sliderValue}
                    </div>
                </div>

                <div role="tablist" className="nav nav-tabs mt-4">
                    <button role="tab" aria-selected="true" className="nav-link active">
                        Tab 1
                    </button>
                    <button role="tab" aria-selected="false" className="nav-link">
                        Tab 2
                    </button>

                </div>



                <div role="timer" className="alert alert-warning mt-2">
                    Time left: {timer}s
                </div>

                {/* SEARCH FORM */}
                <form role="search" className="mt-4">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search..." />
                        <button type="submit" className="btn btn-outline-secondary">
                            Search
                        </button>
                    </div>
                </form>
            </main>

            {/* DIALOG WINDOW & TOOLTIP */}
            <button

                onClick={() => setDialogOpen(true)}
                className="btn btn-dark mt-3"
            >
                Open
            </button>

            {isDialogOpen && (
                <div
                    role="dialog"
                    aria-labelledby="dialog-title"
                    aria-modal="true"
                    className="modal d-block"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2 id="dialog-title" className="modal-title">
                                    Dialog Window
                                </h2>
                                <button
                                    onClick={() => setDialogOpen(false)}
                                    className="btn-close"
                                >close</button>
                            </div>
                            <div className="modal-body">
                                <p>This is an accessible modal dialog.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div role="tooltip" className="tooltip bs-tooltip-top mt-4">
                Hover over me for more info
            </div>

            <footer role="contentinfo" className="bg-dark text-white text-center p-3 mt-4">
                © 2025 My Website
            </footer>
        </div>
    );
};

export default AccessibleComponent;
