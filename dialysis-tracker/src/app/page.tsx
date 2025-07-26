import SessionTracking from "@/components/SessionTracking"

export default function Home() {
  // Sample patient data
  const patients = [
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
      typeDialyse: "Hémodialyse"
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
      prenom: "Claude",
      nom: "Moreau",
      prochaineSéance: "Après-demain 08:00",
      typeDialyse: "Hémodialyse"
    }
  ]

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Centre de Dialyse</h1>
          <p className="text-gray-600 mt-2">Suivi des séances et des patients</p>
        </div>
        <SessionTracking patients={patients} />
      </div>
    </main>
  )
}
