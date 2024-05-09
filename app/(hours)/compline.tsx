import { Hour } from '@/components/Service';
import HourService from '@/components/Service';

export class Compline extends Hour {
  constructor(date: Date) {
      super(date);
      this.title = "Night Prayer";
      this.prev = "vespers";
  }
}

export default function Service() {
    const service: Hour = new Compline(new Date());
  return <HourService hour={service} />
}
