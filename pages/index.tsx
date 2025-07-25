import React, { useState, useEffect } from 'react';

interface Patient {
  id: string;
  nom: string;
  prenom: string;
  age: number;
  sexe: 'Masculin' | 'Féminin';
  suivi: string;
  atcd: string;
  motifConsultation: string;
  cat: string;
  dateCreation: string;
}

export default function PatientManagement() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingPatient, setIsAddingPatient] = useState(false);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    age: '',
    sexe: '',
    suivi: '',
    atcd: '',
    motifConsultation: '',
    cat: '',
  });

  useEffect(() => {
    const savedPatients = localStorage.getItem('patients');
    if (savedPatients) {
      setPatients(JSON.parse(savedPatients));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('patients', JSON.stringify(patients));
  }, [patients]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPatient) {
      setPatients(
        patients.map((p) =>
          p.id === editingPatient.id ? { ...editingPatient, ...formData, age: Number.parseInt(formData.age) } : p
        )
      );
      setEditingPatient(null);
    } else {
      const newPatient: Patient = {
        id: Date.now().toString(),
        nom: formData.nom,
        prenom: formData.prenom,
        age: Number.parseInt(formData.age),
        sexe: formData.sexe as 'Masculin' | 'Féminin',
        suivi: formData.suivi,
        atcd: formData.atcd,
        motifConsultation: formData.motifConsultation,
        cat: formData.cat,
        dateCreation: new Date().toLocaleDateString('fr-FR'),
      };
      setPatients([...patients, newPatient]);
    }
    setFormData({
      nom: '',
      prenom: '',
      age: '',
      sexe: '',
      suivi: '',
      atcd: '',
      motifConsultation: '',
      cat: '',
    });
    setIsAddingPatient(false);
  };

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
    setFormData({
      nom: patient.nom,
      prenom: patient.prenom,
      age: patient.age.toString(),
      sexe: patient.sexe,
      suivi: patient.suivi,
      atcd: patient.atcd,
      motifConsultation: patient.motifConsultation,
      cat: patient.cat,
    });
    setIsAddingPatient(true);
  };

  const handleDelete = (id: string) => {
    setPatients(patients.filter((p) => p.id !== id));
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.prenom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', padding: 24 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', gap: 24, display: 'flex', flexDirection: 'column' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 32, fontWeight: 700 }}>Gestion des Patients</h1>
          <p style={{ color: '#555' }}>Système de collecte et de suivi des données patients</p>
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, background: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 1px 4px #0001' }}>
            <div style={{ fontWeight: 700, fontSize: 24 }}>{patients.length}</div>
            <div style={{ color: '#666' }}>Total Patients</div>
          </div>
          <div style={{ flex: 1, background: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 1px 4px #0001' }}>
            <div style={{ fontWeight: 700, fontSize: 24 }}>
              {patients.filter((p) => p.dateCreation === new Date().toLocaleDateString('fr-FR')).length}
            </div>
            <div style={{ color: '#666' }}>Nouveaux Aujourd'hui</div>
          </div>
          <div style={{ flex: 1, background: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 1px 4px #0001' }}>
            <div style={{ fontWeight: 700, fontSize: 24 }}>
              {patients.filter((p) => p.sexe === 'Masculin').length}/
              {patients.filter((p) => p.sexe === 'Féminin').length}
            </div>
            <div style={{ color: '#666' }}>Hommes/Femmes</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
          <input
            style={{ flex: 1, maxWidth: 300, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
            placeholder="Rechercher un patient..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            style={{ padding: '8px 16px', borderRadius: 4, background: '#2563eb', color: '#fff', border: 'none', fontWeight: 600 }}
            onClick={() => setIsAddingPatient(true)}
          >
            Ajouter un Patient
          </button>
        </div>
        {isAddingPatient && (
          <div style={{ background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 1px 4px #0001' }}>
            <h2 style={{ fontSize: 20, fontWeight: 600 }}>{editingPatient ? 'Modifier le Patient' : 'Ajouter un Nouveau Patient'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
              <div style={{ display: 'flex', gap: 12 }}>
                <input
                  style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                  placeholder="Nom *"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  required
                />
                <input
                  style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                  placeholder="Prénom *"
                  value={formData.prenom}
                  onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                  required
                />
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <input
                  style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                  placeholder="Âge *"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  required
                />
                <select
                  style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                  value={formData.sexe}
                  onChange={(e) => setFormData({ ...formData, sexe: e.target.value })}
                  required
                >
                  <option value="">Sexe *</option>
                  <option value="Masculin">Masculin</option>
                  <option value="Féminin">Féminin</option>
                </select>
              </div>
              <input
                style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                placeholder="Suivi"
                value={formData.suivi}
                onChange={(e) => setFormData({ ...formData, suivi: e.target.value })}
              />
              <textarea
                style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                placeholder="ATCD (Antécédents)"
                value={formData.atcd}
                onChange={(e) => setFormData({ ...formData, atcd: e.target.value })}
                rows={2}
              />
              <textarea
                style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                placeholder="Motif de Consultation"
                value={formData.motifConsultation}
                onChange={(e) => setFormData({ ...formData, motifConsultation: e.target.value })}
                rows={2}
              />
              <textarea
                style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                placeholder="CAT (Conduite À Tenir)"
                value={formData.cat}
                onChange={(e) => setFormData({ ...formData, cat: e.target.value })}
                rows={2}
              />
              <div style={{ display: 'flex', gap: 8 }}>
                <button type="submit" style={{ padding: '8px 16px', borderRadius: 4, background: '#2563eb', color: '#fff', border: 'none', fontWeight: 600 }}>
                  {editingPatient ? 'Modifier' : 'Enregistrer'}
                </button>
                <button
                  type="button"
                  style={{ padding: '8px 16px', borderRadius: 4, background: '#fff', color: '#2563eb', border: '1px solid #2563eb', fontWeight: 600 }}
                  onClick={() => {
                    setIsAddingPatient(false);
                    setEditingPatient(null);
                    setFormData({
                      nom: '',
                      prenom: '',
                      age: '',
                      sexe: '',
                      suivi: '',
                      atcd: '',
                      motifConsultation: '',
                      cat: '',
                    });
                  }}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}
        <div style={{ background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 1px 4px #0001' }}>
          <h2 style={{ fontSize: 20, fontWeight: 600 }}>Liste des Patients ({filteredPatients.length})</h2>
          {filteredPatients.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#888', padding: 24 }}>
              {searchTerm ? 'Aucun patient trouvé pour cette recherche.' : 'Aucun patient enregistré.'}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {filteredPatients.map((patient) => (
                <div key={patient.id} style={{ borderLeft: '4px solid #2563eb', background: '#f3f4f6', borderRadius: 4, padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 18 }}>{patient.prenom} {patient.nom}</div>
                      <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                        <span style={{ background: '#e0e7ff', color: '#3730a3', borderRadius: 4, padding: '2px 8px', fontSize: 12 }}>{patient.age} ans</span>
                        <span style={{ background: patient.sexe === 'Masculin' ? '#dbeafe' : '#fce7f3', color: patient.sexe === 'Masculin' ? '#1e40af' : '#be185d', borderRadius: 4, padding: '2px 8px', fontSize: 12 }}>{patient.sexe}</span>
                        <span style={{ border: '1px solid #ddd', borderRadius: 4, padding: '2px 8px', fontSize: 12 }}>{patient.dateCreation}</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button
                        style={{ padding: 6, borderRadius: 4, border: '1px solid #2563eb', background: '#fff', color: '#2563eb', fontWeight: 600 }}
                        onClick={() => handleEdit(patient)}
                      >
                        Modifier
                      </button>
                      <button
                        style={{ padding: 6, borderRadius: 4, border: '1px solid #dc2626', background: '#fff', color: '#dc2626', fontWeight: 600 }}
                        onClick={() => handleDelete(patient.id)}
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 14 }}>
                    {patient.suivi && <div><strong>Suivi:</strong> {patient.suivi}</div>}
                    {patient.atcd && <div><strong>ATCD:</strong> {patient.atcd}</div>}
                    {patient.motifConsultation && <div style={{ gridColumn: '1 / -1' }}><strong>Motif de consultation:</strong> {patient.motifConsultation}</div>}
                    {patient.cat && <div style={{ gridColumn: '1 / -1' }}><strong>CAT:</strong> {patient.cat}</div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}