/* eslint-disable react/prop-types */
import { useState } from 'react';

const RoleModal = ({ onRoleSelect, closeModal }) => {
  const [modalOpen, setModalOpen] = useState(true);

  const handleRoleSelect = (role) => {
    // Perform any additional actions related to role selection here
    // ...

    // Call the callback function to handle role selection in the Register component
    onRoleSelect(role);

    // Close the modal
    setModalOpen(false);
  };

  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" checked={modalOpen} />
      <div className={`modal ${modalOpen ? 'open' : ''}`} role="dialog" onClick={closeModal}>
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center">
            Select Your <span className="text-rose">Role</span>
          </h3>
          <div className="mt-5">
            <div className="flex flex-wrap gap-6 justify-center items-center">
              <div
                className="flex flex-col items-center justify-center m-4"
                onClick={() => handleRoleSelect('organizer')}
              >
                <img src="/Organizer.png" alt="" className="w-20 h-20" />
                <p className="text-center font-semibold mt-3">Organizer</p>
              </div>
              <div
                className="flex flex-col items-center justify-center m-4"
                onClick={() => handleRoleSelect('professional')}
              >
                <img src="/Professional.png" alt="" className="w-20 h-20" />
                <p className="text-center font-semibold mt-3">Professional</p>
              </div>
              <div
                className="flex flex-col items-center justify-center m-4"
                onClick={() => handleRoleSelect('participant')}
              >
                <img src="/Participant.png" alt="" className="w-20 h-20" />
                <p className="text-center font-semibold mt-3">Participant</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleModal;
