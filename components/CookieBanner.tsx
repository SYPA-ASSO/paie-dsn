'use client'

// components/CookieBanner.tsx
// Banniere de consentement aux cookies conforme CNIL (deliberation 2020-091).
// - Cookies techniques : toujours actifs, exemptes de consentement.
// - Cookies analytiques Google Analytics : actives uniquement sur consentement.
// Le choix est stocke 13 mois (395 jours) dans le cookie cholez_pagotto_consent.

import { useState, useEffect } from 'react'
import { BarChart2, Cookie, X, Check } from 'lucide-react'

const COOKIE_KEY = 'cholez_pagotto_consent'
const COOKIE_DAYS = 395 // 13 mois CNIL

function ecrireChoix(valeur: 'granted' | 'denied') {
  const exp = new Date()
  exp.setDate(exp.getDate() + COOKIE_DAYS)
  document.cookie = `${COOKIE_KEY}=${valeur}; expires=${exp.toUTCString()}; path=/; SameSite=Lax`
}

function lireChoix(): 'granted' | 'denied' | null {
  if (typeof document === 'undefined') return null
  if (document.cookie.includes(`${COOKIE_KEY}=granted`)) return 'granted'
  if (document.cookie.includes(`${COOKIE_KEY}=denied`)) return 'denied'
  return null
}

function emettre(valeur: 'granted' | 'denied') {
  window.dispatchEvent(new CustomEvent('cookieConsent', { detail: valeur }))
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [choix, setChoix] = useState<'granted' | 'denied' | null>(null)

  useEffect(() => {
    const c = lireChoix()
    setChoix(c)
    if (!c) setVisible(true)
  }, [])

  const accepter = () => {
    ecrireChoix('granted')
    emettre('granted')
    setChoix('granted')
    setVisible(false)
  }

  const refuser = () => {
    ecrireChoix('denied')
    emettre('denied')
    setChoix('denied')
    setVisible(false)
  }

  // Bouton flottant pour rouvrir les preferences (toujours accessible)
  if (!visible && choix !== null) return (
    <button
      type="button"
      aria-label="Gestion des cookies"
      onClick={() => setVisible(true)}
      style={{
        position: 'fixed', bottom: '16px', left: '16px', zIndex: 999,
        width: 36, height: 36, borderRadius: '50%',
        background: '#f8fafc', border: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      <Cookie size={16} color="#6b7280" strokeWidth={1.5} />
    </button>
  )

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Gestion des cookies"
      aria-modal="false"
      style={{
        position: 'fixed', bottom: '20px', left: '20px', zIndex: 1000,
        maxWidth: '400px', width: 'calc(100vw - 40px)',
        background: 'white',
        border: '1px solid #e5e7eb',
        borderTop: '3px solid #b8860b',
        borderRadius: '14px',
        boxShadow: '0 16px 48px rgba(15,45,110,0.18)',
        padding: '1.25rem',
      }}
    >
      {/* En-tete */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '12px' }}>
        <div style={{
          width: 36, height: 36, borderRadius: '8px',
          background: '#eff6ff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Cookie size={18} color="#1a4fba" strokeWidth={1.5} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ color: '#0f2d6e', fontSize: '14px', fontWeight: 700, margin: '0 0 2px' }}>
            Cookies et confidentialite
          </p>
          <p style={{ color: '#6b7280', fontSize: '11.5px', margin: 0, lineHeight: 1.4 }}>
            Cabinet Cholez-Pagotto
          </p>
        </div>
        {choix !== null && (
          <button
            type="button"
            onClick={() => setVisible(false)}
            aria-label="Fermer"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: 2, flexShrink: 0 }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Cookies techniques (informatif) */}
      <div style={{
        background: '#f8fafc', border: '1px solid #e5e7eb', borderRadius: '8px',
        padding: '8px 12px', marginBottom: '10px',
        display: 'flex', alignItems: 'flex-start', gap: '8px',
      }}>
        <Check size={14} color="#15803d" strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <p style={{ color: '#374151', fontSize: '12px', fontWeight: 600, margin: '0 0 2px' }}>
            Cookies techniques : toujours actifs
          </p>
          <p style={{ color: '#6b7280', fontSize: '11px', lineHeight: 1.5, margin: 0 }}>
            Session, authentification et securite du paiement. Indispensables au fonctionnement du site, exemptes de consentement (CNIL 2020-091).
          </p>
        </div>
      </div>

      {/* Google Analytics (choix) */}
      <div style={{
        background: '#fffaf0', border: '1px solid #f0d488', borderRadius: '8px',
        padding: '8px 12px', marginBottom: '14px',
        display: 'flex', alignItems: 'flex-start', gap: '8px',
      }}>
        <BarChart2 size={14} color="#b8860b" strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <p style={{ color: '#374151', fontSize: '12px', fontWeight: 600, margin: '0 0 2px' }}>
            Mesure d'audience : votre choix
          </p>
          <p style={{ color: '#6b7280', fontSize: '11px', lineHeight: 1.5, margin: 0 }}>
            Google Analytics nous aide a comprendre comment le site est utilise pour l'ameliorer. Aucune publicite, aucun suivi entre sites. Conservation 13 mois.
          </p>
        </div>
      </div>

      {/* Boutons */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
        <button
          type="button"
          onClick={accepter}
          style={{
            flex: 1, padding: '10px 0',
            background: '#0f2d6e', color: 'white',
            border: 'none', borderRadius: '8px',
            fontSize: '13px', fontWeight: 700, cursor: 'pointer',
          }}
        >
          Accepter
        </button>
        <button
          type="button"
          onClick={refuser}
          style={{
            flex: 1, padding: '10px 0',
            background: 'white', color: '#0f2d6e',
            border: '1.5px solid #0f2d6e', borderRadius: '8px',
            fontSize: '13px', fontWeight: 700, cursor: 'pointer',
          }}
        >
          Refuser
        </button>
      </div>

      {/* Pied */}
      <p style={{ color: '#9ca3af', fontSize: '10.5px', margin: 0, lineHeight: 1.6, textAlign: 'center' }}>
        Votre choix est enregistre 13 mois.{' '}
        <a href="/confidentialite" style={{ color: '#b8860b', fontWeight: 600 }}>
          Politique de confidentialite
        </a>
      </p>
    </div>
  )
}
