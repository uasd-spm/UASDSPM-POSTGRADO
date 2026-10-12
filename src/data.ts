import type { Faculty, Flyer } from './types'

// Vite discovers institutional SVG files at build time; their source is never altered.
const facultyLogos = import.meta.glob('../Loguitos/*.svg', { eager: true, query: '?url', import: 'default' }) as Record<string, string>
const humanize = (file: string) => file.replace(/^.*\/|\.svg$/g, '').replace(/^facultad-/i, 'Facultad de ').replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
export const faculties: Faculty[] = Object.entries(facultyLogos).map(([path, logo]) => ({ id: path, name: humanize(path), logo, primary: '#6d358e', secondary: '#f28b26' }))
export const fallbackFaculty: Faculty = { id: 'humanidades', name: 'Facultad de Humanidades', primary: '#6d358e', secondary: '#f28b26' }
export const defaultFlyer: Flyer = {
  name: 'Nueva maestria', faculty: fallbackFaculty.id, primary: fallbackFaculty.primary, secondary: fallbackFaculty.secondary,
  programType: 'MAESTRIA EN', title: 'PSICOLOGIA\nCLINICA', requirementsHeading: 'REQUISITOS DE ADMISION:', requirements: [
    'Titulo de Grado, legalizado por el MESCyT.', 'Record de Calificaciones de Grado, legalizado por el MESCyT.', 'Dos (2) fotos 2x2.', 'Copia de Cedula.', 'Acta de Nacimiento original legalizada.', 'Certificado Medico, expedido por el dispensario medico de la UASD.', 'Resumen de Curriculo, maximo 2 paginas.'
  ], imageZoom: 1, imageX: 50, imageY: 50, overlay: 55, qrUrl: '', showQr: true,
  enrollment: 'INSCRIPCION Y PROPEDEUTICO', amount: '$20,000.00', email: 'postgradosanpedro@uasd.edu.do', phone1: '(829) 709-7607', phone2: '(829) 962-3546'
}
