import { Hour } from '@/components/Service';
import HourService from '@/components/Service';

export class Compline extends Hour {
  constructor(date: Date) {
      super(date);
      this.title = "Compline";
      this.title2 = "Night Prayer";
      this.text = "The text of matins. This should be very long.";
      this.prev = "vespers";
      this.next = "vigil";
  }
}

export default function Service() {
    const service: Hour = new Compline(new Date());
  return <HourService hour={service} />
}
