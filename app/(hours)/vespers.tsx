import { Hour } from '@/components/Service';
import HourService from '@/components/Service';


export class Vespers extends Hour {
  constructor(date: Date) {
      super(date);
      this.title = "Nones";
      this.title2 = "Evening Prayer";
      this.text = "The text of matins. This should be very long.";
      this.prev = "nones";
      this.next = "compline";
  }
}

export default function Service() {
    const service: Hour = new Vespers(new Date());
  return <HourService hour={service} />
}
