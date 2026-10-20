/**
 * Component Name: PageTransition
 * Description: High-performance 3D page transition wrapper built with Framer Motion.
 *              Applies a smooth vertical 3D float, scale zoom, depth perspective, 
 *              and backdrop blur effect during route or view transitions.
 * Author: Full-Stack Developer Portfolio
 */

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Framer Motion Variants defining 3D vertical elevation and blur dynamics.
 * Animates elements smoothly from bottom-to-top rather than horizontal slides.
 */
const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.90,
    y: 50,
    rotateX: 10,
    filter: 'blur(6px)'
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] // Custom exponential ease-out for natural deceleration
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -40,
    rotateX: -10,
    filter: 'blur(6px)',
    transition: {
      duration: 0.35,
      ease: [0.4, 0, 1, 1] // Custom ease-in for crisp exit transitions
    }
  }
};

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child elements/components to be wrapped
 * @param {string|number} props.activeKey - Unique key trigger for animating between state/page changes
 */
const PageTransition = ({ children, activeKey }) => {
  return (
    // Perspective wrapper enabling realistic 3D spatial transformation depth
    <div style={{ perspective: '1400px', width: '100%', height: '100%', overflow: 'hidden' }}>
      <motion.div
        key={activeKey}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%' }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PageTransition;