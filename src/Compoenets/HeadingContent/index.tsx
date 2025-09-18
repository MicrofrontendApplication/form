import React, { useState } from "react";
import styles from "./HeadingContent.module.scss"; // ✅ corrected here

function HeadingContent() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleContent = () => {
    setIsOpen(!isOpen);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault(); // Prevent scrolling on space
      toggleContent();
    }
  };
  return (
    <div>
      <h2>Nachsendeservice</h2>
      <div>
        Mit einem Nachsendeauftrag empfangen Sie an Ihrer neuen Adresse Post,
        die an Ihre alte Adresse gerichtet ist
      </div>
      <div className={styles.horizontaline} />

      <div
        onClick={toggleContent}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        className={styles.headingRow}
        role="button"
        aria-expanded={isOpen}
        aria-controls="toggle-content"
      >
        <div>Weitere Infos und häufige Fragen</div>
        <div>
          {isOpen ? (
            <>
              <svg
                fill="#000000"
                height="16"
                width="16"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 511.735 511.735"
              >
                <g>
                  <g>
                    <path
                      d="M508.788,371.087L263.455,125.753c-4.16-4.16-10.88-4.16-15.04,0L2.975,371.087c-4.053,4.267-3.947,10.987,0.213,15.04
			c4.16,3.947,10.667,3.947,14.827,0l237.867-237.76l237.76,237.76c4.267,4.053,10.987,3.947,15.04-0.213
			C512.734,381.753,512.734,375.247,508.788,371.087z"
                    />
                  </g>
                </g>
              </svg>
            </>
          ) : (
            <>
              <svg
                width="16"
                height="16"
                viewBox="0 0 1024 1024"
                className="icon"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z"
                  fill="#000000"
                />
              </svg>
            </>
          )}{" "}
          {/* ✅ fixed arrow logic */}
        </div>
      </div>

      {isOpen && (
        <>
          <div>
            Bei Umzug oder längerer Abwesenheit braucht es eine zuverlässige
            Postnachsendung an Ihre neue oder vorübergehende Adresse. Mit dem
            Nachsendeauftrag der Deutschen Post stellen Sie diese für 6 oder 12
            Monate sicher und bleiben für private Kontakte und wichtige
            Vertragspartner (z.B. Banken, Versicherungen, Behörden) postalisch
            erreichbar.
          </div>
          <ul>
            <li>
              Jetzt bequem und günstig online beauftragen ab 4,82 € / Monat bei
              6 Monaten Laufzeit
            </li>

            <li>
              Bei Umzug, vorübergehender Abwesenheit, Sterbefall oder Insolvenz-
              und Betreuungsfall
            </li>
            <li>
              GoGreen:
              <div>
                Nachhaltiger Versand mit der Deutschen Post. Mit Investitionen
                deutschepost.de/cogreen in weltweite zertifizierte
                Klimaschutzprojekte kompensieren wir die Treibhausgasemissionen,
                die beim Transport inrer Sendungen entstanden sind. Weitere
                Informationen unter Häufige Fragen zum Nachsendeservice Bitte
                beachten Sie, dass einige Sendungsamenvon der Nachsendung
                ausgeschlossen sind.
              </div>
            </li>
          </ul>
          <a href="">Häufige Fragen zum Nachsendeservice</a>
          <div className={styles.horizontaline} />
          <div>
            Bitte beachten Sie, dass einige Sendungsamenvon der Nachsendung
            ausgeschlossen sind.
          </div>
        </>
      )}
    </div>
  );
}

export default HeadingContent;
