import { NextResponse } from 'next/server'

// Sample session data - in a real app, this would come from a database
const sessions = [
  {
    id: 1,
    patient: "Jean Dupont",
    heure: "08:00",
    duree: "4h",
    status: "En cours",
    poste: "A1",
    date: "2024-01-15"
  },
  {
    id: 2,
    patient: "Marie Martin",
    heure: "08:30",
    duree: "4h",
    status: "Programmée",
    poste: "A2",
    date: "2024-01-15"
  },
  {
    id: 3,
    patient: "Pierre Durand",
    heure: "13:00",
    duree: "4h",
    status: "Programmée",
    poste: "B1",
    date: "2024-01-15"
  },
  {
    id: 4,
    patient: "Sophie Leroy",
    heure: "13:30",
    duree: "4h",
    status: "Programmée",
    poste: "B2",
    date: "2024-01-15"
  },
  {
    id: 5,
    patient: "Michel Bernard",
    heure: "08:00",
    duree: "4h",
    status: "Terminée",
    poste: "A3",
    date: "2024-01-14"
  }
]

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return NextResponse.json(sessions)
}