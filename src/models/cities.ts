import { useState } from "react";
import { useRequest, request } from "umi";
import settings from "../../settings.json";

import City from "../types/city";

export default function useCities() {
  const [cities, setCities] = useState<City[]>([]);

  useRequest(`${settings.apiBaseUrl}/cities`, {
    onSuccess: (data) => setCities(data),
  });

  return {
    cities,
  };
}
