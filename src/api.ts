import { request } from "umi";

export interface City {
  id: number;
  name: string;
  population: number;
}

export interface Record {
  cityId: number;
  date: string;
  tests: number;
  cases: number;
  deaths: number;
}

export async function getCities() {
  return (await request("/cities")).data;
}
