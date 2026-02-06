// ENUMS

enum Role {
  CLIENT,
  EMPLOYEE,
  ADMIN,
}

enum VirusScanStatus {
  PENDING,
  CLEAN,
  INFECTED,
  FAILED,
}

export type { Role, VirusScanStatus }

export interface User {
  id: string
  email: string
  fullName: string | null
  role: Role
  companyName: string | null
}

export interface Document {
  id: string
  filename: string
  originalFilename: string
  fileSize: bigint
  mimeType: string
  storagePath: string
  uploadedBy: string
  uploadDate: Date
  virusScanStatus: VirusScanStatus
  uploader?: User
}

export interface AuditLog {
  id: bigint
  eventType: string
  userId: string | null
  documentId: string | null
  ipAddress: string | null
  userAgent: string | null
  metadata: any
  createdAt: Date
}
