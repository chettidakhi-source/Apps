import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, BarChart3 } from "lucide-react"

interface Patient {
  id: number
  prenom: string
  nom: string
  prochaineSéance: string
  typeDialyse: string
}

interface Session {
  id: number
  patient: string
  heure: string
  duree: string
  status: string
  poste: string
}

interface PDFPreviewProps {
  patients: Patient[]
  sessions: Session[]
  statistics: {
    seancesCetteSemaine: number
    seancesAnnulees: number
    tauxObservance: number
  }
}

export default function PDFPreview({ patients, sessions, statistics }: PDFPreviewProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "En cours":
        return "bg-green-500"
      case "Terminée":
        return "bg-blue-500"
      case "Programmée":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border" id="pdf-preview">
      {/* En-tête du rapport */}
      <div className="text-center mb-8 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Centre de Dialyse</h1>
        <p className="text-gray-600">Rapport des Séances - {new Date().toLocaleDateString('fr-FR')}</p>
      </div>

      {/* Statistiques */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Statistiques de la Semaine
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{statistics.seancesCetteSemaine}</div>
            <div className="text-sm text-gray-600">Séances</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{statistics.seancesAnnulees}</div>
            <div className="text-sm text-gray-600">Annulées</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{statistics.tauxObservance}%</div>
            <div className="text-sm text-gray-600">Observance</div>
          </div>
        </div>
      </div>

      {/* Séances du jour */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Séances du Jour
        </h2>
        <div className="space-y-3">
          {sessions.map((session) => (
            <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getStatusColor(session.status)}`} />
                <div>
                  <div className="font-medium">{session.patient}</div>
                  <div className="text-sm text-gray-600 flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {session.heure}
                    </span>
                    <span>Poste: {session.poste}</span>
                    <span>Durée: {session.duree}</span>
                  </div>
                </div>
              </div>
              <Badge variant={session.status === "En cours" ? "default" : "secondary"}>
                {session.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Patients */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Prochaines Séances
        </h2>
        <div className="grid gap-3">
          {patients.slice(0, 5).map((patient) => (
            <div key={patient.id} className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <div className="font-medium">{patient.prenom} {patient.nom}</div>
                <div className="text-sm text-gray-600">{patient.prochaineSéance}</div>
              </div>
              <Badge variant="outline">{patient.typeDialyse}</Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Pied de page */}
      <div className="text-center text-sm text-gray-500 border-t pt-4 mt-6">
        <p>Document généré le {new Date().toLocaleString('fr-FR')}</p>
        <p>Centre de Dialyse - Tous droits réservés</p>
      </div>
    </div>
  )
}