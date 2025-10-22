import { NextResponse } from 'next/server'

// Sample statistics data - in a real app, this would be calculated from database
const statistics = {
  seancesCetteSemaine: 24,
  seancesAnnulees: 2,
  tauxObservance: 92,
  seancesEnCours: 1,
  seancesProgrammees: 3,
  seancesTerminees: 20,
  totalPatients: 15,
  patientsActifs: 12
}

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return NextResponse.json(statistics)
}