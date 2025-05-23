export interface Matable {
  id: string;
  name: string;
  description: string;
  statusName: string;
  imagePaths: string[];
  tenantCode: string;
  userId: number;
  logTime: string;  // assuming logTime is in string format
}

export interface MatableResponse {
  items: Matable[]; // The array of Matable items
  totalRecords: number; // The total number of records for pagination
}
