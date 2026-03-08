import Shelves from "../components/Shelves.jsx";
import Nav from "../components/Nav.jsx";
import "../styles/Nav.css";
import AddMenu from "./AddMenu/AddMenu.jsx";
import { useEffect, useRef, useState } from "react";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";

function Homepage() {
    const [activeMenu, setActiveMenu] = useState(null);
    const addMenuRef = useRef(null);

    return (
        <div className="homepage">
            <Nav activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
            <Shelves />
            <AnimatePresence> {/* Needs to watch its children for it to work */}
                {activeMenu == null ? null : (
                    <div className="backdrop">
                        {activeMenu == "add" ? (
                            <motion.div
                                key="modal"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{
                                    duration: 0.2,
                                }}
                                style={{
                                    position: "fixed",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -45%)",
                                    zIndex: 2,
                                }}
                            >
                                <AddMenu ref={addMenuRef} />
                            </motion.div>
                        ) : null}
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Homepage;
