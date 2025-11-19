/**
 * Global type definitions
 */

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export type PageProps<T = Record<string, never>> = {
  params: Promise<T>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
