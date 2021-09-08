import dayjs, { Dayjs } from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

// City returned from API
export interface City {
  id: number;
  name: string;
  population: number;
}

// Record returned from API
export interface Record {
  cityId: number;
  date: string;
  tests: number; // total tests
  cases: number; // total cases
  deaths: number; // total deaths

  // This is a trick in TypeScript to allow using the bracket notation to
  // access object property, e.g. record["cases"]. See more at
  // https://stackoverflow.com/questions/34727936/typescript-bracket-notation-property-access
  [key: string]: number | string;
}

// Records passed to CityChart
export interface ChartRecord {
  date: Date;
  label: string;
  value: number;
  type: string;
}

export interface DateRange {
  start: Dayjs;
  end: Dayjs;
}

let a = dayjs();
export class DataRecord {
  date: Dayjs;
  label: string; // M/d/yyyy used for labels in charts
  cases: number = 0; // new cases
  cases7Avg: number = 0; // new cases (7-day average)
  deaths: number = 0; // new deaths
  deaths7Avg: number = 0; // new deaths (7-day average)

  [key: string]: number | string | Dayjs;

  constructor(date: Dayjs) {
    this.date = date;
    this.label = this.date.format("l");
  }
}

export class CityInfo {
  id: number;
  name: string;
  population: number;
  lastUpdated: Dayjs;
  tests: number;
  cases: number;
  deaths: number;
  data: DataRecord[] = [];

  constructor(city: City, records: Record[]) {
    this.id = city.id;
    (this.name = city.name), (this.population = city.population);

    let lastRecord = records[records.length - 1];
    this.lastUpdated = dayjs(lastRecord.date);
    this.tests = lastRecord.tests;
    this.cases = lastRecord.cases;
    this.deaths = lastRecord.deaths;

    let current = dayjs(records[0].date);
    do {
      current = current.clone().add(1, "d");
      this.data.push(new DataRecord(current));
    } while (current.isBefore(this.lastUpdated, "day"));

    let fields = ["cases", "deaths"];

    let index = 1;
    let lastDataIndex = -1;
    for (let i = 0; i < this.data.length; ++i) {
      if (this.data[i].date.isSame(records[index].date, "day")) {
        fields.forEach((field) => {
          let increment =
            (records[index][field] as number) -
            (records[index - 1][field] as number);
          increment = increment >= 0 ? increment : 0;
          if (i - lastDataIndex == 1) this.data[i][field] = increment;
          else {
            increment /= i - lastDataIndex;
            for (let j = lastDataIndex + 1; j <= i; ++j)
              this.data[j][field] = increment;
          }
        });
        ++index;
        lastDataIndex = i;
      }
    }

    for (let i = 0; i < this.data.length; ++i) {
      fields.forEach((field) => {
        let sum = 0;
        let count = 0;
        for (let j = i; j > i - 7 && j >= 0; --j) {
          sum += this.data[j][field] as number;
          ++count;
        }
        this.data[i][`${field}7Avg`] = sum / count;
      });
    }
  }
}
