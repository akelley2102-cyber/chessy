import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  type DocumentData,
} from 'firebase/firestore'
import { db } from './firebase'
import type { Recipe, RecipeInput } from '@/types/recipe'

const recipesRef = collection(db, 'recipes')

function toDate(value: unknown): Date {
  return value instanceof Timestamp ? value.toDate() : new Date()
}

function toRecipe(id: string, data: DocumentData): Recipe {
  return {
    id,
    title: data.title ?? '',
    description: data.description ?? '',
    ingredients: data.ingredients ?? [],
    steps: data.steps ?? [],
    tags: data.tags ?? [],
    totalTimeMinutes: data.totalTimeMinutes ?? undefined,
    servings: data.servings ?? undefined,
    source: data.source ?? '',
    isPick: data.isPick ?? false,
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt),
  }
}

/**
 * Subscribes to the recipe box in real time (newest first), so changes
 * made on one device show up immediately on another.
 */
export function subscribeToRecipes(
  onChange: (recipes: Recipe[]) => void,
  onError: (error: Error) => void
): () => void {
  const q = query(recipesRef, orderBy('createdAt', 'desc'))
  return onSnapshot(
    q,
    (snapshot) => onChange(snapshot.docs.map((d) => toRecipe(d.id, d.data()))),
    onError
  )
}

/**
 * Subscribes to a single recipe in real time. Calls onChange(null) if
 * the recipe doesn't exist (e.g. deleted from another device).
 */
export function subscribeToRecipe(
  id: string,
  onChange: (recipe: Recipe | null) => void,
  onError: (error: Error) => void
): () => void {
  return onSnapshot(
    doc(db, 'recipes', id),
    (snap) => onChange(snap.exists() ? toRecipe(snap.id, snap.data()) : null),
    onError
  )
}

export async function addRecipe(input: RecipeInput): Promise<string> {
  const ref = await addDoc(recipesRef, {
    ...input,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return ref.id
}

export async function updateRecipe(id: string, input: RecipeInput): Promise<void> {
  await updateDoc(doc(db, 'recipes', id), {
    ...input,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteRecipe(id: string): Promise<void> {
  await deleteDoc(doc(db, 'recipes', id))
}
