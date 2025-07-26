import { NextResponse } from 'next/server'

// Sample patient data - in a real app, this would come from a database
const patients = [
  {
    id: 1,
    prenom: "Jean",
    nom: "Dupont",
    prochaineSéance: "Demain 08:00",
    typeDialyse: "Hémodialyse",
    age: 65,
    telephone: "01 23 45 67 89"
  },
  {
    id: 2,
    prenom: "Marie",
    nom: "Martin",
    prochaineSéance: "Demain 08:30",
    typeDialyse: "Hémodialyse",
    age: 58,
    telephone: "01 98 76 54 32"
  },
  {
    id: 3,
    prenom: "Pierre",
    nom: "Durand",
    prochaineSéance: "Demain 13:00",
    typeDialyse: "Dialyse péritonéale",
    age: 72,
    telephone: "01 11 22 33 44"
  },
  {
    id: 4,
    prenom: "Sophie",
    nom: "Leroy",
    prochaineSéance: "Demain 13:30",
    typeDialyse: "Hémodialyse",
    age: 45,
    telephone: "01 55 66 77 88"
  },
  {
    id: 5,
    prenom: "Michel",
    nom: "Bernard",
    prochaineSéance: "Après-demain 08:00",
    typeDialyse: "Dialyse péritonéale",
    age: 69,
    telephone: "01 99 88 77 66"
  }
]

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  
  return NextResponse.json(patients)
}