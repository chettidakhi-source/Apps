export interface Patient {
  id: number
  prenom: string
  nom: string
  prochaineSéance: string
  typeDialyse: string
  dateNaissance?: string
  numeroTelephone?: string
  email?: string
}

export interface Session {
  id: number
  patient: string
  heure: string
  duree: string
  status: "En cours" | "Terminée" | "Programmée" | "Annulée"
  poste: string
  dateSession?: string
  notes?: string
}

export interface Statistiques {
  seancesSemaine: number
  seancesAnnulees: number
  tauxObservance: string
  totalPatients?: number
  seancesCompletees?: number
}

export interface ExportData {
  date: string
  sessionsAujourdhui: Session[]
  statistiques: Statistiques
  prochaineSéances: Patient[]
}