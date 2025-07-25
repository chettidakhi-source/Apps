"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { UserPlus, Users, Search, Edit, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Patient {
  id: string
  nom: string
  prenom: string
  age: number
  sexe: "Masculin" | "Féminin"
  suivi: string
  atcd: string
  motifConsultation: string
  cat: string
  dateCreation: string
}

export default function PatientManagement() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddingPatient, setIsAddingPatient] = useState(false)
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null)
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    age: "",
    sexe: "",
    suivi: "",
    atcd: "",
    motifConsultation: "",
    cat: "",
  })

  // Charger les patients depuis le localStorage
  useEffect(() => {
    const savedPatients = localStorage.getItem("patients")
    if (savedPatients) {
      setPatients(JSON.parse(savedPatients))
    }
  }, [])

  // Sauvegarder les patients dans le localStorage
  useEffect(() => {
    localStorage.setItem("patients", JSON.stringify(patients))
  }, [patients])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingPatient) {
      // Modifier un patient existant
      setPatients(
        patients.map((p) =>
          p.id === editingPatient.id ? { 
            ...editingPatient, 
            ...formData, 
            age: Number.parseInt(formData.age),
            sexe: formData.sexe as "Masculin" | "Féminin"
          } : p,
        ),
      )
      setEditingPatient(null)
    } else {
      // Ajouter un nouveau patient
      const newPatient: Patient = {
        id: Date.now().toString(),
        nom: formData.nom,
        prenom: formData.prenom,
        age: Number.parseInt(formData.age),
        sexe: formData.sexe as "Masculin" | "Féminin",
        suivi: formData.suivi,
        atcd: formData.atcd,
        motifConsultation: formData.motifConsultation,
        cat: formData.cat,
        dateCreation: new Date().toLocaleDateString("fr-FR"),
      }
      setPatients([...patients, newPatient])
    }

    // Réinitialiser le formulaire
    setFormData({
      nom: "",
      prenom: "",
      age: "",
      sexe: "",
      suivi: "",
      atcd: "",
      motifConsultation: "",
      cat: "",
    })
    setIsAddingPatient(false)
  }

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient)
    setFormData({
      nom: patient.nom,
      prenom: patient.prenom,
      age: patient.age.toString(),
      sexe: patient.sexe,
      suivi: patient.suivi,
      atcd: patient.atcd,
      motifConsultation: patient.motifConsultation,
      cat: patient.cat,
    })
    setIsAddingPatient(true)
  }

  const handleDelete = (id: string) => {
    setPatients(patients.filter((p) => p.id !== id))
  }

  const filteredPatients = patients.filter(
    (patient) =>
      patient.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.prenom.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* En-tête */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Patients</h1>
          <p className="text-gray-600">Système de collecte et de suivi des données patients</p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{patients.length}</p>
                  <p className="text-sm text-gray-600">Total Patients</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <UserPlus className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">
                    {patients.filter((p) => p.dateCreation === new Date().toLocaleDateString("fr-FR")).length}
                  </p>
                  <p className="text-sm text-gray-600">Nouveaux Aujourd&apos;hui</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold">M/F</span>
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {patients.filter((p) => p.sexe === "Masculin").length}/
                    {patients.filter((p) => p.sexe === "Féminin").length}
                  </p>
                  <p className="text-sm text-gray-600">Hommes/Femmes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions principales */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher un patient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => setIsAddingPatient(true)} className="w-full sm:w-auto">
            <UserPlus className="h-4 w-4 mr-2" />
            Ajouter un Patient
          </Button>
        </div>

        {/* Formulaire d&apos;ajout/modification */}
        {isAddingPatient && (
          <Card>
            <CardHeader>
              <CardTitle>{editingPatient ? "Modifier le Patient" : "Ajouter un Nouveau Patient"}</CardTitle>
              <CardDescription>
                Remplissez tous les champs requis pour enregistrer les informations du patient.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nom">Nom *</Label>
                    <Input
                      id="nom"
                      value={formData.nom}
                      onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prenom">Prénom *</Label>
                    <Input
                      id="prenom"
                      value={formData.prenom}
                      onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Âge *</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sexe">Sexe *</Label>
                    <Select value={formData.sexe} onValueChange={(value) => setFormData({ ...formData, sexe: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le sexe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Masculin">Masculin</SelectItem>
                        <SelectItem value="Féminin">Féminin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="suivi">Suivi</Label>
                  <Input
                    id="suivi"
                    value={formData.suivi}
                    onChange={(e) => setFormData({ ...formData, suivi: e.target.value })}
                    placeholder="Type de suivi (ex: Consultation de contrôle, Première consultation...)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="atcd">ATCD (Antécédents)</Label>
                  <Textarea
                    id="atcd"
                    value={formData.atcd}
                    onChange={(e) => setFormData({ ...formData, atcd: e.target.value })}
                    placeholder="Antécédents médicaux, chirurgicaux, familiaux..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motifConsultation">Motif de Consultation</Label>
                  <Textarea
                    id="motifConsultation"
                    value={formData.motifConsultation}
                    onChange={(e) => setFormData({ ...formData, motifConsultation: e.target.value })}
                    placeholder="Raison de la consultation..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cat">CAT (Conduite À Tenir)</Label>
                  <Textarea
                    id="cat"
                    value={formData.cat}
                    onChange={(e) => setFormData({ ...formData, cat: e.target.value })}
                    placeholder="Plan de traitement, recommandations, suivi..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit">{editingPatient ? "Modifier" : "Enregistrer"}</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAddingPatient(false)
                      setEditingPatient(null)
                      setFormData({
                        nom: "",
                        prenom: "",
                        age: "",
                        sexe: "",
                        suivi: "",
                        atcd: "",
                        motifConsultation: "",
                        cat: "",
                      })
                    }}
                  >
                    Annuler
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Liste des patients */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des Patients ({filteredPatients.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredPatients.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {searchTerm ? "Aucun patient trouvé pour cette recherche." : "Aucun patient enregistré."}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPatients.map((patient) => (
                  <Card key={patient.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {patient.prenom} {patient.nom}
                          </h3>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="secondary">{patient.age} ans</Badge>
                            <Badge variant={patient.sexe === "Masculin" ? "default" : "secondary"}>
                              {patient.sexe}
                            </Badge>
                            <Badge variant="outline">{patient.dateCreation}</Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(patient)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Confirmer la suppression</DialogTitle>
                                <DialogDescription>
                                  Êtes-vous sûr de vouloir supprimer le patient {patient.prenom} {patient.nom} ? Cette
                                  action est irréversible.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="flex gap-2 justify-end">
                                <Button variant="outline">Annuler</Button>
                                <Button variant="destructive" onClick={() => handleDelete(patient.id)}>
                                  Supprimer
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        {patient.suivi && (
                          <div>
                            <strong>Suivi:</strong> {patient.suivi}
                          </div>
                        )}
                        {patient.atcd && (
                          <div>
                            <strong>ATCD:</strong> {patient.atcd}
                          </div>
                        )}
                        {patient.motifConsultation && (
                          <div className="md:col-span-2">
                            <strong>Motif de consultation:</strong> {patient.motifConsultation}
                          </div>
                        )}
                        {patient.cat && (
                          <div className="md:col-span-2">
                            <strong>CAT:</strong> {patient.cat}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
