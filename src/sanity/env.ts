export const apiVersion = process.env.SANITY_API_VERSION || '2025-02-14'

export const dataset = assertValue(
  process.env.SANITY_DATASET,
  'Missing environment variable: SANITY_DATASET',
)

export const projectId = assertValue(
  process.env.SANITY_PROJECT_ID,
  'Missing environment variable: SANITY_PROJECT_ID',
)

function assertValue<T>(v: T | undefined, message: string): T {
  if (v === undefined) {
    throw new Error(message)
  }

  return v
}
