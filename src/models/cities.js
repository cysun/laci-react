import { useState } from "react";
import { useRequest, request } from "umi";
import settings from "../../settings.json";

export default function useCities() {
  const [cities, setCities] = useState([]);

  useRequest(`${settings.apiBaseUrl}/cities`, {
    onSuccess: (data) => setCities(data),
  });

  return {
    cities,
  };
}
