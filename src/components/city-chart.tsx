import { useState } from "react";
import { Card, DatePicker } from "antd";
import { Line, LineConfig } from "@ant-design/charts";
import moment from "moment";

const { RangePicker } = DatePicker;

export default function CityChart({ title, data, dateRange }) {
  let startMoment = moment(dateRange.startDate);
  let endMoment = moment(dateRange.endDate);
  const [momentRange, setMomentRange] = useState({
    start: startMoment,
    end: endMoment,
  });

  let config: LineConfig = {
    data: data.filter(
      (d) =>
        momentRange.start.isSameOrBefore(d.date) &&
        momentRange.end.isSameOrAfter(d.date),
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
          defaultValue={[momentRange.start, momentRange.end]}
          allowClear={false}
          ranges={{
            Reset: [startMoment, endMoment],
          }}
          disabledDate={(current) =>
            startMoment.isAfter(current) || endMoment.isBefore(current)
          }
          onCalendarChange={(dates) => {
            setMomentRange({ start: dates[0], end: dates[1] });
          }}
        />
      }
    >
      <Line {...config} />
    </Card>
  );
}
