import { useEffect, useState } from 'react';
import { blankDraft } from '../lib/document';
import type { DocumentDraft, DocumentType } from '../types';
export function useLocalDraft(type: DocumentType) { const key = `invoicepilot-v2-draft-${type}`; const [draft,setDraft] = useState<DocumentDraft>(() => { try { return JSON.parse(localStorage.getItem(key) || '') } catch { return blankDraft(type) } }); useEffect(() => { const timer = window.setTimeout(() => localStorage.setItem(key, JSON.stringify(draft)), 350); return () => clearTimeout(timer); }, [draft,key]); return [draft,setDraft] as const; }
