export const LIST_FILTER_TYPE = {
  All: 'All',
  Active: 'Active',
  Completed: 'Completed',
} as const

export type ListFilterType = (typeof LIST_FILTER_TYPE)[keyof typeof LIST_FILTER_TYPE]
