import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"

interface Patient {
  id: number
  prenom: string
  nom: string
  prochaineSeance: string
  typeDialyse: string
}

interface SessionTrackingProps {
  patients: Patient[]
}

export default function SessionTracking({ patients }: SessionTrackingProps) {
  const sessionsAujourdhui = [
    {
      id: 1,
      patient: "Jean Dupont",
      heure: "08:00",
      duree: "4h",
      status: "En cours",
      poste: "A1",
    },
    {
      id: 2,
      patient: "Marie Martin",
      heure: "08:30",
      duree: "4h",
      status: "Programmée",
      poste: "A2",
    },
    {
      id: 3,
      patient: "Pierre Durand",
      heure: "13:00",
      duree: "4h",
      status: "Programmée",
      poste: "B1",
    },
    {
      id: 4,
      patient: "Sophie Leroy",
      heure: "13:30",
      duree: "4h",
      status: "Programmée",
      poste: "B2",
    },
  ]

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
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Séances du Jour
          </CardTitle>
          <CardDescription>
            Planning des séances de dialyse pour aujourd'hui
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sessionsAujourdhui.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-3 h-3 rounded-full ${getStatusColor(
                      session.status
                    )}`}
                  />
                  <div>
                    <p className="font-medium">{session.patient}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {session.heure}
                      </span>
                      <span>Durée: {session.duree}</span>
                      <span>Poste: {session.poste}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={session.status === "En cours" ? "default" : "secondary"}>
                    {session.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Détails
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Statistiques Séances</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Séances cette semaine</span>
                <span className="font-bold">24</span>
              </div>
              <div className="flex justify-between">
                <span>Séances annulées</span>
                <span className="font-bold text-red-600">2</span>
              </div>
              <div className="flex justify-between">
                <span>Taux d'observance</span>
                <span className="font-bold text-green-600">92%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prochaines Séances</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {patients.slice(0, 3).map((patient) => (
                <div
                  key={patient.id}
                  className="flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">
                      {patient.prenom} {patient.nom}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {patient.prochaineSeance}
                    </p>
                  </div>
                  <Badge variant="outline">{patient.typeDialyse}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}