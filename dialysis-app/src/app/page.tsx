import SessionTracking from "@/components/SessionTracking"
import PDFExport from "@/components/PDFExport"

// Sample patient data
const samplePatients = [
  {
    id: 1,
    prenom: "Jean",
    nom: "Dupont",
    prochaineSéance: "Demain 08:00",
    typeDialyse: "Hémodialyse"
  },
  {
    id: 2,
    prenom: "Marie",
    nom: "Martin",
    prochaineSéance: "Demain 08:30",
    typeDialyse: "Hémodialyse"
  },
  {
    id: 3,
    prenom: "Pierre",
    nom: "Durand",
    prochaineSéance: "Demain 13:00",
    typeDialyse: "Dialyse péritonéale"
  },
  {
    id: 4,
    prenom: "Sophie",
    nom: "Leroy",
    prochaineSéance: "Demain 13:30",
    typeDialyse: "Hémodialyse"
  },
  {
    id: 5,
    prenom: "Michel",
    nom: "Bernard",
    prochaineSéance: "Après-demain 08:00",
    typeDialyse: "Dialyse péritonéale"
  }
]

// Sample session data
const sampleSessions = [
  { id: 1, patient: "Jean Dupont", heure: "08:00", duree: "4h", status: "En cours", poste: "A1" },
  { id: 2, patient: "Marie Martin", heure: "08:30", duree: "4h", status: "Programmée", poste: "A2" },
  { id: 3, patient: "Pierre Durand", heure: "13:00", duree: "4h", status: "Programmée", poste: "B1" },
  { id: 4, patient: "Sophie Leroy", heure: "13:30", duree: "4h", status: "Programmée", poste: "B2" },
]

// Sample statistics data
const sampleStatistics = {
  seancesCetteSemaine: 24,
  seancesAnnulees: 2,
  tauxObservance: 92
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Centre de Dialyse</h1>
          <p className="text-gray-600 mt-2">Tableau de bord des séances</p>
        </div>
        
        <div className="grid gap-8">
          <SessionTracking patients={samplePatients} />
          <PDFExport 
            patients={samplePatients}
            sessions={sampleSessions}
            statistics={sampleStatistics}
          />
        </div>
      </div>
    </main>
  )
}
