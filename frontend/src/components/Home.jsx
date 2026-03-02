import Shelves from "../components/Shelves.jsx";
import Nav from "../components/Nav.jsx";
import "../styles/Nav.css";
import AddMenu from "./AddMenu.jsx";
import { useState } from "react";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";

function Homepage() {
    const [activeMenu, setActiveMenu] = useState(null);

    return (
        <div className="homepage">
            <Nav activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
            <Shelves />
            <AnimatePresence>
                {activeMenu == "add" ? (<motion.div
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
                        <AddMenu />
                    </motion.div>) : null }
                    
                </AnimatePresence>
        </div>
    );
}

export default Homepage;
