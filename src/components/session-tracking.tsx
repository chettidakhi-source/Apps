"use client"

import React, { useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Download, FileText } from "lucide-react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

interface Patient {
  id: number
  prenom: string
  nom: string
  prochaineSéance: string
  typeDialyse: string
}

interface SessionTrackingProps {
  patients?: Patient[]
}

export default function SessionTracking({ patients = [] }: SessionTrackingProps) {
  const componentRef = useRef<HTMLDivElement>(null)
  const today = new Date().toISOString().split("T")[0]

  // Données exemple pour les séances d'aujourd'hui
  const sessionsAujourdhui = [
    { id: 1, patient: "Jean Dupont", heure: "08:00", duree: "4h", status: "En cours", poste: "A1" },
    { id: 2, patient: "Marie Martin", heure: "08:30", duree: "4h", status: "Programmée", poste: "A2" },
    { id: 3, patient: "Pierre Durand", heure: "13:00", duree: "4h", status: "Programmée", poste: "B1" },
    { id: 4, patient: "Sophie Leroy", heure: "13:30", duree: "4h", status: "Programmée", poste: "B2" },
  ]

  // Données exemple pour les patients si non fourni
  const defaultPatients: Patient[] = [
    { id: 1, prenom: "Jean", nom: "Dupont", prochaineSéance: "Demain 08:00", typeDialyse: "Hémodialyse" },
    { id: 2, prenom: "Marie", nom: "Martin", prochaineSéance: "Demain 08:30", typeDialyse: "Dialyse péritonéale" },
    { id: 3, prenom: "Pierre", nom: "Durand", prochaineSéance: "Demain 13:00", typeDialyse: "Hémodialyse" },
  ]

  const patientsData = patients.length > 0 ? patients : defaultPatients

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

  const exportToPDF = async () => {
    if (!componentRef.current) return

    try {
      const canvas = await html2canvas(componentRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("p", "mm", "a4")
      
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY = 30

      // Ajouter un titre
      pdf.setFontSize(20)
      pdf.text("Rapport de Séances de Dialyse", pdfWidth / 2, 20, { align: "center" })
      
      // Ajouter la date
      pdf.setFontSize(12)
      const currentDate = new Date().toLocaleDateString("fr-FR")
      pdf.text(`Généré le: ${currentDate}`, pdfWidth / 2, 25, { align: "center" })

      pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio)

      pdf.save(`rapport-dialyse-${currentDate}.pdf`)
    } catch (error) {
      console.error("Erreur lors de l'export PDF:", error)
      alert("Erreur lors de la génération du PDF")
    }
  }

  const exportSessionsData = () => {
    const data = {
      date: new Date().toLocaleDateString("fr-FR"),
      sessionsAujourdhui,
      statistiques: {
        seancesSemaine: 24,
        seancesAnnulees: 2,
        tauxObservance: "92%"
      },
      prochaineSéances: patientsData.slice(0, 3)
    }

    const dataStr = JSON.stringify(data, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `donnees-dialyse-${new Date().toLocaleDateString("fr-FR").replace(/\//g, "-")}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* En-tête avec boutons d'export */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Suivi des Séances de Dialyse</h1>
          <p className="text-muted-foreground">Gestion et suivi des séances quotidiennes</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={exportSessionsData} variant="outline" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Exporter Données
          </Button>
          <Button onClick={exportToPDF} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Télécharger PDF
          </Button>
        </div>
      </div>

      {/* Contenu à exporter en PDF */}
      <div ref={componentRef} className="bg-white">
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Séances du Jour
              </CardTitle>
              <CardDescription>Planning des séances de dialyse pour aujourd'hui</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sessionsAujourdhui.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(session.status)}`} />
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
                  {patientsData.slice(0, 3).map((patient) => (
                    <div key={patient.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">
                          {patient.prenom} {patient.nom}
                        </p>
                        <p className="text-sm text-muted-foreground">{patient.prochaineSéance}</p>
                      </div>
                      <Badge variant="outline">{patient.typeDialyse}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}