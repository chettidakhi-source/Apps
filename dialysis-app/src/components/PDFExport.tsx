"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Download, FileText, Users, BarChart3 } from "lucide-react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import PDFPreview from "./PDFPreview"

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

interface PDFExportProps {
  patients: Patient[]
  sessions: Session[]
  statistics: {
    seancesCetteSemaine: number
    seancesAnnulees: number
    tauxObservance: number
  }
}

export default function PDFExport({ patients, sessions, statistics }: PDFExportProps) {
  const generateSessionReport = async () => {
    const doc = new jsPDF()
    
    // Titre du rapport
    doc.setFontSize(20)
    doc.text("Rapport des Séances de Dialyse", 20, 20)
    
    // Date du rapport
    doc.setFontSize(12)
    doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 20, 35)
    
    // Statistiques
    doc.setFontSize(16)
    doc.text("Statistiques", 20, 50)
    doc.setFontSize(12)
    doc.text(`Séances cette semaine: ${statistics.seancesCetteSemaine}`, 20, 65)
    doc.text(`Séances annulées: ${statistics.seancesAnnulees}`, 20, 75)
    doc.text(`Taux d'observance: ${statistics.tauxObservance}%`, 20, 85)
    
    // Séances du jour
    doc.setFontSize(16)
    doc.text("Séances du Jour", 20, 110)
    doc.setFontSize(10)
    
    let yPosition = 125
    sessions.forEach((session) => {
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }
      
      doc.text(`${session.heure} - ${session.patient}`, 20, yPosition)
      doc.text(`Poste: ${session.poste} | Durée: ${session.duree} | Status: ${session.status}`, 20, yPosition + 5)
      yPosition += 15
    })
    
    doc.save("rapport-seances-dialyse.pdf")
  }

  const generatePatientList = async () => {
    const doc = new jsPDF()
    
    // Titre
    doc.setFontSize(20)
    doc.text("Liste des Patients", 20, 20)
    
    // Date
    doc.setFontSize(12)
    doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 20, 35)
    
    // Liste des patients
    doc.setFontSize(16)
    doc.text("Patients Actifs", 20, 50)
    doc.setFontSize(10)
    
    let yPosition = 65
    patients.forEach((patient) => {
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }
      
      doc.text(`${patient.prenom} ${patient.nom}`, 20, yPosition)
      doc.text(`Type: ${patient.typeDialyse} | Prochaine séance: ${patient.prochaineSéance}`, 20, yPosition + 5)
      yPosition += 15
    })
    
    doc.save("liste-patients.pdf")
  }

  const generateDailySchedule = async () => {
    const doc = new jsPDF()
    
    // Titre
    doc.setFontSize(20)
    doc.text("Planning Quotidien", 20, 20)
    
    // Date
    doc.setFontSize(12)
    doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 20, 35)
    
    // Planning par créneaux
    const morningSessions = sessions.filter(s => s.heure.startsWith('08') || s.heure.startsWith('09'))
    const afternoonSessions = sessions.filter(s => s.heure.startsWith('13') || s.heure.startsWith('14'))
    
    // Matin
    doc.setFontSize(16)
    doc.text("Séances du Matin", 20, 50)
    doc.setFontSize(10)
    
    let yPosition = 65
    morningSessions.forEach((session) => {
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }
      
      doc.text(`${session.heure} - ${session.patient} (Poste ${session.poste})`, 20, yPosition)
      yPosition += 10
    })
    
    // Après-midi
    yPosition += 10
    doc.setFontSize(16)
    doc.text("Séances de l'Après-midi", 20, yPosition)
    doc.setFontSize(10)
    yPosition += 15
    
    afternoonSessions.forEach((session) => {
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 20
      }
      
      doc.text(`${session.heure} - ${session.patient} (Poste ${session.poste})`, 20, yPosition)
      yPosition += 10
    })
    
    doc.save("planning-quotidien.pdf")
  }

  const exportToPDF = async (elementId: string, filename: string) => {
    const element = document.getElementById(elementId)
    if (!element) return
    
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true
    })
    
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const imgWidth = 210
    const pageHeight = 295
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight
    
    let position = 0
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }
    
    pdf.save(filename)
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Export PDF
          </CardTitle>
          <CardDescription>Générer des rapports et documents PDF</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <h3 className="font-semibold">Rapport des Séances</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Rapport complet avec statistiques et séances du jour
              </p>
              <Button onClick={generateSessionReport} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Télécharger
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <h3 className="font-semibold">Liste des Patients</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Liste complète des patients avec leurs informations
              </p>
              <Button onClick={generatePatientList} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Télécharger
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <h3 className="font-semibold">Planning Quotidien</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Planning détaillé des séances par créneaux
              </p>
              <Button onClick={generateDailySchedule} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Télécharger
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section pour l'export de l'interface actuelle */}
      <Card>
        <CardHeader>
          <CardTitle>Export de l&apos;Interface</CardTitle>
          <CardDescription>Capturer l&apos;interface actuelle en PDF</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <PDFPreview 
              patients={patients}
              sessions={sessions}
              statistics={statistics}
            />
            <Button 
              onClick={() => exportToPDF('pdf-preview', 'rapport-complet-dialyse.pdf')}
              className="w-full"
            >
              <Download className="w-4 h-4 mr-2" />
              Exporter le Rapport Complet
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}