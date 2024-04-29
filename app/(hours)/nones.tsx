import { Hour } from '@/components/Service';
import HourService from '@/components/Service';

export class Nones extends Hour {
  constructor(date: Date) {
      super(date);
      this.title = "Nones";
      this.title2 = "Afternoon Prayer";
      this.text = "The text of matins. This should be very long.";
      this.prev = "sext";
      this.next = "vespers";
  }
}

export default function Service() {
    const service: Hour = new Nones(new Date());
  return <HourService hour={service} />
}
