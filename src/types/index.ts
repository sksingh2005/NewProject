export interface Route {
  path: string;
  label: string;
  icon?: string;
  adminOnly?: boolean;
  children?:Route[]
}