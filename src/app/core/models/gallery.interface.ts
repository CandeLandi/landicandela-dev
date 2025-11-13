export interface Gallery {
  id: string;
  url: string;
  title?: string;
  description?: string;
  order?: number;
  projectId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGalleryDto {
  url: string;
  title?: string;
  description?: string;
  order?: number;
}

export interface UpdateGalleryDto {
  url?: string;
  title?: string;
  description?: string;
  order?: number;
}

