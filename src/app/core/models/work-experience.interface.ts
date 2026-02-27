/** Sección del modal de detalle (título + ítems). */
export interface WorkExperienceModalSection {
  title: string;
  items: string[];
}

/**
 * Una entrada de experiencia laboral para la sección del portfolio.
 * Vista principal: imagen + resumen corto + "Saber más". Detalle en modal.
 */
export interface WorkExperience {
  id: string;
  role: string;
  company?: string;
  projectTitle: string;
  projectSubtitle?: string;
  /** Subline breve para la card. */
  subline?: string;
  /** Resumen en 3 líneas máx. para la card. */
  summaryLines?: string[];
  /** Cliente (ej. "FINAVIA (Operador aeroportuario de Finlandia)"). */
  client?: string;
  /** Un solo párrafo de descripción para la card. */
  description?: string;
  /** Términos a resaltar dentro de description. */
  highlightTerms?: string[];
  /** Stack para la card (máx. 6). */
  techStack: string[];
  /** Secciones del modal "Detalles del proyecto". */
  modalSections?: WorkExperienceModalSection[];
  /** URL para botón "Ir a LinkedIn" o "Ver CV" en el modal. */
  linkedInUrl?: string | null;
  imageUrl?: string | null;
  /** Logo de la empresa (ej. en assets/brands). */
  companyLogoUrl?: string | null;
  /** Etiquetas de contexto enterprise (ej. "International enterprise environment"). */
  enterpriseTags?: string[];
  current?: boolean;
  /** Período mostrado (ej. "11/2025 – Actualidad"). */
  period?: string;
  startDate?: string;
  endDate?: string;
  order?: number;
  visible?: boolean;
  createdAt?: string;
  updatedAt?: string;
  // Legacy / admin
  summary?: string;
  keyPoints?: string[];
  projectDescription?: string[];
  responsibilities?: string[];
  impactText?: string;
}
