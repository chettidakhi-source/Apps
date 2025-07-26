import SessionTracking from "@/components/SessionTracking"

export default function HomePage() {
  const patients = [
    {
      id: 1,
      prenom: "Jean",
      nom: "Dupont",
      prochaineSeance: "15 Janvier 2025, 08:00",
      typeDialyse: "Hémodialyse",
    },
    {
      id: 2,
      prenom: "Marie",
      nom: "Martin",
      prochaineSeance: "15 Janvier 2025, 08:30",
      typeDialyse: "Hémodialyse",
    },
    {
      id: 3,
      prenom: "Pierre",
      nom: "Durand",
      prochaineSeance: "15 Janvier 2025, 13:00",
      typeDialyse: "Hémodialyse",
    },
  ]

  return (
    <main className="container mx-auto max-w-5xl py-10 px-4">
      <SessionTracking patients={patients} />
    </main>
  )
}