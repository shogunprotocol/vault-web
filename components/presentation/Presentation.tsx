'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import s from './presentation.module.scss';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    type: 'hero',
    title: 'Shogun with AI rebalances, vault secures.',
    subtitle: 'AI-Powered DeFi Yield Optimization',
    logo: '/images/logo/shogun_logo.png'
  },
  {
    id: 2,
    type: 'problem-intro',
    title: 'Drowning in protocols?',
    subtitle: 'We get it.',
    image: '/images/placeholder-video.png'
  },
  {
    id: 3,
    type: 'problems',
    title: 'The Problem',
    items: [
      'Inefficient yield discovery',
      'DeFi is STILL too complex',
      'Idle capital everywhere'
    ]
  },
  {
    id: 4,
    type: 'solution',
    title: 'The Solution',
    items: [
      'User deposit into specialized SuperVaults',
      'Our algorithms continuously scan the market to identify optimal yield opportunities while evaluating risk',
      'Shogun automatically rebalances assets across protocols to capture the highest yield within set risk parameters'
    ]
  },
  {
    id: 5,
    type: 'security-architecture',
    title: 'So Shogun is just an AI agent?',
    subtitle: 'What\'s the difference?',
    // features: [
    //   'Personal trained LLM for each user',
    //   'Agent has wallet but NEVER holds funds',
    //   'Funds stay in secure vault',
    //   'Agent can only execute whitelisted strategies',
    //   'Curated smart contracts only'
    // ]
  },
  {
    id: 6,
    type: 'business-model',
    title: 'Business Model',
    content: 'Coming soon...'
  },
  {
    id: 7,
    type: 'demo',
    title: 'Demo',
    video: '/video/720p_belt.mp4'
  }
];

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (currentSlide < slides.length - 1) {
          setDirection(1);
          setCurrentSlide(prev => prev + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentSlide > 0) {
          setDirection(-1);
          setCurrentSlide(prev => prev - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const renderSlide = (slide: typeof slides[0]) => {
    switch (slide.type) {
      case 'hero':
        return (
          <div className={s.heroSlide}>
            <div className={s.heroContent}>
              <div className={s.heroText}>
                <h1 className={s.heroTitle}>{slide.title}</h1>
                <p className={s.heroSubtitle}>{slide.subtitle}</p>
              </div>
              <div className={s.heroLogo}>
                <Image 
                  src={slide.logo || ''} 
                  alt="Shogun Logo" 
                  width={300} 
                  height={300}
                  className={s.logoImage}
                />
              </div>
            </div>
          </div>
        );

      case 'problem-intro':
        return (
          <div className={s.problemIntroSlide}>
            <div className={s.problemIntroContent}>
              <div className={s.problemIntroText}>
                <h1 className={s.problemIntroTitle}>{slide.title}</h1>
                <p className={s.problemIntroSubtitle}>{slide.subtitle}</p>
              </div>
              <div className={s.problemIntroImage}>
                <Image 
                  src={slide.image || ''} 
                  alt="Protocols" 
                  width={500} 
                  height={400}
                  className={s.introImage}
                />
              </div>
            </div>
          </div>
        );

      case 'problems':
        return (
          <div className={s.problemsSlide}>
            <h1 className={s.slideTitle}>{slide.title}</h1>
            <div className={s.problemsList}>
              {slide.items?.map((item, index) => (
                <motion.div
                  key={index}
                  className={s.problemItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <span className={s.problemNumber}>{index + 1}</span>
                  <span className={s.problemText}>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'solution':
        return (
          <div className={s.solutionSlide}>
            <h1 className={s.slideTitle}>{slide.title}</h1>
            <div className={s.solutionList}>
              {slide.items?.map((item, index) => (
                <motion.div
                  key={index}
                  className={s.solutionItem}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.3 }}
                >
                  <div className={s.solutionIcon}>⚔️</div>
                  <p className={s.solutionText}>{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'security-architecture':
        return (
          <div className={s.securityArchitectureSlide}>
            <h1 className={s.slideTitle}>{slide.title}</h1>
            <p className={s.securityArchitectureSubtitle}>{slide.subtitle}</p>
            
            <div className={s.securityArchitectureDiagram}>
              {/* Top Row: User and Vault */}
              <div className={s.diagramRow}>
                <div className={s.diagramSection}>
                  <div className={s.diagramLabel}>👤 User</div>
                  <div className={s.diagramBox}>
                    <div className={s.diagramIcon}>💰</div>
                    <div className={s.diagramText}>Deposits Funds</div>
                  </div>
                </div>

                <div className={s.diagramArrow}>
                  <svg width="80" height="20" viewBox="0 0 80 20">
                    <path d="M0 10 L70 10" stroke="#00ffff" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)"/>
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#00ffff"/>
                      </marker>
                    </defs>
                  </svg>
                </div>

                <div className={s.diagramSection}>
                  <div className={s.diagramLabel}>🔒 Secure Vault</div>
                  <div className={s.diagramBox}>
                    <div className={s.diagramIcon}>🏦</div>
                    <div className={s.diagramText}>Funds Stored Here</div>
                    <div className={s.diagramSubtext}>Never leaves this vault</div>
                  </div>
                </div>
              </div>

              {/* Middle: Security Barrier */}
              <div className={s.securityBarrier}>
                <div className={s.barrierLabel}>🛡️ Security Layer</div>
                <div className={s.barrierContent}>
                  <div className={s.barrierItem}>• Whitelisted Strategies Only</div>
                  <div className={s.barrierItem}>• Curated Smart Contracts</div>
                  <div className={s.barrierItem}>• Pre-approved Addresses</div>
                </div>
              </div>

              {/* Bottom Row: AI Agent and DeFi */}
              <div className={s.diagramRow}>
                <div className={s.diagramSection}>
                  <div className={s.diagramLabel}>🤖 AI Agent</div>
                  <div className={s.diagramBox}>
                    <div className={s.diagramIcon}>⚔️</div>
                    <div className={s.diagramText}>Strategy Execution</div>
                    <div className={s.diagramSubtext}>No direct fund access</div>
                  </div>
                </div>

                <div className={s.diagramArrow}>
                  <svg width="80" height="20" viewBox="0 0 80 20">
                    <path d="M0 10 L70 10" stroke="#ff6b6b" strokeWidth="3" fill="none" markerEnd="url(#arrowhead2)"/>
                    <defs>
                      <marker id="arrowhead2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#ff6b6b"/>
                      </marker>
                    </defs>
                  </svg>
                </div>

                <div className={s.diagramSection}>
                  <div className={s.diagramLabel}>🌊 DeFi Protocols</div>
                  <div className={s.diagramBox}>
                    <div className={s.diagramIcon}>📊</div>
                    <div className={s.diagramText}>Yield Opportunities</div>
                    <div className={s.diagramSubtext}>Whitelisted only</div>
                  </div>
                </div>
              </div>
            </div>

            <div className={s.securityArchitectureFeatures}>
              {slide.features?.map((feature, index) => (
                <motion.div
                  key={index}
                  className={s.securityArchitectureFeature}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <span className={s.securityArchitectureFeatureBullet}>•</span>
                  <span className={s.securityArchitectureFeatureText}>{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'business-model':
        return (
          <div className={s.businessModelSlide}>
            <h1 className={s.slideTitle}>{slide.title}</h1>
            <div className={s.businessModelContent}>
              <p className={s.businessModelText}>{slide.content}</p>
            </div>
          </div>
        );

      case 'demo':
        return (
          <div className={s.demoSlide}>
            <h1 className={s.slideTitle}>{slide.title}</h1>
            <div className={s.demoVideo}>
              <video 
                autoPlay 
                loop 
                muted 
                className={s.video}
                controls
              >
                <source src={slide.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={s.presentation}>
      <div className={s.presentationContainer} ref={containerRef}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className={s.slide}
          >
            {renderSlide(slides[currentSlide])}
          </motion.div>
        </AnimatePresence>

        {/* Navigation indicators */}
        <div className={s.navigation}>
          <div className={s.slideIndicators}>
            {slides.map((_, index) => (
              <button
                key={index}
                className={`${s.indicator} ${index === currentSlide ? s.active : ''}`}
                onClick={() => {
                  setDirection(index > currentSlide ? 1 : -1);
                  setCurrentSlide(index);
                }}
              />
            ))}
          </div>
          
          <div className={s.navigationText}>
            <span>Use ← → arrow keys to navigate</span>
            <span className={s.slideCounter}>
              {currentSlide + 1} / {slides.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Presentation; 