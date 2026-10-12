import { forwardRef, useEffect, useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import { PDFDocument } from 'pdf-lib'
import QRCode from 'qrcode'
import { ArrowDown, ArrowUp, Download, Copy, Edit3, Eye, FilePlus2, ImageUp, LogOut, Plus, Save, Search, Trash2, X } from 'lucide-react'
import headerNavUrl from '../Header Nav.svg?url'
import { defaultFlyer, faculties, fallbackFaculty } from './data'
import type { Faculty, Flyer } from './types'
import { listFlyers, removeFlyer, saveFlyer, supabase, uploadPhoto } from './supabase'

type View = 'create' | 'library'
const clone = (flyer: Flyer): Flyer => ({ ...flyer, requirements: [...flyer.requirements] })
const date = (value?: string) => value ? new Intl.DateTimeFormat('es-DO', { dateStyle: 'medium' }).format(new Date(value)) : 'Sin guardar'

export function App() {
  const [view, setView] = useState<View>('create')
  const [flyer, setFlyer] = useState<Flyer>(clone(defaultFlyer))
  const [items, setItems] = useState<Flyer[]>([])
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('')
  const [session, setSession] = useState<boolean | null>(supabase ? null : true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const canvasRef = useRef<HTMLDivElement>(null)

  const refresh = async () => { try { setItems(await listFlyers()) } catch (e) { setStatus(errorText(e)) } }
  useEffect(() => {
    if (!supabase) { refresh(); return }
    supabase.auth.getSession().then(({ data }) => setSession(Boolean(data.session)))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, next) => setSession(Boolean(next)))
    return () => listener.subscription.unsubscribe()
  }, [])

  const patch = (next: Partial<Flyer>) => setFlyer(current => ({ ...current, ...next }))
  const chooseFaculty = (id: string) => {
    const faculty = faculties.find(item => item.id === id) || fallbackFaculty
    patch({ faculty: id, primary: faculty.primary, secondary: faculty.secondary })
  }
  const upload = (file?: File, target: 'image' | 'qrImage' = 'image') => {
    if (!file) return
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) { setStatus('Use una imagen JPG, PNG o WebP.'); return }
    const reader = new FileReader(); reader.onload = () => patch({ [target]: String(reader.result) }); reader.readAsDataURL(file)
  }
  const save = async (asNew = false) => {
    try { let candidate = asNew ? { ...flyer, id: undefined, name: `${flyer.name} copia` } : flyer; if (candidate.image?.startsWith('data:') && supabase) { const uploaded = await uploadPhoto(candidate.image); candidate = { ...candidate, image: uploaded.url, imagePath: uploaded.path } } if (candidate.qrImage?.startsWith('data:') && supabase) { const uploaded = await uploadPhoto(candidate.qrImage); candidate = { ...candidate, qrImage: uploaded.url, qrPath: uploaded.path } } const saved = await saveFlyer(candidate); setFlyer(saved); await refresh(); setStatus('Diseno guardado.'); }
    catch (e) { setStatus(errorText(e)) }
  }
  const exportPng = async () => {
    if (!canvasRef.current) return
    try { await document.fonts.ready; const data = await toPng(canvasRef.current, { pixelRatio: 1, width: 1080, height: 1350, cacheBust: true }); download(data, `${filename(flyer.name)}.png`); }
    catch (e) { setStatus(`No se pudo exportar PNG: ${errorText(e)}`) }
  }
  const exportPdf = async () => {
    if (!canvasRef.current) return
    try { await document.fonts.ready; const png = await toPng(canvasRef.current, { pixelRatio: 1, width: 1080, height: 1350, cacheBust: true }); const pdf = await PDFDocument.create(); const page = pdf.addPage([1080, 1350]); page.drawImage(await pdf.embedPng(png), { x: 0, y: 0, width: 1080, height: 1350 }); download(URL.createObjectURL(new Blob([await pdf.save()], { type: 'application/pdf' })), `${filename(flyer.name)}.pdf`); }
    catch (e) { setStatus(`No se pudo exportar PDF: ${errorText(e)}`) }
  }
  const login = async (event: React.FormEvent) => { event.preventDefault(); if (!supabase) return; const { error } = await supabase.auth.signInWithPassword({ email, password }); if (error) setStatus(error.message) }
  if (session === null) return <div className="splash">Cargando sesion segura...</div>
  if (!session) return <main className="login"><section><p className="eyebrow">UASD / CENTRO SAN PEDRO</p><h1>Generador institucional de flyers</h1><p>Acceso reservado para el equipo autorizado.</p><form onSubmit={login}><label>Correo<input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label><label>Contrasena<input type="password" value={password} onChange={e => setPassword(e.target.value)} required /></label><button>Ingresar</button></form>{status && <p className="notice">{status}</p>}</section></main>

  const visible = items.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
  return <div className="app-shell">
    <aside className="sidebar"><div className="brand"><span>UASD</span><small>Centro San Pedro de Macoris</small></div><nav><button className={view === 'create' ? 'active' : ''} onClick={() => setView('create')}><FilePlus2 /> CREAR</button><button className={view === 'library' ? 'active' : ''} onClick={() => { setView('library'); refresh() }}><Eye /> CREACIONES</button></nav><div className="side-bottom">{!supabase && <small>Modo local de prueba</small>}{supabase && <button onClick={() => void supabase?.auth.signOut()}><LogOut /> Salir</button>}</div></aside>
    <main className="workspace">
      {status && <div className="toast">{status}<button onClick={() => setStatus('')}><X size={16} /></button></div>}
      {view === 'create' ? <><header className="page-head"><div><p className="eyebrow">EDITOR</p><h1>{flyer.id ? 'Editar creacion' : 'Nueva creacion'}</h1></div><div className="actions"><button className="quiet" onClick={() => setFlyer(clone(defaultFlyer))}>Restablecer</button><button className="quiet" onClick={() => save(true)}><Copy /> Como nuevo</button><button onClick={() => save()}><Save /> Guardar</button></div></header>
        <div className="editor"><Form flyer={flyer} faculties={faculties} onPatch={patch} onFaculty={chooseFaculty} onUpload={upload} /><section className="preview-panel"><div className="preview-title"><span>Vista previa / 1080 x 1350</span><div><button onClick={exportPng}><Download /> PNG</button><button onClick={exportPdf}><Download /> PDF</button></div></div><div className="canvas-wrap"><FlyerCanvas ref={canvasRef} flyer={flyer} faculty={faculties.find(item => item.id === flyer.faculty)} /></div></section></div>
      </> : <><header className="page-head"><div><p className="eyebrow">ARCHIVO</p><h1>Creaciones</h1></div><button onClick={() => { setFlyer(clone(defaultFlyer)); setView('create') }}><Plus /> Nuevo flyer</button></header><div className="library-tools"><Search /><input placeholder="Buscar por nombre" value={query} onChange={e => setQuery(e.target.value)} /></div><div className="cards">{visible.map(item => <article className="card" key={item.id}><div className="thumb"><FlyerCanvas flyer={item} faculty={faculties.find(f => f.id === item.faculty)} /></div><div><h2>{item.name}</h2><p>{faculties.find(f => f.id === item.faculty)?.name || item.faculty}</p><small>Actualizado {date(item.updatedAt)}</small></div><footer><button title="Editar" onClick={() => { setFlyer(clone(item)); setView('create') }}><Edit3 /></button><button title="Duplicar" onClick={() => { setFlyer({ ...clone(item), id: undefined, name: `${item.name} copia` }); setView('create') }}><Copy /></button><button title="Eliminar" className="danger" onClick={async () => { if (item.id && confirm(`Eliminar ${item.name}?`)) { await removeFlyer(item.id); await refresh() } }}><Trash2 /></button></footer></article>)}{!visible.length && <p className="empty">No hay creaciones guardadas todavia.</p>}</div></>}
    </main>
  </div>
}

function Form({ flyer, faculties, onPatch, onFaculty, onUpload }: { flyer: Flyer; faculties: Faculty[]; onPatch: (p: Partial<Flyer>) => void; onFaculty: (v: string) => void; onUpload: (file?: File, target?: 'image' | 'qrImage') => void }) {
  const requirements = flyer.requirements
  const updateReq = (index: number, value: string) => onPatch({ requirements: requirements.map((item, i) => i === index ? value : item) })
  const moveReq = (index: number, direction: -1 | 1) => { const target = index + direction; if (target < 0 || target >= requirements.length) return; const next = [...requirements]; [next[index], next[target]] = [next[target], next[index]]; onPatch({ requirements: next }) }
  return <section className="form-panel"><FormSection title="Identificacion"><label>Nombre interno<input value={flyer.name} onChange={e => onPatch({ name: e.target.value })} /></label><label>Facultad<select value={flyer.faculty} onChange={e => onFaculty(e.target.value)}>{faculties.length ? faculties.map(f => <option key={f.id} value={f.id}>{f.name}</option>) : <option value={fallbackFaculty.id}>{fallbackFaculty.name}</option>}</select></label><div className="twocol"><label>Color principal<input type="color" value={flyer.primary} onChange={e => onPatch({ primary: e.target.value })} /></label><label>Color secundario<input type="color" value={flyer.secondary} onChange={e => onPatch({ secondary: e.target.value })} /></label></div></FormSection>
    <FormSection title="Informacion academica"><label>Tipo de programa<input value={flyer.programType} onChange={e => onPatch({ programType: e.target.value.toUpperCase() })} /></label><label>Titulo <small>Use saltos de linea para la composicion.</small><textarea value={flyer.title} onChange={e => onPatch({ title: e.target.value.toUpperCase() })} rows={3} /></label><label>Encabezado de requisitos<input value={flyer.requirementsHeading} onChange={e => onPatch({ requirementsHeading: e.target.value.toUpperCase() })} /></label><div className="requirements"><b>Lista de requisitos</b>{requirements.map((item, index) => <div className="requirement" key={index}><span>{index + 1}</span><input value={item} onChange={e => updateReq(index, e.target.value)} /><button title="Subir requisito" onClick={() => moveReq(index, -1)}><ArrowUp /></button><button title="Bajar requisito" onClick={() => moveReq(index, 1)}><ArrowDown /></button><button title="Eliminar requisito" onClick={() => onPatch({ requirements: requirements.filter((_, i) => i !== index) })}><X /></button></div>)}<button className="add" onClick={() => onPatch({ requirements: [...requirements, 'Nuevo requisito'] })}><Plus /> Agregar requisito</button></div></FormSection>
    <FormSection title="Recursos visuales"><label className="upload"><ImageUp /> Cargar fotografia<input type="file" accept="image/jpeg,image/png,image/webp" onChange={e => onUpload(e.target.files?.[0])} /></label><Range label="Zoom" value={flyer.imageZoom} min={1} max={2.5} step={.05} onChange={imageZoom => onPatch({ imageZoom })} /><Range label="Posicion horizontal" value={flyer.imageX} min={0} max={100} onChange={imageX => onPatch({ imageX })} /><Range label="Posicion vertical" value={flyer.imageY} min={0} max={100} onChange={imageY => onPatch({ imageY })} /><Range label="Intensidad de color" value={flyer.overlay} min={0} max={90} onChange={overlay => onPatch({ overlay })} /><label>URL para QR<input value={flyer.qrUrl} onChange={e => onPatch({ qrUrl: e.target.value })} placeholder="https://..." /></label><label className="upload"><ImageUp /> Subir imagen QR<input type="file" accept="image/jpeg,image/png,image/webp" onChange={e => onUpload(e.target.files?.[0], 'qrImage')} /></label><label className="check"><input type="checkbox" checked={flyer.showQr} onChange={e => onPatch({ showQr: e.target.checked })} /> Mostrar codigo QR</label></FormSection>
    <FormSection title="Inscripcion y contacto"><label>Concepto<input value={flyer.enrollment} onChange={e => onPatch({ enrollment: e.target.value.toUpperCase() })} /></label><label>Monto<input value={flyer.amount} onChange={e => onPatch({ amount: e.target.value })} /></label><label>Correo<input type="email" value={flyer.email} onChange={e => onPatch({ email: e.target.value })} /></label><label>Telefono principal<input value={flyer.phone1} onChange={e => onPatch({ phone1: e.target.value })} /></label><label>Telefono secundario<input value={flyer.phone2} onChange={e => onPatch({ phone2: e.target.value })} /></label></FormSection>
  </section>
}
const FormSection = ({ title, children }: { title: string; children: React.ReactNode }) => <fieldset><legend>{title}</legend>{children}</fieldset>
const Range = ({ label, value, min, max, step = 1, onChange }: { label: string; value: number; min: number; max: number; step?: number; onChange: (v: number) => void }) => <label className="range">{label}<span>{value}</span><input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))} /></label>

const FlyerCanvas = forwardRef<HTMLDivElement, { flyer: Flyer; faculty?: Faculty }>(function FlyerCanvas({ flyer, faculty }, ref) {
  const style = { '--theme-primary': flyer.primary, '--theme-secondary': flyer.secondary, '--photo-position': `${flyer.imageX}% ${flyer.imageY}%`, '--photo-zoom': flyer.imageZoom } as React.CSSProperties
  return <div ref={ref} className="flyer" style={style}>
    <header className="flyer-header"><img className="header-institutional" src={headerNavUrl} alt="Universidad Autonoma de Santo Domingo, Centro San Pedro de Macoris" /><div className="faculty-mark">{faculty?.logo && <img src={faculty.logo} alt={faculty.name} />}<span>{faculty?.name || 'Facultad de Humanidades'}<small>UNIDAD DE POSTGRADO</small></span></div></header>
    <section className="hero">{flyer.image ? <img className="hero-image" src={flyer.image} style={{ transform: `scale(${flyer.imageZoom})`, objectPosition: `${flyer.imageX}% ${flyer.imageY}%` }} /> : <div className="hero-placeholder">UASD<br /><small>Centro San Pedro de Macoris</small></div>}<div className="photo-wash" style={{ opacity: flyer.overlay / 100 }} /><div className="hero-fade" /></section>
    <section className="flyer-copy"><p className="program-type">{flyer.programType}</p><h1>{flyer.title.split('\n').map((line, index) => <span key={index}>{line}</span>)}</h1><div className="rule" /><h2>{flyer.requirementsHeading}</h2><ol>{flyer.requirements.slice(0, 7).map((requirement, index) => <li key={index}>{requirement}</li>)}</ol></section>
    <section className="flyer-bottom"><div className="qr">{flyer.showQr && (flyer.qrImage ? <img src={flyer.qrImage} /> : <QrImage value={flyer.qrUrl || 'https://uasd.edu.do'} />)}</div><div className="enrollment"><h3>{flyer.enrollment}</h3><strong>{flyer.amount}</strong></div><div className="contact"><p><b>@</b>{flyer.email}</p><p><b>W</b>{flyer.phone1}</p><p><b>W</b>{flyer.phone2}</p></div></section>
    <svg className="ribbon" viewBox="0 0 1080 1350" preserveAspectRatio="none" aria-hidden="true"><path fill="var(--theme-secondary)" d="M818 1350C881 1194 961 1001 1080 746V805C988 992 904 1198 851 1350Z" /><path fill="var(--theme-primary)" d="M851 1350C911 1177 991 978 1080 782V1350Z" /></svg>
  </div>
})

function QrImage({ value }: { value: string }) {
  const [src, setSrc] = useState('')
  useEffect(() => { QRCode.toDataURL(value, { errorCorrectionLevel: 'M', margin: 0, width: 140 }).then(setSrc).catch(() => setSrc('')) }, [value])
  return src ? <img src={src} /> : null
}

function download(url: string, name: string) { const anchor = document.createElement('a'); anchor.href = url; anchor.download = name; anchor.click(); setTimeout(() => url.startsWith('blob:') && URL.revokeObjectURL(url), 1000) }
function filename(value: string) { return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'flyer-uasd' }
function errorText(error: unknown) { return error instanceof Error ? error.message : 'Ocurrio un error inesperado.' }
