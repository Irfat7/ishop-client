import React, { ReactElement, useRef } from "react";
import { motion, useInView } from 'framer-motion'

const AnimateComponent: React.FC<{ children: ReactElement, className?: string }> = ({ children, className = '' }) => {
    const animateRef = useRef(null)
    const isInView = useInView(animateRef, { once: true });
    return (
        <motion.div
            ref={animateRef}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView && { opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default AnimateComponent;