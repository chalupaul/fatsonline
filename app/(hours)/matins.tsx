import { Hour } from '@/components/Service';
import HourService from '@/components/Service';

export class Matins extends Hour {
  constructor(date: Date) {
      super(date);
      this.title = "Matins";
      this.title2 = "Morning Prayer";
      this.text = "The text of matins. This should be very long.";
      this.prev = "prime";
      this.next = "terce";
  }
}

export default function Service() {
    const service: Hour = new Matins(new Date());
  return <HourService hour={service} />
}