import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Flyer } from './types'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY
export const supabase: SupabaseClient | null = url && key ? createClient(url, key) : null

const localKey = 'uasd-flyers-local-v1'
const readLocal = (): Flyer[] => JSON.parse(localStorage.getItem(localKey) || '[]')

export async function listFlyers(): Promise<Flyer[]> {
  if (!supabase) return readLocal()
  const { data, error } = await supabase.from('flyers').select('*').order('updated_at', { ascending: false })
  if (error) throw error
  return Promise.all(data.map(fromRow))
}

export async function saveFlyer(flyer: Flyer): Promise<Flyer> {
  const now = new Date().toISOString()
  if (!supabase) {
    const items = readLocal()
    const saved = { ...flyer, id: flyer.id || crypto.randomUUID(), createdAt: flyer.createdAt || now, updatedAt: now }
    localStorage.setItem(localKey, JSON.stringify([saved, ...items.filter(item => item.id !== saved.id)]))
    return saved
  }
  const row = toRow(flyer)
  const result = flyer.id
    ? await supabase.from('flyers').update(row).eq('id', flyer.id).select().single()
    : await supabase.from('flyers').insert(row).select().single()
  if (result.error) throw result.error
  return fromRow(result.data)
}

export async function removeFlyer(id: string) {
  if (!supabase) {
    localStorage.setItem(localKey, JSON.stringify(readLocal().filter(item => item.id !== id)))
    return
  }
  const { error } = await supabase.from('flyers').delete().eq('id', id)
  if (error) throw error
}

export async function uploadPhoto(dataUrl: string): Promise<{ path: string; url: string }> {
  if (!supabase) return { path: dataUrl, url: dataUrl }
  const { data: auth, error: authError } = await supabase.auth.getUser()
  if (authError || !auth.user) throw new Error('La sesion no es valida.')
  const blob = await (await fetch(dataUrl)).blob()
  const extension = blob.type === 'image/png' ? 'png' : blob.type === 'image/webp' ? 'webp' : 'jpg'
  const path = `${auth.user.id}/${crypto.randomUUID()}.${extension}`
  const { error } = await supabase.storage.from('flyer-images').upload(path, blob, { contentType: blob.type, upsert: false })
  if (error) throw error
  const signed = await supabase.storage.from('flyer-images').createSignedUrl(path, 60 * 60)
  if (signed.error) throw signed.error
  return { path, url: signed.data.signedUrl }
}

const toRow = (f: Flyer) => ({
  name: f.name, faculty: f.faculty, primary_color: f.primary, secondary_color: f.secondary,
  program_type: f.programType, title: f.title, requirements_heading: f.requirementsHeading, requirements: f.requirements, image_url: f.imagePath,
  image_zoom: f.imageZoom, image_x: f.imageX, image_y: f.imageY, overlay: f.overlay,
  qr_url: f.qrUrl, qr_image: f.qrPath, show_qr: f.showQr, enrollment: f.enrollment,
  amount: f.amount, email: f.email, phone1: f.phone1, phone2: f.phone2,
})

const fromRow = async (r: Record<string, unknown>): Promise<Flyer> => ({
  id: r.id as string, name: r.name as string, faculty: r.faculty as string, primary: r.primary_color as string,
  secondary: r.secondary_color as string, programType: r.program_type as string, title: r.title as string, requirementsHeading: (r.requirements_heading as string) || 'REQUISITOS DE ADMISION:',
  requirements: r.requirements as string[], image: await imageUrl(r.image_url as string | undefined), imagePath: r.image_url as string | undefined, imageZoom: Number(r.image_zoom),
  imageX: Number(r.image_x), imageY: Number(r.image_y), overlay: Number(r.overlay), qrUrl: r.qr_url as string,
  qrImage: await imageUrl(r.qr_image as string | undefined), qrPath: r.qr_image as string | undefined, showQr: Boolean(r.show_qr), enrollment: r.enrollment as string,
  amount: r.amount as string, email: r.email as string, phone1: r.phone1 as string, phone2: r.phone2 as string,
  createdAt: r.created_at as string, updatedAt: r.updated_at as string,
})

async function imageUrl(path?: string) {
  if (!path || !supabase) return path
  const { data, error } = await supabase.storage.from('flyer-images').createSignedUrl(path, 60 * 60)
  if (error) throw error
  return data.signedUrl
}
