import { request } from "umi";
import settings from "../settings.json";

export interface City {
  id: number;
  name: string;
  population: number;
}

export interface Record {
  cityId: number;
  date: Date;
  tests: number;
  cases: number;
  deaths: number;
}

export async function getCities() {
  return request(`${settings.apiBaseUrl}/cities`);
}

export async function getRecords(cityId: number) {
  return request(`${settings.apiBaseUrl}/cities/${cityId}/records`);
}
