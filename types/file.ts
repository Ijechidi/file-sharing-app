export interface FileDetails {
  id: string
  name: string
  size: number
  type: string
  created_at: string
  updated_at: string
  owner_id: string
  path: string
  is_starred?: boolean
  shared_with?: string[]
}