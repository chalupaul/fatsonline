import { Hour } from '@/components/Service';
import HourService from '@/components/Service';

export class Vigil extends Hour {
  constructor(date: Date) {
      super(date);
      this.title = "Vigil";
      this.title2 = "Late Night Prayer";
      this.text = "The text of matins. This should be very long.";
      this.prev = "compline";
  }
}

export default function Service() {
    const service: Hour = new Vigil(new Date());
  return <HourService hour={service} />
}
