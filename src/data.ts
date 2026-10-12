import type { Faculty, Flyer } from './types'

// Vite discovers institutional SVG files at build time; their source is never altered.
const facultyLogos = import.meta.glob('../Loguitos/*.svg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>
const humanize = (file: string) => file.replace(/^.*\/|\.svg$/g, '').replace(/^facultad-/i, 'Facultad de ').replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
export const faculties: Faculty[] = Object.entries(facultyLogos).map(([path, logo]) => ({ id: path, name: humanize(path), logo, primary: path.includes('facultad-humanidades') ? '#54248a' : '#6d358e', secondary: path.includes('facultad-humanidades') ? '#ffa04f' : '#f28b26' }))
export const fallbackFaculty: Faculty = faculties.find(faculty => faculty.id.includes('facultad-humanidades')) || { id: 'humanidades', name: 'Facultad de Humanidades', primary: '#54248a', secondary: '#ffad4c' }
export const defaultFlyer: Flyer = {
  name: 'Nueva maestria', faculty: fallbackFaculty.id, primary: fallbackFaculty.primary, secondary: fallbackFaculty.secondary,
  programType: 'MAESTRÍA EN', title: 'PSICOLOGÍA\nCLÍNICA', requirementsHeading: 'REQUISITOS DE ADMISIÓN:', requirements: [
    'Título de Grado, legalizado por el MESCyT.', 'Récord de Calificaciones de Grado, legalizado por el MESCyT.', 'Dos (2) fotos 2x2.', 'Copia de Cédula.', 'Acta de Nacimiento original legalizada.', 'Certificado Médico, expedido por el dispensario médico de la UASD.', 'Resumen de Currículo, máximo 2 páginas.'
  ], imageZoom: 1, imageX: 50, imageY: 50, overlay: 55, qrUrl: '', showQr: true,
  enrollment: 'INSCRIPCIÓN Y PROPEDÉUTICO', amount: '$20,000.00', email: 'postgradosanpedro@uasd.edu.do', phone1: '(829) 709-7607', phone2: '(829) 962-3546'
}
