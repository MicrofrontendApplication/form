import React, { useState } from 'react';
import styles from './AddressNotification.module.scss'
import { Input } from 'microfrontend';

interface AddressNotificationInfoProps {
 
  onFamilyMembersChange?: (members: { [key: string]: boolean }) => void;
 
}
const   initialMembers = [
    { id: 'father', name: 'Theodor Testfather', checked: true },
    { id: 'mother', name: 'Kate Testmother', checked: false },
    { id: 'son', name: 'Harry Testson', checked: false }
  ]
const AddressNotificationInfo: React.FC<AddressNotificationInfoProps> = ({

  onFamilyMembersChange,

}) => {
  const [members, setMembers] = useState<{ [key: string]: boolean }>(() => {
    const memberState: { [key: string]: boolean } = {};
    initialMembers.forEach(member => {
      memberState[member.id] = member.checked;
    });
    return memberState;
  });

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const updatedMembers = {
      ...members,
      [name]: checked
    };
    
    setMembers(updatedMembers);
    
    if (onFamilyMembersChange) {
      onFamilyMembersChange(updatedMembers);
    }
  };

  const handleCheckboxKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, memberName: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const checkbox = event.target as HTMLInputElement;
      checkbox.checked = !checkbox.checked;
      
      const changeEvent = {
        target: {
          name: memberName,
          checked: checkbox.checked
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      handleCheckboxChange(changeEvent);
    }
  };

  return (
    <>
         <div className="">
        <div className={styles.listContainer}>
          <ul className={styles.list}>
            <li className={styles.item}>
              Ihre neue Anschrift wird solchen Vertrags- und
              Kommunikationspartnern zur Aktualisierung zur Verfügung gestellt,
              die Ihre alte Anschrift bereits kennen, wie z. B. Ihrer Bank,
              Ihrer Versicherung, etc.
            </li>
            <li className={styles.item}>
              Dadurch wird vermieden, dass Ihre Post nach Ablauf des
              Nachsendeauftrages an Ihre alte Adresse fehlgeleitet wird.
            </li>
            <li className={styles.item}>
              Die Aktualisierung erfolgt für alle im Auftrag
            </li>
            <li className={styles.item}>
              Dadurch wird vermieden, dass Ihre Post nach Ablauf des
              Nachsendeauftrages an Ihre alte Adresse fehlgeleitet wird.
            </li>
            <li className={styles.item}>
              Die Aktualisierung erfolgt für alle im Auftrag genannten Personen.
            </li>
          </ul>
        </div>
        <div>
          <span className="fw-bold"> Hinweis:</span> Sie willigen für sich und
          die im Auftrag aufgeführten Personen ein, dass die Deutsche Post
          selbst und/oder unter Einschaltung eines professionellen
          Dienstleisters für Adressaktualisierungen die dauerhafte
          Anschriftenänderung denjenigen, die die alte Anschrift bereits kennen,
          zur Adressaktualisierung zur Verfügung stellt, damit möglichst viele
          zukünftige Postsendungen sofort die neue Anschrift erhalten (nur
          relevant bei Nachsendung wegen Umzugs). Möchten Mitglieder Ihres
          Haushalts die Einwilligung nicht erteilen, können Sie Ihre
          Einstellungen hier anpassen ✓ Theodor Testfather
        </div>
      </div>

      <div
        role="group"
        aria-labelledby="family-members-label"
        className={styles.container}
      >
        <h2 id="family-members-label" className="sr-only">
          Select family members
        </h2>

        <div className={styles.checkboxWrapper}>
          <Input
            type="checkbox"
            id="father"
            name="father"
            checked={members.father}
            onChange={handleCheckboxChange}
            onKeyDown={(e) => handleCheckboxKeyDown(e, 'father')}
          />
          <label htmlFor="father">Theodor Testfather</label>
        </div>

        <div className={styles.checkboxWrapper}>
          <Input
            type="checkbox"
            id="mother"
            name="mother"
            checked={members.mother}
            onChange={handleCheckboxChange}
            onKeyDown={(e) => handleCheckboxKeyDown(e, 'mother')}
          />
          <label htmlFor="mother">Kate Testmother</label>
        </div>

        <div className={styles.checkboxWrapper}>
          <Input
            type="checkbox"
            id="son"
            name="son"
            checked={members.son}
            onChange={handleCheckboxChange}
            onKeyDown={(e) => handleCheckboxKeyDown(e, 'son')}
          />
          <label htmlFor="son">Harry Testson</label>
        </div>
      </div>
      </>
  );
};

export default AddressNotificationInfo;