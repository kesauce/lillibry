import Shelves from "../components/Shelves.jsx";
import Nav from "../components/Nav.jsx";
import "../styles/Nav.css";
import AddMenu from "./AddMenu.jsx";
import { useEffect, useRef, useState } from "react";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";

function Homepage() {
    const [activeMenu, setActiveMenu] = useState(null);
    const addMenuRef = useRef(null);

    // If you click out of the add menu, close it
    useEffect(() => {
        if (activeMenu != null) {
        }
    }, [activeMenu]);

    return (
        <div className="homepage">
            <Nav activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
            <Shelves />
            {activeMenu == null ? null : (
                <div className="backdrop">
                    <AnimatePresence>
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
                                    transform: "translate(-50%, -50%)",
                                    zIndex: 2,
                                }}
                            >
                                <AddMenu ref={addMenuRef} />
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}

export default Homepage;
