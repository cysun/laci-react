import { useState } from "react";
import { Card } from "antd";
import { Line, LineConfig } from "@ant-design/charts";
import { ChartRecord, DateRange } from "@/types";

import DatePicker from "./DatePicker";
const { RangePicker } = DatePicker;

import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export default function CityChart({
  title,
  records,
  dateRange,
}: {
  title: string;
  records: ChartRecord[];
  dateRange: DateRange;
}) {
  const [dates, setDates] = useState(dateRange);

  let config: LineConfig = {
    data: records.filter(
      (r) =>
        dates.start.isSameOrBefore(r.date) && dates.end.isSameOrAfter(r.date),
    ),
    xField: "label",
    yField: "value",
    seriesField: "type",
    color: ["yellow", "blue"],
  };

  return (
    <Card
      title={title}
      extra={
        <RangePicker
          defaultValue={[dates.start, dates.end]}
          allowClear={false}
          ranges={{
            Reset: [dateRange.start, dateRange.end],
          }}
          disabledDate={(current) =>
            dateRange.start.isAfter(current) || dateRange.end.isBefore(current)
          }
          onCalendarChange={(newDates) => {
            if (newDates != null)
              setDates({ start: newDates[0], end: newDates[1] } as DateRange);
          }}
        />
      }
    >
      <Line {...config} />
    </Card>
  );
}
