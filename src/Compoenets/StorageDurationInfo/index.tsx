import React from "react";

export const StorageDurationInfo: React.FC = () => {
    return (
        <section className="py-4" aria-labelledby="storage-duration">
            <h2 id="storage-duration" className="fw-bold">Dauer der Lagerung</h2>
            <div className="fw-bold py-2">1 Monat</div>
            <div>
                <span className="fw-bold">Wichtiger Hinweis:</span> In diesem Formular ist nur die
                <span className="fw-bold"> Eingabe von Privatpersonen</span> möglich. Nutzen Sie das
                Auftragsformular Lagerservice geschäftlich für die Lagerung Ihrer geschäftlichen Post.
                Eine Kombination privater und geschäftlicher Aufträge ist nicht möglich.
            </div>
        </section>
    );
};