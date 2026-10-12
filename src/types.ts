export type Faculty = { id: string; name: string; logo?: string; primary: string; secondary: string }
export type Flyer = {
  id?: string; name: string; faculty: string; primary: string; secondary: string;
  programType: string; title: string; requirementsHeading: string; requirements: string[]; image?: string; imagePath?: string;
  imageZoom: number; imageX: number; imageY: number; overlay: number;
  qrUrl: string; qrImage?: string; qrPath?: string; showQr: boolean; enrollment: string; amount: string;
  email: string; phone1: string; phone2: string; createdAt?: string; updatedAt?: string
}
