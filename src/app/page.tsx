import SessionTracking from "@/components/session-tracking"

export default function Home() {
  // Données exemple de patients
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
      typeDialyse: "Dialyse péritonéale" 
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
      prochaineSéance: "Lundi 09:00", 
      typeDialyse: "Hémodialyse" 
    },
    { 
      id: 5, 
      prenom: "Paul", 
      nom: "Bernard", 
      prochaineSéance: "Lundi 14:00", 
      typeDialyse: "Dialyse péritonéale" 
    },
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      <SessionTracking patients={patients} />
    </main>
  )
}