"use client"

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub, faLinkedin, faWhatsapp} from "@fortawesome/free-brands-svg-icons";
import {faAddressBook, faEnvelope} from "@fortawesome/free-solid-svg-icons";

export default function FooterComponent() {
    const handleModalOpen = () => {
        const modalElement = document.getElementById('contact_modal') as HTMLDialogElement;
        if (modalElement) {
            modalElement.showModal();
        }
    };

    return (
        <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-6">
            <nav className={'flex items-center justify-between'}>
                <div className="grid grid-flow-col gap-6">
                    <a href="https://github.com/TamasruPain" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                        <FontAwesomeIcon icon={faGithub} size='2xl'/>
                    </a>
                    <a href="https://www.linkedin.com/in/tamasrupain/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                        <FontAwesomeIcon icon={faLinkedin} size="2xl"/>
                    </a>
                    <button onClick={handleModalOpen} className="btn btn-ghost">
                        <FontAwesomeIcon icon={faAddressBook} size="2xl"/>
                    </button>
                </div>
            </nav>

            <dialog id="contact_modal" className="modal">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">My contacts!</h3>
                    <p className="py-4"><FontAwesomeIcon icon={faEnvelope} /> tamasrupain02@gmail.com</p>
                    <p className="py-4"><FontAwesomeIcon icon={faWhatsapp} /> +91 9903958424</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            <aside>
                <p>Copyright © {new Date().getFullYear()} - @tamasrupain</p>
            </aside>
        </footer>
    );
}